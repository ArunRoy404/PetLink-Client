import { categories } from "../DummyData/PetCategories";
import CategoryCard from "../components/ui/Category/CategoryCard";

const PetsCategory = () => {
  return (
    <section className="py-16 md:py-20 bg-white dark:bg-[#121212]  text-black dark:text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8  ">

        {/* section title  */}
        <h2 className="text-3xl font-bold text-center mb-10">
          Browse by Pet Category
        </h2>

        <div className="grid gap-2 md:gap-5 xl:gap-20 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {categories.map((category) => <CategoryCard category={category} />)}
        </div>
      </div>
    </section>
  );
};

export default PetsCategory;
