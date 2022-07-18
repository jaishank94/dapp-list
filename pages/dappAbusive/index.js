import React, { Fragment, useEffect, useState } from "react";
import Header from "../components/header";
import { useRouter } from "next/router";
import Moralis from "moralis";
import { useMoralis } from "react-moralis";
import toast, { Toaster } from "react-hot-toast";

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
          <div className="container mx-auto">
            <div className="relative z-10 bg-transparent">
              <div className="relative">
                <Header displayCreate={false} />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white w-full mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-6 px-16 md:justify-center md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1"></div>
          </div>
        </div>
      </div>
      <>
        <div className="component-app-detail">
          <div className="bg-[#c6c6e4]">
            <div
              style={{ alignItems: "center" }}
              className="card-header flex flex-col text-xl justify-center"
            >
              <p className="font-bold my-2">Report Abusive Project</p>
              <p className="font-normal text-gray-500 text-sm">
                Do you see a SCAM project? Let us know.
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
            <div className="submit-button">
              <button
                disabled={isLoading}
                onClick={() => reportAbusive()}
                className="inline-flex w-full tracking-widest cursor-pointer launcapp-btn px-4 py-4 text-white justify-center rounded-md"
              >
                {isLoading ? "Submitting..." : "I think DApp is a SCAM or Malicious"}
              </button>
            </div>
          </div>
        </div>
      </>
    </Fragment>
  );
}
