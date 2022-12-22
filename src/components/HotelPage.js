import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { motion } from 'framer-motion';
import { getRoom } from '../redux/rooms/roomsReducer';
import { getHotelAction } from '../redux/hotels/hotelReducer';
import CircularIndeterminate from './material-ui/LoadingCircularBar';

const HotelPage = () => {
  const [open, setOpen] = useState(true);
  const [msg, setMsg] = useState('');
  const { hotel, isLoading } = useSelector((state) => state.hotel);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    if (user) {
      dispatch(getRoom(e.target.id));
      navigate('/bookhotel');
    } else {
      navigate('/signup');
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      // eslint-disable-next-line
      const res = await axios.delete(`https://booooka-api.onrender.com/api/v1/rooms/${e.target.id}/${hotel._id}`, { withCredentials: true });
      // eslint-disable-next-line
      // const res = await axios.delete(`http://localhost:5000/api/v1/rooms/${e.target.id}/${hotel._id}`, { withCredentials: true });
      const { data } = await res;

      dispatch(getHotelAction.deleteRoom(e.target.id));
      setMsg(data);
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // setup drag width carousel
  const [width, setWidth] = useState(0);

  const roomCarousel = useRef();

  useEffect(() => {
    if (!isLoading && hotel.rooms.length > 0) {
      setWidth(roomCarousel.current.scrollWidth - roomCarousel.current.offsetWidth);
    }
  }, [hotel, isLoading]);

  return (
    <>
      {msg
        && (
          <Box sx={{ width: '100%' }}>
            <Collapse in={open}>
              <Alert
                action={(
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
              )}
                sx={{ mb: 2 }}
              >
                {msg}
              </Alert>
            </Collapse>
          </Box>
        )}

      {isLoading && (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularIndeterminate />
      </div>
      )}

      {hotel && (
      <div className="detail_container">
        <h1 className="hotel_name">{hotel.name}</h1>

        <div className="img_container img_cont_desk">
          <img src={hotel.photos} alt={hotel.name} />
        </div>

        <div className="detail_group">
          <span className="hotel_details">
            Address:
            {hotel.address}
          </span>
          <span className="hotel_details">
            City:
            {hotel.city}
          </span>
          <span className="hotel_details">
            Cheapest Price: $
            {hotel.cheapest_price}
          </span>
          <span className="hotel_details">
            facitlites:
            {hotel.desc}
          </span>
          <span className="hotel_details">
            Ratings:
            {hotel.rating}
          </span>
        </div>

        <div className="main_card_container">
          <motion.div ref={roomCarousel} className="container-carousel">
            <motion.div drag="x" dragConstraints={{ right: 0, left: -width }} className="inner-carousel">
              {hotel.rooms && hotel.rooms.map((room) => (
                // eslint-disable-next-line
                  <motion.div key={room._id} className="card">
                    <motion.div className="img_container" whileTap={{ scale: 1.1 }}>
                      <img src={room.photos} alt={room.name} />
                    </motion.div>
                    <div className="room_details">
                      <span>{room.title}</span>
                      <span>
                        $
                        {room.price}
                      </span>
                      <span>{room.desc}</span>
                    </div>
                    <div className="btn_container">
                      {/* eslint-disable-next-line */}
                      <button id={room._id} onClick={handleClick} className="button">Book</button>
                      {/* eslint-disable-next-line */}
                      <button id={room._id} onClick={handleDelete} className="button">Delete Room</button>
                    </div>
                  </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
      )}
    </>
  );
};

export default HotelPage;
