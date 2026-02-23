import React from "react";

export default function OderBuyer() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-[#111813] dark:text-white font-display">
      

      <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 md:px-10 py-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#111813] dark:text-white mb-2">Đơn hàng của tôi</h1>
            <p className="text-gray-500 dark:text-gray-400">Quản lý và theo dõi quá trình mua bán xe đạp của bạn</p>
          </div>
          <div className="flex gap-3">
            <button className="inline-flex items-center justify-center px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-surface-dark transition-colors bg-surface-light dark:bg-surface-dark">
              <span className="material-symbols-outlined text-[20px] mr-2">help</span>
              Trung tâm trợ giúp
            </button>
          </div>
        </div>

        <div className="mb-6 overflow-x-auto">
          <div className="flex border-b border-gray-200 dark:border-gray-700 min-w-max">
            <button className="flex items-center gap-2 px-6 py-3 border-b-2 border-[#111813] dark:border-primary text-[#111813] dark:text-primary font-semibold text-sm transition-colors">Tất cả</button>
            <button className="flex items-center gap-2 px-6 py-3 border-b-2 border-transparent text-gray-500 hover:text-[#111813] dark:hover:text-white font-medium text-sm transition-colors">Đang xử lý <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs py-0.5 px-2 rounded-full ml-2">1</span></button>
            <button className="flex items-center gap-2 px-6 py-3 border-b-2 border-transparent text-gray-500 hover:text-[#111813] dark:hover:text-white font-medium text-sm transition-colors">Đang giao <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs py-0.5 px-2 rounded-full ml-2">1</span></button>
            <button className="flex items-center gap-2 px-6 py-3 border-b-2 border-transparent text-gray-500 hover:text-[#111813] dark:hover:text-white font-medium text-sm transition-colors">Chờ xác nhận <span className="bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs py-0.5 px-2 rounded-full ml-2">1</span></button>
            <button className="flex items-center gap-2 px-6 py-3 border-b-2 border-transparent text-gray-500 hover:text-[#111813] dark:hover:text-white font-medium text-sm transition-colors">Hoàn tất</button>
            <button className="flex items-center gap-2 px-6 py-3 border-b-2 border-transparent text-gray-500 hover:text-[#111813] dark:hover:text-white font-medium text-sm transition-colors">Đã hủy</button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <section className="group bg-surface-light dark:bg-surface-dark rounded-xl border border-primary/40 dark:border-primary/30 p-4 md:p-5 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex flex-col md:flex-row gap-5">
              <div className="shrink-0 relative">
                <div className="w-full md:w-[160px] aspect-[4/3] rounded-lg bg-gray-100 dark:bg-gray-800 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCwWoIwIRIhPJVQP6atU1utzJzlNPbH5uLOAfMknLDThSPhAv4Kl-7-NNqzWYqMlNLD0R-PTAmHos8TorHtfMqwbGimHN5Q1ewyGiGgcvApWVDpsTl8fx1r4HRRuX-ZwIUNZuvmBhJYX9xnPhLpwI3iv_ynHR79CWUmtHnutgU6b8uOXfqSU2lSdmXe5FrKjSfwuaAoHySX0-zPYCB-GxW3Iw-kShDMGTtxWfNM992TXDkTtZdNZuyV8c7DyNY6WAA1L5qXGTksHZlU')" }} />
                <div className="absolute top-2 left-2 bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 text-xs font-bold px-2 py-1 rounded backdrop-blur-sm">Đã giao hàng</div>
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-[#111813] dark:text-white">Specialized Allez E5 Sport</h3>
                        <span className="bg-gray-100 dark:bg-gray-800 text-xs px-2 py-0.5 rounded text-gray-600 dark:text-gray-400">Like New</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="material-symbols-outlined text-[16px]">storefront</span>
                        <span>Người bán: <strong>Nam Bike Shop</strong></span>
                        <span>•</span>
                        <span>Mã đơn: #ORD-39281</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-primary dark:text-primary">15.500.000đ</p>
                      <p className="text-xs text-gray-400 line-through">16.000.000đ</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-start gap-2 p-3 bg-primary/5 rounded-lg border border-primary/10">
                    <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">verified_user</span>
                    <div>
                      <p className="text-sm font-semibold text-[#111813] dark:text-white">Thanh toán được bảo vệ</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Tiền của bạn đang được giữ an toàn. Vui lòng xác nhận khi bạn đã kiểm tra kỹ xe.</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-end gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <button className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">Trả hàng/Hoàn tiền</button>
                  <button className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold bg-primary text-background-dark hover:bg-opacity-90 transition-colors shadow-sm shadow-primary/20">
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    Xác nhận đã nhận xe
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-surface-light dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-gray-700 p-4 md:p-5 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex flex-col md:flex-row gap-5">
              <div className="shrink-0 relative">
                <div className="w-full md:w-[160px] aspect-[4/3] rounded-lg bg-gray-100 dark:bg-gray-800 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC7xFhouoz1N4_ShtIvDf_JY4scVkZb59FWhHcJSFpfjQ-n5cdrs3rWfwdRUWetDtXABaY3ZeeZvYYz5q5R8yPBo57LA1S5S04JDohUbOf--PqIWibyvOsORK7KSV9G5V_m0bTmQkRRhH7Srwb_MBTQIR_8N0A1ZrXFQfDnOSXmk4b9STR4MHIqEjRrnrQBucQAove0m90XDDfFhHB0bnLPGni40N2IPEPRSvPhsdXXxUEY-9KuWWPgZz1C9VBcGIBQV74PF4bvs100')" }} />
                <div className="absolute top-2 left-2 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-bold px-2 py-1 rounded backdrop-blur-sm">Đang giao hàng</div>
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-[#111813] dark:text-white">Giant Escape 2 City Disc</h3>
                        <span className="bg-gray-100 dark:bg-gray-800 text-xs px-2 py-0.5 rounded text-gray-600 dark:text-gray-400">98% New</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="material-symbols-outlined text-[16px]">person</span>
                        <span>Người bán: <strong>Trần Văn A</strong></span>
                        <span>•</span>
                        <span>Mã đơn: #ORD-99281</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-primary dark:text-primary">8.500.000đ</p>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                    <span className="material-symbols-outlined text-blue-500 text-[18px]">local_shipping</span>
                    <span>Đơn hàng đang đến kho trung chuyển Hà Nội. Dự kiến giao 20/10.</span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-end gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <button className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">Chat với người bán</button>
                  <button className="px-5 py-2 rounded-lg text-sm font-medium border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 bg-transparent text-[#111813] dark:text-white transition-colors">Theo dõi vận chuyển</button>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-surface-light dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-gray-700 p-4 md:p-5 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex flex-col md:flex-row gap-5">
              <div className="shrink-0 relative">
                <div className="w-full md:w-[160px] aspect-[4/3] rounded-lg bg-gray-100 dark:bg-gray-800 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA5w_gQp4_O08zQ233w6Awz_ilniDG2U_P3ciIU6TueIQKvuTp3mED9VmWABujhX67MK_J8dqPiPfid_w_JVJEQqNEyRRSuM42nJNpS2QOnFCFS8eUtSc2wSQfe2QMo0QvXsdrAHsfgICbJUkJiUpNH50NaC38KBaZ88t1-tfKj0eHw-DB2q9Wzyvi3WTOn_rIyXpc5eOv4xugaQX-RaQUupxcLWUA5jP-8LqlTdt4GRoB9o0zJsWyxzH8EY_mrdwkcqNeoPUoYzS4o')" }} />
                <div className="absolute top-2 left-2 bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300 text-xs font-bold px-2 py-1 rounded backdrop-blur-sm">Đang xử lý</div>
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-[#111813] dark:text-white">Trek Marlin 7 2022</h3>
                        <span className="bg-gray-100 dark:bg-gray-800 text-xs px-2 py-0.5 rounded text-gray-600 dark:text-gray-400">Used</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="material-symbols-outlined text-[16px]">storefront</span>
                        <span>Người bán: <strong>BikePro HCM</strong></span>
                        <span>•</span>
                        <span>Mã đơn: #ORD-11029</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-primary dark:text-primary">12.000.000đ</p>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">Người bán đang chuẩn bị đóng gói xe của bạn.</div>
                </div>
                <div className="flex flex-wrap items-center justify-end gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <button className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">Hủy đơn</button>
                  <button className="px-5 py-2 rounded-lg text-sm font-medium border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 bg-transparent text-[#111813] dark:text-white transition-colors">Xem chi tiết</button>
                </div>
              </div>
            </div>
          </section>

          <section className="opacity-75 hover:opacity-100 transition-opacity bg-surface-light dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-gray-700 p-4 md:p-5 shadow-sm">
            <div className="flex flex-col md:flex-row gap-5">
              <div className="shrink-0 relative">
                <div className="w-full md:w-[160px] aspect-[4/3] rounded-lg bg-gray-100 dark:bg-gray-800 bg-cover bg-center grayscale" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAoQyP-8P1EEj4Y2qKW4iNWCK9tpDHrLE13JmGn0ECDx7e2appHP7Wrf4hzMr6HCad6fIJ_47vaFteeSUX8HPFxDELz9NRzSUCkcGg2fDKT0ELhdR9SG17G28jvc-cuj_pRH7oLC2Ka64JHAROKdpLhNsETvec0VLQyoUk8hU5Cc8H2oAOTN-OMus1WgJhAN1V1c6Gm36yr3APBkbkTfBOWN2Q7T0q64eZ3BE2xydEWLFXi4NxE0YJkPIOiI39VbIvsnl5jxPCBZY1j')" }} />
                <div className="absolute top-2 left-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-bold px-2 py-1 rounded backdrop-blur-sm">Hoàn tất</div>
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-[#111813] dark:text-white">Peugeot Vintage Road Bike</h3>
                        <span className="bg-gray-100 dark:bg-gray-800 text-xs px-2 py-0.5 rounded text-gray-600 dark:text-gray-400">Vintage</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="material-symbols-outlined text-[16px]">person</span>
                        <span>Người bán: <strong>Nguyễn Văn C</strong></span>
                        <span>•</span>
                        <span>Giao ngày: 12/09/2023</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-600 dark:text-gray-400">4.500.000đ</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400 text-sm mt-1">
                    <span className="material-symbols-outlined text-[18px] icon-filled">star</span>
                    <span className="material-symbols-outlined text-[18px] icon-filled">star</span>
                    <span className="material-symbols-outlined text-[18px] icon-filled">star</span>
                    <span className="material-symbols-outlined text-[18px] icon-filled">star</span>
                    <span className="material-symbols-outlined text-[18px] icon-filled">star</span>
                    <span className="text-gray-500 dark:text-gray-400 ml-2 font-normal text-xs">(Bạn đã đánh giá 5 sao)</span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-end gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <button className="px-5 py-2 rounded-lg text-sm font-medium border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 bg-transparent text-[#111813] dark:text-white transition-colors">Mua lại</button>
                  <button className="px-5 py-2 rounded-lg text-sm font-medium border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 bg-transparent text-[#111813] dark:text-white transition-colors">Xem hóa đơn</button>
                </div>
              </div>
            </div>
          </section>

        </div>

        <div className="mt-8 flex justify-center">
          <nav className="flex items-center gap-2">
            <button className="h-9 w-9 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50">
              <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            <button className="h-9 w-9 flex items-center justify-center rounded-lg bg-primary text-background-dark font-bold text-sm">1</button>
            <button className="h-9 w-9 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 text-[#111813] dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 text-sm font-medium">2</button>
            <button className="h-9 w-9 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 text-[#111813] dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 text-sm font-medium">3</button>
            <span className="text-gray-400">...</span>
            <button className="h-9 w-9 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800">
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </nav>
        </div>
      </main>
    </div>
  );
}
