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
    } catch (e) { }
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
      <div className="custom-wrapper">
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
            <div className="flex justify-between items-center py-6 sm:px-0 xl:px-16 md:justify-center md:space-x-10">
              <div className="flex justify-start lg:w-0 lg:flex-1">
                <a
                  className="icon-div cursor-pointer"
                  onClick={() => router.push("/dapps")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 custom-back-icon"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        {dappInfo && !isLoading && (
          <>
            <div className="component-app-detail">
              <div
                className="bg-[#c6c6e4] regal-voilet rounded-3xl"
                style={{ backgroundColor: "#c6c6e4" }}
              >
                <div className="card-header flex">
                  <div className="flex-none w-14 card-icon">
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
                    <div className="">
                      <h5 className="font-bold app-name">{dappInfo.name}</h5>
                      <p className="text-gray-500 font-medium mt-2">
                        {dappInfo.full_description}
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
                      <p className="status-detail">{dappInfo.app_status}</p>
                    </div>
                  </div>
                  <div className="page-view">
                    <div>
                      <p className="text-gray-500">Page Views</p>
                    </div>
                    <div className="page-view-detail flex mt-2">
                      <span className="page-view-value">
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
                      <p className="ticker-value">
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
                      <p className="ticker-value">
                        {dappInfo.sacrifice ? dappInfo.sacrifice : "_"}
                      </p>
                    </div>
                  </div>
                  <div className="page-view">
                    <div>
                      <p className="text-gray-500">Total Supply</p>
                    </div>
                    <div className="mt-2">
                      <p className="ticker-value">
                        {dappInfo.total_supply ? dappInfo.total_supply : "_"}
                      </p>
                    </div>
                  </div>
                  <div className="ticker">
                    <div>
                      <p className="text-gray-500">Vote</p>
                    </div>
                    <div className="mt-2 flex">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 ticker-value"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                          />
                        </svg>
                      </div>
                      <div className="ml-1">
                        <p className="ticker-value">{dappInfo.likes}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-14">
                  <div className="text-center dApp-text">
                    <p className="p-dapp">{/* {dappInfo.full_description} */}</p>
                  </div>
                </div>
                <div className="mt-14 confirm-section p-5">
                  <div className="flex text-center w-full">
                    <div className="submit-status">
                      <div>
                        <p className="text-gray-500">Submitted</p>
                      </div>
                      <div className="mt-2">
                        <p className="ticker-value">
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
                        <p className="ticker-value">
                          {moment(dappInfo.updatedAt).format("DD MMM YY")}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="submit-button">
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
            </div>
            <div className="component-app-detail py-16 mt-16">
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

      <Footer />
    </Fragment>
  );
}
