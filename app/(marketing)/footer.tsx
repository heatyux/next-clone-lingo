import { Button } from "@/components/ui/button";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
      <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
        <Button variant="ghost" size="lg">
          <Image
            src="/hr.svg"
            width={40}
            height={32}
            alt="Croatian"
            className="mr-4 rounded-md"
          />
          Croatian
        </Button>
        <Button variant="ghost" size="lg">
          <Image
            src="/es.svg"
            width={40}
            height={32}
            alt="Spanish"
            className="mr-4 rounded-md"
          />
          Spanish
        </Button>
        <Button variant="ghost" size="lg">
          <Image
            src="/fr.svg"
            width={40}
            height={32}
            alt="French"
            className="mr-4 rounded-md"
          />
          French
        </Button>
        <Button variant="ghost" size="lg">
          <Image
            src="/it.svg"
            width={40}
            height={32}
            alt="Italian"
            className="mr-4 rounded-md"
          />
          Italian
        </Button>
      </div>
    </div>
  );
};

export default Footer;
