import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import StoryCard from "../StoryCard";

const SwiperContainer = ({ swiperRef, data }) => {
    return (
        <Swiper
            onSwiper={e => swiperRef.current = e}
            className="h-[520px]"
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
        >
            {data.map((hero, index) => (
                <SwiperSlide key={index} className="pb-2">
                    <StoryCard hero={hero} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default SwiperContainer;