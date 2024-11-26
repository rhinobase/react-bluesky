export * from "./labels";
export * from "./validations";

export function niceDate(date: number | string | Date) {
  const d = new Date(date);
  return `${d.toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })} at ${d.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  })}`;
}

const formatter = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1,
  roundingMode: "trunc",
});

export function getRkey({ uri }: { uri: string }): string {
  return uri.split("/").pop() ?? "";
}

export function prettyNumber(number: number) {
  return formatter.format(number);
}

export function classNames(...classes: unknown[]) {
  return classes.filter(Boolean).join(" ");
}
