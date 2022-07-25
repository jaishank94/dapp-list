import React, { Fragment, useEffect, useState } from "react";
import Header from "../components/Header";
import { useRouter } from "next/router";
import blackLogo from "/public/images/pp_final_icon_black.png";
import whiteLogo from "/public/images/pp_final_icon_white.png";
import Image from "next/image";
import { useTheme } from "next-themes";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import Footer from "../components/Footer";
import Link from "next/link";

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
      <div className="h-screen">

        <div className="">
          <div
            className={`w-full ${
              theme === "light" ? "border-b-2" : "border-b-0"
            } border-slate-300 mb-5`}
          >
            <Header displayCreate={false} />
          </div>
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="max-w-7xl mx-auto px-4 md:px-28">
            <div
              className={`rounded-3xl border-2  shadow-2xl ${
                theme === "light"
                  ? " border-slate-100 shadow-slate-300"
                  : " border-neutral-800 shadow-neutral-800"
              }`}
            >
              <div
                className={`flex rounded-3xl shadow-2xl  ${
                  theme === "light"
                    ? "border-slate-100 shadow-slate-300"
                    : "border-neutral-800 shadow-neutral-800 bg-neutral-800"
                }`}
              >
                <div className="relative h-32 w-32">
                  <div className="absolute inset-0 rounded-xl object-fill bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg">
                    <Image
                      alt="logo"
                      width={120}
                      height={120}
                      className="rounded-lg h-32 w-32 object-fill"
                      src={whiteLogo}
                    />
                  </div>
                </div>
                <div className="flex-initial px-5 xl:p-5">
                  <div className="py-4">
                    <h5 className="font-bold text-3xl">
                      PulseChainProjects.io
                    </h5>
                    <p className="text-gray-500 text-sm">
                      Directory of all the projects launching on PulseChain
                    </p>
                  </div>
                </div>
              </div>
              {/* <div class="grid grid-cols-3 justify-between divide-x py-8">
                <div className="flex flex-col items-center justify-center">
                  <div>
                    <p className="text-gray-500">Status</p>
                  </div>
                  <div className="mt-2">
                    <p
                      className={`p-1 px-1 flex items-center text-lg justify-center text-xs font-semibold rounded-full truncate ${
                        theme === "light"
                          ? "bg-black text-white"
                          : "bg-white text-black"
                      }`}
                    >
                      {dappInfo.app_status}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <div>
                    <p className="text-gray-500">Page Views</p>
                  </div>
                  <div className="flex mt-2">
                    <span className="text-lg font-semibold">
                      {dappInfo.page_views ? dappInfo.page_views : "0"}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <div>
                    <p className="text-gray-500">Ticker</p>
                  </div>
                  <div className="mt-2">
                    <p className="text-lg font-semibold uppercase">
                      {dappInfo.ticker ? dappInfo.ticker : "_"}
                    </p>
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-3 divide-x py-8">
                <div className="flex flex-col items-center justify-center">
                  <div>
                    <p className="text-gray-500">Sacrifice</p>
                  </div>
                  <div className="mt-2">
                    <p className="text-lg font-semibold uppercase">
                      {dappInfo.sacrifice ? dappInfo.sacrifice : "_"}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <div>
                    <p className="text-gray-500">Total Supply</p>
                  </div>
                  <div className="mt-2">
                    <p className="text-lg font-semibold uppercase">
                      {dappInfo.total_supply ? dappInfo.total_supply : "_"}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <div>
                    <p className="text-gray-500">Vote</p>
                  </div>
                  <div className="mt-2 flex text-center cursor-pointer justify-center space-x-2">
                    <div className="grid grid-cols-2">
                      <div className="flex justify-center p-5">
                        <button
                          className="text-center"
                          disabled={isDisabled}
                          onClick={(e) => {
                            e.preventDefault();
                            isAuthenticated
                              ? handleReaction(true)
                              : authenticate();
                          }}
                        >
                          {like ? (
                            <BsHandThumbsUpFill
                              className="h-5 w-5"
                              color="blueviolet"
                            />
                          ) : (
                            <BsHandThumbsUp
                              className="h-5 w-5"
                              color="blueviolet"
                            />
                          )}
                        </button>
                        <div className="ml-2">
                          <span className="text-transparent font-semibold bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                            {likeCount}
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-center p-5">
                        <button
                          className="text-center"
                          disabled={isDisabled}
                          onClick={(e) => {
                            e.preventDefault();
                            isAuthenticated
                              ? handleReaction(false)
                              : authenticate();
                          }}
                        >
                          {dislike ? (
                            <BsHandThumbsDownFill className="h-5 w-5" />
                          ) : (
                            <BsHandThumbsDown className="h-5 w-5" />
                          )}
                        </button>
                        <div className="ml-2">
                          <span className="font-semibold">{dislikeCount}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 divide-x py-8">
                <div className="flex flex-col items-center">
                  <div>
                    <p className="text-gray-500 text-center">Social Media</p>
                  </div>
                  <div className="mt-2">
                    <ul className=" grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 3xl:flex flex-wrap justify-center">
                      {Object.entries(dappInfo.sns).map((val, key) => {
                        return (
                          <li className="p-2" key={key}>
                            <a
                              className="mr-4 hover:underline md:mr-6 "
                              href={val[1]}
                            >
                              {snsIcon[val[0]]}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div>
                    <p className="text-gray-500 text-center">Source Code</p>
                  </div>
                  <div className="mt-2">
                    <ul className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 3xl:flex flex-wrap justify-center">
                      {Object.entries(dappInfo.code).map((val, key) => {
                        console.log("val", val);
                        return (
                          <li className="p-2" key={key}>
                            <a
                              className="mr-4 hover:underline md:mr-6 "
                              href={val[1]}
                            >
                              {codeIcon[val[0]]}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div> */}
              {/* </div> */}
              <div className="flex justify-center items-center text-center text-gray-500 text-sm py-8 px-4">
                <p className="text-gray-500 font-normal p-16 text-justify ">
                  PulseChainProjects.io is an open source tool built by the
                  HowToPulse.com team. Create a FREE listing in less than 5
                  mins. For the communities safety we will approve all listing
                  before deploying them to the site.
                  <br />
                  <br />
                  We are dedicated to providing the most up to date information
                  on all projects planning on launching.
                </p>
              </div>
              <div className="flex justify-center items-center text-center text-gray-500 text-sm py-8 px-4">
                <Link
                  href="/dapps"
                  // className="flex item-center rounded-full shadow-2xl"
                >
                  <>
                    <BsFillArrowLeftCircleFill className="flex item-center rounded-full shadow-2xl h-5 w-5 mx-2" />
                    <p>Back to home</p>
                  </>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="relative w-full bottom-0">
          <Footer />
        </div>
      </div>
    </Fragment>
  );
}
