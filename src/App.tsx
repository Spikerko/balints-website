import { Suspense, useEffect, useState } from "react";
import Page from "./Page"
import Background from "@/components/bg"
import { LoaderCircle } from "lucide-react";
import NotFound from "@/not-found";

function App() {
  const [pathname, setPathname] = useState("/");

  // Set the initial path and update it when navigation occurs
  useEffect(() => {
    // Set the initial pathname
    setPathname(window.location.pathname);

    // Update path if it changes (browser back/forward buttons)
    const handleLocationChange = () => {
      setPathname(window.location.pathname);
    };

    window.addEventListener("popstate", handleLocationChange);

    // Prevent right click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    window.addEventListener("contextmenu", handleContextMenu);

    // Clean up the event listeners
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  return (
    <>
      {pathname === "/" ? (
        <Suspense fallback={
          <div className="fixed inset-0 z-9999 flex items-center justify-center w-full h-full">
            <div className="w-12 h-12 flex items-center justify-center">
              <LoaderCircle className="circle-rotate w-full h-full" /> 
            </div>
          </div>
        }>
          <div
            className="overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-[var(--color-border)] scrollbar-thumb-rounded scrollbar-track-[transparent] max-h-screen"
            style={{
              scrollbarColor: "var(--color-border) transparent",
              scrollbarWidth: "thin",
            }}
          >
            <Page />
          </div>
        </Suspense>
      ) : <NotFound />} 
    </>
  )
}

export default App;
