import React from "react";

const CarRelated = () => {
  const relatedProducts = [
    {
      name: "Giant ATX 660 - 2020",
      seller: "Hùng Cường",
      price: "7.200.000 đ",
      condition: "95%",
      location: "Hà Nội",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCiofV7f2PyqpnDnZsvFlKPPH9U_CSfgm9ptmS7bRG-vliRHY_N-uCJicfnzQddz9pV3pVhu0Zdfss6X0LdESHMf5zApS_Y236rIOggGcBj8a6lgYjc1vKSPSORedRJxZrlsooqzyXNWslgaEOmRyRrhpFuF2SQTyl-gwCbiZ8l4njLOi9l32XKdven3K6Zmlf2N7MLsUT4OmlgIPZB5M427QaMV9aPeVupNqCjSjSTq0e3PgUBwkCZ8bs-jY5hhKkFVBh5oJdaGd0e",
    },
    {
      name: "Specialized Rockhopper",
      seller: "Bike Shop A",
      price: "15.500.000 đ",
      condition: "Like New",
      location: "TP.HCM",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBMQ3rBJKiqkmDtlvweGbDUCav3QcxU3MZwvtqalSS3cxxPsLnEmHRIO2D8EffUGMgRLCcRvGF0ATpRWQJ0BPWz34jnRwtKiiXh6Bj7WYxHutrDpWBVk-q9mckqAyCEv4Q292C5qVX1IIKA6DV1QFudGOEgS63NlHncdgewGy3cSVQ7jcJWC2cFC0JLrGDJOl8HlBpZOyMkIFAbB6m3ryXR4LoN77UIS0oWWMFDxKVeZl181MlBzdVodjsFqUQbWgTyWOoIKxCTS603",
    },
    {
      name: "Cannondale Trail 5",
      seller: "Trần Linh",
      price: "11.000.000 đ",
      condition: "90%",
      location: "Đà Nẵng",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDHVkxgwGzLEIZJbct0Mrq5hqY4rZGi2Qn4m4RFxMOXmWcYFJ75TgH5jRE7tqjB-SmhBlcs59F2F866dusW5qQ7RpgjE0JMRtBJf4TECZEdZDfVemdZw6Jiy3iOa2kHroLb2X-6L0p_wFoStV7vZUQkCQ2oRkxZ2m2bPULeb3z-46xS_oF-eLXbO3DScaKolQI-s9WSlZQvz4zE2uhhZMEO0TckM_BrmhMancXCxP4f2Ij9Gu5L94301GAd10pbj535oOiGzwgF3gNo",
    },
    {
      name: "Road Bike Twitter R10",
      seller: "Nam Nguyen",
      price: "9.500.000 đ",
      condition: "99%",
      location: "Hà Nội",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCLuJqpmjf0-ZOi5OWpwWFPBNoj1N3cYAgB2gKub25XGKk-rUQw-SBrQnFN3WT7wOwOi8KKzO_bOIfIGkPKCSr3W6FKL8DR__QzkOz5ohxDV7p-PZswYEE_UXPSKx7NqdoBspU2yp3tmJt-qtpfKRvfdD_RdNxhyNAVAakkfmIecIVyDi9jOBgt49_ACXOtcy7CNfNH9CrY-fxQuXSIaWDGraY-dCw2t9JCFTxJBrwaHnXHB3bMHE8wGpI7CPmYaYbGd1tWxC2Cla5T",
    },
  ];

  return (
    <div>
      <section className="mt-16">
        <h3 className="text-[#111813] text-xl font-bold mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">
            recommend
          </span>{" "}
          Có thể bạn cũng thích
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product, index) => (
            <a
              key={index}
              className="group block bg-white dark:bg-[#1a3524] rounded-xl overflow-hidden border border-[#f0f4f2] dark:border-[#2a4534] hover:shadow-lg transition-all duration-300"
              href="#"
            >
              <div className="aspect-[4/3] w-full overflow-hidden relative">
                <div
                  className="w-full h-full bg-center bg-cover transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url("${product.image}")` }}
                ></div>
                <div className="absolute top-2 right-2 bg-white/90 dark:bg-black/60 px-2 py-1 rounded text-xs font-bold text-[#111813] dark:text-white">
                  {product.location}
                </div>
              </div>
              <div className="p-4">
                <h4 className="text-[#111813] dark:text-white font-bold text-base mb-1 truncate">
                  {product.name}
                </h4>
                <p className="text-[#61896f] text-xs mb-3">
                  Đăng bởi {product.seller}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-primary font-bold text-lg">
                    {product.price}
                  </span>
                  <span className="bg-[#f0f4f2] dark:bg-[#2a4534] text-[#61896f] text-xs px-2 py-1 rounded">
                    {product.condition}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CarRelated;
