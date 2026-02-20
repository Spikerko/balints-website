
/* const ProfilePic = () => {
  // Calculate necessary padding (30px on each side)
  const circleDiameter = 380;
  const imageDiameter = 300;
  const padding = (circleDiameter - imageDiameter) / 2;

  return (
    <div 
      className="relative inline-flex items-center justify-center"
      style={{ padding: `${padding}px` }} // Add padding to prevent clipping
    >
      <div className="w-[300px] h-[300px] relative">
        <CircularText
          text="YourName * YourName * YourName * YourName * YourName * YourName * "
          onHover="slowDown"
          spinDuration={20}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px]"
        />
        
        <Image
          src="https://example.com/yourname-pfp/current/pfp.jpg"
          width={300}
          height={300}
          alt="YourName"
          format="webp"
          useLQIP={true}
          className="rounded-full"
        />
      </div>
    </div>
  );
}; */

import { useProfile } from "@/zustand/useProfile";

const ProfilePic = () => {
  const profilePic = useProfile(s => s.content.avatar);

  return (
    <div className="relative flex items-center justify-center">
      {/* <div className="absolute z-[2]">
        <Image
          src="/vercel_cdn_assets/a_64c339e0c128dcb279ae201b1190d9d3.png"
          width={332}
          height={332}
          alt="YourName"
          useBetterPic={false}
          skipWidthToElement={true}
          className="!w-[125%] !h-[125%] ml-[-8px]"
        />
      </div> */}
      <div className="relative z-[1]">
        <img
          src={profilePic}
          width={300}
          height={300}
          alt={""}
          className={`rounded-full shadow-xl${!profilePic ? " opacity-0" : ""}`}
        />
      </div>
    </div>
  )
}

export default ProfilePic;
