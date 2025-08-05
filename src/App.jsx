import { useState, useRef } from "react";
import { LanguageProvider } from "./LanguageContext";
import IntroBlock from "./components/IntroBlock";
import TourDays1 from "./components/TourDays";
import AccommodationBlock from "./components/AccommodationBlock";
import PriceBlock from './components/PriceBlock';
import GlobalLoader from "./components/GlobalLoader";
import TourMap from "./components/TourMap";
import MentorsBlock from "./components/MentorsBlock";
import MobileNav from "./components/MobileNav";
import ScrollToTopButton from "./components/ScrollButton";


export default function App() {
    const [videoLoaded, setVideoLoaded] = useState(false);
    const tourDaysRef = useRef(null);
    const mentorsRef = useRef(null);
    const accommodationRef = useRef(null);
    const priceRef = useRef(null);
    const introRef = useRef(null);

    return (
        <LanguageProvider>
            <div className="bg-white text-gray-800">
                <IntroBlock setVideoLoaded={setVideoLoaded}/>
                <section ref={tourDaysRef}>
                 <TourDays1 
                    refs={{
                        program: tourDaysRef,
                        mentors: mentorsRef,
                        accommodation: accommodationRef,
                        price: priceRef,
                    }}  />
                </section>
                <TourMap />
                <section ref={mentorsRef}>
                    <MentorsBlock />
                </section>
                <section ref={accommodationRef}>
                    <AccommodationBlock />
                </section>
                <section ref={priceRef}>
                    <PriceBlock />
                </section>
                <ScrollToTopButton targetRef={introRef} />
                <MobileNav
                    refs={{
                        program: tourDaysRef,
                        mentors: mentorsRef,
                        accommodation: accommodationRef,
                        price: priceRef,
                     }} 
                />
                {!videoLoaded && <GlobalLoader />}
            </div>
        </LanguageProvider>
    );
}
