import React, { useState, useEffect } from 'react';
import {  Wallet, ArrowUpRight, ArrowRightLeft, Hourglass, AlertCircle, MoreVertical } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, BarChart, Bar, Tooltip, XAxis, YAxis, CartesianGrid, Cell, LabelList } from 'recharts';

import axiosClient from "../../services/axiosClient";

const Dashboard = () => {
  const [activeIndex, setActiveIndex] = useState(-1); 
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setIsLoading(true);
        const response = await axiosClient.get('/api/admin/dashboard');
        setDashboardData(response.data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu dashboard:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-[#637588] font-medium text-sm">Đang tải dữ liệu hệ thống...</span>
        </div>
      </div>
    );
  }

  if (!dashboardData || !dashboardData.cards) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <span className="text-red-500 font-medium bg-red-50 px-4 py-2 rounded-lg border border-red-100">
          Không thể tải dữ liệu. Vui lòng thử lại sau.
        </span>
      </div>
    );
  }

  // Dữ liệu doanh thu
  const revenueChartData = dashboardData.revenueWeeklyChart.map(item => ({
    name: item.label,
    val: item.value,
    fullValue: item.value.toLocaleString('vi-VN') + ' ₫'
  }));

  // Hàm format số lượng lớn (VD: 40000000 -> 40M, 1500 -> 1.5K)
  const formatCompactNumber = (number) => {
    if (number >= 1000000) return (number / 1000000).toFixed(1) + 'M';
    if (number >= 1000) return (number / 1000).toFixed(1) + 'K';
    return number;
  };

  return (
    <div className="flex flex-col gap-8 font-display pb-10">
      {/* --- HEADER --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[#111813] text-3xl font-extrabold tracking-tight">Tổng quan hệ thống</h1>
          <p className="text-[#637588] text-sm mt-1">Báo cáo thống kê hiệu suất hoạt động mới nhất.</p>
        </div>
       
      </div>
          
      {/* --- CARDS THỐNG KÊ --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-[#e5e7eb] shadow-sm flex flex-col justify-between h-full gap-4 hover:shadow-md transition-all">
          <div className="flex justify-between items-start">
            <div className="p-2.5 bg-green-50 rounded-xl text-green-600"><Wallet size={22} /></div>
            <span className="flex items-center text-green-700 text-xs font-bold bg-green-100/50 px-2.5 py-1 rounded-full">
              <ArrowUpRight size={14} className="mr-1" /> Doanh thu
            </span>
          </div>
          <div>
            <p className="text-[#637588] text-sm font-medium">Tổng doanh thu</p>
            <h3 className="text-[#111813] text-2xl font-bold mt-1">
              {dashboardData.cards.totalRevenue.toLocaleString('vi-VN')} ₫
            </h3>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-5 border border-[#e5e7eb] shadow-sm flex flex-col justify-between h-full gap-4 hover:shadow-md transition-all">
           <div className="flex justify-between items-start">
            <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600"><ArrowRightLeft size={22} /></div>
          </div>
          <div>
            <p className="text-[#637588] text-sm font-medium">Tổng giao dịch</p>
            <h3 className="text-[#111813] text-2xl font-bold mt-1">
              {dashboardData.cards.totalTransactions.toLocaleString('vi-VN')}
            </h3>
          </div>
        </div>
        
         <div className="bg-white rounded-2xl p-5 border border-[#e5e7eb] shadow-sm flex flex-col justify-between h-full gap-4 hover:shadow-md transition-all">
           <div className="flex justify-between items-start">
            <div className="p-2.5 bg-yellow-50 rounded-xl text-yellow-600"><Hourglass size={22} /></div>
          </div>
          <div>
            <p className="text-[#637588] text-sm font-medium">Tin chờ duyệt</p>
            <h3 className="text-[#111813] text-2xl font-bold mt-1">
              {dashboardData.cards.pendingListings}
            </h3>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-5 border border-[#e5e7eb] shadow-sm flex flex-col justify-between h-full gap-4 hover:shadow-md transition-all">
           <div className="flex justify-between items-start">
            <div className="p-2.5 bg-red-50 rounded-xl text-red-600"><AlertCircle size={22} /></div>
          </div>
          <div>
            <p className="text-[#637588] text-sm font-medium">Tin bị từ chối</p>
            <h3 className="text-[#111813] text-2xl font-bold mt-1">
              {dashboardData.cards.rejectedListings}
            </h3>
          </div>
        </div>
      </div>

      {/* --- BIỂU ĐỒ --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Biểu đồ Area: Người dùng */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-[#e5e7eb] shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-[#111813] text-lg font-bold">Tăng trưởng người dùng</h3>
              <p className="text-[#637588] text-sm mt-0.5">Số lượng người dùng mới trong 6 tuần qua</p>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><MoreVertical size={20} className="text-[#637588]"/></button>
          </div>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dashboardData.userGrowthChart} margin={{ top: 10, right: 10, left: -20, bottom: 30 }}>
                <defs>
                  <linearGradient id="colorUser" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                {/* Lưới ngang mờ để dễ nhìn dữ liệu */}
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                
                {/* Trục Y hiển thị số */}
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 11 }} />
                
                {/* Trục X: Đã xoay nghiêng chữ 35 độ */}
                <XAxis 
                  dataKey="label" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#637588', fontSize: 11 }} 
                  dy={15} 
                  dx={-15}
                  interval={0} 
                  angle={-35}
                  textAnchor="end"
                />
                
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  labelStyle={{ fontWeight: 'bold', color: '#111827', marginBottom: '4px' }}
                  itemStyle={{ color: '#10b981', fontWeight: '600' }}
                />
                <Area type="monotone" dataKey="value" name="Người dùng mới" stroke="#10b981" strokeWidth={3} fill="url(#colorUser)" activeDot={{ r: 6, strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Biểu đồ Bar: Doanh thu */}
        <div className="lg:col-span-1 bg-white rounded-2xl p-6 border border-[#e5e7eb] shadow-sm flex flex-col">
          <div className="mb-8">
             <h3 className="text-[#111813] text-lg font-bold">Doanh thu theo tuần</h3>
             <p className="text-[#637588] text-sm mt-0.5">Dữ liệu 6 tuần gần nhất</p>
          </div>
          <div className="flex-1 h-[320px]">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={revenueChartData} 
                  margin={{ top: 10, right: 0, left: -20, bottom: 30 }}
                  onMouseLeave={() => setActiveIndex(-1)}
                >
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                   
                   {/* Format số trên trục Y rút gọn */}
                   <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#9ca3af', fontSize: 11 }} 
                      tickFormatter={formatCompactNumber}
                   />

                   {/* Trục X: Xoay nghiêng chữ */}
                   <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#637588', fontSize: 11 }} 
                      dy={15} 
                      dx={-10}
                      interval={0}
                      angle={-35}
                      textAnchor="end"
                   />
                   
                   <Tooltip 
                      cursor={{fill: '#f3f4f6', opacity: 0.4}}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white p-3 border border-gray-100 shadow-xl rounded-xl text-sm z-50">
                              <p className="font-bold text-gray-800 mb-1">{payload[0].payload.name}</p>
                              <p className="text-emerald-600 font-semibold">{payload[0].payload.fullValue}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                   />
                   
                   <Bar 
                      dataKey="val" 
                      radius={[6, 6, 0, 0]} 
                      barSize={28}
                      onMouseEnter={(_, index) => setActiveIndex(index)}
                   >
                      {revenueChartData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={index === activeIndex ? '#10b981' : '#d1d5db'} 
                          style={{ transition: 'fill 0.3s ease' }}
                        />
                      ))}
                   </Bar>
                </BarChart>
             </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;