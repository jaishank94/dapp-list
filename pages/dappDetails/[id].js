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
import {
  BsAlarmFill,
  BsFillArrowLeftCircleFill,
  BsHandThumbsUp,
} from "react-icons/bs";

export default function DappDetails() {
  const router = useRouter();
  const { isInitialized } = useMoralis();
  const { id } = router.query;
  const [dappInfo, setDappInfo] = useState();
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (isInitialized && id) {
      fetchDappDetails();
      getAppList();
    }
  }, [isInitialized, id]);

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

  console.log(data);

  return (
    <Fragment>
      <div className="custom-wrapper h-screen">
        <div className="relative overflow-hidden">
          <div className="w-full border-b-2 border-slate-300 py-2 mb-0">
            <Header displayCreate={true} />
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
          <>
            <div className="component-app-detail">
              <div className="rounded-3xl border-2 drop-shadow-2xl">
                <div className="card-header flex  border-b-2 rounded-3xl shadow-xl drop-shadow-2xl">
                  <div className="w-14 card-icon">
                    <div className="">
                      <img
                        src={dappInfo.logo}
                        alt={dappInfo.name}
                        width={110}
                        height={110}
                        className="rounded-lg"
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
                        <BsHandThumbsUp
                          className="h-6 w-6"
                          color="blueviolet"
                        />
                      </div>
                      <div className="ml-1">
                        <p className="text-lg font-semibold">
                          {dappInfo.likes}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mt-5">
                  <div className="status">
                    <div>
                      <p className="text-gray-500">Social Media</p>
                    </div>
                    <div className="mt-2">
                      <p className="text-lg font-semibold">
                        {dappInfo.sacrifice ? dappInfo.sacrifice : "_"}
                      </p>
                    </div>
                  </div>
                  <div className="ticker">
                    <div>
                      <p className="text-gray-500">Source Code</p>
                    </div>
                    <div className="mt-2">
                      <p className="text-lg font-semibold">
                        {dappInfo.total_supply ? dappInfo.total_supply : "_"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center item-center text-gray-500 text-sm pt-16 pb-4">
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
              <div className="w-full pt-6">
                <iframe
                  className="w-full h-96 rounded-2xl"
                  src="https://www.youtube.com/embed/4w02jCPsJBA"
                  title="Ms. Marvel Tells Spider-Man To Take Off His Mask Scene - Marvel's Avengers"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
              <div className="flex justify-center items-center mt-6">
                <button
                  className={`rounded-lg px-4 h-12 shadow-lg cursor-pointer mx-2 md:rounded-full`}
                  // onClick={logout}
                >
                  <span className="link p-1 hidden text-xs md:block">
                    Share
                  </span>
                </button>
                <button
                  className={`rounded-lg px-4 h-12 shadow-lg cursor-pointer mx-2 md:rounded-full`}
                  // onClick={logout}
                >
                  <span className="link p-1 hidden text-xs md:block">
                    Report Abuse
                  </span>
                </button>
                <button
                  className={`rounded-lg px-4 h-12 shadow-lg cursor-pointer mx-2 md:rounded-full`}
                  // onClick={logout}
                >
                  <span className="link p-1 hidden text-xs md:block">
                    Request Removal
                  </span>
                </button>
                <button
                  className={`rounded-lg px-4 h-12 shadow-lg cursor-pointer mx-2 md:rounded-full`}
                  // onClick={logout}
                >
                  <span className="link p-1 hidden text-xs md:block">
                    Edit DApp
                  </span>
                </button>
                <button
                  className={`rounded-lg px-4 h-12 shadow-lg cursor-pointer mx-2 md:rounded-full`}
                  // onClick={logout}
                >
                  <span className="link p-1 hidden text-xs md:block">
                    Promote DApp
                  </span>
                </button>
              </div>
              <div className="py-16 mt-16">
                <div
                  className="flex flex-start"
                  style={{ marginBottom: "10px" }}
                >
                  <h2 className="items-center ml-1 mb-0 custom-text text-dark">
                    Popular Projects
                  </h2>
                </div>
                <div className="my-10 sm:grid md:grid-cols-2 xl:grid-cols-2 3xl:flex flex-wrap justify-center">
                  {data &&
                    data.map((app, indx) => {
                      return (
                        <div
                          className="max-w-sm w-full my-2 rounded-2xl lg:w-full lg:flex border-2 border-white cursor-pointer"
                          onClick={() =>
                            router.push("/dappDetails/" + app.objectId)
                          }
                        >
                          <div class="flex block w-full p-6 max-w-sm bg-white  rounded-2xl custom-shadow">
                            <div>
                              <div class="block p-6 max-w-sm bg-white rounded-lg border-2 border-white shadow-md">
                                <Image src={logo} width={25} height={25} />
                              </div>
                            </div>
                            <div className="px-3">
                              <p className="text-left link">{app.name}</p>
                              <p className="text-left text-justify">
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
              <div className=" mt-8">
                <div
                  className="flex flex-start"
                  style={{ marginBottom: "10px" }}
                >
                  <h2 className="items-center ml-1 mb-0 custom-text text-dark">
                    Popular Categories
                  </h2>
                </div>
                <div className="my-10 sm:grid grid-cols-2 md:grid-cols-4 xl:grid-cols-4 3xl:flex flex-wrap justify-center">
                  {data &&
                    data.map((app, indx) => {
                      return (
                        <button
                          className="cursor-pointer flex justify-center items-center border-2 p-4 m-2 bg-slate-600 space-around rounded-xl "
                          onClick={() =>
                            router.push("/dappDetails/" + app.objectId)
                          }
                        >
                          <BsAlarmFill className="h-5 w-5 mr-4" />
                          Hello
                        </button>
                      );
                    })}
                  {data && data.length == 0 && (
                    <>
                      <p className="p-6">No Data</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
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
