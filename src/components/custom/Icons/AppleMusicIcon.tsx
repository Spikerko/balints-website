import { cn } from "@/lib/utils";

const AppleMusicIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      viewBox="0 0 512 512"
      width="12"
      height="12"
      className={cn("fill-white", className)}
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <rect width="512" height="512" rx="15%" fill="url(#g)"></rect>
        <path
          d="M199 359V199q0-9 10-11l138-28q11-2 12 10v122q0 15-45 20c-57 9-48 105 30 79 30-11 35-40 35-69V88s0-20-17-15l-170 35s-13 2-13 18v203q0 15-45 20c-57 9-48 105 30 79 30-11 35-40 35-69"
        ></path>
      </g>
    </svg>
  );
};

export default AppleMusicIcon;