import React, { Fragment } from "react";
import Image from "next/image";
import logo from "/public/images/pp_final_icon_black.png";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Header() {
  const router = useRouter();

  return (
    <div className="text-left w-full">
      <nav className="flex items-center justify-between flex-wrap bg-teal-500">
        <div className="flex items-center flex-shrink-0 mr-6">
          <a
            className="flex items-center cursor-pointer"
            onClick={() => router.push("/")}
          >
            <Image
              alt="logo"
              width={50}
              height={50}
              className="rounded-t-lg"
              src={logo}
            />
            <p className="font-bold">PulseChainProjects.io</p>
          </a>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm flex-grow"></div>
          <div>
            <button
              onClick={() => router.push("/createDapp")}
              className="cursor-pointer sub-header-button inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
            >
              Submit DApp
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
