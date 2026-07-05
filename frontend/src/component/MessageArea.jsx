import React, { useEffect, useState ,useRef } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import dp from "../assets/dp.jpg"
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../store/userSlice';
import { RiEmojiStickerLine } from "react-icons/ri";
import { FaRegImages } from "react-icons/fa";
import EmojiPicker from 'emoji-picker-react';
import { IoMdSend } from "react-icons/io";
import axiosClient from '../utils/axiosClient';
const MessageArea = () => {
  const {selectedUser} = useSelector(state=>state.user)
  const dispatch = useDispatch()
  const [message,setMessage] = useState("")
  const image = useRef()
  const [backendImage,setBackendImage] = useState(null)
  const [frontendImage,setFrontendImage] = useState(null)
  const [showEmoji,setShowEmoji] = useState(false);
  const [sending,setSending] = useState(false)
  const handleImage = (e)=>{
    const file = e.target.files[0]
    setBackendImage(file)
    setFrontendImage(URL.createObjectURL(file))
  }
  
  const handleEmoji = (emojiObject)=>{
   setMessage((prev)=>prev+emojiObject.emoji)
   setShowEmoji(false)
  }
  const handleSendMessage = async()=>{
    setSending(true)
    try {
      const formData = new FormData()
      console.log(message)
      if(message)
      formData.append("message",message)
      if(backendImage)
      formData.append("image",backendImage)
      const response = await axiosClient.post(`/api/message/send/${selectedUser._id}`,formData,{headers: {
    "Content-Type": "multipart/form-data" 
  }})
  setBackendImage(null)
  setFrontendImage(null)
  setMessage("")
  console.log(response)
    } catch (error) {
      console.log(error)
    }
    finally{
      setSending(false)
    }
  }
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
    {/* messages  */}
    <div className='relative w-full h-[600px] overflow-auto'>
        {showEmoji && 
        <div className='absolute bottom-1 left-[50px]'>
          <EmojiPicker onEmojiClick={handleEmoji}  width={250} height={350}/>
        </div>
        }
        {frontendImage && 
        <div className='absolute bottom-1 right-[100px] rounded-2xl overflow-hidden shadow-lg shadow-gray-200 h-[100px] w-[200px]'>
          <img src={frontendImage} className='h-full w-full object-cover' alt="" />
        </div>
        }
    </div>
    {/* message input */}
    {selectedUser && <div className='flex justify-center'>
    <div className='max-w-[90%] w-full mx-auto absolute bottom-3 bg-blue-400 text-white p-[15px] rounded-full w-full gap-[10px] items-center flex justify-between'>
      <div onClick={()=>setShowEmoji(prev=>!prev)} className='text-2xl cursor-pointer'>
        <RiEmojiStickerLine />
      </div>
      <div className='w-full ml-3'>
        <input onChange={(e)=>setMessage(e.target.value)} value={message} className='border-0 outline-0 w-full h-full text-xl' type="text" placeholder='Message'/>
      </div>
      <div onClick={()=>image.current.click()} className='text-2xl cursor-pointer'>
        <FaRegImages />
      </div>
      <input className='text-transparent absolute right-[40px]' onChange={handleImage} type="file"accept='image/*' ref={image} />
      <button disabled={sending} onClick={handleSendMessage} className='text-2xl ml-4 cursor-pointer'>
      <IoMdSend  />
    </button>
    </div>
    
    </div>
    }
    </div>
  )
}

export default MessageArea