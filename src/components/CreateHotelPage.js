import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateHotel = () => {
  const navigate = useNavigate();

  const [body, setBody] = useState({
    name: '',
    desc: '',
    address: '',
    city: '',
    cheapest_price: '',
  });

  const [file, setFile] = useState({
    preview: '',
    photos: '',
  });

  const handlePhotos = (e) => {
    setFile({
      preview: URL.createObjectURL(e.target.files[0]),
      photos: e.target.files[0],
    });
  };

  const [msg, setMsg] = useState('');

  const handleChange = (e) => {
    e.preventDefault();
    setBody((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('name', body.name);
    formData.append('desc', body.desc);
    formData.append('address', body.address);
    formData.append('city', body.city);
    formData.append('cheapest_price', body.cheapest_price);
    formData.append('photos', file.photos);
    // formData.append("file", file.photos.name)

    try {
      const res = await axios.post('https://booooka-api.onrender.com/api/v1/hotels', formData, { withCredentials: true },
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      const data = await res.data;

      setMsg(data.message);
      e.target.reset();
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <>
      <h1>Create Hotel</h1>
      {msg && <p>{msg}</p>}

      <form onSubmit={onSubmit} className="hotel_form">
        <div className="form-group">
          <label htmlFor="name" className="name_label">
            Name of Hotel
            <input type="text" name="name" placeholder="Enter Hotel Name" onChange={handleChange} className="name_input form-control" />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="desc" className="name_label">
            Address
            <input type="text" placeholder="Enter Hotel Address" name="address" onChange={handleChange} className="form-control" />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="city" className="name_label">
            City
            <input type="text" placeholder="Enter city" name="city" onChange={handleChange} className="form-control" />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="cheapest_price" className="name_label">
            Cheapest Price
            <input type="number" placeholder="Enter cheapest price" name="cheapest_price" onChange={handleChange} className="form-control" />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="desc" className="name_label">
            Facilities available
            <textarea type="text-area" placeholder="Describe available facilities" name="desc" onChange={handleChange} className="form-control" />
          </label>
        </div>

        {file.preview && <div className="preview_img"><img src={file.preview} alt="preview" style={{ width: '100%' }} /></div>}

        <div className="form-group">
          <label htmlFor="photos" className="name_label">
            Upload photos
            <input type="file" placeholder="Upload ohotos" name="photos" onChange={handlePhotos} className="form-control-file" />
          </label>
        </div>

        <div className="btn_container">
          <button className="create_button" type="submit">Create new hotel</button>
          <button type="button" onClick={handleCancel} className="btn btn-danger"> Cancel</button>
        </div>

      </form>

    </>
  );
};

export default CreateHotel;
