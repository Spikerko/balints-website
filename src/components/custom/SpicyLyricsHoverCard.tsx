/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-empty */
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";

const SpicyLyricsHoverCard = () => {
  function appLinkOpen(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) {
    if (window.umami) {
      const url = (event.currentTarget as HTMLAnchorElement).href;
      window.umami.track("app-hovercard-link-open", {
        url: url ?? "unknown",
      });
    }
  }

  return (
    <HoverCard open={false}>
      <HoverCardTrigger asChild className="cursor-target">
        <a
          href="https://example.com"
          target="_blank"
          onClick={appLinkOpen}
        >
          <Button
            variant={"link"}
            className="text-sm sm:text-base md:text-lg p-0 pl-0.5 pr-0.5 cursor-pointer font-bold"
          >
            YourApp
          </Button>
        </a>
      </HoverCardTrigger>
      <HoverCardContent className="relative z-[9999]">
        {/* <div className="flex flex-col gap-0.5 items-center">
          <div className="flex flex-col items-center">
            <p className="text-center text-2xl">Active Users</p>
            <p className="text-gray-400 text-base text-center">Realtime</p>
          </div>
          <UserCountDisplay
            userCount={activeUsers}
            error={error}
            redError={redError}
            className="text-2xl"
          />
        </div> */}
      </HoverCardContent>
    </HoverCard>
  );
};

export default SpicyLyricsHoverCard;
