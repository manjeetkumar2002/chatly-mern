import React, { useEffect } from 'react'
import SideBar from '../component/SideBar.jsx'
import MessageArea from '../component/MessageArea.jsx'
import { useSelector } from 'react-redux'
const Home = () => {
  
  return (
    <div className='flex w-screen h-screen'>
      <SideBar></SideBar>
      <MessageArea></MessageArea>
    </div>
  )
}

export default Home