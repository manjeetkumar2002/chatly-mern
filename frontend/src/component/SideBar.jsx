import React ,{useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import dp from "../assets/dp.jpg"
import {useNavigate} from "react-router-dom"
import { CiSearch } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { CiLogout } from "react-icons/ci";
import {logout} from "../store/authSlice.js"
import { setSearchData, setSelectedUser } from '../store/userSlice.js';
import axiosClient from '../utils/axiosClient.js';
const SideBar = () => {
  const {user} = useSelector(state=>state.auth)
  const {otherUsers,selectedUser,onlineUsers,searchData} = useSelector(state=>state.user)
  const [search,setSearch] = useState(false)
  const [searchInput,setSearchInput]= useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  console.log(searchData)
  const handleSearch = async()=>{
    try {
      const result = await axiosClient.get(`/api/user/search?query=${searchInput}`)
      console.log(result.data)
      dispatch(setSearchData(result.data))
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    if(searchInput)
    handleSearch()
  },[searchInput])
  useEffect(()=>{
  },[user])
  return (
    <div className={`w-full lg:max-w-[30%] md:max-w-[40%] max-w-[100%] ${selectedUser?"hidden md:block":"block"} bg-blue-100 h-screen relative`}>
      <div className='bg-blue-400 h-[250px] rounded-b-[100px] shadow-md flex justify-center flex-col p-[20px]'>
        <h1 className='font-semibold text-xl text-white'>chatly</h1>
        
        <div className='mt-1 flex justify-between items-center'>
          <h2 className='font-bold text-[24px]'>Hii, {user?.name || "User"}</h2>
          <div onClick={()=>navigate("/profile")}  className='cursor-pointer shadow-sm shadow-lg bg-white h-[50px] w-[50px] rounded-full overflow-hidden flex items-center justify-center'>
            <img className='h-full w-full' src={user?.image || dp} alt="" />
          </div>
        </div>

        <div className='mt-2 flex items-center gap-[10px]'>
          <div onClick={()=>setSearch(true)} className={`${search?"hidden":"block"} cursor-pointer rounded-full bg-white w-[50px] h-[50px] flex items-center justify-center`}>
          <CiSearch  className='text-2xl'/>
          </div>
          {search && <div className='w-full'>
            <div className='relative rounded-full bg-white h-[50px] flex items-center justify-center'>
            <div className='w-[50px] flex items-center justify-center'>
          <CiSearch  className='text-2xl'/>
            </div>
          <input onChange={(e)=>setSearchInput(e.target.value)} value={searchInput} type="text" placeholder='search users...' className='h-[70%] w-full outline-0 border-0' />
            <RxCross2 onClick={()=>setSearch(false)} className=' cursor-pointer absolute right-3 text-2xl top-1/4'/>
          </div>
          </div>}
          {/* online users */}
          {!search&&
          <div className='overflow-x-auto flex gap-[10px]'> 
            {
              otherUsers?.map((user,index)=>(
                onlineUsers?.includes(user._id) &&
              <div  onClick={()=>{dispatch(setSelectedUser(user))}}  key={index} className=' relative rounded-full p-[5px]  overflow-hidden'>
                <div  className='cursor-pointer  h-[50px] w-[50px] shadow-sm shadow-lg bg-white rounded-full overflow-hidden flex items-center justify-center'>
            <img className='h-full w-full' src={user?.image || dp} alt="" />
          </div>
          <span className='z-[100] absolute bottom-3 right-[5px] rounded-full w-[10px] h-[10px] bg-green-400'></span>
              </div>
                
              ))
            }
          </div>
}
        </div>
      </div>
        {/* others user list */}
        <div className='px-3'>
            {
              otherUsers?.map((user,index)=>(
                <div onClick={()=>dispatch(setSelectedUser(user))} className='shadow-2xl cursor-pointer mt-3 flex items-center gap-3 bg-white rounded-full hover:bg-blue-300' key={index}>
                   <div className='cursor-pointer shadow-sm shadow-lg bg-white h-[50px] w-[50px] rounded-full overflow-hidden flex items-center justify-center'>
                    <img className='h-full w-full' src={user?.image || dp} alt="" />
                  </div>
                  <div className='text-xl font-semibold'>{user?.name || user?.userName}</div>
                </div>
              ))
            }
        </div>
            {/* logout icon */}
      <div onClick={()=>dispatch(logout())} className='absolute bottom-2 left-2 cursor-pointer rounded-full bg-blue-400 flex items-center justify-center text-2xl p-2'>
        <CiLogout />
      </div>
    </div>
  )
}

export default SideBar