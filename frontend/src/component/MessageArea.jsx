import React from 'react'
import { FaArrowLeft } from "react-icons/fa";
import dp from "../assets/dp.jpg"
const MessageArea = () => {
  return (
    <div className='w-[70%] border-l-1 border-l-gray-300'>
      <div className='w-full rounded-b-2xl bg-blue-400 h-[60px] flex items-center'>
          <div className='cursor-pointer rounded-full h-[50px] w-[50px] text-white font-semibold text-xl flex items-center justify-center'>
            <FaArrowLeft/>
          </div>
          <div  className='cursor-pointer  bg-white h-[40px] w-[40px] rounded-full overflow-hidden flex items-center justify-center'>
              <img className='h-full w-full' src={dp} alt="" />
          </div>
      </div>
    </div>
  )
}

export default MessageArea