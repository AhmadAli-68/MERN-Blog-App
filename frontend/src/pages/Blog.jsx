import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets } from '../assets/assets'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Moment from 'moment'
import Loader from '../components/Loader'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Blog = () => {
    const { id } = useParams()

    const { axios } = useAppContext()

    const [data, setData] = useState(null)
    const [comments, setComments] = useState([])

    const [name, setName] = useState("")
    const [content, setContent] = useState("")

    const fetchingBlogData = async () => {
        try {
            const { data } = await axios.get(`/api/blog/${id}`)
            data.success ? setData(data.blog) : toast.error(data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }

    const fetchComments = async () => {
        try {
            const { data } = await axios.post('/api/blog/comments', { blogId: id })

            if (data.success) {
                setComments(data.comments)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const addComment = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('/api/blog/add-comment', { blog: id, name, content })

            if (data.success) {
                toast.success(data.message)
                setName('')
                setContent('')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchingBlogData()
        fetchComments()
    }, [])

    return data ? (
        <div className='relative'>
            <img
                className='absolute -top-50 -z-1 opacity-50'
                src={assets.gradientBackground}
                alt="image" />

            <Navbar />

            <div className='text-center mt-20 text-gray-600'>
                <p className='text-primary py-4 font-medium'>Published on {Moment(data.createdAt).format('MMMM Do YYYY')}</p>
                <h1 className='text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800'>{data.title}</h1>
                <h2 className='my-5 max-w-lg mx-auto truncate'>{data.subTitle}</h2>
                <p className='inline-block border border-primary/35 bg-primary/5 py-1 px-4 mb-6 rounded-full text-sm font-medium text-primary'>Michael Brown</p>
            </div>

            <div className='mx-5 max-w-5xl md:mx-auto my-10 mt-6'>
                <img
                    className='rounded-3xl mb-5'
                    src={data.image}
                    alt="blog image" />

                <div
                    className='rich-text max-w-3xl mx-auto'
                    dangerouslySetInnerHTML={{ __html: data.description }}>
                </div>

                {/* comments section */}
                <div className='mt-14 mx-auto mb-10 max-w-3xl'>
                    <p className='font-semibold mb-4'>Comments ({comments.length})</p>
                    <div className='flex flex-col gap-4'>
                        {comments.map((item, index) => (
                            <div
                                className='relative bg-primary/2 border border-primary/5 max-w-xl p-4 text-gray-600'
                                key={index}>
                                <div className='flex items-center gap-2 mb-2'>
                                    <img src={assets.user_icon} alt="user" className='w-6' />
                                    <p className='font-medium'>{item.name}</p>
                                </div>

                                <p className='text-sm max-w-md ml-8'>{item.content}</p>
                                <div className='absolute bottom-3 right-4 flex items-center gap-2 text-xs'>
                                    {Moment(item.createdAt).fromNow()}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Add comment section */}
                <div className='mx-auto max-w-3xl'>
                    <p className='font-semibold mb-4'>
                        Add your comment
                    </p>
                    <form
                        className='flex flex-col items-start gap-4
                    max-w-lg'
                        onSubmit={addComment}>
                        <input
                            className='border w-full border-gray-300 p-2 rounded outline-none'
                            placeholder='Name'
                            required
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            type="text" />

                        <textarea
                            className='border w-full p-2 border-gray-300 outline-none h-48 rounded'
                            placeholder='Comment'
                            onChange={(e) => setContent(e.target.value)}
                            value={content}
                            required
                        ></textarea>

                        <button
                            className='bg-primary text-white rounded p-2 px-8 hover:scale-102 transition-all cursor-pointer'
                            type='submit'>
                            Submit
                        </button>
                    </form>
                </div>

                {/* Share buttons */}
                <div className='my-24 max-w-3xl mx-auto'>
                    <p className='font-semibold my-4'>Share this classes on social media</p>
                    <div className='flex'>
                        <img src={assets.facebook_icon} alt="icon" width={50} />
                        <img src={assets.twitter_icon} alt="icon" width={50} />
                        <img src={assets.googleplus_icon} alt="icon" width={50} />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    ) : <Loader />
}

export default Blog