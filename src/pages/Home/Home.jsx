import Banner from "../../sections/Banner";
import PetsCategory from "../../sections/PetsCategory";
import CallToAction from "../../sections/CallToAction";
import AboutUs from "../../sections/AboutUs";
import Impacts from "../../sections/Impacts";
import FAQ from "../../sections/FAQ";
import JoinMission from "../../sections/JoinMission";
import MeetTheHeroes from "../../sections/MeetTheHeros";


const Home = () => {
    return (
        <>
            <Banner />
            <PetsCategory/>
            <CallToAction/>
            <AboutUs/>
            <Impacts/>
            <MeetTheHeroes/>
            <FAQ/>
            <JoinMission/>
        </>
    );
};

export default Home;