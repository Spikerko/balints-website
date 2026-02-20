import ProfileTop from "./components/ProfileTop";
import { Suspense } from "react";
import { ArrowUpLeft, ArrowUpRight, LoaderCircle } from "lucide-react";
import LinkListComponent from "./components/custom/LinkListComponent";
import Particles from "./components/Particles";
import Cursor from "./components/cursor";
import CursorToggle from "./components/CursorToggle";
import BackgroundsToggle from "./components/BackgroundsToggle";
import { usePersistentState } from "./components/custom/usePersistentState";
/* import LightRays from "./components/LightRays"; */

function Page() {
  const [cursorEnabled, setCursorEnabled] = usePersistentState(
    "custom-cursor-enabled",
    true
  );
  const [backgroundsEnabled, setBackgroundsEnabled] = usePersistentState(
    "custom-backgrounds-enabled",
    true
  );

  // avoid rendering before localStorage hydration
  if (cursorEnabled === null || backgroundsEnabled === null) return null;

  return (
    <div className="relative h-full w-full">
      <div className="root_cursorContainer">{cursorEnabled ? <Cursor /> : null}</div>

      {backgroundsEnabled && (
        <div>
          {/* <div className="w-full h-full absolute inset-0 z-[-1] opacity-[0.95] pointer-events-none">
            <LightRays
              raysOrigin="top-center"
              raysColor="#ffffff"
              raysSpeed={0.5}
              lightSpread={1}
              rayLength={1.5}
              fadeDistance={1}
              followMouse={true}
              mouseInfluence={0.1}
              noiseAmount={0.21}
              distortion={0.05}
            />
          </div> */}
          <div className="w-full h-full absolute inset-0 z-[2] opacity-[0.45] pointer-events-none">
            <Particles
              particleColors={["#ffffff", "#ffffff"]}
              particleCount={500}
              particleSpread={10}
              speed={0.15}
              particleBaseSize={100}
              moveParticlesOnHover={false}
              alphaParticles={false}
              disableRotation={false}
            />
          </div>
        </div>
      )}

      <div className="flex items-start justify-center min-h-screen w-full px-4 py-12 sm:py-8 relative z-[1]">
        <div className="flex flex-col items-center justify-center gap-3 md:gap-3 w-2xl p-4">
          <ProfileTop />

          <div className="flex flex-col gap-3 w-full relative">
            <div className="flex flex-col gap-3.5 relative">
              <Suspense
                fallback={
                  <div className="absolute inset-0 z-[9999] flex items-center justify-center w-full h-full">
                    <div className="w-12 h-12 flex items-center justify-center">
                      <LoaderCircle className="circle-rotate w-full h-full" />
                    </div>
                  </div>
                }
              >
                <LinkListComponent />
                <div className="w-full flex items-center justify-center mt-2">
                  <a
                    href="https://example.com/yourname"
                    target="_blank"
                    onClick={
                      (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                        if (window.umami) {
                          const url = (event.currentTarget as HTMLAnchorElement).href;
                          window.umami.track("view-more-yoursitee-open", {
                              url: (url ?? "unknown")
                          });
                        }
                      }
                    }
                  >
                    <span className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md cursor-target flex flex-row gap-1.5 items-center shadow-xs hover:bg-secondary/80 h-10 font-semibold cursor-pointer">
                      View more links on my Yoursit.ee <ArrowUpRight size={22} />
                    </span>
                  </a>
                  
                </div>
              </Suspense>
            </div>
          </div>

          <div className="mt-4 mb-[-1rem] flex flex-col gap-3 w-full text-gray-400 text-center items-center">
            <CursorToggle value={cursorEnabled} onChange={setCursorEnabled} />
            <BackgroundsToggle
              value={backgroundsEnabled}
              onChange={setBackgroundsEnabled}
            />
            <p>
              ©{new Date(Date.now()).getFullYear() ?? "2025"} YourName. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
