import React,{useEffect} from 'react'
import { Route,Routes,Navigate } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import { useSelector,useDispatch } from 'react-redux'
import { checkAuth } from './store/authSlice'
import { getOtherUsers } from './store/userSlice'
import {getSelectedUserChat} from "./store/userSlice"
import Profile from './pages/Profile'
const App = () => {
  const dispatch = useDispatch();
  const {isAuthenticated,user,loading} = useSelector((state)=>state.auth);
  const {selectedUser} = useSelector(state=>state.user)
  // check initial authentication
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  
  useEffect(()=>{
    if(isAuthenticated){
       dispatch(getOtherUsers())
    }
  },[dispatch,isAuthenticated])
  useEffect(()=>{
    if(isAuthenticated&&selectedUser){
      dispatch(getSelectedUserChat(selectedUser._id))
      console.log("dispatch chat")
    }
  },[dispatch,isAuthenticated,selectedUser])
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>;
  }
  
  return (
    <Routes>
      <Route path='/' element={isAuthenticated?<Home/>:<Navigate to="/login"/>}></Route>
      <Route path='/signup' element={isAuthenticated?<Navigate to="/"/>:<SignUp/>}></Route>
      <Route path='/login' element={isAuthenticated?<Navigate to="/"/>:<Login/>}></Route>
      <Route path='/profile' element={isAuthenticated?<Profile/>:<Login/>}></Route>
    </Routes>
  )
}

export default App