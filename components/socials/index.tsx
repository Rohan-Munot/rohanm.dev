"use client";

import Link from "next/link";
import Badge from "@/components/ui/badge";
import { useCopy } from "@/lib/use-copy";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
} from "@tabler/icons-react";

export const EMAIL = "rohanmunot24@gmail.com";

export const socials = [
  {
    name: "GitHub",
    href: "https://github.com/Rohan-Munot",
    icon: IconBrandGithub,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/rohan-munot",
    icon: IconBrandLinkedin,
  },
];

const Socials = () => {
  const { copied, copy } = useCopy();

  return (
    <div className="flex flex-wrap gap-2">
      {socials.map((social) => (
        <Badge
          key={social.name}
          render={
            <Link
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            />
          }
        >
          <social.icon />
          {social.name}
        </Badge>
      ))}
      <Badge
        render={
          <button
            type="button"
            onClick={() => copy(EMAIL)}
            className="hover:text-foreground transition-colors cursor-pointer"
          />
        }
      >
        <IconMail />
        {copied ? "Copied!" : "Email"}
      </Badge>
    </div>
  );
};

export default Socials;
