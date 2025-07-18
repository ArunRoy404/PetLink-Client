import Banner from "./Banner";
import ThemeToggle from "../../components/ui/ThemeToggle";
import PetsCategory from "./PetsCategory";
import CallToAction from "./CallToAction";
import AboutUs from "./AboutUs";
import Impacts from "./Impacts";
import FAQ from "./FAQ";
import MeetTheHeroes from "./MeetTheHeros";

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
        </>
    );
};

export default Home;