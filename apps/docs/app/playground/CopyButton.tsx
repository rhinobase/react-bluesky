import { Button, eventHandler } from "@rafty/ui";
import { useEffect, useState } from "react";

export type CopyButton = {
  data?: string;
};

export function CopyButton({ data }: CopyButton) {
  const [copyCount, setCopyCount] = useState(0);
  const copied = copyCount > 0;

  useEffect(() => {
    if (copyCount > 0) {
      const timeout = setTimeout(() => setCopyCount(0), 2000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [copyCount]);

  const handleCopy = eventHandler(() => {
    if (data)
      window.navigator.clipboard.writeText(data).then(() => {
        setCopyCount((count) => count + 1);
      });
  });

  return (
    <Button
      aria-label="copy"
      size="lg"
      onClick={handleCopy}
      onKeyDown={handleCopy}
      className="min-w-24 bg-[#0a7aff] hover:bg-[#0a7aff] text-white dark:bg-[#0a7aff] dark:hover:bg-[#0a7aff]"
    >
      {copied ? "Copied!" : "Copy Code"}
    </Button>
  );
}
