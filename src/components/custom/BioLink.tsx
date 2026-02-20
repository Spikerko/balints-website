import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

type BioLinkProps = {
    text: string;
    href: string;
    target?: string;
    className?: string;
    icon?: React.ReactNode;
    variant?: "default" | "secondary";
    color?: string | null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

const BioLink = ({ text, href, target, className, icon, variant, color, ...props }: BioLinkProps) => {

    function linkOpen(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        if (window.umami) {
            const url = (event.currentTarget as HTMLAnchorElement).href;
            window.umami.track("bio-link-open", {
                url: (url ?? "unknown")
            });
        }
    }

    return (
        <div className={cn("cursor-pointer w-full", className)} {...props}> {/* ease-in-out duration-240 transition-scale hover:scale-[1.02] */}
            <a href={href} target={target ?? "_blank"} className="w-full" onClick={linkOpen}>
                <Button
                    className="font-bold cursor-pointer w-full flex flex-row gap-1.5 items-center"
                    style={color ? { backgroundColor: color } : undefined}
                    variant={variant ?? "secondary"}
                    size={"lg"}
                >
                    {icon ? <div className="w-4 h-4">{icon}</div> : ""}{text}
                </Button>
            </a>
        </div>
    );
};

export default BioLink;