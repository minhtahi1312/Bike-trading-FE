import { Bike } from 'lucide-react'
import React from 'react'

const Buyerfooter = () => {
  return (
    <footer className="mt-auto border-t border-border-light dark:border-border-dark bg-white dark:bg-surface-dark py-8">
        <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
           <div className="p-6 pb-2">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600 text-white shadow-sm">
              <Bike size={20} />
            </div>
            <h1 className="text-emerald-700 text-lg font-extrabold tracking-tight">BikeMarket</h1>
          </div>
        </div>
          </div>
          <div className="flex gap-6">
            <a className="text-sm text-text-sub hover:text-primary transition-colors" href="#">Về chúng tôi</a>
            <a className="text-sm text-text-sub hover:text-primary transition-colors" href="#">Điều khoản</a>
            <a className="text-sm text-text-sub hover:text-primary transition-colors" href="#">Chính sách bảo mật</a>
            <a className="text-sm text-text-sub hover:text-primary transition-colors" href="#">Hỗ trợ</a>
          </div>
        </div>
      </footer>
  )
}

export default Buyerfooter
