import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  allHotels: [],
  isLoading: true,
};

const fetchPosts = createAsyncThunk(
  'allHotels/fetchPosts',
  async () => {
    const res = await axios.get('https://booooka-api.onrender.com/api/v1/hotels');
    // const res = await axios.get('http://localhost:5000/api/v1/hotels');
    const data = await res.data;
    return data;
  },
);

const allHotelsSlice = createSlice({
  name: 'allHotels',
  initialState,
  reducers: {
    deleteHotel: (state, action) => (
      // eslint-disable-next-line
      { ...state, allHotels: state.allHotels.filter((hotel)=> hotel._id !== action.payload) }
    ),
    addHotel: (state, action) => (
      { ...state, allHotels: [...state.allHotels, action.payload] }
    ),
    updateHotel: (state, action) => (
      {
        ...state,
        allHotels: state.allHotels.map((hotel) => {
          // eslint-disable-next-line
          if (hotel._id === action.payload._id) {
            return action.payload;
          }
          return hotel;
        }),
      }
    ),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => ({ ...state, isLoading: true }))
      .addCase(fetchPosts.fulfilled, (state, action) => (
        { ...state, allHotels: action.payload, isLoading: false }
      ));
  },
});

const getAllHotelsAction = allHotelsSlice.actions;

export { allHotelsSlice as default, getAllHotelsAction, fetchPosts };
