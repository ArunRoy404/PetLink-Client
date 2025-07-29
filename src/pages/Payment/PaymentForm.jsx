import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../axios/useAxiosSecure';
import { Button } from '@material-tailwind/react';
import Loader from '../../components/ui/Loader';
import { useAuthContext } from '../../context/AuthContext';
import { useCreateDonationApi } from '../../axios/donationApi';

const PaymentForm = ({ donationAmount, campaignData }) => {
    const [paymentProcessing, setPaymentProcessing] = useState(false)
    const stripe = useStripe()
    const elements = useElements()
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const { id: campaignId } = useParams()
    const axiosSecure = useAxiosSecure()
    const { firebaseUser } = useAuthContext()
    const { getCreateDonationPromise } = useCreateDonationApi()


    const handleSaveData = (paymentIntent) => {
        const data = {
            campaignId: campaignData._id,
            petName: campaignData.petName,
            petImage: campaignData.petImage,


            donorEmail: firebaseUser.email,
            donorName: firebaseUser.displayName,

            amount: donationAmount,
            currency: "usd",
            paymentIntentId: paymentIntent.client_secret,


            // Audit
            createdAt: new Date().toISOString()
        }

        setPaymentProcessing(true)

        getCreateDonationPromise(data)
            .then(res => {
                console.log(res);
                if (res.data.insertedId) {
                    setSuccess("Payment successful")
                }
                else {
                    setError({ message: 'Something went wrong' })
                }
            })
            .catch(error => setError(error))
            .finally(() => setPaymentProcessing(false))
    }



    const handleForm = async (e) => {
        e.preventDefault()
        setError(null)
        setSuccess(null)
        setPaymentProcessing(true)


        if (!stripe || !elements) {
            setPaymentProcessing(false)
            return
        }

        const card = elements.getElement(CardElement)

        if (!card) {
            setPaymentProcessing(false)
            return
        }

        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })


        if (error) {
            setError(error)
        } else {
            setError('')
        }

        setPaymentProcessing(true)
        // create payment intent
        const res = await axiosSecure.post('/create-payment-intent', {
            amountInCents: donationAmount * 100,
            campaignId
        }).finally(() => setPaymentProcessing(false))

        const clientSecret = res.data.clientSecret

        setPaymentProcessing(true)
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: 'Arun Roy'
                }
            }
        }).finally(() => setPaymentProcessing(false))

        if (result.error) {
            console.log(result.error.message)
        } else {
            if (result.paymentIntent.status === 'succeeded') {
                handleSaveData(result.paymentIntent)
            }
        }


    }
    return (
        <div className='z-10' >
            <form onSubmit={handleForm} className="mx-auto space-y-6">
                <div className="p-4 border rounded-md shadow-sm">
                    <CardElement options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#32325d',
                                '::placeholder': { color: '#a0aec0' },
                            },
                            invalid: {
                                color: '#e53e3e',
                            },
                        },
                    }} />
                </div>

                <Button
                    type="submit"
                    disabled={!stripe || !elements || paymentProcessing}
                    className="w-full bg-primary text-md text-white py-2 rounded-md  disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {
                        paymentProcessing
                            ? <Loader color='white' size={26} />
                            : `Pay $${donationAmount}`
                    }

                </Button>
                {
                    error && <p className='text-red-400 text-sm font-bold '>{error.message}</p>
                }
                {
                    success && <p className='text-green-400 text-sm font-bold '>{success}</p>
                }
            </form>
        </div>
    );
};

export default PaymentForm;