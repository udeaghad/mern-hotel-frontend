import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { getAllHotelsAction } from '../redux/hotels/allHotelsReducer';
import { msgAction } from '../redux/msgHandler/msgReducer';

const EditHotel = () => {
  const { hotel } = useSelector((state) => state.hotel);
  const dispatch = useDispatch();
  console.log(hotel);
  const [changed, setChanged] = useState(false);

  const [tempBody, setTempBody] = useState({
    name: '',
    address: '',
    city: '',
    cheapest_price: '',
    desc: '',
    photos: '',
  });

  useEffect(() => {
    setTempBody({
      name: hotel.name,
      address: hotel.address,
      city: hotel.city,
      cheapest_price: hotel.cheapest_price,
      desc: hotel.desc,
      photos: hotel.photos,
    });
  }, [hotel]);

  const [file] = useState({
    preview: '',
    photos: '',
  });
  const handleChange = (e) => {
    e.preventDefault();
    setTempBody((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    setChanged(true);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      //  eslint-disable-next-line
      const res = await axios.put(`https://booooka-api.onrender.com/api/v1/hotels/${hotel._id}`, tempBody, { withCredentials: true });
      const data = await res.data;
      console.log(data.hotel);
      dispatch(getAllHotelsAction.updateHotel(data.hotel));
      dispatch(msgAction.getSuccessMsg(`${tempBody.name} was updated successfully`));
    } catch (error) {
      dispatch(msgAction.getErrorMsg('Error! Hotel failed to update'));
      throw new Error(error.message);
    }
  };

  const handlePhotos = () => {

  };

  const handleCancel = () => {

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
            Upload photos
            <input type="file" placeholder="Upload photos" name="photos" onChange={handlePhotos} className="form-control-file" />
          </label>
        </div>

        <div className="btn_container">
          { changed && <button className="create_button" type="submit">Save</button> }
          <button type="button" onClick={handleCancel} className="btn btn-danger"> Cancel</button>
        </div>

      </form>
      )}
    </>
  );
};

export default EditHotel;
