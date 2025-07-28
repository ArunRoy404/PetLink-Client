import { Button, Card, CardBody, Typography, Chip, IconButton, Tooltip } from '@material-tailwind/react';
import { PawPrint, Heart, MapPin, CalendarDays, Share2, Eye, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useState } from 'react';

const PetCard = ({ pet }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Card 
      className="relative overflow-hidden transition-all shadow-none hover:shadow-md duration-300 border-2 border-gray-300 group hover:"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image with gradient overlay */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={pet.petImage}
          alt={pet.petName}
          className={`w-full h-full object-cover transition-all duration-700 ${isHovered ? 'scale-105' : 'scale-100'}`}
        />
        
        {/* Floating action buttons */}
        <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <Tooltip content="Add to favorites">
            <IconButton
              variant="gradient"
              color={isFavorite ? 'red' : 'white'}
              size="sm"
              className={`rounded-full cursor-pointer shadow-md ${isFavorite ? 'bg-red-500' : 'bg-white/90 hover:bg-white'}`}
              onClick={(e) => {
                e.stopPropagation();
                setIsFavorite(!isFavorite);
              }}
            >
              <Heart 
                size={18} 
                className={isFavorite ? 'text-white' : 'text-red-500'} 
                fill={isFavorite ? 'currentColor' : 'none'} 
              />
            </IconButton>
          </Tooltip>
          
          <Tooltip content="Quick view">
            <IconButton
              variant="gradient"
              color="white"
              size="sm"
              className="rounded-full shadow-md bg-white/90 hover:bg-white"
              onClick={(e) => {
                e.stopPropagation();
                // Add quick view functionality
              }}
            >
              <Eye size={18} className="text-gray-700" />
            </IconButton>
          </Tooltip>
        </div>

        {/* Category chip with shine effect */}
        <div className="absolute bottom-4 left-4 z-20">
          <Chip
            value={pet.petCategory}
            className={`rounded-full capitalize  text-xs px-3 py-1.5 backdrop-blur-sm bg-white/60 text-black font-bold transition-all ${isHovered ? 'shadow-lg' : 'shadow-md'}`}
          />
        </div>
      </div>

      {/* Card content */}
      <CardBody className="p-5 pt-3 ">
        {/* Pet name with subtle hover effect */}
        <Typography 
          variant="h5" 
          className="font-bold text-gray-900 mb-1.5 transition-colors hover:text-primary cursor-pointer"
          onClick={() => navigate(`/pets/${pet._id}`)}
        >
          {pet.petName}
        </Typography>
        
        {/* Pet details with animated icons */}
        <div className="flex flex-col gap-2 mb-6">
          <div className="flex items-center gap-2 text-gray-600">
            <CalendarDays 
              size={16} 
              className={`text-gray-400 transition-transform ${isHovered ? 'scale-110' : 'scale-100'}`} 
            />
            <Typography variant="small" className="text-sm">
              {pet.petAge} old 
            </Typography>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin 
              size={16} 
              className={`text-gray-400 transition-transform ${isHovered ? 'scale-110' : 'scale-100'}`} 
            />
            <Typography variant="small" className="text-sm">
              {pet.petLocation}
            </Typography>
          </div>
        </div>
        
        {/* Animated action button */}
        <Button
          size="md"
          fullWidth
          className={`bg-primary flex items-center justify-center gap-2 transition-all shadow-none hover:shadow-none `}
          onClick={() => navigate(`/pets/${pet._id}`)}
        >
          <PawPrint size={16} className="transition-transform group-hover:rotate-12" />
          <span>View Details</span>
          <ArrowRight
            size={16} 
            className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" 
          />
        </Button>
      </CardBody>
    </Card>
  );
};

export default PetCard;