import { ShoppingCart, Tag } from 'lucide-react'
import React from 'react'

const HeroSection = () => {
  return (
          <section className="w-full px-4 md:px-10 py-6 relative">
          <div className="rounded-2xl overflow-hidden min-h-[24rem] flex flex-col items-center justify-center text-center bg-cover bg-center" style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.6) 100%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuBcM5ouA-k4id5Vz7haRJDbIgt6EHl7O0PdBbbXCrWUsFORIKj-MltmkLut6w3yTL_oahEP-68DtdBPXvjW9D2nXxAfLJQ9CKM2JOflgWpH6NDntKnmxQAu-3PWduJHXH1_JMBX2sO81Qmro1k6Zi5PLLhYzHjA-tQtri4qMsKxHKmib2H4hD3X7OKufq4l7pZ2PR60Cs1HKUsmVMHU_A18CTTrztArq1QbVAllAzTTbLlwSevIOHwEBFyewbeYd2iNES4_QqoeILDq')" }}>
            <div className="relative z-10 flex flex-col items-center max-w-4xl p-4">
              <h1 className="text-white text-2xl md:text-5xl font-black leading-tight -tracking-wide mb-4 drop-shadow-md">Mua bán xe đạp thể thao cũ:<br />An toàn & Minh bạch</h1>
              <h2 className="text-gray-100 text-base md:text-xl font-medium leading-relaxed max-w-2xl mb-8 drop-shadow-md">
                Nền tảng kết nối đam mê xe đạp với quy trình kiểm duyệt uy tín nhất Việt Nam.
                Tìm chiếc xe mơ ước của bạn ngay hôm nay.
              </h2>
              <div className="flex flex-wrap gap-4 justify-center">
                <button className="flex items-center gap-2 h-12 px-8 rounded-lg text-base font-bold bg-primary hover:bg-primary-dark text-gray-900 shadow-lg transform hover:scale-105 transition-all whitespace-nowrap">
                  <span><ShoppingCart /></span>
                  <span>Mua xe ngay</span>
                </button>
                <button className="flex items-center gap-2 h-12 px-8 rounded-lg text-base font-bold bg-white/90 hover:bg-white text-gray-900 backdrop-blur-sm shadow-lg transform hover:scale-105 transition-all whitespace-nowrap">
                  <span><Tag /></span>
                  <span>Đăng bán xe</span>
                </button>
              </div>
            </div>
          </div>
        </section>
  )
}

export default HeroSection
