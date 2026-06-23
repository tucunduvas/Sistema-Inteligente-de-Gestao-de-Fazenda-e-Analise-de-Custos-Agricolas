import { Navbar } from "../Components/componentsSobreNos/Navbar";
import { HeroHome } from "../Components/componentsHome/HeroHome";
import { RecursosHome } from "../Components/componentsHome/RecursosHome";
import { PassosHome } from "../Components/componentsHome/PassosHome";
import { CTAHome } from "../Components/componentsHome/CTAHome";
import { Footer } from "../Components/componentsSobreNos/Footer";

function Home() {
    return (
        <div className="bg-white">
            <Navbar />
            <HeroHome />
            <RecursosHome />
            <PassosHome />
            <CTAHome />
            <Footer />
        </div>
    );
}

export default Home;