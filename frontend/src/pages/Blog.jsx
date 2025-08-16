import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets, blog_data } from '../assets/assets'
import Navbar from '../components/Navbar'
import Moment from 'moment'

const Blog = () => {
    const { id } = useParams()
    const [data, setData] = useState(null)

    const fetchingBlogData = async () => {
        const data = blog_data.find(item => item._id === id)
        setData(data)
    }

    useEffect(() => {
        fetchingBlogData()
    }, [])

    return data ?  (
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

                <div dangerouslySetInnerHTML={{__html: data.description}}>

                </div>
            </div>
        </div>
    ) : <div>
        loading...
    </div>
}

export default Blog
