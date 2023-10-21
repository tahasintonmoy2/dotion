"use client"

import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useMutation } from 'convex/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { ConfirmModel } from "@/components/models/confirm-model";
import { toast } from 'sonner'

interface BannerPrpos {
    documentId: Id<"documents">
}

const Banner = ({
    documentId
}: BannerPrpos) => {
    const router = useRouter()

    const remove = useMutation(api.documents.remove)
    const restore= useMutation(api.documents.restore)

    const onRemove = () => {
        const promise = remove({ id: documentId })
        
        toast.promise(promise, {
          loading: "Deleting a note...",
          success: "Note deleted permanently",
          error: "Failed to deleted a note",
        });

        router.push('/documents')
    }

    const onRestore = () => {
        const promise = restore({ id: documentId });

        toast.promise(promise, {
          loading: "Restoring a note...",
          success: "Note restored successfully",
          error: "Failed to restore a note",
        });
    }

  return (
    <div className='w-full bg-red-600 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center'>
        <p>
            This page in the trash
        </p>

        <Button 
          variant='outline' 
          onClick={onRestore}
          size='sm'
          className='border-white bg-transparent hover:bg-primary/5 text-white hover:bg-white dark:hover:text-black'
        >
            Restore the page?
        </Button>     
        
        <ConfirmModel onConfirm={onRemove}>
          <Button 
            variant='outline'
            size='sm'
            className='border-white bg-transparent hover:bg-primary/5 text-white hover:bg-white dark:hover:text-black'
          >
              Delete forever?
          </Button>
        </ConfirmModel>
    </div>
  )
}

export default Banner