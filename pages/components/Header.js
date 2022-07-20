import React, { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import logo from "/public/images/pp_final_icon_black.png";
import { useRouter } from "next/router";
import Head from "next/head";
import { useTheme } from "next-themes";

export default function Header({ displayCreate, handleSidebar }) {
  const router = useRouter();
  const { theme, setTheme } = useTheme("dark");
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="text-left w-full">
      <Head>
        <title>PulseChainProjects.io</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.cdnfonts.com/css/gordita" rel="stylesheet" />
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
              <button
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                Toggle to {theme === "light" ? "Dark" : "Light"}
              </button>
              <button
                onClick={() => handleSidebar()}
                className="p-4 rounded-lg focus:outline-none  md:hidden"
              >
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
