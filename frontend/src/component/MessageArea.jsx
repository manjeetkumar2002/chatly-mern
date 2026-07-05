import React, { useEffect } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import dp from "../assets/dp.jpg"
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../store/userSlice';
import { RiEmojiStickerLine } from "react-icons/ri";
import { FaRegImages } from "react-icons/fa";
const MessageArea = () => {
  const {selectedUser} = useSelector(state=>state.user)
  const dispatch = useDispatch()
  useEffect(()=>{
  },[selectedUser])
  return (
<div className={`lg:max-w-[70%] md:max-w-[60%] max-w-[100%] ${selectedUser?"block":"md:block hidden"} w-full max-h-screen relative`}>
    {selectedUser && <div className='w-full border-l-1 border-l-gray-300'>
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
      </div>
    }

    {/* message input */}
    {selectedUser && <div className='flex justify-center'>
    <div className='max-w-[90%] w-full mx-auto absolute bottom-3 bg-blue-400 text-white p-[15px] rounded-full w-full gap-[10px] items-center flex justify-between'>
      <div className='text-2xl cursor-pointer'>
        <RiEmojiStickerLine />
      </div>
      <div className='w-full'>
        <input className='border-0 outline-0 w-full h-full text-xl' type="text" placeholder='Message'/>
      </div>
      <div className='text-2xl cursor-pointer'>
        <FaRegImages />
      </div>
    </div>
    </div>
    }
    </div>
  )
}

export default MessageArea