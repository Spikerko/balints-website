import { ArrowUpRight, Github, Instagram, Mail, Music, Podcast, Youtube } from "lucide-react"
import SpicyLyricsIcon from "@/components/custom/Icons/SpicyLyrics"
import TikTokIcon from "@/components/custom/Icons/TikTokIcon";
import XIcon from "@/components/custom/Icons/XIcon";
import SpotifyIcon from "@/components/custom/Icons/SpotifyIcon";
import DiscordIcon from "@/components/custom/Icons/DiscordIcon";

type LinkListItem = {
    name: string;
    href: string;
    icon?: React.ReactNode;
    target?: string;
    variant?: "default" | "secondary";
    color?: string;
}

const LinkList: LinkListItem[] = [
    {
        name: "My New Website",
        href: "https://example.com",
        icon: <ArrowUpRight />,
        color: "#c90c0c",
        target: "_self",
    },
    {
        name: "My Yoursitee",
        href: "https://example.com/yourname",
        icon: <ArrowUpRight />,
        variant: "default"
    },
    {
        name: "Community Discord",
        href: "https://example.com/your-community",
        icon: <DiscordIcon />
    },
    {
        name: "YourApp Website",
        href: "https://example.com",
        icon: <SpicyLyricsIcon className="fill-white" />,
    },
    /* {
        name: "App Profile",
        href: "https://example.com/profile/000000000000000000",
        icon: <SpicyLyricsIcon className="fill-white" />,
    },
    {
        name: "Github",
        href: "https://example.com/YourName",
        icon: <Github />
    },
    {
        name: "TikTok",
        href: "https://example.com/@yourname",
        icon: <TikTokIcon />
    },
    {
        name: "YouTube",
        href: "https://example.com/@YourName",
        icon: <Youtube />
    },
    {
        name: "Instagram",
        href: "https://example.com/yourname_",
        icon: <Instagram />
    },
    {
        name: "(Twitter)",
        href: "https://example.com/yourname_",
        icon: <XIcon />
    },
    {
        name: "Spotify",
        href: "https://example.com/user/31df5rin7m6sllcfgg6rx3grcy54",
        icon: <SpotifyIcon />
    },
    {
        name: "Spotify Podcast",
        href: "https://example.com/show/6bIdDkM8cFED1tjoqHiID7",
        icon: <SpotifyIcon />
    },
    {
        name: "Apple Podcasts",
        href: "https://example.com/us/podcast/yourname/id1787787291",
        icon: <Podcast />
    },
    {
        name: "Eurovision Map",
        href: "https://example.com",
        icon: <Music />
    },
    {
        name: "Contact",
        href: "mailto:yourname@example.com",
        icon: <Mail />
    } */
]

export default LinkList;
