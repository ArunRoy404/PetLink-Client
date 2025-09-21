import { Link } from "react-router";

const CategoryCard = ({category}) => {
    const name = category.name
    const Icon = category.icon
    return (
        <Link
            to={'/pet-listing'}
            key={name}
            className="w-full sm:w-auto px-4 py-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-0 flex flex-col items-center gap-3 text-center bg-white dark:bg-gray-900 hover:bg-primary/10"
        >
            <Icon size={32} className="text-primary" />
            <span className="text-sm font-medium">{name}</span>
        </Link>
    )
};

export default CategoryCard;