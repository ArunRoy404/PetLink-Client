import { Card, Typography } from "@material-tailwind/react";

const AboutCard = ({item}) => {
    const title = item.title
    const description = item.desc
    const Icon = item.icon
    return (
        <Card className={`sticky top-56 p-6 shadow-none dark:border-gray-800 border-2 hover:shadow-xl dark:bg-[#121212] transition-shadow`} placeholder="">
            <Icon className="w-10 h-10 mb-4 text-primary" />
            <Typography variant="h5" color="blue-gray" className="dark:text-white mb-2" placeholder="">
                {title}
            </Typography>
            <Typography className="text-gray-600 dark:text-gray-300 text-sm md:text-md" placeholder="">
                {description}
            </Typography>
        </Card>
    )
};

export default AboutCard;