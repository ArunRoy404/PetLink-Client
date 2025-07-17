import Banner from "./Banner";
import ThemeToggle from "../../components/ui/ThemeToggle";
import PetsCategory from "./PetsCategory";
import CallToAction from "./CallToAction";

const Home = () => {
    return (
        <>
            <Banner />
            <PetsCategory/>
            <CallToAction/>
        </>
    );
};

export default Home;