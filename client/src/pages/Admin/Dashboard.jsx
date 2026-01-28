/* eslint-disable */
import React, { useState, useMemo } from 'react';
import { Download, Plus, Wallet, ArrowUpRight, ArrowDownRight, ArrowRightLeft, Hourglass, AlertCircle, MoreVertical, Eye } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, BarChart, Bar, Tooltip, XAxis, Cell, LabelList } from 'recharts';

const Dashboard = () => {
  // Mặc định là -1 (chưa chọn cột nào)
  const [activeIndex, setActiveIndex] = useState(-1); 

  const chartData = [
    { name: 'T1', value: 10 }, { name: 'T2', value: 30 }, 
    { name: 'T3', value: 50 }, { name: 'T4', value: 70 }, { name: 'T5', value: 100 }
  ];

  // Logic tạo dữ liệu 5 tháng gần nhất
  const monthlyRevenueData = useMemo(() => {
    const data = [];
    const today = new Date();
    for (let i = 4; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const monthName = `T${d.getMonth() + 1}`;
      const randomValue = Math.floor(Math.random() * 30) + 40 + (5 - i) * 5; 
      
      data.push({
        name: monthName,
        val: randomValue, 
        fullValue: (randomValue * 1500000).toLocaleString('vi-VN') + ' ₫'
      });
    }
    return data;
  }, []);

  return (
    <div className="flex flex-col gap-8 font-display">
      {/* --- HEADER --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[#111813] text-3xl font-extrabold tracking-tight">Tổng quan hệ thống</h1>
          <p className="text-[#637588] text-sm mt-1">Chào mừng quay trở lại, đây là báo cáo hôm nay.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#e5e7eb] rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
            <Download size={18} /> Xuất báo cáo
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-bold transition-colors shadow-sm shadow-emerald-500/30">
            <Plus size={18} /> Tạo mới
          </button>
        </div>
      </div>
          
      {/* --- CARDS THỐNG KÊ --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white rounded-xl p-5 border border-[#e5e7eb] shadow-sm flex flex-col justify-between h-full gap-4 hover:border-emerald-500/50 transition-colors">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-green-100 rounded-lg text-green-700"><Wallet size={24} /></div>
            <span className="flex items-center text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded-full"><ArrowUpRight size={14} className="mr-1" /> +15%</span>
          </div>
          <div><p className="text-[#637588] text-sm font-medium">Tổng doanh thu</p><h3 className="text-[#111813] text-2xl font-bold mt-1">125.000.000 ₫</h3></div>
        </div>
        {/* Card 2 */}
        <div className="bg-white rounded-xl p-5 border border-[#e5e7eb] shadow-sm flex flex-col justify-between h-full gap-4 hover:border-emerald-500/50 transition-colors">
           <div className="flex justify-between items-start">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-700"><ArrowRightLeft size={24} /></div>
            <span className="flex items-center text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded-full"><ArrowUpRight size={14} className="mr-1" /> +5%</span>
          </div>
          <div><p className="text-[#637588] text-sm font-medium">Tổng giao dịch</p><h3 className="text-[#111813] text-2xl font-bold mt-1">3,450</h3></div>
        </div>
        {/* Card 3 */}
         <div className="bg-white rounded-xl p-5 border border-[#e5e7eb] shadow-sm flex flex-col justify-between h-full gap-4 hover:border-emerald-500/50 transition-colors">
           <div className="flex justify-between items-start">
            <div className="p-2 bg-yellow-100 rounded-lg text-yellow-700"><Hourglass size={24} /></div>
            <span className="flex items-center text-red-500 text-xs font-bold bg-red-50 px-2 py-1 rounded-full"><ArrowDownRight size={14} className="mr-1" /> -2%</span>
          </div>
          <div><p className="text-[#637588] text-sm font-medium">Tin chờ duyệt</p><h3 className="text-[#111813] text-2xl font-bold mt-1">12</h3></div>
        </div>
        {/* Card 4 */}
        <div className="bg-white rounded-xl p-5 border border-[#e5e7eb] shadow-sm flex flex-col justify-between h-full gap-4 hover:border-emerald-500/50 transition-colors">
           <div className="flex justify-between items-start">
            <div className="p-2 bg-red-100 rounded-lg text-red-700"><AlertCircle size={24} /></div>
            <span className="flex items-center text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded-full"><ArrowUpRight size={14} className="mr-1" /> +1%</span>
          </div>
          <div><p className="text-[#637588] text-sm font-medium">Báo cáo vi phạm</p><h3 className="text-[#111813] text-2xl font-bold mt-1">5</h3></div>
        </div>
      </div>

      {/* --- BIỂU ĐỒ --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Biểu đồ Area */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-[#e5e7eb] shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-[#111813] text-lg font-bold">Tăng trưởng người dùng</h3>
              <p className="text-[#637588] text-sm">Thống kê số lượng người dùng mới trong 6 tháng qua</p>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg"><MoreVertical size={20} className="text-[#637588]"/></button>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* --- BIỂU ĐỒ CỘT DOANH THU (ĐÃ FIX LỖI HOVER) --- */}
        <div className="lg:col-span-1 bg-white rounded-xl p-6 border border-[#e5e7eb] shadow-sm flex flex-col">
          <div className="mb-6">
             <h3 className="text-[#111813] text-lg font-bold">Doanh thu theo tháng</h3>
             <p className="text-[#637588] text-sm">
               Dữ liệu 5 tháng gần nhất ({monthlyRevenueData[0].name} - {monthlyRevenueData[monthlyRevenueData.length-1].name})
             </p>
          </div>
          <div className="flex-1 h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={monthlyRevenueData} 
                  margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
                  // SỬA: Khi chuột rời khỏi khu vực biểu đồ thì tắt đèn
                  onMouseLeave={() => setActiveIndex(-1)}
                >
                   <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#9ca3af', fontSize: 12 }} 
                      dy={10} 
                   />
                   
                   <Tooltip 
                      cursor={{fill: 'transparent'}}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white p-2 border border-emerald-100 shadow-lg rounded-lg text-xs">
                              <p className="font-bold text-emerald-700">{payload[0].payload.name}</p>
                              <p className="text-gray-600">{payload[0].payload.fullValue}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                   />
                   
                   <Bar 
                      dataKey="val" 
                      radius={[6, 6, 0, 0]} 
                      barSize={40}
                      // SỬA: Bắt sự kiện trực tiếp trên Bar cho chính xác
                      onMouseEnter={(_, index) => setActiveIndex(index)}
                   >
                      {monthlyRevenueData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          // Nếu index trùng với activeIndex thì màu Xanh, không thì Xám
                          fill={index === activeIndex ? '#10b981' : '#e5e7eb'} 
                          style={{ transition: 'fill 0.3s ease' }}
                        />
                      ))}

                      {/* Chỉ hiện số % khi cột đó đang được chọn */}
                      <LabelList 
                        dataKey="val" 
                        position="top" 
                        content={({ x, y, width, value, index }) => {
                            if (index === activeIndex) { 
                                 return (
                                    <text x={x + width / 2} y={y - 8} fill="#111827" textAnchor="middle" fontSize={12} fontWeight="bold">
                                        {value}%
                                    </text>
                                 );
                            }
                            return null;
                        }} 
                      />
                   </Bar>
                </BarChart>
             </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* --- BẢNG HOẠT ĐỘNG (GIỮ NGUYÊN) --- */}
      <div className="bg-white rounded-xl border border-[#e5e7eb] shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-[#e5e7eb] flex justify-between items-center">
          <h3 className="text-[#111813] text-lg font-bold">Hoạt động gần đây</h3>
          <a className="text-sm font-semibold text-emerald-600 hover:text-emerald-700" href="#">Xem tất cả</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left border-collapse">
            <thead>
              <tr className="bg-[#f9fafb]">
                <th className="px-6 py-3 text-xs font-semibold text-[#637588] uppercase">Mã GD</th>
                <th className="px-6 py-3 text-xs font-semibold text-[#637588] uppercase">Người dùng</th>
                <th className="px-6 py-3 text-xs font-semibold text-[#637588] uppercase">Loại giao dịch</th>
                <th className="px-6 py-3 text-xs font-semibold text-[#637588] uppercase">Giá trị</th>
                <th className="px-6 py-3 text-xs font-semibold text-[#637588] uppercase">Trạng thái</th>
                <th className="px-6 py-3 text-xs font-semibold text-[#637588] uppercase">Thời gian</th>
                <th className="px-6 py-3 text-xs font-semibold text-[#637588] uppercase text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-[#111813]">#TRX-9871</td>
                <td className="px-6 py-4 flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">A</div>
                   <div className="flex flex-col">
                      <span className="text-sm font-medium text-[#111813]">Nguyễn Văn A</span>
                      <span className="text-xs text-[#637588]">nguyenvana@gmail.com</span>
                   </div>
                </td>
                <td className="px-6 py-4 text-sm text-[#637588]">Đăng tin VIP</td>
                <td className="px-6 py-4 text-sm font-semibold text-[#111813]">50.000 ₫</td>
                <td className="px-6 py-4"><span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Thành công</span></td>
                <td className="px-6 py-4 text-sm text-[#637588]">2 phút trước</td>
                <td className="px-6 py-4 text-right"><button className="text-gray-400 hover:text-emerald-600"><Eye size={20}/></button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;