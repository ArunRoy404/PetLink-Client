import { Card, CardHeader, CardBody, Typography, Button } from '@material-tailwind/react';
import { PawPrint, ImageIcon, CatIcon, Calendar, MapPin } from 'lucide-react';

const PetFormSkeleton = () => {
  return (
    <Card className="shadow-none animate-pulse">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <Typography as="div" variant="h1" className="h-6 w-48 rounded-full bg-gray-300 flex items-center gap-2">
          <PawPrint className="h-6 w-6 text-gray-300" />
          &nbsp;
        </Typography>
      </CardHeader>
      
      <CardBody>
        <div className="space-y-6">
          {/* Image Upload and Basic Info Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Image Upload Skeleton */}
            <div className="lg:col-span-1 space-y-2">
              <Typography as="div" variant="h3" className="h-5 w-32 rounded-full bg-gray-300 flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-gray-300" />
                &nbsp;
              </Typography>
              
              <div className="min-h-40 md:min-h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl bg-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-16 w-16 text-gray-400"  // Adjusted size
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
              </div>
            </div>
            
            {/* Basic Info Fields Skeleton */}
            <div className="lg:col-span-2 space-y-6">
              {/* Pet Name */}
              <div className="space-y-2">
                <Typography as="div" variant="h3" className="h-5 w-24 rounded-full bg-gray-300 flex items-center gap-2">
                  <CatIcon className="h-5 w-5 text-gray-300" />
                  &nbsp;
                </Typography>
                <Typography as="div" variant="h1" className="h-12 w-full rounded-lg bg-gray-300"></Typography>
              </div>
              
              {/* Age + Category Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Age */}
                <div className="space-y-2">
                  <Typography as="div" variant="h3" className="h-5 w-16 rounded-full bg-gray-300 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-gray-300" />
                    &nbsp;
                  </Typography>
                  <Typography as="div" variant="h1" className="h-12 w-full rounded-lg bg-gray-300"></Typography>
                </div>
                
                {/* Category */}
                <div className="space-y-2">
                  <Typography as="div" variant="h3" className="h-5 w-24 rounded-full bg-gray-300 flex items-center gap-2">
                    <PawPrint className="h-5 w-5 text-gray-300" />
                    &nbsp;
                  </Typography>
                  <Typography as="div" variant="h1" className="h-12 w-full rounded-lg bg-gray-300"></Typography>
                </div>
              </div>
              
              {/* Location */}
              <div className="space-y-2">
                <Typography as="div" variant="h3" className="h-5 w-20 rounded-full bg-gray-300 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-gray-300" />
                  &nbsp;
                </Typography>
                <Typography as="div" variant="h1" className="h-12 w-full rounded-lg bg-gray-300"></Typography>
              </div>
            </div>
          </div>
          
          {/* Short Description Skeleton */}
          <div className="space-y-2">
            <Typography as="div" variant="h3" className="h-5 w-40 rounded-full bg-gray-300 flex items-center gap-2">
              <PawPrint className="h-5 w-5 text-gray-300" />
              &nbsp;
            </Typography>
            <Typography as="div" variant="h1" className="h-12 w-full rounded-lg bg-gray-300"></Typography>
          </div>
          
          {/* Long Description Skeleton */}
          <div className="space-y-2">
            <Typography as="div" variant="h3" className="h-5 w-36 rounded-full bg-gray-300 flex items-center gap-2">
              <PawPrint className="h-5 w-5 text-gray-300" />
              &nbsp;
            </Typography>
            <Typography as="div" variant="h1" className="h-32 w-full rounded-lg bg-gray-300"></Typography>
          </div>
          
          {/* Form Actions Skeleton */}
          <div className="flex justify-end gap-4 pt-6">
            <Typography as="div" variant="h1" className="h-10 w-24 rounded-full bg-gray-300"></Typography>
            <Typography as="div" variant="h1" className="h-10 w-32 rounded-full bg-gray-300"></Typography>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default PetFormSkeleton;