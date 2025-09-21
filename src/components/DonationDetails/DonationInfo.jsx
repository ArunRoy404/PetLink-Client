import {
    Card,
    Typography,
} from '@material-tailwind/react';

import RichTextEditor from '../../components/ui/RichTextEditor/RichTextEditor';


const DonationInfo = ({campaignData}) => {
    return (
        <div className='dark:bg-gradient-to-t dark:from-[#342e4e] dark:to-[#121212]'>
            {/* Long Description Section */}
            <div className="">
                <Card className="p-8 shadow-none border-2 border-gray-300">
                    <Typography variant="h3" className="font-bold text-2xl mb-6 text-gray-900 border-b pb-2">
                        About This Campaign
                    </Typography>
                    <div className="max-h-60 overflow-y-auto pr-3 custom-scrollbar">
                        <RichTextEditor content={campaignData.longDescription} viewOnly={true} />
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default DonationInfo;