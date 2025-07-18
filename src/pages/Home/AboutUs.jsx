import { Typography, Button, Card } from "@material-tailwind/react";
import { Users, HeartHandshake, ShieldCheck, PawPrint } from "lucide-react";
import CountUp from 'react-countup';

export default function AboutUs() {

  return (
    <section className="py-16 px-4 bg-white dark:bg-gray-900">
      <div className="container mx-auto">

        {/* Section Header */}
        <div className="sticky top-32 md:static">
          <div className="text-center">
            <Typography
              variant="h2"
              color="blue-gray"
              className="text-3xl md:text-4xl font-bold dark:text-white"
              placeholder=""
            >
              <h2 className="text-3xl font-bold text-center mb-4">
                About us
              </h2>
            </Typography>
          </div>

          <p className="mb-8 text-gray-600 dark:text-gray-300 text-center">Changing Lives, One Adoption at a Time</p>
        </div>


        {/* How It Works */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: <PawPrint className="w-10 h-10 mb-4 text-primary" />,
              title: "Simple Process",
              desc: "Browse profiles, meet your match, and complete adoption paperwork - all in one platform."
            },
            {
              icon: <ShieldCheck className="w-10 h-10 mb-4 text-primary" />,
              title: "Vetted Partners",
              desc: "We work only with licensed shelters and verified foster homes."
            },
            {
              icon: <HeartHandshake className="w-10 h-10 mb-4 text-primary" />,
              title: "Post-Adoption Support",
              desc: "Free 30-day check-ins and training resources for all adopters."
            }
          ].map((item, idx) => (
            <Card key={idx} className={`sticky top-56 p-6 shadow-none border-2 hover:shadow-xl transition-shadow`} placeholder="">
              {item.icon}
              <Typography variant="h5" color="blue-gray" className="mb-2" placeholder="">
                {item.title}
              </Typography>
              <Typography className="text-gray-600 dark:text-gray-300 text-sm md:text-md" placeholder="">
                {item.desc}
              </Typography>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}