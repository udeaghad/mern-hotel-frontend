import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const [body, setBody] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    e.preventDefault();
    setBody((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/v1/auths/register', body, { withCredentials: true });
      const data = await res.data;
      navigate('/signin');
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
      <h1 style={{ textAlign: 'center', marginTop: '10%' }}>Sign Up</h1>
      <form onSubmit={onSubmit} className="sign_in_form">

        <div className="form-group">
          <label htmlFor="username" className="name_label">
            Username
            <input type="text" placeholder="Enter Your Username" name="username" onChange={handleChange} className="form-control" />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="email" className="name_label">
            E mail
            <input type="email" placeholder="Enter Your Email" name="email" onChange={handleChange} className="form-control" />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="password" className="name_label">
            Password
            <input type="password" placeholder="Enter Your Password" name="password" onChange={handleChange} className="form-control" />
          </label>
        </div>

        <div className="btn_container">
          <button className="create_button" type="submit">Sign Up</button>
          <button type="button" onClick={handleCancel} className="btn btn-danger"> Cancel</button>
        </div>

      </form>
    </>
  );
};

export default SignUpPage;
