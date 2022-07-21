import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { BsTwitter, BsGithub } from "react-icons/bs";

export default function Footer() {
  const router = useRouter();

  return (
    <Fragment>
      <footer className="p-4 bg-white text-center  relative bottom-0 mt-16 w-full shadow border-t-2 border-gray-300 md:items-center md:justify-between md:p-6 dark:bg-gray-800">

        <div className="">
          <ul className="flex justify-center p-2 flex-wrap cursor-pointer items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
            <li className="p-2">
              <a
                className="  mr-4 hover:underline md:mr-6"
                onClick={() => router.push("/createDapp")}
              >
                Submit your Dapp
              </a>
            </li>
            <li className="p-2">
              <a
                className="  mr-4 hover:underline md:mr-6 "
                onClick={() => router.push("/dappRemoval")}
              >
                Request Removal
              </a>
            </li>
            <li className="p-2">
              <a
                className="mr-4 hover:underline md:mr-6 "
                onClick={() => router.push("/dappAbusive")}
              >
                Report Abuse
              </a>
            </li>
            <li className="p-2">
              <a
                className="mr-4 hover:underline md:mr-6 "
                onClick={() => router.push("/aboutUs")}
              >
                About Us
              </a>
            </li>
          </ul>
        </div>
      </footer>
      <div className="flex w-full flex-col md:flex-row visibility px-2 md:px-96 justify-center py-4 bg-black items-center">
        <div className="cursor-pointer text-center text-sm w-full md:w-6/12 text-gray-500 sm:text-center dark:text-gray-400">
          © {new Date().getFullYear()}{" "}
          PulseChainProjects.io | All Rights Reserved
        </div>
        <div className="text-center mt-2 md:m-0 w-full md:w-6/12">
          <p className="link cursor-pointer">  Built by the Community</p>
        </div>
      </div>
    </Fragment>
  );
}
