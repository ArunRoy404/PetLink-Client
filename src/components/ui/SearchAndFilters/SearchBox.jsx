import { Search } from "lucide-react";

const SearchBox = ({searchTerm, onChange}) => {
    return (
        <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Search by pet name..."
                value={searchTerm}
                onChange={onChange}
            />
        </div>
    );
};

export default SearchBox;