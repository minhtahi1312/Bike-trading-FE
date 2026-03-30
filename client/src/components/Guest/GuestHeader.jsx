import { Bike } from 'lucide-react'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const GuestHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full bg-white border-b border-[#e5e7eb] sticky top-0 z-50">
            <div className="w-full">
              <header className="flex items-center justify-between whitespace-nowrap px-4 lg:px-10 py-3">

                {/* Section Logo */}
                <div className="flex items-center gap-8">
                  <div className="p-2">
                    <button >
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600 text-white shadow-sm">
                          <Bike size={20} />
                        </div>
                        <h1 className="text-emerald-700 text-lg font-extrabold tracking-tight">
                          BikeMarket
                        </h1>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Section Auth Buttons */}
                <div className="flex flex-1 justify-end items-center gap-4">
                  <button
                    onClick={() => navigate('/login')}
                    className="px-4 py-2 text-sm font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
                  >
                    Đăng nhập
                  </button>
                  <button
                    onClick={() => navigate('/login')}
                    className="px-4 py-2 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors"
                  >
                    Đăng ký
                  </button>
                </div>

              </header>
            </div>
          </div>
  )
}

export default GuestHeader
