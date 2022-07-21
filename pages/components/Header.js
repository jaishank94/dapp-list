import React, { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import blackLogo from "/public/images/pp_final_icon_black.png";
import whiteLogo from "/public/images/pp_final_icon_white.png";

import { useRouter } from "next/router";
import Head from "next/head";
import { useTheme } from "next-themes";
import { BsFillMoonFill, BsFillSunFill, BsWallet2, BsWallet, BsPower } from "react-icons/bs";
import { useMoralis } from "react-moralis";

export default function Header({ displayCreate, handleSidebar }) {
  const router = useRouter();
  const { authenticate, isAuthenticated, user, isInitialized, logout } =
    useMoralis();

  const { theme, setTheme } = useTheme("dark");
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => { }, [isAuthenticated, isInitialized]);

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
              src={theme === "light" ? blackLogo : whiteLogo}
            />
            <p className="font-bold hidden sm:block ml-1">PulseChainProjects.io</p>
          </a>
          {displayCreate && (
            <div className="flex items-center">
              <button
                onClick={() => router.push("/createDapp")}
                className="cursor-pointer hidden md:block shadow-md sub-header-button inline-block text-sm px-4 leading-none rounded text-white  hover:text-teal-500 lg:mt-0"
              >
                Submit DApp
              </button>
              {!isAuthenticated ? (
                <button
                  className={`rounded-lg ${theme === "light" ? "bg-white" : "bg-gray-800"} px-4 h-12 shadow-lg cursor-pointer mx-2 md:rounded-full`}
                  onClick={authenticate}
                >
                  <span className="link p-2 hidden text-xs md:block">Connect Wallet</span>
                  <span className="md:hidden"><BsWallet2 className="h-5 w-5" /></span>
                </button>
              ) : (
                <button
                  className={`rounded-lg ${theme === "light" ? "bg-white" : "bg-gray-800"} px-4 h-12 shadow-lg cursor-pointer mx-2 md:rounded-full`}
                  onClick={logout}
                >
                  <span className="link p-1 hidden text-xs md:block">Logout</span>
                  <span className="md:hidden"><BsPower className="h-5 w-5" /></span>

                </button>
              )}
              <button
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="cursor-pointer border-2 p-2 rounded-lg m-1"
              >
                {theme === "light" ? (
                  <BsFillMoonFill className="h-5 w-5" />
                ) : (
                  <BsFillSunFill className="h-5 w-5" />
                )}
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
