"use client";
import React from "react";
import { ChevronsLeftRightIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser, SignOutButton } from "@clerk/clerk-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const UserItem = () => {
  const { user } = useUser();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center text-sm p-3 w-full hover:bg-primary/5">
            <div className="gap-x-2 flex items-center max-w-[150px]">
              <Avatar className="h-8 w-8 cursor-pointer">
                <AvatarImage src={user?.imageUrl} />
              </Avatar>
              <span className="text-start font-medium line-clamp-1">
                {user?.fullName}
              </span>
            </div>
            <ChevronsLeftRightIcon className="rotate-90 cursor-pointer ml-5 text-muted-foreground h-5 w-5" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-80"
          align="start"
          alignOffset={11}
          forceMount
        >
          <div className="flex flex-col space-y-4 p-2">
            <div className="flex items-center">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.imageUrl} />
              </Avatar>
              <p className="text-xs ml-3 font-medium leading-none text-muted-foreground">
                {user?.fullName}
              </p>
            </div>
            <p className="text-xs font-medium leading-none text-muted-foreground">
              {user?.emailAddresses[0].emailAddress}
            </p>
          </div>
        <DropdownMenuSeparator/>
        <DropdownMenuItem asChild className="w-full text-muted-foreground cursor-pointer">
            <SignOutButton>
                Log Out
            </SignOutButton>
        </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserItem;
