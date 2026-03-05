import axios from "axios";

/**
 * ===== AXIOS INSTANCE SETUP =====
 */
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://localhost:7161",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds
});

/**
 * ===== REQUEST INTERCEPTOR =====
 * Thêm token vào mỗi request + cache-busting
 */
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Cache-busting cho GET requests
    if (config.method === "get") {
      config.params = {
        ...config.params,
        _t: new Date().getTime(),
      };
      config.headers["Cache-Control"] = "no-cache, no-store, must-revalidate";
      config.headers["Pragma"] = "no-cache";
      config.headers["Expires"] = "0";
    }
    
    return config;
  },
  (error) => {
    console.error("❌ Request interceptor error:", error);
    return Promise.reject(error);
  }
);

/**
 * ===== RESPONSE INTERCEPTOR =====
 * Xử lý lỗi, token expiry, etc.
 */
axiosClient.interceptors.response.use(
  (response) => {
    // Success
    return response;
  },
  (error) => {
    // Handle 401 - token expired
    if (error.response?.status === 401) {
      console.warn("⚠️  Token expired, logging out...");
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
    }
    
    console.error("❌ API Error:", {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      url: error.config?.url,
    });
    
    return Promise.reject(error);
  }
);

/**
 * ===== CART API =====
 */


const getCart = async () => {
  const response = await axiosClient.get(`/api/Cart`);
  return response.data;
}
const getCartItems = async () => {
  
  const response = await axiosClient.get(`/api/CartItem`);
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

/**
 * ===== WISHLIST API =====
 */
const getWishlist = async () => {
  try {
    const response = await axiosClient.get(`/api/Wishlist`);
    console.log("✅ GET /api/Wishlist success", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ getWishlist failed:", error.message);
    throw error;
  }
};

const addToWishlist = async (bikeId) => {
  try {
    const response = await axiosClient.post(`/api/Wishlist/${bikeId}`);
    console.log("✅ POST /api/Wishlist/{bikeId} success", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ addToWishlist failed:", error.message);
    throw error;
  }
};

const removeFromWishlist = async (bikeId) => {
  try {
    const response = await axiosClient.delete(`/api/Wishlist/${bikeId}`);
    console.log("✅ DELETE /api/Wishlist/{bikeId} success", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ removeFromWishlist failed:", error.message);
    throw error;
  }
};

/**
 * ===== SELLER/LISTINGS API =====
 */
const getSellerListings = async () => {
  try {
    const response = await axiosClient.get(`/api/buyer-bikes`);
    console.log("✅ GET /api/buyer-bikes success", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ getSellerListings failed:", error.message);
    throw error;
  }
};

/**
 * ===== EXPORTS =====
 */
export {
  getCart,
  getCartItems,
  addCartItem,
  deleteCartItem,
  toggleCartItem,
  validateCart,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  getSellerListings,
};

export default axiosClient;
