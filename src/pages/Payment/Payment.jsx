import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';


const stripePromise = loadStripe(import.meta.env.VITE_payment_key);


const Payment = ({ donationAmount, campaignData }) => {
    return (
        <div>
            <Elements stripe={stripePromise}>
                <PaymentForm donationAmount={donationAmount} campaignData={campaignData} />
            </Elements>
        </div>
    );
};

export default Payment;