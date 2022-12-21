import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUser: (state, action) => ({ ...state, user: action.payload }),
  },
});

const getUserAction = userSlice.actions;

export { userSlice as default, getUserAction };
