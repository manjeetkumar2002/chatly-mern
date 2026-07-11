import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../utils/axiosClient";
import { useSelector } from "react-redux";
import {logout} from "../store/authSlice.js"
export const getOtherUsers = createAsyncThunk(
    "user/others",
    async(_,{rejectWithValue})=>{
        try {
            const result = await axiosClient.get("/api/user/others")
            return result.data
        } catch (error) {
            return rejectWithValue({message:error?.response?.data?.message})            
        }
    }
)
export const getSelectedUserChat = createAsyncThunk(
    'user/chat',
    async(userId,{rejectWithValue})=>{
        try {
            const result = await axiosClient.get(`/api/message/get/${userId}`)
            return result.data
        } catch (error) {
            return rejectWithValue({message:error?.response?.data?.message})  
        }
    }
)
const initialState={
        otherUsers:null,
        error:null,
        loading:false,
        selectedUser:null,
        selectedUserChat:null,
        onlineUsers:null,
        searchData:null
    }
const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setSelectedUser:(state,action)=>{
            state.selectedUser = action.payload
        },
        setOnlineUsers:(state,action)=>{
            state.onlineUsers =action.payload
        },
        setSelectedUserChat:(state,action)=>{
            state.selectedUserChat = action.payload
        },
        setSearchData:(state,action)=>{
            state.searchData = action.payload
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(logout.fulfilled,()=>initialState)

        .addCase(getOtherUsers.pending,(state,action)=>{
            state.loading = true,
            state.error = null,
            state.otherUsers = null
        })
        .addCase(getOtherUsers.fulfilled,(state,action)=>{
            state.loading = false,
            state.error = null,
            state.otherUsers = action.payload
        })        
        .addCase(getOtherUsers.rejected,(state,action)=>{
            state.loading = false,
            state.error = action.payload?.message || "something went wrong",
            state.otherUsers = null
        })        
        .addCase(getSelectedUserChat.pending,(state,action)=>{
            state.loading = true,
            state.error = null,
            state.selectedUserChat = null
        })
        .addCase(getSelectedUserChat.fulfilled,(state,action)=>{
            state.loading = false,
            state.error = null,
            state.selectedUserChat = action.payload
        })        
        .addCase(getSelectedUserChat.rejected,(state,action)=>{
            state.loading = false,
            state.error = action.payload?.message || "something went wrong",
            state.selectedUserChat = null
        })        

    }
})
export const {setSelectedUser,setOnlineUsers,setSelectedUserChat,setSearchData} = userSlice.actions
export default userSlice.reducer
