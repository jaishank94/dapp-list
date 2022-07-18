import React, { Fragment } from "react";
import Image from "next/image";
import logo from "/public/images/pp_final_icon_black.png";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Header({ displayCreate }) {
  const router = useRouter();

  return (
    <div className="text-left w-full">
      <Head>
        <title>PulseChainProjects.io</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="http://fonts.cdnfonts.com/css/gordita" rel="stylesheet" />
      </Head>
      <nav className="flex w-full">
        <div className="flex justify-between w-full items-center">
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
            <p className="font-bold hidden sm:block">PulseChainProjects.io</p>
          </a>
          {displayCreate && (
            <div className="">
              <button
                onClick={() => router.push("/createDapp")}
                className="cursor-pointer shadow-md sub-header-button inline-block text-sm px-4 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white lg:mt-0"
              >
                Submit DApp
              </button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
