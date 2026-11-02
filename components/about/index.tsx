"use client";

import Link from "next/link";
import PawArt from "@/components/paw-art";
import { EMAIL } from "@/components/socials";
import { useCopy } from "@/lib/use-copy";

const About = () => {
  const { copied, copy } = useCopy();

  return (
    <div className="relative flex flex-col gap-4 overflow-hidden pb-4 sm:pr-12">
      <PawArt className="absolute bottom-0 right-0" />

      <div className="flex flex-col gap-1.5 text-sm leading-relaxed">
        <div className="flex gap-2">
          <span className="shrink-0 font-mono text-[11px] text-muted-foreground mt-0.5">
            ~
          </span>
          <span className="text-foreground">
            I&apos;m <span className="text-[#ffd60a]">rohan</span>, a software engineer, who loves to figure out things, build stuff and get little details right.
          </span>
        </div>

        <div className="flex gap-2">
          <span className="shrink-0 font-mono text-[11px] text-muted-foreground mt-0.5">
            ~
          </span>
          <span className="text-foreground">
            A year and a half of building things, with a lot more ahead.
          </span>
        </div>

        <div className="flex flex-wrap gap-2 gap-y-0">
          <span className="text-[11px] text-muted-foreground mt-0.5">~</span>
          <span className="text-foreground text-balance w-max">
            Open to full-time / freelance.
          </span>
          <button
            type="button"
            onClick={() => copy(EMAIL)}
            className="font-semibold tracking-tighter text-foreground decoration-accent underline underline-offset-4 transition-colors cursor-pointer"
          >
            {copied ? "Email Copied!" : "Let's talk"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
