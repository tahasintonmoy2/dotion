import React from "react";
import Logo from "./logo";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="flex items-center dark:bg-[#020817] w-full p-6 bg-background z-50">
      <Logo />
      <div className="md:ml-auto w-full justify-between md:justify-end font-semibold flex items-center gap-x-2 text-blue-600">
        <Link href="/privacy-policy">
            Privacy Policy
        </Link>
      </div>
    </div>
  );
};

export default Footer;
