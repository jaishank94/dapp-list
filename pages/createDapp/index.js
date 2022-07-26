import React, { Component, Fragment, useEffect, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import Moralis from "moralis";
import toast, { Toaster } from "react-hot-toast";
import * as Yup from "yup";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  BsFillArrowLeftCircleFill,
  BsPlus,
  BsDash,
  BsFacebook,
  BsTwitter,
  BsInstagram,
  BsYoutube,
  BsTelegram,
  BsReddit,
  BsMedium,
  BsDiscord,
  BsGithub,
} from "react-icons/bs";
import { AiFillGitlab } from "react-icons/ai";
import { IoLogoBitbucket } from "react-icons/io";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";

const validation = Yup.object().shape({
  name: Yup.string().required("This field is required"),
  short_description: Yup.string().required("This field is required"),
  full_description: Yup.string().required("This field is required"),
  website_url: Yup.string().required("This field is required"),
  logo_url: Yup.string().required("This field is required"),
  ticker: Yup.string().required("This field is required"),
  total_supply: Yup.string().required("This field is required"),
  tag_arr: Yup.array().min(1).required("This field is required"),
  category: Yup.array().min(1).required("This field is required"),
});

const AppStatus = [
  { name: "Live" },
  { name: "Beta" },
  { name: "Alpha" },
  { name: "Work in Progress" },
];

const SacrificeValues = [
  { name: "Yes" },
  { name: "No" },
  { name: "Coming Soon" },
];

