import Link from "next/link";

const About = () => {
  return (
    <div className="flex flex-col gap-1.5 [&>p]:text-sm [&>p]:leading-relaxed [&>p]:text-foreground">
      <p>
        Hey, I&apos;m Rohan. Obsessed with the details that make software feel right &mdash; clean, intuitive interfaces and products that are actually practical.
      </p>
      <p>
        Built mobile apps, AI applications, internal tools, and workflow
        automations.
      </p>
      <p>
        Working for about 1.5 years across freelance, contract, and startups.
      </p>
      <p>
        Open to full-time and freelance opportunities.&nbsp;
        <Link
          href="mailto:rohanmunot24@gmail.com"
          className="font-semibold hover:text-foreground transition-colors tracking-tighter"
        >
          Let&apos;s talk
        </Link>
      </p>
    </div>
  );
};

export default About;
