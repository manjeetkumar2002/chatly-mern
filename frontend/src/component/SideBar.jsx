import React ,{useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import dp from "../assets/dp.jpg"
import {useNavigate} from "react-router-dom"
import { CiSearch } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { CiLogout } from "react-icons/ci";
import {logout} from "../store/authSlice.js"
const SideBar = () => {
  const {user} = useSelector(state=>state.auth)
  const [search,setSearch] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <div className='w-full max-w-[30%] bg-blue-100 h-full'>
      <div className='bg-blue-400 h-[250px] rounded-b-[100px] shadow-md flex justify-center flex-col p-[20px]'>
        <h1 className='font-semibold text-xl text-white'>chatly</h1>
        
        <div className='mt-1 flex justify-between items-center'>
          <h2 className='font-bold text-2xl'>Hii, {user?.name}</h2>
          <div onClick={()=>navigate("/profile")}  className='cursor-pointer shadow-sm shadow-black bg-white h-[50px] w-[50px] rounded-full overflow-hidden flex items-center justify-center'>
            <img className='h-full w-full' src={user?.image || dp} alt="" />
          </div>
        </div>

        <div className='mt-2'>
          <div onClick={()=>setSearch(true)} className={`${search?"hidden":"block"} cursor-pointer rounded-full bg-white w-[50px] h-[50px] flex items-center justify-center`}>
          <CiSearch  className='text-2xl'/>
          </div>
          {search && <div>
            <div className='relative rounded-full bg-white h-[50px] flex items-center justify-center'>
            <div className='w-[50px] flex items-center justify-center'>
          <CiSearch  className='text-2xl'/>
            </div>
          <input type="text" placeholder='search users...' className='h-[70%] w-full outline-0 border-0' />
            <RxCross2 onClick={()=>setSearch(false)} className=' cursor-pointer absolute right-3 text-2xl top-1/4'/>
          </div>
          </div>}
          
        </div>
      </div>
      <div onClick={()=>dispatch(logout())} className='fixed bottom-2 left-2 cursor-pointer rounded-full bg-blue-400 flex items-center justify-center text-2xl p-2'>
        <CiLogout />
      </div>
    </div>
  )
}

export default SideBar