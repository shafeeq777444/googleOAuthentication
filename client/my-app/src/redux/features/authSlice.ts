import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../types';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}


const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const googleOAuth = createAsyncThunk('auth/google', async () => {
  try {
    // Redirect the user to the backend route that handles OAuth
    window.location.href = 'http://localhost:3300/auth/google';
  } catch (err) {
    console.log(err, "error");
  }
});

export const getNewUserData = createAsyncThunk<User, void>('auth/newUserData', async () => {
  try {
   const response=await axios.get("http://localhost:3300/auth/user",{withCredentials: true,})
   return response.data
   
  } catch (err) {
    console.log(err, "error");
  }
});

export const updateUserData = createAsyncThunk('auth/updateUserData', async (userData:any) => {
  try {
   const response=await axios.post
   ("http://localhost:3300/auth/updateProfileAndLogin", userData,{withCredentials: true,})
   
   if (response.data.profileCompleted) {
    window.location.href = "/home";
} else {
    window.location.href = "/register/userCredentials";
}
   
  } catch (err) {
    console.log(err, "error");
  }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      logout: (state) => {
        state.user = null;
        localStorage.removeItem('token');
      },
      
    },
  extraReducers:builder=>{
    builder.addCase(getNewUserData.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getNewUserData.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    })
    .addCase(getNewUserData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch user data";
    });
  }})

export const { } = authSlice.actions;
export default authSlice.reducer;