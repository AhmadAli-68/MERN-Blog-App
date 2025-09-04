import fs from 'fs'
import imagekit from '../config/imageKit.js';
import Blog from '../models/Blog.js';

export const addBlog = async (req, res) => {
    try {
        const { title, subtitle, description, category, isPublished } = JSON.parse(req.body.blog)

        const imageFile = req.file;

        // check if all fields are present.
        if (!title || !description || !imageFile || !category) {
            res.json({ success: false, message: "Missing required fields" })
        }

        const fileBuffer = fs.readFileSync(imageFile.path)

        // Upload image to imageKit
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/blogs"
        })

        // optimization through imagekit URL transformation.
        const optimizedImageURL = imagekit.url({
            path: response.filePath,
            transformation: [
                { quality: 'auto' }, //? Auto Compression
                { format: 'webp' }, //? Convert to modern format
                { width: '1280' }, //? Width resizing
            ]
        })

        const image = optimizedImageURL;

        await Blog.create({
            title,
            subtitle,
            description,
            category,
            image,
            isPublished
        })

        res.json({ success: true, message: "Blog added successfully." })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ isPublished: true })
        res.json({ success: true, blogs })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const getBlogById = async (req, res) => {
    try {
        const { blogId } = req.params
        const blog = await Blog.findById(blogId)

        if (!blog) {
            res.json({ success: false, message: "Blog not found." })
        }

        res.json({ success: true, blog })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const deleteBlogById = async (req, res) => {
    try {
        const { id } = req.body
        await Blog.findByIdAndDelete(id)
        res.json({ success: true, message: "Blog deleted successfully." })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const togglePublish = async (req, res) => {
    try {
        const { id } = req.body
        const blog = await Blog.findById(id)

        blog.isPublished = !blog.isPublished
        await blog.save()
        res.json({ success: true, message: "Blog status updated successfully." })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}