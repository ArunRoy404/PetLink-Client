import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
    Typography,
} from '@material-tailwind/react';
import Select from 'react-select';
import { useGetPetCategoriesApi, useGetPetsApi } from '../../axios/petsApi';
import './PetListing.css'
import CardSkeleton from '../../components/ui/Skeleton/CardSkeleton';
import { useInView } from "react-intersection-observer";
import Loader from '../../components/ui/Loader';
import SearchBox from '../../components/ui/SearchAndFilters/SearchBox';
import PetListingContainer from '../../components/PetListing/PetListingContainer';
import SkeletonContainer from '../../components/ui/Skeleton/SkeletonContainer';
import InfiniteLoader from '../../components/ui/InfiniteLoader';



const PetListing = () => {
    const [petsData, setPetsData] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);

    const { getPetsPromise } = useGetPetsApi();
    const { getPetCategoriesPromise } = useGetPetCategoriesApi();
    const { ref, inView } = useInView({ threshold: 1 })


    // Fetch pets data
    const { data, isLoading } = useQuery({
        queryKey: ['pets', searchTerm, selectedCategory?.value],
        queryFn: () => getPetsPromise(0, 100, searchTerm, selectedCategory?.value, false).then(res => res.data)
    });


    // Fetch categories
    const { data: categories } = useQuery({
        queryKey: ['pet-categories'],
        queryFn: getPetCategoriesPromise,
        select: (data) => [
            { value: '', label: 'All Categories' },
            ...data.data.map(category => ({ value: category, label: category }))
        ]
    });

    useEffect(() => {
        if (searchTerm || selectedCategory) {
            setPetsData(data)
        }
        else if (inView || data) {
            setPetsData(prevData => [...prevData, ...data])
        }
    }, [inView, searchTerm, selectedCategory, data])






    return (
        <div className="  pb-8 dark:bg-gradient-to-t  dark:from-[#342e4e] dark:to-[#121212] ">
            <div className=' pt-40 bg-gradient-to-b from-surface '>
                <div className='container mx-auto px-4 sm:px-6 lg:px-8 '>
                    {/* Page Header */}
                    <div className="  text-center mb-10">
                        <Typography variant="h2" className="font-bold dark:text-white text-gray-900 mb-2">
                            Find Your Perfect Pet Companion
                        </Typography>
                        <Typography variant="lead" className="text-gray-600">
                            Browse through our adorable pets looking for a loving home
                        </Typography>
                    </div>

                    {/* Search and Filter Section */}
                    <div className="flex flex-col md:flex-row gap-4 mb-8">
                        <SearchBox
                            searchTerm={searchTerm} onChange={(e) =>
                                setSearchTerm(e.target.value)}
                        />

                        {/* filter box */}
                        <div className="w-full md:w-64">
                            <Select
                                options={categories}
                                value={selectedCategory}
                                onChange={setSelectedCategory}
                                placeholder="Select category..."
                                className="react-select-container"
                                classNamePrefix="react-select"
                                isClearable
                            />
                        </div>
                    </div>
                </div>
            </div>


            {/* Loading State */}
            {isLoading && <SkeletonContainer number={6} />}


            {/* Pets Grid */}
            {!isLoading && <PetListingContainer petsData={petsData} />}


            {/* page end monitor for infinite data load   */}
            <InfiniteLoader
                ref={ref}
                condition={petsData?.length !== 0 && inView && !searchTerm && !selectedCategory && !isLoading}
            />
        </div>
    );
};

export default PetListing;