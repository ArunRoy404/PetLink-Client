import { Button } from "@material-tailwind/react";
import { Search } from "lucide-react";
import { Link } from "react-router";

const CallToAction = () => {
  return (
    <section className="bg-gradient-to-b from-white to-[#F5F3FF] dark:from-[#121212]  dark:to-[#1F1A33] py-16 md:py-20 text-black dark:text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center gap-12">

        {/* Left Text */}
        <div className="flex-1 text-center lg:text-left">


          {/* Title  */}
          <h1 className="font-bold text-primary">Call To Action</h1>
          {/* subtitle  */}
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            They’re waiting<br />
            for someone like **you**.
          </h2>
          {/* Description  */}
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-xl">
            Behind every rescued pet is a story of hope. By choosing to adopt, you're not just saving a life—you’re changing yours too. Give love, gain a friend for life.
          </p>



          {/* CTA Button  */}
          <Button className="mx-auto w-full md:w-auto lg:mx-0 bg-primary flex" size="lg">
            <div className="mx-auto flex items-center gap-2">
              <Search />
              <Link to="/pet-listing">Find Your New Best Friend</Link>
            </div>
          </Button>
        </div>


        {/* Right Image */}
        <div className="flex-1 w-full flex justify-center">
          <img
            src="https://i.ibb.co/jvGDbkH4/vecteezy-green-fuel-pump-nozzle-used-for-refueling-vehicles-57905238.webp"
            alt="Rescued pet with a happy face"
            className="max-w-md w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
