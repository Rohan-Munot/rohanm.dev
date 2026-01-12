import Image from "next/image";
import { ThemeToggle } from "./theme-toggle";
const Header = () => {
  return (
    <div className="p-2 h-max w-full flex gap-3 items-end">
      <div className="border flex w-max p-1 rounded-md border-border/80">
        <Image
          src={
            "https://anyplaceholder.com/placeholder?width=300&height=200&bg=050505&color=fff&fontSize=20&radius=0&format=png"
          }
          alt="Placeholder image"
          width={72}
          height={72}
          className="rounded-sm size-18  aspect-square shrink-0"
        />
      </div>
      <div className="flex flex-1 justify-between items-center">
        <div className="flex flex-col gap-1.5 ">
          <span className="text-2xl font-medium leading-6">Rohan Munot</span>
          <span className="text-[15px] leading-4 font-normal text-muted-foreground tracking-wider">
            Fronted Developer
          </span>
        </div>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Header;
