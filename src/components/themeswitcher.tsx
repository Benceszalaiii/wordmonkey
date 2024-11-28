"use client";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface ItemProps {
  name: string;
  action: () => void;
}

export function ThemeSwitchCommand() {
  const { themes, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    localStorage.setItem("commandopen", open.toString());
  }, [open]);
  const themeItems: ItemProps[] = themes.map((theme) => {
    return {
      name: theme,
      action: () => {
        setTheme(theme);
      },
    };
  });
  useEffect(() => {
    setOpen(localStorage.getItem("commandopen") === "true");
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
      if (open) {
        e.stopPropagation();
        e.stopImmediatePropagation();
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        autoFocus={false}
        tabIndex={1}
        placeholder="Search for theme..."
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Themes">
          {themeItems.map((item) => {
            return (
              <CommandItem
                key={item.name}
                onSelect={() => {
                  item.action();
                }}
              >
                {item.name}
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
