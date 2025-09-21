import NoDataFound from "../ui/NoDataFound";
import PetCard from "./PetCard";

const PetListingContainer = ({petsData}) => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {petsData?.length > 0 ? (
                petsData.map((pet, index) => <PetCard key={index} pet={pet} />)
            ) : (
                <div className='col-span-full'>
                    <NoDataFound message={'Try adjusting the category and search text'} />
                </div>
            )}
        </div>
    );
};

export default PetListingContainer;