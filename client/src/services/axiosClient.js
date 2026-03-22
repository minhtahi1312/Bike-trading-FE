import axios from "axios";

/**
 * ===== AXIOS INSTANCE SETUP =====
 */
const apiBaseUrl = import.meta.env.VITE_API_URL || "https://localhost:7161";

/**
 */
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

/**
 * ===== AXIOS INSTANCE SETUP =====
 */
const axiosClient = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
  withCredentials: true,
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  
  console.log("Token đang gửi đi:", token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * ===== RESPONSE INTERCEPTOR =====
 */
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = "Bearer " + token;
            return axiosClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        console.log(" Access Token hết hạn. Đang Renew...");

      
        const response = await axios.post(
          `${apiBaseUrl}/api/Auth/renew-token`, 
          {}, 
          { withCredentials: true }
        );

        const newAccessToken = response.data?.token || response.data?.accessToken;

        if (newAccessToken) {
          localStorage.setItem("accessToken", newAccessToken);
          console.log(" Renew thành công!");
          
          processQueue(null, newAccessToken);
          
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosClient(originalRequest);
        } else {
          throw new Error("BE không trả về Access Token mới");
        }
      } catch (refreshError) {
        console.error(" Phiên đăng nhập hết hạn hoàn toàn.");
        processQueue(refreshError, null);
        
        localStorage.removeItem("accessToken");
        localStorage.removeItem("role");
        localStorage.removeItem("user");

        if (window.location.pathname !== "/login") {
           window.location.href = "/login";
        }
        
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
const getCart = async () => {
  const response = await axiosClient.get(`/api/Cart`);
  return response.data;
};
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
  const response = await axiosClient.patch(
    `/api/CartItem/toggle/${cartItemId}`,
  );
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
    console.error(
      " addToWishlist failed:",
      error.response?.data || error.message,
    );
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
    const response = await axiosClient.post(`/api/payos/checkout`, {
      orderId: id,
    });
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
  const response = await axiosClient.get("/api/buyer/listings/search", {
    params: {
      name: name,
      pageNumber: pageNumber,
      pageSize: pageSize,
    },
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

/**Seller */

// lấy danh sách review
const getSellerReviews = async () => {
  try {
    const response = await axiosClient.get(`/api/SellerReview`);
    console.log("GET /api/SellerReview success:", response.data);
    return response.data;
  } catch (error) {
    console.error("getSellerReviews failed:", error.message);
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

// lấy thống kê review
const getReviewSummary = async () => {
  try {
    const response = await axiosClient.get(`/api/SellerReview/summary`);
    console.log("GET /api/SellerReview/summary success:", response.data);
    return response.data;
  } catch (error) {
    console.error("getReviewSummary failed:", error.message);
    throw error;
  }
};

const getSellerReports = async () => {
  try {
    const response = await axiosClient.get(`/api/SellerReport`);
    console.log("GET /api/SellerReport success:", response.data);
    return response.data;
  } catch (error) {
    console.error("getSellerReports failed:", error.message);
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
const filterBuyerListings = async (
  filterList = [],
  pageNumber = 1,
  pageSize = 12,
) => {
  try {
    // filterList chính là Request body dạng mảng string: ["Mtb", "Giant", ...]
    const { data } = await axiosClient.post(
      "/api/buyer/listings/filter",
      filterList,
      {
        params: {
          pageNumber: pageNumber,
          pageSize: pageSize,
        },
      },
    );
    return data;
  } catch (error) {
    console.error(
      "API Filter Listings Error:",
      error.response?.data || error.message,
    );

    throw error;
  }
};

// ===== WALLET =====
const getWithdrawals = async () => {
  try {
    const response = await axiosClient.get(`/api/SellerWallet/withdrawals`);
    console.log("GET withdrawals success:", response.data);
    return response.data;
  } catch (error) {
    console.error("getWithdrawals failed:", error.message);
    throw error;
  }
};

//  Balance seller
const getWalletFinance = async () => {
  const response = await axiosClient.get(`/api/SellerWallet/finance`);
  return response.data;
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
  getMyOrder,
  getSellerReviews,
  getReviewSummary,
  getSellerReports,
  getWithdrawals,
  getWalletFinance,
};

export default axiosClient;
