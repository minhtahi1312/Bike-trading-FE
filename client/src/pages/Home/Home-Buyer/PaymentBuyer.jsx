import React from "react";

export default function PaymentBuyer() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-[#111813] dark:text-gray-100 overflow-x-hidden min-h-screen">

      {/* <header className="sticky top-0 z-50 w-full bg-white dark:bg-[#1a2c20] border-b border-[#f0f4f2] dark:border-[#2a3c30]">
        <div className="px-4 md:px-10 py-3 max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 text-[#111813] dark:text-white">
            <div className="h-8 w-8 flex items-center justify-center bg-primary rounded-lg text-black">
              <span className="material-symbols-outlined">pedal_bike</span>
            </div>
            <h2 className="text-xl font-bold leading-tight tracking-tight">Cycled</h2>
          </div>
          <div className="hidden md:flex flex-1 justify-center gap-8">
            <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Mua xe</a>
            <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Bán xe</a>
            <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Phụ kiện</a>
            <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Cộng đồng</a>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:block text-right">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Xin chào,</p>
              <p className="text-sm font-bold">Minh Hoàng</p>
            </div>
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-10 w-10 border-2 border-primary" style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuAQ8aQGbfMhehz3Fk6zUxCJzsQgpRWgSWBDoZYf_nmT_pMEn6kddx6wr1_1HVInm95ONKeVaUWaz5WVVKZKd-zfKi4FBoNRCII9mPdj3K51_T7Lp_9CnG8colhRaz1imN3xnsRdBj_Ai6r37MT9jynCxAUY3b-uTvgRLXoacTwLpKsMOgvNOYm8JE7cshxV0f_mL8SAa7F96axdoronOohM8iLxNgqsAgxMQlbVCPZS_jB_JfUMA4gmhPSky8nQBKSRdPeSzyt6BJhv")` }} />
          </div>
        </div>
      </header> */}

      <main className="layout-container flex flex-col min-h-screen max-w-[1200px] mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-wrap gap-2 pb-6 text-sm">
          <a className="text-[#61896f] hover:text-primary transition-colors font-medium" href="#">Giỏ hàng</a>
          <span className="text-[#61896f] font-medium">/</span>
          <a className="text-[#61896f] hover:text-primary transition-colors font-medium" href="#">Thông tin vận chuyển</a>
          <span className="text-[#61896f] font-medium">/</span>
          <span className="text-[#111813] dark:text-white font-bold">Xác nhận &amp; Thanh toán</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 flex flex-col gap-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-[#111813] dark:text-white mb-2">Xác nhận đơn hàng</h1>
              <p className="text-[#61896f] dark:text-gray-400">Vui lòng kiểm tra lại thông tin sản phẩm và thực hiện chuyển khoản.</p>
            </div>

            <section className="bg-white dark:bg-[#1a2c20] rounded-xl p-6 shadow-sm border border-[#e0e0e0] dark:border-[#2a3c30]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">local_shipping</span>
                  Thông tin nhận hàng
                </h3>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-between bg-[#f6f8f6] dark:bg-[#233529] p-4 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="text-[#111813] dark:text-white flex items-center justify-center rounded-lg bg-white dark:bg-[#2a3c30] h-10 w-10 shadow-sm">
                    <span className="material-symbols-outlined text-lg">location_on</span>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-base font-bold text-[#111813] dark:text-white">Nguyễn Văn A <span className="text-gray-500 font-normal text-sm ml-2">| 0912 345 678</span></p>
                    <p className="text-[#61896f] dark:text-gray-300 text-sm mt-1">123 Đường Lê Lợi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh</p>
                  </div>
                </div>
                <button className="text-primary text-sm font-bold hover:underline self-start sm:self-center">Thay đổi</button>
              </div>
            </section>

            <section className="bg-white dark:bg-[#1a2c20] rounded-xl p-6 shadow-sm border border-[#e0e0e0] dark:border-[#2a3c30]">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">shopping_bag</span>
                Sản phẩm
              </h3>

              <div className="flex flex-col md:flex-row gap-6 items-start border-b border-[#f0f4f2] dark:border-[#2a3c30] pb-6 mb-6 last:mb-0 last:pb-0 last:border-0">
                <div className="w-full md:w-40 aspect-[4/3] rounded-lg bg-gray-100 overflow-hidden shrink-0 relative group">
                  <div className="w-full h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105" style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuAU7-ZtIH3ThhcfoFWqx7GVfwnP10ysvsr5nUl286VzJqzoMRTvZ8tk0kqjYtOIK6trB9DVHHrtmq_sHY72KHEiioamahnl0mZH36DoO2QqzQJzvRM4VjT50IvTri6IyrzF2tJ6qd6dGhjUJ75Tln8GMeRNeXkPlDG6fOmXz03taN-sW31l2_nhpMtZ13VVOkrw0uEmHuqdvwyPEcihVmpsXckPxUsyg7O9y5ZyU5Cl0W6nF4DEZ9AUc6Faer7MI9dRrvqyceJyGmhR")` }} />
                  <div className="absolute top-2 left-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded">Đã kiểm định</div>
                </div>
                <div className="flex-1 w-full">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xl font-bold text-[#111813] dark:text-white">Trek Domane AL 2 - 2021</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-xs font-medium dark:bg-blue-900/30 dark:text-blue-300">Xe đạp đua (Road)</span>
                        <span className="px-2 py-0.5 rounded bg-green-50 text-green-700 text-xs font-medium dark:bg-green-900/30 dark:text-green-300">Mới 95%</span>
                      </div>
                    </div>
                    <p className="text-lg font-bold text-primary">15.000.000 ₫</p>
                  </div>
                  <div className="mt-4 flex items-center gap-3 p-3 bg-[#f6f8f6] dark:bg-[#233529] rounded-lg">
                    <div className="h-8 w-8 rounded-full bg-gray-300 bg-cover bg-center" style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuC-Haggdk1lpcdlARG0rV9_xEzpdd1Vq37iE01EHx552lE8-ErILQ2ASouzEQMAM9bzGQedBHERs3pYUBWggiruFVQ_Vi-MR9RA1ro46xfuV-5OqRw5ifWFt7apD8TlPK9WTgeovhJsxXex8bReHMFRvHnGMtrncmeee_L-ua9CqCYbmnWMfeIYeB6sCM1BC7yzdfzzhqvYvdLxxFh1ksnwTwl8EZGLfo_ZeMoWOF-vmaBSPUiRF7obKaT6ymfl3Mugb1-Yl4Y8HxI1")` }} />
                    <div className="flex flex-col">
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Người bán</p>
                      <p className="text-sm font-bold text-[#111813] dark:text-white flex items-center gap-1">Minh Tuấn Bikes <span className="material-symbols-outlined text-blue-500 text-[16px]" title="Verified Seller">verified</span></p>
                    </div>
                    <div className="ml-auto text-yellow-500 flex items-center gap-1 text-sm font-bold"><span className="material-symbols-outlined text-[16px] fill-current">star</span>4.9</div>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white dark:bg-[#1a2c20] rounded-xl p-6 shadow-sm border border-[#e0e0e0] dark:border-[#2a3c30]">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><span className="material-symbols-outlined text-primary">payments</span>Phương thức thanh toán</h3>

              <div className="mb-6 p-1 bg-[#f0f4f2] dark:bg-[#233529] rounded-lg inline-flex w-full md:w-auto">
                <button className="flex-1 md:flex-none px-6 py-2 rounded shadow-sm bg-white dark:bg-[#2a3c30] text-[#111813] dark:text-white font-bold text-sm transition-all border border-gray-200 dark:border-transparent">Trả thẳng (100%)</button>
                <button className="flex-1 md:flex-none px-6 py-2 rounded text-gray-500 dark:text-gray-400 font-medium text-sm hover:text-[#111813] dark:hover:text-white transition-all">Đặt cọc (30%)</button>
              </div>

              <div className="relative group">
                <div className="flex flex-col gap-4 p-5 rounded-xl border-2 border-primary bg-primary/5 dark:bg-primary/10 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-white dark:bg-[#2a3c30] flex items-center justify-center text-primary shrink-0 shadow-sm border border-gray-100 dark:border-gray-700">
                      <span className="material-symbols-outlined text-2xl">account_balance</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-[#111813] dark:text-white text-lg">Chuyển khoản ngân hàng</p>
                        <span className="bg-primary/20 text-green-800 dark:text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">Khuyên dùng</span>
                      </div>
                      <p className="text-sm text-[#61896f] mt-0.5">Duyệt tự động 24/7 - Miễn phí giao dịch</p>
                    </div>
                    <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center shadow-sm">
                      <span className="material-symbols-outlined text-white text-base font-bold">check</span>
                    </div>
                  </div>

                  <hr className="border-dashed border-gray-300 dark:border-gray-600/50 my-1" />

                  <div className="bg-white dark:bg-[#233529] rounded-lg p-5 border border-gray-200 dark:border-gray-600/50 shadow-sm">
                    <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                      <div className="shrink-0 flex flex-col items-center gap-2">
                        <div className="w-36 bg-white p-2 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm">
                          <img alt="QR Code for payment" className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal rounded" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMHTveuN5nncdvVBbEijtBwM4d9YQCONS0e6gmZmrsVbL7qoUF_g6JoOUkQX1a7SMnbrFUshyMk488eP54IJzcUR24ZvsTuHZmV9hNjBiuceWMicbslQ8qqurVS69iXXtV0wB7Lc2fmdUkGWo4z3FLrp4Etbc-Gx3VcxM2knBZ3XDeaS9h7mHAR3ZTVZa4TW-2Zz_ObWDvd9Z1yFrytevQZ7_8HM3IoXZ7MWwldWZ8M8taxRWcSFqwvqRpvHKGnjn6PYiZPYX8mMw7" />
                        </div>
                        <p className="text-[11px] font-medium text-gray-500 text-center max-w-[140px]">Mở App Ngân hàng để quét mã thanh toán</p>
                      </div>

                      <div className="flex-1 w-full space-y-4">
                        <div className="grid grid-cols-[110px_1fr] gap-2 text-sm items-center">
                          <span className="text-gray-500 dark:text-gray-400">Ngân hàng:</span>
                          <span className="font-bold text-[#111813] dark:text-white">Vietcombank</span>
                        </div>
                        <div className="grid grid-cols-[110px_1fr] gap-2 text-sm items-center">
                          <span className="text-gray-500 dark:text-gray-400">Số tài khoản:</span>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-lg text-[#111813] dark:text-white font-mono tracking-wide">1023 5678 9999</span>
                            <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-primary transition-colors" title="Sao chép">
                              <span className="material-symbols-outlined text-lg">content_copy</span>
                            </button>
                          </div>
                        </div>
                        <div className="grid grid-cols-[110px_1fr] gap-2 text-sm items-center">
                          <span className="text-gray-500 dark:text-gray-400">Chủ tài khoản:</span>
                          <span className="font-bold text-[#111813] dark:text-white uppercase">CÔNG TY CP CYCLED</span>
                        </div>
                        <div className="grid grid-cols-[110px_1fr] gap-2 text-sm items-center">
                          <span className="text-gray-500 dark:text-gray-400">Số tiền:</span>
                          <span className="font-bold text-lg text-primary">15.500.000 ₫</span>
                        </div>
                        <div className="grid grid-cols-[110px_1fr] gap-2 text-sm items-center">
                          <span className="text-gray-500 dark:text-gray-400">Nội dung:</span>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-amber-600 dark:text-amber-500 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded border border-amber-100 dark:border-amber-900/30">DH88219</span>
                            <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-primary transition-colors" title="Sao chép">
                              <span className="material-symbols-outlined text-lg">content_copy</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 p-3 rounded-lg border border-blue-100 dark:border-blue-900/30 mt-4">
                  <span className="material-symbols-outlined text-lg shrink-0">info</span>
                  <p className="leading-relaxed">Hệ thống sẽ tự động xác nhận đơn hàng sau 1-3 phút khi nhận được tiền. Nếu quá 15 phút chưa thấy cập nhật, vui lòng liên hệ hotline <span className="font-bold">1900 1234</span>.</p>
                </div>
              </div>
            </section>
          </div>

          <aside className="lg:col-span-4 sticky top-24">
            <div className="bg-white dark:bg-[#1a2c20] rounded-xl shadow-lg border border-[#e0e0e0] dark:border-[#2a3c30] overflow-hidden">
              <div className="p-6 border-b border-[#f0f4f2] dark:border-[#2a3c30]">
                <h3 className="text-lg font-bold mb-4">Chi tiết thanh toán</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm"><span className="text-[#61896f] dark:text-gray-400">Giá xe</span><span className="font-medium">15.000.000 ₫</span></div>
                  <div className="flex justify-between text-sm"><span className="text-[#61896f] dark:text-gray-400">Phí vận chuyển</span><span className="font-medium">200.000 ₫</span></div>
                  <div className="flex justify-between text-sm"><span className="text-[#61896f] dark:text-gray-400">Phí bảo đảm (2%)</span><span className="font-medium">300.000 ₫</span></div>
                  <div className="flex justify-between text-sm text-green-600 dark:text-primary"><span>Khuyến mãi</span><span>-0 ₫</span></div>
                </div>
                <div className="my-4 pt-4 border-t border-dashed border-gray-300 dark:border-gray-600">
                  <div className="flex justify-between items-end">
                    <span className="font-bold text-lg text-[#111813] dark:text-white">Tổng thanh toán</span>
                    <span className="font-bold text-2xl text-primary">15.500.000 ₫</span>
                  </div>
                  <p className="text-right text-xs text-[#61896f] mt-1">(Đã bao gồm VAT)</p>
                </div>
              </div>
              <div className="p-6 bg-[#f9fafb] dark:bg-[#233529]">
                <div className="flex gap-2 mb-6">
                  <input className="flex-1 rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1a2c20] text-sm focus:ring-primary focus:border-primary" placeholder="Mã giảm giá" type="text" />
                  <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-[#111813] dark:text-white text-sm font-bold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">Áp dụng</button>
                </div>
                <button className="w-full bg-primary hover:bg-[#25d962] text-[#102216] font-bold text-lg py-4 rounded-xl shadow-md transition-all transform active:scale-[0.98] flex items-center justify-center gap-2">
                  <span>Tôi đã chuyển khoản</span>
                  <span className="material-symbols-outlined font-bold">check_circle</span>
                </button>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center text-center gap-1"><span className="material-symbols-outlined text-green-600 dark:text-primary text-2xl">verified_user</span><span className="text-[10px] font-medium text-gray-500 dark:text-gray-400 leading-tight">Bảo vệ người mua 100%</span></div>
                  <div className="flex flex-col items-center text-center gap-1"><span className="material-symbols-outlined text-green-600 dark:text-primary text-2xl">timelapse</span><span className="text-[10px] font-medium text-gray-500 dark:text-gray-400 leading-tight">3 ngày kiểm tra hàng</span></div>
                </div>
              </div>
            </div>
            <p className="text-center text-xs text-gray-400 mt-4 px-4">Bằng việc tiến hành thanh toán, bạn đồng ý với <a className="underline hover:text-primary" href="#">Điều khoản dịch vụ</a> và <a className="underline hover:text-primary" href="#">Chính sách bảo mật</a> của Cycled.</p>
          </aside>
        </div>
      </main>

      
    </div>
  );
}
