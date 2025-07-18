import { Typography } from "@material-tailwind/react";
import {
  PawPrint,
  Cat,
  HeartPulse,
  ShieldCheck,
  Smile,
  Users,
} from "lucide-react";
import React from "react";
import CountUp from "react-countup";

const stats = [
  {
    value: 2500,
    label: "Dogs Rehomed",
    icon: PawPrint,
  },
  {
    value: 1800,
    label: "Cats Adopted",
    icon: Cat,
  },
  {
    value: 300,
    label: "Special Needs Pets Placed",
    icon: HeartPulse,
  },
  {
    value: 500,
    label: "Senior Pets Adopted",
    icon: ShieldCheck,
  },
  {
    value: 92,
    label: "Adopter Satisfaction",
    icon: Smile,
    percentage: true,
  },
  {
    value: 100,
    label: "Volunteers",
    icon: Users,
  },
];

const Impacts = () => {
  return (
    <section>
      <div className="bg-background dark:bg-gray-800 rounded-xl p-8 md:p-12 shadow-xl">
        <div className="container mx-auto text-center">
          <Users className="w-12 h-12 mx-auto mb-6 text-primary" />
          <Typography
            variant="h3"
            color="blue-gray"
            className="mb-4 dark:text-white"
            placeholder=""
          >
            Our Impact in Numbers
          </Typography>
          <Typography
            variant="paragraph"
            className="mb-8 text-gray-600 dark:text-gray-300"
            placeholder=""
          >
            Since launching in 2025, PetLink has facilitated:
          </Typography>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 xl:gap-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-lg transition duration-300"
              >
                <stat.icon className="w-8 h-8 text-primary mb-3 mx-auto" />
                <Typography
                  variant="h4"
                  className="mb-1 text-primary"
                  placeholder=""
                >
                  <CountUp end={stat.value} enableScrollSpy={true} />
                  {stat.percentage ? "%" : "+"}
                </Typography>
                <Typography
                  variant="small"
                  className="text-gray-600 dark:text-gray-300"
                  placeholder=""
                >
                  {stat.label}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impacts;
