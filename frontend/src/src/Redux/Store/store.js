import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../Features/Auth/authSlice'
import userSlice from '../Features/User/userSlice'
import profileSlice from '../Features/Profile/profileSlice'

export default configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    profile: profileSlice
  },
})