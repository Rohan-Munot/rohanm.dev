import { ThemeToggle } from "@/components/ui/theme-toggle";
import FlippingText from "@/components/ui/flipping-text";

const Header = () => {
  return (
    <div className="p-4 h-max w-full flex gap-3 items-end dashed-border-x mt-2 sm:mt-3">
      <div className="flex flex-1 justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-medium leading-4 text-muted-foreground">
            Hola!, I&apos;m
          </span>
          <h1 className="text-2xl font-medium leading-none font-mono">
            Rohan Munot
          </h1>
          <FlippingText
            texts={["Frontend Developer", "Based in India"]}
            interval={3000}
            className="text-sm leading-4 font-normal text-muted-foreground tracking-tight"
          />
        </div>
        <div className="flex flex-col items-end justify-between gap-2">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Header;
