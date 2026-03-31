import {
  DollarSign,
  Percent,
  TrendingUp,
  ShoppingCart,
  Calendar,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getWalletFinance } from "../../services/axiosClient";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Pagination from "../../components/Seller/Pagination";

export default function WalletPage() {
  const [finance, setFinance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const totalRevenue = finance?.totalRevenue || 0;
  const totalFee = finance?.totalServiceFee || 0;
  const totalProfit = finance?.netProfit || 0;
  const balance = finance?.availableBalance || 0;
  const totalOrders = finance?.totalOrders || 0;
  const rawOrders = finance?.orders || [];

  const uniqueOrders = [
    ...new Map(rawOrders.map((item) => [item.orderId, item])).values(),
  ];

  const filteredOrders = uniqueOrders.filter((order) => {
    if (!startDate && !endDate) return true;

    const orderDate = new Date(order.completedDate);
    orderDate.setHours(0, 0, 0, 0);

    if (startDate) {
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
      if (orderDate < start) return false;
    }

    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      if (orderDate > end) return false;
    }

    return true;
  });

  const totalPages = Math.ceil(filteredOrders.length / pageSize);

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );
  useEffect(() => {
    const fetchFinance = async () => {
      try {
        const res = await getWalletFinance();
        setFinance(res);
      } catch (err) {
        console.error("Lỗi fetch finance:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFinance();
  }, []);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  }, [filteredOrders]);

  const formatCurrency = (value) => value?.toLocaleString("vi-VN") + "₫";

  if (loading) {
    return <div className="p-6">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Quản lý Tài chính</h1>
          <p className="text-gray-500 text-sm">
            Theo dõi doanh thu và lợi nhuận của bạn
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs text-gray-500">Số dư khả dụng</p>
          <p className="text-lg font-bold text-emerald-600">
            {formatCurrency(balance)}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6">
        {/* Doanh thu */}
        <div className="bg-white p-5 rounded-xl shadow flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">Tổng doanh thu</p>
            <h2 className="text-xl font-bold mt-2">
              {formatCurrency(totalRevenue)}
            </h2>
          </div>
          <div className="bg-primary/10 p-3 rounded-lg">
            <DollarSign className="text-emerald-600" />
          </div>
        </div>

        {/* Phí */}
        <div className="bg-white p-5 rounded-xl shadow flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">Tổng phí dịch vụ</p>
            <h2 className="text-xl font-bold mt-2 text-red-500">
              -{formatCurrency(totalFee)}
            </h2>
          </div>
          <div className="bg-red-100 p-3 rounded-lg">
            <Percent className="text-red-500" />
          </div>
        </div>

        {/* Lợi nhuận */}
        <div className="bg-white p-5 rounded-xl shadow flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">Lợi nhuận ròng</p>
            <h2 className="text-xl font-bold mt-2 text-emerald-600">
              {formatCurrency(totalProfit)}
            </h2>
          </div>
          <div className="bg-primary/10 p-3 rounded-lg">
            <TrendingUp className="text-emerald-600" />
          </div>
        </div>

        {/* Đơn hàng */}
        <div className="bg-white p-5 rounded-xl shadow flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">Tổng đơn hàng</p>
            <h2 className="text-xl font-bold mt-2">{totalOrders}</h2>
          </div>
          <div className="bg-primary/10 p-3 rounded-lg">
            <ShoppingCart className="text-emerald-600" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-semibold">Chi tiết doanh thu theo đơn hàng</h2>

          {/* FILTER */}
          <div className="flex gap-3 items-center">
            <div className="flex items-center gap-4">
              <div className="flex flex-col text-xs text-gray-500">
                <span>Khoảng thời gian</span>

                <DatePicker
                  selectsRange={true}
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(update) => {
                    setDateRange(update);
                  }}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Chọn khoảng ngày"
                  className="border px-3 py-1 rounded-lg text-sm w-[220px]"
                />
              </div>

              <button
                onClick={() => setDateRange([null, null])}
                className="text-sm text-gray-500 hover:text-black mt-4"
              >
                Tải lại
              </button>
            </div>
          </div>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-3 text-left">Mã đơn</th>
              <th className="p-3 text-left">Sản phẩm</th>
              <th className="p-3 text-left">Ngày hoàn thành</th>
              <th className="p-3 text-right">Giá bán</th>
              <th className="p-3 text-right">Phí</th>
              <th className="p-3 text-right">Lợi nhuận</th>
            </tr>
          </thead>

          <tbody>
            {paginatedOrders.map((item) => (
              <tr
                key={`${item.orderId}-${item.orderCode}`}
                className="border-t"
              >
                <td className="p-3">{item.orderCode}</td>
                <td className="p-3">{item.productName}</td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-gray-400" />
                    <span>
                      {new Date(item.completedDate).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                </td>
                <td className="p-3 text-right">
                  {formatCurrency(item.salePrice)}
                </td>
                <td className="p-3 text-right text-red-500">
                  -{formatCurrency(item.serviceFee)}
                </td>
                <td className="p-3 text-right text-emerald-600">
                  {formatCurrency(item.netProfit)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t bg-gray-50">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
