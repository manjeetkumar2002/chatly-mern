import React, { useEffect, useState, useRef } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import dp from "../assets/dp.jpg"
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser, setSelectedUserChat } from '../store/userSlice';
import { RiEmojiStickerLine } from "react-icons/ri";
import { FaRegImages } from "react-icons/fa";
import EmojiPicker from 'emoji-picker-react';
import { IoMdSend } from "react-icons/io";
import axiosClient from '../utils/axiosClient';
import ReceiverMessage from './ReceiverMessage';
import SenderMessage from './SenderMessage';
import { RxCross2 } from "react-icons/rx";

const MessageArea = () => {
  const { selectedUser, selectedUserChat } = useSelector(state => state.user)
  const { user, socket } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const [message, setMessage] = useState("")
  const image = useRef()
  const [backendImage, setBackendImage] = useState(null)
  const [frontendImage, setFrontendImage] = useState(null)
  const [showEmoji, setShowEmoji] = useState(false);
  const [sending, setSending] = useState(false)
  
  const handleImage = (e) => {
    const file = e.target.files[0]
    if (!file) return;
    setBackendImage(file)
    setFrontendImage(URL.createObjectURL(file))
  }
  
  const handleResetImage = () => {
    setBackendImage(null)
    setFrontendImage(null)
  }
  
  const handleEmoji = (emojiObject) => {
    setMessage((prev) => prev + emojiObject.emoji)
    setShowEmoji(false)
  }
  
  const handleSendMessage = async () => {
    if (!message && !backendImage) {
      return
    }
    setSending(true)
    try {
      const formData = new FormData()
      console.log(message)
      if (message)
        formData.append("message", message)
      if (backendImage)
        formData.append("image", backendImage)
      const response = await axiosClient.post(`/api/message/send/${selectedUser._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      dispatch(setSelectedUserChat([...selectedUserChat, response.data]))
      setBackendImage(null)
      setFrontendImage(null)
      setMessage("")
      console.log(response)
    } catch (error) {
      console.log(error)
    } finally {
      setSending(false)
    }
  }
  
  useEffect(() => {
  }, [selectedUser])

  useEffect(() => {
    socket.on("newMessage", (mess) => {
      dispatch(setSelectedUserChat([...selectedUserChat, mess]))
      console.log(selectedUserChat)
    })

    return () => socket.off("newMessage")
  }, [selectedUserChat, setSelectedUserChat])
  const {onlineUsers} = useSelector(state=>state.user)
  return (
    <div className={`lg:max-w-[70%] md:max-w-[60%] max-w-[100%] ${selectedUser ? "block" : "md:block hidden"} w-full max-h-screen relative bg-gradient-to-br from-slate-50 via-white to-indigo-50/30`}>
      
      {/* Chat Header */}
      {selectedUser && (
        <div className='w-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 h-[72px] flex items-center gap-3 px-4 shadow-lg shadow-indigo-500/10 relative z-10'>
          <div 
            onClick={() => dispatch(setSelectedUser(null))} 
            className='cursor-pointer rounded-full h-[44px] w-[44px] text-white text-xl flex items-center justify-center hover:bg-white/10 transition-colors duration-200'
          >
            <FaArrowLeft />
          </div>
          <div className='cursor-pointer h-[44px] w-[44px] rounded-full overflow-hidden ring-2 ring-white/30 flex-shrink-0'>
            <img className='h-full w-full object-cover' src={selectedUser?.image || dp} alt="" />
          </div>
          <div className='flex-1 min-w-0'>
            <p className='text-white font-semibold text-lg truncate'>{selectedUser?.name || selectedUser?.userName}</p>
            {onlineUsers?.includes(selectedUser._id)?
            <p className='text-indigo-100/70 text-xs'>Online</p>:
            <p className='text-indigo-100/70 text-xs'>Offline</p>
            }
          </div>
        </div>
      )}

      {/* Empty State */}
      {!selectedUser && (
        <div className='w-full h-full flex flex-col items-center justify-center p-8'>
          <div className='relative'>
            <div className='w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl rotate-12 shadow-xl shadow-indigo-500/20'></div>
            <div className='absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-xl shadow-lg'></div>
            <div className='absolute -bottom-2 -left-2 w-12 h-12 bg-gradient-to-br from-indigo-300 to-purple-300 rounded-lg shadow-md'></div>
          </div>
          <h1 className='mt-8 font-bold text-4xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>
            Welcome to Chatly
          </h1>
          <p className='mt-2 font-medium text-lg text-slate-500'>Start chatting with your friends!</p>
          <div className='mt-6 flex gap-2'>
            <span className='px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-medium'>💬 Real-time</span>
            <span className='px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-medium'>🔒 Secure</span>
          </div>
        </div>
      )}
      
      {/* Messages Area */}
      {selectedUser && (
        <div className='relative w-full h-[calc(100vh-180px)] px-6 py-4 flex flex-col gap-2 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-transparent'>
          {/* Emoji Picker */}
          {showEmoji && (
            <div className='fixed bottom-[80px] left-[60px] lg:left-[520px] z-50 shadow-2xl shadow-indigo-500/20 rounded-2xl overflow-hidden border border-indigo-100/30'>
              <EmojiPicker onEmojiClick={handleEmoji} width={280} height={380} />
            </div>
          )}
          
          {/* Image Preview */}
          {frontendImage && (
            <div className='fixed bottom-[80px] right-[100px] rounded-2xl overflow-hidden shadow-2xl shadow-indigo-500/20 border-2 border-white h-[120px] w-[200px] z-40 animate-in fade-in slide-in-from-bottom-4 duration-300'>
              <div className='relative p-2 h-full bg-white'>
                <img src={frontendImage} className='h-full w-full object-cover rounded-xl' alt="" />
                <div 
                  onClick={handleResetImage} 
                  className='cursor-pointer absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white flex justify-center items-center rounded-full p-1.5 shadow-lg transition-colors duration-200'
                >
                  <RxCross2 className='text-sm' />
                </div>
              </div>
            </div>
          )}

          {/* Messages */}
          {selectedUser && selectedUserChat?.map((chat, index) => (
            chat.sender === user._id ? 
              <SenderMessage key={index} image={chat.image} message={chat.message} /> : 
              <ReceiverMessage key={index} image={chat.image} message={chat.message} />
          ))}
          
          {/* Date separator example - you can add this dynamically */}
          {selectedUserChat?.length === 0 && (
            <div className='flex-1 flex items-center justify-center'>
              <div className='text-center'>
                <div className='w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-3'>
                  <span className='text-2xl'>💬</span>
                </div>
                <p className='text-sm text-slate-400'>No messages yet</p>
                <p className='text-xs text-slate-300 mt-1'>Say hello to {selectedUser?.name || selectedUser?.userName}!</p>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Message Input */}
      {selectedUser && (
        <div className='absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white/95 to-transparent backdrop-blur-sm'>
          <div className='max-w-[95%] mx-auto bg-white/90 backdrop-blur-sm border border-indigo-100/30 rounded-2xl shadow-xl shadow-indigo-500/10 p-2 flex items-center gap-2'>
            {/* Emoji Button */}
            <div 
              onClick={() => setShowEmoji(prev => !prev)} 
              className={`text-2xl cursor-pointer p-2 rounded-xl hover:bg-indigo-50 transition-colors duration-200 ${showEmoji ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400 hover:text-indigo-500'}`}
            >
              <RiEmojiStickerLine />
            </div>
            
            {/* Input Field */}
            <div className='flex-1'>
              <input 
                onChange={(e) => setMessage(e.target.value)} 
                value={message} 
                className='border-0 outline-none w-full h-full text-sm text-slate-700 placeholder:text-slate-400 bg-transparent' 
                type="text" 
                placeholder='Type a message...' 
              />
            </div>
            
            {/* Image Upload */}
            <div 
              onClick={(e) => { e.stopPropagation(); image.current.click() }} 
              className='text-2xl cursor-pointer p-2 rounded-xl hover:bg-indigo-50 transition-colors duration-200 text-slate-400 hover:text-indigo-500'
            >
              <FaRegImages />
            </div>
            <input 
              className='hidden' 
              onChange={handleImage} 
              type="file" 
              accept='image/*' 
              ref={image} 
            />
            
            {/* Send Button */}
            {(message || backendImage) && (
              <button 
                disabled={sending} 
                onClick={handleSendMessage} 
                className='p-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/35 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {sending ? (
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <IoMdSend className='text-xl' />
                )}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default MessageArea