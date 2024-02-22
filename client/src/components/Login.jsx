import React, { useState } from 'react';
// import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import RestaurantFinder from "../apis/RestaurantFinder";

const Login = () => {
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
      await RestaurantFinder.post('/auth/login', formData);
      // Redirect or show a success message
      history('/profile'); // Redirect to profile page after successful login
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle error
    }
  };

  return (
    <div>
      <h2>Login</h2>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
