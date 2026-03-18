import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import {
  Bike,
  Ruler,
  Wrench,
  Cog,
  Disc,
  ShieldCheck,
  HelpCircle,
  CheckCircle,
  ThumbsUp,
  ImagePlus,
  Camera,
  DollarSign,
  ImageIcon,
  Video,
  X,
} from "lucide-react";

import {
  CATEGORY_OPTIONS,
  getCategoryLabel,
  BRAND_OPTIONS,
  FRAME_OPTIONS,
  PAINT_OPTIONS,
  DRIVETRAIN_CONDITION_OPTIONS,
  RIM_OPTIONS,
  BRAKE_OPTIONS,
} from "../../utils/format";

export default function CreateListing() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    categoryGroup: "",
    category: "",
    brand: "",
    size: "",
    frameMaterial: "",
    paintCondition: "",
    drivetrain: "",
    drivetrainCondition: "",
    tireRim: "",
    brakeType: "",
    brakeCondition: "",
    overallCondition: "",
    price: "",
    images: [],
    video: null,
  });
  const [customBrand, setCustomBrand] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [customRim, setCustomRim] = useState("");
  const { id } = useParams();
  useEffect(() => {
    if (!id) return;

    const token = localStorage.getItem("accessToken");

    fetch(
      `https://bikestore-b7e3gudmenczf8bn.southeastasia-01.azurewebsites.net/api/seller/listings/${id}/details`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("EDIT DATA:", data);

        setFormData({
          title: data.title || "",
          description: data.description || "",
          category: data.bike?.category || "",
          brand: data.bike?.brand || "",
          size: data.bike?.frameSize || "",
          frameMaterial: data.bike?.frameMaterial || "",
          paintCondition: data.bike?.paint || "",
          drivetrain: data.bike?.groupset || "",
          drivetrainCondition: data.bike?.operating || "",
          tireRim: data.bike?.tireRim || "",
          brakeType: data.bike?.brakeType || "",
          brakeCondition: data.bike?.brakeCondition || "",
          overallCondition: data.bike?.overall || "",
          price: data.bike?.price || "",
          bikeId: data.bike?.id || null,
          images:
            data.bike?.medias?.map((img) => ({
              file: null,
              preview: img.url,
            })) || [],
          video: null,
        });
      });
  }, [id]);

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const handleSubmit = async () => {
    const isEdit = !!id;
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");

      // 1️⃣ CREATE LISTING
      const listingRes = await fetch(
        isEdit
          ? `https://bikestore-b7e3gudmenczf8bn.southeastasia-01.azurewebsites.net/api/seller/listings/${id}`
          : "https://bikestore-b7e3gudmenczf8bn.southeastasia-01.azurewebsites.net/api/seller/listings",
        {
          method: isEdit ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: formData.title,
            description: formData.description,
            status: 2,
          }),
        },
      );

      const listingData = await listingRes.json();
      const listingId = isEdit ? id : listingData.id;

      // 2️⃣ CREATE BIKE
      // 2️⃣ CREATE BIKE
      let bikeId = formData.bikeId;

      if (!bikeId) {
        // CREATE BIKE
        const bikeRes = await fetch(
          "https://bikestore-b7e3gudmenczf8bn.southeastasia-01.azurewebsites.net/api/seller/bikes",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              "x-listing-id": listingId,
            },
            body: JSON.stringify({
              category:
                formData.category === "other"
                  ? customCategory
                  : formData.category,
              brand: formData.brand === "other" ? customBrand : formData.brand,
              frameSize: formData.size,
              frameMaterial: formData.frameMaterial,
              paint: formData.paintCondition,
              groupset: formData.drivetrain,
              operating: formData.drivetrainCondition,
              tireRim:
                formData.tireRim === "other" ? customRim : formData.tireRim,
              brakeType: formData.brakeType,
              overall: formData.overallCondition,
              price: Number(formData.price),
            }),
          },
        );

        const bikeData = await bikeRes.json();
        bikeId = bikeData.id;
      } else {
        // UPDATE BIKE
        await fetch(
          `https://bikestore-b7e3gudmenczf8bn.southeastasia-01.azurewebsites.net/api/seller/bikes/${bikeId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              category: getApiCategory(formData.categoryUI),
              brand: formData.brand,
              frameSize: formData.size,
              frameMaterial: formData.frameMaterial,
              paint: formData.paintCondition,
              groupset: formData.drivetrain,
              operating: formData.drivetrainCondition,
              tireRim: formData.tireRim,
              brakeType: formData.brakeType,
              overall: formData.overallCondition,
              price: Number(formData.price),
            }),
          },
        );
      }

      // 3️⃣ UPLOAD IMAGES
      if (formData.images.length > 0) {
        for (const img of formData.images) {
          const imgForm = new FormData();
          imgForm.append("file", img.file);

          await fetch(
            "https://bikestore-b7e3gudmenczf8bn.southeastasia-01.azurewebsites.net/api/seller/bikes/upload-image",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
                "x-bike-id": bikeId,
              },
              body: imgForm,
            },
          );
        }
      }

      // 4️⃣ UPLOAD VIDEO
      if (formData.video) {
        const videoForm = new FormData();
        videoForm.append("file", formData.video.file);

        await fetch(
          "https://bikestore-b7e3gudmenczf8bn.southeastasia-01.azurewebsites.net/api/seller/bikes/upload-video",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "x-bike-id": bikeId,
            },
            body: videoForm,
          },
        );
      }

      toast.success(isEdit ? "Cập nhật tin thành công" : "Đăng tin thành công");
      navigate("/seller/listings");
    } catch (error) {
      console.error(error);
      toast.error("Đăng tin thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 space-y-8">
      {/* ===== STEP INDICATOR ===== */}
      <StepProgress step={step} className="mb-10" />

      {/* ===== STEP CONTENT ===== */}
      {step === 1 && (
        <StepBasic formData={formData} updateField={updateField} />
      )}

      {step === 2 && (
        <StepTechnical
          formData={formData}
          updateField={updateField}
          customBrand={customBrand}
          setCustomBrand={setCustomBrand}
          customCategory={customCategory}
          setCustomCategory={setCustomCategory}
          customRim={customRim}
          setCustomRim={setCustomRim}
        />
      )}

      {step === 3 && (
        <StepImages formData={formData} updateField={updateField} />
      )}

      {/* ===== NAVIGATION BUTTONS ===== */}
      <div className="flex justify-between pt-6">
        {step > 1 ? (
          <button
            onClick={() => setStep(step - 1)}
            className="px-6 py-2 border rounded-lg"
          >
            Quay lại
          </button>
        ) : (
          <div />
        )}

        {step < 3 ? (
          <button
            onClick={() => setStep(step + 1)}
            className="px-6 py-2 bg-emerald-500 text-white rounded-lg"
          >
            Tiếp theo →
          </button>
        ) : (
          <div>
            <button
              onClick={() => handleSubmit()}
              disabled={loading}
              className={`px-8 py-3 text-white rounded-lg transition
        ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-emerald-600 hover:bg-emerald-700"
        }`}
            >
              {loading ? "Đang xử lý..." : "Đăng tin ngay"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function StepProgress({ step }) {
  const steps = [
    { id: 1, label: "Thông tin" },
    { id: 2, label: "Kỹ thuật" },
    { id: 3, label: "Hình ảnh" },
  ];

  return (
    <div className="w-full flex justify-center mb-12">
      <div className="flex items-center w-full max-w-3xl">
        {steps.map((item, index) => (
          <React.Fragment key={item.id}>
            {/* STEP */}
            <div className="flex flex-col items-center w-32 relative">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full font-semibold
                ${
                  step >= item.id
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {item.id}
              </div>

              <span
                className={`mt-2 text-sm font-medium ${
                  step >= item.id ? "text-gray-900" : "text-gray-400"
                }`}
              >
                {item.label}
              </span>
            </div>

            {/* LINE */}
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-[2px] ${
                  step > item.id ? "bg-emerald-500" : "bg-gray-200"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
function StepBasic({ formData, updateField }) {
  const [showRules, setShowRules] = useState(false);
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900">
          Bước 1: Thông tin tin đăng
        </h1>
        <p className="text-gray-500 mt-2">
          Cung cấp các thông tin nền tảng giúp người mua dễ dàng tìm thấy tin
          đăng của bạn.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* LEFT SIDE - FORM */}
        <div className="col-span-2 bg-white border rounded-2xl p-8 space-y-6 shadow-sm">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold uppercase tracking-wide text-gray-600 mb-2">
              Tiêu đề tin đăng *
            </label>
            <input
              value={formData.title}
              onChange={(e) => updateField("title", e.target.value)}
              placeholder="Ví dụ: Xe đạp Road Giant TCR Advanced 2022"
              className="w-full border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold uppercase tracking-wide text-gray-600 mb-2">
              Mô tả chi tiết *
            </label>
            <textarea
              rows={6}
              value={formData.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="Viết về lịch sử sử dụng xe, tình trạng bảo dưỡng..."
              className="w-full border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>Tối thiểu 30 ký tự để được duyệt nhanh</span>
              <span>{formData.description.length} / 3000 ký tự</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE PANEL */}
        <div className="space-y-6">
          {/* Tip Card */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
            <h3 className="font-bold text-lg mb-4 text-emerald-700">
              💡 Mẹo bán nhanh
            </h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li>✔️ Mô tả trung thực giúp tăng 80% tỷ lệ tin tưởng.</li>
              <li>✔️ Giá cả hợp lý giúp cạnh tranh hơn.</li>
              <li>
                ✔️ Hình ảnh rõ nét từ nhiều góc giúp người mua dễ đánh giá.
              </li>
              <li>
                ✔️ Cung cấp thông số kỹ thuật đầy đủ giúp tăng độ tin cậy.
              </li>
              <li>✔️ Xe được bảo dưỡng gần đây sẽ thu hút người mua hơn.</li>
            </ul>
          </div>

          {/* Security Card */}
          <div className="bg-white border rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-3">🔐 An toàn & Bảo mật</h3>
            <p className="text-sm text-gray-600">
              Thông tin của bạn được bảo mật. Chúng tôi chỉ chia sẻ thông tin
              khi giao dịch được xác thực.
            </p>
            <button
              onClick={() => setShowRules(true)}
              className="mt-3 text-emerald-600 text-sm font-semibold hover:underline"
            >
              Xem quy tắc cộng đồng →
            </button>
          </div>
        </div>
      </div>
      {showRules && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-[560px] shadow-xl relative">
            {/* Title */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">📜</span>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Quy tắc cộng đồng BikeMarket
                </h3>
                <p className="text-sm text-gray-500">
                  Để đảm bảo môi trường giao dịch minh bạch và an toàn cho mọi
                  người.
                </p>
              </div>
            </div>

            {/* Rules */}
            <div className="space-y-4 text-sm text-gray-700">
              <div className="flex gap-3">
                <span className="text-emerald-500 text-lg">✔</span>
                <p>
                  Tin đăng phải <b>mô tả đúng tình trạng xe</b>, không được cung
                  cấp thông tin sai lệch hoặc gây hiểu nhầm.
                </p>
              </div>

              <div className="flex gap-3">
                <span className="text-emerald-500 text-lg">✔</span>
                <p>
                  Hình ảnh phải là <b>ảnh thật của sản phẩm</b>, rõ ràng, không
                  sử dụng hình ảnh lấy từ internet.
                </p>
              </div>

              <div className="flex gap-3">
                <span className="text-emerald-500 text-lg">✔</span>
                <p>
                  Không đăng bán các sản phẩm{" "}
                  <b>bị cấm, hàng giả, hàng vi phạm pháp luật</b>.
                </p>
              </div>

              <div className="flex gap-3">
                <span className="text-emerald-500 text-lg">✔</span>
                <p>
                  Không đăng nhiều tin trùng lặp hoặc spam gây ảnh hưởng đến
                  trải nghiệm người dùng.
                </p>
              </div>

              <div className="flex gap-3">
                <span className="text-emerald-500 text-lg">✔</span>
                <p>
                  Người bán chịu trách nhiệm về{" "}
                  <b>nguồn gốc và tình trạng sản phẩm</b>
                  khi giao dịch.
                </p>
              </div>
            </div>

            {/* Warning box */}
            <div className="mt-6 bg-amber-50 border border-amber-200 p-4 rounded-lg text-sm text-amber-700">
              ⚠️ Tin đăng vi phạm quy tắc có thể bị{" "}
              <b>từ chối duyệt hoặc khóa tài khoản</b>.
            </div>

            {/* Button */}
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowRules(false)}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium"
              >
                Đã hiểu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StepTechnical({
  formData,
  updateField,
  customCategory,
  setCustomCategory,
  customBrand,
  setCustomBrand,
  customRim,
  setCustomRim,
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-0">
      {/* ===== TITLE ===== */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Tạo tin - Bước 2: Thông số kỹ thuật xe
        </h2>
        <p className="text-gray-500 mt-1">
          Vui lòng cung cấp chính xác các thông số để tăng độ tin cậy cho bài
          đăng của bạn.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ================= LEFT ================= */}
        <div className="lg:col-span-2 space-y-6">
          {/* 1️⃣ PHÂN LOẠI XE */}
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Bike className="w-5 h-5 text-emerald-600" />
              <h3 className="font-semibold text-lg">Phân loại xe</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">
                  Danh mục xe <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => updateField("category", e.target.value)}
                  className="mt-1 w-full border rounded-lg px-3 py-2"
                >
                  <option value="">Chọn danh mục xe</option>

                  {CATEGORY_OPTIONS.map((b) => (
                    <option key={b.value} value={b.value}>
                      {b.label}
                    </option>
                  ))}
                </select>
                {formData.category === "other" && (
                  <input
                    type="text"
                    placeholder="Nhập danh mục xe..."
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    className="mt-2 w-full border rounded-lg px-3 py-2"
                  />
                )}
              </div>

              <div>
                <label className="text-sm font-medium">
                  Hãng xe <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.brand}
                  onChange={(e) => updateField("brand", e.target.value)}
                  className="mt-1 w-full border rounded-lg px-3 py-2"
                >
                  <option value="">Chọn hãng</option>

                  {BRAND_OPTIONS.map((b) => (
                    <option key={b.value} value={b.value}>
                      {b.label}
                    </option>
                  ))}
                </select>
                {formData.brand === "other" && (
                  <input
                    type="text"
                    placeholder="Nhập hãng xe..."
                    value={customBrand}
                    onChange={(e) => setCustomBrand(e.target.value)}
                    className="mt-2 w-full border rounded-lg px-3 py-2"
                  />
                )}
              </div>
            </div>
          </div>

          {/* 2️⃣ SIZE */}
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Ruler className="w-5 h-5 text-emerald-600" />
              <h3 className="font-semibold text-lg">
                Kích thước khung (Size)<span className="text-red-500">*</span>
              </h3>
            </div>

            <div className="flex gap-3">
              {["XS", "S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  onClick={() => updateField("size", size)}
                  className={`px-4 py-2 border rounded-lg transition
      ${
        formData.size === size
          ? "border-emerald-500 bg-emerald-50 text-emerald-700"
          : "hover:border-emerald-400"
      }
    `}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* KHUNG & PHUỘC */}
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Wrench className="w-5 h-5 text-emerald-600" />
              <h3 className="font-semibold text-lg">Khung & Sơn xe</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">
                  Chất liệu khung <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.frameMaterial}
                  onChange={(e) => updateField("frameMaterial", e.target.value)}
                  className="mt-1 w-full border rounded-lg px-3 py-2"
                >
                  <option value="">Chọn chất liệu</option>

                  {FRAME_OPTIONS.map((f) => (
                    <option key={f.value} value={f.value}>
                      {f.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">
                  Tình trạng nước sơn <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.paintCondition}
                  onChange={(e) =>
                    updateField("paintCondition", e.target.value)
                  }
                  className="mt-1 w-full border rounded-lg px-3 py-2"
                >
                  {PAINT_OPTIONS.map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* ===== HỆ THỐNG TRUYỀN ĐỘNG ===== */}
          <div className="bg-white border rounded-xl p-6 shadow-sm mt-6">
            {/* HEADER */}
            <div className="flex items-center gap-2 mb-4">
              <Cog className="w-5 h-5 text-emerald-600" />
              <h3 className="font-semibold text-lg">Hệ thống truyền động</h3>
            </div>

            {/* CONTENT */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* INPUT */}
              <div>
                <label className="text-sm font-medium">
                  Hệ thống truyền động <span className="text-red-500">*</span>
                </label>
                <input
                  value={formData.drivetrain}
                  onChange={(e) => updateField("drivetrain", e.target.value)}
                  className="mt-1 w-full border rounded-lg px-3 py-2"
                  placeholder="Ví dụ: Shimano 105 R7000"
                />
              </div>

              {/* SELECT */}
              <div>
                <label className="text-sm font-medium">
                  Tình trạng truyền động <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.drivetrainCondition}
                  onChange={(e) =>
                    updateField("drivetrainCondition", e.target.value)
                  }
                  className="mt-1 w-full border rounded-lg px-3 py-2"
                >
                  <option value="">Đánh giá tình trạng</option>

                  {DRIVETRAIN_CONDITION_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {/* 5️⃣ PHANH & BÁNH XE */}
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            {/* HEADER */}
            <div className="flex items-center gap-2 mb-4">
              <Disc className="w-5 h-5 text-emerald-600" />
              <h3 className="font-semibold text-lg">Vành xe & Phanh</h3>
            </div>

            {/* CONTENT */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* VÀNH XE */}
              <div>
                <label className="text-sm font-medium">
                  Vành xe <span className="text-red-500">*</span>
                </label>

                <select
                  value={formData.tireRim}
                  onChange={(e) => updateField("tireRim", e.target.value)}
                  className="mt-1 w-full border rounded-lg px-3 py-2"
                >
                  <option value="">Chọn vành xe</option>

                  {RIM_OPTIONS.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </select>

                {/* 👇 HIỆN INPUT KHI CHỌN KHÁC */}
                {formData.tireRim === "other" && (
                  <input
                    type="text"
                    placeholder="Nhập vành xe..."
                    value={customRim}
                    onChange={(e) => setCustomRim(e.target.value)}
                    className="mt-2 w-full border rounded-lg px-3 py-2"
                  />
                )}
              </div>

              {/* PHANH */}
              <div>
                <label className="text-sm font-medium">
                  Phanh xe <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.brakeType}
                  onChange={(e) => updateField("brakeType", e.target.value)}
                  className="mt-1 w-full border rounded-lg px-3 py-2"
                >
                  <option value="">Chọn loại phanh</option>

                  {BRAKE_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* 6️⃣ TỔNG QUAN XE */}
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-4">Tổng quan xe</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ConditionCard
                active={formData.overallCondition === "new"}
                onClick={() => updateField("overallCondition", "new")}
                icon={<CheckCircle className="w-6 h-6 text-emerald-600" />}
                title="Như mới"
                desc="Không trầy xước, linh kiện nguyên bản."
              />

              <ConditionCard
                active={formData.overallCondition === "good"}
                onClick={() => updateField("overallCondition", "good")}
                icon={<ThumbsUp className="w-6 h-6 text-amber-500" />}
                title="Tốt"
                desc="Có xước dăm nhẹ, hoạt động ổn định."
              />

              <ConditionCard
                active={formData.overallCondition === "fair"}
                onClick={() => updateField("overallCondition", "fair")}
                icon={<Wrench className="w-6 h-6 text-orange-500" />}
                title="Khá"
                desc="Có trầy rõ, cần bảo dưỡng nhẹ."
              />
            </div>
          </div>

          {/* 7️⃣ GIÁ MONG MUỐN */}
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="w-5 h-5 text-emerald-600" />
              <h3 className="font-semibold text-lg">
                Mức giá mong muốn <span className="text-red-500">*</span>
              </h3>
            </div>

            <div className="flex">
              <input
                type="number"
                value={formData.price}
                onChange={(e) => updateField("price", e.target.value)}
                placeholder="0"
                className="w-full border rounded-l-xl px-4 py-3 text-sm"
              />
              <span className="px-6 flex items-center bg-gray-100 border border-l-0 rounded-r-xl text-sm font-medium text-gray-600">
                VND
              </span>
            </div>
          </div>
        </div>
        {/* Price */}

        {/* ================= RIGHT ================= */}
        <div className="space-y-6">
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h3 className="font-semibold text-lg">Tiêu chuẩn kiểm định</h3>
            </div>

            <p className="text-sm text-gray-500 mb-4">
              Để đảm bảo minh bạch, các thông số này sẽ được Inspector đối soát
              qua 3 tiêu chí:
            </p>

            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5" />
                <span>
                  <b>Xác thực linh kiện</b> – đảm bảo groupset, khung và phụ
                  tùng đúng mô tả.
                </span>
              </li>

              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5" />
                <span>
                  <b>Tình trạng vật lý</b> – kiểm tra trầy xước, móp khung, nước
                  sơn.
                </span>
              </li>

              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5" />
                <span>
                  <b>Khả năng vận hành</b> – đánh giá hệ thống truyền động và
                  phanh.
                </span>
              </li>

              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5" />
                <span>
                  <b>Độ hao mòn linh kiện</b> – kiểm tra lốp, đĩa phanh, xích,
                  cassette.
                </span>
              </li>

              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5" />
                <span>
                  <b>Tính an toàn khi sử dụng</b> – đảm bảo xe hoạt động ổn định
                  khi vận hành.
                </span>
              </li>
            </ul>

            <div className="mt-5 bg-gray-50 p-3 rounded-lg text-xs text-gray-500 italic">
              "Nhập thông số chính xác giúp Seller rút ngắn 50% thời gian kiểm
              định."
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepImages({ formData, updateField }) {
  const resizeImage = (file) => {
    return new Promise((resolve) => {
      const img = new Image();
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      img.onload = () => {
        const MAX_WIDTH = 1200;

        const scale = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scale;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(
          (blob) => {
            const resizedFile = new File([blob], file.name, {
              type: "image/jpeg",
            });

            resolve(resizedFile);
          },
          "image/jpeg",
          0.8,
        );
      };

      img.src = URL.createObjectURL(file);
    });
  };
  const images = formData.images || [];
  const video = formData.video;
  React.useEffect(() => {
    return () => {
      images.forEach((img) => URL.revokeObjectURL(img.preview));
      if (video?.preview) URL.revokeObjectURL(video.preview);
    };
  }, [images, video]);
  const createPreview = (file) => ({
    file,
    preview: URL.createObjectURL(file),
  });

  /* ================= IMAGE ================= */
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);

    if (images.length + files.length > 8) {
      alert("Chỉ được upload tối đa 8 ảnh");
      return;
    }

    const processedImages = await Promise.all(
      files.map(async (file) => {
        const resized = await resizeImage(file);

        return {
          file: resized,
          preview: URL.createObjectURL(resized),
        };
      }),
    );

    updateField("images", [...images, ...processedImages]);
  };

  const removeImage = (indexToRemove) => {
    URL.revokeObjectURL(images[indexToRemove].preview);

    const updatedImages = images.filter((_, index) => index !== indexToRemove);

    updateField("images", updatedImages);
  };

  /* ================= VIDEO ================= */
  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    updateField("video", createPreview(file));
  };

  const removeVideo = () => {
    if (video?.preview) {
      URL.revokeObjectURL(video.preview);
    }

    updateField("video", null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-0">
      {/* ===== TITLE ===== */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          HÌNH ẢNH & VIDEO TỔNG QUÁT
        </h2>
        <p className="text-emerald-600 mt-1">
          Tải lên những hình ảnh đẹp nhất để thu hút người mua.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ================= LEFT ================= */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ================= IMAGE ================= */}
            <div className="bg-white border rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold mb-4">Hình ảnh</h3>

              <label className="border-2 border-dashed rounded-xl h-48 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition">
                <Camera className="w-10 h-10 text-emerald-500 mb-3" />
                <p className="font-medium">Tải hình ảnh</p>
                <p className="text-sm text-gray-500">JPG, PNG</p>

                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>

              {/* ===== THUMBNAILS ===== */}
              {images.length > 0 && (
                <div className="flex gap-4 mt-6 flex-wrap">
                  {images.map((imgObj, index) => (
                    <div
                      key={index}
                      className="relative w-28 h-24 rounded-lg overflow-hidden border border-emerald-400 group"
                    >
                      {/* Badge đại diện */}
                      {index === 0 && (
                        <span className="absolute top-1 left-1 bg-emerald-500 text-white text-xs px-2 py-0.5 rounded">
                          Ảnh đại diện
                        </span>
                      )}

                      {/* Nút xoá */}
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                      >
                        <X size={14} />
                      </button>

                      <img
                        src={imgObj.preview}
                        alt=""
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}

                  {/* Ô thêm ảnh */}
                  <label className="w-28 h-24 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50">
                    <ImagePlus className="w-6 h-6 text-gray-400" />
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
              )}
            </div>

            {/* ================= VIDEO ================= */}
            <div className="bg-white border rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold mb-4">Video</h3>

              <label className="border-2 border-dashed rounded-xl h-48 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition">
                <Video className="w-10 h-10 text-blue-500 mb-3" />
                <p className="font-medium">Tải video</p>
                <p className="text-sm text-gray-500">MP4</p>

                <input
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={handleVideoUpload}
                />
              </label>

              {video && (
                <div className="mt-6 relative">
                  {/* Nút X */}
                  <button
                    type="button"
                    onClick={removeVideo}
                    className="absolute top-2 right-2 z-10 bg-black/70 hover:bg-black text-white p-1.5 rounded-full transition"
                  >
                    <X size={14} />
                  </button>

                  <video
                    src={video.preview}
                    controls
                    preload="metadata"
                    className="w-full rounded-lg border"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="space-y-6">
          <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
            <div className="h-40 bg-gray-100 flex items-center justify-center">
              {images.length > 0 ? (
                <img
                  src={images?.[0]?.preview}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400">Xem trước hiển thị</span>
              )}
            </div>

            <div className="p-4 space-y-2">
              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded">
                {getCategoryLabel(formData.category)}
              </span>

              <h4 className="font-semibold text-sm">
                {formData.title || "Tên xe sẽ hiển thị ở đây"}
              </h4>

              <p className="text-emerald-600 font-bold">
                {formData.price
                  ? Number(formData.price).toLocaleString("vi-VN") + " VND"
                  : "Giá sẽ hiển thị ở đây"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function ConditionCard({ active, onClick, icon, title, desc }) {
  return (
    <div
      onClick={onClick}
      className={`rounded-xl p-5 text-center cursor-pointer transition border
        ${
          active
            ? "border-emerald-500 bg-emerald-50"
            : "hover:border-emerald-400"
        }
      `}
    >
      <div className="mx-auto mb-2">{icon}</div>
      <h4 className="font-semibold">{title}</h4>
      <p className="text-sm text-gray-500 mt-1">{desc}</p>
    </div>
  );
}
