import { Typography, Button, Card } from "@material-tailwind/react";
import { Users, HeartHandshake, ShieldCheck, PawPrint } from "lucide-react";
import CountUp from 'react-countup';

export default function AboutUs() {

  return (
    <section className="py-16 px-4 bg-white dark:bg-gray-900">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center">
          <Typography 
            variant="h2" 
            color="blue-gray" 
            className="text-3xl md:text-4xl font-bold dark:text-white"
            placeholder=""
          >
            <span className="text-primary">About us</span>
          </Typography>
        </div>

        <p className="font-medium text-lg text-center mt-2 mb-12">Changing Lives, One Adoption at a Time</p>

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
            <Card key={idx} className="p-6 shadow-none border-2 hover:shadow-xl transition-shadow" placeholder="">
              {item.icon}
              <Typography variant="h5" color="blue-gray" className="mb-2" placeholder="">
                {item.title}
              </Typography>
              <Typography className="text-gray-600 dark:text-gray-300" placeholder="">
                {item.desc}
              </Typography>
            </Card>
          ))}
        </div>

        {/* Impact Story */}
        <div className="bg-background dark:bg-gray-800 rounded-xl p-8 md:p-12">
          <div className="max-w-4xl mx-auto text-center">
            <Users className="w-12 h-12 mx-auto mb-6 text-primary" />
            <Typography variant="h3" color="blue-gray" className="mb-4 dark:text-white" placeholder="">
              Our Impact in Numbers
            </Typography>
            <Typography variant="paragraph" className="mb-8 text-gray-600 dark:text-gray-300" placeholder="">
              Since launching in 2025, PetLink has facilitated:
            </Typography>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { value: 2500, label: "Dogs Rehomed" },
                { value: 1800, label: "Cats Adopted" },
                { value: 300, label: "Special Needs Pets Placed" },
                { value: 500, label: "Senior Pets Adopted" },
                { value: 92 , label: "Adopter Satisfaction", percentage: true },
                { value: 100 , label: "Volunteers" }
              ].map((stat, index) => (
                <div key={index} className="bg-white dark:bg-gray-700 p-4 rounded-lg border-2 border-gray-200">
                  <Typography variant="h4" className="mb-1 text-primary" placeholder="">
                    <CountUp end={stat.value} enableScrollSpy={true}/>
                    {stat.percentage ?'%' :'+'}
                  </Typography>
                  <Typography variant="small" className="text-gray-600 dark:text-gray-300" placeholder="">
                    {stat.label}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}