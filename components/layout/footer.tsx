"use client";

import Link from "next/link";
import { socials } from "@/components/features/socials";
import { CopyrightIcon, HeartIcon, ArrowUpIcon } from "@phosphor-icons/react/dist/ssr";

const Footer = () => {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="p-4 dashed-border-x mb-2 sm:mb-3">
      <div className="flex flex-col gap-2.5">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            {socials.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                target={
                  social.href.startsWith("mailto:") ? undefined : "_blank"
                }
                rel={
                  social.href.startsWith("mailto:")
                    ? undefined
                    : "noopener noreferrer"
                }
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                <social.icon className="size-3.5" />
                <span>{social.name}</span>
              </Link>
            ))}
          </div>

          <span className="group inline-flex items-center gap-1 text-xs text-muted-foreground">
            Built with <HeartIcon className="size-3.5 text-muted-foreground group-hover:text-red-500 transition-colors" weight="fill" />
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
          <p className="text-xs text-muted-foreground inline-flex items-center gap-1">
            <CopyrightIcon className="inline-block size-3.5 align-middle" />{" "}
            {year} Rohan Munot
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <span>Back to top</span>
            <ArrowUpIcon className="size-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
