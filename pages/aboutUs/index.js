import React, { Fragment } from "react";
import Header from "../components/Header";
import { useRouter } from "next/router";
import logo from "/public/images/pp_final_icon_black.png";
import Image from "next/image";

export default function index() {
  const router = useRouter();

  return (
    <Fragment>
      <div className="relative overflow-hidden">
        <div className="w-full border-b-2 border-slate-300 py-2 mb-0">
          <div className="container mx-auto">
            <div className="relative z-10 bg-transparent">
              <div className="relative">
                <Header displayCreate={false} />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white w-full mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-6 px-16 md:justify-center md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1"></div>
          </div>
        </div>
      </div>
      <>
        <div className="component-app-detail">
          <div
            className="bg-[#c6c6e4] regal-voilet rounded-3xl"
            style={{ backgroundColor: "#c6c6e4" }}
          >
            <div className="card-header flex">
              <div className="flex-none w-14 h-14 card-icon">
                <div className="menuActive rounded-lg">
                  <Image
                    alt="logo"
                    width={150}
                    height={150}
                    className="rounded-t-lg"
                    src={logo}
                  />
                </div>
              </div>
              <div className="flex-initial p-5 app-detail">
                <div className="justify-center">
                  <h5 className="font-bold app-name">PulseChainProjects.io</h5>
                  <p className="text-gray-500 font-medium mt-2">
                    Directory of all the projects launching on PulseChain
                  </p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-gray-500 font-normal p-16">
                PulseChainProjects.io is an open source tool built by the
                HowToPulse.com team. Create a FREE listing in less than 5 mins.
                For the communities safety we will approve all listing before
                deploying them to the site.
                <br />
                <br />
                We are dedicated to providing the
                most up to date information on all projects planning on
                launching.
              </p>
            </div>
            {/* <div
              style={{ alignItems: "center" }}
              className="card-header flex flex-col text-xl justify-center"
            >
              <p className="font-bold my-2">Request Removal</p>
              <p className="font-normal text-gray-500 text-sm">
                Remove your project from our website
              </p>
            </div> */}
          </div>
        </div>
      </>
    </Fragment>
  );
}
