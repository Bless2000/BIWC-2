import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';
import "swiper/css";
import "../../styles/ImageCarousel.css";

// Importing actual images from assets
import img1 from "../../assets/images/church.jpg";
import img2 from "../../assets/images/church2.jpg";
import img3 from "../../assets/images/congregation.jpg";
import img4 from "../../assets/images/choir.jpg";
import img5 from "../../assets/images/youth.jpg";

function ImageCarousel() {
  const images = [img1, img2, img3, img4, img5];

  return (
    <section className="carousel-section px-6">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={24}
        slidesPerView={1}
        autoplay={{ 
          delay: 3000,
          disableOnInteraction: false 
        }}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img src={img} alt={`Church life ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default ImageCarousel;
