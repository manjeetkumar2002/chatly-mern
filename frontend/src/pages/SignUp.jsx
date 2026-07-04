import React, { useState ,useEffect } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import axiosClient from '../utils/axiosClient';
import Error from '../component/Error';
import { signup } from '../store/authSlice';
import {useDispatch,useSelector} from "react-redux"
const SignUp = () => {
  const [showPassword,setShowPassword] = useState(false)
  const [userName,setUserName] = useState("")
  const [emailId,setEmailId] = useState("")
  const [password,setPassword] = useState("")
  const navigate = useNavigate()
  const {error,loading,isAuthenticated} = useSelector((state)=>state.auth)
  const dispatch = useDispatch()

  const handleSignUp = (e)=>{
    e.preventDefault()
    dispatch(signup({userName,emailId,password}))
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated,navigate]);

  if(error){
    return (
      <Error message={error} />
    )
  }
  return (
   <div className='w-screen h-screen bg-blue-200 flex justify-center items-center'>
      <div className='max-w-[500px] overflow-hidden shadow-xl/20 rounded-xl w-full mx-auto bg-white'>
        <div className='p-[80px] bg-blue-400 rounded-b-[60px] shadow-2xl flex justify-center items-center'>
          <p className='text-3xl font-semibold text-blue-950'>Welcome to <span className='text-white'>chatly</span></p>
        </div>
          <form onSubmit={handleSignUp} className='mt-[20px] px-3 pb-[50px] flex flex-col gap-[10px]'>
              <div className='form-control border-2 border-blue-400 rounded-md p-[10px]'>
                <input value={userName} onChange={(e)=>setUserName(e.target.value)} type="text" placeholder='username' className='w-full h-full outline-none border-0'/>
              </div>
              <div className='form-control border-2 border-blue-400 rounded-md p-[10px]'>
                <input value={emailId} onChange={(e)=>setEmailId(e.target.value)} type="email" placeholder='email' className='w-full h-full outline-none border-0'/>
              </div>
              <div className='form-control relative border-2 border-blue-400 rounded-md p-[10px]'>
                <input value={password} onChange={(e)=>setPassword(e.target.value)} type={showPassword?"text":"password"} placeholder='password' className='w-full h-full outline-none border-0'/>
                <span onClick={()=>setShowPassword(!showPassword)} className='z-100 cursor-pointer absolute right-2 top-1/5 font-semibold text-base text-blue-400'>
                  {showPassword?"hide":"show"}
                </span>
              </div>
              <div className='flex justify-center mt-[30px]'>
                <button disabled={loading} type='submit' className='cursor-pointer bg-blue-400 p-2 font-semibold max-w-[100px] w-full text-blue-950 rounded-md'>{loading?"signing...":"Sign Up"}</button>
              </div>
              <div>
                <p className='text-center'>Already Have An Account? <NavLink to="/login" className="text-blue-400">Login</NavLink></p>
              </div>
          </form>
      </div>
   </div>
  )
}

export default SignUp