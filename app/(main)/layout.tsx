"use client";
import { Spinner } from "@/components/spinner";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { Navigation } from "./_components/navigation";

const Layout = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="h-full my-64 flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return redirect("/");
  }

  return (
    <div className="flex h-full">
        <Navigation />
      <main className="flex-1 h-screen overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;