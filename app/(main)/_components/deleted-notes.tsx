"use client";

import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import { Spinner } from "@/components/spinner";
import { Search, Trash, Undo2 } from "lucide-react";
import { ConfirmModel } from "@/components/models/confirm-model";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const DeletedNotes = () => {
  const router = useRouter();
  const params = useParams();
  const documents = useQuery(api.documents.getTrash);
  const restore = useMutation(api.documents.restore);
  const remove = useMutation(api.documents.remove);

  const [search, setSearch] = useState("");

  const filterDocuments = documents?.filter((document) => {
    return document.title.toLowerCase().includes(search.toLowerCase());
  });

  const onClick = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  const onRestore = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: Id<"documents">
  ) => {
    event.stopPropagation();
    const promise = restore({ id: documentId });

    toast.promise(promise, {
      loading: "Restoring a note...",
      success: "Note restoring successfull",
      error: "Failed to restoring a note",
    });
  };

  const onRemove = (documentId: Id<"documents">) => {
    const promise = remove({ id: documentId });

    toast.promise(promise, {
      loading: "Deleting a note...",
      success: "Note deleted permanently",
      error: "Failed to deleted a note",
    });

    if (params.documentId === documentId) {
      router.push("/documents");
    }
  };

  if (documents === undefined) {
    return (
      <div className="h-full flex justify-center items-center p-4">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="text-sm">
      <div className="flex items-center gap-x-1 p-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
          placeholder="Filter by title"
        />
      </div>
      <div className="mt-2 px-1 pb-4">
        <p className="hidden last:block text-center text-xs">
          No document found
        </p>
        {filterDocuments?.map((document) => (
          <div
            key={document._id}
            role="button"
            onClick={() => onClick(document._id)}
            className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between"
          >
            <span className="truncate pl-2">{document.title}</span>
            <div className="flex items-center p-0.5">
              <div
                onClick={(e) => onRestore(e, document._id)}
                role="button"
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="rounded-sm p-1 hover:bg-slate-200 dark:hover:bg-slate-700">
                      <Undo2 className="text-sm text-muted-foreground h-4 w-4" />
                    </TooltipTrigger>
                    <TooltipContent className="py-0.5">
                      <p>Restore</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <ConfirmModel onConfirm={() => onRemove(document._id)}>
                <div role="button">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="rounded-sm p-1 hover:bg-slate-200 dark:hover:bg-slate-700">
                        <Trash className="text-sm text-muted-foreground h-4 w-4" />
                      </TooltipTrigger>
                      <TooltipContent className="py-0.5">
                        <p>Delete permanently</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </ConfirmModel>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
