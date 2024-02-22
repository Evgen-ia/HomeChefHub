import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const history = useNavigate();

  const handleRedirectHome = () => {
    history('../routes/Home');
  };

  return (
    <div>
      <h2>Profile</h2>
      <p>Welcome to your profile page!</p>
      <button onClick={handleRedirectHome}>Go to Home</button>
    </div>
  );
};

export default Profile;
