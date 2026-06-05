import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rohanm.dev"),
  title: {
    default: "Rohan Munot | Frontend Developer",
    template: "%s | Rohan Munot",
  },
  description:
    "Frontend developer based in India. Building performant, animated web experiences with React, Next.js, and TypeScript.",
  openGraph: {
    title: "Rohan Munot | Frontend Developer",
    description:
      "Frontend developer based in India. Building performant, animated web experiences with React, Next.js, and TypeScript.",
    url: "https://rohanm.dev",
    siteName: "rohanm.dev",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rohan Munot | Frontend Developer",
    description:
      "Frontend developer based in India. Building performant, animated web experiences with React, Next.js, and TypeScript.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script defer src="https://cloud.umami.is/script.js" data-website-id="4f722212-f4ac-4df7-9a9b-f7e6d77d6d3b" />
      </head>
      <body
        className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
