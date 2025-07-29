import { Accordion, AccordionHeader, AccordionBody, Typography } from "@material-tailwind/react";
import { ChevronDown } from "lucide-react";

import { useState } from "react";

const faqs = [
    {
        question: "What if I adopt a pet and it doesn't adjust to my home?",
        answer: "We understand that not every match is perfect. PetLink works with shelters that offer a trial adoption period or post-adoption support to help with the transition. If it truly doesn’t work out, we’ll assist in rehoming responsibly."
    },
    {
        question: "Can I meet the pet before finalizing the adoption?",
        answer: "Yes. Most listings on PetLink include an option to schedule a meet-and-greet, either virtually or in-person depending on the shelter or foster’s location and policy."
    },
    {
        question: "What’s the difference between adopting from a shelter vs. a foster home?",
        answer: "Shelters typically have more structured processes and facilities, while foster homes provide more insights into a pet’s behavior in a home setting. PetLink lets you choose based on what suits your lifestyle and comfort."
    },
    {
        question: "Are all pets vaccinated and spayed/neutered?",
        answer: "Yes, all pets listed on PetLink are required to be vaccinated and spayed/neutered unless there’s a medical reason. You’ll find this info transparently listed under each pet's profile."
    },
    {
        question: "I work full-time. Can I still adopt a pet?",
        answer: "Absolutely. We recommend adopting pets with energy levels and needs that align with your routine. Many adult pets do well in homes with working professionals. Our filters help you find pets suitable for your lifestyle."
    },
    {
        question: "How does PetLink ensure the listings are genuine?",
        answer: "Each shelter or foster partner goes through a verification process before being allowed to list pets. We also monitor activity for scams or suspicious behavior and take reports seriously."
    },
    {
        question: "Can I adopt a pet if I live in an apartment?",
        answer: "Yes! Many pets are apartment-friendly. You can use our filters to find low-energy, small-breed, or crate-trained pets. Ensure your building’s pet policy allows the type of pet you're interested in."
    },
    {
        question: "How are donations used by PetLink?",
        answer: "100% of public donations go towards pet care, rescue operations, medical treatment, and supplies. We provide transparency reports quarterly for major campaigns so donors can see real impact."
    }
];


export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState(0);

    const handleOpen = (value) => {
        setOpenIndex(openIndex === value ? 0 : value);
    };

    return (
        <section className="dark:bg-gradient-to-b dark:from-[#121212] dark:to-[#1F1A33] py-20 px-6 md:px-12 bg-background dark:bg-gray-900">
            <div className="max-w-4xl mx-auto text-center mb-12">
                <Typography variant="h3" color="blue-gray" className="dark:text-white">
                    Frequently Asked Questions
                </Typography>
                <Typography variant="lead" className="mt-2 text-gray-600 dark:text-gray-300">
                    Everything you need to know before adopting through PetLink.
                </Typography>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
                {faqs.map((item, index) => (
                    <Accordion key={index} open={openIndex === index + 1}>
                        <AccordionHeader
                            onClick={() => handleOpen(index + 1)}
                            className="text-left dark:text-white text-lg "
                        >
                            <span className="flex items-center justify-between w-full">
                                {item.question}
                                <ChevronDown className={` ${openIndex===index+1 ?'rotate-180' :''} transition-all duration-300`} />
                            </span>
                        </AccordionHeader>
                        <AccordionBody className="text-gray-600 dark:text-gray-300">
                            {item.answer}
                        </AccordionBody>
                    </Accordion>
                ))}
            </div>
        </section>
    );
}
