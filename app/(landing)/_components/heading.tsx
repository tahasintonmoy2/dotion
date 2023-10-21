"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { ArrowRight } from "lucide-react";
import { useConvexAuth } from "convex/react";
import { Spinner } from "@/components/spinner";
import { SignInButton } from "@clerk/clerk-react";
import Link from "next/link";

const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div className="max-w-3xl space-y-4">
      <div>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
          Your Ideas, Documents, & Plans. Unified. Welcome to{" "}
          <span className="underline">Dotion</span>
        </h1>
        <h3 className="text-base sm:text-xl py-3 md:text-2xl font-medium">
          Dotion is the connected workspace where <br />
          better, faster work happens.
        </h3>
        {isLoading && (
          <>
            <div className="flex justify-center items-center w-full">
              <Spinner size="lg" />
            </div>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <Button asChild>
            <Link href="/documents">
              Enter Dotion
            </Link>
          </Button>
        )}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
              <Button className="mr-2">
                Start your free trial
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </SignInButton>
          </>
        )}
      </div>
    </div>
  );
};

export default Heading;
