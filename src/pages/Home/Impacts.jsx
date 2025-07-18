import { Typography } from '@material-tailwind/react';
import { Users } from 'lucide-react';
import React from 'react';
import CountUp from 'react-countup';

const Impacts = () => {
    return (
        <section>
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
                            { value: 92, label: "Adopter Satisfaction", percentage: true },
                            { value: 100, label: "Volunteers" }
                        ].map((stat, index) => (
                            <div key={index} className="bg-white dark:bg-gray-700 p-4 rounded-lg border-2 border-gray-200">
                                <Typography variant="h4" className="mb-1 text-primary" placeholder="">
                                    <CountUp end={stat.value} enableScrollSpy={true} />
                                    {stat.percentage ? '%' : '+'}
                                </Typography>
                                <Typography variant="small" className="text-gray-600 dark:text-gray-300" placeholder="">
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

