export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-between px-6 py-4">
      {/* LEFT */}
      <p className="text-sm text-gray-500">
        Trang {currentPage} / {totalPages}
      </p>

      {/* RIGHT */}
      <div className="flex items-center gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="px-3 py-1.5 border rounded-lg text-sm disabled:opacity-40 hover:bg-gray-100 transition"
        >
          Trước
        </button>

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1.5 rounded-lg text-sm border transition ${
              currentPage === page
                ? "bg-emerald-500 text-white border-emerald-500"
                : "hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="px-3 py-1.5 border rounded-lg text-sm disabled:opacity-40 hover:bg-gray-100 transition"
        >
          Sau
        </button>
      </div>
    </div>
  );
}
