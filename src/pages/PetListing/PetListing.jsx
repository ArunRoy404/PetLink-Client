import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
    Typography,
} from '@material-tailwind/react';
import { Search } from 'lucide-react';
import Select from 'react-select';
import { useGetPetCategoriesApi, useGetPetsApi } from '../../axios/petsApi';
import './PetListing.css'
import CardSkeleton from '../../components/ui/CardSkeleton/CardSkeleton';
import NoDataFound from '../../components/ui/NoDataFound';
import PetCard from '../../components/ui/PetCard';
import { useInView } from "react-intersection-observer";
import Loader from '../../components/ui/Loader';



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
                        <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="Search by pet name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
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
            {isLoading && (
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {[...Array(6)].map((_, i) => <CardSkeleton key={i} />)}
                </div>
            )}

            {/* Pets Grid */}
            {!isLoading && (
                <div className="container mx-auto px-4 sm:px-6 lg:px-8  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {petsData?.length > 0 ? (
                        petsData.map((pet, index) => <PetCard key={index} pet={pet} />)
                    ) : (
                        <div className='col-span-full'>
                            <NoDataFound message={'Try adjusting the category and search text'} />
                        </div>
                    )}
                </div>
            )}

            <div ref={ref} className='container mx-auto px-4 sm:px-6 lg:px-8  py-10 w-full flex items-center justify-center'>
                {
                    petsData?.length !== 0 && inView && !searchTerm && !selectedCategory && !isLoading && (
                        <div className='flex flex-col items-center justify-center gap-4 font-bold '>
                            <Loader size={50} />
                            Loading...
                        </div>
                    )
                }
            </div>

        </div>
    );
};

export default PetListing;