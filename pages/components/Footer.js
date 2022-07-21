import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { BsTwitter, BsGithub } from "react-icons/bs";

export default function Footer() {
  const router = useRouter();

  return (
    <Fragment>
      <footer className="text-center relative bottom-0 mt-16 w-full border-t-2 border-gray-200">
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
      <div className="w-full py-2 grid grid-rows-2 grid-flow-col gap-2 md:grid-rows-1 bg-black items-center">
        <div className="cursor-pointer text-sm text-gray-500 text-center">
          © {new Date().getFullYear()} PulseChainProjects.io | All Rights
          Reserved
        </div>
        <div className="">
          <p className="link cursor-pointer text-sm text-center">
            {" "}
            Built by the Community
          </p>
        </div>
      </div>
    </Fragment>
  );
}
