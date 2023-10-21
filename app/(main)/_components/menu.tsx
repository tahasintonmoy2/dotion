"use client";

import { Id } from "@/convex/_generated/dataModel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MenuProps {
  documentId: Id<"documents">;
}

import React from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { MoreVertical, Trash } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export const Menu = ({ documentId }: MenuProps) => {
  const router = useRouter();
  const { user } = useUser();

  const archive = useMutation(api.documents.archive);

  const onArchive = () => {
    const promise = archive({ id: documentId });

    toast.promise(promise, {
      loading: "Moving to trash...",
      success: "Note has moved to trash",
      error: "Failed to archive note",
    });

    router.push("/documents");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
         <Button size='sm' variant='ghost' className="">
            <MoreVertical className="h-4 w-4"/>
         </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
       className="w-60"
       align='start'
       forceMount
      >
        <DropdownMenuLabel>Delete</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onArchive}>
            <Trash className="h-4 w-4 mr-2"/>
            Delete Page
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="text-xs text-muted-foreground p-2">
            Last Edited by: {user?.fullName}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

Menu.Skeleton = function MenuSkeleton(){
    return (
        <Skeleton className='h-6 w-10 rounded-md'/>
    )
}