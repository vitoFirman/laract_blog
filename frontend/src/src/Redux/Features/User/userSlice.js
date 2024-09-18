import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const fetchUser = createAsyncThunk('fetchUser', async () => {
    const token = localStorage.getItem('token')
    const res = await axios.get('http://localhost:3000/api/user/info', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data
})

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchUser.pending, (state) => {
            state.loading = true
        })
        .addCase(fetchUser.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
        })
        .addCase(fetchUser.rejected, (state, actions) => {
            state.loading = false
            state.error = actions.error.message
        })
    }
})

export default userSlice.reducer