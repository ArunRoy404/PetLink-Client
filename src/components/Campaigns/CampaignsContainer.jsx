import DonationCard from '../ui/DonationCard.jsx/DonationCard';
import NoDataFound from '../ui/NoDataFound';

const CampaignsContainer = ({ campaignsData }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {campaignsData?.length > 0 ? (
                campaignsData.map((campaignData, index) => <DonationCard key={index} campaignData={campaignData} />)
            ) : (
                <div className='col-span-full'>
                    <NoDataFound message={'Try adjusting the category and search text'} />
                </div>
            )}
        </div>
    );
};

export default CampaignsContainer;