import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getAllHotelsAction } from '../redux/hotels/allHotelsReducer';
import { msgAction } from '../redux/msgHandler/msgReducer';

const EditHotel = () => {
  const navigate = useNavigate();
  const { hotel } = useSelector((state) => state.hotel);
  const dispatch = useDispatch();
  const [changed, setChanged] = useState(false);

  const [tempBody, setTempBody] = useState({});

  useEffect(() => {
    setTempBody(hotel);
  }, [hotel]);

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

  const handleChange = (e) => {
    e.preventDefault();
    setTempBody((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    setChanged(true);
  };

  const handlePhotos = (e) => {
    transformFile(e.target.files[0]);
    setChanged(true);
  };

  const handleCancel = () => {
    navigate('/');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const newBody = { ...tempBody, photos: file.photos ? file.photos : hotel.photos };
    try {
      //  eslint-disable-next-line
      const res = await axios.put(`https://booooka-api.onrender.com/api/v1/hotels/${hotel._id}`, newBody, { withCredentials: true });
      const data = await res.data;

      dispatch(getAllHotelsAction.updateHotel(data.hotel));
      dispatch(msgAction.getSuccessMsg(`${tempBody.name} was updated successfully`));
      setChanged(false);
    } catch (error) {
      dispatch(msgAction.getErrorMsg('Error! Hotel failed to update'));
      throw new Error(error.message);
    }
  };

  return (

    <>
      <h3>Edit Hotel Information</h3>
      { tempBody
      && (
      <form onSubmit={onSubmit} className="hotel_form">
        <div className="form-group">
          <label htmlFor="name" className="name_label">
            Name of Hotel
            <input type="text" name="name" value={tempBody.name} onChange={handleChange} className="name_input form-control" />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="desc" className="name_label">
            Address
            <input type="text" value={tempBody.address} name="address" onChange={handleChange} className="form-control" />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="city" className="name_label">
            City
            <input type="text" value={tempBody.city} name="city" onChange={handleChange} className="form-control" />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="cheapest_price" className="name_label">
            Cheapest Price
            <input type="number" value={tempBody.cheapest_price} name="cheapest_price" onChange={handleChange} className="form-control" />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="desc" className="name_label">
            Facilities available
            <textarea type="text-area" value={tempBody.desc} name="desc" onChange={handleChange} className="form-control" />
          </label>
        </div>

        {!file.preview && <div className="preview_img"><img src={tempBody.photos} alt="preview" style={{ width: '100%' }} /></div>}

        {file.preview && <div className="preview_img"><img src={file.preview} alt="preview" style={{ width: '100%' }} /></div>}

        <div className="form-group">
          <label htmlFor="photos" className="name_label">
            Update photos
            <input type="file" placeholder="Upload photos" name="photos" onChange={handlePhotos} className="form-control-file" />
          </label>
        </div>

        <div className="btn_container">
          { changed && <button className="create_button" type="submit">Save</button> }
          <button type="button" onClick={handleCancel} className="btn btn-danger"> Go Back</button>
        </div>

      </form>
      )}
    </>
  );
};

export default EditHotel;
