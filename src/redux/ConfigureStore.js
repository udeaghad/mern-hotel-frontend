import { configureStore, combineReducers } from '@reduxjs/toolkit';
import allHotelsSlice from './hotels/allHotelsReducer';
import hotelSlice from './hotels/hotelReducer';
import roomSlice from './rooms/roomsReducer';
import userSlice from './auths/usersReducer';
import msgSlice from './msgHandler/msgReducer'

const rootReducer = combineReducers({
  // Add reducers here
  hotel: hotelSlice.reducer,
  room: roomSlice.reducer,
  user: userSlice.reducer,
  allHotels: allHotelsSlice.reducer,
  msg: msgSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
