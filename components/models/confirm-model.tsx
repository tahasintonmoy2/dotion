"use client"

import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

interface ConfirmModelProps {
  children: React.ReactNode;
  onConfirm:() => void;
}

export const ConfirmModel = ({
  children,
  onConfirm,
}: ConfirmModelProps) => {
  const handleConfirm = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) =>{
    e.stopPropagation();
    onConfirm();
  }

  return (
    <>
    <AlertDialog>
      <AlertDialogTrigger asChild onClick={(e)=> e.stopPropagation()}>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            documents and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={e => e.stopPropagation()}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} className='bg-red-600 hover:bg-red-300 dark:text-white'>
              Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
  )
}