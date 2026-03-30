import {
  User,
  Mail,
  Phone,
  Shield,
  Camera,
  Edit2,
  Key,
  Wallet,
  Eye,
  EyeOff,
} from "lucide-react";
import toast from "react-hot-toast";

import { useEffect, useState } from "react";
import {
  getMe,
  uploadAvatar,
  changePassword,
} from "../../services/axiosClient";

export default function InspectorProfile() {
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [previewUrl, setPreviewUrl] = useState(null);

  const [user, setUser] = useState(null);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const localUrl = URL.createObjectURL(file);
    setPreviewUrl(localUrl);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await uploadAvatar(formData);

      setUser((prev) => ({
        ...prev,
        avtUrl: res.url || res.avtUrl,
      }));
    } catch (err) {
      console.error(err);
    }
  };
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };
  const handleUpdateProfile = async () => {
    try {
      await updateProfile(formData);

      alert("Cập nhật thành công");

      const data = await getMe();

      setUser(data);
    } catch (err) {}
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Mật khẩu không khớp");
      return;
    }

    await toast.promise(changePassword(passwordData), {
      loading: "Đang cập nhật...",
      success: "Đổi mật khẩu thành công ",
      error: (err) => err.response?.data?.message || "Thất bại ",
    });
  };
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
  });
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getMe();
        setUser(data);

        setFormData({
          fullName: data.fullName || "",
          phoneNumber: data.phoneNumber || "",
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-[#111813] text-3xl font-extrabold tracking-tight">
          Hồ sơ cá nhân
        </h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="col-span-1 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-emerald-500 to-teal-600"></div>
            <div className="px-6 pb-6 relative">
              <div className="relative w-24 h-24 mx-auto -mt-12 mb-4">
                <img
                  src={previewUrl || user?.avtUrl}
                  className="w-full h-full rounded-full object-cover"
                />

                <label className="absolute bottom-0 right-0 p-1.5 bg-white border border-gray-200 rounded-full text-gray-600 hover:text-emerald-600 shadow-sm cursor-pointer">
                  <Camera size={14} />
                  <input type="file" hidden onChange={handleUpload} />
                </label>
              </div>

              <div className="text-center mb-6">
                <h2 className="text-xl font-black text-[#111813]">
                  {user?.fullName}
                </h2>
                <span className="inline-flex items-center gap-1 mt-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-widest">
                  <Shield size={12} /> {user?.role}
                </span>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3 text-[#637588]">
                  <Mail size={16} className="text-gray-400" />
                  <span className="font-medium">{user?.email}</span>
                </div>

                <div className="flex items-center gap-3 text-[#637588]">
                  <Phone size={16} className="text-gray-400" />
                  <span className="font-medium">{user?.phoneNumber}</span>
                </div>

                <div className="flex items-center gap-3 text-[#637588]">
                  <Wallet size={16} className="text-gray-400" />{" "}
                  <span className="font-medium">
                    {user?.walletBalance?.toLocaleString("vi-VN")} đ
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1 lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-[#e5e7eb] shadow-sm overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-gray-200 px-6 bg-gray-50">
              <div className="flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 border-emerald-600 text-emerald-700 bg-white">
                <Key size={16} /> Đổi mật khẩu
              </div>
            </div>

            <div className="p-8 flex justify-center">
              <form className="space-y-6 w-full max-w-md">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Mật khẩu hiện tại
                  </label>

                  <div className="relative">
                    <input
                      type={showPassword.current ? "text" : "password"}
                      name="currentPassword"
                      onChange={handleChange}
                      placeholder="Nhập mật khẩu hiện tại"
                      className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((prev) => ({
                          ...prev,
                          current: !prev.current,
                        }))
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword.current ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Mật khẩu mới
                  </label>

                  <div className="relative">
                    <input
                      type={showPassword.new ? "text" : "password"}
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handleChange}
                      placeholder="Nhập mật khẩu mới"
                      className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((prev) => ({
                          ...prev,
                          new: !prev.new,
                        }))
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-600"
                    >
                      {showPassword.new ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Xác nhận mật khẩu
                  </label>

                  <div className="relative">
                    <input
                      type={showPassword.confirm ? "text" : "password"}
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Nhập lại mật khẩu"
                      className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((prev) => ({
                          ...prev,
                          confirm: !prev.confirm,
                        }))
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-600"
                    >
                      {showPassword.confirm ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-end">
                  <button
                    type="button"
                    onClick={handleChangePassword}
                    className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition shadow-md hover:shadow-lg active:scale-95"
                  >
                    Cập nhật mật khẩu
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
