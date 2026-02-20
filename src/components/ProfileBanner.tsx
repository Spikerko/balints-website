import { useProfile } from "@/zustand/useProfile";

const ProfileBanner = () => {
    const profileBanner = useProfile(s => s.content.banner);

    return (
        <img
            src={profileBanner}
            width={700}
            height={500}
            className={`overflow-hidden${!profileBanner ? " opacity-0" : ""}`}
        />
    )
}

export default ProfileBanner;