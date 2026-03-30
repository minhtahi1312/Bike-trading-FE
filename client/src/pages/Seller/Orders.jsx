import { useMemo, useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getCategoryLabel, getBrandLabel } from "../../utils/format";
import Pagination from "../../components/Seller/Pagination";

const PAGE_SIZE = 5;

export default function SellerOrders() {
  const getInitial = (name) => {
    return name?.charAt(0).toUpperCase() || "?";
  };

  const colors = [
    "bg-red-100 text-red-600",
    "bg-blue-100 text-blue-600",
    "bg-yellow-100 text-yellow-600",
    "bg-purple-100 text-purple-600",
  ];

  const getColor = (name) => {
    const index = name?.charCodeAt(0) % colors.length;
    return colors[index];
  };
  const navigate = useNavigate();

  // ===== STATE =====
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);

  // ===== FETCH API =====
  const fetchOrders = async (orderStatus) => {
    setLoading(true);

    let urls = [];

    if (orderStatus === "all") {
      urls = [
        "/api/seller/orders/paid",
        "/api/seller/orders/confirmed",
        "/api/seller/orders/shipping",
        "/api/seller/orders/completed",
      ];
    } else {
      urls = [`/api/seller/orders/${orderStatus.toLowerCase()}`];
    }

    try {
      const responses = await Promise.all(
        urls.map((url) =>
          fetch(
            `https://bikestore-b7e3gudmenczf8bn.southeastasia-01.azurewebsites.net${url}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            },
          ).then((res) => res.json()),
        ),
      );

      const merged = responses.flatMap((r) => r.items || r);

      setOrders(merged);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchOrders("all");
  }, []);

  // ===== STATUS MAP =====
  const statusMap = {
    Paid: {
      label: "Đã thanh toán",
      style: "bg-yellow-50 text-yellow-700 border border-yellow-200",
    },
    Confirmed: {
      label: "Đã xác nhận",
      style: "bg-blue-50 text-blue-700 border border-blue-200",
    },
    Shipping: {
      label: "Đang giao",
      style: "bg-indigo-50 text-indigo-700 border border-indigo-200",
    },
    Completed: {
      label: "Hoàn thành",
      style: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    },
    Cancelled: {
      label: "Đã huỷ",
      style: "bg-gray-100 text-gray-600 border border-gray-200",
    },
  };

  // ===== FILTER =====
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchStatus = status === "all" || o.status === status;

      const matchSearch =
        search === "" ||
        o.receiverName?.toLowerCase().includes(search.toLowerCase()) ||
        o.items?.[0]?.bikeBrand?.toLowerCase().includes(search.toLowerCase());

      return matchStatus && matchSearch;
    });
  }, [orders, status, search]);

  // ===== PAGINATION =====
  const total = filteredOrders.length;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  const pageOrders = filteredOrders.slice(start, end);

  // ===== LOADING =====
  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">Đang tải đơn hàng...</div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ===== HEADER ===== */}
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">
          Đơn hàng của tôi
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Quản lý và theo dõi các giao dịch bán xe của bạn
        </p>
      </div>

      {/* ===== TABS + ACTION ===== */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {[
            { key: "all", label: `Tất cả (${orders.length})` },
            { key: "Paid", label: "Đã thanh toán" },
            { key: "Confirmed", label: "Đã xác nhận" },
            { key: "Shipping", label: "Đang giao" },
            { key: "Completed", label: "Hoàn thành" },
            { key: "Cancelled", label: "Đã huỷ" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => {
                setStatus(t.key);
                setPage(1);
                fetchOrders(t.key);
              }}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                status === t.key
                  ? "bg-emerald-100 text-emerald-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ===== SEARCH ===== */}
      <div className="relative max-w-sm">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Tìm kiếm đơn hàng, khách hàng..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {/* ===== TABLE ===== */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-6 py-3 text-left">Sản phẩm</th>
              <th className="px-6 py-3 text-left">Tên người mua</th>
              <th className="px-6 py-3 text-left">Ngày đặt</th>
              <th className="px-6 py-3 text-left">Trạng thái</th>
              <th className="px-6 py-3 text-right">Tổng tiền</th>
              <th className="px-6 py-3 text-right">Thao tác</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {pageOrders.map((o) => {
              console.log("ITEMS:", o.items);
              return (
                <tr key={o.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={o.items?.[0]?.image}
                        className="w-12 h-12 rounded-lg object-cover"
                      />

                      <div>
                        <div className="font-medium">
                          {getBrandLabel(o.items?.[0]?.bikeBrand)}
                        </div>

                        <div className="text-xs text-gray-500">
                          {getCategoryLabel(o.items?.[0]?.bikeCategory)}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {/* AVATAR */}
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${getColor(
                          o.receiverName,
                        )}`}
                      >
                        {getInitial(o.receiverName)}
                      </div>

                      {/* INFO */}
                      <div>
                        <div className="font-medium">{o.receiverName}</div>
                        <div className="text-xs text-gray-500">
                          {o.receiverPhone}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-gray-500">
                    {new Date(o.createdAt).toLocaleDateString("vi-VN")}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-full ${statusMap[o.status]?.style}`}
                    >
                      <span className="w-2 h-2 rounded-full bg-current"></span>
                      {statusMap[o.status]?.label}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right font-semibold">
                    {o.totalAmount?.toLocaleString("vi-VN")} đ
                  </td>

                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() =>
                        navigate(`/seller/orders/${o.items?.[0]?.id}`)
                      }
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg transition"
                    >
                      Xem chi tiết
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* ===== PAGINATION ===== */}
        <div className="border-t">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
}
