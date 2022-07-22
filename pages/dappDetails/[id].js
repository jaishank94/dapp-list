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
} from "react-icons/bs";
import {
  GiConsoleController,
  GiChart,
  GiArtificialHive,
  GiHamburgerMenu,
} from "react-icons/gi";
import { AiFillGitlab } from "react-icons/ai";
import { IoLogoBitbucket } from "react-icons/Io";
import { RWebShare } from "react-web-share";
import toast, { Toaster } from "react-hot-toast";

const Categories = [
  {
    name: "Games",
    slug: "Games",
    color: "red",
    icon: (
      <GiConsoleController
        className="h-8 w-8 bg-red-900 rounded-full p-1 mx-2"
        color="white"
      />
    ),
  },
  {
    name: "DeFi",
    slug: "DeFi",
    color: "pink",
    icon: (
      <GiChart
        className="h-8 w-8 bg-pink-900 rounded-full p-1 mx-4"
        color="white"
      />
    ),
  },
  {
    name: "NFT",
    slug: "NFT",
    color: "blue",
    icon: (
      <GiArtificialHive
        className="h-8 w-8 bg-blue-900 rounded-full p-1 mx-4"
        color="white"
      />
    ),
  },
  {
    name: "All Categories",
    slug: "Category",
    color: "slate",
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
  const [isDisabled, setDisabled] = useState(false);

  useEffect(() => {
    if (isInitialized && id) {
      fetchDappDetails();
      getAppList();
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
        increasePageView();
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  const reportAbusive = async () => {
    setDisabled(true);
    try {
      const DappRemoval = Moralis.Object.extend("DappRemoval");
      const newObject = new DappRemoval();
      newObject.set("project_url", window.location.href);
      newObject.set("status", "ACTIVE");
      let response = await newObject.save();
      toast.success("Succefully submited");
      setDisabled(false);
    } catch (e) {
      setDisabled(false);
    }
  };

  const requestRemoval = async () => {
    setDisabled(true);
    try {
      const DappRemoval = Moralis.Object.extend("DappRemoval");
      const newObject = new DappRemoval();
      newObject.set("project_url", window.location.href);
      newObject.set("status", "ACTIVE");
      let response = await newObject.save();
      toast.success("Succefully submited");
      setDisabled(false);
    } catch (e) {
      setDisabled(false);
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

  if (!isMounted) return null;

  return (
    <Fragment>
      <div className="custom-wrapper h-screen">
        <Toaster position="top-right" />

        <div className="relative overflow-hidden">
          <div className="w-full border-b-2 border-slate-300 py-2 mb-0">
            <Header displayCreate={false} />
          </div>
          <div className="w-full mx-auto px-4 sm:px-6">
            <div className="flex justify-between items-center py-6 sm:px-0 xl:px-16 md:justify-center md:space-x-10">
              <div className="w-18">
                <button
                  onClick={() => router.push("/dapps")}
                  className="flex item-center rounded-full shadow-2xl"
                >
                  <BsFillArrowLeftCircleFill className="h-12 w-12" />
                </button>
              </div>
            </div>
          </div>
        </div>
        {dappInfo && !isLoading && (
          <div className="component-app-detail">
            <div
              className={`rounded-3xl ${
                theme === "light"
                  ? "  border-2 drop-shadow-2xl"
                  : "custom-shadow-black"
              }`}
            >
              <div
                className={`card-header flex rounded-3xl   ${
                  theme === "light"
                    ? "border-b-2 drop-shadow-2xl shadow-xl"
                    : "bg-gray-800"
                }`}
              >
                <div className="w-14 card-icon">
                  <div
                    class={`block p-0 md:p-6 max-w-sm rounded-md shadow-md border-2 ${
                      theme === "light"
                        ? "border-white bg-white"
                        : "border-gray-700 bg-gray-700"
                    }`}
                  >
                    <img
                      alt="Image"
                      src={dappInfo.logo}
                      width={110}
                      height={110}
                      className="rounded-md"
                    />
                  </div>
                </div>
                <div className="flex-initial px-5 xl:p-5 app-detail">
                  <div className="py-4">
                    <h5 className="font-bold text-lg">{dappInfo.name}</h5>
                    <p className="text-gray-500 text-sm mt-2">
                      {dappInfo.short_description}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex mt-5">
                <div className="status">
                  <div>
                    <p className="text-gray-500">Status</p>
                  </div>
                  <div className="status-pill mt-2">
                    <p className="text-white font-semibold">
                      {dappInfo.app_status}
                    </p>
                  </div>
                </div>
                <div className="page-view">
                  <div>
                    <p className="text-gray-500">Page Views</p>
                  </div>
                  <div className="page-view-detail flex mt-2">
                    <span className="text-lg font-semibold">
                      {dappInfo.page_views ? dappInfo.page_views : "0"}
                    </span>
                    {/* <div className="pct is-positive ml-1">
                      <div className="page-view-index">
                        <span className="upper-limit mr-1">^</span>-
                      </div>
                    </div> */}
                  </div>
                </div>
                <div className="ticker">
                  <div>
                    <p className="text-gray-500">Ticker</p>
                  </div>
                  <div className="mt-2">
                    <p className="text-lg font-semibold">
                      {dappInfo.ticker ? dappInfo.ticker : "_"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex mt-5">
                <div className="status">
                  <div>
                    <p className="text-gray-500">Sacrifice</p>
                  </div>
                  <div className="mt-2">
                    <p className="text-lg font-semibold">
                      {dappInfo.sacrifice ? dappInfo.sacrifice : "_"}
                    </p>
                  </div>
                </div>
                <div className="page-view">
                  <div>
                    <p className="text-gray-500">Total Supply</p>
                  </div>
                  <div className="mt-2">
                    <p className="text-lg font-semibold">
                      {dappInfo.total_supply ? dappInfo.total_supply : "_"}
                    </p>
                  </div>
                </div>
                <div className="ticker">
                  <div>
                    <p className="text-gray-500">Vote</p>
                  </div>
                  <div className="mt-2 flex text-center justify-center">
                    <div>
                      <BsHandThumbsUp className="h-6 w-6" color="blueviolet" />
                    </div>
                    <div className="ml-1">
                      <p className="text-lg font-semibold">
                        {dappInfo.likes ? dappInfo.likes : 0}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-5">
                <div className="status mx-16">
                  <div>
                    <p className="text-gray-500">Social Media</p>
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
                <div className="ticker">
                  <div>
                    <p className="text-gray-500">Source Code</p>
                  </div>
                  <div className="mt-2">
                    <ul className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 3xl:flex flex-wrap justify-center">
                      {Object.entries(dappInfo.code).map((val, key) => {
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
              <div className="flex justify-center items-center text-center text-gray-500 text-sm pt-16 pb-4 px-4">
                {dappInfo.full_description}
              </div>
              <div className="mt-4">
                <div className="flex text-center items-center align-middle w-full h-24 justify-center border-t-2 rounded-3xl shadow-xl drop-shadow-2xl">
                  <div className="submit-status">
                    <div>
                      <p className="text-gray-500">Submitted</p>
                    </div>
                    <div className="mt-2">
                      <p className="text-lg font-semibold">
                        {moment(dappInfo.createdAt).format("DD MMM YY")}
                      </p>
                    </div>
                  </div>
                  <div className="seperator"></div>
                  <div className="last-updated-status">
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
                <div className="submit-button px-4 -top-4">
                  <a
                    href={dappInfo.website_url}
                    target="_blank"
                    className="inline-flex w-full tracking-widesttext-xs sm:text-xs xl:text-base cursor-pointer launcapp-btn px-4 py-4 text-white justify-center rounded-md"
                  >
                    Launch App
                  </a>
                </div>
              </div>
            </div>
            <div className="w-full my-6 p-6 bg-yellow-100 rounded-2xl">
              <p>
                <span className="flex justify-center items-center">
                  {" "}
                  <BsFillExclamationTriangleFill
                    className="w-5 h-5"
                    color="red"
                  />{" "}
                  <span className="text-red-600 mx-2 font-bold">WARNING:</span>
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
              <div className="w-full pt-6">
                <iframe
                  className="w-full h-96 rounded-2xl"
                  src={dappInfo.sns.youtube}
                  title="Ms. Marvel Tells Spider-Man To Take Off His Mask Scene - Marvel's Avengers"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
            )}

            <div className="flex justify-center items-center mt-6">
              <RWebShare
                data={{
                  text: dappInfo.short_description,
                  url: window.location.href,
                  title: dappInfo.name,
                }}
                onClick={() => console.log("shared successfully!")}
              >
                <button
                  className={`rounded-lg px-4 h-12 shadow-lg cursor-pointer mx-2 md:rounded-full border-2 `}
                  // onClick={logout}
                >
                  <span className="link p-1 hidden text-xs md:block ">
                    Share
                  </span>
                  <span className="md:hidden">
                    <BsShare className="h-5 w-5" color="blueviolet" />
                  </span>
                </button>
              </RWebShare>
              <button
                className={`rounded-lg px-4 h-12 shadow-lg mx-2 md:rounded-full border-2 ${isDisabled?"cursor-not-allowed":"cursor-pointer"}`}
                onClick={() => reportAbusive()}
                disabled={isDisabled}
              >
                <span className="link p-1 hidden text-xs md:block">
                  Report Abuse
                </span>
                <span className="md:hidden">
                  <BsExclamationCircle className="h-5 w-5" color="blueviolet" />
                </span>
              </button>
              <button
                className={`rounded-lg px-4 h-12 shadow-lg mx-2 md:rounded-full border-2 ${isDisabled?"cursor-not-allowed":"cursor-pointer"} `}
                onClick={() => requestRemoval()}
                disabled={isDisabled}
              >
                <span className="link p-1 hidden text-xs md:block">
                  Request Removal
                </span>
                <span className="md:hidden">
                  <BsTrash2 className="h-5 w-5" color="blueviolet" />
                </span>
              </button>
              <button
                className={`rounded-lg px-4 h-12 shadow-lg cursor-not-allowed mx-2 md:rounded-full border-2 `}
                // onClick={logout}
                disabled={true}
              >
                <span className="link p-1 hidden text-xs md:block">
                  Edit DApp
                </span>
                <span className="md:hidden">
                  <BsPencil className="h-5 w-5" color="blueviolet" />
                </span>
              </button>
              <button
                className={`rounded-lg px-4 h-12 shadow-lg cursor-not-allowed mx-2 md:rounded-full border-2 `}
                // onClick={logout}
                disabled={true}

              >
                <span className="link p-1 hidden text-xs md:block">
                  Promote DApp
                </span>
                <span className="md:hidden">
                  <BsGraphUp className="h-5 w-5" color="blueviolet" />
                </span>
              </button>
            </div>
            <div className="py-16 mt-16">
              <div className="flex flex-start" style={{ marginBottom: "10px" }}>
                <h2 className="items-center ml-1 mb-0 custom-text text-dark">
                  Popular Projects
                </h2>
              </div>
              <div className="my-10 sm:grid md:grid-cols-2 xl:grid-cols-2 3xl:flex flex-wrap justify-center">
                {data &&
                  data.map((app, indx) => {
                    return (
                      <div
                        className={`max-w-sm w-full my-2 rounded-2xl lg:w-full lg:flex border-2 cursor-pointer  ${
                          theme === "light"
                            ? " border-white"
                            : "border-gray-600"
                        }`}
                        onClick={() =>
                          router.push("/dappDetails/" + app.objectId)
                        }
                      >
                        <div
                          class={`flex block w-full p-6 max-w-sm rounded-2xl  ${
                            theme === "light"
                              ? "custom-shadow bg-white"
                              : "bg-black"
                          } `}
                        >
                          <div
                            class={`block p-6 max-w-sm rounded-lg shadow-md border-2 ${
                              theme === "light"
                                ? "border-white bg-white"
                                : "border-gray-700 bg-gray-700"
                            }`}
                          >
                            <Image src={logo} width={25} height={25} />
                          </div>

                          <div className="px-3">
                            <p className="text-left link">{app.name}</p>
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
            <div className="mt-4">
              <div className="flex flex-start" style={{ marginBottom: "10px" }}>
                <h2 className="items-center ml-1 mb-0 custom-text text-dark">
                  Popular Categories
                </h2>
              </div>
              <div className="my-10 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-4 3xl:flex flex-wrap justify-center">
                {Categories &&
                  Categories.map((app, indx) => {
                    return (
                      <button
                        key={indx}
                        className={`bg-${app.color}-300 cursor-pointer flex justify-start items-center px-2 py-4 m-2 space-around rounded-xl`}
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

      {/* <Footer /> */}
    </Fragment>
  );
}
