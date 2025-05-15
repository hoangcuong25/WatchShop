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
import { AppContext } from "@/context/AppContext";
import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

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

export default function Home() {

  const { products } = useContext(AppContext)

  const router = useRouter();

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
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">Thương hiệu nổi bật</h2>
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

      <div className="mt-12 border-b border-gray-300 dark:border-gray-700 pb-8">
        <div className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">Sản phẩm bán chạy</div>
        <div className="w-full flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-1.5">
            {products.slice(0, 5).map((prod, idx) => (
              <div key={idx} className="bg-gray-100 shadow-2xl dark:bg-[#181c2a] rounded-lg p-4 flex flex-col items-center relative">

                <div className="absolute left-2 top-2 bg-red-600 text-white text-xs font-bold rounded-full px-3 py-1 z-10">-{prod.discount}%</div>

                <Image onClick={() => router.push(`/product/${prod.id}`)} src={prod.imageUrls[0]} alt={prod.name} width={100} height={100} className="w-64 h-64 object-contain mb-2" />

                <div className="text-center mt-2">
                  <div className="font-semibold">{prod.name}</div>
                  <div className=' my-1.5'>Thương hiệu: {prod.brandName}</div>
                  <div className=' my-1.5'>Xuất xứ: {prod.brandOrigin}</div>
                  <div className="text-gray-500 my-2 line-through">Giá: {prod.oldPrice} VNĐ</div>
                  <div className='text-red-500 font-semibold'> Giá: {prod.newPrice} VNĐ</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-6 text-center mt-16">
          <Button className='h-10'>Xem thêm sản phẩm bán chạy</Button>
        </div>
      </div>

      <div className="mt-12 border-b border-gray-300 dark:border-gray-700 pb-8">
        <div className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">Sản phẩm mới</div>
        <div className="w-full flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-1.5">
            {products.slice(5, 10).map((prod, idx) => (
              <div key={idx} className="bg-gray-100 shadow-2xl dark:bg-[#181c2a] rounded-lg p-4 flex flex-col items-center relative">

                <div className="absolute left-2 top-2 bg-red-600 text-white text-xs font-bold rounded-full px-3 py-1 z-10">-{prod.discount}%</div>

                <Image onClick={() => router.push(`/product/${prod.id}`)} src={prod.imageUrls[0]} alt={prod.name} width={100} height={100} className="w-64 h-64 object-contain mb-2" />

                <div className="text-center mt-2">
                  <div className="font-semibold">{prod.name}</div>
                  <div className=' my-1.5'>Thương hiệu: {prod.brandName}</div>
                  <div className=' my-1.5'>Xuất xứ: {prod.brandOrigin}</div>
                  <div className="text-gray-500 my-2 line-through">Giá: {prod.oldPrice} VNĐ</div>
                  <div className='text-red-500 font-semibold'> Giá: {prod.newPrice} VNĐ</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-6 text-center mt-16">
          <Button className='h-10'>Xem thêm sản phẩm bán chạy</Button>
        </div>
      </div>

      <div className="mt-12 border-b border-gray-300 dark:border-gray-700 pb-8">
        <div className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">Có thể bạn sẽ quan tâm</div>
        <div className="w-full flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-1.5">
            {products.slice(7, 12).map((prod, idx) => (
              <div key={idx} className="bg-gray-100 shadow-2xl dark:bg-[#181c2a] rounded-lg p-4 flex flex-col items-center relative">

                <div className="absolute left-2 top-2 bg-red-600 text-white text-xs font-bold rounded-full px-3 py-1 z-10">-{prod.discount}%</div>

                <Image onClick={() => router.push(`/product/${prod.id}`)} src={prod.imageUrls[0]} alt={prod.name} width={100} height={100} className="w-64 h-64 object-contain mb-2" />

                <div className="text-center mt-2">
                  <div className="font-semibold">{prod.name}</div>
                  <div className=' my-1.5'>Thương hiệu: {prod.brandName}</div>
                  <div className=' my-1.5'>Xuất xứ: {prod.brandOrigin}</div>
                  <div className="text-gray-500 my-2 line-through">Giá: {prod.oldPrice} VNĐ</div>
                  <div className='text-red-500 font-semibold'> Giá: {prod.newPrice} VNĐ</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-6 text-center mt-16">
          <Button className='h-10'>Xem thêm sản phẩm</Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-10 text-center">Tại sao nên chọn WatchShop?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <FaClock className="text-4xl text-blue-500 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-800 dark:text-gray-100">Giao hàng nhanh</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Giao hàng trong 24h cho nội thành và 2-3 ngày toàn quốc.</p>
          </div>
          <div className="text-center">
            <FaTools className="text-4xl text-green-500 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-800 dark:text-gray-100">Bảo hành chính hãng</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Cam kết bảo hành chính hãng từ 1 đến 5 năm.</p>
          </div>
          <div className="text-center">
            <FaHeart className="text-4xl text-red-500 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-800 dark:text-gray-100">Chăm sóc khách hàng tận tâm</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Hỗ trợ đổi trả và tư vấn tận tình 24/7.</p>
          </div>
          <div className="text-center">
            <FaMale className="text-4xl text-yellow-500 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-800 dark:text-gray-100">Mẫu mã đa dạng</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Cập nhật liên tục các xu hướng đồng hồ mới nhất.</p>
          </div>
        </div>
      </div>


      <div className="max-w-3xl mx-auto mt-16 pb-8 text-center">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Chào mừng đến với WatchShop</h2>
        <p className="text-gray-600 dark:text-gray-300">
          WatchShop tự hào là địa chỉ uy tín chuyên cung cấp các dòng đồng hồ chính hãng, đa dạng mẫu mã, giá cả cạnh tranh và dịch vụ hậu mãi tận tâm. Hãy khám phá bộ sưu tập đồng hồ mới nhất của chúng tôi ngay hôm nay!
        </p>
      </div>
    </div>
  );
}
