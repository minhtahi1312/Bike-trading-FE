export default function SellerOrdersTable({ orders }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-900">Đơn hàng gần đây</h3>
        <button className="text-sm font-semibold text-emerald-600 hover:text-emerald-700">
          Xem tất cả
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] text-left border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                Mã đơn
              </th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                Sản phẩm
              </th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                Khách hàng
              </th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                Tổng tiền
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {order.id}
                </td>

                <td className="px-6 py-4 flex items-center gap-3">
                  <img
                    src={order.image}
                    alt={order.product}
                    className="w-10 h-10 rounded-lg object-cover bg-gray-100"
                  />
                  <span className="text-sm font-medium text-gray-900">
                    {order.product}
                  </span>
                </td>

                <td className="px-6 py-4 text-sm text-gray-700">
                  {order.customer}
                </td>

                <td className="px-6 py-4">
                  <StatusBadge status={order.status} />
                </td>

                <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                  {order.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ===== STATUS BADGE ===== */
function StatusBadge({ status }) {
  const map = {
    pending: "bg-yellow-100 text-yellow-700",
    shipping: "bg-blue-100 text-blue-700",
    done: "bg-green-100 text-green-700",
  };

  const label = {
    pending: "Chờ xử lý",
    shipping: "Đang giao",
    done: "Hoàn thành",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${map[status]}`}
    >
      {label[status]}
    </span>
  );
}
