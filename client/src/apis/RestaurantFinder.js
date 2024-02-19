import axios from "axios";

export default axios.create({
  baseURL: "https://homechefhub-2.onrender.com:10000/api/v1/restaurants",
});