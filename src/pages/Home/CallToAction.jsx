import { Button } from "@material-tailwind/react";
import { PawPrint, Search } from "lucide-react";
import React from "react";
import { Link } from "react-router";

const CallToAction = () => {
  return (
    <section className="bg-gradient-to-b from-[#F5F3FF] to-white dark:from-[#1F1A33] dark:to-[#121212] py-24 text-black dark:text-white">
      <div className="container mx-auto px-4 flex flex-col-reverse lg:flex-row items-center gap-12">
        {/* Left Text */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="font-bold text-primary">Call To Action</h1>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            They’re waiting<br />
            for someone like **you**.
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-xl">
            Behind every rescued pet is a story of hope. By choosing to adopt, you're not just saving a life—you’re changing yours too. Give love, gain a friend for life.
          </p>
          <Button className="bg-primary flex items-center" size="lg">
            <Search />
            <Link to="/pets">Find Your New Best Friend</Link>
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
