import { Wallet, ArrowUpRight, ArrowDownLeft, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getWithdrawals, getWalletBalance } from "../../services/axiosClient";
import Pagination from "../../components/Seller/Pagination";

export default function TransactionsPage() {
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const totalPages = Math.ceil(transactions.length / pageSize);

  const paginatedTransactions = transactions.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const [balance, setBalance] = useState(0);
  const [loadingBalance, setLoadingBalance] = useState(true);

  // ===== FETCH API =====
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [transactionsData, balanceData] = await Promise.all([
          getWithdrawals(),
          getWalletBalance(),
        ]);

        setTransactions(
          transactionsData.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
          ),
        );

        setBalance(balanceData.walletBalance || 0);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
        setLoadingBalance(false);
      }
    };

    fetchAll();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [transactions]);

  // ===== FORMAT =====
  const formatCurrency = (value) => value.toLocaleString("vi-VN") + "₫";

  const formatDate = (date) => new Date(date).toLocaleDateString("vi-VN");

  // ===== TYPE MAP =====
  const TYPE_MAP = {
    Withdrawal: {
      label: "Rút tiền",
      icon: ArrowDownLeft,
      className: "text-red-500",
    },
    Sale: {
      label: "Bán xe",
      icon: ArrowUpRight,
      className: "text-emerald-600",
    },
    Fee: {
      label: "Phí dịch vụ",
      icon: null,
      className: "text-gray-500",
    },
  };

  // ===== STATUS MAP =====
  const STATUS_MAP = {
    1: { label: "Đang chờ" },
    2: { label: "Thành công" },
    3: { label: "Thất bại" },
  };

  // ===== BALANCE (tạm) =====

  // ===== LOADING =====
  if (loading) {
    return <div className="p-6 text-gray-500">Đang tải giao dịch...</div>;
  }

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
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
          <Wallet className="text-emerald-600" size={24} />
        </div>

        <div>
          <p className="text-sm text-gray-500">Số dư khả dụng</p>
          <p className="text-2xl font-bold text-emerald-600">
            {loadingBalance
              ? "Đang tải..."
              : balance.toLocaleString("vi-VN") + "₫"}
          </p>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="font-semibold">Lịch sử giao dịch</h2>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
            <tr>
              <th className="p-3 text-left">Ngày</th>
              <th className="p-3 text-left">Loại giao dịch</th>
              <th className="p-3 text-left">Mô tả</th>
              <th className="p-3 text-right">Số tiền</th>
              <th className="p-3 text-right">Trạng thái</th>
            </tr>
          </thead>

          <tbody>
            {paginatedTransactions.map((item) => {
              const type = TYPE_MAP[item.description];
              const status = STATUS_MAP[item.status];
              const isWithdrawal = item.description === "Withdrawal";

              return (
                <tr
                  key={item.transactionId}
                  className="border-t hover:bg-emerald-50/40 transition-all duration-200 hover:shadow-sm"
                >
                  {/* DATE */}
                  <td className="p-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar
                        size={16}
                        className="text-gray-400 group-hover:text-emerald-500 transition"
                      />
                      {formatDate(item.createdAt)}
                    </div>
                  </td>
                  {/* TYPE */}
                  <td className="p-3">
                    {type && (
                      <span
                        className={`flex items-center gap-1 ${type.className}`}
                      >
                        {type.icon && <type.icon size={16} />}
                        {type.label}
                      </span>
                    )}
                  </td>
                  {/* DESCRIPTION */}
                  <td className="p-3">{item.description}</td>
                  {/* AMOUNT */}

                  <td
                    className={`p-3 text-right font-semibold ${
                      isWithdrawal ? "text-red-500" : "text-emerald-600"
                    }`}
                  >
                    {isWithdrawal ? "-" : "+"}
                    {formatCurrency(item.amount)}
                  </td>
                  {/* STATUS */}
                  <td className="p-3 text-right">
                    <span
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === 1
                          ? "bg-yellow-100 text-yellow-700"
                          : item.status === 2
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-current"></span>
                      {status?.label || "Không rõ"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* EMPTY */}
        {transactions.length === 0 && (
          <div className="p-10 text-center text-gray-400 flex flex-col items-center gap-2">
            <Wallet size={32} />
            <p>Chưa có giao dịch nào</p>
          </div>
        )}
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
