"use client";
import { Bars3Icon } from "@heroicons/react/24/outline";
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerOverlay,
} from "@rafty/ui";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useRef } from "react";
import { BsGithub, BsTwitter } from "react-icons/bs";
import { FaBluesky } from "react-icons/fa6";
import { Navigation } from "./Navigation";
import { useDrawerDialog } from "./store";

export const SOCIALS = [
  {
    name: "Bluesky",
    link: "https://bsky.app/profile/adima7.bsky.social",
    icon: FaBluesky,
  },
  {
    name: "Twitter",
    link: "https://x.com/rhinobaseio",
    icon: BsTwitter,
  },
  {
    name: "Github",
    link: "https://github.com/rhinobase/react-bluesky",
    icon: BsGithub,
  },
];

const IsInsideMobileNavigationContext = createContext(false);

export function MobileNavigationDialog() {
  const { isOpen, setOpen } = useDrawerDialog();
  const pathname = usePathname();
  const initialPathname = useRef(pathname).current;

  useEffect(() => {
    if (pathname !== initialPathname) {
      setOpen(false);
    }
  }, [pathname, setOpen, initialPathname]);

  return (
    <Drawer
      open={isOpen}
      onOpenChange={setOpen}
      aria-label="Navigation"
      side="left"
    >
      <DrawerOverlay />
      <DrawerContent className="size-full max-w-[70vw] p-0 py-6 flex flex-col">
        <DrawerClose className="z-[60]" />
        <Navigation className="h-full px-6 pb-6" />
        <Socials />
      </DrawerContent>
    </Drawer>
  );
}

function Socials() {
  return (
    <div className="flex flex-col items-center gap-3 px-6 w-full">
      {SOCIALS.map(({ name, icon: Icon, link }) => (
        <Link
          href={link}
          key={name}
          target="_blank"
          rel="noopener noreferrer"
          className="py-0.5 w-full flex items-center gap-1.5"
        >
          <Icon
            size={17}
            className="hover:fill-secondary-900 fill-secondary-500 dark:hover:fill-secondary-300 dark:fill-secondary-500 transition-all"
          />
          <p className="text-[0.875rem]">{name}</p>
        </Link>
      ))}
    </div>
  );
}

export function useIsInsideMobileNavigation() {
  return useContext(IsInsideMobileNavigationContext);
}

export function MobileNavigation() {
  const { setOpen } = useDrawerDialog();

  return (
    <IsInsideMobileNavigationContext.Provider value={true}>
      <Button
        type="button"
        size="icon"
        variant="ghost"
        onClick={() => setOpen(true)}
      >
        <Bars3Icon width={20} height={20} className="stroke-2" />
      </Button>
    </IsInsideMobileNavigationContext.Provider>
  );
}
