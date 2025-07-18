import Banner from "./Banner";
import ThemeToggle from "../../components/ui/ThemeToggle";
import PetsCategory from "./PetsCategory";
import CallToAction from "./CallToAction";
import AboutUs from "./AboutUs";
import Impacts from "./Impacts";

const Home = () => {
    return (
        <>
            <Banner />
            <PetsCategory/>
            <CallToAction/>
            <AboutUs/>
            <Impacts/>
        </>
    );
};

export default Home;