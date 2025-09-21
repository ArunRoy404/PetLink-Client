import { Accordion, AccordionHeader, AccordionBody, Typography } from "@material-tailwind/react";
import { ChevronDown } from "lucide-react";


const AccordionCard = ({openIndex, index, handleOpen, item}) => {
    return (
        <Accordion open={openIndex === index + 1}>
            <AccordionHeader
                onClick={() => handleOpen(index + 1)}
                className="text-left dark:text-white text-lg "
            >
                <span className="flex items-center justify-between w-full">
                    <div className="w-full">
                        {item.question}
                    </div>
                    <ChevronDown className={` ${openIndex === index + 1 ? 'rotate-180' : ''} transition-all duration-300`} />
                </span>
            </AccordionHeader>
            <AccordionBody className="text-gray-600 dark:text-gray-300">
                {item.answer}
            </AccordionBody>
        </Accordion>
    );
};

export default AccordionCard;