"use client";

import { ArrowLeftIcon } from "@phosphor-icons/react/ssr";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/button";

interface BackButtonProps {
  className?: string;
}

const BackButton = ({ className }: BackButtonProps) => {
  const router = useRouter();

  return (
    <Button
      type="button"
      onClick={() => router.back()}
      className={cn("w-max text-sm text-muted-foreground", className)}
    >
      <ArrowLeftIcon className="size-4" />
      <span>Back</span>
    </Button>
  );
};

export default BackButton;
