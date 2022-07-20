import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import logo from "/public/images/pp_final_icon_black.png";

export default function index() {
  const router = useRouter();

  return (
    <div className="w-screen h-screen flex home-img flex-1 flex-col items-center p-4 lg:p-16">
      <div className="w-full p-4 ">
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
          <p className="font-bold text-white">PulseChainProjects.io</p>
        </a>
      </div>

      <div className="w-full">
        <p className="text-4xl font-semibold text-white pt-14 px-4">
          Discover the next big project on PulseChain
        </p>
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
          className="bg-[#5a5a5a1a] text-white rounded-lg"
          style={{ backgroundColor: "#5a5a5a1a" }}
        >
          <div className="p-2 shadow">
            <p className="text-lg font-bold">234</p>
            <p className="text-xs">DApps</p>
          </div>
        </div>
        <div
          className="bg-[#5a5a5a1a] text-white mx-5 rounded-lg"
          style={{ backgroundColor: "#5a5a5a1a" }}
        >
          <div className="p-2 shadow">
            <p className="text-lg font-bold">1231231</p>
            <p className="text-xs">Visitors</p>
          </div>
        </div>
      </div>
      <div className="w-full p-4">
        <button
          className="rounded-full bg-white p-2 shadow-lg cursor-pointer"
          onClick={() => router.push("/dapps")}
        >
          <span className="link text-2xl">Explore Project</span>
        </button>
      </div>
    </div>
  );
}
