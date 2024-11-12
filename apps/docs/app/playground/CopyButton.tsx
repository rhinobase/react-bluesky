import { CheckIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
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

  const Icon = copied ? CheckIcon : DocumentDuplicateIcon;

  return (
    <Button
      aria-label="copy"
      size="icon"
      colorScheme="primary"
      className="p-2.5"
      onClick={handleCopy}
      onKeyDown={handleCopy}
    >
      <Icon className="size-5 stroke-2" />
    </Button>
  );
}
