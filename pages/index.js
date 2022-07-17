import React, { Fragment } from 'react';
import Head from 'next/head';
import { useRouter } from "next/router";
import Header from './components/Header';
import Tbody from './components/tbody';

export default function Home() {
  const router = useRouter();
  return (
    <Fragment>
      <Head>
        <link href="http://fonts.cdnfonts.com/css/gordita" rel="stylesheet"></link>
      </Head>
      <div className="relative wrapper overflow-hidden">
        <div className="max-width-1200 mx-auto">
          <div className="relative z-10 pb-8 bg-transparent sm:pb-16">
            <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
              <Header />
            </div>
          </div>
          <div className="mb-2.5">
            <div className="flex flex-row flex-wrap items-center justify-between table-top-wrapper" style={{ marginBottom: "10px" }}>
              <h2 className="items-center ml-1 mb-0 custom-text">Total: 45 Apps</h2>
              <div className="container-right">
                <div className="w-full btn-group dropdown">
                  <li className="dropdown-toggle menuActive">
                    Filter
                    <span className="caret"></span>
                  </li>
                </div>
                <div className="btn-group dropdown">
                  <li className="dropdown-toggle menuActive">
                    Categories
                    <span className="caret"></span>
                  </li>
                </div>
                {/* <div className="flex flex-wrap overflow-hidden md:-mx-1 lg:-mx-1 xl:-mx-1">
            <div className="my-1 px-1 w-1/3 overflow-hidden md:my-1 md:px-1 lg:my-1 lg:px-1 lg:w-1/3 xl:my-1 xl:px-1 xl:w-1/3">
              <button
                type="submit"
                className="width-90 bg-custom-color rounded-full py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none"
              >
                Daily
              </button>
            </div>
            <div className="my-1 px-1 w-1/3 overflow-hidden md:my-1 md:px-1 lg:my-1 lg:px-1 lg:w-1/3 xl:my-1 xl:px-1 xl:w-1/3">
              <button
                type="submit"
                className="width-90 bg-custom-color rounded-full py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none"
              >
                Weekly
              </button>
            </div>
            <div className="my-1 px-1 w-1/3 overflow-hidden md:my-1 md:px-1 lg:my-1 lg:px-1 lg:w-1/3 xl:my-1 xl:px-1 xl:w-1/3">
              <button
                type="submit"
                className="width-90 bg-custom-color rounded-full py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none"
              >
                Monthly
              </button>
            </div>
          </div> */}
              </div>
            </div>
            <div className="table-header">
              <div className="table-row">
                <div className="table-head col-rank">
                  <div className="component-ranking-table-rank-head">
                    <a href="#" className="label head-link router-link-active is-active">
                      Rank
                    </a>
                    <div className="help">
                      <div className="help-inner">
                        i
                      </div>
                    </div>
                  </div>
                </div>
                <div className="table-head col-name">
                  <div className="component-ranking-table-name-head"></div>
                </div>
                <div className="table-head col-dau">
                  <div data-v-e13d5096="" className="component-ranking-table-dau-head">
                    <a href="/?sort=dau&amp;order=desc&amp;time=last_day" className="label head-link router-link-active">Page Views</a>
                    <div className="help">
                      <div className="help-inner">
                        i
                      </div>
                    </div>
                  </div>
                </div>
                <div className="table-head col-tx">
                  <div className="component-ranking-table-tx-head">
                    <a href="/?sort=tx&amp;order=desc&amp;time=last_day" className="label head-link router-link-active">Status</a>
                    <div className="help">
                      <div className="help-inner">
                        i
                      </div>
                    </div>
                  </div>
                </div>
                <div className="table-head col-vol">
                  <div className="component-ranking-table-volume-head">
                    <a href="/?sort=volume_hive&amp;order=desc&amp;time=last_day" className="label head-link router-link-active">Ticker</a>
                    <div className="help">
                      <div className="help-inner">
                        i
                      </div>
                    </div>
                  </div>
                </div>
                <div className="table-head col-vol col-vol-hbd">
                  <div className="component-ranking-table-volume-head">
                    <a href="/?sort=volume_hbd&amp;order=desc&amp;time=last_day" className="label head-link router-link-active">Sacrifice</a>
                    <div className="help">
                      <div className="help-inner">
                        i
                      </div>
                    </div>
                  </div>
                </div>
                <div className="table-head col-rewards col-rewards-hive">
                  <div className="component-ranking-table-rewards-head">
                    <a href="/?sort=rewards_hive&amp;order=desc&amp;time=last_day" className="label head-link router-link-active">Total Supply</a>
                    <div className="help">
                      <div className="help-inner">
                        i
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div onClick={() => router.push({ pathname: '/dApp' })}>
              <Tbody />
            </div>
          </div>
        </div>
      </div>
    </Fragment>

  )
}
