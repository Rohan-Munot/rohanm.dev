"use client";
import { motion, useScroll, useTransform } from "motion/react";
import ThemeToggle from "@/components/ui/theme-toggle";
import FlippingText from "@/components/ui/flipping-text";
import LocalTimeChip from "@/components/ui/time-chip";

const Header = () => {
  const { scrollY } = useScroll();

  const fontSize = useTransform(scrollY, [0, 75, 150], ["24px", "20px", "16px"]);
  const paddingY = useTransform(scrollY, [0, 75, 150], [16, 10, 4]);
  const opacity = useTransform(scrollY, [0, 60, 120], [1, 0.5, 0]);
  const extraHeight = useTransform(scrollY, [0, 75, 150], [24, 12, 0]);
  const marginTop = useTransform(scrollY, [0, 75, 150], [6, 3, 0]);

  return (
    <motion.header
      className="sticky top-0.5 z-10 w-full flex dashed-border-x mt-2 sm:mt-3 backdrop-blur-lg bg-background/70"
      style={{
        paddingTop: paddingY,
        paddingBottom: paddingY,
        paddingLeft: 16,
        paddingRight: 16,
      }}
    >
      <div className="flex flex-1 gap-4 justify-between items-center">
        <div className="flex flex-col">
          <motion.h1
            style={{ fontSize }}
            className="font-medium leading-none font-mono whitespace-nowrap"
          >
            Rohan Munot
          </motion.h1>
          <motion.div
            className="overflow-hidden"
            style={{ marginTop, opacity, height: extraHeight }}
          >
            <FlippingText
              texts={["Frontend Developer", "Software Engineer", "Freelancer"]}
              interval={2000}
              className="text-sm leading-4 font-normal text-muted-foreground tracking-tight"
            />
          </motion.div>
        </div>

        <div className="flex flex-col items-end justify-between">
          <ThemeToggle />
          <motion.div
            className="overflow-hidden"
            style={{ marginTop, opacity, height: extraHeight }}
          >
            <LocalTimeChip />
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
