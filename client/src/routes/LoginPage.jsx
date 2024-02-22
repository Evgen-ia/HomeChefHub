// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import RestaurantFinder from "../apis/RestaurantFinder";
// import axios from "axios";

// const LoginPage = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState(null);
//   const history = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("/api/login", formData);
//       // Assuming the server responds with a token upon successful login
//       const token = response.data.token;
//       // Store the token in localStorage or sessionStorage
//       localStorage.setItem("token", token);
//       // Redirect to the desired page after successful login
//       history("/dashboard");
//     } catch (err) {
//       setError(err.response.data.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Login Page</h2>
//       {error && <div>{error}</div>}
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;
