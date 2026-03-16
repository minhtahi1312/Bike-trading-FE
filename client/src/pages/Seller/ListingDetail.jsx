import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Play, ShieldCheck, CheckCircle } from "lucide-react";
import { XCircle } from "lucide-react";

const ListingDetail = () => {
  const { id } = useParams();

  const [listing, setListing] = useState(null);
  const [activeMedia, setActiveMedia] = useState(0);
  const [loading, setLoading] = useState(true);

  const bikeStatus = listing?.bike?.status;

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

        data.media = medias.map((m) => ({
          type: m.videoUrl ? "video" : "image",
          url: m.videoUrl || m.image,
        }));

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

  const inspection = listing.bike?.inspection || {};
  const media = listing.media || [];
  const renderInspectionItem = (label, value) => (
    <div className="flex justify-between items-center text-sm">
      <span className="text-gray-600">{label}</span>

      {value ? (
        <span className="text-emerald-600 font-medium flex items-center gap-1">
          <CheckCircle size={16} /> Đạt
        </span>
      ) : (
        <span className="text-red-500 flex items-center gap-1">
          <XCircle size={16} /> Chưa đạt
        </span>
      )}
    </div>
  );
  const getDisplayStatus = (listingStatus, bikeStatus) => {
    if (listingStatus === "Draft") return "Draft";

    if (
      listingStatus === "PendingApproval" &&
      bikeStatus === "PendingInspection"
    )
      return "PendingApproval";

    if (listingStatus === "Active" && bikeStatus === "PendingInspection")
      return "PendingInspection";

    if (listingStatus === "Active" && bikeStatus === "Available")
      return "Active";

    if (listingStatus === "Active" && bikeStatus === "Sold") return "Sold";

    if (listingStatus === "Rejected" && bikeStatus === "Disabled")
      return "Rejected";

    return listingStatus;
  };
  const images = listing.images || [];
  const status = getDisplayStatus(listing?.status, bikeStatus);
  const renderStatusMessage = () => {
    if (status === "Draft") {
      return (
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-2">📄 Tin đăng bản nháp</h3>
          <p className="text-gray-500 text-sm">
            Tin đăng này đang ở chế độ bản nháp. Hãy hoàn tất thông tin và gửi
            duyệt để bắt đầu quá trình kiểm định.
          </p>
        </div>
      );
    }

    if (status === "PendingApproval") {
      return (
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-2">⏳ Đang chờ xét duyệt</h3>
          <p className="text-gray-500 text-sm">
            Tin đăng của bạn đang được hệ thống kiểm tra nội dung. Sau khi được
            duyệt, xe sẽ được chuyển sang bước kiểm định.
          </p>
        </div>
      );
    }

    if (status === "PendingInspection") {
      return (
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-2">🔍 Chờ kiểm định</h3>
          <p className="text-gray-500 text-sm">
            Xe của bạn đã được duyệt và đang chờ kiểm định chất lượng. Kết quả
            kiểm định sẽ được cập nhật sớm.
          </p>
        </div>
      );
    }

    if (status === "Rejected") {
      return (
        <div className="bg-white p-6 rounded-xl shadow border border-red-200">
          <h3 className="font-semibold mb-2 text-red-600">
            ❌ Tin đăng bị từ chối
          </h3>

          <p className="text-gray-500 text-sm">
            Tin đăng của bạn chưa đáp ứng yêu cầu kiểm duyệt. Vui lòng chỉnh sửa
            thông tin hoặc hình ảnh và gửi lại để xét duyệt.
          </p>
        </div>
      );
    }

    return null;
  };

  const statusConfig = {
    Draft: {
      label: "Bản nháp",
      color: "bg-gray-100 text-gray-700",
    },

    PendingApproval: {
      label: "Chờ duyệt",
      color: "bg-yellow-100 text-yellow-700",
    },

    PendingInspection: {
      label: "Chờ kiểm định",
      color: "bg-yellow-100 text-yellow-700",
    },

    Active: {
      label: "Công khai",
      color: "bg-green-100 text-green-700",
    },

    Sold: {
      label: "Đã bán",
      color: "bg-purple-100 text-purple-700",
    },

    Rejected: {
      label: "Bị từ chối",
      color: "bg-red-100 text-red-700",
    },
  };

  const statusBadge = statusConfig[status];
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">{listing.title}</h1>

        <div className="flex items-center gap-3 mt-2">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${statusBadge?.color}`}
          >
            <span className="w-2 h-2 rounded-full bg-current"></span>
            {statusBadge?.label}
          </span>

          <p className="text-gray-500 text-sm">
            Đăng ngày {new Date(listing.createdAt).toLocaleDateString("vi-VN")}{" "}
            • Mã tin #{listing.id?.slice(0, 6)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="col-span-2 space-y-6">
          {/* GALLERY */}
          <div className="bg-white p-4 rounded-xl shadow">
            {media.length > 0 ? (
              <>
                {media[activeMedia]?.type === "video" ? (
                  <video
                    controls
                    className="w-full h-[400px] object-cover rounded-lg"
                  >
                    <source src={media[activeMedia].url} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    src={media[activeMedia]?.url}
                    className="w-full h-[400px] object-cover rounded-lg"
                    alt=""
                  />
                )}

                <div className="flex gap-3 mt-4">
                  {media.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => setActiveMedia(index)}
                      className={`relative w-24 h-20 rounded-lg overflow-hidden cursor-pointer border-2 ${
                        activeMedia === index
                          ? "border-green-500"
                          : "border-transparent"
                      }`}
                    >
                      {item.type === "video" ? (
                        <>
                          <video className="w-full h-full object-cover">
                            <source src={item.url} type="video/mp4" />
                          </video>

                          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                            <Play className="text-white" size={24} />
                          </div>
                        </>
                      ) : (
                        <img
                          src={item.url}
                          className="w-full h-full object-cover"
                          alt=""
                        />
                      )}
                    </div>
                  ))}
                </div>
                {listing.videos && listing.videos.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-sm font-semibold text-gray-600 mb-2">
                      Video xe
                    </h3>

                    {listing.videos.map((video, index) => (
                      <video
                        key={index}
                        controls
                        className="w-full rounded-lg border"
                      >
                        <source src={video} type="video/mp4" />
                        Trình duyệt không hỗ trợ video
                      </video>
                    ))}
                  </div>
                )}
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
          {status === "Active" || status === "Sold" ? (
            <div className="bg-white p-6 rounded-xl shadow relative overflow-hidden">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <ShieldCheck className="text-emerald-500" size={20} />
                Trạng thái kiểm định
              </h3>

              <div className="space-y-3 mb-4">
                {renderInspectionItem("Khung xe", inspection.frame)}
                {renderInspectionItem(
                  "Chất lượng sơn",
                  inspection.paintCondition,
                )}
                {renderInspectionItem(
                  "Hệ thống truyền động",
                  inspection.drivetrain,
                )}
                {renderInspectionItem("Phanh", inspection.brakes)}
              </div>

              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">
                  Chất lượng tổng thể
                </p>

                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div
                    className="bg-emerald-500 h-3 rounded-full"
                    style={{ width: `${inspection.score || 0}%` }}
                  />
                </div>

                <p className="text-right font-bold text-emerald-600">
                  {inspection.score || 0}/100
                </p>
                <div className="mt-4 border-t pt-3">
                  <p className="text-sm text-gray-600 mb-1">Đánh giá</p>

                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                    {inspection.comment && inspection.comment.trim() !== ""
                      ? inspection.comment
                      : "Không có nhận xét"}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            renderStatusMessage()
          )}

          {/* TECHNICAL INFO */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold mb-4">Thông số kỹ thuật</h3>

            <p className="text-2xl font-bold text-emerald-600 mb-3">
              {listing.bike?.price?.toLocaleString("vi-VN")} đ
            </p>

            <div className="text-sm text-gray-700 space-y-2">
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
              <p>
                <strong>Sơn xe:</strong> {listing.bike?.paint}
              </p>

              <p>
                <strong>Khung:</strong> {listing.bike?.frameMaterial}
              </p>

              <p>
                <strong>Hệ thống truyền động:</strong> {listing.bike?.groupset}
              </p>

              <p>
                <strong>Phanh:</strong> {listing.bike?.brakeType}
              </p>

              <p>
                <strong>Vành xe:</strong> {listing.bike?.tireRim}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;
