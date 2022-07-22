import React, { Fragment, useEffect, useState } from "react";
import Header from "../components/Header";
import { useRouter } from "next/router";
import Moralis from "moralis";
import toast, { Toaster } from "react-hot-toast";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

export default function index() {
  const router = useRouter();
  const [project_url, setProjectUrl] = useState("");
  const [isLoading, setLoading] = useState(false);

  const reportAbusive = async () => {
    if (project_url === "") {
      toast.error("Project URL cannot be empty");

      return;
    }

    setLoading(true);
    try {
      const DappRemoval = Moralis.Object.extend("DappRemoval");
      const newObject = new DappRemoval();
      newObject.set("project_url", project_url);
      newObject.set("status", "ACTIVE");
      let response = await newObject.save();
      toast.success("Succefully submited");
      setProjectUrl("");
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <div className="relative overflow-hidden">
        <Toaster position="top-right" />

        <div className="w-full border-b-2 border-slate-300 py-2 mb-0">
          <Header displayCreate={false} />
        </div>
        <div className="w-full hidden mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-6 sm:px-0 xl:px-16 md:justify-center md:space-x-10">
            <div className="w-18">
              <button
                onClick={() => router.push("/dapps")}
                className="flex item-center rounded-full shadow-2xl"
              >
                <BsFillArrowLeftCircleFill className="h-12 w-12" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <>
        <div className="component-app-detail">
          <div className="bg-[#c6c6e4]">
            <div
              style={{ alignItems: "center" }}
              className="flex flex-col py-6 rounded-2xl text-xl justify-center border-2 shadow-xl"
            >
              <p className="font-bold my-2">Report Abusive Projects</p>
              <p className="font-normal text-gray-500 text-sm py-4">
              Do you see a SCAM project? Let us know..
              </p>
            </div>
            <div>
              <input
                type="text"
                className="form-control custom-input px-5 mt-4"
                id="youtube"
                name="youtube"
                placeholder="Enter project link"
                // value={project_url}
                onChange={(e) => setProjectUrl(e.target.value)}
              />
            </div>
            <div className="submit-button py-6">
              <button
                disabled={isLoading}
                onClick={() => reportAbusive()}
                className="inline-flex w-full tracking-widest cursor-pointer text-xs sm:text-xs xl:text-base launcapp-btn px-4 py-4 text-white justify-center rounded-md"
              >
                {isLoading
                  ? "Submitting..."
                  : "I think this DApp is a SCAM or Malicious"}
              </button>
            </div>
            <div className="flex justify-center items-center my-16">
              {/* <div className="w-18"> */}
              <button
                onClick={() => router.push("/dapps")}
                className="flex item-center rounded-full shadow-2xl"
              >
                <BsFillArrowLeftCircleFill className="h-5 w-5 mx-2" />
                <p>Back to home</p>
              </button>
              {/* </div> */}
            </div>
          </div>
        </div>
      </>
    </Fragment>
  );
}
