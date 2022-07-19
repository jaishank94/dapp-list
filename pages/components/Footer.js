import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { BsTwitter, BsGithub } from "react-icons/bs";

export default function Footer() {
  const router = useRouter();

  return (
    <Fragment>
      <footer className="p-4 bg-white w-full shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
        <span className="cursor-pointer text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © {new Date().getFullYear()}{" "}
          <a
            onClick={() => router.push("/")}
            className="hover:underline"
          >
            All Rights Reserved | PulseChainProjects.io | Built by the Community
          </a>
        </span>
        <ul className="flex p-2 flex-wrap cursor-pointer items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
            <a
              className="  mr-4 hover:underline md:mr-6 "
              onClick={() => router.push("/createDapp")}
            >
              Submit your Dapp
            </a>
          </li>
          <li>
            <a
              className="  mr-4 hover:underline md:mr-6 "
              onClick={() => router.push("/dappRemoval")}
            >
              Request Removal
            </a>
          </li>
          <li>
            <a
              className="mr-4 hover:underline md:mr-6 "
              onClick={() => router.push("/dappAbusive")}
            >
              Report Abuse
            </a>
          </li>
          <li>
            <a
              className="mr-4 hover:underline md:mr-6 "
              onClick={() => router.push("/aboutUs")}
            >
              About Us
            </a>
          </li>
          <li className="pt-3 px-2">
            <a
              className="mr-4 hover:underline md:mr-6 "
              onClick={() => router.push("/aboutUs")}
            >
              <BsTwitter className="h-5 w-5 text-blue-500"/>
            </a>
          </li>
          <li className="pt-3">
            <a
              className="mr-4 my-4 hover:underline md:mr-6 "
              onClick={() => router.push("/aboutUs")}
            >
              <BsGithub className="h-5 w-5 text-black"/>
            </a>
          </li>
        </ul>
      </footer>
    </Fragment>
  );
}
