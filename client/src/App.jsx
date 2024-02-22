import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import UpdatePage from "./routes/UpdatePage";
import RestaurantDetailPage from "./routes/RestaurantDetailPage";
import { RestaurantsContextProvider } from "./context/RestaurantsContext";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";

const App = () => {
  return (
     <RestaurantsContextProvider>
      <div className="container">
         <Router> 
          <Routes>
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/" element={<Home />} />
            <Route exact path="/restaurants/:id/update" element={<UpdatePage />} />
            <Route exact path="/restaurants/:id" element={<RestaurantDetailPage/>} />
          </Routes>
         </Router>
      </div>
     </RestaurantsContextProvider>
  );
};

export default App;