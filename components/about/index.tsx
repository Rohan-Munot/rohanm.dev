"use client";

import Link from "next/link";
import PawArt from "@/components/paw-art";

const About = () => {
  return (
    <div className="relative flex flex-col gap-4 overflow-hidden pb-4 sm:pr-12">
      <PawArt className="absolute bottom-0 right-0" />

      <div className="flex flex-col gap-3 text-sm leading-relaxed">
        <div className="flex gap-2">
          <span className="shrink-0 font-mono text-[11px] text-muted-foreground mt-0.5">
            ~
          </span>
          <span className="text-foreground/90">
            I&apos;m Rohan — Frontend Engineer with 1.5+ years of experience,
            who loves building products that are clean and intuitive, with focus
            on details and design.
          </span>
        </div>

        <div className="flex gap-2">
          <span className="shrink-0 font-mono text-[11px] text-muted-foreground mt-0.5">
            ~
          </span>
          <span className="text-foreground/75">
            I&apos;ve worked with freelance clients, had 3 Startup internships.
            Currently at{" "}
            <Link
              href={"https://www.clinikally.com/"}
              className="text-foreground underline underline-offset-4 font-semibold"
            >
              Clinikally
            </Link>
          </span>
        </div>

        <div className="flex flex-wrap gap-2 gap-y-0">
          <span className="text-[11px] text-muted-foreground mt-0.5">~</span>
          <span className="text-foreground/75 text-balance w-max">
            Open to full-time / freelance.
          </span>
          <Link
            href="mailto:rohanmunot24@gmail.com"
            className="font-semibold tracking-tighter text-foreground decoration-accent underline underline-offset-4 transition-colors"
          >
            Let&apos;s talk
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
