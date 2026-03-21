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
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  console.log("Token đang gửi đi:", token);
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Bắt buộc phải return config để Axios tiếp tục gửi request đi
  return config; 
});
/**
 * ===== RESPONSE INTERCEPTOR =====
 * Xử lý lỗi, token expiry, etc.
 */
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const apiBaseUrl = import.meta.env.VITE_API_URL || "https://localhost:7161";

    // Chỉ xử lý nếu lỗi 401 và chưa retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const storedRefreshToken = localStorage.getItem("refreshToken");
        if (!storedRefreshToken) throw new Error("No refresh token");

        console.log("🔄 Đang gửi yêu cầu làm mới token...");

        // GỌI API RENEW
        const response = await axios.post(`${apiBaseUrl}/api/Auth/renew-token`, {
          refreshToken: storedRefreshToken
        });

        // Kiểm tra logic thành công dựa trên cấu trúc API của bạn
        // Giả sử thành công trả về dữ liệu trong response.data
        if (response.data && (response.data.token || response.data.accessToken)) {
          const newAccessToken = response.data.token || response.data.accessToken;
          const newRefreshToken = response.data.refreshToken;

          // 1. Cập nhật lại kho lưu trữ
          localStorage.setItem("accessToken", newAccessToken);
          if (newRefreshToken) {
            localStorage.setItem("refreshToken", newRefreshToken);
          }

          console.log("✅ Token đã được cập nhật tự động.");

          // 2. Thực hiện lại request bị lỗi với token mới
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosClient(originalRequest);
        }
      } catch (refreshError) {
        // Nếu API renew trả về success: false hoặc lỗi 400/500
        console.error("🚨 Phiên đăng nhập hết hạn hoàn toàn.");
        
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("role");
        localStorage.removeItem("user");

        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    }


    return Promise.reject(error);
  }
);

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
    console.log(" GET /api/Wishlist success", response.data);
    return response.data;
  } catch (error) {
    console.error(" getWishlist failed:", error.message);
    throw error;
  }
};

const addToWishlist = async (bikeId) => {
  try {
    // Điểm mấu chốt: Thêm {} vào tham số thứ 2 để báo cho backend biết body không bị lỗi
    const response = await axiosClient.post(`/api/Wishlist/${bikeId}`, {});

    console.log(" POST /api/Wishlist/{bikeId} success", response.data);
    return response.data;
  } catch (error) {
    console.error(" addToWishlist failed:", error.response?.data || error.message);
    throw error;
  }
};

const removeFromWishlist = async (bikeId) => {
  try {
    const response = await axiosClient.delete(`/api/Wishlist/${bikeId}`);
    console.log(" DELETE /api/Wishlist/{bikeId} success", response.data);
    return response.data;
  } catch (error) {
    console.error(" removeFromWishlist failed:", error.message);
    throw error;
  }
};

const getSellerListings = async () => {
  try {
    const response = await axiosClient.get(`/api/buyer/listings`);

    return response.data;
  } catch (error) {
    console.error(" getSellerListings failed:", error.message);
    throw error;
  }
};
////////////////////

const isBuying = async () => {
  try {
    const cart = await getCart(); // Lấy thông tin cart hiện tại
    const response = await axiosClient.get(`/api/CartItem/validate`);
    console.log("✅ GET /api/CartItem/validate success:", response.data);
    return response.data;
  } catch (error) {
    console.error(" isBuying failed:", error.message);
    throw error;
  }
};

///////////////
const CheckOut = async (data) => {
  try {

    const response = await axiosClient.post(`/api/Order/checkout`, data);

    console.log(" POST /api/Order/checkout success:", response.data);
    return response.data;
  } catch (error) {
    console.error(" CheckOut failed:", error.message);
    throw error;
  }
};

/* API Orders */
const getOrder = async (id) => {
  try {
    const response = await axiosClient.get(`/api/Order/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getMyOrder = async (id) => {
  try {
    // Truyền trực tiếp tham số id vào đường dẫn
    const response = await axiosClient.get(`/api/Order/my-orders`);

    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy thông tin đơn hàng:", error);
    throw error;
  }
};

const getBikeDetail = async (id) => {
  try {

    const response = await axiosClient.get(`/api/buyer/listings/${id}`, {
      // params: { id: listingId }
    });
    console.log("data", response.data);
    if (Array.isArray(response.data)) {
      return response.data[0];
    }
    return response.data?.data || response.data;
  } catch (error) {
    throw error;
  }
};

const getPayos = async (id) => {
  try {
    const response = await axiosClient.post(`/api/payos/checkout`, { orderId: id });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const cancelOrder = async (id) => {
  try {
    
    const response = await axiosClient.post(`/api/Order/${id}/cancel`);
    return response.data;
  } catch (error) {
    console.error(`Lỗi hủy đơn ${id}:`, error);
    throw error; 
  }
};

const searchListings = async (name = "", pageNumber = 1, pageSize = 12) => {
    // Truyền params cho phương thức GET
    const response = await axiosClient.get('/api/buyer/listings/search', {
        params: {
            name: name,
            pageNumber: pageNumber,
            pageSize: pageSize
        }
    });
    return response.data;
};

const postReview = async (data) => {
  try {
    const response = await axiosClient.post(`/api/Review`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const postReport = async (payload) => {
  try {
    const { data } = await axiosClient.post(`/api/Report/send-report`, payload);
    return data; 
  } catch (error) {
    console.error("API Report Error:", error.response?.data || error.message);
    throw error;
  }
};

const buyNowOrder = async (bikeId) => {
  try {
    // API này nhận bikeId qua Path, không thấy khai báo Body trong tài liệu
    const { data } = await axiosClient.post(`/api/Order/buy-now/${bikeId}`);
    return data;
  } catch (error) {
    // Log lỗi chi tiết để dễ debug
    console.error("API Buy Now Error:", error.response?.data || error.message);
    throw error;
  }
};
const filterBuyerListings = async (filterList = [], pageNumber = 1, pageSize = 12) => {
  try {
    // filterList chính là Request body dạng mảng string: ["Mtb", "Giant", ...]
    const { data } = await axiosClient.post(
      '/api/buyer/listings/filter', 
      filterList, 
      {
        params: {
          pageNumber: pageNumber,
          pageSize: pageSize
        }
      }
    );
    return data;
  } catch (error) {
    console.error("API Filter Listings Error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * ===== EXPORTS =====
 */
export {
  filterBuyerListings,
  buyNowOrder,
  postReport,
  postReview,
  searchListings,
  cancelOrder,
  getPayos,
  getBikeDetail,
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
  isBuying,
  CheckOut,
  getOrder,
  getMyOrder
};

  export default axiosClient;
