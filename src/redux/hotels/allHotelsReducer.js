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
// const hotel = null;

// const hotelsReducer = (state = hotel, action) => {
//   switch (action.type) {
//     case 'GET_HOTEL/fulfilled':
//       return action.payload;
//     case 'DELETE_ROOM':
//       // eslint-disable-next-line
//       return { ...state, rooms: [...state.rooms.filter((room) => room._id !== action.payload)] };
//     default:
//       return state;
//   }
// };

// const allHotels = [];

// const allHotelsReducer = (state = allHotels, action) => {
//   switch (action.type) {
//     case 'GET_ALL_HOTELS/fulfilled':
//       return action.payload;
//     case 'DELETE_HOTEL':
//       // eslint-disable-next-line
//       return [...state.filter((hotel) => hotel._id !== action.payload)];
//     default:
//       return state;
//   }
// };

// export { hotelsReducer, allHotelsReducer };
