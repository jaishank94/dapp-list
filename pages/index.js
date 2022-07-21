import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import logoWhite from "/public/images/pp_final_icon_white.png";

export default function index() {
  const router = useRouter();

  return (
    <div className="w-screen h-screen flex home-img flex-1 flex-col items-center p-4 lg:p-16">
      <Head>
        <title>PulseChainProjects.io</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.cdnfonts.com/css/gordita" rel="stylesheet" />
      </Head>
      <div className="w-full p-4 ">
        <a
          className="flex items-center cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Image
            alt="logo"
            width={40}
            height={40}
            className="rounded-t-lg"
            src={logoWhite}
          />
          <p className="font-bold text-white px-2">PulseChainProjects.io</p>
        </a>
      </div>

      <div className="w-full">
        <h1 className="text-5xl font-bold text-white drop-shadow-lg shadow-black pt-14 px-4">
          Discover the next big <br />
          project on PulseChain
        </h1>
        <ul className="list-disc text-white font-normal px-4 pt-8">
          <li className="py-4">
            DISCLAIMER: DYOR, this site is user generated content.
          </li>
          <li className="py-4">
            Create a project in less than 2 minutes, be detailed to insure best
            user experience.
          </li>
          <li className="py-4">
            Make sure you verify before you invest in ANY project. Due your due
            diligence.
          </li>
        </ul>
      </div>
      <div className="w-full flex p-4">
        <div
          className="text-white rounded-3xl"
          // style={{ backgroundColor: "#5a5a5a1a" }}
        >
          <div className="p-4 shadow">
            <p className="text-xl font-bold">234</p>
            <p className="text-xs pt-1 font-bold text-gray-100">DApps</p>
          </div>
        </div>
        <div
          className="text-white mx-5 rounded-3xl"
          // style={{ backgroundColor: "#5a5a5a1a" }}
        >
          <div className="p-4 shadow">
            <p className="text-xl font-bold">1231231</p>
            <p className="text-xs pt-1 font-bold text-gray-100">Visitors</p>
          </div>
        </div>
      </div>
      <div className="w-full p-4">
        <button
          className="rounded-full bg-white p-2 shadow-lg cursor-pointer"
          onClick={() => router.push("/dapps")}
        >
          <span className="link uppercase p-2  text-2xl">Explore Projects</span>
        </button>
      </div>
    </div>
  );
}
