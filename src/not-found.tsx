import FuzzyText from "@/components/reactbits/TextAnimations/FuzzyText/FuzzyText";
import Ballpit from "./components/Ballpit";

const NotFound = () => {
    return (
        <div className="relative h-full w-full">
            <div className="w-full h-full fixed inset-0 z-[-1] opacity-[0.7] pointer-events-none">
                <Ballpit
                    count={130}
                    gravity={0}
                    friction={0.9975}
                    wallBounce={0.95}
                    followCursor={true}
                    
                    colors={[0xffffff, 0x000000]}
                />
            </div>
            <div className="flex flex-col items-center justify-center w-full h-full fixed inset-0 z-[9999]">
                <div>
                    <FuzzyText 
                        baseIntensity={0.2} 
                        hoverIntensity={0.5} 
                        enableHover={true}
                    >
                        404
                    </FuzzyText>
                </div>
                <div className="scale-50 mt-[-0.5rem]">
                    <FuzzyText 
                        baseIntensity={0.2} 
                        hoverIntensity={0.5} 
                        enableHover={true}
                    >
                        not found
                    </FuzzyText>
                </div>
            </div>
        </div>
    );
}

export default NotFound;