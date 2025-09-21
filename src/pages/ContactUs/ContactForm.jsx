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
    Send
} from 'lucide-react';

const ContactForm = () => {
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
    );
};

export default ContactForm;