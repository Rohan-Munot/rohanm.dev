import ThemeToggle from "@/components/ui/theme-toggle";
import FlippingText from "@/components/ui/flipping-text";
import LocalTimeChip from "@/components/ui/time-chip";

const Header = () => {
  return (
    <header
      className="w-full flex dashed-border-x mt-2 sm:mt-3 backdrop-blur-lg bg-background/70"
    >
      <div className="flex flex-1 gap-4 justify-between items-center">
        <div className="flex flex-col">
          <h1
            className="font-medium leading-none font-mono whitespace-nowrap"
          >
            Rohan Munot
          </h1>
        </div>

        <div className="flex flex-col items-end justify-between">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
