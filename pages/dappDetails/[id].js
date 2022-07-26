import React, { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import Head from "next/head";
import Header from "../components/Header";
import { useRouter } from "next/router";
import Moralis from "moralis";
import moment from "moment";
import { useMoralis } from "react-moralis";
import Image from "next/image";
import logo from "/public/images/pp_final_icon_black.png";
import blackLogo from "/public/images/pp_final_icon_black.png";
import whiteLogo from "/public/images/pp_final_icon_white.png";

import Footer from "../components/Footer";
import { useTheme } from "next-themes";
import {
  BsAlarmFill,
  BsFillArrowLeftCircleFill,
  BsHandThumbsUp,
  BsShare,
  BsExclamationCircle,
  BsTrash2,
  BsPencil,
  BsFillExclamationTriangleFill,
  BsGraphUp,
  BsFacebook,
  BsTwitter,
  BsInstagram,
  BsYoutube,
  BsTelegram,
  BsReddit,
  BsMedium,
  BsDiscord,
  BsGithub,
  BsArrowDownCircle,
  BsHandThumbsDown,
  BsHandThumbsUpFill,
  BsHandThumbsDownFill,
} from "react-icons/bs";
import {
  GiConsoleController,
  GiChart,
  GiArtificialHive,
  GiHamburgerMenu,
} from "react-icons/gi";
import { AiFillGitlab } from "react-icons/ai";
import { IoLogoBitbucket } from "react-icons/io";
import { RWebShare } from "react-web-share";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

const Categories = [
  {
    name: "Games",
    slug: "Games",
    color: "rose",
    bgColor:"bg-rose-300",
    icon: (
      <GiConsoleController
        className="h-8 w-8 bg-rose-600 rounded-full p-1 mx-2"
        color="white"
      />
    ),
  },
  {
    name: "DeFi",
    slug: "DeFi",
    color: "pink",
    bgColor:"bg-pink-300",
    icon: (
      <GiChart
        className="h-8 w-8 bg-pink-600 rounded-full p-1 mx-4"
        color="white"
      />
    ),
  },
  {
    name: "NFT",
    slug: "NFT",
    color: "blue",
    bgColor:"bg-blue-300",
    icon: (
      <GiArtificialHive
        className="h-8 w-8 bg-blue-600 rounded-full p-1 mx-4"
        color="white"
      />
    ),
  },
  {
    name: "All Categories",
    slug: "Category",
    color: "slate",
    bgColor:"bg-slate-300",
    icon: (
      <GiHamburgerMenu
        className="h-8 w-8 bg-gray-900 rounded-full p-1 mx-4"
        color="white"
      />
    ),
  },
];

const codeIcon = {
  github: (
    <BsGithub
      className="h-8 w-8 bg-gray-900 rounded-full p-1 mx-4"
      color="white"
    />
  ),
  gitlab: (
    <AiFillGitlab
      className="h-8 w-8 bg-gray-900 rounded-full p-1 mx-4"
      color="white"
    />
  ),
  bitbucket: (
    <IoLogoBitbucket
      className="h-8 w-8 bg-gray-900 rounded-full p-1 mx-4"
      color="white"
    />
  ),
};

const snsIcon = {
  facebook: (
    <BsFacebook
      className="h-8 w-8 bg-gray-900 rounded-full p-1 mx-4"
      color="white"
    />
  ),
  twitter: (
    <BsTwitter
      className="h-8 w-8 bg-gray-900 rounded-full p-1 mx-4"
      color="white"
    />
  ),
  instagram: (
    <BsInstagram
      className="h-8 w-8 bg-gray-900 rounded-full p-1 mx-4"
      color="white"
    />
  ),
  youtube: (
    <BsYoutube
      className="h-8 w-8 bg-gray-900 rounded-full p-1 mx-4"
      color="white"
    />
  ),
  telegram: (
    <BsTelegram
      className="h-8 w-8 bg-gray-900 rounded-full p-1 mx-4"
      color="white"
    />
  ),
  reddit: (
    <BsReddit
      className="h-8 w-8 bg-gray-900 rounded-full p-1 mx-4"
      color="white"
    />
  ),
  medium: (
    <BsMedium
      className="h-8 w-8 bg-gray-900 rounded-full p-1 mx-4"
      color="white"
    />
  ),
  discord: (
    <BsDiscord
      className="h-8 w-8 bg-gray-900 rounded-full p-1 mx-4"
      color="white"
    />
  ),
};

export default function DappDetails() {
  const router = useRouter();
  const { isInitialized } = useMoralis();
  const { id } = router.query;
  const [dappInfo, setDappInfo] = useState();
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { theme, setTheme } = useTheme("dark");
  const [isMounted, setMounted] = useState(false);
  const { authenticate, isAuthenticated, user } = useMoralis();
  const [like, setLike] = useState("");
  const [isDisabled, setDisabled] = useState(false);
  const [dislike, setDislike] = useState("");
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDisLikeCount] = useState(0);

  useEffect(() => {
    if (isInitialized && id) {
      fetchDappDetails();
      getAppList();
      getUserReaction(true);
      getUserReaction(false);
    }
  }, [isInitialized, id]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchDappDetails = async () => {
    setLoading(true);
    try {
      const Dapps = Moralis.Object.extend("Dapps");
      const query = new Moralis.Query(Dapps);
      query.equalTo("objectId", id);
      query.equalTo("status", "ACTIVE");
      const response = await query.find();
      if (response.length > 0) {
        let result = JSON.parse(JSON.stringify(response));
        setDappInfo(result[0]);
        setLikeCount(result[0].likes);
        setDisLikeCount(result[0].dislikes);
        increasePageView();
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  const increasePageView = async () => {
    try {
      const Dapps = Moralis.Object.extend("Dapps");
      const query = new Moralis.Query(Dapps);
      query.equalTo("objectId", id);
      const response = await query.find();
      if (response.length > 0) {
        response[0].increment("page_views", 1);
        await response[0].save();
      }
    } catch (e) {}
  };

  const getAppList = async () => {
    try {
      const Dapps = Moralis.Object.extend("Dapps");
      const query = new Moralis.Query(Dapps);
      query.ascending("priority");
      query.limit(3);
      const response = await query.find();
      let result = JSON.parse(JSON.stringify(response));
      setData(result);
    } catch (e) {
      console.log("Error", e);
    }
  };

  function getDisplayType(val) {
    try {
      let TypeLength = val ? val.length : 0;
      let TypeBadge = "";
      if (TypeLength > 0) {
        TypeBadge = val.map((type, index) => {
          return (
            <div
              key={index}
              className={`p-1 px-1 text-xs truncate font-semibold rounded-full truncate bottom-partial ${
                theme === "light"
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }`}
            >
              {type}
            </div>
          );
        });
        return TypeBadge;
      }
    } catch (e) {}
  }

  const handleReaction = async (isLiked) => {
    setDisabled(true);

    try {
      let isExists = await getUserReaction(isLiked);
      if (isAuthenticated && !isExists) {
        const DappVotes = Moralis.Object.extend("DappVotes");
        const Dapps = Moralis.Object.extend("Dapps");

        const newDapObject = new Dapps();
        newDapObject.id = id;

        const query = new Moralis.Query(Dapps);
        query.equalTo("objectId", id);
        const response = await query.first();

        const query2 = new Moralis.Query(DappVotes);
        query2.equalTo("user", user.get("ethAddress"));
        query2.equalTo("dapp", newDapObject);
        const response2 = await query2.first();

        if (response) {
          const newLikesObject = new DappVotes();
          newLikesObject.set("dapp", newDapObject);
          newLikesObject.set("user", user.get("ethAddress"));
          newLikesObject.set("isLiked", isLiked);
          newLikesObject.set("status", "ACTIVE");
          await newLikesObject.save();

          if (isLiked) {
            setLike(isLiked);
            setLikeCount(likeCount + 1);
            response.increment("likes", 1);

            if (response2) {
              response.increment("dislikes", -1);
              setDislike(false);
              setDisLikeCount(dislikeCount - 1);
            }
          } else {
            setDislike(true);
            setDisLikeCount(dislikeCount + 1);
            response.increment("dislikes", 1);

            if (response2) {
              response.increment("likes", -1);
              setLike(false);
              setLikeCount(likeCount - 1);
            }
          }

          if (response2) {
            await response2.destroy();
          }
          await response.save();
        }
      }
      setDisabled(false);
    } catch (e) {
      setDisabled(false);
    }
  };

  const getUserReaction = async (isLiked) => {
    console.log("");
    try {
      if (isAuthenticated) {
        const DappVotes = Moralis.Object.extend("DappVotes");
        const Dapps = Moralis.Object.extend("Dapps");

        const newDapObject = new Dapps();
        newDapObject.id = id;

        const query = new Moralis.Query(DappVotes);
        query.equalTo("user", user.get("ethAddress"));
        query.equalTo("dapp", newDapObject);
        query.equalTo("isLiked", isLiked);
        const response = await query.first();

        if (response) {
          if (response.get("isLiked")) {
            setLike(true);
          } else {
            setDislike(true);
          }
        }
        return response;
      }
    } catch (e) {
      console.log(e);
    }
  };

  if (!isMounted) return null;

  return (
    <Fragment>
      <div className="h-screen">
        <Toaster position="top-right" />

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
          <div className="flex justify-between p-4 max-w-7xl mx-auto">
            {/* <div className="flex justify-between items-center py-6 sm:px-0 xl:px-16 md:justify-center md:space-x-10"> */}
            <div className="w-18">
              <button
                onClick={() => router.push("/dapps")}
                className="flex item-center rounded-full shadow-2xl"
              >
                <BsFillArrowLeftCircleFill className="h-12 w-12" />
              </button>
            </div>
          </div>
          {dappInfo && !isLoading && (
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
                    <div className="absolute inset-0 object-fill">
                      {dappInfo.logo && dappInfo.logo !== "" ? (
                        <img
                          alt="Logo"
                          src={dappInfo.logo}
                          width={110}
                          height={110}
                          className="rounded-lg h-32 w-32 object-fill"
                        />
                      ) : (
                        <div className="p-4">
                          <Image
                            src={theme === "light" ? blackLogo : whiteLogo}
                            width={80}
                            height={80}
                            className="rounded-lg h-32 w-32 "
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex-initial px-5 xl:p-5">
                    <div className="py-4">
                      <h5 className="font-bold text-lg">{dappInfo.name}</h5>
                      <p className="text-gray-500 text-sm mt-2">
                        {dappInfo.short_description}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="grid grid-cols-3 justify-between divide-x py-8">
                  <div className="flex flex-col items-center justify-center">
                    <div>
                      <p className="text-gray-500 text-xs md:text-base">Status</p>
                    </div>
                    <div className="mt-2">
                      <p
                        className={`p-1 px-1 flex items-center text-xs justify-center md:text-lg font-semibold rounded-full truncate ${
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
                      <p className="text-gray-500 text-xs md:text-base">Page Views</p>
                    </div>
                    <div className="flex mt-2">
                      <span className="text-xs md:text-lg font-semibold">
                        {dappInfo.page_views ? dappInfo.page_views : "0"}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <div>
                      <p className="text-gray-500 text-xs md:text-base">Ticker</p>
                    </div>
                    <div className="mt-2">
                      <p className="text-xs md:text-lg font-semibold uppercase">
                        {dappInfo.ticker ? dappInfo.ticker : "_"}
                      </p>
                    </div>
                  </div>
                </div>

                <div class="grid grid-cols-3 divide-x py-8">
                  <div className="flex flex-col items-center justify-center">
                    <div>
                      <p className="text-gray-500 text-xs md:text-base">Sacrifice</p>
                    </div>
                    <div className="mt-2">
                      <p className="text-xs md:text-lg font-semibold uppercase">
                        {dappInfo.sacrifice ? dappInfo.sacrifice : "_"}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <div>
                      <p className="text-gray-500 text-xs md:text-base">Total Supply</p>
                    </div>
                    <div className="mt-2">
                      <p className="text-xs md:text-lg font-semibold uppercase">
                        {dappInfo.total_supply ? dappInfo.total_supply : "_"}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <div>
                      <p className="text-gray-500 text-xs md:text-base">Vote</p>
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
                            <span className="font-semibold">
                              {dislikeCount}
                            </span>
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
                </div>
                {/* </div> */}
                <div className="flex justify-center items-center text-center text-gray-500 text-sm py-8 px-4">
                  {dappInfo.full_description}
                </div>
                <div className="flex justify-center items-center text-center text-gray-500 text-sm space-x-2 py-8 px-4">
                  {getDisplayType(dappInfo.tag)}
                </div>
                <div className="mt-4">
                  <div
                    className={`grid grid-cols-2 divide-x py-8 rounded-3xl border-2  shadow-2xl ${
                      theme === "light"
                        ? " border-slate-100 shadow-slate-300"
                        : " border-neutral-800 shadow-neutral-800"
                    }`}
                  >
                    <div className="flex flex-col items-center justify-center">
                      <div>
                        <p className="text-gray-500">Submitted</p>
                      </div>
                      <div className="mt-2">
                        <p className="text-lg font-semibold">
                          {moment(dappInfo.createdAt).format("DD MMM YY")}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <div>
                        <p className="text-gray-500">Last updated</p>
                      </div>
                      <div className="mt-2">
                        <p className="text-lg font-semibold">
                          {moment(dappInfo.updatedAt).format("DD MMM YY")}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="cursor-pointer w-3/4 flex items-center justify-center rounded-full p-2 font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg text-xl text-white">
                      <Link
                        href={dappInfo.website_url}
                        target="_blank"
                        className=""
                      >
                        Launch App
                      </Link>
                    </div>
                  </div>
                  <div className="flex justify-center items-center my-4">
                    <RWebShare
                      data={{
                        text: dappInfo.short_description,
                        url: window.location.href,
                        title: dappInfo.name,
                      }}
                      onClick={() => console.log("shared successfully!")}
                    >
                      <button
                        className={`rounded-lg px-4 h-12 shadow-lg cursor-pointer mx-2 md:rounded-full border-2 ${
                          theme === "light"
                            ? "bg-white border-slate-100 shadow-slate-200"
                            : "bg-neutral-900 border-neutral-800 shadow-neutral-800"
                        } `}
                        // onClick={logout}
                      >
                        <span className="p-1 hidden text-sm md:block text-transparent font-bold bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 ">
                          Share
                        </span>
                        <span className="md:hidden">
                          <BsShare className="h-5 w-5" color="blueviolet" />
                        </span>
                      </button>
                    </RWebShare>
                    <Link href={"/dappAbusive?url=" + window.location.href}>
                      <div
                        className={`flex items-center rounded-lg px-4 h-12 shadow-lg mx-2 md:rounded-full border-2
                  ${
                    theme === "light"
                      ? "bg-white border-slate-100 shadow-slate-200"
                      : "bg-neutral-900 border-neutral-800 shadow-neutral-800"
                  }
                ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"}`}
                        // onClick={() => reportAbusive()}
                        disabled={isDisabled}
                      >
                        <>
                          <span className="p-1 hidden text-sm md:block text-transparent font-bold bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                            Report Abuse
                          </span>
                          <span className="md:hidden">
                            <BsExclamationCircle
                              className="h-5 w-5"
                              color="blueviolet"
                            />
                          </span>
                        </>
                      </div>
                    </Link>

                    <Link href={"/dappRemoval?url=" + window.location.href}>
                      <div
                        className={`flex items-center rounded-lg px-4 h-12 shadow-lg mx-2 md:rounded-full border-2 
                  ${
                    theme === "light"
                      ? "bg-white border-slate-100 shadow-slate-200"
                      : "bg-neutral-900 border-neutral-800 shadow-neutral-800"
                  }
                ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"} `}
                        // onClick={() => requestRemoval()}
                        disabled={isDisabled}
                      >
                        <span className="p-1 hidden text-sm md:block text-transparent font-bold bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                          Request Removal
                        </span>
                        <span className="md:hidden">
                          <BsTrash2 className="h-5 w-5" color="blueviolet" />
                        </span>
                      </div>
                    </Link>
                    <button
                      className={`rounded-lg px-4 h-12 shadow-lg cursor-not-allowed mx-2 md:rounded-full border-2 ${
                        theme === "light"
                          ? "bg-white border-slate-100 shadow-slate-200"
                          : "bg-neutral-900 border-neutral-800 shadow-neutral-800"
                      }`}
                      // onClick={logout}
                      disabled={true}
                    >
                      <span className="link p-1 hidden text-sm md:block text-transparent font-bold bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                        Edit DApp
                      </span>
                      <span className="md:hidden">
                        <BsPencil className="h-5 w-5" color="blueviolet" />
                      </span>
                    </button>
                    <button
                      className={`rounded-lg px-4 h-12 shadow-lg cursor-not-allowed mx-2 md:rounded-full border-2 ${
                        theme === "light"
                          ? "bg-white border-slate-100 shadow-slate-200"
                          : "bg-neutral-900 border-neutral-800 shadow-neutral-800"
                      } `}
                      // onClick={logout}
                      disabled={true}
                    >
                      <span className="link p-1 hidden text-sm md:block text-transparent font-bold bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                        Promote DApp
                      </span>
                      <span className="md:hidden">
                        <BsGraphUp className="h-5 w-5" color="blueviolet" />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="my-16 p-6 bg-yellow-100 rounded-2xl">
                <p>
                  <span className="flex justify-center items-center">
                    {" "}
                    <BsFillExclamationTriangleFill
                      className="w-5 h-5"
                      color="red"
                    />{" "}
                    <span className="text-red-600 mx-2 font-bold">
                      WARNING:
                    </span>
                    <span className="font-bold text-gray-500">
                      PulseChainProjects.io
                    </span>
                  </span>{" "}
                </p>
                <p className="text-gray-500 text-center my-2">
                  Does not constitute any investment advice or trading advice.
                  Please carefully understand and evaluate the risks yourself
                  before participating in any Dapp.
                </p>
              </div>
              {dappInfo.sns.youtube && dappInfo.sns.youtube !== "" && (
                <div className="pt-6 w-full flex items-center justify-center">
                  <iframe
                    className="h-96 w-full rounded-2xl"
                    src={dappInfo.sns.youtube}
                    title="Ms. Marvel Tells Spider-Man To Take Off His Mask Scene - Marvel's Avengers"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
              )}
              <div className="py-12 mt-12">
                <div
                  className="flex flex-start"
                  style={{ marginBottom: "10px" }}
                >
                  <h2 className="items-center ml-1 mb-0 text-3xl font-bold">
                    Popular Projects
                  </h2>
                </div>
                <div className="my-10 grid gap-2 grid-cols-2 xl:grid-cols-2 3xl:flex flex-wrap justify-center">
                  {data &&
                    data.map((app, indx) => {
                      return (
                        <div
                          className={`w-full my-2 rounded-2xl shadow-lg border-2 cursor-pointer  ${
                            theme === "light"
                              ? "border-slate-100 shadow-slate-100"
                              : "border-neutral-800 shadow-neutral-800"
                          }`}
                          onClick={() =>
                            router.push("/dappDetails/" + app.objectId)
                          }
                          key={indx}
                        >
                          <div
                            className={`flex block w-full h-full p-6 rounded-2xl  ${
                              theme === "light" ? "bg-white" : "bg-black"
                            } `}
                          >
                            <div
                              className={`block p-6 rounded-lg shadow-lg border-2 ${
                                theme === "light"
                                  ? "border-white bg-white shadow-slate-200"
                                  : "border-neutral-700 bg-neutral-700 shadow-neutral-800"
                              }`}
                            >
                              {app.logo && app.logo !== "" ? (
                                <img
                                  alt="Logo"
                                  src={app.logo}
                                  width={80}
                                  height={80}
                                />
                              ) : (
                                <Image src={logo} width={80} height={80} />
                              )}
                            </div>

                            <div className="px-3 w-4/5">
                              <p className="text-left text-lg truncate text-transparent font-bold bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 ">
                                {app.name}
                              </p>
                              <p
                                className={`text-left py-2 text-sm font-thin text-justify ${
                                  theme === "light"
                                    ? "text-black"
                                    : "text-gray-500"
                                }`}
                              >
                                {app.short_description}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  {data && data.length == 0 && (
                    <>
                      <p className="p-6">No Data</p>
                    </>
                  )}
                </div>
              </div>
              <div className="flex justify-center items-center py-6">
                <BsArrowDownCircle className="h-8 w-8" />
              </div>
              <div className="mt-4">
                <div
                  className="flex flex-start"
                  style={{ marginBottom: "10px" }}
                >
                  <h2 className="items-center ml-1 mb-0 text-3xl font-bold">
                    Popular Categories
                  </h2>
                </div>
                <div className="my-10 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-4 3xl:flex flex-wrap justify-center">
                  {Categories &&
                    Categories.map((app, indx) => {
                      return (
                        <button
                          key={indx}
                          className={`${app.bgColor} cursor-pointer flex justify-start items-center px-2 py-4 m-2 space-around rounded-xl`}
                          onClick={() =>
                            router.push("/dapps?filter_category=" + app.slug)
                          }
                        >
                          <div className={``}>{app.icon}</div>
                          <span className="font-semibold text-sm">
                            {app.name}
                          </span>
                        </button>
                      );
                    })}
                  {Categories && Categories.length == 0 && (
                    <>
                      <p className="p-6">No Data</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
          {isLoading && (
            <>
              <p className="p-6 text-center">Loading...</p>
            </>
          )}

          {!isLoading && !dappInfo && (
            <>
              <p className="p-6 text-center">No Data Found</p>
            </>
          )}
        </div>

        <div className="relative w-full bottom-0">
          <Footer />
        </div>
      </div>
    </Fragment>
  );
}
