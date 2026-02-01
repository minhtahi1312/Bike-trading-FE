export default function SellerStatCard({ icon, label, value, note, color }) {
  return (
    <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <div className={`p-2 rounded-lg ${color}`}>{icon}</div>
        {note && (
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
            {note}
          </span>
        )}
      </div>

      <div>
        <p className="text-gray-500 text-sm font-medium">{label}</p>
        <h3 className="text-gray-900 text-2xl font-bold mt-1">{value}</h3>
      </div>
    </div>
  );
}
