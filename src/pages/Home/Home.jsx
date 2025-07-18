import Banner from "./Banner";
import PetsCategory from "./PetsCategory";
import CallToAction from "./CallToAction";
import AboutUs from "./AboutUs";
import Impacts from "./Impacts";
import FAQ from "./FAQ";
import MeetTheHeroes from "./MeetTheHeros";
import JoinMission from "./JoinMission";


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