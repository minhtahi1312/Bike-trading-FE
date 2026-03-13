import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Eye, Heart, ShieldCheck, CheckCircle, FileText } from "lucide-react";

const ListingDetail = () => {
  const { id } = useParams();

  const [listing, setListing] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await fetch(
          `https://bikestore-b7e3gudmenczf8bn.southeastasia-01.azurewebsites.net/api/seller/listings/${id}/details`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          },
        );

        const data = await res.json();

        const medias = data.bike?.medias || [];

        data.images = medias.map((media) => media.image).filter(Boolean);

        setListing(data);

        console.log("DETAIL DATA:", data);
        console.log("MEDIAS:", data.bike?.medias);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">Đang tải dữ liệu...</div>
    );
  }

  if (!listing) {
    return (
      <div className="p-10 text-center text-red-500">
        Không tìm thấy tin đăng
      </div>
    );
  }

  const images = listing.images || [];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">{listing.title}</h1>

          <p className="text-gray-500">
            Đăng ngày {new Date(listing.createdAt).toLocaleDateString()} • Mã
            tin #{listing.id?.slice(0, 6)}
          </p>
        </div>

        <div className="flex gap-3">
          <button className="bg-red-100 text-red-600 px-4 py-2 rounded-lg">
            Xóa tin
          </button>

          <button className="bg-black text-white px-4 py-2 rounded-lg">
            Chỉnh sửa tin
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="col-span-2 space-y-6">
          {/* GALLERY */}
          <div className="bg-white p-4 rounded-xl shadow">
            {images.length > 0 ? (
              <>
                <img
                  src={images?.[activeImage]}
                  className="w-full h-[400px] object-cover rounded-lg"
                  alt=""
                />

                <div className="flex gap-3 mt-4">
                  {images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      onClick={() => setActiveImage(index)}
                      className={`w-24 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                        activeImage === index
                          ? "border-green-500"
                          : "border-transparent"
                      }`}
                      alt=""
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="w-full h-[400px] flex items-center justify-center bg-gray-100 rounded-lg">
                Không có ảnh
              </div>
            )}
          </div>

          {/* DESCRIPTION */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-3">Mô tả chi tiết</h3>

            <p className="text-gray-600 whitespace-pre-line">
              {listing.description}
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">


          {/* INSPECTION */}
          <div className="bg-white p-6 rounded-xl shadow relative overflow-hidden">
            <ShieldCheck
              className="absolute right-4 top-4 text-emerald-100"
              size={120}
            />

            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <ShieldCheck className="text-emerald-500" size={20} />
              Trạng thái Kiểm định
            </h3>

            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="text-emerald-500" size={20} />
              <p className="text-emerald-600 font-semibold">
                Đã hoàn tất kiểm định
              </p>
            </div>

            <p className="text-sm text-gray-500 mb-3">Cập nhật gần nhất</p>

            <div className="bg-gray-100 p-3 rounded-lg mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">Chất lượng tổng thể</span>

                <span className="text-emerald-600 font-bold">
                  {listing.inspectionScore || 90}/100
                </span>
              </div>
            </div>

            <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg flex items-center justify-center gap-2">
              <FileText size={18} />
              Xem báo cáo chi tiết
            </button>
          </div>

          {/* TECHNICAL INFO */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold mb-4">Thông số kỹ thuật</h3>

            <p className="text-2xl font-bold text-emerald-600 mb-3">
              {listing.bike?.price?.toLocaleString()} đ
            </p>

            <div className="text-sm text-gray-700 space-y-2">
              <p>
                <strong>Địa điểm:</strong> {listing.location || "Chưa cập nhật"}
              </p>

              <p>
                <strong>Thương hiệu:</strong> {listing.bike?.brand}
              </p>

              <p>
                <strong>Danh mục:</strong> {listing.bike?.category}
              </p>

              <p>
                <strong>Kích thước:</strong> {listing.bike?.frameSize}
              </p>

              <p>
                <strong>Tình trạng:</strong> {listing.bike?.overall}
              </p>

              <hr className="my-2" />

              <p>
                <strong>Khung:</strong> {listing.bike?.frameMaterial}
              </p>

              <p>
                <strong>Groupset:</strong> {listing.bike?.groupset}
              </p>

              <p>
                <strong>Phanh:</strong> {listing.bike?.brakeType}
              </p>

              <p>
                <strong>Bánh xe:</strong> {listing.bike?.tireRim}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;
