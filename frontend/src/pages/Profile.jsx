import React ,{useRef, useState} from 'react'
import { useSelector } from 'react-redux'
import dp from "../assets/dp.jpg"
import { IoCameraOutline } from "react-icons/io5";
import axiosClient from '../utils/axiosClient';
import Error from '../component/Error';
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
const Profile = () => {
    const {user} = useSelector(state=>state.auth)
    const [name,setName] = useState(user?.name||"")
    const [loading,setLoading] = useState(false)
    const [image,setImage] = useState(user?.image||null)
    const [file,setFile] = useState("")
    const imageRef = useRef()
    const [error,setError] = useState(null)
    const navigate = useNavigate()
    const handleImageChange = (e)=>{
        const file = e.target.files[0]
        setImage(URL.createObjectURL(file))
        setFile(file)
    }
    const handleSaveProfile = async(e)=>{
        e.preventDefault()
        setLoading(true)
        try {

            const formData = new FormData()
            formData.append("name",name)
            formData.append("image",file)
            const result = await axiosClient.put("/api/user/profile",formData,{
                headers: {
    "Content-Type": "multipart/form-data" 
  }
            })
            console.log(result)
            navigate("/")
        } catch (error) {
            console.log(error?.response?.data?.message)
            setError(error?.response?.data?.message)
        }
        finally{
            setLoading(false)
        }
    }
    if(error){
        return (
            <Error message={error}/>
        )
    }
  return (
    <div className='bg-blue-200 w-screen h-screen flex justify-center items-center'>
        <div onClick={()=>navigate("/")} className='cursor-pointer rounded-full h-[50px] w-[50px] bg-blue-400 text-white font-semibold text-xl flex items-center justify-center fixed top-3 left-3'>
    <FaArrowLeft/>
        </div>
        <div className='max-w-[500px] w-full'>
            <div className='rounded-full relative w-[200px] h-[200px] my-[30px] mx-auto'>
            <div className='overflow-hidden rounded-full h-full  border-4 border-blue-400' >
                <img src={image||dp} className='object-cover h-full w-full' alt="" /> 
                <input className='hidden' type="file" accept='image/*' onChange={handleImageChange} ref={imageRef} />
                
                </div>
                <div onClick={(e)=>{e.stopPropagation()
                    imageRef.current.click()}} className='z-100 cursor-pointer absolute bottom-2 right-3 p-[10px] flex justify-center items-center  rounded-full  text-2xl  bg-blue-400 text-white font-semibold'>
                <IoCameraOutline />
            </div>
</div>
            <form onSubmit={handleSaveProfile} className='flex flex-col gap-[10px]'>
                <div className='form-control border-2 border-blue-400 rounded-md p-[10px] bg-white'>
                <input value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder='Enter your name' className='w-full h-full outline-none border-0'/>
              </div>
                <div className='form-control border-2 border-blue-400 rounded-md p-[10px] bg-white'>
                <input value={user?.userName} readOnly type="text" className='w-full h-full outline-none border-0'/>
              </div>
                <div className='form-control border-2 border-blue-400 rounded-md p-[10px] bg-white'>
                <input value={user?.emailId} readOnly type="email" placeholder='email' className='w-full h-full outline-none border-0'/>
              </div>
              <div className='flex justify-center mt-[30px]'>
                <button disabled={loading} type='submit' className='cursor-pointer bg-blue-400 p-2 font-semibold max-w-[150px] w-full text-blue-950 rounded-md'>{loading?"Saving...":"Save Profile"}</button>
              </div>
            </form>
        </div>
    </div>
  )
}

export default Profile