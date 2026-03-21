import { Wallet, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TransactionsPage() {
  const navigate = useNavigate();

  const transactions = [
    {
      id: 1,
      date: "24/10/2023",
      type: "sale",
      description: "Bán xe Giant TCR Advanced 1",
      amount: 45000000,
      status: "Thành công",
    },
    {
      id: 2,
      date: "23/10/2023",
      type: "fee",
      description: "Phí nền tảng (5%)",
      amount: -2250000,
      status: "Đã trừ",
    },
    {
      id: 3,
      date: "22/10/2023",
      type: "withdraw",
      description: "Rút tiền về Vietcombank",
      amount: -50000000,
      status: "Hoàn thành",
    },
  ];

  const balance = 69130000;

  const formatCurrency = (value) => value.toLocaleString("vi-VN") + "₫";

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Giao dịch</h1>
          <p className="text-gray-500 text-sm">
            Theo dõi các giao dịch ví tiền của bạn
          </p>
        </div>

        <button
          onClick={() => navigate("/seller/withdraw")}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg"
        >
          <Wallet size={18} />
          Rút tiền
        </button>
      </div>

      {/* BALANCE */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 flex items-center gap-4">
        <Wallet className="text-emerald-600" size={28} />
        <div>
          <p className="text-sm text-gray-500">Số dư khả dụng</p>
          <p className="text-2xl font-bold text-emerald-600">
            {formatCurrency(balance)}
          </p>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow">
        <div className="p-4 border-b">
          <h2 className="font-semibold">Lịch sử giao dịch</h2>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-3 text-left">Ngày</th>
              <th className="p-3 text-left">Loại giao dịch</th>
              <th className="p-3 text-left">Mô tả</th>
              <th className="p-3 text-right">Số tiền</th>
              <th className="p-3 text-right">Trạng thái</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-3">{item.date}</td>

                <td className="p-3">
                  {item.type === "sale" && (
                    <span className="flex items-center gap-1 text-emerald-600">
                      <ArrowUpRight size={16} />
                      Bán xe
                    </span>
                  )}

                  {item.type === "withdraw" && (
                    <span className="flex items-center gap-1 text-red-500">
                      <ArrowDownLeft size={16} />
                      Rút tiền
                    </span>
                  )}

                  {item.type === "fee" && (
                    <span className="text-gray-500">Phí dịch vụ</span>
                  )}
                </td>

                <td className="p-3">{item.description}</td>

                <td
                  className={`p-3 text-right font-medium ${
                    item.amount > 0 ? "text-emerald-600" : "text-red-500"
                  }`}
                >
                  {item.amount > 0 ? "+" : ""}
                  {formatCurrency(item.amount)}
                </td>

                <td className="p-3 text-right text-gray-500">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
