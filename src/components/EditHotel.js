import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const EditHotel = () => {
  const { hotel } = useSelector((state) => state.hotel);

  useEffect(() => {
    console.log(hotel);
  });

  const [file] = useState({
    preview: '',
    photos: '',
  });
  const handleChange = () => {

  };

  const onSubmit = () => {

  };

  const handlePhotos = () => {

  };

  const handleCancel = () => {

  };

  return (

    <>
      <h3>Edit Hotel Information</h3>

      <form onSubmit={onSubmit} className="hotel_form">
        <div className="form-group">
          <label htmlFor="name" className="name_label">
            Name of Hotel
            <input type="text" name="name" value={hotel.name} onChange={handleChange} className="name_input form-control" />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="desc" className="name_label">
            Address
            <input type="text" value={hotel.address} name="address" onChange={handleChange} className="form-control" />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="city" className="name_label">
            City
            <input type="text" value={hotel.city} name="city" onChange={handleChange} className="form-control" />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="cheapest_price" className="name_label">
            Cheapest Price
            <input type="number" value={hotel.cheapest_price} name="cheapest_price" onChange={handleChange} className="form-control" />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="desc" className="name_label">
            Facilities available
            <textarea type="text-area" value={hotel.desc} name="desc" onChange={handleChange} className="form-control" />
          </label>
        </div>

        {!file.preview && <div className="preview_img"><img src={hotel.photos} alt="preview" style={{ width: '100%' }} /></div>}

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

export default EditHotel;
