import { hexToRgb } from "@/lib/utils";
import { useProfile } from "@/zustand/useProfile";
import { useEffect, useState } from "react";

const Background = () => {
  const colorConfig = useProfile(
    (s) => s.content.interfaceContent?.color_config
  );

  const [backgroundStyle, setBackgroundStyle] = useState<React.CSSProperties | undefined>(undefined);

  useEffect(() => {
    if (!colorConfig || !colorConfig.type) {
      setBackgroundStyle(undefined);
      return;
    }
    if (colorConfig.type === "gradient") {
      setBackgroundStyle({
        // @ts-ignore: CSS custom properties allowed via style attribute
        ["--from-color"]: hexToRgb(colorConfig?.color?.from ?? "#000000", true),
        ["--to-color"]: hexToRgb(colorConfig?.color?.to ?? "#000000", true),
        ["--bg-rotation"]: colorConfig?.color?.rotation ?? "156deg",
      } as React.CSSProperties);
    } else if (colorConfig.type === "static") {
      setBackgroundStyle({
        // @ts-ignore: CSS custom properties allowed via style attribute
        ["--target-color"]: hexToRgb(colorConfig?.color?.target ?? "#000000", true),
      } as React.CSSProperties);
    } else {
      setBackgroundStyle(undefined);
    }
  }, [colorConfig]);

  return (
    <div className="w-full h-full fixed top-0 left-0 z-[-1]">
      <div className={`w-full h-full inset-0 relative transition-opacity duration-500 ease-out ${!colorConfig?.type ? "opacity-0" : "opacity-100"}`}>
        <div
            className={`profle-bg${colorConfig?.type ? ("-type-" + colorConfig?.type) : ""} w-full h-full absolute inset-0 z-1 brightness-85`}
            style={backgroundStyle}
        ></div>
      </div>
    </div>
  );
};

export default Background;
