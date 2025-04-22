// src/utils/authService.js
import axios from "axios";

const API = "http://localhost:5000/api/auth";

export const signupUser = (userData) => axios.post(`${API}/signup`, userData);
export const loginUser = (userData) => axios.post(`${API}/login`, userData);
