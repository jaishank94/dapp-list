import React, { Fragment, useEffect, useState } from "react";
import Header from "../components/Header";
import { useRouter } from "next/router";
import blackLogo from "/public/images/pp_final_icon_black.png";
import whiteLogo from "/public/images/pp_final_icon_white.png";
import Image from "next/image";
import { useTheme } from "next-themes";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import Footer from "../components/Footer";


export default function index() {
  const router = useRouter();
  const { theme, setTheme } = useTheme("dark");
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isMounted) return null;

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
        <div className="w-full mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-6 px-16 md:justify-center md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1"></div>
          </div>
        </div>
      </div>
      <>
        <div className="flex flex-col justify-center items-center">
          <div
            className={`rounded-3xl ${
              theme === "light"
                ? "  border-2 drop-shadow-2xl"
                : "custom-shadow-black"
            }`}
          >
            <div className={`card-header flex border-b-2 ${theme==="light"?"border-gray-300":"border-gray-600"}`}>
              <div className="flex-none w-14 card-icon">
                <div className="menuActive rounded-lg p-4">
                  <Image
                    alt="logo"
                    width={120}
                    height={120}
                    className="rounded-t-lg"
                    src={whiteLogo}
                  />
                </div>
              </div>
              <div className="flex-initial px-5 py-4 xl:p-5 app-detail">
                <div className="justify-center">
                  <h5 className="font-bold app-name text-3xl">PulseChainProjects.io</h5>
                  <p className="text-gray-500 text-xs xl:text-bse font-medium mt-2">
                    Directory of all the projects launching on PulseChain
                  </p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-gray-500 font-normal p-16 text-justify ">
                PulseChainProjects.io is an open source tool built by the
                HowToPulse.com team. Create a FREE listing in less than 5 mins.
                For the communities safety we will approve all listing before
                deploying them to the site.
                <br />
                <br />
                We are dedicated to providing the most up to date information on
                all projects planning on launching.
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
          <div className="flex justify-center items-center my-16">
              {/* <div className="w-18"> */}
              <button
                onClick={() => router.push("/dapps")}
                className="flex item-center rounded-full shadow-2xl"
              >
                <BsFillArrowLeftCircleFill className="h-5 w-5 mx-2" />
                <p>Back to home</p>
              </button>
              {/* </div> */}
            </div>
        </div>
      </>
      <Footer/>
    </Fragment>
  );
}
