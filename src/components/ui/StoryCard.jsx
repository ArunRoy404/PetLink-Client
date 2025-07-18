import { Typography, Button, Chip } from "@material-tailwind/react";
import { ArrowRight } from "lucide-react";

const StoryCard = ({ hero }) => {
    return (
        <div className="bg-white group dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
            {/* Image with badge */}
            <div className="relative overflow-hidden">
                <img
                    src={hero.image}
                    alt={hero.name}
                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <Chip
                    value={hero.badge || "Adopter"}
                    size="sm"
                    color="purple"
                    className="absolute top-3 left-3 text-white bg-primary text-xs px-3 py-1 rounded-full shadow-md"
                />
            </div>

            {/* Card Content */}
            <div className="p-5 flex flex-col justify-between flex-grow">
                <div>
                    <Typography
                        variant="h5"
                        className="text-primary font-semibold mb-1"
                    >
                        {hero.name}
                    </Typography>
                    <Typography
                        variant="small"
                        className="text-xs text-gray-500 dark:text-gray-400 italic mb-3"
                    >
                        {hero.details || "PetLink Contributor"}
                    </Typography>

                    <Typography className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                        {hero.story.slice(0, 90)}...
                    </Typography>
                </div>

                {/* Bottom: Details Left + Button Right */}
                <div className="flex items-center justify-center mt-auto pt-2 border-t border-gray-200 dark:border-gray-600">
                    <Button
                        size="sm"
                        variant="text"
                        className="text-blue-500 flex items-center gap-1 mt-2 "
                    >
                        Read More
                        <ArrowRight/>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default StoryCard;
