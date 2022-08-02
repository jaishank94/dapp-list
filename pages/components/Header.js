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
import { BiMenuAltRight } from "react-icons/bi";
import { useMoralis } from "react-moralis";
import Sidebar from "./Sidebar";
import Link from "next/link";
import howToPulse from "/public/images/howToPulse.png";

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
      <div className="flex justify-center bg-black text-white w-full p-2">
        <p className="items-center text-center">
          🎉 FROM THE CREATORS OF
          <span className="px-2">
            <Image src={howToPulse} width={50} height={25} />
          </span>
          PULSECHAIN PROJECT DIRECTORY, INSIGHTS AND ANALYTICS 🎉
        </p>
      </div>
      <header className="flex justify-between p-4 max-w-7xl mx-auto bg-[#EDF1F4] dark:bg-neutral-800">
        <Head>
          <title>Pulsechain Projects</title>
          <link rel="icon" href="/favicon.ico" />
          <link
            href="https://fonts.cdnfonts.com/css/gordita"
            rel="stylesheet"
          />
        </Head>
        <Link className="" href="/">
          <div className="flex items-center cursor-pointer">
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
          </div>
        </Link>

        <div className="flex items-center space-x-5">
          <Link href="/createDapp" className="">
            <div className="cursor-pointer rounded-full p-2 font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-sm text-white">
              Submit DApp
            </div>
          </Link>
          {!isAuthenticated ? (
            <button
              className={`rounded-full ${
                theme === "light" ? "bg-white" : "bg-neutral-700"
              } cursor-pointer md:rounded-full`}
              onClick={authenticate}
            >
              <span className="p-2 hidden text-sm md:block text-transparent font-bold bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                Connect Wallet
              </span>
              <span className="md:hidden">
                <BsWallet2 className="h-5 w-5" />
              </span>
            </button>
          ) : (
            <button
              className={`rounded-lg ${
                theme === "light" ? "bg-white" : "bg-neutral-700"
              } cursor-pointer mx-2 md:rounded-full`}
              onClick={logout}
            >
              <span className="p-2 hidden text-sm md:block text-transparent font-bold bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Logout</span>
              <span className="md:hidden">
                <BsPower className="h-5 w-5" />
              </span>
            </button>
          )}
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="cursor-pointer border p-2 rounded-full m-1 border-slate-200 dark:border-neutral-900"
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
              className="focus:outline-none  md:hidden border p-2 rounded-full m-1 border-slate-200 dark:border-neutral-900"
            >
              <BiMenuAltRight className="h-5 w-5" />
            </button>
          )}
        </div>
        <Sidebar isOpen={isOpen} />
      </header>
    </>
  );
}
