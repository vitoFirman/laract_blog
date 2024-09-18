import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProfile = createAsyncThunk('fetchProfile', async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:3000/api/profile/info', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data
})

export const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        data: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchProfile.pending, (state) => {
            state.loading = true
        })
        .addCase(fetchProfile.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
        })
        .addCase(fetchProfile.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    }
})

export default profileSlice.reducer