import { Loader } from "lucide-react";

const InfiniteLoader = ({ ref, condition }) => {
    return (
        <div ref={ref} className='py-10 w-full flex items-center justify-center'>
            {
                condition && (
                    <div className='flex flex-col items-center justify-center gap-4 font-bold '>
                        <Loader size={50} />
                        Loading...
                    </div>
                )
            }
        </div>
    );
};

export default InfiniteLoader;