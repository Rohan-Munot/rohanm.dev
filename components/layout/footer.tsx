"use client";

import Link from "next/link";
import {
  CopyrightIcon,
  HeartIcon,
  ArrowUpIcon,
} from "@phosphor-icons/react/ssr";
import { motion } from "motion/react";
import { socials } from "@/components/features/socials";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import Button from "@/components/ui/button";

const Footer = () => {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="p-4 dashed-border-x mb-2 sm:mb-3">
      <div className="flex flex-col gap-2.5">
        {/* Row 1: Social icons | Built with */}
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
          <TooltipProvider>
            <div className="flex items-center gap-2">
              {socials.map((social) => (
                <Tooltip key={social.name}>
                  <TooltipTrigger
                    render={
                      <Link
                        href={social.href}
                        target={
                          social.href.startsWith("mailto:")
                            ? undefined
                            : "_blank"
                        }
                        rel={
                          social.href.startsWith("mailto:")
                            ? undefined
                            : "noopener noreferrer"
                        }
                        className="inline-flex items-center justify-center p-1 text-foreground"
                        aria-label={social.name}
                      />
                    }
                  >
                    <social.icon className="size-4.5" />
                  </TooltipTrigger>
                  <TooltipContent>{social.name}</TooltipContent>
                </Tooltip>
              ))}
            </div>
          </TooltipProvider>

          <motion.span
            className="group inline-flex items-center gap-1 text-xs text-muted-foreground cursor-default"
            initial="rest"
            whileHover="hover"
          >
            Built with{" "}
            <motion.span
              className="inline-flex"
              variants={{
                rest: { scale: 1, rotate: 0 },
                hover: {
                  rotate: [0, -12, 10, -8, 6, -4, 2, 0],
                  scale: [1, 1.5, 1],
                },
              }}
              transition={{ duration: 0.5, ease: "easeIn" }}
            >
              <HeartIcon
                className="size-3.5 text-muted-foreground group-hover:text-red-500 transition-colors"
                weight="fill"
              />
            </motion.span>
          </motion.span>
        </div>

        {/* Row 2: Copyright | Back to top */}
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
          <p className="text-xs text-muted-foreground inline-flex items-center gap-1">
            <CopyrightIcon className="inline-block size-3.5 align-middle" />{" "}
            {year} Rohan Munot
          </p>

          <Button
            type="button"
            onClick={scrollToTop}
            className="gap-1 text-xs text-muted-foreground"
          >
            <span>Back to top</span>
            <ArrowUpIcon className="size-3.5" />
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
