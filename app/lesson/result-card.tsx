import Image from "next/image";
import { cn } from "@/lib/utils";
import { InfinityIcon } from "lucide-react";

type ResultCardProps = {
  variant: "points" | "hearts";
  value: number;
};

export const ResultCard = ({ variant, value }: ResultCardProps) => {
  const imageSrc = variant === "points" ? "/points.svg" : "/heart.svg";

  return (
    <div
      className={cn(
        "rounded-2xl border-2 w-full",
        variant === "points" && "bg-orange-400 border-orange-400",
        variant === "hearts" && "bg-rose-500 border-rose-500"
      )}
    >
      <div
        className={cn(
          "p-1.5 text-white rounded-t-xl font-bold text-center uppervase text-xs",
          variant === "points" && "bg-orange-400",
          variant === "hearts" && "bg-rose-500"
        )}
      >
        {variant === "hearts" ? "Hears Left" : "Total XP"}
      </div>

      <div
        className={cn(
          "rounded-2xl bg-white flex items-center justify-center p-6 font-bold text-lg",
          variant === "points" && "text-orange-400",
          variant === "hearts" && "text-rose-500"
        )}
      >
        <Image
          src={imageSrc}
          alt={variant}
          width={30}
          height={30}
          className="mr-1.5"
        />
        {value === Infinity ? (
          <InfinityIcon className="h-6 w-6 stroke-[3]" />
        ) : (
          value
        )}
      </div>
    </div>
  );
};
