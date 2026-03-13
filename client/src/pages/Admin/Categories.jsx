import React, { useState } from 'react';
import { 
  Search, Plus, Edit2, Trash2, 
  AlertCircle, Layers, Tag, Settings 
} from 'lucide-react';

const Categories = () => {
  const [activeTab, setActiveTab] = useState('brands'); // brands, types, groupsets

  // Mock Data: Thương hiệu 
const brands = [
    { id: 1, name: "Giant", total: "2,090 tin", count: "1,240 xe", sold: "850 xe" },
    { id: 2, name: "Trek", total: "1,456 tin", count: "856 xe", sold: "600 xe" },
    { id: 3, name: "Specialized", total: "1,052 tin", count: "632 xe", sold: "420 xe" },
    { id: 4, name: "Cannondale", total: "560 tin", count: "410 xe", sold: "150 xe" },
    { id: 5, name: "Pinarello", total: "440 tin", count: "320 xe", sold: "120 xe" },
  ];

  const types = [
    { id: 1, name: "Road Bike", total: "6,600 tin", count: "4,500 xe", sold: "2,100 xe" },
    { id: 2, name: "Mountain Bike (MTB)", total: "5,000 tin", count: "3,200 xe", sold: "1,800 xe" },
    { id: 3, name: "Touring Bike", total: "1,150 tin", count: "800 xe", sold: "350 xe" },
  ];

  const groupsets = [
    { id: 1, name: "Shimano Dura-Ace", total: "820 tin", count: "500 sp", sold: "320 sp" },
    { id: 2, name: "SRAM Red eTap", total: "560 tin", count: "350 sp", sold: "210 sp" },
  ];

  // Toggle Switch Component
  const ToggleSwitch = ({ active }) => (
    <div className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${active ? 'bg-emerald-500' : 'bg-gray-300'}`}>
      <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${active ? 'translate-x-5' : 'translate-x-0'}`}></div>
    </div>
  );

  // Render Table Content
  const renderTableContent = () => {
    let data = [];
    if (activeTab === 'brands') data = brands;
    else if (activeTab === 'types') data = types;
    else data = groupsets;

    return (
      <tbody className="divide-y divide-[#e5e7eb]">
        {data.map((item, index) => (
          <tr key={item.id} className="hover:bg-gray-50 transition-colors group">
            <td className="px-6 py-4 text-sm font-bold text-[#637588] text-center w-[5%]">
              {index + 1 < 10 ? `0${index + 1}` : index + 1}
            </td>

            {/* Cột Tên */}
            <td className="px-6 py-4 w-[35%] text-sm font-bold text-[#111813]">
               {item.name}
            </td>

            {/* Cột Tổng tin đăng (MỚI) */}
            <td className="px-6 py-4 text-sm font-bold text-[#111813] text-center w-[20%]">
              {item.total}
            </td>

            {/* Cột Số lượng SP (Tin đang hiển thị) */}
            <td className="px-6 py-4 text-sm font-bold text-[#111813] text-center w-[20%]">
              {item.count}
            </td>

            {/* Cột Đã bán (Chữ màu xanh nổi bật) */}
            <td className="px-6 py-4 text-sm font-bold text-emerald-600 text-center w-[20%]">
              {item.sold}
            </td>
          </tr>
        ))}
      </tbody>
    );
  };

  return (
    <div className="flex flex-col gap-6 font-display text-[#111813] bg-gray-50/50 min-h-screen">
      
      {/* --- HEADER (Đã xóa breadcrumb) --- */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight flex items-center justify-between">
           Quản lý Danh mục
           <span className="flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Hệ thống đồng bộ
           </span>
        </h1>
        <p className="text-[#637588] text-sm mt-2 max-w-3xl">
          Quản lý dữ liệu gốc cho các bộ lọc, form đăng bán và checklist kiểm định. Dữ liệu tại đây sẽ đồng bộ toàn hệ thống.
        </p>
      </div>

      {/* --- BANNER CẢNH BÁO --- */}
      <div className="bg-[#111813] rounded-xl p-6 shadow-lg relative overflow-hidden text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
         <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

         <div className="flex items-start gap-4 relative z-10">
            <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
               <AlertCircle size={24} className="text-emerald-400" />
            </div>
            <div>
               <h3 className="text-lg font-bold text-emerald-400 mb-1">Dữ liệu đồng bộ thời gian thực</h3>
               <p className="text-sm text-gray-300 leading-relaxed max-w-xl">
                  Các thay đổi tại đây sẽ cập nhật trực tiếp lên Form đăng tin của người bán và Checklist của nhân viên kiểm định. 
                  Hãy cẩn trọng khi xóa hoặc ẩn dữ liệu đang có sản phẩm liên kết.
               </p>
            </div>
         </div>
         <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-bold transition-colors whitespace-nowrap z-10 border border-white/10">
            Xem hướng dẫn
         </button>
      </div>

      {/* --- MAIN CONTENT CARD --- */}
      <div className="bg-white border border-[#e5e7eb] rounded-xl shadow-sm flex flex-col min-h-[600px]">
        
        {/* TABS HEADER */}
        <div className="flex border-b border-[#e5e7eb] px-6 pt-2">
           {[
             { id: 'brands', label: 'Thương hiệu (Brands)', icon: <Tag size={16}/> },
             { id: 'types', label: 'Loại xe (Types)', icon: <Layers size={16}/> },
             { id: 'groupsets', label: 'Groupset', icon: <Settings size={16}/> }
           ].map(tab => (
             <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id)}
               className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 transition-all ${
                 activeTab === tab.id 
                 ? 'border-emerald-500 text-emerald-600' 
                 : 'border-transparent text-[#637588] hover:text-[#111813] hover:bg-gray-50 rounded-t-lg'
               }`}
             >
               {tab.icon} {tab.label}
             </button>
           ))}
        </div>

        {/* TOOLBAR */}
        <div className="p-5 flex flex-col md:flex-row gap-3 justify-between items-center bg-[#fcfdfd] border-b border-[#e5e7eb]">
           <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder={`Tìm kiếm ${activeTab === 'brands' ? 'thương hiệu' : 'danh mục'}...`}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-[#111813]"
              />
           </div>

           <button className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-emerald-500/20">
              <Plus size={18} strokeWidth={2.5} /> 
              Thêm {activeTab === 'brands' ? 'Thương hiệu' : activeTab === 'types' ? 'Loại xe' : 'Groupset'}
           </button>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f9fafb] border-b border-[#e5e7eb]">
                <th className="px-6 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider text-center w-[5%]">#</th>
                <th className="px-6 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider w-[35%]">
                   {activeTab === 'brands' ? 'Tên thương hiệu' : 'Tên danh mục'}
                </th>
                <th className="px-6 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider text-center w-[20%]">Tổng tin đăng</th>
                <th className="px-6 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider text-center w-[20%]">Số lượng SP</th>
                <th className="px-6 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider text-center w-[20%]">Đã bán</th>
              </tr>
            </thead>
            {renderTableContent()}
          </table>
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 border-t border-[#e5e7eb] flex items-center justify-between bg-white rounded-b-xl">
           <span className="text-sm font-medium text-[#637588]">Hiển thị 1-4 trong số 42 thương hiệu</span>
           <div className="flex gap-1">
              <button className="px-3 py-1 text-sm border border-gray-200 rounded hover:bg-gray-50 text-[#637588] font-medium disabled:opacity-50">Trước</button>
              <button className="px-3 py-1 text-sm border border-gray-200 rounded hover:bg-gray-50 text-[#637588] font-medium">Sau</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;