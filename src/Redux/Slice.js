import { createSlice } from '@reduxjs/toolkit'

const initialState = { data: [] }

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFromdata : (state, action) => {
        state.data.push({id: Date.now(), ...action.payload})
    }
  },
})

export const { setFromdata } = formSlice.actions
export default formSlice.reducer