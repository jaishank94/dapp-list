import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import Head from "next/head";
import Header from "../components/header";
import { useRouter } from "next/router";
// import { ChevronDownIcon } from '@heroicons/react/solid'

function DApp() {
  const router = useRouter();
  return (
    <Fragment>
      <Head>
        <link
          href="http://fonts.cdnfonts.com/css/gordita"
          rel="stylesheet"
        ></link>
      </Head>
      <div className="relative overflow-hidden">
        <div className="w-full border-b-2 border-slate-300 py-2 mb-0">
          <div className="container mx-auto">
            <div className="relative z-10 bg-transparent">
              <div className="relative">
                <Header displayCreate={true} />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white w-full mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <a className="icon-div cursor-pointer" onClick={() => router.push("/")}>
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
      <div className="component-app-detail">
        <div
          className="bg-[#c6c6e4] regal-voilet rounded-lg"
          style={{ backgroundColor: "#c6c6e4" }}
        >
          <div className="card-header flex">
            <div className="flex-none w-14 h-14 card-icon">
              <div className="logo-img"></div>
            </div>
            <div className="flex-initial p-5 app-detail">
              <div className="">
                <h5 className="font-bold app-name">NFTonPulse.io</h5>
                <p className="text-gray-500 font-medium mt-2">
                  NFTonPulse is a NFT Marketplace. Buy, sell, trade, auction
                  NFTs. Powered by the PulseChain.
                </p>
              </div>
            </div>
            <div className="flex-initial edit-div p-5">
              <div className="edit-icon">
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 custom-edit-icon"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg> */}
              </div>
            </div>
          </div>
          <div className="flex mt-5">
            <div className="status">
              <div>
                <p className="text-gray-500">Status</p>
              </div>
              <div className="status-pill mt-2">
                <p className="status-detail">Live</p>
              </div>
            </div>
            <div className="page-view">
              <div>
                <p className="text-gray-500">Page Views</p>
              </div>
              <div className="page-view-detail flex mt-2">
                <span className="page-view-value">3,140,124</span>
                <div className="pct is-positive ml-1">
                  <div className="page-view-index">
                    <span className="upper-limit mr-1">^</span>
                    11.40%
                  </div>
                </div>
              </div>
            </div>
            <div className="ticker">
              <div>
                <p className="text-gray-500">Ticker</p>
              </div>
              <div className="mt-2">
                <p className="ticker-value">SPLT</p>
              </div>
            </div>
          </div>
          <div className="flex mt-5">
            <div className="status">
              <div>
                <p className="text-gray-500">Sacrifice</p>
              </div>
              <div className="mt-2">
                <p className="ticker-value">YES</p>
              </div>
            </div>
            <div className="page-view">
              <div>
                <p className="text-gray-500">Total Supply</p>
              </div>
              <div className="mt-2">
                <p className="ticker-value">1B INNO</p>
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
                  <p className="ticker-value">SPLT</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-14">
            <div className="text-center dApp-text">
              <p className="p-dapp">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
              </p>
            </div>
          </div>
          <div className="mt-14 confirm-section p-5">
            <div className="flex text-center w-full">
              <div className="submit-status">
                <div>
                  <p className="text-gray-500">Submitted</p>
                </div>
                <div className="mt-2">
                  <p className="ticker-value">Jan 21st, 2021</p>
                </div>
              </div>
              <div className="seperator"></div>
              <div className="last-updated-status">
                <div>
                  <p className="text-gray-500">Last updated</p>
                </div>
                <div className="mt-2">
                  <p className="ticker-value">Jul 11st, 2022</p>
                </div>
              </div>
            </div>
            <div className="submit-button">
              <button className="inline-flex w-full tracking-widest launcapp-btn px-4 py-4 text-white justify-center rounded-md">
                Launch App
              </button>
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
        <div className="my-10 sm:grid md:grid-cols-2 xl:grid-cols-3 3xl:flex flex-wrap justify-center">
          <div className="max-w-sm w-full border-2 border-white rounded-xl custom-shadow lg:max-w-full lg:flex">
            <div
              className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
              style={{
                backgroundImage: `url("https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-674010.jpg&fm=jpg")`,
              }}
              title="Woman holding a mug"
            ></div>
            <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
              <div className="mb-8">
                <p className="text-sm text-gray-600 flex items-center">
                  <svg
                    className="fill-current text-gray-500 w-3 h-3 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                  </svg>
                  Members only
                </p>
                <div className="text-gray-900 font-bold text-xl mb-2">
                  Can coffee make you a better developer?
                </div>
                <p className="text-gray-700 text-base">
                  Lorem ipsum dolor sit amet,
                </p>
              </div>
              <div className="flex items-center">
                {/* <img className="w-10 h-10 rounded-full mr-4" src="/img/jonathan.jpg" alt="Avatar of Jonathan Reinink"> */}
                <div className="text-sm">
                  <p className="text-gray-900 leading-none">Jonathan Reinink</p>
                  <p className="text-gray-600">Aug 18</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default DApp;
