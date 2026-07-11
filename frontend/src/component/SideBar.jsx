import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import dp from "../assets/dp.jpg"
import { useNavigate } from "react-router-dom"
import { CiSearch } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { CiLogout } from "react-icons/ci";
import { logout } from "../store/authSlice.js"
import { setSearchData, setSelectedUser } from '../store/userSlice.js';
import axiosClient from '../utils/axiosClient.js';

const SideBar = () => {
  const { user } = useSelector(state => state.auth)
  const { otherUsers, selectedUser, onlineUsers, searchData } = useSelector(state => state.user)
  const [search, setSearch] = useState(false)
  const [searchInput, setSearchInput] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  console.log(searchData)
  
  const handleSearch = async () => {
    try {
      const result = await axiosClient.get(`/api/user/search?query=${searchInput}`)
      console.log(result.data)
      dispatch(setSearchData(result.data))
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    if (searchInput)
      handleSearch()
  }, [searchInput])
  
  useEffect(() => {
  }, [user])
  
  return (
    <div className={`w-full h-full lg:max-w-[30%] md:max-w-[40%] max-w-[100%] ${selectedUser ? "hidden md:block" : "block"} bg-gradient-to-b from-indigo-50/50 via-white to-white h-screen relative border-r border-indigo-100/30`}>
      
      {/* Header Section */}
      <div className='relative bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600 h-[240px] rounded-b-[80px] shadow-xl shadow-indigo-500/10 p-6'>
        {/* Decorative elements */}
        <div className='absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3'></div>
        <div className='absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/3'></div>
        
        {/* Chatly Logo */}
        <div className='relative z-10'>
          <h1 className='font-bold text-2xl text-white tracking-tight'>chatly</h1>
        </div>
        
        {/* User Greeting & Profile */}
        <div className='relative z-10 mt-2 flex justify-between items-center'>
          <div>
            <p className='text-indigo-100/80 text-xs font-medium uppercase tracking-wider'>Welcome back</p>
            <h2 className='font-bold text-2xl text-white'>Hii, {user?.name || "User"}</h2>
          </div>
          <div 
            onClick={() => navigate("/profile")} 
            className='cursor-pointer h-[52px] w-[52px] rounded-full overflow-hidden ring-2 ring-white/30 hover:ring-white/60 transition-all duration-300 shadow-lg'
          >
            <img className='h-full w-full object-cover' src={user?.image || dp} alt="" />
          </div>
        </div>

        {/* Search & Online Users */}
        <div className='relative z-10 mt-3 flex items-center gap-3 w-full'>
          {/* Search Toggle Button */}
          <div 
            onClick={() => setSearch(true)} 
            className={`${search ? "hidden" : "flex"} cursor-pointer rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-200 w-[44px] h-[44px] flex items-center justify-center flex-shrink-0`}
          >
            <CiSearch className='text-2xl text-white' />
          </div>
          
          {/* Search Input */}
          {search && (
            <div className='w-full relative'>
              <div className='relative rounded-xl bg-white/90 backdrop-blur-sm border border-white/30 shadow-lg h-[44px] flex items-center'>
                <div className='w-[44px] flex items-center justify-center flex-shrink-0'>
                  <CiSearch className='text-xl text-indigo-500' />
                </div>
                <input 
                  onChange={(e) => setSearchInput(e.target.value)} 
                  value={searchInput} 
                  type="text" 
                  placeholder='Search users...' 
                  className='h-full w-full outline-none bg-transparent text-sm text-slate-700 placeholder:text-slate-400' 
                />
                <RxCross2 
                  onClick={() => { setSearch(false); setSearchInput("") }} 
                  className='cursor-pointer absolute right-3 text-xl text-slate-400 hover:text-slate-600 transition-colors' 
                />
              </div>
              
              {/* Search Results Dropdown */}
              {searchInput.length > 0 && (
                <div className='max-h-[350px] overflow-y-auto absolute top-[52px] left-0 right-0 bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl shadow-indigo-500/10 border border-indigo-100/30 z-[100]'>
                  {searchData?.map((user, index) => (
                    <div 
                      key={index} 
                      onClick={() => { dispatch(setSelectedUser(user)); setSearchInput(""); setSearch(false) }} 
                      className='flex items-center gap-3 p-3 cursor-pointer hover:bg-indigo-50/80 transition-colors border-b border-slate-100 last:border-0'
                    >
                      <div className='h-[44px] w-[44px] rounded-full overflow-hidden flex-shrink-0 ring-2 ring-indigo-100'>
                        <img className='h-full w-full object-cover' src={user?.image || dp} alt="" />
                      </div>
                      <div className='flex-1'>
                        <p className='font-semibold text-sm text-slate-800'>{user?.name || user?.userName}</p>
                        <p className='text-xs text-slate-400'>@{user?.userName}</p>
                      </div>
                    </div>
                  ))}
                  {searchData?.length === 0 && (
                    <div className='p-4 text-center text-sm text-slate-400'>No users found</div>
                  )}
                </div>
              )}
            </div>
          )}
          
          {/* Online Users Avatars */}
          {!search && (
            <div className='flex-1 p-1 overflow-x-auto flex gap-2 py-1 scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-transparent'>
              {otherUsers?.map((user, index) => (
                onlineUsers?.includes(user._id) && (
                  <div 
                    onClick={() => dispatch(setSelectedUser(user))} 
                    key={index} 
                    className='relative flex-shrink-0 cursor-pointer transition-transform hover:scale-105 duration-200'
                  >
                    <div className='h-[44px] w-[44px] rounded-full overflow-hidden ring-2 ring-white shadow-md'>
                      <img className='h-full w-full object-cover' src={user?.image || dp} alt="" />
                    </div>
                    <span className='absolute bottom-0 right-0 rounded-full w-3 h-3 bg-emerald-400 ring-2 ring-white'></span>
                  </div>
                )
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Users List */}
      <div>
           <p className='px-4 mt-2 mb-0 text-xs font-semibold text-slate-400 uppercase tracking-wider px-1'>All Contacts</p>
      <div className='px-4 py-3 overflow-y-auto h-[calc(100vh-280px)] scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-transparent'>
        {otherUsers?.map((user, index) => (
          <div 
            onClick={() => dispatch(setSelectedUser(user))} 
            className='group cursor-pointer flex items-center gap-3 p-2 rounded-xl hover:bg-gradient-to-r hover:from-indigo-50 hover:to-transparent transition-all duration-200 border-2 border-transparent hover:border-indigo-100/50' 
            key={index}
          >
            <div className='relative flex-shrink-0'>
              <div className='h-[48px] w-[48px] rounded-full overflow-hidden ring-2 ring-slate-100 group-hover:ring-indigo-200 transition-all duration-200'>
                <img className='h-full w-full object-cover' src={user?.image || dp} alt="" />
              </div>
              {onlineUsers?.includes(user._id) && (
                <span className='absolute bottom-0 right-0 rounded-full w-3 h-3 bg-emerald-400 ring-2 ring-white'></span>
              )}
            </div>
            <div className='flex-1 min-w-0'>
              <p className='font-semibold text-sm text-slate-800 group-hover:text-indigo-600 transition-colors truncate'>
                {user?.name || user?.userName}
              </p>
              <p className='text-xs text-slate-400 truncate'>
                {onlineUsers?.includes(user._id) ? '🟢 Online' : '⚪ Offline'}
              </p>
            </div>
            {onlineUsers?.includes(user._id) && (
              <div className='w-1.5 h-1.5 rounded-full bg-emerald-400'></div>
            )}
          </div>
        ))}
        {otherUsers?.length === 0 && (
          <div className='text-center py-8'>
            <p className='text-sm text-slate-400'>No users yet</p>
          </div>
        )}
      </div>
      </div>
       
      
      {/* Logout Button */}
      <div 
        onClick={() => dispatch(logout())} 
        className='absolute bottom-4 left-4 cursor-pointer rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white p-2.5 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/35 transition-all duration-200 hover:scale-105'
      >
        <CiLogout className='text-2xl' />
      </div>
    </div>
  )
}

export default SideBar