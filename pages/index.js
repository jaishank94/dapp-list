import React, { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Moralis from "moralis";
import { Listbox, Transition, Popover } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import Header from "./components/header";
import Tbody from "./components/tbody";
import { useMoralis } from "react-moralis";

const Filter = [{ name: "Filter" }, { name: "Arlene Mccoy" }];
const Category = [{ name: "Category" }, { name: "Arlene Mccoy" }];

export default function Home() {
  const { isInitialized } = useMoralis();

  const [data, setData] = useState([]);
  const [duration, setDuration] = useState("Daily");
  const [filter, setFilter] = useState(Filter[0]);
  const [category, setCategory] = useState(Category[0]);

  useEffect(() => {
    if (isInitialized) {
      getAppList();
    }

    console.log(isInitialized);
  }, [isInitialized]);

  const getAppList = async () => {
    const Dapps = Moralis.Object.extend("Dapps");
    const query = new Moralis.Query(Dapps);
    query.limit(1000);
    const response = await query.find();
    let result = JSON.parse(JSON.stringify(response));
    setData(result);

    // return (
    //   <div onClick={() => router.push({ pathname: '/dApp' })}>
    //     <Tbody />
    //   </div>
    // )
  };

  const router = useRouter();
  return (
    <Fragment>
      <Head>
        <link
          href="http://fonts.cdnfonts.com/css/gordita"
          rel="stylesheet"
        ></link>
      </Head>
      <div className="relative wrapper overflow-hidden">
        <div className="w-full border-b-2 border-slate-300 py-2 mb-5">
          <div className="container mx-auto">
            <div className="relative z-10 bg-transparent">
              <div className="relative">
                <Header displayCreate={true} />
              </div>
            </div>
          </div>
        </div>

        <div className="max-width-1200 mx-auto">
          <div className="my-16">
            <div
              className="flex flex-row flex-wrap items-center justify-between table-top-wrapper"
              style={{ marginBottom: "10px" }}
            >
              <h2 className="items-center ml-1 mb-0 custom-text text-dark">
                Explore Projects
              </h2>
              <div>
                <div className="flex items-center justify-center">
                  <div
                    className="inline-flex border-2 rounded-full border-white custom-shadow "
                    role="group"
                  >
                    <button
                      type="button"
                      onClick={() => setDuration("Daily")}
                      className={`rounded-full
        px-6
        py-2
        font-medium
        text-xs
        leading-tight
        uppercase
        transition
        duration-150
        ease-in-out
  
        text-gray-400
         ${
           duration === "Daily"
             ? " border-2 custom-shadow font-semibold grad-text-color text-violet-700"
             : ""
         }`}
                    >
                      <p className={` ${duration === "Daily" ? " link" : ""}`}>
                        Daily
                      </p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDuration("Weekly")}
                      className={`rounded-full
      px-6
      py-2
      text-dark
      font-medium
      text-xs
      leading-tight
      uppercase
      hover:bg-black hover:bg-opacity-5
      focus:outline-none focus:ring-0
      transition
      duration-150
      ease-in-out

      text-gray-400
       ${
         duration === "Weekly"
           ? " border-2 font-semibold custom-shadow grad-text-color"
           : ""
       }`}
                    >
                      <p className={` ${duration === "Weekly" ? " link" : ""}`}>
                        Weekly
                      </p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDuration("Monthly")}
                      className={`rounded-full
      px-6
      py-2
      text-dark
      font-medium
      text-xs
      leading-tight
      uppercase
      hover:bg-black hover:bg-opacity-5
      focus:outline-none focus:ring-0
      transition
      duration-150
      ease-in-out

      text-gray-400
       ${
         duration === "Monthly"
           ? " border-2 font-semibold custom-shadow grad-text-color"
           : ""
       }`}
                    >
                      <p
                        className={` ${duration === "Monthly" ? " link" : ""}`}
                      >
                        Monthly
                      </p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDuration("Yearly")}
                      className={`rounded-full
                      px-6
                      py-2
                      text-dark
                      font-medium
                      text-xs
                      leading-tight
                      uppercase
                      hover:bg-black hover:bg-opacity-5
                      focus:outline-none focus:ring-0
                      transition
                      duration-150
                      ease-in-out
                
                      text-gray-400
                       ${
                         duration === "Yearly"
                           ? " border-2 font-semibold custom-shadow grad-text-color"
                           : ""
                       }`}
                    >
                      <p className={` ${duration === "Yearly" ? " link" : ""}`}>
                        Yearly
                      </p>
                    </button>
                  </div>
                </div>
              </div>
              <div className="container-right">
                <div className="relative">
                <Listbox value={filter} onChange={setFilter}>
                  <div className="relative mt-1 mx-2">
                    <Listbox.Button className="border-2 border-white custom-shadow rounded-full relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                      <span className="block truncate text-gray-400">
                        {filter.name}
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <SelectorIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-xs shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {Filter.map((data, dataIdx) => (
                          <Listbox.Option
                            key={dataIdx}
                            className={({ active }) =>
                              `cursor-default select-none py-2 pl-10 pr-4 ${
                                active
                                  ? "bg-amber-100 text-amber-900"
                                  : "text-gray-900"
                              }`
                            }
                            value={data}
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected
                                      ? "text-gray-400 font-medium"
                                      : "font-normal"
                                  }`}
                                >
                                  {data.name}
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                    <CheckIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
                </div>
                
                <Listbox value={category} onChange={setCategory}>
                  <div className="relative mt-1">
                    <Listbox.Button className="border-2 border-white custom-shadow rounded-full relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                      <span className="block truncate text-gray-400">
                        {category.name}
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <SelectorIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-xs shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {Category.map((data, dataIdx) => (
                          <Listbox.Option
                            key={dataIdx}
                            className={({ active }) =>
                              `cursor-default select-none py-2 pl-10 pr-4 ${
                                active
                                  ? "bg-amber-100 text-amber-900"
                                  : "text-gray-900"
                              }`
                            }
                            value={data}
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected
                                      ? "text-gray-400 font-medium"
                                      : "font-normal"
                                  }`}
                                >
                                  {data.name}
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                    <CheckIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-width-1200 mx-auto">
        <div className="table-header rounded-md">
          <div className="table-row">
            <div className="table-head col-rank">
              <div className="component-ranking-table-rank-head">
                <a
                  href="#"
                  className="label head-link router-link-active is-active"
                >
                  Rank
                </a>
                <Popover className="relative help">
                  <Popover.Button className="help-inner">i</Popover.Button>

                  <Popover.Panel className="absolute bg-black text-white p-2 rounded-xl z-10">
                    <span>Dummy Text</span>

                    <img src="/solutions.jpg" alt="" />
                  </Popover.Panel>
                </Popover>
              </div>
            </div>
            <div className="table-head col-name">
              <div className="component-ranking-table-name-head"></div>
            </div>
            <div className="table-head col-dau">
              <div
                data-v-e13d5096=""
                className="component-ranking-table-dau-head"
              >
                <a
                  href="/?sort=dau&amp;order=desc&amp;time=last_day"
                  className="label head-link router-link-active"
                >
                  Page Views
                </a>
                <Popover className="relative help">
                  <Popover.Button className="help-inner">i</Popover.Button>

                  <Popover.Panel className="absolute bg-black text-white p-2 rounded-xl z-10">
                    <span>Dummy Text</span>

                    <img src="/solutions.jpg" alt="" />
                  </Popover.Panel>
                </Popover>
              </div>
            </div>
            <div className="table-head col-tx">
              <div className="component-ranking-table-tx-head">
                <a
                  href="/?sort=tx&amp;order=desc&amp;time=last_day"
                  className="label head-link router-link-active"
                >
                  Status
                </a>
                <Popover className="relative help">
                  <Popover.Button className="help-inner">i</Popover.Button>

                  <Popover.Panel className="absolute bg-black text-white p-2 rounded-xl z-10">
                    <span>Dummy Text</span>

                    <img src="/solutions.jpg" alt="" />
                  </Popover.Panel>
                </Popover>
              </div>
            </div>
            <div className="table-head col-vol">
              <div className="component-ranking-table-volume-head">
                <a
                  href="/?sort=volume_hive&amp;order=desc&amp;time=last_day"
                  className="label head-link router-link-active"
                >
                  Ticker
                </a>
                <Popover className="relative help">
                  <Popover.Button className="help-inner">i</Popover.Button>

                  <Popover.Panel className="absolute bg-black text-white p-2 rounded-xl z-10">
                    <span>Dummy Text</span>

                    <img src="/solutions.jpg" alt="" />
                  </Popover.Panel>
                </Popover>
              </div>
            </div>
            <div className="table-head col-vol col-vol-hbd">
              <div className="component-ranking-table-volume-head">
                <a
                  href="/?sort=volume_hbd&amp;order=desc&amp;time=last_day"
                  className="label head-link router-link-active"
                >
                  Sacrifice
                </a>
                <Popover className="relative help">
                  <Popover.Button className="help-inner">i</Popover.Button>

                  <Popover.Panel className="absolute bg-black text-white p-2 rounded-xl z-10">
                    <span>Dummy Text</span>

                    <img src="/solutions.jpg" alt="" />
                  </Popover.Panel>
                </Popover>
              </div>
            </div>
            <div className="table-head col-rewards col-rewards-hive">
              <div className="component-ranking-table-rewards-head">
                <a
                  href="/?sort=rewards_hive&amp;order=desc&amp;time=last_day"
                  className="label head-link router-link-active"
                >
                  Total Supply
                </a>
                <Popover className="relative help">
                  <Popover.Button className="help-inner">i</Popover.Button>

                  <Popover.Panel className="absolute bg-black text-white p-2 rounded-xl z-10">
                    <span>Dummy Text</span>

                    <img src="/solutions.jpg" alt="" />
                  </Popover.Panel>
                </Popover>
              </div>
            </div>
            <div className="table-head col-rewards col-rewards-hive">
              <div className="component-ranking-table-rewards-head">
                <a
                  href="/?sort=rewards_hive&amp;order=desc&amp;time=last_day"
                  className="label head-link router-link-active"
                >
                  Vote
                </a>
                <Popover className="relative help">
                  <Popover.Button className="help-inner">i</Popover.Button>

                  <Popover.Panel className="absolute bg-black text-white p-2 rounded-xl z-10">
                    <span>Dummy Text</span>

                    <img src="/solutions.jpg" alt="" />
                  </Popover.Panel>
                </Popover>
              </div>
            </div>
          </div>
        </div>
        {data &&
          data.length > 0 &&
          data.map((res, i) => {
            return (
              <div
                onClick={() =>
                  router.push({ pathname: `/dappDetails/${res.objectId}` })
                }
              >
                <Tbody
                  index={i + 1}
                  name={res.name}
                  short_description={res.short_description}
                  types={res.type}
                  app_status={res.app_status}
                />
              </div>
            );
          })}
      </div>
    </Fragment>
  );
}
