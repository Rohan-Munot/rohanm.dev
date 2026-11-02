const LINES = [
  "Encumbered forever by desire and ambition",
  "There's a hunger still unsatisfied",
  "Our weary eyes still stray to the horizon",
  "Though down this road we've been so many times",
];
const Footer = () => {
  return (
    <footer className="dashed-border-x p-4 flex justify-between">
      <div className="text-sm text-muted-foreground italic">Pink Floyd &lt;3</div>
      <blockquote className="m-0 max-w-prose text-right text-sm leading-normal text-muted-foreground whitespace-pre-line">
        {LINES.join("\n")}
      </blockquote>
    </footer>
  );
};

export default Footer;
