import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import moment from 'moment';

const ReservationPage = () => {
  const user = useSelector((state) => state.user);

  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line
    axios.get(`https://booooka-api.onrender.com/api/v1/reservations/${user._id}`, { withCredentials: true })
    // eslint-disable-next-line
    // axios.get(`http://localhost:5000/api/v1/reservations/${user._id}`, { withCredentials: true })
      .then((res) => {
        const { data } = res;
        setReservations(data);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }, [user]);

  const handleDelete = (e) => {
    e.preventDefault();
    axios.delete(`https://booooka-api.onrender.com/api/v1/reservations/${e.target.id}`, { withCredentials: true });
    // eslint-disable-next-line
    setReservations(reservations.filter((reservation) => reservation._id !== e.target.id));
  };

  return (
    <>

      {reservations && reservations.map((reservation) => (
          // eslint-disable-next-line
          <div key={reservation._id} className="reserve_container">
            <h3 style={{ margin: '5%' }}>Reservation Details</h3>
            <div className="hotel_details_container">
              <div className="hotel_info_container">
                <p>
                  Booked Date:
                  {moment(reservation.date).format('MMM Do YYYY')}
                </p>
                <p>
                  Hotel Name:
                  {reservation.hotel.name}
                </p>
                <p>
                  Address:
                  {reservation.hotel.address}
                  ,
                  {reservation.hotel.city}
                </p>
                <p>
                  Facilities:
                  {reservation.hotel.desc}
                </p>
              </div>
              <div className="hotel_img_container">
                <img src={reservation.hotel.photos} alt={reservation.hotel.name} style={{ width: '100%' }} />
              </div>

            </div>

            <div className="hotel_details_container">

              <div className="hotel_info_container">
                <p>
                  Room Name:
                  {reservation.room.title}
                </p>
                <p>
                  Max per Room:
                  {reservation.room.maxPeople}
                  {' '}
                  Persons
                </p>
                <p>
                  Amount: $
                  {reservation.room.price}
                </p>
                <p>
                  Facilities:
                  {reservation.room.desc}
                </p>
              </div>

              <div className="hotel_img_container">
                <img src={reservation.room.photos} alt={reservation.room.title} style={{ width: '100%' }} />
              </div>
            </div>

            <div className="btn_container" style={{ margin: '5%' }}>
              {/* eslint-disable-next-line */}
              <button id={reservation._id} type="button" onClick={handleDelete} className="create_button">Delete</button>
            </div>
          </div>
      ))}

    </>
  );
};

export default ReservationPage;
