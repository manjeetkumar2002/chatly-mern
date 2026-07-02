import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axiosClient from "../utils/axiosClient"

export const signup = createAsyncThunk(
  'auth/signup',
  async (userData, { rejectWithValue }) => {
    try {
    const response =  await axiosClient.post('/api/auth/signup', userData);
    return response.data.user;
    } catch (error) {
      return rejectWithValue({message:error.response?.data?.message});
    }
  }
);
export const login = createAsyncThunk(
  'auth/login',
  async (userData, { rejectWithValue }) => {
    try {
    const response =  await axiosClient.post('/api/auth/login', userData);
    return response.data.user;
    } catch (error) {
      return rejectWithValue({message:error.response?.data?.message});
    }
  }
);

export const checkAuth = createAsyncThunk(
  'auth/check',
  async (_,{rejectWithValue})=>{
    try {
      const response = await axiosClient.get("/api/auth/check")
      return response.data.user
    } catch (error) {
        if(error?.response?.status===401){
          return rejectWithValue(null)
        }
       return rejectWithValue({message:error.response?.data?.message});
    }
  }
)
const authSlice = createSlice({
    name:"auth",
    initialState:{
        user:null,
        isAuthenticated:false,
        error:null,
        loading:false
    },
    reducers:{

    },
    extraReducers:(builder) => {
    builder
      // signup Cases
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = !! action.payload;
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Something went wrong';
        state.isAuthenticated = false;
        state.user = null;
      })
      // login cases
      .addCase(login.pending,(state)=>{
        state.loading=true,
        state.error=null
      })
      .addCase(login.fulfilled,(state,action)=>{
        state.loading=false,
        state.user = action.payload,
        state.isAuthenticated = !!action.payload
      })
      .addCase(login.rejected,(state,action)=>{
        state.loading=false,
        state.error = action.payload?.message || "something went wrong",
        state.isAuthenticated = false,
        state.user = null
      })
      // checkAuth cases
      .addCase(checkAuth.pending,(state)=>{
        state.loading=true,
        state.error=null
      })
      .addCase(checkAuth.fulfilled,(state,action)=>{
        state.loading=false,
        state.user = action.payload,
        state.isAuthenticated = !!action.payload
      })
      .addCase(checkAuth.rejected,(state,action)=>{
        state.loading=false,
        state.error = action.payload?.message,
        state.isAuthenticated = false,
        state.user = null
      })
    }
})

export default authSlice.reducer