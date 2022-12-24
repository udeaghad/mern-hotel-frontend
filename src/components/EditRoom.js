import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { msgAction } from '../redux/msgHandler/msgReducer';

const EditRoom = () => {
  const dispatch = useDispatch();
  const { room } = useSelector((state) => state.room);

  const [changed, setChanged] = useState(false);

  const [tempBody, setTempBody] = useState(null);

  useEffect(() => {
    setTempBody(room);
  }, [room]);

  console.log(tempBody);

  const [file, setFile] = useState({
    preview: null,
    data: null,
  });

  const handleChange = (e) => {
    e.preventDefault();
    setTempBody((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    setChanged(true);
  };

  console.log(tempBody);

  const transformFile = (file) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFile({
          preview: URL.createObjectURL(file),
          data: reader.result,
        });
      };
    }
  };

  const handlePhotos = (e) => {
    transformFile(e.target.files[0]);
    setChanged(true);
  };

  const handleCancel = () => {

  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const newBody = { ...tempBody, photos: file.data ? file.data : room.photos };

    try {
      const res = await axios.put(
        //  eslint-disable-next-line
        `https://booooka-api.onrender.com/api/v1/rooms/${newBody._id}`, newBody, { withCredentials: true },
        { headers: { 'Content-Type': 'multipart/form-data' } },
      );
      // const res = await axios.post(
      //   `http://localhost:5000/api/v1/rooms/${chooseHotel}`, newBody, { withCredentials: true },
      // );
      const data = await res.data;
      dispatch(msgAction.getSuccessMsg(`${room.title} updated successfully`));
      setChanged(false);
      return data;
    } catch (error) {
      dispatch(msgAction.getErrorMsg('Error! Room could not be updated'));
      throw new Error(error.message);
    }
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

        <div className="btn_container">
          { changed && <button className="create_button" type="submit">Save</button> }
          <button type="button" onClick={handleCancel} className="btn btn-danger"> Cancel</button>
        </div>

      </form>
      )}
    </>
  );
};

export default EditRoom;
