import axios from "axios";

const API = axios.create({
  baseURL: "https://eco-platform.onrender.com/api"
});

export default API;
