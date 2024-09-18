import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const register = createAsyncThunk('register', async (data, { rejectWithValue }) => {
    try {
        const res = await axios.post('http://localhost:3000/api/register', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return res.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data);
        }
    }
});

export const login = createAsyncThunk('login', async (data, {rejectWithValue}) => {
    try {
        const res = await axios.post('http://localhost:3000/api/login', data, {
            withCredentials: true
        })
        const token = res.data.items.token
        localStorage.setItem('token', token)
        return res.data
    } catch (error) {
        if(error.response && error.response.data) {
            return rejectWithValue(error.response.data)
        }
    }
})

export const logout = createAsyncThunk('logout', async (_, {rejectWithValue}) => {
    try {
        localStorage.removeItem('token')
        const res = await axios.post('http://localhost:3000/api/logout')
        return res.data
    } catch (error) {
        if(error.response && error.response.data) {
            return rejectWithValue(error.response.data)
        }
    }
})


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        data: [],
        loading: false,
        error: null
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
          },
    },
    extraReducers: (builder) => {
        builder
        .addCase(register.pending, (state) => {
            state.loading = true
        })
        .addCase(register.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
        })
        .addCase(register.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload.errors || action.payload.message;
        })
        .addCase(login.pending, (state) => {
            state.loading = true
        })
        .addCase(login.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
        })
        .addCase(login.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload.errors || action.payload.message;
        })
        .addCase(logout.pending, (state) => {
            state.loading = true
        })
        .addCase(logout.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
        })
        .addCase(logout.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload.errors || action.payload.message;
        })
    }
})

export default authSlice.reducer
export const {clearError} = authSlice.actions