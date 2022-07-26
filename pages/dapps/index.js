import React, { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Moralis from "moralis";
import Image from "next/image";
import { Listbox, Transition, Popover } from "@headlessui/react";
// import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import Header from "../components/Header";
import Tbody from "../components/tbody";
import { useMoralis } from "react-moralis";
import Footer from "../components/Footer";
import moment from "moment";
import Sidebar from "../components/Sidebar";
import howToPulse from "/public/images/howToPulse.png";
import { useTheme } from "next-themes";

const Filter = [
  { name: "Filter" },
  { name: "Live" },
  { name: "Beta" },
  { name: "Alpha" },
  { name: "Work in Progress" },
];
const Category = [
  { name: "Category" },
  { name: "Games" },
  { name: "Entertainment" },
  { name: "Exchanges" },
  { name: "DeFi" },
  { name: "MarketPlaces" },
  { name: "Governance" },
  { name: "Yield-farming" },
  { name: "Property" },
  { name: "Tools" },
  { name: "Identity" },
  { name: "Energy" },
  { name: "Insurance" },
  { name: "Storage" },
  { name: "NFT" },
  { name: "Development" },
  { name: "Gambling" },
  { name: "Wallet" },
  { name: "Finance" },
  { name: "Promotion" },
  { name: "Social" },
  { name: "Media" },
  { name: "Security" },
  { name: "Utility" },
  { name: "Interface" },
  { name: "Education" },
  { name: "Health" },
  { name: "Content Discovery" },
];

export default function index() {
  const { isInitialized } = useMoralis();
  const [data, setData] = useState([]);
  const [duration, setDuration] = useState("Daily");
  const [filter, setFilter] = useState(Filter[0]);
  const [category, setCategory] = useState(Category[0]);
  const [isLoading, setLoading] = useState(false);
  const { theme, setTheme } = useTheme("dark");
  const [isMounted, setMounted] = useState(false);
  const { query } = useRouter();
  const { filter_category } = query;

  useEffect(() => {
    if (isInitialized) {
      // console.log("Asd", query)
      // if(query)
      getAppList();
    }
  }, [isInitialized, category, filter, duration, filter_category]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getAppList = async () => {
    setLoading(true);
    try {
      const Dapps = Moralis.Object.extend("Dapps");
      const query = new Moralis.Query(Dapps);

      if (category.name !== "Category") {
        query.containedIn("type", [category.name]);
      }
      console.log("asdasdad", filter_category);

      if (filter_category && filter_category !== "Category") {
        console.log("asdasdad", filter_category);
        query.containedIn("type", [filter_category]);
      }
      if (filter.name !== "Filter") {
        query.equalTo("app_status", filter.name);
      }
      query.equalTo("status", "ACTIVE");

      if (duration !== "Daily") {
        let startDay =
          duration === "Yearly" ? 365 : duration === "Monthly" ? 30 : 7;
        let d = moment().subtract(startDay, "days");

        d.startOf("day");

        let finish = new moment();

        query.greaterThanOrEqualTo("createdAt", d.toDate());
        query.lessThan("createdAt", finish.toDate());
      }
      query.ascending("priority");
      query.limit(1000);
      const response = await query.find();
      let result = JSON.parse(JSON.stringify(response));
      console.log("result", result);
      setData(result);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  const handleCategory = (e) => {
    setCategory(e);
  };

  const handleFilter = (e) => {
    setFilter(e);
  };

  const handleSidebar = () => {
    // console.log("jklhksd")
    setIsOpen(!isOpen);
  };

  const router = useRouter();
  const isColors =
    router.pathname.includes("/colors") ||
    router.pathname.includes("/docs/colors");
  // console.log("jkbsbdkjbfksdbfksdbfsd", isColors)

  if (!isMounted) return null;

  return (
    <Fragment>
      <div className="wrapper custom-wrapper overflow-hidden">
        <div
          className={`w-full ${
            theme === "light" ? "border-b-2" : "border-b-0"
          } border-slate-300 mb-5`}
        >
          <Header displayCreate={true} handleSidebar={handleSidebar} />
        </div>

        <div className="flex flex-col md:flex-row justify-between p-2 max-w-7xl mx-auto">
          {/* <div className="my-16"> */}
          <div className="flex flex-row flex-wrap">
            <h2 className="items-center cursor-default ml-1 mb-6 font-bold text-2xl text-dark lg:mb-0">
              Explore Projects
            </h2>
          </div>
          <div>
            <div>
              <div className="flex items-center justify-center">
                <div
                  className={`inline-flex border-2 rounded-full ${
                    theme === "light" ? "border-slate" : "border-black"
                  }`}
                  role="group"
                >
                  <button
                    type="button"
                    onClick={() => setDuration("Daily")}
                    className={`rounded-full
                      px-4
                      xl:px-6
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
                          ? ` border-2 font-semibold grad-text-color text-violet-700 ${
                              theme === "light"
                                ? ""
                                : " border-black"
                            }`
                          : ""
                      }`}
                  >
                    <p
                      className={`sm:text-xs${
                        duration === "Daily" ? " link" : ""
                      }`}
                    >
                      Daily
                    </p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDuration("Weekly")}
                    className={`rounded-full
                      px-4
                      xl:px-6
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
                            ? ` border-2 font-semibold grad-text-color text-violet-700 ${
                                theme === "light"
                                  ? ""
                                  : " border-black"
                              }`
                            : ""
                        }`}
                  >
                    <p
                      className={`sm:text-xs ${
                        duration === "Weekly" ? " link" : ""
                      }`}
                    >
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
                            ? ` border-2 font-semibold grad-text-color text-violet-700 ${
                                theme === "light"
                                  ? ""
                                  : " border-black"
                              }`
                            : ""
                        }`}
                  >
                    <p
                      className={`sm:text-xs ${
                        duration === "Monthly" ? " link" : ""
                      }`}
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
                           ? ` border-2 font-semibold grad-text-color text-violet-700 ${
                               theme === "light"
                                 ? ""
                                 : " border-black"
                             }`
                           : ""
                       }`}
                  >
                    <p
                      className={`sm:text-xs ${
                        duration === "Yearly" ? " link" : ""
                      }`}
                    >
                      Yearly
                    </p>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex mt-2 w-full text-center justify-center md:justify-end">
              <Listbox value={filter} onChange={(e) => handleFilter(e)}>
                <div className="mt-1 mx-2">
                  <Listbox.Button
                    className={`${
                      theme === "light"
                        ? "border-white  bg-white border-2 "
                        : "bg-dark shadow-neutral-800 border-black"
                    }  rounded-full relative cursor-pointer rounded-lg  py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm`}
                  >
                    <span className="block truncate text-gray-400">
                      {filter.name}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      {/* <SelectorIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      /> */}
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options
                      className={`absolute mt-1 z-40 max-h-60 ${
                        theme === "light" ? "bg-white" : "bg-black"
                      } overflow-auto rounded-md py-1 text-xs shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm`}
                    >
                      {Filter.map((data, dataIdx) => (
                        <Listbox.Option
                          key={dataIdx}
                          className={({ active }) =>
                            `cursor-pointer select-none py-2 pl-4 pr-4 
                                ${
                                  theme === "light"
                                    ? "text-gray-900"
                                    : "text-white"
                                }
                                ${active ? "bg-amber-100 text-amber-900" : ""}`
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
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>

              <Listbox value={category} onChange={(e) => handleCategory(e)}>
                <div className="mt-1">
                  <Listbox.Button
                    className={`${
                      theme === "light"
                        ? "border-white  bg-white border-2 "
                        : "bg-dark shadow-neutral-800 border-black"
                    }  rounded-full relative cursor-pointer rounded-lg  py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm`}
                  >
                    <span className="block truncate text-gray-400">
                      {category.name}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      {/* <SelectorIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      /> */}
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options
                      className={`absolute z-40 mt-1 max-h-60 overflow-auto ${
                        theme === "light" ? "bg-white" : "bg-black"
                      }  rounded-md  py-1 text-xs shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm`}
                    >
                      {Category.map((data, dataIdx) => (
                        <Listbox.Option
                          key={dataIdx}
                          className={({ active }) =>
                            `cursor-pointer select-none py-2 pl-4 pr-4 
                              
                                ${
                                  theme === "light"
                                    ? "text-gray-900"
                                    : "text-white"
                                }

                                ${active ? "bg-amber-100 text-amber-900" : ""}`
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
          {/* </div> */}
        </div>
        <div className="flex flex-col justify-between p-2 py-16 max-w-7xl mx-auto">
          <div
            className={` hidden lg:inline-flex r py-4 rounded-md ${
              theme === "light" ? "bg-white shadow-md" : "bg-neutral-800"
            }`}
          >
            <div className="flex grid grid-cols-8 gap-2 jusitfy-between space-x-10 ">
              <div className="px-2">
                <div className="flex">
                  <a
                    href="#"
                    className=""
                  >
                    Rank
                  </a>
                  <Popover className="relative help ">
                    <Popover.Button className="help-inner">i</Popover.Button>

                    <Popover.Panel className="absolute w-max bg-black text-white p-2 rounded-xl z-10">
                      <span>
                        The rank is calculated from different metrics (incl.
                        Price, Page views, status & more).
                        <br />
                        Keep in mind: the rank is not an exact metric to
                        determine the value of an app.
                      </span>

                      <img src="/solutions.jpg" alt="" />
                    </Popover.Panel>
                  </Popover>
                </div>
              </div>
              <div className="">
                <div className="component-ranking-table-name-head"></div>
              </div>
              <div className="">
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

                    <Popover.Panel className="absolute w-max bg-black text-white p-2 rounded-xl z-10">
                      <span>Amount of overall page visits</span>

                      <img src="/solutions.jpg" alt="" />
                    </Popover.Panel>
                  </Popover>
                </div>
              </div>
              <div className="">
                <div className="component-ranking-table-tx-head">
                  <a
                    href="/?sort=tx&amp;order=desc&amp;time=last_day"
                    className="label head-link router-link-active"
                  >
                    Status
                  </a>
                  <Popover className="relative help">
                    <Popover.Button className="help-inner">i</Popover.Button>

                    <Popover.Panel className="absolute w-max bg-black text-white p-2 rounded-xl z-10">
                      <span>Current status of development</span>

                      <img src="/solutions.jpg" alt="" />
                    </Popover.Panel>
                  </Popover>
                </div>
              </div>
              <div className="">
                <div className="component-ranking-table-volume-head">
                  <a
                    href="/?sort=volume_hive&amp;order=desc&amp;time=last_day"
                    className="label head-link router-link-active"
                  >
                    Ticker
                  </a>
                  <Popover className="relative help">
                    <Popover.Button className="help-inner">i</Popover.Button>

                    <Popover.Panel className="absolute w-max bg-black text-white p-2 rounded-xl z-10">
                      <span>Project Ticker Symbol</span>

                      <img src="/solutions.jpg" alt="" />
                    </Popover.Panel>
                  </Popover>
                </div>
              </div>
              <div className="">
                <div className="component-ranking-table-volume-head">
                  <a
                    href="/?sort=volume_hbd&amp;order=desc&amp;time=last_day"
                    className="label head-link router-link-active"
                  >
                    Sacrifice
                  </a>
                  <Popover className="relative help">
                    <Popover.Button className="help-inner">i</Popover.Button>

                    <Popover.Panel className="absolute w-max bg-black text-white p-2 rounded-xl z-10">
                      <span>Project is raising capital</span>

                      <img src="/solutions.jpg" alt="" />
                    </Popover.Panel>
                  </Popover>
                </div>
              </div>
              <div className="">
                <div className="component-ranking-table-rewards-head">
                  <a
                    href="/?sort=rewards_hive&amp;order=desc&amp;time=last_day"
                    className="label head-link router-link-active"
                  >
                    Total Supply
                  </a>
                  <Popover className="relative help">
                    <Popover.Button className="help-inner">i</Popover.Button>

                    <Popover.Panel className="absolute w-max bg-black text-white p-2 rounded-xl z-10">
                      <span>Total Amount of Tokens</span>

                      <img src="/solutions.jpg" alt="" />
                    </Popover.Panel>
                  </Popover>
                </div>
              </div>
              <div className="">
                <div className="component-ranking-table-rewards-head">
                  <a
                    href="/?sort=rewards_hive&amp;order=desc&amp;time=last_day"
                    className="label head-link router-link-active"
                  >
                    Vote
                  </a>
                  <Popover className="relative help">
                    <Popover.Button className="help-inner">i</Popover.Button>

                    <Popover.Panel className="absolute w-max bg-black text-white p-2 rounded-xl z-10">
                      <span>Give your feedback</span>

                      <img src="/solutions.jpg" alt="" />
                    </Popover.Panel>
                  </Popover>
                </div>
              </div>
            </div>
          </div>
          {data &&
            !isLoading &&
            data.length > 0 &&
            data.map((res, i) => {
              return (
                <div key={i}>
                  <Tbody
                    index={i + 1}
                    name={res.name}
                    logo={res.logo}
                    short_description={res.short_description}
                    types={res.type}
                    app_status={res.app_status}
                    id={res.objectId}
                    likes={res.likes ? res.likes : 0}
                    dislikes={res.dislikes ? res.dislikes : 0}
                    page_views={res.page_views ? res.page_views : 0}
                    sacrifice={res.sacrifice ? res.sacrifice : "-"}
                    ticker={res.ticker ? res.ticker : "-"}
                    total_supply={res.total_supply ? res.total_supply : "-"}
                  />
                </div>
              );
            })}

          {isLoading && (
            <>
              <p className="p-6 text-center">Loading...</p>
            </>
          )}

          {data && !isLoading && data.length == 0 && (
            <>
              <p className="p-6 text-center">No Data Found</p>
            </>
          )}
        </div>
      </div>
      <Footer />
    </Fragment>
  );
}
