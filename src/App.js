import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import HotelPage from './components/HotelPage';
import BookHotel from './components/BookHotel';
import SignInPage from './components/SignInPage';
import SignUpPage from './components/SignUpPage';
import ReservationPage from './components/ReservationPage';
import CreateHotel from './components/CreateHotelPage';
import CreateRoom from './components/CreateRoomPage';
import Message from './components/material-ui/MsgHandling'

const App = () => (
  <div className="App">
    <NavBar />
    <Message />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/hotels" element={<HotelPage />} />
      <Route path="/bookhotel" element={<BookHotel />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/reservations" element={<ReservationPage />} />
      <Route path="/createhotel" element={<CreateHotel />} />
      <Route path="/createroom" element={<CreateRoom />} />
    </Routes>

  </div>
);

export default App;
