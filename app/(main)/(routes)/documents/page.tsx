"use client";

import { Button } from "@/components/ui/button";
import { ChevronsLeft, PlusCircle } from "lucide-react";
import Image from "next/image";
import { useUser } from "@clerk/clerk-react";
import {toast} from 'sonner';
import {useMutation} from 'convex/react';
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";

const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { user } = useUser();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const create = useMutation(api.documents.create)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter()

  const onCreate = () => {
    const promise = create({title:"Untitled"})
        .then((documentId)=> router.push(`/documents/${documentId}`))

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "Note created successfully",
      error: "Failed to created a new note"
    })
  }

  return (
    <>
      <div className="h-full flex flex-col items-center justify-center space-y-4">
        <Image
          src="/empty_folder_illustration.svg"
          height={300}
          width={300}
          alt=""
        />
        <p className="font-semibold">Welcome {user?.firstName} to Dotion</p>
        <Button onClick={onCreate}>
          <PlusCircle className="h-5 w-5 mr-2" />
          Create a new note
        </Button>
      </div>
    </>
  );
};

export default page;
