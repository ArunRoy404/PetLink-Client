import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Button, Typography, Tooltip } from '@material-tailwind/react';
import { Home, Mail, ArrowLeft } from 'lucide-react';
import Lottie from 'lottie-react';
import catHangingAnimation from '../../assets/ErrorCat.json'; // Adjust path to your Lottie file
import { motion } from 'framer-motion';

const ErrorPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Page Not Found | PetLink";
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background dark:bg-surface  p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl w-full text-center"
      >
        {/* Lottie Animation Container */}
        <div className="relative h-64 md:h-80 mx-auto mb-2">
          <Lottie 
            animationData={catHangingAnimation} 
            loop={true} 
            className="h-full w-full"
          />
        </div>

        {/* Error Content */}
        <div className=" p-6 md:p-8 ">
          <Typography variant="h3" className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white mb-3">
            Whoops! Cat-astrophe!
          </Typography>
          
          <Typography variant="paragraph" className="text-gray-600 dark:text-white mb-6 max-w-lg mx-auto">
            Looks like our curious cat knocked this page off the shelf. 
            Don't worry - we'll help you land on your feet.
          </Typography>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Button
              variant='outlined'
                size="lg"
                className="flex items-center justify-center gap-2 w-full sm:w-auto text-primary border-primary"
                onClick={() => navigate('/')}
              >
                <Home className="w-5 h-5" />
                Back to Home
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;