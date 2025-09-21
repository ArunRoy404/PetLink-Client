import { Typography } from "@material-tailwind/react";
import { howItWorks } from "../DummyData/HowItWorks";
import AboutCard from "../components/ui/Cards/AboutCard";

export default function AboutUs() {

  return (
    <section className="py-16 md:py-20  dark:bg-gradient-to-t dark:from-[#121212] dark:to-[#1F1A33]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">

        {/* Section Header */}
        <div className="sticky top-32 md:static">
          <div className="text-center">
            <Typography
              variant="h2"
              color="blue-gray"
              className="text-3xl md:text-4xl font-bold dark:text-white"
              placeholder=""
            >
              <span className="text-3xl font-bold text-center mb-4">
                About us
              </span>
            </Typography>
          </div>
          <p className="mb-8 text-gray-600 dark:text-gray-300 text-center">Changing Lives, One Adoption at a Time</p>
        </div>


        {/* How It Works */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {howItWorks.map((item, idx) => <AboutCard item={item} key={idx} />)}
        </div>
      </div>
    </section>
  );
}