import { Typography } from "@material-tailwind/react";
import { HeartHandshake, ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import StoryCard from "../components/ui/StoryCard";
import { useRef } from "react";
import SwiperContainer from "../components/ui/Swiper/SwiperContainer";
import { stories } from "../DummyData/Stories";



const MeetTheHeroes = () => {
    const swiperRef = useRef(null)

    const handleSlideChange = direction => {
        if (!swiperRef.current) return

        if (direction === 'next') {
            swiperRef.current.slideNext()
        } else {
            swiperRef.current.slidePrev()
        }
    }


    return (
        <section className="dark:bg-gradient-to-t dark:from-[#121212] dark:to-[#1F1A33] py-16 md:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8  text-center">

                {/* Section head */}
                <HeartHandshake className="w-12 h-12 mx-auto mb-6 text-primary" />
                <Typography
                    variant="h3"
                    color="blue-gray"
                    className="mb-4 dark:text-white"
                    placeholder=""
                >
                    Meet the Heroes
                </Typography>
                <Typography className="mb-12 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Real stories from our adopters and rescuers who make PetLink a place
                    of hope and new beginnings.
                </Typography>


                {/* Slider Section */}
                <div className="relative">
                    <SwiperContainer swiperRef={swiperRef} data={stories} />


                    {/* swiper buttons */}
                    <button className='absolute left-4 top-1/2 -translate-y-[200%] z-[10] bg-gray-200 flex items-center justify-center rounded-full button-next w-10 h-10 ' onClick={() => handleSlideChange('prev')}><ChevronLeft /></button>
                    <button className='absolute right-4 top-1/2 -translate-y-[200%] z-[10] bg-gray-200 flex items-center justify-center rounded-full button-next w-10 h-10 ' onClick={() => handleSlideChange('next')}><ChevronRight /></button>
                </div>
            </div>
        </section>
    );
};

export default MeetTheHeroes;
