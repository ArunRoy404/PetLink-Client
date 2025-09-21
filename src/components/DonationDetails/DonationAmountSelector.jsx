import { Button, Typography } from "@material-tailwind/react";
import { formatCurrency } from "../../utilities/formatCurrency";

const DonationAmountSelector = ({ donationAmount, setDonationAmount }) => {

    return (
        <div className="mb-8">
            <Typography variant="h6" className="font-bold mb-3 text-gray-800 dark:text-white">
                Select Donation Amount
            </Typography>
            <div className="grid grid-cols-4 gap-2 mb-4">
                {[25, 50, 100, 250].map((amount) => (
                    <Button
                        key={amount}
                        variant={donationAmount === amount ? 'filled' : 'outlined'}
                        color={donationAmount === amount ? 'orange' : 'gray'}
                        className="py-2 dark:text-white dark:border-white"
                        onClick={() => setDonationAmount(amount)}
                    >
                        {formatCurrency(amount)}
                    </Button>
                ))}
            </div>
            <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input
                    type="number"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full pl-8 p-2 border rounded-lg"
                    min="1"
                />
            </div>
        </div>

    );
};

export default DonationAmountSelector;