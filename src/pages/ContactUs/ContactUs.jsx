
import { Typography } from '@material-tailwind/react';
import ContactInfo from '../../components/Contact/ContactInfo';
import ContactForm from './ContactForm';

const ContactUs = () => {

    return (
        <div className=" pb-12 pt-40 bg-gradient-to-b from-surface dark:bg-gradient-to-b  dark:from-[#342e4e] dark:to-[#121212] ">
            {/* Page Header */}
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
                <ContactInfo />

                {/* Contact Form */}
                <ContactForm />
            </div>
        </div>
    );
};

export default ContactUs;