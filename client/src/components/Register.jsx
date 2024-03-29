// Register.js
import React, { useState } from 'react';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import RestaurantFinder from "../apis/RestaurantFinder";

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const history = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await RestaurantFinder.post('auth/register', formData);
      // Redirect to login page after successful registration
      history('/login');
    } catch (error) {
      console.error('Error registering:', error);
      // Handle error
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
