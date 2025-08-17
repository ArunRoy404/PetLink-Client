import { Typography, Button } from "@material-tailwind/react";
import { PawPrint, Heart, HandHeart, Users, ShieldCheck } from "lucide-react";
import { Link } from "react-router";

export default function JoinMission() {
    return (
        <section className="relative py-16 md:py-20 dark:bg-[#1F1A33] dark:text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8  relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                    {/* Icon & Heading */}
                    <PawPrint className="w-12 h-12 mx-auto mb-6 text-primary" strokeWidth={1.5} />

                    <Typography
                        variant="h2"
                        className="text-3xl md:text-5xl dark:text-white font-bold mb-6"
                        placeholder=""
                    >
                        Be Part of Their <span className="text-primary">Happy Ending</span>
                    </Typography>

                    {/* Subtext */}
                    <Typography
                        variant="lead"
                        className="mb-10 text-lg md:text-xl opacity-90"
                        placeholder=""
                    >
                        Every action you take helps write a new story for animals in need.
                    </Typography>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link to='/pet-listing'>
                            <Button
                                size="lg"
                                className="flex items-center gap-2 px-8 group bg-primary"
                                placeholder=""
                            >
                                <Heart className="w-5 h-5 transition group-hover:scale-110" />
                                Adopt Now
                            </Button>
                        </Link>

                        <Link to='/campaigns'>
                            <Button
                                variant="gradient"
                                size="lg"
                                className="flex items-center gap-2 px-8 group bg-secondary"
                                placeholder=""
                            >
                                <HandHeart className="w-5 h-5 transition group-hover:scale-110" />
                                Donate
                            </Button>
                        </Link>

                        <Link to='/dashboard/add-pet'>
                            <Button
                                variant="outlined"
                                size="lg"
                                className="flex items-center gap-2 px-8 group hover:bg-white/10 dark:border-white dark:text-white"
                                placeholder=""
                            >
                                <Users className="w-5 h-5 transition group-hover:scale-110" />
                                Volunteer
                            </Button>
                        </Link>

                    </div>

                    {/* Trust Badges */}
                    <div className="mt-12 flex flex-wrap justify-center items-center gap-6">
                        {[
                            "24/7 Support",
                            "Verified Shelters",
                            "100% Transparent"
                        ].map((text, index) => (
                            <div key={index} className="flex items-center">
                                <ShieldCheck className="w-5 h-5 mr-2 text-primary" />
                                <Typography placeholder="">{text}</Typography>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}