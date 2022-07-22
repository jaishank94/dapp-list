import React, { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import blackLogo from "/public/images/pp_final_icon_black.png";
import whiteLogo from "/public/images/pp_final_icon_white.png";

import { useRouter } from "next/router";
import Head from "next/head";
import { useTheme } from "next-themes";
import {
  BsFillMoonFill,
  BsFillSunFill,
  BsWallet2,
  BsWallet,
  BsPower,
  BsMenuApp,
} from "react-icons/bs";
import { useMoralis } from "react-moralis";
import Sidebar from "./Sidebar";

export default function Header({ displayCreate }) {
  const router = useRouter();
  const { authenticate, isAuthenticated, user, isInitialized, logout } =
    useMoralis();

  const { theme, setTheme } = useTheme("dark");
  const [isMounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {}, [isAuthenticated, isInitialized]);

  const handleSidebar = () => {
    setIsOpen(!isOpen);
  };

  if (!isMounted) return null;

  return (
    <>
      <div className="container mx-auto">
        <div className="relative z-10 bg-transparent">
          <div className="relative">
            <div className="text-left w-full">
              <Head>
                <title>PulseChainProjects.io</title>
                <link rel="icon" href="/favicon.ico" />
                <link
                  href="https://fonts.cdnfonts.com/css/gordita"
                  rel="stylesheet"
                />
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
                    <p className="font-bold hidden sm:block ml-1">
                      PulseChainProjects.io
                    </p>
                  </a>

                  <div className="flex items-center">
                    <button
                      onClick={() => router.push("/createDapp")}
                      className="cursor-pointer md:block shadow-md sub-header-button inline-block text-sm px-4 leading-none rounded text-white  hover:text-teal-500 lg:mt-0"
                    >
                      Submit DApp
                    </button>
                    {!isAuthenticated ? (
                      <button
                        className={`rounded-lg ${
                          theme === "light" ? "bg-white" : "bg-gray-800"
                        } px-4 h-12 shadow-lg cursor-pointer mx-2 md:rounded-full`}
                        onClick={authenticate}
                      >
                        <span className="link p-2 hidden text-xs md:block">
                          Connect Wallet
                        </span>
                        <span className="md:hidden">
                          <BsWallet2 className="h-5 w-5" />
                        </span>
                      </button>
                    ) : (
                      <button
                        className={`rounded-lg ${
                          theme === "light" ? "bg-white" : "bg-gray-800"
                        } px-4 h-12 shadow-lg cursor-pointer mx-2 md:rounded-full`}
                        onClick={logout}
                      >
                        <span className="link p-1 hidden text-xs md:block">
                          Logout
                        </span>
                        <span className="md:hidden">
                          <BsPower className="h-5 w-5" />
                        </span>
                      </button>
                    )}
                    <button
                      onClick={() =>
                        setTheme(theme === "light" ? "dark" : "light")
                      }
                      className="cursor-pointer border-2 p-2 rounded-lg m-1"
                    >
                      {theme === "light" ? (
                        <BsFillMoonFill className="h-5 w-5" />
                      ) : (
                        <BsFillSunFill className="h-5 w-5" />
                      )}
                    </button>
                    {displayCreate && (
                      <button
                        onClick={() => handleSidebar()}
                        className="p-4 rounded-lg focus:outline-none  md:hidden"
                      >
                        <BsMenuApp className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <Sidebar isOpen={isOpen} />
    </>
  );
}
