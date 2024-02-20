import axios from "axios";

export default axios.create({
  baseURL: 'https://homechefhub-2.onrender.com/api/v1/restaurants',
});