const Category = [
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

const ProjInformation = [{ name: "Airdrop" }, { name: "Sacrifice Phrase" }];

const initialValues = {
  name: "",
  short_description: "",
  full_description: "",
  website_url: "",
  app_status: "Live",
  category: [],
  project_information: "Airdrop",
  tag: "",
  tag_arr: [],
  facebook: "",
  logo_url: "",
  twitter: "",
  instagram: "",
  youtube: "",
  github: "",
  discord: "",
  gitlab: "",
  ticker: "",
  sacrifice: "Yes",
  total_supply: "",
  isSubmitting: false,
};

export default function index() {
  const router = useRouter();
  const [formValues, setformValues] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { theme, setTheme } = useTheme("dark");
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getFormData = (values) => {
    console.log("getFormData::", values);
  };
  console.log("formValues::", formValues);

  const removeTag = (removeData) => {
    const index = this.state.tag_arr.indexOf(removeData);
    console.log(index);
    if (index > -1) {
      this.state.tag_arr.splice(index, 1);
    }
    this.setState({ tag_arr: this.state.tag_arr });
  };

  const setSocilaMedia = (e) => {
    console.log("ljhck", e.target.value);
  };

  const resetForm = (e) => {
    e.preventDefault();
    this.setState({
      name: "",
      short_description: "",
      full_description: "",
      website_url: "",
      logo_url: "",
      app_status: "",
      category: ["Games"],
      project_information: "Airdrop",
      tag: "",
      tag_arr: [],
      facebook: "",
      twitter: "",
      instagram: "",
      youtube: "",
      telegram: "",
      reddit: "",
      medium: "",
      github: "",
      discord: "",
      gitlab: "",
      bitbuket: "",
      sacrifice: "Yes",
      total_supply: "",
      ticker: "",
      isSubmitting: false,
    });
  };

  const submitApp = async () => {
    const {
      name,
      short_description,
      full_description,
      website_url,
      app_status,
      category,
      project_information,
      tag_arr,
      facebook,
      twitter,
      instagram,
      youtube,
      telegram,
      reddit,
      medium,
      github,
      discord,
      gitlab,
      bitbuket,
      logo_url,
      ticker,
      sacrifice,
      total_supply,
    } = this.state;

    if (
      name !== "" &&
      short_description !== "" &&
      full_description !== "" &&
      website_url !== "" &&
      logo_url !== "" &&
      ticker !== "" &&
      app_status !== "" &&
      category.length &&
      project_information !== "" &&
      total_supply !== "" &&
      tag_arr.length
    ) {
      let snc = {
        facebook: facebook,
        twitter: twitter,
        instagram: instagram,
        youtube: youtube,
        telegram: telegram,
        reddit: reddit,
        medium: medium,
        discord: discord,
      };

      let code = {
        github: github,
        bitbuket: bitbuket,
        gitlab,
      };

      try {
        this.setState({ isSubmitting: true });
        const Dapps = Moralis.Object.extend("Dapps");
        const newObject = new Dapps();
        newObject.set("name", name.toUpperCase());
        newObject.set("short_description", short_description);
        newObject.set("full_description", full_description);
        newObject.set("website_url", website_url);
        newObject.set("ticker", ticker);
        newObject.set("logo", logo_url);
        newObject.set("sacrifice", sacrifice);
        newObject.set("total_supply", total_supply);
        newObject.set("app_status", app_status);
        newObject.set("type", category);
        newObject.set("tag", tag_arr);
        newObject.set("sns", snc);
        newObject.set("code", code);
        newObject.set("page_views", 0);
        newObject.set("status", "IN-ACTIVE");
        let response = await newObject.save();
        let result = JSON.parse(JSON.stringify(response));
        if (result) {
          toast.success("Succefully submited");
          this.setState({
            name: "",
            short_description: "",
            full_description: "",
            website_url: "",
            logo_url: "",
            ticker: "",
            sacrifice: "Yes",
            total_supply: "",
            app_status: "Live",
            category: ["Games"],
            project_information: "Airdrop",
            tag: "",
            tag_arr: [],
            facebook: "",
            twitter: "",
            instagram: "",
            youtube: "",
            telegram: "",
            reddit: "",
            medium: "",
            github: "",
            discord: "",
            gitlab: "",
            bitbuket: "",
            sacrifice: "Yes",
            total_supply: "",
            isSubmitting: false,
          });
          // this.setState({ isSubmitting: false })
        } else {
          toast.error("Some Error Occured..!! Please try again.");
          // this.setState({ isSubmitting: false })
        }
        this.setState({ isSubmitting: false });
      } catch (error) {
        toast.error("Some Error Occured..!! Please try again.");
        this.setState({ isSubmitting: false });
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmitting(true);
  };

  if (!isMounted) return null;

  return (
    <Fragment>
      <div className="h-screen">
        <Toaster position="top-right" />

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
          <div className="flex justify-between p-4 max-w-7xl mx-auto">
            {/* <div className="flex justify-between items-center py-6 sm:px-0 xl:px-16 md:justify-center md:space-x-10"> */}
            <div className="w-18 flex ">
              <button
                onClick={() => router.push("/dapps")}
                className="flex item-center rounded-full shadow-2xl"
              >
                <BsFillArrowLeftCircleFill className="h-12 w-12" />
              </button>
              <div className="p-3 mx-6 xl:w-4/5 text-center">
                <p className="font-bold text-2xl">Submit a DApp</p>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 md:px-28 lg:px-36">
            <p
              className={`text-sm ${
                theme === "light"
                  ? "shadow-slate-100 border-slate-100"
                  : "shadow-neutral-800 border-neutral-800"
              } rounded-xl border-2 shadow-xl font-bold text-center p-4`}
            >
              Whether you are looking for new users, testers, concept feedback,
              partners, or investors, submitting a DApp (Decentralized
              Application) to this definitive registry will help your project
              gain traction.
              <br />
              <br />
              We welcome DApps at any stage in the product life-cycle (concepts
              are encouraged), or even DApps that you didn't make but noticed
              are missing. Email support@pulsechainprojects.io if you have any
              questions!
              <br />
              <br />
              Email{" "}
              <span className="text-transparent font-bold bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                support@pulsechainprojects.io
              </span>{" "}
              if you have any questions!
            </p>
          </div>
          <Formik
            // initialValues={{
            //   name: this.state.name,
            //   short_description: this.state.short_description,
            //   full_description: this.state.full_description,
            //   website_url: this.state.website_url,
            //   logo_url: this.state.logo_url,
            //   ticker: this.state.ticker,
            //   total_supply: this.state.total_supply,
            //   category: this.state.category,
            //   tag_arr: this.state.tag_arr,
            // }}
            enableReinitialize={true}
            validationSchema={validation}
            // onSubmit={this.submitApp}
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting }) => {}}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              setFieldValue,
              resetForm,
            }) => {
              setformValues(values);
              getFormData(values);
              return (
                <Form onSubmit={handleSubmit}>
                  <div className="max-w-7xl mx-auto px-4 md:px-28 lg:px-36">
                    <div className="flex flex-col items-center justify-center">
                      <div className="my-2 px-2 pt-8 w-full">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          placeholder="App Name *"
                          value={formValues.name}
                          onChange={handleChange}
                          className={`form-control w-full rounded-xl shadow p-4 ${
                            touched.name && errors.name ? "input-error" : ""
                          }
                            ${
                              theme === "light"
                                ? " shadow-slate-300"
                                : "bg-black shadow-neutral-800"
                            }`}
                          maxLength={50}
                        />
                        {errors.name ? (
                          <div className="text-rose-900 my-2">
                            {errors.name}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="my-2 px-2 pt-8 w-full">
                        <input
                          type="text"
                          id="short_description"
                          name="short_description"
                          placeholder="Short Description *"
                          value={formValues.short_description}
                          onChange={handleChange}
                          className={`form-control w-full rounded-xl shadow p-4 ${
                            touched.short_description &&
                            errors.short_description
                              ? "input-error"
                              : ""
                          }
                            ${
                              theme === "light"
                                ? " shadow-slate-300"
                                : "bg-black shadow-neutral-800"
                            }`}
                          maxLength={50}
                        />
                        {errors.short_description ? (
                          <div short_description="text-rose-900 my-2">
                            {errors.short_description}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="my-2 px-2 pt-8 w-full">
                        <input
                          type="text"
                          id="full_description"
                          name="full_description"
                          placeholder="Full Description *"
                          value={formValues.full_description}
                          onChange={handleChange}
                          className={`form-control w-full rounded-xl shadow p-4 ${
                            touched.full_description && errors.full_description
                              ? "input-error"
                              : ""
                          }
                            ${
                              theme === "light"
                                ? " shadow-slate-300"
                                : "bg-black shadow-neutral-800"
                            }`}
                          maxLength={50}
                        />
                        {errors.full_description ? (
                          <div full_description="text-rose-900 my-2">
                            {errors.full_description}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="my-2 px-2 pt-8 w-full">
                        <input
                          type="text"
                          id="website_url"
                          name="website_url"
                          placeholder="Website URL *"
                          value={formValues.website_url}
                          onChange={handleChange}
                          className={`form-control w-full rounded-xl shadow p-4 ${
                            touched.website_url && errors.website_url
                              ? "input-error"
                              : ""
                          }
                            ${
                              theme === "light"
                                ? " shadow-slate-300"
                                : "bg-black shadow-neutral-800"
                            }`}
                          maxLength={50}
                        />
                        {errors.website_url ? (
                          <div website_url="text-rose-900 my-2">
                            {errors.website_url}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="my-2 px-2 pt-8 w-full">
                        <input
                          type="text"
                          id="logo_url"
                          name="logo_url"
                          placeholder="DApp Logo URL *"
                          value={formValues.logo_url}
                          onChange={handleChange}
                          className={`form-control w-full rounded-xl shadow p-4 ${
                            touched.logo_url && errors.logo_url
                              ? "input-error"
                              : ""
                          }
                            ${
                              theme === "light"
                                ? " shadow-slate-300"
                                : "bg-black shadow-neutral-800"
                            }`}
                          maxLength={50}
                        />
                        {errors.logo_url ? (
                          <div logo_url="text-rose-900 my-2">
                            {errors.logo_url}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="my-2 px-2 pt-8 w-full">
                        <input
                          type="text"
                          id="ticker"
                          name="ticker"
                          placeholder="Ticker *"
                          value={formValues.ticker}
                          onChange={handleChange}
                          className={`form-control w-full rounded-xl shadow p-4 ${
                            touched.ticker && errors.ticker ? "input-error" : ""
                          }
                            ${
                              theme === "light"
                                ? " shadow-slate-300"
                                : "bg-black shadow-neutral-800"
                            }`}
                          maxLength={50}
                        />
                        {errors.ticker ? (
                          <div ticker="text-rose-900 my-2">{errors.ticker}</div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="my-2 px-2 pt-8 w-full">
                        <input
                          type="text"
                          id="total_supply"
                          name="total_supply"
                          placeholder="Total Supply *"
                          value={formValues.total_supply}
                          onChange={handleChange}
                          className={`form-control w-full rounded-xl shadow p-4 ${
                            touched.total_supply && errors.total_supply
                              ? "input-error"
                              : ""
                          }
                            ${
                              theme === "light"
                                ? " shadow-slate-300"
                                : "bg-black shadow-neutral-800"
                            }`}
                          maxLength={50}
                        />
                        {errors.total_supply ? (
                          <div total_supply="text-rose-900 my-2">
                            {errors.total_supply}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="my-2 px-2 py-4 w-full">
                        <p className="font-bold text-lg mt-8">Sacrifice *</p>
                        <div className="grid grid-cols-2 mt-5 gap-4 md:grid-cols-4 xl:grid-cols-4 3xl:flex flex-wrap justify-center">
                          {SacrificeValues.map((data, i) => {
                            return (
                              <>
                                <div>
                                  <div
                                    onClick={(e) => {
                                      e.preventDefault();
                                      console.log("Asd", data.name);
                                      setformValues({
                                        ...formValues,
                                        sacrifice: data.name,
                                      });
                                      console.log("Asd2");
                                    }}
                                    className={`flex cursor-pointer justify-center items-center border-2 rounded-full p-2 ${
                                      formValues.sacrifice !== data.name
                                        ? ""
                                        : "font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg text-sm"
                                    }`}
                                  >
                                    <span
                                      className={`w-9/12 text-left ${
                                        formValues.sacrifice !== data.name
                                          ? ""
                                          : "text-white"
                                      }`}
                                    >
                                      {data.name}
                                    </span>
                                    <span className="w-3/12 text-right">
                                      {/* {formValues.sacrifice !== data.name ? (
                                           <BsDash className="rounded-full border-2 shadow-md w-8 h-8 bg-white text-black" />
                                         ) : (
                                           <BsPlus className="rounded-full border-2 shadow-md w-8 h-8 bg-white  text-black" />
                                         )} */}
                                    </span>
                                  </div>
                                </div>
                              </>
                            );
                          })}
                        </div>
                      </div>
                      <div className="my-2 px-2 py-4 w-full">
                        <p className="font-bold text-lg mt-8">App Status *</p>
                        <div className="grid grid-cols-2 mt-5 gap-4 md:grid-cols-4 xl:grid-cols-4 3xl:flex flex-wrap justify-center">
                          {AppStatus.map((data, i) => {
                            return (
                              <>
                                <div>
                                  <div
                                    onClick={(e) => {
                                      e.preventDefault();
                                      console.log("Asd", data.name);
                                      setformValues({
                                        ...formValues,
                                        app_status: data.name,
                                      });
                                      console.log("Asd2");
                                    }}
                                    className={`flex cursor-pointer justify-center items-center border-2 rounded-full p-2 ${
                                      formValues.app_status !== data.name
                                        ? ""
                                        : "font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg text-sm"
                                    }`}
                                  >
                                    <span
                                      className={`w-9/12 text-left ${
                                        formValues.app_status !== data.name
                                          ? ""
                                          : "text-white"
                                      }`}
                                    >
                                      {data.name}
                                    </span>
                                    <span className="w-3/12 text-right">
                                      {/* {formValues.app_status !== data.name ? (
                                           <BsDash className="rounded-full border-2 shadow-md w-8 h-8 bg-white text-black" />
                                         ) : (
                                           <BsPlus className="rounded-full border-2 shadow-md w-8 h-8 bg-white  text-black" />
                                         )} */}
                                    </span>
                                  </div>
                                </div>
                              </>
                            );
                          })}
                        </div>
                      </div>
                      <div className="my-2 px-2 py-4 w-full">
                        <p className="font-bold text-lg mt-8">Categories *</p>
                        <div className="grid grid-cols-2 mt-5 gap-4 md:grid-cols-4 xl:grid-cols-4 3xl:flex flex-wrap justify-center">
                          {Category.map((data, i) => {
                            return (
                              <>
                                <div>
                                  <div
                                    onClick={(e) => {
                                      // let arr = this.state.category.filter(
                                      //                                       (obj) => obj == data.name
                                      //                                     );
                                      //                                     if (arr.length === 0) {
                                      //                                       this.setState({
                                      //                                         category: [
                                      //                                           ...this.state.category,
                                      //                                           data.name,
                                      //                                         ],
                                      //                                       });
                                      //                                     } else {
                                      //                                       let newArr = this.state.category.filter(
                                      //                                         (obj) => obj !== data.name
                                      //                                       );
                                      //                                       this.setState({
                                      //                                         category: newArr,
                                      //                                       });
                                      //                                     }
                                    }}
                                    className={`flex cursor-pointer justify-center items-center border-2 rounded-full p-2 ${
                                      !formValues.category.includes(data.name)
                                        ? ""
                                        : "font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg text-sm"
                                    }`}
                                  >
                                    <span
                                      className={`w-9/12 text-left ${
                                        !formValues.category.includes(data.name)
                                          ? ""
                                          : "text-white"
                                      }`}
                                    >
                                      {data.name}
                                    </span>
                                    <span className="w-3/12 text-right">
                                      {formValues.category.includes(
                                        data.name
                                      ) ? (
                                        <BsDash className="rounded-full border-2 shadow-md w-8 h-8 bg-white text-black" />
                                      ) : (
                                        <BsPlus className="rounded-full border-2 shadow-md w-8 h-8 bg-white  text-black" />
                                      )}
                                    </span>
                                  </div>
                                </div>
                              </>
                            );
                          })}
                        </div>
                      </div>
                      <div className="my-2 px-2 py-4 w-full">
                        <p className="font-bold text-lg mt-8">
                          Tokenomics *
                        </p>
                        <div className="grid grid-cols-2 mt-5 gap-4 md:grid-cols-4 xl:grid-cols-4 3xl:flex flex-wrap justify-center">
                          {ProjInformation.map((data, i) => {
                            return (
                              <>
                                <div>
                                  <div
                                    onClick={(e) => {
                                      e.preventDefault();
                                      console.log("Asd", data.name);
                                      setformValues({
                                        ...formValues,
                                        project_information: data.name,
                                      });
                                      console.log("Asd2");
                                    }}
                                    className={`flex cursor-pointer justify-center items-center border-2 rounded-full p-2 ${
                                      formValues.project_information !==
                                      data.name
                                        ? ""
                                        : "font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg text-sm"
                                    }`}
                                  >
                                    <span
                                      className={`w-9/12 text-left ${
                                        formValues.project_information !==
                                        data.name
                                          ? ""
                                          : "text-white"
                                      }`}
                                    >
                                      {data.name}
                                    </span>
                                    <span className="w-3/12 text-right">
                                      {/* {formValues.project_information !== data.name ? (
                                           <BsDash className="rounded-full border-2 shadow-md w-8 h-8 bg-white text-black" />
                                         ) : (
                                           <BsPlus className="rounded-full border-2 shadow-md w-8 h-8 bg-white  text-black" />
                                         )} */}
                                    </span>
                                  </div>
                                </div>
                              </>
                            );
                          })}
                        </div>
                      </div>

                      <div className="my-2 px-2 pt-8 w-full">
                      <p className="font-bold text-lg my-8">Tags *</p>
                        <input
                          type="text"
                          id="tag"
                          name="tag"
                          placeholder="NFT + Games + Education"
                          value={formValues.tag}
                          // onChange={handleChange}
                          className={`form-control w-full rounded-xl shadow p-4 ${
                            touched.tag && errors.tag ? "input-error" : ""
                          }
                            ${
                              theme === "light"
                                ? " shadow-slate-300"
                                : "bg-black shadow-neutral-800"
                            }`}
                          maxLength={50}
                          onChange={(e) =>
                            this.setState({ tag: e.target.value })
                          }
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              this.setState(
                                {
                                  tag_arr: [
                                    ...this.state.tag_arr,
                                    this.state.tag,
                                  ],
                                },
                                () => {
                                  this.setState({ tag: "" });
                                }
                              );
                              console.log(e.target.value);
                            }
                          }}
                        />
                        <div>
                          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-4 3xl:flex flex-wrap justify-center">
                            {formValues.tag_arr.map((data, i) => {
                              return (
                                <div
                                  key={i}
                                  className=" items-center justify-center p-2"
                                >
                                  <div className="flex cursor-pointer justify-center items-center border-2 rounded-full p-2">
                                    <span className="w-9/12 text-left truncate">
                                      {data}
                                    </span>
                                    <span className="w-3/12 text-right">
                                      <BsDash
                                        className="rounded-full border-2 shadow-md w-8 h-8"
                                        onClick={(e) => removeTag(data)}
                                      />
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        {errors.tag_arr && formValues.tag_arr.length === 0 ? (
                          <div className="text-rose-900 my-2">
                            {errors.tag_arr}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>

                      <div className="my-2 px-2 py-4 w-full">
                        <p className="font-bold text-lg mt-8">
                          Social Media
                        </p>
                        <div className="grid grid-cols-2 mt-5 gap-4 md:grid-cols-4 xl:grid-cols-4 3xl:flex flex-wrap justify-center">
                          {ProjInformation.map((data, i) => {
                            return (
                              <>
                                <div>
                                  <div
                                    onClick={(e) => {
                                      e.preventDefault();
                                      console.log("Asd", data.name);
                                      setformValues({
                                        ...formValues,
                                        project_information: data.name,
                                      });
                                      console.log("Asd2");
                                    }}
                                    className={`flex cursor-pointer justify-center items-center border-2 rounded-full p-2 ${
                                      formValues.project_information !==
                                      data.name
                                        ? ""
                                        : "font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg text-sm"
                                    }`}
                                  >
                                    <span
                                      className={`w-9/12 text-left ${
                                        formValues.project_information !==
                                        data.name
                                          ? ""
                                          : "text-white"
                                      }`}
                                    >
                                      {data.name}
                                    </span>
                                    <span className="w-3/12 text-right">
                                      {/* {formValues.project_information !== data.name ? (
                                           <BsDash className="rounded-full border-2 shadow-md w-8 h-8 bg-white text-black" />
                                         ) : (
                                           <BsPlus className="rounded-full border-2 shadow-md w-8 h-8 bg-white  text-black" />
                                         )} */}
                                    </span>
                                  </div>
                                </div>
                              </>
                            );
                          })}
                        </div>
                      </div>

                      <div className="my-2 px-2 py-4 w-full">
                        <p className="font-bold text-lg mt-8">
                          Source Code
                        </p>
                        <div className="grid grid-cols-2 mt-5 gap-4 md:grid-cols-4 xl:grid-cols-4 3xl:flex flex-wrap justify-center">
                          {ProjInformation.map((data, i) => {
                            return (
                              <>
                                <div>
                                  <div
                                    onClick={(e) => {
                                      e.preventDefault();
                                      console.log("Asd", data.name);
                                      setformValues({
                                        ...formValues,
                                        project_information: data.name,
                                      });
                                      console.log("Asd2");
                                    }}
                                    className={`flex cursor-pointer justify-center items-center border-2 rounded-full p-2 ${
                                      formValues.project_information !==
                                      data.name
                                        ? ""
                                        : "font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg text-sm"
                                    }`}
                                  >
                                    <span
                                      className={`w-9/12 text-left ${
                                        formValues.project_information !==
                                        data.name
                                          ? ""
                                          : "text-white"
                                      }`}
                                    >
                                      {data.name}
                                    </span>
                                    <span className="w-3/12 text-right">
                                      {/* {formValues.project_information !== data.name ? (
                                           <BsDash className="rounded-full border-2 shadow-md w-8 h-8 bg-white text-black" />
                                         ) : (
                                           <BsPlus className="rounded-full border-2 shadow-md w-8 h-8 bg-white  text-black" />
                                         )} */}
                                    </span>
                                  </div>
                                </div>
                              </>
                            );
                          })}
                        </div>
                      </div>

                      <div className="flex my-4 w-full justify-center">
                        <button
                          // className={`sub-header-button text-white ${
                          //   this.state.isSubmitting ? "" : ""
                          // }`}
                          type="submit"
                          disabled={isSubmitting}
                          className={`cursor-pointer rounded-lg p-2 font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg text-sm text-white`}
                        >
                          {isSubmitting ? "Submitting..." : "Submit your DApp"}
                        </button>
                        <button
                          className={`mx-4 rounded-lg border-0 p-2 shadow-lg ${
                            theme === "light"
                              ? "bg-slate-300 shadow-slate-300"
                              : "bg-neutral-800 shadow-neutral-800"
                          }`}
                          type="reset"
                          // onClick={(e) => this.resetForm(e)}
                          onClick={resetForm}
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
      <div className="relative w-full bottom-0">{/* <Footer /> */}</div>
    </Fragment>
  );
}
//                       <div className="my-2 px-2 w-full overflow-hidden sm:my-2 sm:px-2 md:my-2 md:px-2 lg:my-2 lg:px-2 xl:my-2 xl:px-2">
//                         <p className="font-bold text-lg mt-8">Tags*</p>
//                         <input
//                           type="text"
//                           // className="form-control custom-input px-5 mt-4"
//                           className={`form-control custom-input px-5 mt-4
//                                       ${
//                                         touched.tag && errors.tag
//                                           ? "is-invalid"
//                                           : ""
//                                       }`}
//                           id="tag"
//                           name="tag"
//                           placeholder="e.g.splinterlands"
//                           value={this.state.tag}
//                           onChange={(e) =>
//                             this.setState({ tag: e.target.value })
//                           }
//                           onKeyPress={(e) => {
//                             if (e.key === "Enter") {
//                               e.preventDefault();
//                               this.setState(
//                                 {
//                                   tag_arr: [
//                                     ...this.state.tag_arr,
//                                     this.state.tag,
//                                   ],
//                                 },
//                                 () => {
//                                   this.setState({ tag: "" });
//                                 }
//                               );
//                               console.log(e.target.value);
//                             }
//                           }}
//                         />
//                         <div>
//                           <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-4 3xl:flex flex-wrap justify-center">
//                             {this.state.tag_arr.map((data, i) => {
//                               return (
//                                 <div
//                                   key={i}
//                                   className=" items-center justify-center p-2"
//                                 >
//                                   <div className="flex cursor-pointer justify-center items-center border-2 rounded-full p-2">
//                                     <span className="w-9/12 text-left truncate">
//                                       {data}
//                                     </span>
//                                     <span className="w-3/12 text-right">
//                                       <BsDash
//                                         className="rounded-full border-2 shadow-md w-8 h-8"
//                                         onClick={(e) => this.removeTag(data)}
//                                       />
//                                     </span>
//                                   </div>
//                                 </div>
//                               );
//                             })}
//                           </div>
//                         </div>
//                         {errors.tag_arr && this.state.tag_arr.length === 0 ? (
//                           <div className="error my-2">{errors.tag_arr}</div>
//                         ) : (
//                           ""
//                         )}
//                       </div>
//                       <div className="my-2 px-2 pb-16 w-full overflow-hidden sm:my-2 sm:px-2 md:my-2 md:px-2 lg:my-2 lg:px-2 xl:my-2 xl:px-2">
//                         <p className="font-bold text-lg mt-8">
//                           Social media links
//                         </p>
//                         <div style={{ height: "100px", whiteSpace: "nowrap" }}>
//                           <div className="p-6 relative w-16 md:w-56 top-5-6 left-3 flex bg-white rounded-md">
//                             <div className="grid grid-cols-2 divide-x w-16 md:w-14">
//                               <BsFacebook className="h-5 w-5 text-black" />
//                               <p className="hidden md:block hidden md:block text-gray-600 pl-2">
//                                 https://facebook.com
//                               </p>
//                             </div>
//                           </div>
//                           <input
//                             type="text"
//                             className="form-control custom-input px-20 md:px-72 mt-4"
//                             id="facebook"
//                             name="facebook"
//                             placeholder="Facebook"
//                             value={this.state.facebook}
//                             onChange={(e) =>
//                               this.setState({ facebook: e.target.value })
//                             }
//                             error={errors.facebook && Boolean(errors.facebook)}
//                             helpertext={errors.facebook ? errors.facebook : ""}
//                           />
//                         </div>
//                         <div style={{ height: "100px", whiteSpace: "nowrap" }}>
//                           <div className="p-6 relative w-16 md:w-56 top-5-6 left-3 flex bg-white rounded-md">
//                             <div className="grid grid-cols-2 divide-x w-16 md:w-14">
//                               <BsTwitter className="h-5 w-5 text-black" />
//                               <p className="hidden md:block text-gray-600 pl-2">
//                                 https://telegram.com
//                               </p>
//                             </div>
//                           </div>
//                           <input
//                             type="text"
//                             className="form-control px-20 md:px-72 custom-input mt-4"
//                             id="twitter"
//                             name="twitter"
//                             placeholder="Twitter"
//                             value={this.state.twitter}
//                             onChange={(e) =>
//                               this.setState({ twitter: e.target.value })
//                             }
//                             error={errors.twitter && Boolean(errors.twitter)}
//                             helpertext={errors.twitter ? errors.twitter : ""}
//                           />
//                         </div>
//                         <div style={{ height: "100px", whiteSpace: "nowrap" }}>
//                           <div className="p-6 relative w-16 md:w-56 top-5-6 left-3 flex bg-white rounded-md">
//                             <div className="grid grid-cols-2 divide-x w-16 md:w-14">
//                               <BsInstagram className="h-5 w-5 text-black" />
//                               <p className="hidden md:block text-gray-600 pl-2">
//                                 https://instagram.com
//                               </p>
//                             </div>
//                           </div>
//                           <input
//                             type="text"
//                             className="form-control px-20 md:px-72 custom-input mt-4"
//                             id="instagram"
//                             name="instagram"
//                             placeholder="Instagram"
//                             value={this.state.instagram}
//                             onChange={(e) =>
//                               this.setState({ instagram: e.target.value })
//                             }
//                             error={
//                               errors.instagram && Boolean(errors.instagram)
//                             }
//                             helpertext={
//                               errors.instagram ? errors.instagram : ""
//                             }
//                           />
//                         </div>
//                         <div style={{ height: "100px", whiteSpace: "nowrap" }}>
//                           <div className="p-6 relative w-16 md:w-56 top-5-6 left-3 flex bg-white rounded-md">
//                             <div className="grid grid-cols-2 divide-x w-16 md:w-14">
//                               <BsYoutube className="h-5 w-5 text-black" />
//                               <p className="hidden md:block text-gray-600 pl-2">
//                                 https://youtube.com
//                               </p>
//                             </div>
//                           </div>
//                           <input
//                             type="text"
//                             className="form-control px-20 md:px-72 custom-input mt-4"
//                             maxLength={100}
//                             id="youtube"
//                             name="youtube"
//                             placeholder="Youtube"
//                             value={this.state.youtube}
//                             onChange={(e) =>
//                               this.setState({ youtube: e.target.value })
//                             }
//                             error={errors.youtube && Boolean(errors.youtube)}
//                             helpertext={errors.youtube ? errors.youtube : ""}
//                           />
//                         </div>
//                         <div style={{ height: "100px", whiteSpace: "nowrap" }}>
//                           <div className="p-6 relative w-16 md:w-56 top-5-6 left-3 flex bg-white rounded-md">
//                             <div className="grid grid-cols-2 divide-x w-16 md:w-14">
//                               <BsTelegram className="h-5 w-5 text-black" />
//                               <p className="hidden md:block text-gray-600 pl-2">
//                                 https://telegram.com
//                               </p>
//                             </div>
//                           </div>
//                           <input
//                             type="text"
//                             className="form-control px-20 md:px-72 custom-input mt-4"
//                             maxLength={100}
//                             id="telegram"
//                             name="telegram"
//                             placeholder="Telegram"
//                             value={this.state.telegram}
//                             onChange={(e) =>
//                               this.setState({ telegram: e.target.value })
//                             }
//                             error={errors.telegram && Boolean(errors.telegram)}
//                             helpertext={errors.telegram ? errors.telegram : ""}
//                           />
//                         </div>
//                         <div style={{ height: "100px", whiteSpace: "nowrap" }}>
//                           <div className="p-6 relative w-16 md:w-56 top-5-6 left-3 flex bg-white rounded-md">
//                             <div className="grid grid-cols-2 divide-x w-16 md:w-14">
//                               <BsReddit className="h-5 w-5 text-black" />
//                               <p className="hidden md:block text-gray-600 pl-2">
//                                 https://reddit.com
//                               </p>
//                             </div>
//                           </div>
//                           <input
//                             type="text"
//                             className="form-control px-20 md:px-72 custom-input mt-4"
//                             maxLength={100}
//                             id="reddit"
//                             name="reddit"
//                             placeholder="Reddit"
//                             value={this.state.reddit}
//                             onChange={(e) =>
//                               this.setState({ reddit: e.target.value })
//                             }
//                             error={errors.reddit && Boolean(errors.reddit)}
//                             helpertext={errors.reddit ? errors.reddit : ""}
//                           />
//                         </div>
//                         <div style={{ height: "100px", whiteSpace: "nowrap" }}>
//                           <div className="p-6 relative w-16 md:w-56 top-5-6 left-3 flex bg-white rounded-md">
//                             <div className="grid grid-cols-2 divide-x w-16 md:w-14">
//                               <BsMedium className="h-5 w-5 text-black" />
//                               <p className="hidden md:block text-gray-600 pl-2">
//                                 https://medium.com
//                               </p>
//                             </div>
//                           </div>
//                           <input
//                             type="text"
//                             className="form-control px-20 md:px-72 custom-input mt-4"
//                             maxLength={100}
//                             id="medium"
//                             name="medium"
//                             placeholder="Medium"
//                             value={this.state.medium}
//                             onChange={(e) =>
//                               this.setState({ medium: e.target.value })
//                             }
//                             error={errors.medium && Boolean(errors.medium)}
//                             helpertext={errors.medium ? errors.medium : ""}
//                           />
//                         </div>
//                         <div style={{ height: "100px", whiteSpace: "nowrap" }}>
//                           <div className="p-6 relative w-16 md:w-56 top-5-6 left-3 flex bg-white rounded-md">
//                             <div className="grid grid-cols-2 divide-x w-16 md:w-14">
//                               <BsDiscord className="h-5 w-5 text-black" />
//                               <p className="hidden md:block text-gray-600 pl-2">
//                                 https://discord.com
//                               </p>
//                             </div>
//                           </div>
//                           <input
//                             type="text"
//                             className="form-control px-20 md:px-72 custom-input mt-4"
//                             maxLength={100}
//                             id="discord"
//                             name="discord"
//                             placeholder="Discord"
//                             value={this.state.discord}
//                             onChange={(e) =>
//                               this.setState({ discord: e.target.value })
//                             }
//                             error={errors.discord && Boolean(errors.discord)}
//                             helpertext={errors.discord ? errors.discord : ""}
//                           />
//                         </div>
//                       </div>
//                       <div className="my-2 px-2 pb-16 w-full overflow-hidden sm:my-2 sm:px-2 md:my-2 md:px-2 lg:my-2 lg:px-2 xl:my-2 xl:px-2">
//                         <p className="font-bold text-lg mt-8">Source code</p>
//                         <div style={{ height: "100px", whiteSpace: "nowrap" }}>
//                           <div className="p-6 relative w-16 md:w-56 top-5-6 left-3 flex rounded-md">
//                             <div className="grid grid-cols-2 divide-x w-14">
//                               <BsGithub className="h-5 w-5 text-black" />
//                             </div>
//                           </div>
//                           <input
//                             type="text"
//                             className="form-control custom-input px-20 mt-4"
//                             maxLength={500}
//                             id="github"
//                             name="github"
//                             placeholder="Github"
//                             value={this.state.github}
//                             onChange={(e) =>
//                               this.setState({ github: e.target.value })
//                             }
//                             error={errors.github && Boolean(errors.github)}
//                             helpertext={errors.github ? errors.github : ""}
//                           />
//                         </div>

//                         <div style={{ height: "100px", whiteSpace: "nowrap" }}>
//                           <div className="p-6 relative w-16 md:w-56 top-5-6 left-3 flex rounded-md">
//                             <div className="grid grid-cols-2 divide-x w-14">
//                               <AiFillGitlab className="h-5 w-5 text-black" />
//                             </div>
//                           </div>
//                           <input
//                             type="text"
//                             className="form-control custom-input px-20 mt-4"
//                             maxLength={500}
//                             id="gitlab"
//                             name="gitlab"
//                             placeholder="Gitlab"
//                             value={this.state.gitlab}
//                             onChange={(e) =>
//                               this.setState({ gitlab: e.target.value })
//                             }
//                             error={errors.gitlab && Boolean(errors.gitlab)}
//                             helpertext={errors.gitlab ? errors.gitlab : ""}
//                           />
//                         </div>
//                         <div style={{ height: "100px", whiteSpace: "nowrap" }}>
//                           <div className="p-6 relative w-16 md:w-56 top-5-6 left-3 flex rounded-md">
//                             <div className="grid grid-cols-2 divide-x w-14">
//                               <IoLogoBitbucket className="h-5 w-5 text-black" />
//                             </div>
//                           </div>
//                           <input
//                             type="text"
//                             className="form-control custom-input px-20 mt-4"
//                             maxLength={500}
//                             id="bitbuket"
//                             name="bitbuket"
//                             placeholder="Bitbuket"
//                             value={this.state.bitbuket}
//                             onChange={(e) =>
//                               this.setState({ bitbuket: e.target.value })
//                             }
//                             error={errors.bitbuket && Boolean(errors.bitbuket)}
//                             helpertext={errors.bitbuket ? errors.bitbuket : ""}
//                           />
//                         </div>
//                       </div>
