import { configureStore, combineReducers } from '@reduxjs/toolkit';
import allHotelsSlice from './hotels/hotelsReducer';
import roomsReducer from './rooms/roomsReducer';
import usersReducer from './auths/usersReducer';

const rootReducer = combineReducers({
  // Add reducers here
  // hotel: hotelsReducer,
  room: roomsReducer,
  user: usersReducer,
  allHotels: allHotelsSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
