import NumberFlow from "@number-flow/react";

interface UserCountDisplayProps {
  userCount: number | null;
  className?: string;
  error?: string | null;
  redError?: boolean;
}

export default function UserCountDisplay({
  userCount,
  className = "",
  error = null,
  redError = true,
}: UserCountDisplayProps) {
  return (
    <div className={className}>
      {error ? (
        <p className={`${redError ? "text-red-500" : "text-gray-500"}`}>{error}</p>
      ) : (
        <div className="flex flex-col gap-0.5 items-center">
          {userCount !== null ? (
            <NumberFlow
              value={userCount}
              className="font-bold"
              trend={0}
            />
          ) : (
            <span>0000</span>
          )}
        </div>
      )}
    </div>
  );
}