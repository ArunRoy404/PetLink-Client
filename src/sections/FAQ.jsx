import { Accordion, AccordionHeader, AccordionBody, Typography } from "@material-tailwind/react";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { faqs } from "../DummyData/FAQ";
import AccordionCard from "../components/ui/Cards/AccordionCard";


export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState(0);

    const handleOpen = (value) => {
        setOpenIndex(openIndex === value ? 0 : value);
    };

    return (
        <section className="dark:bg-gradient-to-b dark:from-[#121212] dark:to-[#1F1A33] py-16 md:py-20 bg-background dark:bg-gray-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">

                {/* section head  */}
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <Typography variant="h3" color="blue-gray" className="dark:text-white">
                        Frequently Asked Questions
                    </Typography>
                    <Typography variant="lead" className="mt-2 text-gray-600 dark:text-gray-300">
                        Everything you need to know before adopting through PetLink.
                    </Typography>
                </div>

                <div className=" space-y-4">
                    {faqs.map((item, index) => <AccordionCard
                        item={item}
                        index={index}
                        handleOpen={handleOpen}
                        openIndex={openIndex}
                        key={index}
                    />)}
                </div>
            </div>
        </section>
    );
}
