import React, { useState } from "react";
import { Bell, Bike, ChevronLeft, ChevronRight, Heart, MapPinCheckInside, RulerDimensionLine, Search, ShieldCheck, SlidersHorizontal } from "lucide-react";
export default function Homebuyer() {
  const [sortBy, setSortBy] = useState("Mới nhất");
  const [verifiedOnly, setVerifiedOnly] = useState(true);

  const bikes = [
    {
      id: 1,
      name: "Specialized Tarmac SL7 Expert",
      price: "85.000.000 đ",
      size: "54",
      location: "TP.HCM",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDThrm3THpCEaUG5eYcy9oyRECfjRd2zq0_ZKvAu5_tys_rovBsdeN87NdegZZwjyBhb1So34IGEESD1tQMLj_n8KdVI29BvBZ7y3See-YQWTRo5RwYRpmwM3RYmBOBhvQdUb0og53QRhUpb9SKAcc_t-1hCcv9epubiJHvLrLlHFCLeJBQjYOWd_OOlCxjMt7EeoWoCVgOqYgIrYzy1AOkENJ6Zxvo1xuZgeRff5zr2gMsLQ6Mq7VuULXNtFj2KuFYy_GptMEBzKEu",
      verified: true,
      newTag: false,
    },
    {
      id: 2,
      name: "Giant TCR Advanced Pro Disc",
      price: "42.500.000 đ",
      size: "M",
      location: "Hà Nội",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDydEk8Ij49uUNqtj1Ba-FGvhDr4tI3WvC-d2emi-UGeJqZOSH9sqX7tJG_QKCVa2JWudDREyNvw6UPPhj4XxywD_LcWAy1TghknAJtzmQrayZimmfj0btmt4WqJcaALifpZPGuN-eEIQsulaUScScDjm7hsVIOQbzCADEgoL4kdGWcm4lOVndccAYp-yvfDL5dgzqwApw6rhqBkb7D3t1qmvz3KwaHypAzQA88HTSL6asp9JZUhFmgmPxSojDMDBE_oY8uZyQyBWfJ",
      verified: false,
      newTag: true,
    },
    {
      id: 3,
      name: "Bianchi Oltre XR4 Disc",
      price: "110.000.000 đ",
      size: "55",
      location: "Đà Nẵng",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_MMM8dCnT0jddY4OMuBlFsKXSHpgy8t6hKGvd6YBJIc6YIKYD4A4NZjezZUmpZfWjp-Pp0Jmc72WthRGiEYm3C6KhXGHj2kczuiQyw7rPnlfFJbjKF1cFxTx5PbH4MSkzssheaPtq3zh4byl2gZnw2pV_6qLDS9XCImOZq9GllVSXa0A4ajkipeSjq-a7oAJoTi0cykQLResBfuMFE1H8xRD1FITnYWda7mmBrSZf1gov1RbOdkXV_TkOCzSowKCdKLF1H_aj4_rO",
      verified: true,
      newTag: false,
    },
    {
      id: 4,
      name: "Vintage Steel Peugeot Frame",
      price: "8.500.000 đ",
      size: "L",
      location: "Hà Nội",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDL8RCdjbQNlmJg9Cn_6VrpgwqeKPl9IZKJrR74RvUFCskkLzjfMbJJrUTs4FBXnGgVUkzRJb_7CNWbNtbR-ULleHG4YT-8BtmsTyjc-9Ut3a6tUN2gLGS4i06_Mw9LGX3MWG9T665GVvYsJfIXFvI9uctXmZBsFwsCIEbfx9vldiVzZSCPrhNteOtLzblmM5NQKck136U2xkFxfTclBkQXdqMBEC9cz_50NtKCtYJJSpMRdLUkZH26ZPDSFNEjEOHiYF0nNiadzzXx",
      verified: false,
      newTag: false,
    },
    {
      id: 5,
      name: "Trek Marlin 7 - 2022",
      price: "15.000.000 đ",
      size: "M",
      location: "Cần Thơ",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWzTYA4oBdnOFaRua62jE9o1Z9V7-hJZFh_KK8RLMewKqvwxtWTYK_yv8cLAlCggTpazyXidPpViQS13jB7ZZ51gYE4-Mn-HZsiVcY-Cbjt1C2VshxdaEXZv2srEcRxCBUv962DTmCKUhFNrIR4NlaBZXWa2_jRjRIgUlyQQhcFzyIG3fZwn6Q_dWGhI8MpkrUj4QG41Hbd4Ef7_kf9HvDJQZ-SgX8h3e_nQbABfs7VKoQlWEbwlpRftweOIbuISwD_L_oxLIzIl9Q",
      verified: true,
      newTag: false,
    },
    {
      id: 6,
      name: "Custom Fixed Gear 8bar",
      price: "18.000.000 đ",
      size: "52",
      location: "TP.HCM",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAAA3WAHO0MKPDevVVntdTbEeS1BwBwBfoPrcOyuWWm-n3IyFqdrmfTFD1DrHa0ZSPLSqChHJUfhmgxdrNW52K-sQQcQxLM9tbDCavXM_YFgORB67Rg9SliUWOBv1h8bLjQShyn86M89JzjjyAlmWmfk9HPIPfSZPTTbhifhORuIW36IpPtNe0jGISeI-VySDBm-Tjchi1yfVQfyowsz2r4_uPTdpwU4ztkAGsIiw9kPv-OxDt9A1KtkTd_Tpw1bWvvGoBrxj0XcuGy",
      verified: false,
      newTag: false,
    },
  ];

  const watchedBikes = [
    {
      id: 1,
      name: "Giant Escape 2",
      price: "12.000.000 đ",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBC3GqtGutypL6WKw1pCEaqFm0mDuJs8cJvf7pCDDhDxYVUIllstsmuM-TgSALxgh3cHwA-154ctGfPILFe98NApIg3Ah75-DnrCgkRlaLZGFkqqeudLLcbvBGE7ipJzvUd6pOogqJF8Snih6dtDZsVpn2WtT2ECbklqxQnmDTfquMCUhmnetryNVPTnLE_Dy-y17nOoCkyFVdVuIHwY9HG3XqNzh2pCKf127uXb9hiUfE0aqlFJur4Glh3bpxYLayOsRxfi05mmey9",
    },
    {
      id: 2,
      name: "Cannondale Synapse",
      price: "18.500.000 đ",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLxhusgdDVG80WQ34iY3MPMrM9HkoTYHEk4BScilLSHY863_bhfE-n6MESa9yl6yV7hUExIqGevk8UgZ1TxvPLxP8wbWOGa2W5mSbaclVgJRKsw1DWIetmZW-ZqRfqSVHMx92AEfgTSwxYabTr853W6Yv1jFAEPH6G7MfjddHtV0Lpqizg7S0zmdmuCsNp7h4CkJIrIHe5jNw0JMgccIynMTrdxZT0Tptk9riJQ0wvOZ_4g_ZKTviFt0LGLTY9C39uYJCfBpBvsfjA",
    },
  ];

  return (
    <div className="bg-background-light dark:bg-background-dark text-[#111813] overflow-x-hidden">
      {/* Header */}
      <div className="w-full bg-white border-b border-[#e5e7eb] sticky top-0 z-50">
        <div className="w-full ">
          <header className="flex items-center justify-between whitespace-nowrap px-4 lg:px-10 py-3">
            <div className="flex items-center gap-8">
             <div className="p-6 pb-2">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600 text-white shadow-sm">
              <Bike size={20} />
            </div>
            <h1 className="text-emerald-700 text-lg font-extrabold tracking-tight">BikeMarket</h1>
          </div>
        </div>
              <label className="hidden md:flex flex-col min-w-40 !h-10 w-96">
                <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                  <div className="text-[#61896f] flex border-none bg-[#f0f4f2] items-center justify-center pl-4 rounded-l-lg border-r-0">
                    <span className="material-symbols-outlined" style={{ fontSize: "24px" }}>
                      <Search strokeWidth={1.25} />
                    </span>
                  </div>
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111813] focus:outline-0 focus:ring-0 border-none bg-[#f0f4f2] focus:border-none h-full placeholder:text-[#61896f] px-4 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal"
                    placeholder="Tìm kiếm xe đạp mơ ước..."
                  />
                </div>
              </label>
            </div>
            <div className="flex flex-1 justify-end gap-4 lg:gap-8 items-center">
              <div className="hidden lg:flex items-center gap-6">
                <a className="text-primary text-sm font-bold border-b-2 border-primary pb-1" href="#">
                  Mua xe
                </a>
                <a className="text-[#111813] text-sm font-medium hover:text-primary transition-colors" href="#">
                  Tin tức
                </a>
                <a className="text-[#111813] text-sm font-medium hover:text-primary transition-colors" href="#">
                  Hỗ trợ
                </a>
                <a className="text-[#111813] text-sm font-medium hover:text-primary transition-colors" href="#">
                  Đơn hàng của tôi
                </a>
              </div>
              <div className="flex gap-3 items-center">
                <button
                  className="flex size-10 items-center justify-center rounded-lg bg-[#f0f4f2] hover:bg-[#e2e8e5] text-[#111813] relative"
                  title="Thông báo"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: "24px" }}>
                    <Bell strokeWidth={3} />
                  </span>
                  <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full"></span>
                </button>
                <button
                  className="flex size-10 items-center justify-center rounded-lg bg-[#f0f4f2] hover:bg-[#e2e8e5] text-[#111813]"
                  title="Xe yêu thích"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: "24px" }}>
                    <Heart strokeWidth={3} />
                  </span>
                </button>
                <div
                  className="bg-center bg-no-repeat bg-cover rounded-full size-10 border-2 border-white shadow-sm cursor-pointer"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAZCJXctLpVot0sNndJ_n88PWplpqfErAYBxhjyKuEFyzpVqzM0q-QEhhhKelYBZXtQuzTukcrh9QJlVsvuw5zQRjtx7FPCiFEi-M-_omZTS8NfM3F__UI4r56M2QUnEWQjujdXVGezT9q1iD_YRe3bHiyNsOnH0E7qhSFJPCry3HPr1XNXc58j68uD2qBcjga6QVTOf0LN1VY-DRe8p70sQ5-3ea3N-iDTXhbhUKHFJMl94OLjIcCuPvdoN7gsQ0lN10GhzvSyS4bo")',
                  }}
                ></div>
              </div>
            </div>
          </header>
        </div>
      </div>

      {/* Main Layout Container */}
      <div className="layout-container flex h-full grow flex-col">
        <div className="w-full  px-4 lg:px-10 py-6 flex flex-col gap-8">
          {/* Hero Section */}
          <div className="@container">
            <div
              className="flex min-h-[320px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-start justify-end px-6 pb-10 md:px-10 overflow-hidden relative shadow-lg"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.7) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBs4rwvI8579xuy0IdSVJBqNLVUkeAPqUSXnSU_Eu4ygrUqqBZX3CPf_sK7g8l1Np0MjxjVydqutLDmsL15m-qpjKpVsVBVwbsIqBNNUAKvyUzUsBXBflA83NP6HlJk02lGknmvpSEOJHHqxl2EhzcP2p7GQbZ6L7OKpxHGhsDaU4qMrD1BGPY4c7-4ow9WW4F91EHSOtKLp3yhDf0dkylZosJRTzZchuihj-m6shJcf-Tlzax3GIehdGgAby3xgMFCtAr1LFfGDpQ1")',
              }}
            >
              <div className="relative z-10 flex flex-col gap-3 text-left max-w-2xl">
                <div className="inline-flex items-center gap-2 bg-primary/90 backdrop-blur-sm px-3 py-1 rounded-full w-fit">
                  <span className="material-symbols-outlined text-black" style={{ fontSize: "16px" }}>
                    verified_user
                  </span>
                  <span className="text-xs font-bold text-black uppercase tracking-wide">Đối tác tin cậy</span>
                </div>
                <h1 className="text-white text-3xl font-black leading-tight tracking-[-0.033em] md:text-5xl">
                  Chào mừng trở lại, Minh!
                </h1>
                <p className="text-white/90 text-sm font-normal leading-normal md:text-lg">
                  Có 5 xe đạp mới phù hợp với bộ lọc tìm kiếm "Road bike size 52" của bạn.
                </p>
                <div className="flex gap-3 mt-2">
                  <button className="flex h-10 px-5 bg-white text-black hover:bg-gray-100 transition-colors text-sm font-bold items-center justify-center rounded-lg">
                    Xem gợi ý mới
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              {/* Current Order Card */}
              <div className="bg-white rounded-xl border border-[#e5e7eb] p-5 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-[#111813]">Đơn hàng hiện tại</h3>
                  <a className="text-primary text-sm font-bold hover:underline" href="#">
                    Chi tiết
                  </a>
                </div>
                <div className="flex gap-4">
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-16 shrink-0"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAXjxvX0p-T7AAY5XVNWApZ6MPrPPP2zUR8foAOg7_MHFq1nK83fWL4baMD28IB0zGAZ44dQT8p5E_RdfBendVUxGUTetz8D8qsFO6rxYDsTVws0QEv-t2HAGYOmTrQ_c_uIVeHUqYmbI9VwfinbodIlqV1O4Ejq-vUqFOh2pCdVwVkfvgJ6ty8mMuGQhWNXo7AXQ4XL8dzBrt1KcAGKGk7DyCBB201kQt-aRTuTRECiCL5mvyPMHsd2eMW4Q2--sF4TjMmL_pYCKYs")',
                    }}
                  ></div>
                  <div className="flex flex-col justify-center gap-1">
                    <p className="text-[#111813] text-sm font-bold leading-tight">Trek Madone SL 6</p>
                    <p className="text-[#61896f] text-xs">Mã đơn: #882910</p>
                    <div className="inline-flex items-center gap-1 text-[#111813] text-xs font-medium bg-[#f0f4f2] px-2 py-0.5 rounded-full w-fit">
                      <span className="size-2 rounded-full bg-blue-500 animate-pulse"></span>
                      Đang vận chuyển
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-[#f0f4f2]">
                  <div className="flex justify-between text-xs mb-1.5 font-medium">
                    <span className="text-[#111813]">Tiến độ giao hàng</span>
                    <span className="text-primary">75%</span>
                  </div>
                  <div className="w-full overflow-hidden rounded-full bg-[#f0f4f2] h-2">
                    <div className="h-full rounded-full bg-primary" style={{ width: "75%" }}></div>
                  </div>
                  <p className="text-[#61896f] text-xs mt-2 text-right">Dự kiến: 25/10/2023</p>
                </div>
              </div>

              {/* Watched Bikes Card */}
              <div className="bg-white rounded-xl border border-[#e5e7eb] p-5 shadow-sm flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-[#111813]">Xe đang theo dõi</h3>
                  <a className="text-sm font-medium text-[#61896f] hover:text-primary" href="#">
                    Xem tất cả (4)
                  </a>
                </div>
                {watchedBikes.map((bike) => (
                  <div key={bike.id} className="flex gap-3 items-center p-2 hover:bg-[#f9fafb] rounded-lg transition-colors cursor-pointer group">
                    <div
                      className="bg-center bg-no-repeat aspect-square bg-cover rounded-md size-14 shrink-0"
                      style={{ backgroundImage: `url("${bike.image}")` }}
                    ></div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-[#111813] truncate group-hover:text-primary transition-colors">
                        {bike.name}
                      </h4>
                      <p className="text-xs text-[#61896f]">{bike.price}</p>
                    </div>
                    <button className="text-red-500 hover:text-red-600">
                      <span className="material-symbols-outlined filled" style={{ fontSize: "20px" }}>
                        favorite
                      </span>
                    </button>
                  </div>
                ))}
              </div>

              {/* Trust Card */}
              <div className="bg-primary rounded-xl p-6 text-[#111813] relative overflow-hidden shadow-sm">
                <div className="relative z-10">
                  <h3 className="font-bold text-xl mb-2">Mua xe an tâm</h3>
                  <p className="text-sm text-[#111813]/80 mb-4">
                    Mọi chiếc xe có nhãn "Đã kiểm định" đều được chuyên gia của chúng tôi xác nhận chất lượng.
                  </p>
                  <button className="bg-[#111813] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-opacity-90">
                    Tìm hiểu thêm
                  </button>
                </div>
                <div className="absolute -bottom-4 -right-4 opacity-20">
                  <span className="material-symbols-outlined text-white" style={{ fontSize: "120px" }}>
                    verified
                  </span>
                </div>
              </div>
            </div>

            {/* Main Area */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {/* Filters Bar */}
              <div className="bg-white p-4 rounded-xl border border-[#e5e7eb] shadow-sm flex flex-col md:flex-row gap-4 items-start md:items-center justify-between sticky top-[72px] z-30">
                <div className="flex flex-wrap gap-2 items-center">
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-[#f0f4f2] hover:bg-primary/20 rounded-lg text-sm font-medium text-[#111813] border border-transparent hover:border-primary transition-all">
                    <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                      <SlidersHorizontal strokeWidth={3} />
                    </span>
                    Bộ lọc
                  </button>
                  <div className="h-6 w-px bg-gray-200 mx-1 hidden md:block"></div>
                  <label className="flex items-center gap-2 cursor-pointer bg-green-50 px-3 py-1.5 rounded-lg border border-green-100 hover:border-primary transition-all">
                    <div className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={verifiedOnly}
                        onChange={(e) => setVerifiedOnly(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                    </div>
                    <span className="text-sm font-medium text-[#111813] flex items-center gap-1">
                      <span className="material-symbols-outlined text-primary filled" style={{ fontSize: "16px" }}>
                        <ShieldCheck strokeWidth={3} />
                      </span>
                      Đã kiểm định
                    </span>
                  </label>
                  <div className="hidden sm:flex gap-2">
                    <button className="px-3 py-1.5 rounded-lg border border-[#e5e7eb] text-sm hover:border-primary hover:text-primary transition-colors bg-white">
                      Road
                    </button>
                    <button className="px-3 py-1.5 rounded-lg border border-[#e5e7eb] text-sm hover:border-primary hover:text-primary transition-colors bg-white">
                      MTB
                    </button>
                    <button className="px-3 py-1.5 rounded-lg border border-[#e5e7eb] text-sm hover:border-primary hover:text-primary transition-colors bg-white">
                      Touring
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-auto">
                  <span className="text-sm text-[#61896f]">Sắp xếp:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="form-select bg-transparent border-none text-sm font-bold text-[#111813] focus:ring-0 p-0 pr-8 cursor-pointer"
                  >
                    <option>Mới nhất</option>
                    <option>Giá thấp đến cao</option>
                    <option>Giá cao đến thấp</option>
                  </select>
                </div>
              </div>

              {/* Bikes Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {bikes.map((bike) => (
                  <div key={bike.id} className="group bg-white rounded-xl border border-[#e5e7eb] overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {bike.verified && (
                        <div className="absolute top-3 left-3 z-10 bg-primary text-[#111813] text-xs font-bold px-2 py-1 rounded flex items-center gap-1 shadow-sm">
                          <span className="material-symbols-outlined filled" style={{ fontSize: "14px" }}>
                            <ShieldCheck strokeWidth={3} />
                          </span>
                          ĐÃ KIỂM ĐỊNH
                        </div>
                      )}
                      {bike.newTag && (
                        <div className="absolute top-3 left-3 z-10 bg-gray-900/80 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1 shadow-sm backdrop-blur-sm">
                          MỚI ĐĂNG
                        </div>
                      )}
                      <button className="absolute top-3 right-3 z-10 bg-white/80 p-1.5 rounded-full hover:bg-white text-gray-500 hover:text-red-500 transition-colors">
                        <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                          <Heart strokeWidth={3} />
                        </span>
                      </button>
                      <div
                        className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                        style={{ backgroundImage: `url("${bike.image}")` }}
                      ></div>
                    </div>
                    <div className="p-4 flex flex-col flex-1 gap-2">
                      <h3 className="text-base font-bold text-[#111813] line-clamp-2">{bike.name}</h3>
                      <p className="text-lg font-bold text-primary">{bike.price}</p>
                      <div className="flex items-center gap-4 text-xs text-[#61896f] mt-auto pt-2 border-t border-gray-100">
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                            <RulerDimensionLine strokeWidth={1.25} />
                          </span>
                          Size {bike.size}
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                            <MapPinCheckInside strokeWidth={1.25} />
                          </span>
                          {bike.location}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-6">
                <nav className="flex items-center gap-2">
                  <button className="p-2 rounded-lg border border-[#e5e7eb] hover:bg-gray-50 text-gray-500 disabled:opacity-50">
                    <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                     <ChevronLeft strokeWidth={3} />
                    </span>
                  </button>
                  <button className="w-10 h-10 rounded-lg bg-primary text-[#111813] font-bold text-sm">1</button>
                  <button className="w-10 h-10 rounded-lg border border-[#e5e7eb] hover:bg-gray-50 text-[#111813] font-medium text-sm">
                    2
                  </button>
                  <button className="w-10 h-10 rounded-lg border border-[#e5e7eb] hover:bg-gray-50 text-[#111813] font-medium text-sm">
                    3
                  </button>
                  <span className="text-gray-400">...</span>
                  <button className="w-10 h-10 rounded-lg border border-[#e5e7eb] hover:bg-gray-50 text-[#111813] font-medium text-sm">
                    12
                  </button>
                  <button className="p-2 rounded-lg border border-[#e5e7eb] hover:bg-gray-50 text-gray-500">
                    <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                      <ChevronRight strokeWidth={3} />
                    </span>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
