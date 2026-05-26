import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import BackButton from "@/components/ui/back-button";
import Footer from "@/components/layout/footer";

const Page = () => {
  return (
    <main className="min-h-screen flex justify-center relative mx-2">
      <div className="dashed-border-y flex w-full max-w-3xl flex-col gap-10 font-mono pb-2 sm:pb-3">
        <div className="p-4 dashed-border-x mt-2 sm:mt-3 flex items-center justify-between">
          <BackButton />
          <ThemeToggle />
        </div>

        <div className="p-4 dashed-border-x mb-2 sm:mb-3">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium text-muted-foreground">404</p>
              <h1 className="text-2xl font-medium leading-none">
                This route does not exist.
              </h1>
              <p className="max-w-lg text-sm leading-6 text-muted-foreground">
                <Link
                  href="/"
                  className="custom-dotted-underline text-foreground"
                >
                  Head back home.
                </Link>
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </main>
  );
};

export default Page;
