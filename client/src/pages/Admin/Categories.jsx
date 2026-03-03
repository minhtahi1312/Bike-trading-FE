import React, { useState } from 'react';
import { 
  Search, Plus, Edit2, Trash2, 
  AlertCircle, Layers, Tag, Settings 
} from 'lucide-react';

const Categories = () => {
  const [activeTab, setActiveTab] = useState('brands'); // brands, types, groupsets

  // Mock Data: Thương hiệu
  const brands = [
    { id: 1, name: "Giant", origin: "Taiwan", count: "1,240 xe", logo: "https://placehold.co/100x100/111813/white?text=G", active: true },
    { id: 2, name: "Trek", origin: "USA", count: "856 xe", logo: "https://placehold.co/100x100/000000/white?text=T", active: true },
    { id: 3, name: "Specialized", origin: "USA", count: "632 xe", logo: "https://placehold.co/100x100/d63031/white?text=S", active: true },
    { id: 4, name: "Cannondale", origin: "USA", count: "410 xe", logo: "https://placehold.co/100x100/74b9ff/white?text=C", active: false },
    { id: 5, name: "Pinarello", origin: "Italy", count: "320 xe", logo: "https://placehold.co/100x100/2d3436/white?text=P", active: true },
  ];

  // Mock Data: Loại xe
  const types = [
    { id: 1, name: "Road Bike", desc: "Xe đạp đua đường trường", count: "4,500 xe", active: true },
    { id: 2, name: "Mountain Bike (MTB)", desc: "Xe đạp địa hình", count: "3,200 xe", active: true },
    { id: 3, name: "Touring Bike", desc: "Xe đạp phượt", count: "800 xe", active: false },
  ];

  // Mock Data: Groupset
  const groupsets = [
    { id: 1, name: "Shimano Dura-Ace", type: "Road", count: "500 sp", active: true },
    { id: 2, name: "SRAM Red eTap", type: "Road", count: "350 sp", active: true },
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
            <td className="px-6 py-4 text-sm font-bold text-[#637588] w-16 text-center">
              {index + 1 < 10 ? `0${index + 1}` : index + 1}
            </td>
            
            {/* Cột Logo / Icon */}
            <td className="px-6 py-4 w-24">
              {activeTab === 'brands' ? (
                 <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center">
                    <img src={item.logo} alt={item.name} className="w-full h-full object-cover" />
                 </div>
              ) : (
                 <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    {activeTab === 'types' ? <Layers size={20} /> : <Settings size={20} />}
                 </div>
              )}
            </td>

            {/* Cột Tên */}
            <td className="px-6 py-4">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#111813]">{item.name}</span>
                {item.origin && <span className="text-xs font-medium text-[#637588] mt-0.5">{item.origin}</span>}
                {item.desc && <span className="text-xs font-medium text-[#637588] mt-0.5">{item.desc}</span>}
                {item.type && <span className="text-xs font-medium text-[#637588] mt-0.5">{item.type}</span>}
              </div>
            </td>

            {/* Cột Số lượng */}
            <td className="px-6 py-4 text-sm font-bold text-[#111813]">
              {item.count}
            </td>

            {/* Cột Trạng thái */}
            <td className="px-6 py-4">
              <div className="flex items-center gap-3">
                 <ToggleSwitch active={item.active} />
                 <span className={`text-xs font-bold ${item.active ? 'text-emerald-600' : 'text-gray-400'}`}>
                    {item.active ? 'Hiển thị' : 'Đã ẩn'}
                 </span>
              </div>
            </td>

            {/* Cột Hành động */}
            <td className="px-6 py-4 text-right">
              <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                 <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                    <Edit2 size={16} />
                 </button>
                 <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                    <Trash2 size={16} />
                 </button>
              </div>
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
                <th className="px-6 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider text-center">#</th>
                <th className="px-6 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider">
                  {activeTab === 'brands' ? 'Logo' : 'Icon'}
                </th>
                <th className="px-6 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider">
                   {activeTab === 'brands' ? 'Tên thương hiệu' : 'Tên danh mục'}
                </th>
                <th className="px-6 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider">Số lượng SP</th>
                <th className="px-6 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider">Trạng thái</th>
                <th className="px-6 py-4 text-xs font-bold text-[#637588] uppercase tracking-wider text-right">Hành động</th>
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