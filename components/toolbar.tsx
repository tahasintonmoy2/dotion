"use client"

import { Doc } from '@/convex/_generated/dataModel'
import React, {useRef, useState, ElementRef} from 'react'
import { IconPicker } from './icon-picker';
import { Button } from "@/components/ui/button";
import { MdClose } from "react-icons/md";
import { ImageIcon, Smile } from 'lucide-react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import TextareaAutosize from 'react-textarea-autosize';
import { useCoverImage } from '@/hooks/use-cover-image';
import { cn } from '@/lib/utils';
import { useMediaQuery } from 'usehooks-ts';

interface ToolbarProps {
    initialData: Doc<"documents">;
    preview?: boolean
}

export const Toolbar = ({
    initialData,
    preview
}: ToolbarProps) => {
    const inputRef = useRef<ElementRef<"textarea">>(null)
    const [isEditing, setIsEditing] = useState(false)
    const [value, setValue] = useState(initialData.title)
    const isMobile = useMediaQuery("(max-width: 768px)");

    const coverImage = useCoverImage()

    const update = useMutation(api.documents.update)
    const removeIcon = useMutation(api.documents.removeIcon)

    const enableInput = () =>{
        if (preview) return;

        setIsEditing(true)
        setTimeout(() => {
            setValue(initialData.title);
            inputRef.current?.focus();
        }, 0)
    }

    const disableInput = () => setIsEditing(false);

    const onInput = (value: string) =>{
        setValue(value)
        update({
            id: initialData._id,
            title: value || "Untitled"
        })
    }

    
    const onKeyDown = (
        event: React.KeyboardEvent<HTMLTextAreaElement>
    ) => {
        if (event.key === "Enter") {
            event.preventDefault();
            disableInput();
        }
    }
    
    const onIconSelect = (icon: string) => {
        update({
            id: initialData._id,
            icon,
        })
    }

    const onRemoveIcon = () => {
        removeIcon({
            id: initialData._id,
        })
    }

  return (
    <div className='group relative'>
        {!!initialData.icon && !preview && (
            <div className='flex items-center gap-x-2 group/icon pt-6'>
                <IconPicker onChange={onIconSelect}>
                    <p className='text-5xl hover:opacity-75 transition'>
                        {initialData.icon}
                    </p>
                </IconPicker>
                <Button
                 variant='outline'
                 size='icon'
                 onClick={onRemoveIcon}
                 className={cn(
                    'rounded-full opacity-0 group-hover/icon:opacity-100 transition-all text-muted-foreground text-xs',
                    isMobile && 'opacity-100'
                )}
                >
                    <MdClose size={20}/>
                </Button>
            </div>
        )}
        {!!initialData.icon && preview && (
            <p className='text-5xl pt-6'>
                {initialData.icon}
            </p>
        )}
        <div className={cn(
            'opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4',
            isMobile && 'opacity-100'
        )}>
            {!initialData.icon && !preview && (
                <IconPicker asChild onChange={onIconSelect}>
                    <Button
                        className='text-muted-foreground text-xs mx-10'
                        variant='outline'
                        size='sm'
                    >
                        <Smile className='h-4 w-4 mr-2'/>
                        Add Icon
                    </Button>
                </IconPicker>
            )}            
            {!initialData.coverImage && !preview && (
                    <Button
                        className='text-muted-foreground text-xs'
                        variant='outline'
                        onClick={coverImage.onOpen}
                        size='sm'
                    >
                        <ImageIcon className='h-4 w-4 mr-2'/>
                        Add Cover Image
                    </Button>
            )}
        </div>
        {isEditing && !preview ? (
            <TextareaAutosize
                ref={inputRef}
                onBlur={disableInput}
                onKeyDown={onKeyDown}
                value={initialData.title}
                onChange={(e)=> onInput(e.target.value)}
                className='text-5xl mx-10 bg-transparent font-bold break-words outline-none text-[#0f111a] dark:text-[#CFCFCF] resize-none'
            />
        ): (
            <div
             onClick={enableInput}
             className='pb-[11.5px] mx-10 text-5xl font-bold break-words outline-none text-[#0f111a] dark:text-[#CFCFCF]'
            >
             {initialData.title}
            </div>
        )}
    </div>
  )
}