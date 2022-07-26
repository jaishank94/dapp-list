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

const faqs = [
  {
    question: "What is PulseChainProjects.io?",
    answer:
      "A ranking site for new or existing projects launching on PulseChain. ",
  },
  {
    question: "Is it free?",
    answer:
      "Yes, PulseChainProjects.io is completely free tool to use for the community. All content is user generated. ",
  },
  {
    question: "When will I see my project listing?",
    answer:
      "It takes around 12-24 hours before your listing will appear on the homepage. ",
  },
  {
    question: "How do I get my project listing? ",
    answer:
      "Visit PulseChainProjects.io/Submit-Your-Dapp, Fill-out all required fields, Be unique, don’t just copy and paste your descriptions ",
  },
  {
    question: "Why do I have to connect my wallet?",
    answer: "If you would like to upvote or downvote a project.  ",
  },
  {
    question: "If you would like to upvote or downvote a project. ",
    answer:
      "As of right now we are focusing on brand new projects launching on PulseChain. Possibly in the future we will support other blockchain listings.  ",
  },
];

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
                <div className="flex justify-center items-center relative h-32 w-32">
                  <div className="rounded-xl object-fill bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg">
                    <Image
                      alt="logo"
                      width={80}
                      height={80}
                      className="rounded-lg h-32 w-32"
                      src={whiteLogo}
                    />
                  </div>
                </div>
                <div className="flex-initial px-5 xl:p-5">
                  <div className="py-4">
                    <h5 className="font-bold text-lg md:text-3xl">
                      PulseChainProjects.io
                    </h5>
                    <p className="text-gray-500 text-sm">
                      Directory of all the projects launching on PulseChain
                    </p>
                  </div>
                </div>
              </div>
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
            </div>
            <div className="flex flex-col justify-center items-center py-16">
              <h1 className="text-3xl font-semibold">How it works?</h1>
              <div className="grid grid-cols-2 gap-8 justify-between py-6">
                <div className="relative">
                  <div className="p-2 md:p-4 absolute z-50">
                    <p className="text-lg w-3/4 font-bold">
                      {"Lorem Ipsum doloramet sit."}
                    </p>
                    <p className="text-xs w-3/4  pt-1 font-bold">
                      It is a long established fact that reader will be
                      distracted by the readable content of a page when looking.
                    </p>
                  </div>
                  <div className="p-2 md:p-4 h-72 w-52 shadow rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-25">
                    <div className="rotate-[5deg] absolute -top-[0.5px] h-72 w-52 shadow border-4 rounded-lg border-rose-600 opacity-25"></div>
                  </div>
                </div>
                <div className="relative">
                  <div className="p-2 md:p-4 absolute z-50">
                    <p className="text-lg w-3/4 font-bold">
                      {"Lorem Ipsum doloramet sit."}
                    </p>
                    <p className="text-xs w-3/4  pt-1 font-bold">
                      It is a long established fact that reader will be
                      distracted by the readable content of a page when looking.
                    </p>
                  </div>
                  <div className="p-2 md:p-4 h-72 w-52 shadow rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-25">
                    <div className="rotate-[5deg] absolute -top-[0.5px] h-72 w-52 shadow border-4 rounded-lg border-rose-600 opacity-25"></div>
                  </div>
                </div>
                <div className="relative">
                  <div className="p-2 md:p-4 absolute z-50">
                    <p className="text-lg w-3/4 font-bold">
                      {"Lorem Ipsum doloramet sit."}
                    </p>
                    <p className="text-xs w-3/4  pt-1 font-bold">
                      It is a long established fact that reader will be
                      distracted by the readable content of a page when looking.
                    </p>
                  </div>
                  <div className="p-2 md:p-4 h-72 w-52 shadow rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-25">
                    <div className="rotate-[5deg] absolute -top-[0.5px] h-72 w-52 shadow border-4 rounded-lg border-rose-600 opacity-25"></div>
                  </div>
                </div>
                <div className="relative">
                  <div className="p-2 md:p-4 absolute z-50">
                    <p className="text-lg w-3/4 font-bold">
                      {"Lorem Ipsum doloramet sit."}
                    </p>
                    <p className="text-xs w-3/4  pt-1 font-bold">
                      It is a long established fact that reader will be
                      distracted by the readable content of a page when looking.
                    </p>
                  </div>
                  <div className="p-2 md:p-4 h-72 w-52 shadow rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-25">
                    <div className="rotate-[5deg] absolute -top-[0.5px] h-72 w-52 shadow border-4 rounded-lg border-rose-600 opacity-25"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center py-16">
              <h1 className="text-3xl font-semibold">FAQs</h1>
              <div
                id="accordion-collapse"
                className="py-4"
                data-accordion="collapse"
              >
                {faqs.map((val, i) => {
                  return (
                    <div className="py-4" key={i}>
                      <h2 id="accordion-collapse-heading-1">
                        <div
                          className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                          data-accordion-target="#accordion-collapse-body-1"
                          aria-expanded="true"
                          aria-controls="accordion-collapse-body-1"
                        >
                          <span>{val.question}</span>
                        </div>
                      </h2>
                      <div
                        id="accordion-collapse-body-1"
                        className=""
                        aria-labelledby="accordion-collapse-heading-1"
                      >
                        <div className="p-5 font-light border shadow-xl border-gray-200 dark:border-gray-700 dark:bg-neutral-900 dark:shadow-neutral-800">
                          <p className="mb-2 text-gray-500 dark:text-gray-400">
                            {val.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex cursor-pointer justify-center items-center text-center text-gray-500 text-sm py-8 px-4">
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

        <div className="relative w-full bottom-0">
          <Footer />
        </div>
      </div>
    </Fragment>
  );
}
