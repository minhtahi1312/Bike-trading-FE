// /* eslint-disable */

import { Search, Pencil, Calendar, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function SellerListings() {
  const [bikeStatusMap, setBikeStatusMap] = useState({});
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [allListings, setAllListings] = useState([]);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);

  const [sort, setSort] = useState("newest");

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const sourceData = search ? allListings : listings;
  const getDisplayStatus = (listingStatus, bikeStatus) => {
    if (listingStatus === "Draft") return "Draft";

    if (
      listingStatus === "PendingApproval" &&
      bikeStatus === "PendingInspection"
    )
      return "PendingApproval";

    if (listingStatus === "Active" && bikeStatus === "PendingInspection")
      return "PendingInspection";

    if (listingStatus === "Active" && bikeStatus === "Available")
      return "Active";
    if (listingStatus === "Active" && bikeStatus === "Sold") return "Sold";

    if (listingStatus === "Rejected" && bikeStatus === "Disabled")
      return "Rejected";

    return listingStatus;
  };

  const processedListings = sourceData
    .filter((item) => item.title?.toLowerCase().includes(search.toLowerCase()))
    .filter((item) => {
      const bikeStatus = bikeStatusMap[item.id] || item.status;

      const displayStatus = getDisplayStatus(item.status, bikeStatus);
      console.log("COMPARE:", displayStatus, "==", status);

      return status ? displayStatus === status : true;
    })
    .sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);

      return sort === "newest" ? dateB - dateA : dateA - dateB;
    });

  const pageSize = 10;

  const paginatedListings = processedListings.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );
  const totalPages = Math.ceil(processedListings.length / pageSize);

  const filteredListings = listings.filter((item) =>
    item.title?.toLowerCase().includes(search.toLowerCase()),
  );

  const deleteListing = async (id) => {
    try {
      const res = await fetch(
        `https://bikestore-b7e3gudmenczf8bn.southeastasia-01.azurewebsites.net/api/seller/listings/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      );

      if (!res.ok) throw new Error();

      setListings((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      alert("Xóa thất bại");
    }
  };
  useEffect(() => {
    const fetchBikeStatus = async () => {
      const map = {};
      const source = search ? allListings : listings;
      for (const listing of source) {
        const res = await fetch(
          `https://bikestore-b7e3gudmenczf8bn.southeastasia-01.azurewebsites.net/api/seller/bikes/by-listing/${listing.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          },
        );

        const data = await res.json();
        map[listing.id] = data.items?.[0]?.status;
      }

      setBikeStatusMap(map);
    };

    if ((search ? allListings : listings).length) {
      fetchBikeStatus();
    }
  }, [listings, allListings, search]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const BASE_URL =
          "https://bikestore-b7e3gudmenczf8bn.southeastasia-01.azurewebsites.net";

        const url = `${BASE_URL}/api/seller/listings?pageNumber=1&pageSize=1000`;

        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        const data = await res.json();

        if (search) {
          setAllListings(data.items);
        } else {
          setListings(data.items);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, search, status, sort]);

  const statusMap = {
    Draft: "Bản nháp",
    PendingApproval: "Chờ duyệt",
    PendingInspection: "Chờ kiểm định",
    Active: "Công khai",
    Sold: "Đã bán",
    Inactive: "Ngừng hiển thị",
    Rejected: "Bị từ chối",
  };

  const statusStyle = {
    Draft: "bg-gray-100 text-gray-700",
    PendingApproval: "bg-yellow-100 text-yellow-700",
    PendingInspection: "bg-blue-100 text-blue-700",
    Active: "bg-emerald-100 text-emerald-700",
    Sold: "bg-purple-100 text-purple-700",
    Inactive: "bg-gray-200 text-gray-600",
    Rejected: "bg-red-100 text-red-700",
  };
  const getVisiblePages = () => {
    const pages = [];
    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, page + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="space-y-6">
      {/* ===== HEADER ===== */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-gray-900">
          Tin đăng của tôi
        </h1>
        <span className="text-sm text-gray-500">
          Tổng số trang: {totalPages}
        </span>
      </div>

      {/* ===== FILTER ===== */}
      <div className="bg-white border rounded-xl p-4 flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            placeholder="Tìm kiếm theo tên xe..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>

        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          className="border rounded-lg px-3 py-2 text-sm"
        >
          <option value="">Tất cả trạng thái</option>
          <option value="Draft">Bản nháp</option>
          <option value="PendingApproval">Chờ duyệt</option>
          <option value="PendingInspection">Chờ kiểm định</option>
          <option value="Active">Công khai</option>
          <option value="Sold">Đã bán</option>
          <option value="Rejected">Bị từ chối</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm"
        >
          <option value="newest">Mới nhất</option>
          <option value="oldest">Cũ nhất</option>
        </select>
      </div>

      {/* ===== LIST ===== */}
      {loading && (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-28 bg-gray-100 animate-pulse rounded-xl"
            />
          ))}
        </div>
      )}
      <div className="space-y-4">
        {paginatedListings.map((item) => {
          const bikeStatus = bikeStatusMap[item.id] || item.status;
          const displayStatus = getDisplayStatus(item.status, bikeStatus);
          console.log(
            item.title,
            "listingStatus:",
            item.status,
            "bikeStatus:",
            bikeStatus,
            "display:",
            displayStatus,
          );
          return (
            <div
              key={item.id}
              className="bg-white border rounded-xl p-4 flex gap-4"
            >
              <img
                src={item.image}
                alt={item.brand}
                className="w-40 h-28 object-cover rounded-lg"
              />

              <div className="flex-1 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 ${statusStyle[displayStatus]}`}
                  >
                    <span className="w-2 h-2 rounded-full bg-current"></span>
                    {statusMap[displayStatus]}
                  </span>
                </div>

                <h3 className="font-bold text-gray-900">{item.title}</h3>

                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} className="text-gray-400" />
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>

                  {/* <span className="flex items-center gap-1">
                  <Heart size={14} className="text-rose-500" />
                  {item.likes} quan tâm
                </span> */}
                </div>

                <p className="text-sm text-gray-600 line-clamp-2">
                  {item.description}
                </p>
              </div>

              <div className="flex flex-col items-end justify-between">
                <p className="font-bold text-emerald-600 text-lg">
                  {item.price
                    ? item.price.toLocaleString("vi-VN") + " đ"
                    : "Chưa có giá"}
                </p>

                <div className="flex gap-2 justify-end">
                  {item.status === "Draft" && (
                    <button
                      onClick={() =>
                        navigate(`/seller/edit-listing/${item.id}`)
                      }
                      className="border rounded-lg px-3 py-1 text-sm flex items-center gap-1 hover:bg-gray-50"
                    >
                      <Pencil size={14} /> Chỉnh sửa
                    </button>
                  )}

                  {item.status === "Draft" && (
                    <button
                      onClick={() => setDeleteId(item.id)}
                      className="border border-red-300 text-red-600 rounded-lg px-3 py-1 text-sm flex items-center gap-1 hover:bg-red-50"
                    >
                      <Trash2 size={14} /> Xóa
                    </button>
                  )}

                  <button
                    onClick={() => navigate(`/seller/listings/${item.id}`)}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg"
                  >
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ===== PAGINATION ===== */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-6">
          {/* Prev */}
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            {"<"}
          </button>

          {/* First page */}
          {page > 4 && (
            <>
              <button
                onClick={() => setPage(1)}
                className="px-3 py-1 border rounded hover:bg-emerald-50 transition"
              >
                1
              </button>
              <span className="px-2">...</span>
            </>
          )}

          {/* Middle pages */}
          {getVisiblePages().map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`px-3 py-1 border rounded transition ${
                page === p ? "bg-emerald-500 text-white" : "hover:bg-emerald-50"
              }`}
            >
              {p}
            </button>
          ))}

          {/* Last page */}
          {page < totalPages - 2 && (
            <>
              <span className="px-2">...</span>
              <button
                onClick={() => setPage(totalPages)}
                className="px-3 py-1 border rounded hover:bg-emerald-50 transition"
              >
                {totalPages}
              </button>
            </>
          )}

          {/* Next */}
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            {">"}
          </button>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-96">
            <h3 className="text-lg font-bold mb-2">Xóa tin đăng</h3>

            <p className="text-gray-600 mb-6">
              Bạn có chắc muốn xóa tin đăng này không?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
              >
                Hủy
              </button>

              <button
                onClick={() => {
                  deleteListing(deleteId);
                  setDeleteId(null);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
