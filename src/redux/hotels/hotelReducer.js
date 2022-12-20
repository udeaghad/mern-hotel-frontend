import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  hotel: {},
  isLoading: true,
};

const getHotel = createAsyncThunk(
  'hotel/getHotel',
  async (hotelId) => {
    const response = await axios.get(`https://booooka-api.onrender.com/api/v1/hotels/${hotelId}`);
    // const response = await fetch(`http://localhost:5000/api/v1/hotels/${hotelId}`);
    const { data } = await response;
    return data;
  },
);

const hotelSlice = createSlice({
  name: 'hotel',
  initialState,
  reducers: {
    deleteHotelAction: (state, action) => (
      // eslint-disable-next-line
      {...state, hotel: { ...state.hotel, rooms: [...state.hotel.rooms.filter((room) => room._id !== action.payload)] }}
    ),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHotel.pending, (state) => ({ ...state, isLoading: true }))
      .addCase(
        getHotel.fulfilled, (state, action) => (
          { ...state, hotel: action.payload, isLoading: false }
        ),
      );
  },
});

const getHotelAction = hotelSlice.actions;

export { hotelSlice as default, getHotelAction, getHotel };
