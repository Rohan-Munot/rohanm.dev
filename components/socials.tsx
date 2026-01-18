import Link from "next/link";
import { Badge } from "./badge";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
} from "@tabler/icons-react";

const socials = [
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
  {
    name: "Email",
    href: "mailto:rohanmunot24@gmail.com",
    icon: IconMail,
  },
];

const Socials = () => {
  return (
    <div className="flex flex-wrap gap-2">
      {socials.map((social) => (
        <Badge
          key={social.name}
          render={
            <Link
              href={social.href}
              target={social.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={
                social.href.startsWith("mailto:")
                  ? undefined
                  : "noopener noreferrer"
              }
              className="hover:text-foreground transition-colors"
            />
          }
        >
          <social.icon className="size-4 sm:size-3.5" />
          {social.name}
        </Badge>
      ))}
    </div>
  );
};

export default Socials;
