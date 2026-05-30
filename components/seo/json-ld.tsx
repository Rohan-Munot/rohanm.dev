const siteUrl = "https://rohanm.dev";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Rohan Munot",
  givenName: "Rohan",
  familyName: "Munot",
  jobTitle: "Frontend Developer",
  url: siteUrl,
  sameAs: [
    "https://github.com/Rohan-Munot",
    "https://linkedin.com/in/rohan-munot",
  ],
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Frontend Development",
    "Web Development",
  ],
  worksFor: [
    {
      "@type": "Organization",
      name: "Clinikally (YC 22)",
      url: "https://www.clinikally.com",
    },
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Rohan Munot",
  url: siteUrl,
  description:
    "Frontend developer based in India. Building performant web experiences with care.",
};

const JsonLd = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
};

export default JsonLd;
