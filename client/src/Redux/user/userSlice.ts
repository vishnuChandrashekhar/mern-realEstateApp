import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserSchema } from '../../../../API/src/Models/user.model'


export interface UserReduxSchema {
  _id: string | undefined;
  username: string;
  email: string;
}


interface UserState {
  currentUser: UserSchema | null,
  error: string | null
  loading: boolean
}



const initialState: UserState = {
  currentUser: null,
  error: null,
  loading: false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signinStart: (state) => {
      state.loading = true
    },
    signinSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false, 
      state.error = null
    },
    signinFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
    }
  }
})

export const { signinStart, signinSuccess, signinFailure } = userSlice.actions

export default userSlice.reducer