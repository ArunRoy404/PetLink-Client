import { Typography } from "@material-tailwind/react";
import { HeartHandshake, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import StoryCard from "../../components/ui/StoryCard";
import { useRef} from "react";

const stories = [
    {
        name: "Emily & Max",
        image: "https://www.bestbullysticks.com/cdn/shop/articles/should-i-get-a-dog-heres-what-to-consider-538339_600x.jpg?v=1743167717",
        story: "Max, a senior Golden Retriever, was overlooked for years. Emily found him on PetLink and brought him into her home. Now Max enjoys daily walks and warm hugs.",
        details: "Adopted in 2022 · Golden Retriever",
        badge: "Adopter",
    },
    {
        name: "Leo the Rescuer",
        image: "https://idsb.tmgrup.com.tr/ly/uploads/images/2021/03/04/97694.jpg",
        story: "Leo used PetLink to rescue and rehome over 30 street cats in Dhaka. His journey started with a kitten trapped in a pipe, and he hasn’t stopped since.",
        details: "Volunteer Since 2020 · Street Cats",
        badge: "Volunteer",
    },
    {
        name: "The Khan Family",
        image: "https://cdn2.psychologytoday.com/assets/styles/manual_crop_4_3_1200x900/public/teaser_image/blog_entry/2023-12/shutterstock_196619114.jpg?itok=_-DiE4Zl",
        story: "After losing their previous pet, the Khan family found Bella, a rescued lab, through PetLink. Bella is now the most spoiled member of the family.",
        details: "Adopted in 2023 · Labrador Retriever",
        badge: "Adopter",
    },
    {
        name: "Samiha & Luna",
        image: "https://t3.ftcdn.net/jpg/05/12/78/92/360_F_512789201_bba1F1tkmh2rVhWIAl4GStOaoLiBQ0wP.jpg",
        story: "Luna was found injured and frightened. Samiha nursed her back to health, and today, Luna helps calm other rescue dogs as part of a foster support program.",
        details: "Adopted in 2021 · Mixed Breed",
        badge: "Foster Carer",
    }
];


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
        <section className="dark:bg-gray-900 py-20 px-4 sm:px-8">
            <div className="max-w-6xl mx-auto text-center">
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
                        {stories.map((hero, index) => (
                            <SwiperSlide key={index} className="pb-2">
                                <StoryCard hero={hero} />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <button className='absolute left-4 top-1/2 -translate-y-[70%] z-[10] bg-gray-200 flex items-center justify-center rounded-full button-next w-10 h-10 ' onClick={() => handleSlideChange('prev')}><ChevronLeft /></button>
                    <button className='absolute right-4 top-1/2 -translate-y-[70%] z-[10] bg-gray-200 flex items-center justify-center rounded-full button-next w-10 h-10 ' onClick={() => handleSlideChange('next')}><ChevronRight/></button>
                </div>
            </div>
        </section>
    );
};

export default MeetTheHeroes;
