import CardSkeleton from './CardSkeleton';

const SkeletonContainer = ({number}) => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[...Array(number)].map((_, i) => <CardSkeleton key={i} />)}
        </div>
    );
};

export default SkeletonContainer;