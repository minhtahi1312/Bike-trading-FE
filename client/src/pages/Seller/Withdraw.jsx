import { useState, useEffect } from "react";
import { Wallet, Landmark, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { withdrawMoney, getWalletBalance } from "../../services/axiosClient";

export default function WithdrawPage() {
  const navigate = useNavigate();

  const [amount, setAmount] = useState(0);
  const [selectedPercent, setSelectedPercent] = useState(null);
  const [loading, setLoading] = useState(false);

  const [availableBalance, setAvailableBalance] = useState(0);
  const [loadingBalance, setLoadingBalance] = useState(true);

  const [bankInfo, setBankInfo] = useState({
    bankName: "",
    bankAccountNumber: "",
    bankAccountName: "",
  });

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const data = await getWalletBalance();
        setAvailableBalance(data.walletBalance || 0);
      } catch (error) {
        toast.error("Không lấy được số dư");
      } finally {
        setLoadingBalance(false);
      }
    };

    fetchBalance();
  }, []);

  useEffect(() => {
    setAmount(availableBalance);
  }, [availableBalance]);

  const formatCurrency = (value) => value.toLocaleString("vi-VN") + "₫";

  const formatDisplay = (value) => {
    if (!value) return "";
    return value.toLocaleString("vi-VN");
  };

  const handleAmountChange = (e) => {
    const raw = e.target.value.replace(/\D/g, "");
    setInputValue(raw);

    const num = Number(raw);

    if (!isNaN(num)) {
      setAmount(num);
      setSelectedPercent(null);
    }
  };

  const handlePercent = (percent) => {
    const value = Math.floor((availableBalance * percent) / 100);
    setAmount(value);
    setSelectedPercent(percent);
  };

  const fee = 0;
  const received = amount - fee;
  const remaining = availableBalance - amount;

  const handleWithdraw = async () => {
    if (
      !bankInfo.bankName ||
      !bankInfo.bankAccountNumber ||
      !bankInfo.bankAccountName
    ) {
      toast.error("Vui lòng nhập đầy đủ thông tin ngân hàng");
      return;
    }

    if (amount <= 0) {
      toast.error("Vui lòng nhập số tiền hợp lệ");
      return;
    }

    if (amount > availableBalance) {
      toast.error("Số tiền vượt quá số dư khả dụng");
      return;
    }

    try {
      setLoading(true);

      await withdrawMoney({
        amount,
        ...bankInfo,
      });

      toast.success("Yêu cầu rút tiền đã được gửi!");

      navigate("/seller/transactions");
    } catch (error) {
      toast.error("Rút tiền thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Yêu cầu rút tiền</h1>
        <p className="text-sm text-gray-500 mt-1">
          Số dư khả dụng:{" "}
          <span className="text-emerald-600 font-semibold">
            {loadingBalance ? "Đang tải..." : formatCurrency(availableBalance)}
          </span>
        </p>
      </div>

      {/* CARD */}
      <div className="bg-white rounded-2xl shadow p-6 max-w-3xl space-y-6">
        {/* AMOUNT */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Số tiền cần rút
          </label>

          <input
            type="text"
            value={inputValue}
            onChange={handleAmountChange}
            onBlur={() => {
              setInputValue(amount ? amount.toLocaleString("vi-VN") : "");
            }}
            onFocus={() => {
              setInputValue(amount ? amount.toString() : "");
            }}
            className="w-full border rounded-xl px-4 py-3 text-lg font-semibold focus:ring-2 focus:ring-emerald-500"
          />

          {/* QUICK BUTTON */}
          <div className="flex gap-3 mt-3">
            {[25, 50, 100].map((p) => (
              <button
                key={p}
                onClick={() => handlePercent(p)}
                className={`px-4 py-2 rounded-lg ${
                  selectedPercent === p
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {p === 100 ? "Tất cả" : `${p}%`}
              </button>
            ))}
          </div>
        </div>

        {/* BANK */}
        <div>
          <p className="text-sm font-medium mb-3">Tài khoản ngân hàng</p>

          <div className="space-y-3">
            <input
              className="w-full border px-4 py-2 rounded-lg"
              placeholder="Tên ngân hàng (VD: Vietcombank)"
              value={bankInfo.bankName}
              onChange={(e) =>
                setBankInfo({ ...bankInfo, bankName: e.target.value })
              }
            />

            <input
              className="w-full border px-4 py-2 rounded-lg"
              placeholder="Số tài khoản"
              value={bankInfo.bankAccountNumber}
              onChange={(e) =>
                setBankInfo({
                  ...bankInfo,
                  bankAccountNumber: e.target.value,
                })
              }
            />

            <input
              className="w-full border px-4 py-2 rounded-lg"
              placeholder="Tên chủ tài khoản"
              value={bankInfo.bankAccountName}
              onChange={(e) =>
                setBankInfo({
                  ...bankInfo,
                  bankAccountName: e.target.value,
                })
              }
            />
          </div>

          <div className="border rounded-xl p-4 mt-3">
            <p className="font-medium">
              {bankInfo.bankName || "Chưa nhập ngân hàng"}
            </p>
            <p className="text-sm text-gray-500">
              {bankInfo.bankAccountNumber || "Số tài khoản"} –{" "}
              {bankInfo.bankAccountName || "Tên chủ tài khoản"}
            </p>
          </div>

          <div className="border-2 border-emerald-600 rounded-xl p-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="bg-emerald-100 p-3 rounded-lg">
                <Landmark className="text-emerald-600" />
              </div>

              <div>
                <p className="font-medium">{bankInfo.bankName}</p>
                <p className="text-sm text-gray-500">
                  {bankInfo.bankAccountNumber} – {bankInfo.bankAccountName}
                </p>
              </div>
            </div>

            <CheckCircle className="text-emerald-600" />
          </div>
        </div>

        {/* SUMMARY */}
        <div className="bg-gray-50 rounded-xl p-4 space-y-3 text-sm">
          <div className="flex justify-between">
            <span>Số tiền rút:</span>
            <span>{formatCurrency(amount)}</span>
          </div>

          <div className="flex justify-between">
            <span>Phí:</span>
            <span>{formatCurrency(fee)}</span>
          </div>

          <div className="flex justify-between">
            <span>Thực nhận:</span>
            <span className="text-emerald-600 font-semibold">
              {formatCurrency(received)}
            </span>
          </div>

          <div className="text-right text-gray-500 text-xs">
            Số dư còn lại: {formatCurrency(remaining)}
          </div>
        </div>

        {/* BUTTON */}
        <button
          onClick={handleWithdraw}
          disabled={loading}
          className="w-full bg-emerald-500 text-white py-4 rounded-xl font-semibold hover:bg-emerald-600 disabled:opacity-50"
        >
          {loading ? "Đang xử lý..." : "Xác nhận rút tiền"}
        </button>
      </div>
    </div>
  );
}
