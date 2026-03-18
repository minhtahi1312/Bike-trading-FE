import { useState, useEffect } from "react";
import { Wallet, Landmark, CheckCircle, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function WithdrawPage() {
  const formatDisplay = (value) => {
    if (!value) return "";
    return value.toLocaleString("vi-VN");
  };
  const handleAmountChange = (e) => {
    const rawValue = e.target.value.replace(/\./g, "");
    const numericValue = Number(rawValue);

    if (!isNaN(numericValue)) {
      setAmount(numericValue);
      setSelectedPercent(null);
    }
  };
  const navigate = useNavigate();
  const handleWithdraw = () => {
    if (amount <= 0) {
      toast.error("Vui lòng nhập số tiền hợp lệ");
      return;
    }

    if (amount > availableBalance) {
      toast.error("Số tiền vượt quá số dư khả dụng");
      return;
    }

    toast.success("Yêu cầu rút tiền đã được gửi!");

    setTimeout(() => {
      navigate("/seller/wallet");
    }, 2000);
  };
  const [success, setSuccess] = useState(false);
  const [selectedPercent, setSelectedPercent] = useState(null);
  const availableBalance = 119130000; // sau này lấy từ API
  const [amount, setAmount] = useState(0);
  useEffect(() => {
    setAmount(availableBalance);
  }, [availableBalance]);

  const fee = 0; // hiện tại miễn phí
  const received = amount - fee;
  const remaining = availableBalance - amount;

  const formatCurrency = (value) => value.toLocaleString("vi-VN") + "₫";

  const handlePercent = (percent) => {
    const value = Math.floor((availableBalance * percent) / 100);
    setAmount(value);
    setSelectedPercent(percent);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Yêu cầu Rút tiền</h1>
        <p className="text-sm text-gray-500 mt-1">
          Số dư khả dụng:{" "}
          <span className="text-emerald-600 font-semibold">
            {formatCurrency(availableBalance)}
          </span>
        </p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow p-6 max-w-3xl space-y-6">
        {/* Amount */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Số tiền cần rút
          </label>

          <input
            type="text"
            value={formatDisplay(amount)}
            onChange={handleAmountChange}
            className="w-full border rounded-xl px-4 py-3 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600
"
          />

          {/* Quick buttons */}
          <div className="flex gap-3 mt-3">
            {[25, 50, 100].map((percent) => (
              <button
                key={percent}
                onClick={() => handlePercent(percent)}
                className={`px-4 py-2 rounded-lg transition 
        ${
          selectedPercent === percent
            ? "bg-emerald-500 hover:bg-emerald-600 text-white"
            : "bg-gray-100 hover:bg-gray-200"
        }`}
              >
                {percent === 100 ? "Tất cả" : `${percent}%`}
              </button>
            ))}
          </div>
        </div>

        {/* Bank account */}
        <div>
          <p className="text-sm font-medium mb-3">Tài khoản ngân hàng</p>

          <div className="border-2 border-emerald-600 rounded-xl p-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Landmark className="text-emerald-600" />
              </div>

              <div>
                <p className="font-medium">Vietcombank</p>
                <p className="text-sm text-gray-500">
                  1023456789 – NGUYEN VAN A
                </p>
              </div>
            </div>

            <CheckCircle className="text-emerald-600" />
          </div>

          <button className="w-full mt-4 border-2 border-dashed rounded-xl py-3 text-gray-500 hover:bg-gray-50">
            + Thêm tài khoản mới
          </button>
        </div>

        {/* Summary */}
        <div className="bg-gray-50 rounded-xl p-4 space-y-3 text-sm">
          <div className="flex justify-between">
            <span>Số tiền yêu cầu rút:</span>
            <span>{formatCurrency(amount)}</span>
          </div>

          <div className="flex justify-between">
            <span>Phí dịch vụ:</span>
            <span>{formatCurrency(fee)}</span>
          </div>

          <div className="flex justify-between">
            <span>Thời gian xử lý:</span>
            <span>Trong vòng 24h làm việc</span>
          </div>

          <hr />

          <div className="flex justify-between text-lg font-semibold">
            <span>SỐ TIỀN THỰC NHẬN:</span>
            <span className="text-emerald-600">{formatCurrency(received)}</span>
          </div>

          <div className="text-right text-gray-500 text-xs">
            Số dư còn lại dự kiến: {formatCurrency(remaining)}
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleWithdraw}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition"
        >
          Xác nhận rút tiền
        </button>
      </div>
    </div>
  );
}
