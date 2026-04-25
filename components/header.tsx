// import Image from "next/image";
import { ThemeToggle } from "./theme-toggle";
import FlippingText from "./flipping-text";
import LocalTimeChip from "./time-chip";

const Header = () => {
  return (
    <div className="p-4 h-max w-full flex gap-3 items-end dashed-border-x mt-2 sm:mt-3">
      {/*<div className="border flex w-max p-1 rounded-md border-border/80">
        <Image
          src={
            "https://anyplaceholder.com/placeholder?width=300&height=200&bg=050505&color=fff&fontSize=20&radius=0&format=png"
          }
          alt="Placeholder image"
          width={72}
          height={72}
          className="rounded-sm size-18  aspect-square shrink-0"
        />
      </div>*/}
      <div className="flex flex-1 justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-medium leading-4 text-muted-foreground">
            {/*Hi I&apos;m*/}
            Hola!, I&apos;m
          </span>
          <span className="text-2xl font-medium leading-none font-mono">
            Rohan Munot
          </span>
          <FlippingText
            texts={["Frontend Developer", "Based in India"]}
            interval={3000}
            className="text-sm leading-4 font-normal text-muted-foreground tracking-tight"
          />
        </div>
        <div className="flex flex-col items-end justify-between gap-2">
          <LocalTimeChip />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Header;
