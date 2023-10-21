"use client"
import React from 'react'
import {LucideIcon, ChevronDown, ChevronRight, Plus, MoreHorizontal, Trash} from 'lucide-react';
import {Skeleton} from '@/components/ui/skeleton'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Id } from '@/convex/_generated/dataModel';
import { cn } from '@/lib/utils';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useMediaQuery } from 'usehooks-ts';
import { useUser } from '@clerk/clerk-react';

interface ItemProps {
    id?: Id<"documents">;
    documentIcon?: string;
    active?: boolean;
    expanded?: boolean;
    isSearch?: boolean;
    level?: number;
    onExpand?: ()=>void;
    label: string;
    onClick?: () => void;
    icon: LucideIcon;
}


export const Item = ({
    id,
    label,
    onClick,
    icon:Icon,
    active,
    documentIcon,
    isSearch,
    level = 0,
    expanded,
    onExpand,
}:ItemProps) => {
    const router = useRouter()
    const isMobile = useMediaQuery("(max-width: 768px)");

    const create = useMutation(api.documents.create)
    const archive = useMutation(api.documents.archive)

    const onArchive = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    )=>{
        event.stopPropagation();
        if (!id) return;
        const promise = archive({ id })

        toast.promise(promise, {
            loading: "Moving to trash...",
            success: "Note moved to trash",
            error: "Failed archive to trash"
        })
    }

    const { user } = useUser();

    const onCreate = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) =>{
        event.stopPropagation();
        if (!id) return;
        const promise = create({ title:"Untitled", parentDocument: id})
        .then((documentId)=>{
            if(!expanded){
                onExpand?.();
            }
             router.push(`/documents/${documentId}`)

            toast.promise(promise, {
              loading: "Creating a new note...",
              success: "Note created successfully",
              error: "Failed to created a new note"
            })
        })
    }

    const handleExpand = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    )=>{
        event.stopPropagation();
        onExpand?.();
    }
    const ChevronIcon = expanded ? ChevronDown : ChevronRight;

  return (
    <div
        onClick={onClick}
        role='button'
        style={{
            paddingLeft: level ? `${level * 12 + 25}` : "12px"
        }}
        className={cn(
            'group min-h-[27px] flex items-center text-sm cursor-pointer py-1 pr-3 w-full hover:bg-primary/5 text-muted-foreground font-medium',
            active && "bg-primary/5 text-primary"
        )}
    >
        {!!id && (
            <div
             role='button'
             style={{
                paddingLeft: level ? `${(level * 12) + 25}px` : "12px",
             }}
             onClick={handleExpand}
            >
                <ChevronIcon 
                  className='h-5 w-5 shrink-0 text-muted-foreground/50'
                />
            </div>
        )}
        {documentIcon ? (
            <div className='shrink-0 mr-2 text-[18px]'>
                {documentIcon}
            </div>
        ): (
            <Icon className='shrink-0 h-[18px] mr-2 text-muted-foreground'/>
        )}
        <span className='truncate'>
          {label}
        </span>
        {isSearch && (
            <kbd className='ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground'>
                <span className='text-xs'>CTRL</span>
                <span className='text-xs'>K</span>
            </kbd>
        )}
        {!!id && (
            <div className='ml-auto flex items-center gap-x-2'>
                <DropdownMenu>
                    <DropdownMenuTrigger
                     onClick={(e) => e.stopPropagation()}
                     asChild
                    >
                        <div
                          className={cn(
                            'opacity-0 group-hover:opacity-100 py-0.5 px-0.5 hover:bg-slate-300 dark:hover:bg-slate-700 rounded-sm h-full ml-auto',
                            isMobile && "opacity-100"
                            )
                        }
                        >
                            <MoreHorizontal className='h-4 w-4 text-muted-foreground'/>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-60"
                      align='start'
                      side='right'
                      forceMount
                    >
                        <DropdownMenuItem onClick={onCreate}>
                            <Plus className='h-4 w-4 mr-2'/>
                            Add New Note
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={onArchive}>
                            <Trash className='h-4 w-4 mr-2'/>
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        )}
    </div>
  )
}

// eslint-disable-next-line react/display-name
Item.Skeleton = function ItemSkeleton({level}: {level?: number}){
    return (
        <div
         style={{
            paddingLeft: level ? `${(level * 12) + 25}px` : "12px",
         }}
         className='flex gap-x-2 py-[3px]'
        >
            <Skeleton className='h-4 w-4'/>
            <Skeleton className='h-4 w-[30%]'/>
        </div>
    )
}

