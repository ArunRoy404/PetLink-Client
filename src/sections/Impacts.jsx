import { Typography } from "@material-tailwind/react";
import { stats } from "../DummyData/Stats";
import { Users } from "lucide-react";
import StatsCard from "../components/ui/Cards/StatsCard";


const Impacts = () => {
  return (
    <section>
      <div className="bg-background dark:bg-gradient-to-b dark:from-[#121212] dark:to-[#1F1A33] py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">

          {/* section header  */}
          <Users className="w-12 h-12 mx-auto mb-6 text-primary" />
          {/* title  */}
          <Typography
            variant="h3"
            color="blue-gray"
            className="mb-4 dark:text-white"
            placeholder=""
          >
            Our Impact in Numbers
          </Typography>
          {/* subtitle  */}
          <Typography
            variant="paragraph"
            className="mb-8 text-gray-600 dark:text-gray-300"
            placeholder=""
          >
            Since launching in 2025, PetLink has facilitated:
          </Typography>


          {/* stats container  */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 xl:gap-12">
            {stats.map((stat, index) => <StatsCard stat={stat} key={index} />)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impacts;
