'use client';

import Image from "next/image";
import Banner1 from "@public/banner1.webp";
import Banner2 from "@public/banner2.webp";
import Banner3 from "@public/banner3.webp";
import Brand1 from "@public/brand1.webp";
import Brand2 from "@public/brand2.webp";
import Brand3 from "@public/brand3.webp";
import Brand4 from "@public/brand4.webp";
import Brand5 from "@public/brand5.webp";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { FaMale, FaFemale, FaHeart, FaClock, FaTools } from "react-icons/fa";

const categories = [
  { icon: <FaMale className="text-3xl text-blue-500 dark:text-blue-400" />, label: "Đồng hồ nam" },
  { icon: <FaFemale className="text-3xl text-pink-500 dark:text-pink-400" />, label: "Đồng hồ nữ" },
  { icon: <FaHeart className="text-3xl text-red-500 dark:text-red-400" />, label: "Đồng hồ đôi" },
];

const featuredProducts = [
  {
    name: "Đồng hồ nam cao cấp",
    price: "3.500.000₫",
    image: Banner1,
  },
  {
    name: "Đồng hồ nữ thời trang",
    price: "2.800.000₫",
    image: Banner2,
  },
  {
    name: "Đồng hồ đôi sang trọng",
    price: "6.200.000₫",
    image: Banner3,
  },
];

const brandImages = [
  { src: Brand1, alt: "Brand 1" },
  { src: Brand2, alt: "Brand 2" },
  { src: Brand3, alt: "Brand 3" },
  { src: Brand4, alt: "Brand 4" },
  { src: Brand5, alt: "Brand 5" },
];

const bestSellers = [
  {
    name: "Đồng hồ nam Longines Master",
    code: "L2.909.4.77.6",
    type: "AUTOMATIC",
    size: "40MM",
    oldPrice: "94.050.000₫",
    price: "84.645.000₫",
    discount: 10,
    img: Brand1,
    buy1get1: true,
  },
  {
    name: "Đồng hồ nam Tissot Chemin Des Tourelles",
    code: "T139.807.22.038.00",
    type: "AUTOMATIC",
    size: "39MM",
    oldPrice: "26.950.000₫",
    price: "24.255.000₫",
    discount: 10,
    img: Brand1,
    buy1get1: false,
  },
  {
    name: "Đồng hồ nam Tissot PRX",
    code: "T137.407.11.351.00",
    type: "AUTOMATIC",
    size: "40MM",
    oldPrice: "23.000.000₫",
    price: "20.700.000₫",
    discount: 10,
    img: Brand1,
    buy1get1: false,
  },
  {
    name: "Đồng hồ nam Longines Master",
    code: "L2.793.5.97.7",
    type: "AUTOMATIC",
    size: "40MM",
    oldPrice: "133.650.000₫",
    price: "120.285.000₫",
    discount: 10,
    img: Brand1,
    buy1get1: true,
  },
  {
    name: "Đồng hồ nam Longines Hydroconquest",
    code: "L3.781.3.08.7",
    type: "AUTOMATIC",
    size: "41MM",
    oldPrice: "62.700.000₫",
    price: "56.430.000₫",
    discount: 10,
    img: Brand1,
    buy1get1: false,
  },
];

