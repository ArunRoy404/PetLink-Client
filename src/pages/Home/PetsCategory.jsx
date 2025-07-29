import { Link } from "react-router";
import {
  Cat,
  Dog,
  Rabbit,
  Fish,
  Bird,
  PawPrint,
} from "lucide-react";

const categories = [
  { name: "Cats", icon: < Cat size={32} className="text-primary" />, path: "/pets/cats" },
  { name: "Dogs", icon: <Dog size={32} className="text-primary" />, path: "/pets/dogs" },
  { name: "Rabbits", icon: <Rabbit size={32} className="text-primary" />, path: "/pets/rabbits" },
  { name: "Fish", icon: <Fish size={32} className="text-primary" />, path: "/pets/fish" },
  { name: "Birds", icon: <Bird size={32} className="text-primary" />, path: "/pets/birds" },
  { name: "Others", icon: <PawPrint size={32} className="text-primary" />, path: "/pets/others" },
];

const PetsCategory = () => {
  return (
    <section className="md:py-16 bg-white dark:bg-[#121212]  text-black dark:text-white">
      <div className="container mx-auto px-5 ">
        <h2 className="text-3xl font-bold text-center mb-10">
          Browse by Pet Category
        </h2>

        <div className="grid gap-2 md:gap-5 xl:gap-20 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {categories.map(({ name, icon, path }) => (
            <Link
              to={path}
              key={name}
              className="w-full sm:w-auto px-4 py-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-0 flex flex-col items-center gap-3 text-center bg-white dark:bg-gray-900 hover:bg-primary/10"
            >
              {icon}
              <span className="text-sm font-medium">{name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PetsCategory;
