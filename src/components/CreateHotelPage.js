import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getAllHotelsAction } from '../redux/hotels/allHotelsReducer';
import { msgAction } from '../redux/msgHandler/msgReducer';

const CreateHotel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //  eslint-disable-next-line
  const [body, setBody] = useState({
    name: '',
    desc: '',
    address: '',
    city: '',
    cheapest_price: '',
  });

  const [file, setFile] = useState({
    preview: null,
    photos: null,
  });

  const transformFile = (file) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFile({
          preview: URL.createObjectURL(file),
          photos: reader.result,
        });
      };
    } else {
      setFile({
        preview: null,
        photos: null,
      });
    }
  };

  const handlePhotos = (e) => {
    transformFile(e.target.files[0]);
  };
  //  eslint-disable-next-line
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
    const newBody = { ...body, photos: file.photos };
    try {
      // const res = await axios.post('http://localhost:5000/api/v1/hotels', newBody, { withCredentials: true });
      const res = await axios.post('https://booooka-api.onrender.com/api/v1/hotels', newBody, { withCredentials: true });
      const data = await res.data;
      dispatch(getAllHotelsAction.addHotel(data.hotel));
      dispatch(msgAction.getSuccessMsg(data.message));
    } catch (error) {
      dispatch(msgAction.getErrorMsg('Error! Hotel could not created'));
      throw new Error(error.message);
    }

    e.target.reset();
    setFile({
      preview: null,
      photos: null,
    });
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <>
      <h1>Create Hotel</h1>

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
            <input type="file" placeholder="Upload photos" name="photos" onChange={handlePhotos} className="form-control-file" />
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
