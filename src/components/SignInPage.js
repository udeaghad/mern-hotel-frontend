import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import getUser from '../redux/auths/usersAction';

const SignInPage = () => {
  const [body, setBody] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    e.preventDefault(
      setBody((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      })),
    );
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('https://booooka-api.onrender.com/api/v1/auths/login', body, { withCredentials: true });
        .then((res) => {
          const data = res.data;

          dispatch(getUser(data));
          localStorage.setItem('user', JSON.stringify(data));

        });
      navigate('/');
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <>
      <h1 style={{ textAlign: 'center', marginTop: '10%' }}>Sign In</h1>
      <form onSubmit={onSubmit} className="sign_in_form">
        <div className="form-group">
          <label htmlFor="username" className="name_label">
            Username:
            <input type="text" name="username" placeholder="Enter your username" onChange={(e) => handleChange(e)} className="form-control" />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="password" className="name_label">
            Password:
            <input type="password" name="password" placeholder="Enter your password" onChange={(e) => handleChange(e)} className="form-control" />
          </label>
        </div>

        <div className="btn_container">
          <button className="create_button" type="submit">Sign In</button>
          <button type="button" onClick={handleCancel} className="btn btn-danger"> Cancel</button>
        </div>

      </form>
    </>

  );
};

export default SignInPage;
