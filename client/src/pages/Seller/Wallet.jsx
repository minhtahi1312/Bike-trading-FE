import {
  DollarSign,
  Percent,
  TrendingUp,
  ShoppingCart,
  Download,
  Wallet,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function WalletPage() {
  const navigate = useNavigate();
  const data = [
    {
      id: "#ORD-9921",
      product: "Giant TCR Advanced 1",
      date: "24/10/2023",
      price: 45000000,
    },
    {
      id: "#ORD-9915",
      product: "Trek Emonda SL6",
      date: "23/10/2023",
      price: 38000000,
    },
    {
      id: "#ORD-9882",
      product: "Specialized Tarmac SL7",
      date: "22/10/2023",
      price: 42400000,
    },
  ];

  const totalRevenue = data.reduce((sum, item) => sum + item.price, 0);
  const totalFee = totalRevenue * 0.05;
  const totalProfit = totalRevenue - totalFee;

  const formatCurrency = (value) => value.toLocaleString("vi-VN") + "₫";

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

        <button
          onClick={() => navigate("/seller/withdraw")}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
        >
          <Wallet size={18} />
          Rút tiền
        </button>
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
            <p className="text-gray-500 text-sm">Tổng phí dịch vụ (5%)</p>
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

        {/* Đơn hoàn thành */}
        <div className="bg-white p-5 rounded-xl shadow flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">Tổng đơn hàng</p>
            <h2 className="text-xl font-bold mt-2">{data.length}</h2>
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

          <button className="flex items-center gap-2 text-emerald-600">
            <Download size={16} />
            Xuất báo cáo
          </button>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-3 text-left">Mã đơn</th>
              <th className="p-3 text-left">Sản phẩm</th>
              <th className="p-3 text-left">Ngày hoàn thành</th>
              <th className="p-3 text-right">Giá bán</th>
              <th className="p-3 text-right">Phí (5%)</th>
              <th className="p-3 text-right">Lợi nhuận</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => {
              const fee = item.price * 0.05;
              const profit = item.price - fee;

              return (
                <tr key={item.id} className="border-t">
                  <td className="p-3">{item.id}</td>
                  <td className="p-3">{item.product}</td>
                  <td className="p-3">{item.date}</td>
                  <td className="p-3 text-right">
                    {formatCurrency(item.price)}
                  </td>
                  <td className="p-3 text-right text-red-500">
                    -{formatCurrency(fee)}
                  </td>
                  <td className="p-3 text-right text-emerald-600">
                    {formatCurrency(profit)}
                  </td>
                </tr>
              );
            })}
          </tbody>

          {/* Tổng cộng */}
          <tfoot className="bg-gray-50 font-semibold">
            <tr>
              <td colSpan="3" className="p-3 text-right">
                Tổng cộng:
              </td>
              <td className="p-3 text-right">{formatCurrency(totalRevenue)}</td>
              <td className="p-3 text-right text-red-500">
                -{formatCurrency(totalFee)}
              </td>
              <td className="p-3 text-right text-emerald-600">
                {formatCurrency(totalProfit)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
