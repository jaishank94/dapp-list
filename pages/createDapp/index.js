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
import Modal from "../components/Modal";
import Link from "next/link";

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
const hiringValues = [{ name: "Yes" }, { name: "No" }];

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
  // app_status: "Live",
  // category: [],
  // project_information: "Airdrop",
  tag: "",
  // tag_arr: [],
  facebook: "",
  logo_url: "",
  twitter: "",
  instagram: "",
  youtube: "",
  github: "",
  discord: "",
  gitlab: "",
  ticker: "",
  // sacrifice: "Yes",
  total_supply: "",
  isSubmitting: false,
  // hiring: "Yes"
};

export default function index() {
  const router = useRouter();
  const [formValues, setformValues] = useState(initialValues);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { theme, setTheme } = useTheme("dark");
  const [isMounted, setMounted] = useState(false);
  const [tags, setTags] = useState("");
  const [hiring, setHiring] = useState("Yes");
  const [projectInformation, setProjectInformation] = useState("Airdrop");
  const [category, setCategory] = useState(["Games"]);
  const [tagArr, setTagArr] = useState([]);
  const [appStatus, setAppStatus] = useState("Live");
  const [sacrifice, setSacrifice] = useState("Yes");
  const [isSuccess, setSuccess] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getFormData = (values) => {
    // console.log("getFormData::", values);
  };

  const removeTag = (removeData) => {
    // this.setState({ tag_arr: this.state.tag_arr });
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
      total_supply,
      email,
      smart_contract_address,
    } = formValues;

    if (
      name !== "" &&
      short_description !== "" &&
      full_description !== "" &&
      website_url !== "" &&
      logo_url !== "" &&
      ticker !== "" &&
      appStatus !== "" &&
      category.length &&
      projectInformation !== "" &&
      total_supply !== "" &&
      tagArr.length
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
        setIsSubmitting(true);
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
        newObject.set("app_status", appStatus);
        newObject.set("type", category);
        newObject.set("tag", tagArr);
        newObject.set("sns", snc);
        newObject.set("code", code);
        newObject.set("page_views", 0);
        newObject.set("project_informatiom", projectInformation);
        newObject.set("email", email);
        newObject.set("smart_contract_address", smart_contract_address);
        newObject.set("hiring", hiring);
        newObject.set("status", "IN-ACTIVE");
        let response = await newObject.save();
        let result = JSON.parse(JSON.stringify(response));
        if (result) {
          // toast.success("Succefully submited");
          setSuccess(true);
          setformValues({
            name: "",
            short_description: "",
            full_description: "",
            website_url: "",
            logo_url: "",
            ticker: "",
            total_supply: "",
            tag: "",
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
            total_supply: "",
            isSubmitting: false,
          });
          setTagArr([]);
          setCategory(["Games"]);
          setProjectInformation("Airdrop");
          setAppStatus("Live");
          setSacrifice("Yes");
          setTags("");
          // this.setState({ isSubmitting: false })
        } else {
          toast.error("Some Error Occured..!! Please try again.");
          // this.setState({ isSubmitting: false })
        }
        setIsSubmitting(false);
      } catch (error) {
        toast.error("Some Error Occured..!! Please try again.");
        setIsSubmitting(false);
      }
    } else {
      toast.error("Please fill all the (*) fields.");
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setformValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmitting(true);
  };

  if (!isMounted) return null;

  return (
    <Fragment>
      <div className="min-h-screen max-h-full">
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
              <Link href="/dapps">
                <div className="flex item-center cursor-pointer rounded-full shadow-2xl">
                  <BsFillArrowLeftCircleFill className="h-12 w-12" />
                </div>
              </Link>
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
            initialValues={initialValues}
            enableReinitialize={true}
            validationSchema={validation}
            onSubmit={submitApp}
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
              // getFormData(values);
              return (
                <Form>
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
                        {errors.name &&
                        touched.name &&
                        formValues.name == "" ? (
                          <div className="text-rose-500 my-2">
                            {errors.name}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="my-2 px-2 pt-4 w-full">
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
                          maxLength={25}
                        />
                        {errors.short_description &&
                        touched.short_description &&
                        formValues.short_description == "" ? (
                          <div className="text-rose-500 my-2">
                            {errors.short_description}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="my-2 px-2 pt-4 w-full">
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
                          maxLength={300}
                        />
                        {errors.full_description &&
                        touched.full_description &&
                        formValues.full_description == "" ? (
                          <div className="text-rose-500 my-2">
                            {errors.full_description}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="my-2 px-2 pt-4 w-full">
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
                          maxLength={200}
                        />
                        {errors.website_url &&
                        touched.website_url &&
                        formValues.website_url == "" ? (
                          <div className="text-rose-500 my-2">
                            {errors.website_url}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="my-2 px-2 pt-4 w-full">
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
                          maxLength={200}
                        />
                        {errors.logo_url &&
                        touched.logo_url &&
                        formValues.logo_url == "" ? (
                          <div className="text-rose-500 my-2">
                            {errors.logo_url}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="my-2 px-2 pt-4 w-full">
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
                          maxLength={100}
                        />
                        {errors.ticker &&
                        touched.ticker &&
                        formValues.ticker == "" ? (
                          <div className="text-rose-500 my-2">
                            {errors.ticker}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="my-2 px-2 pt-4 w-full">
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
                        {errors.total_supply &&
                        touched.total_supply &&
                        formValues.total_supply == "" ? (
                          <div className="text-rose-500 my-2">
                            {errors.total_supply}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="my-2 px-2 py-2 w-full">
                        <p className="font-bold text-lg">Sacrifice *</p>
                        <div className="grid grid-cols-2 mt-5 gap-4 md:grid-cols-4 xl:grid-cols-4 3xl:flex flex-wrap justify-center">
                          {SacrificeValues.map((data, i) => {
                            return (
                              <>
                                <div>
                                  <div
                                    onClick={(e) => {
                                      setSacrifice(data.name);
                                    }}
                                    className={`flex cursor-pointer justify-center items-center border-2 rounded-full p-2 text-sm ${
                                      sacrifice !== data.name
                                        ? ""
                                        : "font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg"
                                    }`}
                                  >
                                    <span
                                      className={`w-9/12 text-left ${
                                        sacrifice !== data.name
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
                      <div className="my-2 px-2 py-2 w-full">
                        <p className="font-bold text-lg">App Status *</p>
                        <div className="grid grid-cols-2 mt-5 gap-4 md:grid-cols-4 xl:grid-cols-4 3xl:flex flex-wrap justify-center">
                          {AppStatus.map((data, i) => {
                            return (
                              <>
                                <div>
                                  <div
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setAppStatus(data.name);
                                      // console.log("Asd", data.name);
                                      // setformValues({
                                      //   ...formValues,
                                      //   app_status: data.name,
                                      // });
                                      // console.log("Asd2");
                                    }}
                                    className={`flex cursor-pointer justify-center items-center border-2 rounded-full p-2 text-sm ${
                                      appStatus !== data.name
                                        ? ""
                                        : "font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg"
                                    }`}
                                  >
                                    <span
                                      className={`w-9/12 text-left ${
                                        appStatus !== data.name
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
                      <div className="my-2 px-2 py-2 w-full">
                        <p className="font-bold text-lg">Categories *</p>
                        <div className="grid grid-cols-2 mt-5 gap-4 md:grid-cols-4 xl:grid-cols-4 3xl:flex flex-wrap justify-center">
                          {Category.map((data, i) => {
                            return (
                              <>
                                <div>
                                  <div
                                    onClick={(e) => {
                                      let arr = category.filter(
                                        (obj) => obj == data.name
                                      );
                                      if (arr.length === 0) {
                                        setCategory([...category, data.name]);
                                      } else {
                                        let newArr = category.filter(
                                          (obj) => obj !== data.name
                                        );

                                        if (newArr.length > 0) {
                                          setCategory(newArr);
                                        }
                                      }
                                    }}
                                    className={`flex cursor-pointer justify-center items-center border-2 rounded-full p-2 text-sm ${
                                      !category.includes(data.name)
                                        ? ""
                                        : "font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg"
                                    }`}
                                  >
                                    <span
                                      className={`w-9/12 text-left truncate ${
                                        !category.includes(data.name)
                                          ? ""
                                          : "text-white"
                                      }`}
                                    >
                                      {data.name}
                                    </span>
                                    <span className="w-3/12 text-right contents">
                                      {category.includes(data.name) ? (
                                        <BsDash className="rounded-full border-2 shadow-md w-5 h-5 bg-white text-black" />
                                      ) : (
                                        <BsPlus className="rounded-full border-2 shadow-md w-5 h-5 bg-white  text-black" />
                                      )}
                                    </span>
                                  </div>
                                </div>
                              </>
                            );
                          })}
                        </div>
                      </div>
                      <div className="my-2 px-2 py-2 w-full">
                        <p className="font-bold text-lg">Tokenomics *</p>
                        <div className="grid grid-cols-2 mt-5 gap-4 md:grid-cols-4 xl:grid-cols-4 3xl:flex flex-wrap justify-center">
                          {ProjInformation.map((data, i) => {
                            return (
                              <>
                                <div>
                                  <div
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setProjectInformation(data.name);
                                    }}
                                    className={`flex cursor-pointer border-2 rounded-full p-2 text-sm ${
                                      projectInformation !== data.name
                                        ? ""
                                        : "font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg"
                                    }`}
                                  >
                                    <span
                                      className={`w-9/12 text-left ${
                                        projectInformation !== data.name
                                          ? ""
                                          : "text-white"
                                      }`}
                                    >
                                      {data.name}
                                    </span>
                                  </div>
                                </div>
                              </>
                            );
                          })}
                        </div>
                      </div>

                      <div className="my-2 px-2 w-full">
                        <p className="font-bold text-lg my-4">Tags *</p>
                        <input
                          type="text"
                          id="tag"
                          name="tag"
                          placeholder="NFT + Games + Education"
                          value={tags}
                          onChange={(e) => setTags(e.target.value)}
                          className={`form-control w-full rounded-xl shadow p-4 ${
                            touched.tag && errors.tag ? "input-error" : ""
                          }
                            ${
                              theme === "light"
                                ? " shadow-slate-300"
                                : "bg-black shadow-neutral-800"
                            }`}
                          maxLength={25}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              if (tags !== "" && tagArr.length < 10) {
                                setTagArr([...tagArr, tags]);
                                setTags("");
                              }
                            }
                          }}
                        />
                        <span className="text-gray-400 font-semibold text-xs my-2">
                          Alteast one tag required and max. 10
                        </span>
                        <div>
                          <div className="grid grid-cols-2 gap-2 md:grid-cols-4 xl:grid-cols-4 3xl:flex flex-wrap justify-center">
                            {tagArr.map((data, i) => {
                              return (
                                <div
                                  key={i}
                                  className=" items-center justify-center p-2"
                                >
                                  <div className="flex cursor-pointer justify-center items-center border-2 rounded-full p-2 text-sm">
                                    <span className="w-9/12 text-left truncate">
                                      {data}
                                    </span>
                                    <span className="w-3/12 text-right contents">
                                      <BsDash
                                        className="rounded-full border-2 shadow-md w-5 h-5"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          const index = tagArr.indexOf(data);
                                          let newArry = tagArr;
                                          if (index > -1) {
                                            newArry.splice(index, 1);
                                          }
                                          setTagArr(newArry);
                                          setTags(data);
                                        }}
                                      />
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        {errors.tagArr && tagArr.length === 0 ? (
                          <div className="text-rose-500 my-2">
                            {errors.tagArr}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>

                      <div className="my-2 px-2 py-2 w-full">
                        <p className="font-bold text-lg">Social Media</p>
                        <div>
                          <div className="relative w-16 md:w-56 top-10 left-3 flex rounded-md">
                            <div className="grid grid-cols-2 divide-x w-16 md:w-14">
                              <BsFacebook className="h-5 w-5" />
                            </div>
                          </div>
                          <input
                            type="text"
                            className={`form-control w-full pl-16 rounded-xl shadow p-4
                              ${
                                theme === "light"
                                  ? " shadow-slate-300"
                                  : "bg-black shadow-neutral-800"
                              }`}
                            id="facebook"
                            name="facebook"
                            placeholder="Facebook"
                            maxLength={100}
                            value={formValues.facebook}
                            onChange={handleChange}
                            error={errors.facebook && Boolean(errors.facebook)}
                            helpertext={errors.facebook ? errors.facebook : ""}
                          />
                        </div>
                        <div>
                          <div className="relative w-16 md:w-56 top-10 left-3 flex rounded-md">
                            <div className="grid grid-cols-2 divide-x w-16 md:w-14">
                              <BsTelegram className="h-5 w-5" />
                            </div>
                          </div>
                          <input
                            type="text"
                            className={`form-control w-full pl-16 rounded-xl shadow p-4
                              ${
                                theme === "light"
                                  ? " shadow-slate-300"
                                  : "bg-black shadow-neutral-800"
                              }`}
                            id="telegram"
                            name="telegram"
                            placeholder="Telegram"
                            maxLength={100}
                            value={formValues.telegram}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <div className="relative w-16 md:w-56 top-10 left-3 flex rounded-md">
                            <div className="grid grid-cols-2 divide-x w-16 md:w-14">
                              <BsInstagram className="h-5 w-5" />
                            </div>
                          </div>
                          <input
                            type="text"
                            className={`form-control w-full pl-16 rounded-xl shadow p-4
                              ${
                                theme === "light"
                                  ? " shadow-slate-300"
                                  : "bg-black shadow-neutral-800"
                              }`}
                            id="instagram"
                            name="instagram"
                            placeholder="Instagram"
                            value={formValues.instagram}
                            onChange={handleChange}
                            maxLength={100}
                          />
                        </div>
                        <div>
                          <div className="relative w-16 md:w-56 top-10 left-3 flex rounded-md">
                            <div className="grid grid-cols-2 divide-x w-16 md:w-14">
                              <BsYoutube className="h-5 w-5" />
                            </div>
                          </div>
                          <input
                            type="text"
                            className={`form-control w-full pl-16 rounded-xl shadow p-4
                              ${
                                theme === "light"
                                  ? " shadow-slate-300"
                                  : "bg-black shadow-neutral-800"
                              }`}
                            id="youtube"
                            name="youtube"
                            placeholder="Youtube"
                            value={formValues.youtube}
                            onChange={handleChange}
                            maxLength={100}
                          />
                        </div>
                        <div>
                          <div className="relative w-16 md:w-56 top-10 left-3 flex rounded-md">
                            <div className="grid grid-cols-2 divide-x w-16 md:w-14">
                              <BsTelegram className="h-5 w-5" />
                            </div>
                          </div>
                          <input
                            type="text"
                            className={`form-control w-full pl-16 rounded-xl shadow p-4
                              ${
                                theme === "light"
                                  ? " shadow-slate-300"
                                  : "bg-black shadow-neutral-800"
                              }`}
                            id="twitter"
                            name="twitter"
                            placeholder="Twitter"
                            value={formValues.twitter}
                            onChange={handleChange}
                            maxLength={100}
                          />
                        </div>
                        <div>
                          <div className="relative w-16 md:w-56 top-10 left-3 flex rounded-md">
                            <div className="grid grid-cols-2 divide-x w-16 md:w-14">
                              <BsReddit className="h-5 w-5" />
                            </div>
                          </div>
                          <input
                            type="text"
                            className={`form-control w-full pl-16 rounded-xl shadow p-4
                              ${
                                theme === "light"
                                  ? " shadow-slate-300"
                                  : "bg-black shadow-neutral-800"
                              }`}
                            id="reddit"
                            name="reddit"
                            placeholder="Reddit"
                            value={formValues.reddit}
                            onChange={handleChange}
                            maxLength={100}
                          />
                        </div>
                        <div>
                          <div className="relative w-16 md:w-56 top-10 left-3 flex rounded-md">
                            <div className="grid grid-cols-2 divide-x w-16 md:w-14">
                              <BsMedium className="h-5 w-5" />
                            </div>
                          </div>
                          <input
                            type="text"
                            className={`form-control w-full pl-16 rounded-xl shadow p-4
                              ${
                                theme === "light"
                                  ? " shadow-slate-300"
                                  : "bg-black shadow-neutral-800"
                              }`}
                            id="medium"
                            name="medium"
                            placeholder="Medium"
                            value={formValues.medium}
                            onChange={handleChange}
                            maxLength={100}
                          />
                        </div>
                        <div>
                          <div className="relative w-16 md:w-56 top-10 left-3 flex rounded-md">
                            <div className="grid grid-cols-2 divide-x w-16 md:w-14">
                              <BsDiscord className="h-5 w-5" />
                            </div>
                          </div>
                          <input
                            type="text"
                            className={`form-control w-full pl-16 rounded-xl shadow p-4
                              ${
                                theme === "light"
                                  ? " shadow-slate-300"
                                  : "bg-black shadow-neutral-800"
                              }`}
                            id="discord"
                            name="discord"
                            placeholder="Discord"
                            value={formValues.discord}
                            onChange={handleChange}
                            maxLength={100}
                          />
                        </div>
                      </div>

                      <div className="my-2 px-2 py-2 w-full">
                        <p className="font-bold text-lg">Source Code</p>
                        <div>
                          <div className="relative w-16 md:w-56 top-10 left-3 flex rounded-md divide-x">
                            <div className="grid grid-cols-2 divide-x w-16 md:w-14">
                              <BsGithub className="h-5 w-5" />
                            </div>
                          </div>
                          <input
                            type="text"
                            className={`form-control w-full pl-16 rounded-xl shadow p-4
                              ${
                                theme === "light"
                                  ? " shadow-slate-300"
                                  : "bg-black shadow-neutral-800"
                              }`}
                            id="github"
                            name="github"
                            placeholder="Github"
                            value={formValues.github}
                            onChange={handleChange}
                            maxLength={100}
                          />
                        </div>
                        <div>
                          <div className="relative w-16 md:w-56 top-10 left-3 flex rounded-md">
                            <div className="grid grid-cols-2 divide-x w-16 md:w-14">
                              <AiFillGitlab className="h-5 w-5" />
                            </div>
                          </div>
                          <input
                            type="text"
                            className={`form-control w-full pl-16 rounded-xl shadow p-4
                              ${
                                theme === "light"
                                  ? " shadow-slate-300"
                                  : "bg-black shadow-neutral-800"
                              }`}
                            id="gitlab"
                            name="gitlab"
                            placeholder="GitLab"
                            value={formValues.gitlab}
                            onChange={handleChange}
                            maxLength={100}
                          />
                        </div>
                        <div>
                          <div className="relative w-16 md:w-56 top-10 left-3 flex rounded-md">
                            <div className="grid grid-cols-2 divide-x w-16 md:w-14">
                              <IoLogoBitbucket className="h-5 w-5" />
                            </div>
                          </div>
                          <input
                            type="text"
                            className={`form-control w-full pl-16 rounded-xl shadow p-4
                              ${
                                theme === "light"
                                  ? " shadow-slate-300"
                                  : "bg-black shadow-neutral-800"
                              }`}
                            id="bitbuket"
                            name="bitbuket"
                            placeholder="Bitbuket"
                            value={formValues.bitbuket}
                            onChange={handleChange}
                            maxLength={100}
                          />
                        </div>
                      </div>
                      <div className="my-2 px-2 py-2 w-full">
                        <p className="font-bold text-lg">We're hiring</p>
                        <div className="grid grid-cols-2 mt-5 gap-4 md:grid-cols-4 xl:grid-cols-4 3xl:flex flex-wrap justify-center">
                          {hiringValues.map((data, i) => {
                            return (
                              <>
                                <div>
                                  <div
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setHiring(data.name);
                                    }}
                                    className={`flex cursor-pointer justify-center items-center border-2 rounded-full p-2 ${
                                      hiring !== data.name
                                        ? ""
                                        : "font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg text-sm"
                                    }`}
                                  >
                                    <span
                                      className={`w-9/12 text-left ${
                                        hiring !== data.name ? "" : "text-white"
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
                        <div className="my-5">
                          <input
                            type="email"
                            className={`form-control w-full rounded-xl shadow p-4
                              ${
                                theme === "light"
                                  ? " shadow-slate-300"
                                  : "bg-black shadow-neutral-800"
                              }`}
                            id="email"
                            name="email"
                            placeholder="Email"
                            value={formValues.email}
                            onChange={handleChange}
                            maxLength={100}
                          />
                        </div>
                        <div className="my-5">
                          <input
                            type="text"
                            className={`form-control w-full rounded-xl shadow p-4
                              ${
                                theme === "light"
                                  ? " shadow-slate-300"
                                  : "bg-black shadow-neutral-800"
                              }`}
                            id="smart_contract_address"
                            name="smart_contract_address"
                            placeholder="Smart Contract Address"
                            value={formValues.smart_contract_address}
                            onChange={handleChange}
                            maxLength={200}
                          />
                        </div>
                      </div>

                      <div className="flex my-4 w-full justify-center">
                        <button
                          // className={`sub-header-button text-white ${
                          //   this.state.isSubmitting ? "" : ""
                          // }`}
                          type="submit"
                          disabled={isSubmitting}
                          onClick={submitApp}
                          className={`cursor-pointer rounded-lg p-2 font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg text-xl text-white`}
                        >
                          {isSubmitting ? "Submitting..." : "Submit DApp"}
                        </button>
                        <button
                          className={`mx-4 rounded-lg border-0 p-2 shadow-lg font-semibold ${
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
      {isSuccess && (
        <Modal
          title={"Congratulations! Your DApp Has Been Submitted Successfully!"}
          description={
            <p>
              Thank you for submitting your listing to PulseChainProjects.io.
              You'll see your listing within 12-24 hours!
              <br />
              <br />
              DON'T GO YET! We invite you to a 1-hour live stream hosted on our
              YouTube Channel with over 3700 subscribers.
              (<span><Link href="https://www.youtube.com/howtopulse">https://www.youtube.com/howtopulse</Link></span>). You're listing will be
              approved within 12-24 hours. Thank you for interest. Also, book a
              slot and learn more about the products
            </p>
          }
        />
      )}
      <div className="relative w-full bottom-0">
        <Footer />
      </div>
    </Fragment>
  );
}
