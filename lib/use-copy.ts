import { useRef, useState } from "react";

export function useCopy(timeout = 1000) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function copy(text: string) {
    try {
      if (typeof navigator === "undefined" || !navigator.clipboard) {
        return false;
      }
      await navigator.clipboard.writeText(text);
      setCopied(true);

      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        setCopied(false);
      }, timeout);

      return true;
    } catch {
      return false;
    }
  }

  return {
    copied,
    copy,
  };
}
