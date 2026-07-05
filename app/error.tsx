"use client";

import Button from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen flex justify-center relative mx-2">
      <div className="dashed-border-y flex w-full max-w-3xl flex-col gap-10 font-mono pb-2 sm:pb-3">
        <div className="p-4 dashed-border-x mt-2 sm:mt-3">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-medium leading-none">
                Something went wrong.
              </h1>
              <Button
                type="button"
                onClick={reset}
                className="w-max mt-2 text-xs text-muted-foreground underline"
              >
                Try again
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
