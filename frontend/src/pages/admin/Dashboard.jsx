import { useEffect, useState } from 'react'
import { assets, dashboard_data } from '../../assets/assets'

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState({
        blogs: 0,
        comments: 0,
        drafts: 0,
        recentBlogs: []
    })

    const fetchDashboard = async () => {
        setDashboardData(dashboard_data)
    }

    useEffect(() => {
        fetchDashboard()
    }, [])

    return (
        <div className='flex-1 p-5 md:p-10 bg-blue-50/50'>
            <div className='flex flex-wrap gap-4'>
                <div className='flex items-center gap-4 p-4 bg-white min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
                    <img src={assets.dashboard_icon_1} alt="dashboard icon" className='' />
                    <div>
                        <p className='font-semibold text-xl text-gray-600'>{dashboardData.blogs}</p>
                        <p className='text-gray-400 font-light'>Blogs</p>
                    </div>
                </div>

                <div className='flex items-center gap-4 p-4 bg-white min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
                    <img src={assets.dashboard_icon_2} alt="dashboard icon" className='' />
                    <div>
                        <p className='font-semibold text-xl text-gray-600'>{dashboardData.comments}</p>
                        <p className='text-gray-400 font-light'>Comments</p>
                    </div>
                </div>

                <div className='flex items-center gap-4 p-4 bg-white min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
                    <img src={assets.dashboard_icon_3} alt="dashboard icon" className='' />
                    <div>
                        <p className='font-semibold text-xl text-gray-600'>{dashboardData.drafts}</p>
                        <p className='text-gray-400 font-light'>Drafts</p>
                    </div>
                </div>
            </div>

            <div>
                <div className='flex items-center gap-3 m-4 mt-6 text-gray-600'>
                    <img src={assets.dashboard_icon_4} alt="dashboard" />
                    <p>Latest Blogs</p>
                </div>

                <div className=''>
                    <table className=''>
                        <thead className=''>
                            <tr>
                                
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
