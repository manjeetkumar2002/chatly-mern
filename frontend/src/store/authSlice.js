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
    }
})

export default authSlice.reducer