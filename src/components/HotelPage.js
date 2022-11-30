import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import getRoom from '../redux/rooms/roomsAction';
import { deleteRoomAction } from '../redux/hotels/hotelsAction';

const HotelPage = () => {
  const [msg, setMsg] = useState('');
  const hotel = useSelector((state) => state.hotel);

  let base64String = '';
  if (hotel) {
    base64String = btoa(String.fromCharCode(...hotel.photos.image.data.data));
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getRoom(e.target.id));
    navigate('/bookhotel');
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      // eslint-disable-next-line
      const res = await axios.delete(`https://booooka-api.onrender.com/api/v1/rooms/${e.target.id}/${hotel._id}`, { withCredentials: true });
      const data = await res.data;

      dispatch(deleteRoomAction(e.target.id));
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
    if (hotel && hotel.rooms.length > 0) {
      setWidth(roomCarousel.current.scrollWidth - roomCarousel.current.offsetWidth);
    }
  }, [hotel]);

  return (
    <>
      {msg && <p>{msg}</p>}
      {hotel && (
      <div className="detail_container">
        <h1 className="hotel_name">{hotel.name}</h1>

        <div className="img_container img_cont_desk">
          <img src={`data:image/png;base64,${base64String}`} alt={hotel.name} />
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
              {hotel.rooms && hotel.rooms.map((room) => {
                const room64String = btoa(String.fromCharCode(...room.photos.data.data));
                return (
                  // eslint-disable-next-line
                  <motion.div key={room._id} className="card">
                    <motion.div className="img_container" whileTap={{ scale: 1.1 }}>
                      <img src={`data:images/png;base64,${room64String}`} alt={room.name} />
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
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>
      )}
    </>
  );
};

export default HotelPage;
