import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CreateRoom = () => {
  const navigate = useNavigate();
  const [body, setBody] = useState({
    title: '',
    desc: '',
    maxPeople: '',
    price: '',
  });

  const [chooseHotel, setChooseHotel] = useState('');

  const handleSelect = (e) => {
    e.preventDefault();

    setChooseHotel(e.target.value);
  };

  const handleChange = (e) => {
    setBody((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const [file, setFile] = useState({
    preview: '',
    data: '',
  });

  const handlePhotos = (e) => {
    setFile({
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    });
  };

  const [msg, setMsg] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', body.title);
    formData.append('maxPeople', body.maxPeople);
    formData.append('desc', body.desc);
    formData.append('price', body.price);
    formData.append('photos', file.data);
    try {
      const res = await axios.post(
        `https://booooka-api.onrender.com/api/v1/rooms/${chooseHotel}`, formData, { withCredentials: true },
        { headers: { 'Content-Type': 'multipart/form-data' } },
      );
      const data = await res.data;

      setMsg(data.message);
      e.target.reset();
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const allHotels = useSelector((state) => state.allHotels);

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <>
      <h1>Create Room</h1>
      {msg && <p>{msg}</p>}

      <form onSubmit={onSubmit} className="hotel_form">
        <div className="form-group">
          <label htmlFor="title" className="name_label">
            Name of the Room
            <input type="text" name="title" placeholder="Enter Room Name" onChange={handleChange} className="name_input form-control" />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="maxPeople" className="name_label">
            Maximum Number of Persons Per Room
            <input type="text" name="maxPeople" placeholder="Max Number per room" onChange={handleChange} className="name_input form-control" />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="price" className="name_label">
            Amount
            <input type="number" name="price" placeholder="Enter Room Price" onChange={handleChange} className="name_input form-control" />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="desc" className="name_label">
            Facilities
            <textarea type="text" name="desc" placeholder="Available Facilities" onChange={handleChange} className="name_input form-control" />
          </label>
        </div>

        {file.preview && <div className="preview_img"><img src={file.preview} alt="preview" style={{ width: '100%' }} /></div>}

        <div className="form-group">
          <label htmlFor="photos" className="name_label">
            Upload photos
            <input type="file" placeholder="Upload ohotos" name="photos" onChange={handlePhotos} className="form-control-file" />
          </label>
        </div>

        <div className="form-group">

          <select name="hotelID" onChange={handleSelect} style={{ marginTop: '1rem' }}>
            <option value="">Select Hotel</option>
            {allHotels.map((hotel) => (
              // eslint-disable-next-line
              <option key={hotel._id} value={hotel._id}>{hotel.name}</option>

            ))}
          </select>

        </div>

        <div className="btn_container">
          <button className="create_button" type="submit">Create new room</button>
          <button type="button" onClick={handleCancel} className="btn btn-danger"> Cancel</button>
        </div>

      </form>
    </>
  );
};

export default CreateRoom;
