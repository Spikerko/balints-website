import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import React, { useState } from "react";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  quality?: number;
  width?: number;
  skipWidthToElement?: boolean;
  format?: "jpeg" | "png" | "webp" | "avif" | "gif";
  useLQIP?: boolean;
  useLoader?: boolean;
  useBetterPic?: boolean;
  LQIPClassName?: string;
  LQIPStyle?: React.CSSProperties;
  loaderClassName?: string;
  loaderStyle?: React.CSSProperties;
  imageClassName?: string;
  imageStyle?: React.CSSProperties;
  onImageLoadStart?: () => void;
  onImageLoad?: () => void;
  onLQIPImageLoadStart?: () => void;
  onLQIPImageLoad?: () => void;
}

const Image: React.FC<ImageProps> = ({
  src,
  quality = 80,
  width,
  format = "webp",
  skipWidthToElement = false,
  className = "",
  style = {},
  useLQIP = false,
  useLoader = true,
  useBetterPic = true,
  LQIPClassName = "",
  LQIPStyle = {},
  loaderClassName = "",
  loaderStyle = {},
  imageClassName = "",
  imageStyle = {},
  onImageLoadStart,
  onImageLoad,
  onLQIPImageLoadStart,
  onLQIPImageLoad,
  ...props
}) => {
  const [mainImageLoaded, setMainImageLoaded] = useState(false);
  const [isLQIPLoaded, setLQIPLoaded] = useState(false);

  const isLocalhost = (): boolean => {
    if (typeof window === "undefined") return false;

    const host = window.location.hostname;
    return (
      host === "localhost" ||
      host === "127.0.0.1" ||
      host === "[::1]" ||
      host.startsWith("192.168.") ||
      host.startsWith("10.") ||
      host.endsWith(".local")
    );
  };

  const transformUrl = (
    url: string,
    overrideQuality?: number,
    overrideWidth?: number,
    overrideFormat?: string
  ): string => {
    let finalUrl = url;
  
    // Convert relative URLs to absolute if needed
    if (!url.startsWith("http") && !isLocalhost()) {
      try {
        finalUrl =
          typeof window !== "undefined"
            ? `${window.location.origin}${url.startsWith("/") ? "" : "/"}${url}`
            : url;
      } catch {
        finalUrl = url;
      }
    }
  
    // Only use the optimization service if useBetterPic is true
    if (useBetterPic) {
      return getOptimizedUrl(
        finalUrl,
        overrideQuality ?? quality,
        overrideWidth ?? width,
        overrideFormat ?? format
      );
    }
    
    // Otherwise return the URL directly
    return finalUrl;
  };  

  const getOptimizedUrl = (
    url: string,
    qualityValue: number,
    widthValue?: number,
    formatValue?: string
  ): string => {
    const params = new URLSearchParams();

    params.append("url", url);
    if (formatValue) params.append("format", formatValue);
    if (qualityValue) params.append("quality", qualityValue.toString());
    if (widthValue) params.append("width", widthValue.toString());

    return `https://example.com/betterize?${params.toString()}`;
  };

  const optimizedSrc = transformUrl(src);
  const placeholderSrc = transformUrl(src, 1, 10, "webp");

  const containerStyle: React.CSSProperties = {
    position: "relative",
    overflow: "hidden",
    width: !skipWidthToElement && width ? `${width}px` : "100%",
    height: "100%",
    ...style,
  };

  const imageStylesProp: React.CSSProperties = {
    transition: "opacity 0.3s ease-in-out",
    opacity: useLQIP ? (mainImageLoaded ? 1 : 0) : 1,
    position: "relative",
    zIndex: 2,
    width: "100%",
    height: "auto",
    display: "block",
    ...imageStyle,
  };

  const placeholderStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    filter: "blur(8px)",
    transform: "scale(1.1)",
    zIndex: 1,
    opacity: mainImageLoaded ? 0 : 1,
    transition: "opacity 0.3s ease-in-out",
    objectFit: "cover",
    ...LQIPStyle,
  };

  const handleMainImageLoad = () => {
    setMainImageLoaded(true);
    onImageLoad?.();
  };

  const handleLQIPImageLoad = () => {
    setLQIPLoaded(true);
    onLQIPImageLoad?.();
  };

  // Show loader only when no image is visible
  const showLoader = useLQIP ? !isLQIPLoaded && !mainImageLoaded : !mainImageLoaded;

  return (
    <div style={containerStyle} className={className}>
      {useLoader && showLoader ? (
        <div className="w-full h-full flex items-center justify-center Skeletoned">
          <div className={cn("w-12 h-12 flex items-center justify-center", loaderClassName)} style={loaderStyle}>
            <LoaderCircle className="circle-rotate w-full h-full" />
          </div>
        </div>
      ) : null}
      
      {/* Placeholder/blur image */}
      {useLQIP && (
        <img
          src={placeholderSrc}
          alt=""
          style={placeholderStyle}
          className={cn(LQIPClassName)}
          aria-hidden="true"
          onLoadStart={() => onLQIPImageLoadStart?.()}
          onLoad={handleLQIPImageLoad}
        />
      )}

      {/* Main image */}
      <img
        src={optimizedSrc}
        onLoadStart={() => onImageLoadStart?.()}
        onLoad={handleMainImageLoad}
        style={imageStylesProp}
        className={cn(imageClassName)}
        width={!skipWidthToElement ? width : undefined}
        {...props}
      />
    </div>
  );
};

export default Image;