import React, { useEffect } from "react";
import { Bike, ChevronRight, House, ListFilter, MapPin, RulerDimensionLine, Search, Settings, Shapes, Trash, Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";


const bikes = [
  {
    id: 1,
    title: "Trek Madone SL 6",
    year: 2021,
    category: "Aero Road",
    price: 45000000,
    size: "54",
    material: "Carbon",
    groupset: "Ultegra R8000",
    location: "TP. Hồ Chí Minh",
    seller: "Minh Tuấn",
    sellerAvatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuALqnk67o7eZ-iKxE_rhCVwDhNBb0nAg1xG5Y-EwZvRGSM_-6i9-lTkpHr4dD1C200adtiLMsoOIh6zoBLvQvWduh1dMum0FVTUqySahgGGJzUAxE5EaZUVkaqFIYCOd8Ww0sEPyEKRDzjj-7zBFc6YXODQIoPa8nqsssSDov530I6_eIDj6YfYFdxsr6BmLpqaJziNkp-GtQaU1Xv7pBrfAFtHrOjtVfbJ0D3AwdED3VB1hQvakUrc2Kl1SbeQURc6kV4K_Txy1gzP",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCSzATtY-vJBtb9A-4ZqxFJIMiESTE-cos7lo0MdrlntNRfv583Fxe6aBUL77Jv2yI8FKNmKfV9tQ4JYgLxvj781JN-eC2fwpBvGoTCm7qIWTg6izcTOVhmsNMcrVx-WX90Xv1uoy2cM34gvRl4whPPYJUn1LxI91fQ2ByHMp3SOnKhS-S31TQAhoFIQbGSb4Zg1cZjmYxBQa5c84YL_C65JXZav6iMt_Ay9TeY6K_cOeFQ-mg5HaH4mEkXkpx6xPPmNrIQz-Q6ZF17",
  },
  {
    id: 2,
    title: "Giant TCR Advanced 1",
    year: 2022,
    category: "All-rounder",
    price: 38500000,
    priceOld: 42000000,
    size: "M",
    material: "Carbon",
    location: "Hà Nội",
    seller: "Hải Phạm",
    sellerAvatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCA8hSASVw3dt8g8ufL6_jW4950qpR9J4sBSY4DNTrbMrwelIN70CWpdJ2iAFvQWXdCItORZonncKsdfPW2KEFCj_VmDIh_NQ_ZpuMB5MHgTJjmOLxh6zu43FQ-M3QCMlOp_UOSq_HI_rWwEourXWsGpbkLGSAp_Cx134t5pReA9h6zYZNJ9IQ1XIcLbd_RSwItNn6FhU_9PyVIjDcqFmQ8bxIwqKadq9QXWI0jAH__3TPb3MYExpxd7wxDKuMve_FVPbSMhUlu_NZD",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDJbCgsgTUzuPGLpZA8sBiLQ1ridOg2bBtP2gQwp_LuukdHtwUrR9PSQbIG2ROd-7QfM-EDl8Ast7EwCS6Y2dFayzYvtpncjVmMvZZiXZUQDwY_yhef_NwgnO2WgOuMNXwKTC1b2eaHELDH5bvIuK92_SF1QQNzU5gcO3PocRg0A9tqmd9_lU6uX8709V8lDkEWRAsllJCi5y7lMWR47RI5RrVF7kLjyNq5mdZuayDav4NQYY_l9EQ9-dCMiFF1TKMcvESyjP6mWEBF",
  },
  {
    id: 3,
    title: "Specialized Tarmac SL7",
    year: 2020,
    category: "Racing",
    price: 62000000,
    size: "52",
    location: "Đà Nẵng",
    seller: "Shop Xe Cũ",
    sellerAvatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAhObJgnv1IX07fh6yuGOvrEHrIFjdJjytC8dJxAvZuNRRGc7_8IPC30lZvpe8GlmVzLZ0N7uZrQv7XL1kvYXJEfeFKNwtqxzftzSFp5m2umY3WNlMHa1N22HnD_LNrxRESSWtJJmzVhqAQvZ6_CwScpKF9bBUt9qMRcBQSclh7Z1OX0AJOTf-BAQhHbYMwsM6X0X82YfzFUllm_Ky7uahVhpFvEMPGHNC42_mmUvri--cyY3ac09KsDPQ7qXEl0H2P8OC8kp3okhV5",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBjBv9vLnLptPb65PTH9QN_FLVvLxcDsYnngw40KCFnIxTqYmi_BjnSj9hmgwFMWB1sAXj19X4tLMmkQYSQIaYOwMjypsmkw_YtYK8y7iXT4aXXHTR_utHWTVwClgM8YpkDsy8xWlyFmHAsJQk2k45Mx7EQbd7gOmGm8z-UhtO6C6mqXY9XYRFt8Hzs1sXGmTGIGzp3PuzpxhaaWWOBRQGaOVZUUwuMTrRwHhCHVWYaHfjo7YEj2G8fjgXVdMdK6j1w7PPErk0X5-39",
    sold: true,
  },
  {
    id: 4,
    title: "Cervélo S5 Disc",
    year: 2023,
    category: "Aero",
    price: 85000000,
    size: "56",
    material: "Carbon",
    groupset: "Dura-Ace",
    location: "Cần Thơ",
    seller: "Huy Khánh",
    sellerAvatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBtnPptj30YRmFG6LcVY7q_6qeRgkvjkjvzfjB1EmMd8zvwgzCbkWWSibsSihJ3mwRB2f6xrjBFUI5WVBIlolc86eZdU9HLoWwtkgMyg0nJl47f7Mrkm7ZecD8VP9LY0GQf6gN3lDkI0mfvlEzn42d8hIo0LbNM6iOJ2kx9MkdbaXNyyqOj4ag-n0hfI5l44EFvms0VBUqUKKNtIuh5145ovX6bmIm4vR-LWvGYA0TAJVRh8t1dSbKRiyG7TG3pQnThbR4ypGg0O7te",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD6Bn-7pmQ_VzFv-RX5fn2QvR1WNRs43W1Spnv-yQPWIX5njsDFWHz0rDhywlPGYvQLTiwq5zDGKnJtk1CTluHiUIkcON8QEkPlMZXHObrYc1VSe-vaJmcKTf1y9K7znNLLdit30ThA7iJ8EQxOGHN9oW7xONagJmJvKft-g5xK82AbGAiJ3n80gE6GKKQDJYdKDl0VsrZJODRzzbBG6uJpcfJTzudjvqeoKzayDUPHXDNlLpBA_tyg7TYT9AnZtql5-dcndpBDT-y8",
    freeship: true,
  },
];

function formatVND(n) {
  return n.toLocaleString("vi-VN") + " ₫";
}

export default function Wishlist() {
  useEffect(() => {
    document.title = "Danh sách yêu thích - BikeMarket";
  }, []);
  const navigate = useNavigate();

const handleHomebuyerClick = () => {
  navigate('/homebuyer');
};
  const handleDelete = (id) => {
    console.log("delete", id);
  };
  const handleView = (id) => {
    console.log("view", id);
  };

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col text-text-main dark:text-white transition-colors duration-200">
     

      <main className="flex-grow w-full  px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* <nav aria-label="Breadcrumb" className="flex mb-6">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
             <button onClick={handleHomebuyerClick}>
              
              <a className="inline-flex items-center text-sm font-medium text-text-sub hover:text-primary" href="#">
                <span className="material-symbols-outlined text-[18px] mr-2"><House /></span>
                Trang chủ
              </a>
             </button>
            </li>
            <li>
              <div className="flex items-center">
                <span className="material-symbols-outlined text-text-sub text-sm mx-1"><ChevronRight /></span>
                <span className="ml-1 text-sm font-medium text-text-main dark:text-white md:ml-2">Danh sách yêu thích</span>
              </div>
            </li>
          </ol>
        </nav> */}

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-text-main dark:text-white mb-2">Danh sách yêu thích</h1>
            <p className="text-text-sub text-base">Bạn đã lưu <span className="font-bold text-text-main dark:text-white">{bikes.length} xe đạp</span> vào danh sách.</p>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <button className="group flex h-9 items-center gap-2 rounded-full border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark px-4 text-sm font-medium hover:border-primary hover:text-primary transition-all active:bg-primary/10">
              <span className="material-symbols-outlined text-[18px]"><ListFilter /></span>
              Lọc
            </button>
            <div className="h-9 w-px bg-border-light dark:bg-border-dark hidden sm:block"></div>
            <button className="flex h-9 items-center rounded-full bg-primary text-black px-4 text-sm font-bold shadow-sm shadow-primary/20">
              Tất cả
            </button>
            <button className="flex h-9 items-center rounded-full bg-white dark:bg-surface-dark border border-transparent hover:border-border-light dark:hover:border-border-dark text-text-sub hover:text-text-main dark:hover:text-white px-4 text-sm font-medium transition-colors">
              Còn hàng
            </button>
            <button className="flex h-9 items-center rounded-full bg-white dark:bg-surface-dark border border-transparent hover:border-border-light dark:hover:border-border-dark text-text-sub hover:text-text-main dark:hover:text-white px-4 text-sm font-medium transition-colors">
              Giảm giá
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {bikes.map((b) => (
            <article
              key={b.id}
              className={`group relative flex flex-col ${b.sold ? "opacity-75" : ""} bg-surface-light dark:bg-surface-dark rounded-xl overflow-hidden shadow-soft border border-transparent hover:border-primary/50 transition-all duration-300`}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url('${b.image}')` }}
                />

                {b.sold && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[1px]">
                    <span className="bg-red-500 text-white px-3 py-1 rounded text-sm font-bold uppercase tracking-wide">Đã bán</span>
                  </div>
                )}

                {b.freeship && (
                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                    <span className="inline-flex items-center gap-1 rounded bg-white/90 dark:bg-black/80 px-2 py-1 text-xs font-bold text-blue-600 backdrop-blur-sm">
                      <span className="material-symbols-outlined text-[14px]"><Truck /></span>
                      Freeship
                    </span>
                  </div>
                )}

                <button
                  onClick={() => handleDelete(b.id)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/90 dark:bg-black/60 text-gray-400 hover:text-red-500 hover:bg-white transition-colors backdrop-blur-sm shadow-sm"
                  title="Xóa khỏi danh sách"
                >
                  <span className="material-symbols-outlined text-[20px]"><Trash size={16} /></span>
                </button>
              </div>

              <div className="flex flex-1 flex-col p-4">
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg font-bold text-text-main dark:text-white leading-tight line-clamp-1 group-hover:text-primary transition-colors">{b.title}</h3>
                  </div>
                  <p className="text-text-sub text-xs font-medium mb-3">{b.year} • {b.category}</p>

                  <div className="text-xl font-bold text-primary mb-4">{formatVND(b.price)}</div>

                  <div className="grid grid-cols-2 gap-y-2 gap-x-1 text-xs text-text-sub mb-4">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px]"><RulerDimensionLine size={20} /></span>
                      <span>Size {b.size}</span>
                    </div>
                    {b.material && (
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px]"><Shapes size={20} /></span>
                        <span>{b.material}</span>
                      </div>
                    )}
                    {b.groupset && (
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px]"><Settings size={20} /></span>
                        <span>{b.groupset}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px]"><MapPin size={20} /></span>
                      <span className="truncate">{b.location}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-2 pt-3 border-t border-border-light dark:border-border-dark flex items-center gap-3">
                  <div className="flex items-center gap-2 text-xs font-medium text-text-main dark:text-white">
                    <div className="size-6 rounded-full bg-gray-200 bg-cover bg-center" style={{ backgroundImage: `url('${b.sellerAvatar}')` }} />
                    {b.seller}
                  </div>
                  <button
                    onClick={() => handleView(b.id)}
                    className={`ml-auto flex items-center justify-center rounded-lg ${b.sold ? "bg-gray-100 dark:bg-gray-800 text-text-sub cursor-not-allowed" : "bg-primary/10 hover:bg-primary text-primary hover:text-black"} px-3 py-2 text-sm font-bold transition-all`}
                    disabled={b.sold}
                  >
                    {b.sold ? "Đã bán" : "Xem chi tiết"}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      
    </div>
  );
}
