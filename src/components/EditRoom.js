import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// import { getAllHotelsAction } from '../redux/hotels/allHotelsReducer';

const EditRoom = () => {
  const { room } = useSelector((state) => state.room);
  const { allHotels } = useSelector((state) => state.allHotels);
  const [tempBody, setTempBody] = useState(null);
  useEffect(() => {
    setTempBody(room);
  }, [room]);
  console.log(tempBody);
  const [file] = useState({
    preview: null,
    data: null,
  });

  const handleChange = (e) => {
    e.preventDefault();
    setTempBody((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  console.log(tempBody);

  const handlePhotos = () => {

  };

  const handleCancel = () => {

  };

  const handleSelect = () => {

  };

  const onSubmit = () => {

  };
  return (
    <>
      <h3>Edit Room Information</h3>
      {tempBody
      && (
      <form onSubmit={onSubmit} className="hotel_form">
        <div className="form-group">
          <label htmlFor="title" className="name_label">
            Name of the Room
            <input type="text" name="title" value={tempBody.title} onChange={handleChange} className="name_input form-control" />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="maxPeople" className="name_label">
            Maximum Number of Persons Per Room
            <input type="text" name="maxPeople" value={tempBody.maxPeople} onChange={handleChange} className="name_input form-control" />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="price" className="name_label">
            Amount
            <input type="number" name="price" value={tempBody.price} onChange={handleChange} className="name_input form-control" />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="desc" className="name_label">
            Facilities
            <textarea type="text" name="desc" value={tempBody.desc} onChange={handleChange} className="name_input form-control" />
          </label>
        </div>

        {!file.preview && <div className="preview_img"><img src={tempBody.photos} alt="preview" style={{ width: '100%' }} /></div>}

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
      )}
    </>
  );
};

export default EditRoom;
