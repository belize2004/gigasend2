import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: UserSlice = {
  _id: null,
  email: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<UserSlice>
    ) => {
      state._id = action.payload._id
      state.email = action.payload.email
    },
    clearUser: (state) => {
      state._id = null
      state.email = null
    },
  },
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer
