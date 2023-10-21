"use client";

import { Doc } from "@/convex/_generated/dataModel";
import { CheckCheck, Copy, Globe } from "lucide-react";
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useOrigin } from "@/hooks/use-origin";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface PublishProps {
  initialData: Doc<"documents">;
}

const Publish = ({ initialData }: PublishProps) => {
  const origin = useOrigin();
  const update = useMutation(api.documents.update);

  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const url = `${origin}/preview/${initialData._id}`;

  const onPublish = () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: true,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: "Publishing...",
      success: "Note has published",
      error: "Failed to publish note",
    });
  };

  const onUnpublish = () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: false,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: "Unpublishing...",
      success: "Note has unpublished",
      error: "Failed to unpublish note",
    });
  };

  const onCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <div className="flex items-center overflow-hidden">
      <Popover>
        <PopoverTrigger asChild>
          <Button size="sm" variant="ghost">
            Publish
            {initialData.isPublished && (
              <Globe className="text-blue-500 w-4 h-4 ml-2" />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent 
         className="w-72"
         align="end"
         alignOffset={8}
         forceMount>
          {initialData.isPublished ? (
            <div className="space-y-4">
              <div className="flex items-center gap-x-2">
                <Globe className="h-4 w-4 animate-pulse text-blue-500"/>
                <p className="text-xs font-medium text-blue-500">
                  This note is live on the web
                </p>
              </div>
              <div className="flex items-center">
                <input 
                  className="flex-1 px-2 text-xs border h-8 rounded-l-md bg-muted truncate"
                  value={url}
                  disabled
                />
                <Button 
                  onClick={onCopy}
                  disabled={copied}
                  className="h-8 rounded-l-none"
                >
                  {copied ? (
                    <CheckCheck className="h-4 w-4"/>
                  ):(
                    <Copy className="h-4 w-4"/>
                  )}
                </Button>
              </div>
              <Button
                className="w-full text-xs"
                onClick={onUnpublish}
                disabled={isSubmitting}
              >
                Unpublish
              </Button>
            </div>
          ):(
            <div className="flex flex-col items-center justify-center">
              <Globe className="h-8 w-8 text-muted-forground mb-2"/>
              <p className="text-sm font-medium mb-2">
                Publish this note
              </p>
              <span className="text-xs text-muted-forground mb-4">
                Share your work with others.
              </span>
              <Button
              disabled={isSubmitting}
              onClick={onPublish}
              className="text-xs w-full"
              size='sm'>
                  Publish
              </Button>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Publish;
