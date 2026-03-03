import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Cart API helpers (for CartBuyer.jsx)
const getCartItems = async (cartId) => {
  const response = await axiosClient.get(`/api/CartItem/${cartId}`);
  return response.data;
};

const addCartItem = async (bikeId) => {
  const response = await axiosClient.post(`/api/CartItem/${bikeId}`);
  return response.data;
};

const deleteCartItem = async (cartItemId) => {
  const response = await axiosClient.delete(`/api/CartItem/${cartItemId}`);
  return response.data;
};

const toggleCartItem = async (cartItemId) => {
  const response = await axiosClient.patch(`/api/CartItem/toggle/${cartItemId}`);
  return response.data;
};

const validateCart = async (cartId) => {
  const response = await axiosClient.get(`/api/CartItem/validate/${cartId}`);
  return response.data;
};

// Wishlist API
const getWishlist = async () => {
  const response = await axiosClient.get(`/api/Wishlist`);
  return response.data;
};

const addToWishlist = async (bikeId) => {
  const response = await axiosClient.post(`/api/Wishlist/${bikeId}`);
  return response.data;
};

const removeFromWishlist = async (bikeId) => {
  const response = await axiosClient.delete(`/api/Wishlist/${bikeId}`);
  return response.data;
};

export {
  getCartItems,
  addCartItem,
  deleteCartItem,
  toggleCartItem,
  validateCart,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
};

export default axiosClient;
