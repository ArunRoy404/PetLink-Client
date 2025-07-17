import { Button } from "@material-tailwind/react";
import { Link } from "react-router";

const Banner = () => {
  return (
    <section className="bg-gradient-to-b from-[#CCC2F2] dark:bg-gradient-to-b dark:from-[#1C1633]
 py-40">
      <div className="container mx-auto px-4 flex flex-col-reverse lg:flex-row items-center justify-between  md:gap-10">
        {/* Left Text Section */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
        <p className="text-4xl text-primary font-bold">Don't Buy</p>
          <h1 className="text-[5rem] md:text-[8rem] xl:text-[12rem] font-bold text-gray-900 dark:text-white leading-tight">
            Adopt
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Discover adorable pets waiting for a forever home. Join us in making a difference — one paw at a time.
          </p>
          <div className="mt-6 flex justify-center lg:justify-start gap-4">
            <Button className="bg-primary" size="lg">
              <Link to="/pets">Browse Pets</Link>
            </Button>
            <Button variant="outlined" color="gray" size="lg">
              <Link to="/donations">Donate Now</Link>
            </Button>
          </div>
        </div>
        {/* Right Image Section */}
        <div className="w-full">
          <img
            src="https://i.ibb.co/YFDgmW65/image-from-rawpixel-id-6549243-png.png"
            alt="Adopt a pet"
            className="w-full h-auto max-h-[500px] object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
