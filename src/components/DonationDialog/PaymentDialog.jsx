import {
  Dialog, DialogHeader, DialogBody, DialogFooter,
  Button, Input, Typography, Card
} from '@material-tailwind/react';
import { CreditCard, BadgeDollarSign } from 'lucide-react';
import Payment from '../../pages/Payment/Payment';

const PaymentDialog = ({ open, onClose, campaignData, donationAmount }) => {

  return (
    <Dialog open={open} handler={onClose} size="md" className="rounded-xl">
      <DialogHeader className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <img
            src={campaignData.petImage}
            alt={campaignData.petName}
            className="w-12 h-12 object-cover rounded-full shadow-md"
          />
          <div>
            <Typography variant="h6" color="blue-gray">
              Donate to <span className="font-semibold text-deep-purple-600">{campaignData.petName}</span>
            </Typography>
            <Typography variant="small" className="text-gray-500">
              Campaign ID: {campaignData._id.slice(-6).toUpperCase()}
            </Typography>
          </div>
        </div>
        <Button variant="text" onClick={onClose} className="text-gray-600">✕</Button>
      </DialogHeader>

      <DialogBody className="space-y-6">
        {/* Donation Summary */}
        <Card className="bg-gray-50 border p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <Typography variant="small" className="text-gray-700">Donation Amount</Typography>
              <Typography variant="h5" className="text-green-600 font-semibold">${donationAmount}</Typography>
            </div>
            <BadgeDollarSign className="text-green-600 w-8 h-8" />
          </div>
        </Card>

        {/* Card Info Form */}
        <Payment donationAmount={donationAmount}/>
      </DialogBody>

      <DialogFooter>
      </DialogFooter>
    </Dialog>
  );
};

export default PaymentDialog;
