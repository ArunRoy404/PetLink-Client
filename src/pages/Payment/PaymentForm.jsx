import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useParams } from 'react-router';
// import { useGetCampaignInfoApi } from '../../axios/donationApi';
// import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../axios/useAxiosSecure';
import { Button } from '@material-tailwind/react';
import Loader from '../../components/ui/Loader';

const PaymentForm = ({ donationAmount }) => {
    const [paymentProcessing, setPaymentProcessing] = useState(false)
    const stripe = useStripe()
    const elements = useElements()
    const [error, setError] = useState('')
    const { id: campaignId } = useParams()
    // const { getCampaignInfoPromise } = useGetCampaignInfoApi()
    const axiosSecure = useAxiosSecure()


    // const { data: campaignData, isLoading } = useQuery({
    //     queryKey: ['campaign', campaignId],
    //     queryFn: () => getCampaignInfoPromise(campaignId).then(res => res.data),
    // });


    // if (isLoading) {
    //     return <div>loading...</div>
    // }



    const handleForm = async (e) => {
        e.preventDefault()
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

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })


        if (error) {
            setError(error)
        } else {
            setError('')
            console.log(paymentMethod);
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
                console.log("successful");
            }
        }

        console.log('response', result);


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
                    error && <p className='text-red-400'>{error.message}</p>
                }
            </form>
        </div>
    );
};

export default PaymentForm;