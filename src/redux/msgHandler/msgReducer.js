import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  successMsg: null,
  errorMsg: null,
};

const msgSlice = createSlice({
  name: 'message',
  initialState,
  reducers:{
    getSuccessMsg: (state, action) => ({...state, successMsg: action.payload, errorMsg: null}),
    getErrorMsg: (state, action) => ({...state, successMsg: null, errorMsg: action.payload}),
  }
})

const msgAction = msgSlice.actions;

export { msgSlice as default, msgAction }