export default function Home() {
  return (
    <div className="bg-[#f7f7fa] dark:bg-[#10121a] min-h-screen transition-colors duration-300">
      {/* Banner */}
      <div className="w-full">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          effect="fade"
          className="w-full"
        >
          <SwiperSlide>
            <Image src={Banner1} alt="Banner 1" className="w-full h-auto rounded-lg" priority />
          </SwiperSlide>
          <SwiperSlide>
            <Image src={Banner2} alt="Banner 2" className="w-full h-auto rounded-lg" />
          </SwiperSlide>
          <SwiperSlide>
            <Image src={Banner3} alt="Banner 3" className="w-full h-auto rounded-lg" />
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Sliding Brand Section */}
      <div className="max-w-5xl mx-auto mt-10">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">Thương hiệu nổi bật</h2>
        <Swiper
          modules={[Autoplay]}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
          spaceBetween={24}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          loop
          className="w-full"
        >
          {brandImages.map((brand, idx) => (
            <SwiperSlide key={idx} className="flex justify-center items-center">
              <div className="bg-white dark:bg-[#181c2a] rounded-lg shadow p-3 flex items-center justify-center h-24 w-36">
                <Image src={brand.src} alt={brand.alt} className="object-contain h-16 w-auto" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Sản phẩm nổi bật */}
      <div className="max-w-6xl mx-auto mt-12 px-2">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">Sản phẩm nổi bật</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {featuredProducts.map((prod, idx) => (
            <div key={idx} className="bg-white dark:bg-[#181c2a] rounded-lg shadow hover:shadow-xl transition p-4 flex flex-col items-center">
              <Image src={prod.image} alt={prod.name} className="w-full h-48 object-cover rounded" />
              <h3 className="mt-4 font-semibold text-lg text-gray-800 dark:text-gray-100 text-center">{prod.name}</h3>
              <p className="text-primary font-bold text-xl mt-2 dark:text-yellow-300">{prod.price}</p>
              <button className="mt-4 px-6 py-2 bg-[#22304a] dark:bg-[#10121a] text-white rounded hover:bg-[#161a2b] dark:hover:bg-[#22304a] transition">Xem chi tiết</button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <div className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">Sản phẩm bán chạy</div>
        {/* Danh mục nổi bật */}
        <div className="flex justify-center mt-8">
          <div className="grid grid-cols-3 sm:gap-1.5 gap-4 px-1.5">
            {categories.map((cat) => (
              <div
                key={cat.label}
                className="flex flex-col items-center bg-white dark:bg-[#181c2a] rounded-lg shadow p-4 hover:shadow-lg transition cursor-pointer"
              >
                {cat.icon}
                <span className="mt-2 font-semibold text-gray-700 dark:text-gray-200 text-center text-sm">{cat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="w-full flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-1.5">
            {bestSellers.map((prod, idx) => (
              <div key={idx} className="bg-white dark:bg-[#181c2a] rounded-lg shadow p-4 flex flex-col items-center relative">
                {/* Discount badge */}
                <div className="absolute left-2 top-2 bg-red-600 text-white text-xs font-bold rounded-full px-3 py-1 z-10">-{prod.discount}%</div>
                {/* Buy 1 get 1 badge */}
                {prod.buy1get1 && (
                  <div className="absolute left-2 bottom-2 bg-orange-600 text-white text-xs font-bold rounded px-2 py-1 z-10">Mua 1 tặng 1</div>
                )}
                {/* Product image */}
                <Image src={prod.img} alt={prod.name} className="w-32 h-32 object-contain mb-2" />
                {/* Product info */}
                <div className="text-center mt-2">
                  <div className="font-semibold">{prod.name}</div>
                  <div className="font-bold text-lg">{prod.code}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{prod.type} | {prod.size}</div>
                  <div className="line-through text-gray-400 text-sm mt-1">{prod.oldPrice}</div>
                  <div className="text-red-600 font-bold text-lg mt-1">Giá KM: {prod.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Giới thiệu ngắn */}
      <div className="max-w-3xl mx-auto mt-16 pb-8 text-center">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Chào mừng đến với WatchShop</h2>
        <p className="text-gray-600 dark:text-gray-300">
          WatchShop tự hào là địa chỉ uy tín chuyên cung cấp các dòng đồng hồ chính hãng, đa dạng mẫu mã, giá cả cạnh tranh và dịch vụ hậu mãi tận tâm. Hãy khám phá bộ sưu tập đồng hồ mới nhất của chúng tôi ngay hôm nay!
        </p>
      </div>
    </div>
  );
}
