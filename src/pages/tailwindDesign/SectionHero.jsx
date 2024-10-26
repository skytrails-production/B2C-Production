import React from "react";
import imagePng from "../../images/tailwind/hero-right.png";
import HeroSearchForm from "../../components/TailwindSearchComp/heroSection/HeroSearchForm";
import MainNav from "./MainNav"

const SectionHero = ({ className }) => {
    return (
       <>
       <div className={`nc-SectionHero flex flex-col-reverse lg:flex-col relative ${className}`} >
            <div className="flex flex-col lg:flex-row lg:items-center">
                <div className="flex-shrink-0 lg:w-1/2 flex flex-col items-start space-y-8 sm:space-y-10 pb-14 lg:pb-[31rem] xl:pr-14 lg:mr-10 xl:mr-0">
                    <h2 className="font-sans font-medium text-4xl md:text-5xl xl:text-6xl !leading-[114%] ">
                        Hotel, Flight, Bus <br /> & Experiences
                    </h2>
                    {/* <span className="text-base md:text-lg text-neutral-500 dark:text-neutral-400">
                        Accompanying us, you have a trip full of experiences. With The Skytrails,
                        booking flight, resort villas, hotels
                    </span> */}
                </div>
                <div className="flex-grow">
                    <img className="w-full" src={imagePng} alt="hero" priority />
                </div>
            </div>

            <div className="hidden lg:block z-10 mb-12 lg:mb-0 lg:-mt-[24rem] w-full">
                <HeroSearchForm />
            </div>
        </div>
       </>
    );
};

export default SectionHero;
