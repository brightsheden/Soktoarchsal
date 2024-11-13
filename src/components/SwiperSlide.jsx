import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y,  } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default () => {
  return (
    <div className='my-8 p-8'>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView="auto"
        navigation
        pagination={{ clickable: true }}
        autoplay={true}
        breakpoints={{
          // 1 slide on mobile
          640: {
            slidesPerView: 1,
          },
          // 3 slides on desktop
          768: {
            slidesPerView: 3,
          },
        }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        <SwiperSlide>
          <img className='w-full' src='/images/img1.jpeg'/>
        </SwiperSlide>
        <SwiperSlide>
          <img src='/images/img2.jpeg'/>
        </SwiperSlide>
        <SwiperSlide>
          <img src='/images/img3.jpeg'/>
        </SwiperSlide>
        <SwiperSlide>
          <img src='/images/img4.jpeg'/>
        </SwiperSlide>
        <SwiperSlide>
          <img src='/images/img6.jpeg'/>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};