import React from "react";

export default function PaymentBuyer() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-[#111813] dark:text-gray-100 overflow-x-hidden min-h-screen">



      <main className="layout-container flex flex-col min-h-screen max-w-[1200px] mx-auto px-4 md:px-6 py-8">


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


          </div>

          <aside className="lg:col-span-4 sticky top-24">
            <div className="bg-white dark:bg-[#1a2c20] rounded-xl shadow-lg border border-[#e0e0e0] dark:border-[#2a3c30] overflow-hidden">
              <div className="p-6 border-b border-[#f0f4f2] dark:border-[#2a3c30]">
                <h3 className="text-lg font-bold mb-4">Chi tiết thanh toán</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm"><span className="text-[#61896f] dark:text-gray-400">Giá xe</span><span className="font-medium">15.000.000 ₫</span></div>
                </div>
                <div className="my-4 pt-4 border-t border-dashed border-gray-300 dark:border-gray-600">
                  <div className="flex justify-between items-end">
                    <span className="font-bold text-lg text-[#111813] dark:text-white">Tổng thanh toán</span>
                    <span className="font-bold text-2xl text-primary">15.000.000 ₫</span>
                  </div>

                </div>
              </div>
              <div className="p-6 bg-[#f9fafb] dark:bg-[#233529]">
                <button className="w-full bg-primary hover:bg-[#25d962] text-[#102216] font-bold text-lg py-4 rounded-xl shadow-md transition-all transform active:scale-[0.98] flex items-center justify-center gap-2">
                  <span>Tôi đã chuyển khoản</span>
                  <span className="material-symbols-outlined font-bold">check_circle</span>
                </button>
              </div>
            </div>
            <p className="text-center text-xs text-gray-400 mt-4 px-4">Bằng việc tiến hành thanh toán, bạn đồng ý với <a className="underline hover:text-primary" href="#">Điều khoản dịch vụ</a> và <a className="underline hover:text-primary" href="#">Chính sách bảo mật</a> của Cycled.</p>
          </aside>
        </div>
      </main>


    </div>
  );
}
