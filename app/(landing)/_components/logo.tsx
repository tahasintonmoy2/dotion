import React from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

const Logo = () => {
  return (
    <div className="hidden md:flex items-center gap-x-2">
      <Image src="/dotion.png" alt="" height={40} width={40} />
      <p className={cn("font-semibold", font)}>
        Dotion
      </p>
    </div>
  );
};

export default Logo;
