import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BookHotel = () => {
  const room = useSelector((state) => state.room);
  let base64String = '';
  if (room) {
    base64String = btoa(String.fromCharCode(...room.photos.data.data));
  }

  const [bookDate, setBookDate] = useState();

  const hotel = useSelector((state) => state.hotel);
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    const body = {
      // eslint-disable-next-line
      hotel: hotel._id,
      // eslint-disable-next-line
      room: room._id,
      date: bookDate,
      // eslint-disable-next-line
      user: user._id,
    };

    try {
      await axios.post('http://localhost:5000/api/v1/reservations/', body, { withCredentials: true })
        .then((res) => {
          const { data } = res;
          return data;
        });
      navigate('/reservations');
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const handleCancel = () => {
    navigate('/hotels');
  };

  return (
    <>
      { room && (
      <div className="detail_container" style={{ marginTop: '5%' }}>

        <div className="img_container">
          <img src={`data:image/png;base64,${base64String}`} alt={room.title} />
        </div>

        <div className="detail_group" style={{ gap: '10px' }}>
          <h3>{room.title}</h3>
          <span style={{ fontFamily: "'Pacifico', cursive" }}>
            Facilities:
            {room.desc}
          </span>
          <span>
            Amount: $
            {room.price}
          </span>
          <span>
            Max per room:
            {room.maxPeople}
            {' '}
            Persons
          </span>
        </div>

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="date" className="date_label">
              Choose Date
              <input type="date" name="date" placeholder="Choose date" onChange={(e) => setBookDate(e.target.value)} />
            </label>
          </div>

          <div className="btn_container">
            <button className="create_button" type="submit">Book</button>
            <button type="button" onClick={handleCancel} className="btn btn-danger"> Cancel</button>
          </div>

        </form>

      </div>
      )}
    </>
  );
};

export default BookHotel;
