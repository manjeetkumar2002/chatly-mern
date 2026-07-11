import React, { useRef, useState } from 'react'
import { useSelector ,useDispatch } from 'react-redux'
import dp from "../assets/dp.jpg"
import { IoCameraOutline } from "react-icons/io5";
import axiosClient from '../utils/axiosClient';
import Error from '../component/Error';
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { setUser } from '../store/authSlice';
const Profile = () => {
    const { user } = useSelector(state => state.auth)
    const [name, setName] = useState(user?.name || "")
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState(user?.image || null)
    const [file, setFile] = useState("")
    const imageRef = useRef()
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        setImage(URL.createObjectURL(file))
        setFile(file)
    }
    
    const handleSaveProfile = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append("name", name)
            formData.append("image", file)
            const result = await axiosClient.put("/api/user/profile", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            dispatch(setUser(result.data))
            navigate("/")
        } catch (error) {
            console.log(error?.response?.data?.message)
            setError(error?.response?.data?.message)
        } finally {
            setLoading(false)
        }
    }
    
    if (error) {
        return (
            <Error message={error} />
        )
    }
    
    return (
        <div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex justify-center items-center p-4'>
            {/* Back Button */}
            <div 
                onClick={() => navigate("/")} 
                className='cursor-pointer rounded-xl h-[48px] w-[48px] bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white font-semibold text-xl flex items-center justify-center fixed top-4 left-4 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/35 transition-all duration-200 hover:scale-105'
            >
                <FaArrowLeft />
            </div>
            
            <div className='w-full max-w-[480px]'>
                {/* Profile Card */}
                <div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-[0_20px_60px_-15px_rgba(79,70,229,0.15)] border border-white/50 overflow-hidden p-8'>
                    
                    {/* Header */}
                    <div className='text-center mb-8'>
                        <h1 className='text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>
                            Your Profile
                        </h1>
                        <p className='text-sm text-slate-500 mt-1'>Update your personal information</p>
                    </div>
                    
                    {/* Profile Image */}
                    <div className='relative w-[180px] h-[180px] mx-auto mb-8 group'>
                        <div className='relative rounded-full h-full w-full overflow-hidden ring-4 ring-indigo-100 shadow-xl shadow-indigo-500/10 group-hover:shadow-indigo-500/20 transition-all duration-300'>
                            <img 
                                src={image || dp} 
                                className='object-cover h-full w-full' 
                                alt="Profile" 
                            />
                            <div className='absolute inset-0 bg-gradient-to-t from-indigo-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                        </div>
                        
                        {/* Camera Button */}
                        <div 
                            onClick={(e) => {
                                e.stopPropagation()
                                imageRef.current.click()
                            }} 
                            className='absolute bottom-2 right-2 p-3 rounded-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/35 transition-all duration-200 cursor-pointer hover:scale-105'
                        >
                            <IoCameraOutline className='text-xl' />
                        </div>
                        
                        <input 
                            className='hidden' 
                            type="file" 
                            accept='image/*' 
                            onChange={handleImageChange} 
                            ref={imageRef} 
                        />
                    </div>
                    
                    {/* Form */}
                    <form onSubmit={handleSaveProfile} className='space-y-4'>
                        {/* Name Input */}
                        <div className='space-y-1.5'>
                            <label className='text-xs font-semibold text-slate-600 uppercase tracking-wider block ml-1'>
                                Display Name
                            </label>
                            <div className='relative group'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <svg className='w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                    </svg>
                                </div>
                                <input 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                    type="text" 
                                    placeholder="Enter your name" 
                                    className='w-full pl-9 pr-4 py-3 bg-slate-50/50 border-2 border-slate-200 rounded-xl outline-none transition-all duration-200 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-400/20 text-slate-700 placeholder:text-slate-400 text-sm'
                                />
                            </div>
                        </div>
                        
                        {/* Username Input (Read-only) */}
                        <div className='space-y-1.5'>
                            <label className='text-xs font-semibold text-slate-600 uppercase tracking-wider block ml-1'>
                                Username
                            </label>
                            <div className='relative group'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <svg className='w-4 h-4 text-slate-400' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                </div>
                                <input 
                                    value={user?.userName} 
                                    readOnly 
                                    type="text" 
                                    className='w-full pl-9 pr-4 py-3 bg-slate-100/50 border-2 border-slate-200 rounded-xl text-slate-500 text-sm cursor-not-allowed'
                                />
                            </div>
                        </div>
                        
                        {/* Email Input (Read-only) */}
                        <div className='space-y-1.5'>
                            <label className='text-xs font-semibold text-slate-600 uppercase tracking-wider block ml-1'>
                                Email Address
                            </label>
                            <div className='relative group'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <svg className='w-4 h-4 text-slate-400' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                    </svg>
                                </div>
                                <input 
                                    value={user?.emailId} 
                                    readOnly 
                                    type="email" 
                                    className='w-full pl-9 pr-4 py-3 bg-slate-100/50 border-2 border-slate-200 rounded-xl text-slate-500 text-sm cursor-not-allowed'
                                />
                            </div>
                        </div>
                        
                        {/* Save Button */}
                        <div className='pt-4'>
                            <button 
                                disabled={loading} 
                                type='submit' 
                                className='w-full cursor-pointer bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/35 transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:transform-none'
                            >
                                {loading ? (
                                    <span className='flex items-center justify-center gap-2'>
                                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Saving...
                                    </span>
                                ) : "Save Profile"}
                            </button>
                        </div>
                    </form>
                </div>
                
                {/* Footer */}
                <div className='text-center mt-6'>
                    <p className='text-xs text-slate-400'>🛡️ Your information is secure and private</p>
                </div>
            </div>
        </div>
    )
}

export default Profile