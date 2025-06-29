import { Progress } from "@/components/ui/progress";
import { useExitModal } from "@/store/use-exit-modal";
import { InfinityIcon, X } from "lucide-react";
import Image from "next/image";

type HeaderProps = {
  hearts: number;
  percentage: number;
  hasActiveSubscription: boolean;
};

export const Header = ({
  hearts,
  percentage,
  hasActiveSubscription,
}: HeaderProps) => {
  const { open } = useExitModal();

  return (
    <header className="pt-[20px] lg:pt-[50px] px-10 flex gap-x-7 items-center justify-between max-w-[1140px] mx-auto w-full">
      <X
        onClick={open}
        className="text-slate-500 hover:opacity-75 transition cursor-pointer"
      />

      <Progress value={percentage} />

      <div className="text-rose-500 flex items-center font-bold">
        <Image
          src="/heart.svg"
          width={28}
          height={28}
          alt="Heart"
          className="mr-2"
        />
        {hasActiveSubscription ? (
          <InfinityIcon className="h-6 w-6 stroke-3 shrink-0" />
        ) : (
          hearts
        )}
      </div>
    </header>
  );
};
