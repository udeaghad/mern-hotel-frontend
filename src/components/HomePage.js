import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { getHotel } from '../redux/hotels/hotelReducer';
import { fetchPosts, getAllHotelsAction } from '../redux/hotels/allHotelsReducer';
import CircularIndeterminate from './material-ui/LoadingCircularBar';
import { msgAction } from '../redux/msgHandler/msgReducer';

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allHotels, isLoading } = useSelector((state) => state.allHotels);
  useEffect(() => {
    if (isLoading) {
      dispatch(fetchPosts());
    }
  }, [dispatch, isLoading]);
  // dispatch(fetchPosts());

  const handleClick = (e) => {
    e.preventDefault();

    dispatch(getHotel(e.target.id));
    navigate('/hotels');
  };

  const handleEdit = (e) => {
    e.preventDefault();

    dispatch(getHotel(e.target.id));
    navigate('/edithotel');
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.delete(`https://booooka-api.onrender.com/api/v1/hotels/${e.target.id}`, { withCredentials: true });
      // const res = await axios.delete(`http://localhost:5000/api/v1/hotels/${e.target.id}`, { withCredentials: true });
      const data = await res.data;

      dispatch(getAllHotelsAction.deleteHotel(e.target.id));
      dispatch(msgAction.getSuccessMsg(data));
      return data;
    } catch (error) {
      dispatch(msgAction.getErrorMsg('Error occured! Hotel was not deleted'));
      throw new Error(error.message);
    }
  };
  // setup drag width carousel
  const [width, setWidth] = useState(0);

  const carousel = useRef();

  useEffect(() => {
    if (allHotels.length > 0) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, [allHotels]);

  return (
    <div>
      <p className="heading_text" data-testid="heading-text">...you wanna book a hotel</p>

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

      <div className="main_card_container" data-testid="main_card_container">
        <motion.div ref={carousel} className="container-carousel">

          <motion.div drag="x" dragConstraints={{ right: 0, left: -width }} className="inner-carousel">
            {allHotels.map((hotel, index) => (
                // eslint-disable-next-line
                <motion.div key={hotel._id} className="card">
                  <h3 className="hotel_name">{hotel.name}</h3>
                  <motion.div className="img_container" whileTap={{ scale: 1.1 }}>
                    <img src={hotel.photos} alt={`${hotel.name}`} />
                  </motion.div>
                  <h4 className="city_name">{hotel.city}</h4>
                  <p className="desc">
                    Facilities:
                    {hotel.desc}
                  </p>
                  <div className="btn_container">
                    {/* eslint-disable-next-line */}
                    <button type="button" className="view_button" id={hotel._id} onClick={handleClick} style={{ backgroundColor: 'unset' }} data-testid={`view-button-${index}`}>
                        View and Book
                    </button>
                    {/* eslint-disable-next-line */}
                    <button type="button" className="view_button" id={hotel._id} onClick={handleEdit} style={{ backgroundColor: 'unset' }} data-testid={`view-button-${index}`}>
                        Edit
                    </button>
                    {/* eslint-disable-next-line */}
                    <button type="button" className="view_button" id={hotel._id} onClick={handleDelete} style={{ backgroundColor: 'unset' }}>Delete</button>
                  </div>
                </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
