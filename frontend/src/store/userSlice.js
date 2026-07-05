import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../utils/axiosClient";

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

const userSlice = createSlice({
    name:"user",
    initialState:{
        otherUsers:null,
        error:null,
        loading:false,
        selectedUser:null
    },
    reducers:{
        setSelectedUser:(state,action)=>{
            state.selectedUser = action.payload
        }
    },
    extraReducers:(builder)=>{
        builder
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

    }
})
export const {setSelectedUser} = userSlice.actions
export default userSlice.reducer
