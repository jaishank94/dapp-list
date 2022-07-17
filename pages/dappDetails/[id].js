import React, { Fragment } from "react";
import { Menu, Transition } from '@headlessui/react'
// import { ChevronDownIcon } from '@heroicons/react/solid'

function DApp() {
  return (
    <Fragment>
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <a href="#">
                <span className="sr-only">Workflow</span>
                <img
                  className="h-8 w-auto sm:h-10"
                  src="/images/pp_final_icon_black.png"
                  alt=""
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <div className="icon-div">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 custom-back-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="component-app-detail">
        <div>
          <div className="card-header flex">
            <div className="flex-none w-14 h-14 card-icon">
              <div className="logo-img"></div>
            </div>
            <div className="flex-initial p-5 app-detail">
              <div className="">
                <h5 className="font-bold app-name">NFTonPulse.io</h5>
                <p className="app-desc mt-2">NFTonPulse is a NFT Marketplace. Buy, sell, trade, auction NFTs. Powered by the PulseChain.
</p>
              </div>
            </div>
            <div className="flex-initial edit-div p-5">
              <div className="edit-icon">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 custom-edit-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex mt-5">
            <div className="status">
              <div>
                <p className="custom-text">Status</p>
              </div>
              <div className="status-pill mt-2">
                <p className="status-detail">Live</p>
              </div>
            </div>
            <div className="page-view">
              <div>
                <p className="custom-text">Page Views</p>
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
                <p className="custom-text">Ticker</p>
              </div>
              <div className="mt-2">
                <p className="ticker-value">SPLT</p>
              </div>
            </div>
          </div>
          <div className="flex mt-5">
            <div className="status">
              <div>
                <p className="custom-text">Sacrifice</p>
              </div>
              <div className="mt-2">
                <p className="ticker-value">YES</p>
              </div>
            </div>
            <div className="page-view">
              <div>
                <p className="custom-text">Total Supply</p>
              </div>
              <div className="mt-2">
                <p className="ticker-value">1B INNO</p>
              </div>
            </div>
            <div className="ticker">
              <div>
                <p className="custom-text">Vote</p>
              </div>
              <div className="mt-2 flex">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ticker-value" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
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
              <p className="p-dapp">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
            </div>
          </div>
          <div className="mt-14 confirm-section p-5">
            <div className="flex">
              <div className="submit-status">
                <div>
                  <p className="custom-text">Submitted</p>
                </div>
                <div className="mt-2">
                  <p className="ticker-value">Jan 21st, 2021</p>
                </div>
              </div>
              <div className="seperator"></div>
              <div className="last-updated-status">
                <div>
                  <p className="custom-text">Last updated</p>
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
        <div className="group-3-6-8-4-8">
          <div className="rectangle-2-5-6" />
          <div className="rectangle-2-5-8" />
          <div className="maskgroup">
            <div className="rectangle-2-5-7" />
            <div className="rectangle-7-1" />
          </div>
          <p className="text-1">Hypno Chain</p>
          <p className="text-2">Your hub for all hypnosis related content.</p>
          <p className="text-3">Status</p>
          <p className="text-4">Ticker</p>
          <div className="group-9-2">
            <div className="rectangle-9-3" />
            <p className="text-5">Launch App</p>
          </div>
          <div className="maskgroup">
            <img src="" />
            <img src="" />
          </div>
          <div className="rectangle-7-1" />
          <p className="text-8">Live</p>
          <p className="text-9">Page Views</p>
          <p className="text-1-0">Sacrifice</p>
          <p className="text-1-1">YES</p>
          <p className="text-1-2">Submitted</p>
          <p className="text-1-3">It is a long established fact that a reader will be distracted by the readable content
            of a page when looking at its layout.</p>
          <p className="text-1-4">Jan 21st, 2021</p>
          <p className="text-1-5">Total Supply</p>
          <p className="text-1-6">1B INNO</p>
          <p className="text-1-7">SPLT</p>
          <p className="text-1-8">Vote</p>
          <p className="text-1-9">Last updated</p>
          <p className="text-2-0">Jul 11st, 2022</p>
      <div className="rectangle-2-5-7" />
          <img src="" />
          <img src="" />
          <img src="" />
          <img src="" />
          <img src="" />
          <img src="" />
          <div className="group-3-6-8-4-6">
            <p className="text-2-2">3,140,124</p>
            <div className="group-3-1">
              <div className="rectangle-7-5" />
              <div className="group-8">
                <img src="" />
                <p className="text-2-3">7.20%</p>
              </div>
            </div>
          </div>
          <div className="group-3-6-8-4-7">
            <p className="text-2-4">25</p>
            <div className="group-5-7">
              <img src="" />
            </div>
          </div>
        </div>
      </div>

    </Fragment >
  );
}

export default DApp;
