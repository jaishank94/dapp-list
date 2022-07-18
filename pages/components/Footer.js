import { useRouter } from "next/router";
import React, { Fragment } from "react";

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
            PulseChainProjects.io
          </a>
        </span>
        <ul className="flex flex-wrap cursor-pointer items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a
              className="  mr-4 hover:underline md:mr-6 "
              onClick={() => router.push("/dappRemoval")}
            >
              Remove DApp
            </a>
          </li>
          <li>
            <a
              className="mr-4 hover:underline md:mr-6 "
              onClick={() => router.push("/dappAbusive")}
            >
              Report DApp
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
        </ul>
      </footer>
    </Fragment>
  );
}
