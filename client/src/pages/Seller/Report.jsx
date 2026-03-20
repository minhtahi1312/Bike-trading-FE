import React from "react";

const REPORT_TYPE = {
  1: "Vấn đề đơn hàng",
  2: "Vấn đề người bán",
  3: "Vấn đề người mua",
  4: "Vấn đề thanh toán",
  5: "Khác",
};

const mockReports = [
  {
    id: "RP-0921",
    date: "26/10/2023 14:30",
    user: "Nguyễn Văn A",
    phone: "0901***123",
    content: "Xe không đúng mô tả, xước nhiều hơn ảnh",
    type: 1,
  },
  {
    id: "RP-0920",
    date: "25/10/2023 09:15",
    user: "Trần Thị Tú",
    phone: "0988***456",
    content: "Thái độ người bán không tốt, chửi bới khách",
    type: 2,
  },
  {
    id: "RP-0918",
    date: "24/10/2023 16:45",
    user: "Lê Hữu Hoàng",
    phone: "0912***789",
    content: "Nghi ngờ hàng giả, tem fake",
    type: 4,
  },
  {
    id: "RP-0915",
    date: "22/10/2023 10:20",
    user: "Phạm Bảo",
    phone: "0933***222",
    content: "Chuyển cọc nhưng không giao xe",
    type: 3,
  },
];

export default function ReportPage() {
  const getTypeStyle = (type) => {
    switch (type) {
      case 1:
        return "bg-blue-50 text-blue-700";
      case 2:
        return "bg-yellow-50 text-yellow-700";
      case 3:
        return "bg-purple-50 text-purple-700";
      case 4:
        return "bg-red-50 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };
  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Báo cáo & Khiếu nại
        </h1>
        <p className="text-gray-500 text-sm">
          Danh sách các báo cáo từ người dùng
        </p>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* HEADER */}
        <div className="grid grid-cols-4 px-6 py-4 text-xs font-semibold text-gray-500 uppercase bg-gray-50 border-b">
          <div>Mã KN & Ngày gửi</div>
          <div>Người khiếu nại</div>
          <div>Nội dung / Lý do</div>
          <div className="text-center">Loại báo cáo</div>
        </div>

        {/* BODY */}
        <div className="divide-y">
          {mockReports.map((r, i) => (
            <div className="grid grid-cols-4 px-6 py-5 items-center hover:bg-gray-50 transition group">
              {/* ID + DATE */}
              <div>
                <p className="font-semibold text-gray-900 tracking-tight">
                  #{r.id}
                </p>
                <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                  {r.date}
                </p>
              </div>

              {/* USER */}
              <div>
                <p className="font-medium text-gray-900">{r.user}</p>
                <p className="text-xs text-gray-400 mt-1">{r.phone}</p>
              </div>

              {/* CONTENT */}
              <div className="text-sm text-gray-700 leading-relaxed max-w-md">
                {r.content}
              </div>

              {/* TYPE */}
              <div className="flex justify-center">
                <span
                  className={`text-xs px-3 py-1.5 rounded-full font-medium ${getTypeStyle(
                    r.type,
                  )}`}
                >
                  {REPORT_TYPE[r.type]}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="flex justify-between items-center px-6 py-4 text-sm text-gray-500">
          <span>Hiển thị 1-4 trong 68 khiếu nại</span>

          <div className="flex gap-2">
            <button className="px-3 py-1 rounded border">{"<"}</button>
            <button className="px-3 py-1 rounded bg-emerald-500 text-white">
              1
            </button>
            <button className="px-3 py-1 rounded border">2</button>
            <button className="px-3 py-1 rounded border">3</button>
            <button className="px-3 py-1 rounded border">{">"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
