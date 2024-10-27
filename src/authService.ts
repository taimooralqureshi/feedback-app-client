// src/authService.ts
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const API_URL = 'http://localhost:5000/api/auth'; // Change this to your API URL

interface LoginResponse {
  token: string;
}

// Function to handle user login
export const login = async (username: string, password: string): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(`${API_URL}/login`, { username, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token); // Store JWT in localStorage
  }
  return response.data;
};

// Function to handle user logout
export const logout = (): void => {
  localStorage.removeItem('token'); // Remove JWT from localStorage
};

// Function to get the current user from the token
interface User {
  id: string;
  username: string;
  // Add other user properties as needed
}

export const getCurrentUser = (): User | null => {
  const token = localStorage.getItem('token');
  if (token) {
    return jwt_decode<User>(token); // Decode the token to get user data
  }
  return null;
};
