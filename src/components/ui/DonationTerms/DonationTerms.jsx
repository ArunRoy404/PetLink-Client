import { Card, Typography } from '@material-tailwind/react';
import { CheckCircle } from 'lucide-react';
import React from 'react';

const DonationTerms = () => {
    return (
        <Card className="shadow-none dark:bg-[#1F1A33] dark:border-2 dark:border-gray-700">
            <Typography variant="h3" className="font-bold dark:text-white text-2xl mb-6 text-gray-900 border-b pb-2">
                Donation Terms
            </Typography>
            <div className="space-y-4">
                {[
                    "All donations are tax-deductible to the extent allowed by law",
                    "90% of funds go directly to animal care",
                    "10% supports administrative costs",
                    "You'll receive a receipt via email",
                    "Monthly donation options available"
                ].map((term, index) => (
                    <div key={index} className="flex items-start gap-3">
                        <CheckCircle size={20} className="text-green-500 mt-1 flex-shrink-0" />
                        <Typography className="text-gray-700 dark:text-white/80">
                            {term}
                        </Typography>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default DonationTerms;