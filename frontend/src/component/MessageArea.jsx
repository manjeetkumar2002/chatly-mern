import React, { useEffect } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import dp from "../assets/dp.jpg"
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../store/userSlice';
const MessageArea = () => {
  const {selectedUser} = useSelector(state=>state.user)
  const dispatch = useDispatch()
  useEffect(()=>{
  },[selectedUser])
  return (
    <>
    {selectedUser && <div className='w-[70%] border-l-1 border-l-gray-300'>
      <div className='w-full rounded-b-2xl bg-blue-400 h-[60px] flex items-center gap-[10px]'>
          <div onClick={()=>dispatch(setSelectedUser(null))} className='cursor-pointer rounded-full h-[50px] w-[50px] text-white text-xl flex items-center justify-center'>
            <FaArrowLeft/>
          </div>
          <div  className='cursor-pointer  bg-white h-[40px] w-[40px] rounded-full overflow-hidden flex items-center justify-center'>
              <img className='h-full w-full' src={selectedUser?.image||dp} alt="" />
          </div>
          <div className='text-white  font-semibold  text-xl'>{selectedUser?.name||selectedUser?.userName}</div>
      </div>
    </div>}

    {!selectedUser && <div className='w-full h-full gap-[10px] flex flex-col items-center justify-center'>
        <h1 className='font-bold text-5xl text-gray-950'>Welcome to Chatly</h1>
        <p className='font-semibold text-xl text-gray-900'>Chat Friendly!</p>
      </div>}
    </>
  )
}

export default MessageArea