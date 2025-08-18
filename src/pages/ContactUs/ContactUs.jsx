import { useState } from 'react';
import {
    Card,
    Typography,
    Input,
    Textarea,
    Button,
    Checkbox
} from '@material-tailwind/react';
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    Send
} from 'lucide-react';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [agreed, setAgreed] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            console.log('Form submitted:', formData);
            setIsSubmitting(false);
            setSubmitSuccess(true);
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
            setAgreed(false);

            // Hide success message after 5 seconds
            setTimeout(() => setSubmitSuccess(false), 5000);
        }, 1500);
    };

    return (
        <div className=" pb-12 pt-40 bg-gradient-to-b from-surface dark:bg-gradient-to-b  dark:from-[#342e4e] dark:to-[#121212] ">
            {/* Header */}
            <div className="text-center mb-16 container mx-auto px-4 sm:px-6 lg:px-8">
                <Typography variant="h2" className="font-bold text-gray-900 dark:text-gray-100 mb-3 ">
                    Get in Touch
                </Typography>
                <Typography variant="lead" className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Have questions about pet adoption or need support? Our team is here to help you
                    with all your pet-related needs.
                </Typography>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Information */}
                <Card className="shadow-none border bg-transparent border-gray-300 p-6 h-fit">
                    <Typography variant="h4" className="mb-6 text-gray-900 dark:text-gray-100">
                        Contact Information
                    </Typography>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="p-2  rounded-full">
                                <MapPin className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <Typography variant="h6" className="text-gray-900 dark:text-gray-100">
                                    Our Location
                                </Typography>
                                <Typography variant="paragraph" className="text-gray-600 dark:text-gray-400">
                                    123 Pet Street, Animal District<br />
                                    Dhaka 1212, Bangladesh
                                </Typography>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-2  rounded-full">
                                <Phone className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <Typography variant="h6" className="text-gray-900 dark:text-gray-100">
                                    Phone Number
                                </Typography>
                                <Typography variant="paragraph" className="text-gray-600 dark:text-gray-400">
                                    +880 1234 567890<br />
                                    Mon-Fri: 9am-6pm
                                </Typography>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-2 rounded-full">
                                <Mail className="w-5 h-5 text-amber-600" />
                            </div>
                            <div>
                                <Typography variant="h6" className="text-gray-900 dark:text-gray-100">
                                    Email Address
                                </Typography>
                                <Typography variant="paragraph" className="text-gray-600 dark:text-gray-400">
                                    hello@petlink.com<br />
                                    support@petlink.com
                                </Typography>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-2  rounded-full">
                                <Clock className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                                <Typography variant="h6" className="text-gray-900 dark:text-gray-100">
                                    Working Hours
                                </Typography>
                                <Typography variant="paragraph" className="text-gray-600 dark:text-gray-400">
                                    Monday - Friday: 9am - 6pm<br />
                                    Saturday: 10am - 4pm<br />
                                    Sunday: Closed
                                </Typography>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Contact Form */}
                <Card className="bg-transparent shadow-none border border-gray-300 p-6">
                    <Typography variant="h4" className="mb-6 text-gray-900 dark:text-gray-100">
                        Send Us a Message
                    </Typography>

                    {submitSuccess && (
                        <div className="bg-green-50 text-green-800 p-4 rounded-lg mb-6">
                            Thank you for your message! We'll get back to you soon.
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 gap-6">
                            <Input
                                label="Your Name"
                                name="name"
                                className='dark:text-white'
                                value={formData.name}
                                onChange={handleChange}
                                required
                                size="lg"
                            />

                            <Input
                                type="email"
                                label="Email Address"
                                name="email"
                                className='dark:text-white'
                                value={formData.email}
                                onChange={handleChange}
                                required
                                size="lg"
                            />

                            <Input
                                label="Subject"
                                name="subject"
                                className='dark:text-white'
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                size="lg"
                            />

                            <Textarea
                                className='dark:text-white'
                                label="Your Message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={6}
                            />

                            <Checkbox
                                label={
                                    <Typography
                                        variant="small"
                                        className="flex items-center font-normal text-gray-600 dark:text-gray-400"
                                    >
                                        I agree to the {' '}
                                        <a href="#" className="font-medium text-blue-600">
                                            Privacy Policy
                                        </a>
                                    </Typography>
                                }
                                checked={agreed}
                                onChange={() => setAgreed(!agreed)}
                                required
                            />

                            <div className="mt-4">
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="flex items-center gap-2 bg-primary"
                                    disabled={isSubmitting || !agreed}
                                >
                                    <Send className="w-4 h-4" />
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </Button>
                            </div>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default ContactUs;