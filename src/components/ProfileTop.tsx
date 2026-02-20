
import ProfileBanner from "@/components/ProfileBanner";
import ProfilePic from "@/components/ProfilePic"
import SpicyLyricsHoverCard from "./custom/SpicyLyricsHoverCard";
import { useQuery } from "@tanstack/react-query";
import { useProfile } from "@/zustand/useProfile";
import { useEffect } from "react";

const ProfileTop = () => {
    const profileQuery = useQuery({
        queryKey: ["profile-q"],
        queryFn: async () => {
            const req = await fetch("https://example.com/profile");
            return await req.json();
        },
        staleTime: 900 * 1000,
    })

    const updateProfile = useProfile((obj) => obj.update);

    useEffect(() => {
        updateProfile(profileQuery.data);
    }, [profileQuery.data])

    return (
        <div className="relative z-[5] w-full h-full">
            <div className="w-full h-auto max-h-50 rounded xs:rounded-2xl shadow-xl flex items-center justify-center relative overflow-hidden z-[1]">
                <div className="w-full h-full">
                    <ProfileBanner />
                </div>
            </div>
            
            <div className="mt-[-4rem] xs:mt-[-5rem] flex flex-col items-center w-full h-full z-[2]">
                <div className="w-34 xs:w-38 sm:w-39 md:w-41 h-auto aspect-square rounded-full flex items-center justify-center z-[1] shadow-xl">
                    <ProfilePic />
                </div>
                <div className="flex relative mt-3 z-[2]">
                    <h1 className="text-3xl font-bold relative">
                        YourName
                    </h1>
                </div>
                <div className="relative z-[3] mt-3">
                    <div className="text-sm sm:text-base md:text-lg text-center">
                        Creator of <SpicyLyricsHoverCard /><span className="italic">(something)</span>.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileTop;
