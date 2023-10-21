"use client"
import useScrollTop from '@/hooks/use-scroll-top'
import { cn } from '@/lib/utils';
import React from 'react'
import Logo from './logo';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/model-toggle';
import { useConvexAuth } from 'convex/react';
import { SignInButton, UserButton } from '@clerk/clerk-react';
import { Spinner } from '@/components/spinner';
import Link from 'next/link';

const Navbar = () => {
    const {isAuthenticated, isLoading} = useConvexAuth();
    const scrolled = useScrollTop();

  return (
    <div className={cn(
        "z-50 bg-background dark:bg-[#0f111a] fixed top-0 flex items-center w-full p-6",
        scrolled && "border-b shadow-sm"
    )}>
        <Logo/>
        <div className='md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2'>
             {isLoading && (
               <Spinner/>
             )}
             {!isAuthenticated && !isLoading && (
                <>
                  <SignInButton mode='modal'>
                    <Button variant='ghost'>
                      Login
                    </Button>
                  </SignInButton>                  
                  
                  <SignInButton mode='modal'>
                    <Button className='mr-2'>
                      Get Free Dotion
                    </Button>
                  </SignInButton>
                </>
             )}
             {isAuthenticated && !isLoading && (
              <>
               <UserButton afterSignOutUrl='/'/>
               <Button asChild className='hidden md:block'>
               <Link href='/documents'>
                  Go to documents
               </Link>
               </Button>
              </>
             )}
            <ModeToggle/>
        </div>
    </div>
  )
}

export default Navbar