"use client";

import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface BackButtonProps {
  className?: string;
}

const BackButton = ({ className }: BackButtonProps) => {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className={cn(
        "inline-flex w-max cursor-pointer items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground",
        className,
      )}
    >
      <ArrowLeftIcon className="size-4" />
      <span>Back</span>
    </button>
  );
};

export default BackButton;
