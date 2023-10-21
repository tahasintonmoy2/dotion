"use client";
import React, { useState, useEffect } from "react";
import { Button } from '@/components/ui/button'
import { File, Settings } from "lucide-react";
import { useQuery } from "convex/react";
import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { useSearch } from "@/hooks/use-search";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from "@/components/ui/command";
import { useSettings } from "@/hooks/use-settings";

export const CommandBar = () => {
  const { user } = useUser();
  const router = useRouter();
  const documents = useQuery(api.documents.getSearch);
  const [isMuted, setIsMuted] = useState(false);
  const settings = useSettings();

  const toggle = useSearch((store) => store.toggle);
  const isOpen = useSearch((store) => store.isOpen);
  const onClose = useSearch((store) => store.onClose);

  useEffect(() => {
    setIsMuted(true);
  }, []);

  // Toggle the menu when ⌘K is pressed
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggle]);

  const onSelect = (id: string) => {
    router.push(`/documents/${id}`);
    onClose();
  };

  if (!isMuted) {
    return null;
  }

  return (
    <>
      <CommandDialog open={isOpen} onOpenChange={onClose}>
        <CommandInput placeholder={`${user?.firstName}, Search your documents...`} />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {documents?.map((document) => (
              <CommandItem
                key={document._id}
                value={`${document._id}-${document.title}`}
                title={document.title}
                onSelect={onSelect}
              >
                {document.icon ? (
                  <p className="mr-2 text-[18px]">{document.icon}</p>
                ) : (
                  <File className="mr-2 h-4 w-4 text-muted-foreground" />
                )}
                <span>{document.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem onClick={settings.onOpen}>
              <Settings className="mr-2 h-4 w-4" onClick={settings.onOpen}/>
              <span>Settings</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};
