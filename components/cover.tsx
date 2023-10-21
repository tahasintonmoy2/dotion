"use client"

import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'
import { Button } from "@/components/ui/button";
import { ImageIcon, XIcon } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton'
import { useCoverImage } from '@/hooks/use-cover-image';
import { useParams } from 'next/navigation';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useEdgeStore } from '@/lib/edgestore';
import { toast } from 'sonner';
import { useMediaQuery } from 'usehooks-ts';

interface CoverProps {
    url?: string,
    preview?: boolean
}

export const Cover = ({
    url,
    preview
}: CoverProps) => {
  const {edgestore} = useEdgeStore()
  const params = useParams()
  const isMobile = useMediaQuery("(max-width: 768px)");
  const removeCoverImage = useMutation(api.documents.removeCoverImage)
  const coverImage = useCoverImage()

  const onRemove = async() => {
    const promise = removeCoverImage({ id: params.documentId as Id<"documents">  });

    toast.promise(promise, {
      loading: "Deleting a cover image...",
      success: "Cover Image deleted",
      error: "Failed to deleted cover image",
    });

    if (url) {
      await edgestore.publicFiles.delete({
        url: url,
      })
    }
    removeCoverImage({
      id: params.documentId as Id<"documents">
    })
  }

  return (
    <div className={cn(
        "relative w-full h-[45vh] group",
        !url && "h-[12vh]",
        url && "bg-muted",
    )}>
        {!!url && (
            <Image 
              alt='Cover'
              src={url}
              fill
              className='object-cover'
            />
        )}
        {url && !preview && (
            <div className={cn(
              'opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2',
               isMobile && 'opacity-100'
              )}>
                <Button
                  onClick={()=> coverImage.onReplace(url)}
                  variant='outline'
                  size='sm'
                  className='text-muted-foreground text-xs'
                >
                    <ImageIcon className='h-4 w-4 mr-2'/>
                    Replace Cover Image
                </Button>                
                <Button
                  onClick={onRemove}
                  variant='outline'
                  size='sm'
                  className='text-muted-foreground text-xs'
                >
                    <XIcon className='h-4 w-4 mr-2'/>
                    Remove Cover Image
                </Button>
            </div>
        )}
    </div>
  )
}

Cover.Skeleton = function CoverSkeleton() {
  <Skeleton className='w-full h-[12vh]'/>
}