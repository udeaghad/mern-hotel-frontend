import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  room: {},
  isLoading: true,
};

const getRoom = createAsyncThunk(
  'room/getRoom',
  async (roomId) => {
    const response = await fetch(`https://booooka-api.onrender.com/api/v1/rooms/${roomId}`);
    // const response = await fetch(`http://localhost:5000/api/v1/rooms/${roomId}`);
    const data = await response.json();
    return data;
  },
);

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRoom.pending, (state) => ({ ...state, isLoading: true }))
      .addCase(getRoom.fulfilled, (state, action) => ({ ...state, room: action.payload }));
  },
});

const roomsAction = roomSlice.actions;
export { roomSlice as default, roomsAction, getRoom };
