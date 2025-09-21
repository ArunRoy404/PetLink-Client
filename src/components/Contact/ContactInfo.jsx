
import {
    Card,
    Typography,
} from '@material-tailwind/react';
import {
    MapPin,
    Phone,
    Mail,
    Clock,
} from 'lucide-react';

const ContactInfo = () => {
    return (
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
    );
};

export default ContactInfo;