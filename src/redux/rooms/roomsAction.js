import { createAsyncThunk } from '@reduxjs/toolkit';

const GET_ROOM = 'GET_ROOM';

const getRoom = createAsyncThunk(
  GET_ROOM,
  async (roomId) => {
    const response = await fetch(`https://booooka-api.onrender.com/api/v1/rooms/${roomId}`);
    const data = await response.json();
    return data;
  },
);

export default getRoom;
