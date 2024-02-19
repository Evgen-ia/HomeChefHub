import React, { useState, createContext } from "react";

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = (props) => {
  const [restaurants, setRestaurants] = useState([]);
//   console.log(restaurants);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const addRestaurants = (restaurant) => {
    console.log("Current restaurants:", restaurants, '\n', props, '\n', restaurant);
    //setRestaurants([...restaurants, restaurant]);
    setRestaurants(restaurants.concat(restaurant));

  };

  return (
    <RestaurantsContext.Provider
      value={{
        restaurants,
        setRestaurants,
        addRestaurants,
        selectedRestaurant,
        setSelectedRestaurant,
      }}        
    >
      {props.children}
    </RestaurantsContext.Provider>
  );
};