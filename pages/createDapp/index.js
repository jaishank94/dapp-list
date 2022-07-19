import React, { Component, Fragment } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import Moralis from "moralis";
import toast, { Toaster } from "react-hot-toast";
import * as Yup from "yup";
import Header from "../components/Header";
import plus from "/public/images/plus.png";
import Button from "../components/customButton";
import Footer from "../components/Footer";
import { BsFillArrowLeftCircleFill, BsPlus, BsDash } from "react-icons/bs";


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

class CreateApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      short_description: "",
      full_description: "",
      website_url: "",
      app_status: "Live",
      category: [],
      porject_information: "Airdrop",
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
  }

  removeTag = (removeData) => {
    const index = this.state.tag_arr.indexOf(removeData);
    console.log(index);
    if (index > -1) {
      this.state.tag_arr.splice(index, 1);
    }
    this.setState({ tag_arr: this.state.tag_arr });
  };

  setSocilaMedia = (e) => {
    console.log("ljhck", e.target.value);
  };

  resetForm = (e) => {
    e.preventDefault();
    this.setState({
      name: "",
      short_description: "",
      full_description: "",
      website_url: "",
      logo_url: "",
      app_status: "",
      category: ["Games"],
      porject_information: "Airdrop",
      tag: "",
      tag_arr: [],
      facebook: "",
      twitter: "",
      instagram: "",
      youtube: "",
      github: "",
      discord: "",
      gitlab: "",
      sacrifice: "Yes",
      total_supply: "",
      ticker: "",
      isSubmitting: false,
    });
  };

  submitApp = async () => {
    const {
      name,
      short_description,
      full_description,
      website_url,
      app_status,
      category,
      porject_information,
      tag_arr,
      facebook,
      twitter,
      instagram,
      youtube,
      github,
      discord,
      gitlab,
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
      porject_information !== "" &&
      total_supply !== "" &&
      tag_arr.length
    ) {
      let snc = {
        facebook: facebook,
        twitter: twitter,
        instagram: instagram,
        youtube: youtube,
      };
      let code = {
        github: github,
        discord: discord,
        gitlab,
      };

      try {
        this.setState({ isSubmitting: true });
        const Dapps = Moralis.Object.extend("Dapps");
        const newObject = new Dapps();
        newObject.set("name", name);
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
            porject_information: "Airdrop",
            tag: "",
            tag_arr: [],
            facebook: "",
            twitter: "",
            instagram: "",
            youtube: "",
            github: "",
            discord: "",
            gitlab: "",
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

  render() {
    return (
      <Fragment>
        <div className="relative wrapper overflow-hidden">
          <Toaster position="top-right" />
          <div className="max-width-1200 mx-auto">
            <div className="relative z-10 bg-transparent">
              <div className="relative py-6 px-4 sm:px-6 lg:px-8">
                <Header displayCreate={false} />
              </div>
            </div>
          </div>
        </div>
        <Formik
          initialValues={{
            name: this.state.name,
            short_description: this.state.short_description,
            full_description: this.state.full_description,
            website_url: this.state.website_url,
            logo_url: this.state.logo_url,
            ticker: this.state.ticker,
            total_supply: this.state.total_supply,
            category: this.state.category,
            tag_arr: this.state.tag_arr,
          }}
          enableReinitialize={true}
          validationSchema={validation}
          onSubmit={this.submitApp}
        >
          {({ setFieldValue, setFieldTouched, values, errors, touched }) => {
            return (
              <Form>
                <div className="relative bg-white">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-64">
                    <div className="flex justify-center p-2 items-center py-6 md:justify-center md:space-x-10">
                      <div className="flex w-full text-center">
                        <div className="w-18">
                          <a
                            href={"/"}
                            className="flex item-center p-4 mr-4 rounded-full bg-gray-300"
                          >
                            <BsFillArrowLeftCircleFill className="h-5 w-5 text-black" />

                            {/* <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 custom-back-icon"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                                clipRule="evenodd"
                              />
                            </svg> */}
                          </a>
                        </div>
                        <div className="p-3 mx-6 xl:w-4/5 text-center">
                          <p className="font-bold text-2xl">Submit a DApp</p>
                        </div>
                        {/* <div className="hidden md:block flex mx-6">
                          <button
                            className={`sub-header-button text-white ${
                              this.state.isSubmitting ? "" : ""
                            }`}
                            type="submit"
                            disabled={this.state.isSubmitting}
                          >
                            {this.state.isSubmitting
                              ? "Submitting..."
                              : "Submit"}
                          </button>
                          <button
                            className={`mx-2 rounded-full border-0 p-4 text-black bg-gray-300`}
                            type="reset"
                            onClick={(e) => this.resetForm(e)}
                          >
                            Reset
                          </button>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="component-app-detail">
                  <div className="flex justify-center">
                    <div className="flex flex-wrap -mx-2 overflow-hidden sm:-mx-2 md:-mx-2 lg:-mx-2 xl:-mx-2">
                      <div className="my-2 px-2 w-full overflow-hidden sm:my-2 sm:px-2 md:my-2 md:px-2 lg:my-2 lg:px-2 xl:my-2 xl:px-2">
                        <input
                          type="text"
                          // className="form-control custom-input px-5"
                          className={`form-control custom-input px-5
                                                    ${touched.name &&
                              errors.name
                              ? "is-invalid"
                              : ""
                            }`}
                          id="name"
                          name="name"
                          placeholder="App Name *"
                          value={this.state.name}
                          onChange={(e) =>
                            this.setState({ name: e.target.value })
                          }
                        />
                        {errors.name && !this.state.name ? (
                          <div className="error my-2">{errors.name}</div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="my-2 px-2 w-full overflow-hidden sm:my-2 sm:px-2 md:my-2 md:px-2 lg:my-2 lg:px-2 xl:my-2 xl:px-2">
                        <input
                          type="text"
                          className={`form-control custom-input px-5
                                                    ${touched.short_description &&
                              errors.short_description
                              ? "is-invalid"
                              : ""
                            }`}
                          id="short_description"
                          name="short_description"
                          placeholder="Short Description*"
                          value={this.state.short_description}
                          onChange={(e) =>
                            this.setState({ short_description: e.target.value })
                          }
                        />
                        {errors.short_description &&
                          !this.state.short_description ? (
                          <div className="error my-2">
                            {errors.short_description}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="my-2 px-2 w-full overflow-hidden sm:my-2 sm:px-2 md:my-2 md:px-2 lg:my-2 lg:px-2 xl:my-2 xl:px-2">
                        <input
                          type="text"
                          // className="form-control custom-input px-5"
                          className={`form-control custom-input px-5
                                                    ${touched.full_description &&
                              errors.full_description
                              ? "is-invalid"
                              : ""
                            }`}
                          id="full_description"
                          name="full_description"
                          placeholder="Full Description*"
                          value={this.state.full_description}
                          onChange={(e) =>
                            this.setState({ full_description: e.target.value })
                          }
                        />
                        {errors.full_description &&
                          !this.state.full_description ? (
                          <div className="error my-2">
                            {errors.full_description}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="my-2 px-2 w-full overflow-hidden sm:my-2 sm:px-2 md:my-2 md:px-2 lg:my-2 lg:px-2 xl:my-2 xl:px-2">
                        <input
                          type="text"
                          // className="form-control custom-input px-5"
                          className={`form-control custom-input px-5
                                                    ${touched.website_url &&
                              errors.website_url
                              ? "is-invalid"
                              : ""
                            }`}
                          id="website_url"
                          name="website_url"
                          placeholder="Website URL*"
                          value={this.state.website_url}
                          onChange={(e) =>
                            this.setState({ website_url: e.target.value })
                          }
                        />
                        {errors.website_url && !this.state.website_url ? (
                          <div className="error my-2">{errors.website_url}</div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="my-2 px-2 w-full overflow-hidden sm:my-2 sm:px-2 md:my-2 md:px-2 lg:my-2 lg:px-2 xl:my-2 xl:px-2">
                        <input
                          type="text"
                          // className="form-control custom-input px-5"
                          className={`form-control custom-input px-5
                                                    ${touched.logo_url &&
                              errors.logo_url
                              ? "is-invalid"
                              : ""
                            }`}
                          id="logo_url"
                          name="logo_url"
                          placeholder="DApp Logo URL*"
                          value={this.state.logo_url}
                          onChange={(e) =>
                            this.setState({ logo_url: e.target.value })
                          }
                        />
                        {errors.logo_url && !this.state.logo_url ? (
                          <div className="error my-2">{errors.logo_url}</div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="my-2 px-2 w-full overflow-hidden sm:my-2 sm:px-2 md:my-2 md:px-2 lg:my-2 lg:px-2 xl:my-2 xl:px-2">
                        <input
                          type="text"
                          // className="form-control custom-input px-5"
                          className={`form-control custom-input px-5
                                                    ${touched.ticker &&
                              errors.ticker
                              ? "is-invalid"
                              : ""
                            }`}
                          id="ticker"
                          name="ticker"
                          placeholder="Ticker*"
                          value={this.state.ticker}
                          onChange={(e) =>
                            this.setState({ ticker: e.target.value })
                          }
                        />
                        {errors.ticker && !this.state.ticker ? (
                          <div className="error my-2">{errors.ticker}</div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="my-2 px-2 w-full overflow-hidden sm:my-2 sm:px-2 md:my-2 md:px-2 lg:my-2 lg:px-2 xl:my-2 xl:px-2">
                        <input
                          type="text"
                          // className="form-control custom-input px-5"
                          className={`form-control custom-input px-5
                                                    ${touched.total_supply &&
                              errors.total_supply
                              ? "is-invalid"
                              : ""
                            }`}
                          id="total_supply"
                          name="total_supply"
                          placeholder="Total Supply*"
                          value={this.state.total_supply}
                          onChange={(e) =>
                            this.setState({ total_supply: e.target.value })
                          }
                        />
                        {errors.total_supply && !this.state.total_supply ? (
                          <div className="error my-2">
                            {errors.total_supply}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="my-2 px-2 w-full overflow-hidden sm:my-2 sm:px-2 md:my-2 md:px-2 lg:my-2 lg:px-2 xl:my-2 xl:px-2">
                        <p className="font-bold text-lg mt-8">Sacrifice*</p>
                        <div className="md:flex flex-row my-6">
                          {SacrificeValues.map((data, i) => {
                            return (
                              <>
                                <div>
                                  <div
                                    className="group-6-6 cursor-pointer"
                                    onClick={(e) =>
                                      this.setState({
                                        sacrifice:
                                          this.state.sacrifice === data.name
                                            ? this.state.sacrifice
                                            : data.name,
                                      })
                                    }
                                  >
                                    <div className="rectangle-1-0-8" />
                                    <div className="rectangle-1-0-9" />
                                    <div
                                      className={`rectangle-1-1-0 ${this.state.sacrifice === data.name
                                        ? "selected-background"
                                        : "not-selected-background"
                                        }`}
                                    />
                                    <p
                                      className={`text-1 ${this.state.sacrifice === data.name
                                        ? "selected-text"
                                        : "not-selected-text"
                                        }`}
                                    >
                                      {data.name}
                                    </p>
                                    <div className="group-6-5">
                                      <div
                                        className={`rectangle-1-3-3 ${this.state.sacrifice === data.name
                                          ? "selected-rectangle-1-3-3"
                                          : "not-rectangle-1-3-3"
                                          }`}
                                      />
                                      {this.state.sacrifice === data.name ? (
                                        <BsDash className="flex text-center icon justify-center" />
                                      ) : (
                                        <BsPlus className="flex text-center icon justify-center" />
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </>
                            );
                          })}
                        </div>
                      </div>
                      <div className="my-2 px-2 w-full overflow-hidden sm:my-2 sm:px-2 md:my-2 md:px-2 lg:my-2 lg:px-2 xl:my-2 xl:px-2">
                        <p className="font-bold text-lg mt-8">App Status*</p>
                        <div className="md:flex flex-row my-6">
                          {AppStatus.map((data, i) => {
                            return (
                              <>
                                <div>
                                  <div
                                    className="group-6-6 cursor-pointer"
                                    onClick={(e) =>
                                      this.setState({
                                        app_status:
                                          this.state.app_status === data.name
                                            ? this.state.app_status
                                            : data.name,
                                      })
                                    }
                                  >
                                    <div className="rectangle-1-0-8" />
                                    <div className="rectangle-1-0-9" />
                                    <div
                                      className={`rectangle-1-1-0 ${this.state.app_status === data.name
                                        ? "selected-background"
                                        : "not-selected-background"
                                        }`}
                                    />
                                    <p
                                      className={`text-1 ${this.state.app_status === data.name
                                        ? "selected-text"
                                        : "not-selected-text"
                                        }`}
                                    >
                                      {data.name}
                                    </p>
                                    <div className="group-6-5">
                                      <div
                                        className={`rectangle-1-3-3 ${this.state.app_status === data.name
                                          ? "selected-rectangle-1-3-3"
                                          : "not-rectangle-1-3-3"
                                          }`}
                                      />
                                      {this.state.app_status === data.name ? (
                                        <BsDash className="flex text-center icon justify-center" />
                                      ) : (
                                        <BsPlus className="flex text-center icon justify-center" />
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </>
                            );
                          })}
                        </div>
                      </div>
                      <div className="my-2 px-2 w-full overflow-hidden sm:my-2 sm:px-2 md:my-2 md:px-2 lg:my-2 lg:px-2 xl:my-2 xl:px-2">
                        <p className="font-bold text-lg mt-8">Category*</p>
                        <div className="flex flex-wrap -mx-1 overflow-hidden sm:-mx-1 md:-mx-1 lg:-mx-1 xl:-mx-1">
                          {Category.map((data, i) => {
                            return (
                              <>
                                <div
                                  onClick={(e) =>
                                    this.setState({
                                      category: [
                                        ...this.state.category,
                                        data.name,
                                      ],
                                    })
                                  }
                                  className="my-1 px-1 w-full overflow-hidden sm:my-1 sm:px-1 md:my-1 md:px-1 md:w-1/4 lg:my-1 lg:px-1 lg:w-1/4 xl:my-1 xl:px-1 xl:w-1/4">
                                  <div className="group-6-6 cursor-pointer">
                                    <div className="rectangle-1-0-8" />
                                    <div className="rectangle-1-0-9" />
                                    <div
                                      className={`rectangle-1-1-0 ${this.state.category.includes(data.name)
                                        ? "selected-background"
                                        : "not-selected-background"
                                        }`}
                                    />
                                    <p
                                      className={`text-1 ${this.state.category.includes(data.name)
                                        ? "selected-text"
                                        : "not-selected-text"
                                        }`}
                                    >
                                      {data.name}
                                    </p>
                                    <div className="group-6-5">
                                      <div
                                        className={`rectangle-1-3-3 ${this.state.category.includes(
                                          data.name
                                        )
                                          ? "selected-rectangle-1-3-3"
                                          : "not-rectangle-1-3-3"
                                          }`}
                                      />
                                      {this.state.category === data.name ? (
                                        <BsDash className="flex text-center icon justify-center" />
                                      ) : (
                                        <BsPlus className="flex text-center icon justify-center" />
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </>
                            );
                          })}
                        </div>
                        {errors.category && this.state.category.length === 0 ? (
                          <div className="error my-2">{errors.category}</div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="my-2 px-2 w-full overflow-hidden sm:my-2 sm:px-2 md:my-2 md:px-2 lg:my-2 lg:px-2 xl:my-2 xl:px-2">
                        <p className="font-bold text-lg mt-8">
                          Project Information*
                        </p>
                        <div className="flex flex-row my-6">
                          {ProjInformation.map((data, i) => {
                            return (
                              <div>
                                <div
                                  className="group-6-6 cursor-pointer"
                                  onClick={(e) =>
                                    this.setState({
                                      porject_information:
                                        this.state.porject_information ===
                                          data.name
                                          ? this.state.porject_information
                                          : data.name,
                                    })
                                  }
                                >
                                  <div className="rectangle-1-0-8" />
                                  <div className="rectangle-1-0-9" />
                                  <div
                                    className={`rectangle-1-1-0 ${this.state.porject_information ===
                                      data.name
                                      ? "selected-background"
                                      : "not-selected-background"
                                      }`}
                                  />
                                  <p
                                    className={`text-1 ${this.state.porject_information ===
                                      data.name
                                      ? "selected-text"
                                      : "not-selected-text"
                                      }`}
                                  >
                                    {data.name}
                                  </p>
                                  <div className="group-6-5">
                                    <div
                                      className={`rectangle-1-3-3 ${this.state.porject_information ===
                                        data.name
                                        ? "selected-rectangle-1-3-3"
                                        : "not-rectangle-1-3-3"
                                        }`}
                                    />
                                    {this.state.porject_information === data.name ? (
                                      <BsDash className="flex text-center icon justify-center" />
                                    ) : (
                                      <BsPlus className="flex text-center icon justify-center" />
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="my-2 px-2 w-full overflow-hidden sm:my-2 sm:px-2 md:my-2 md:px-2 lg:my-2 lg:px-2 xl:my-2 xl:px-2">
                        <p className="font-bold text-lg mt-8">Tags*</p>
                        <input
                          type="text"
                          // className="form-control custom-input px-5 mt-4"
                          className={`form-control custom-input px-5 mt-4
                                      ${touched.tag && errors.tag
                              ? "is-invalid"
                              : ""
                            }`}
                          id="tag"
                          name="tag"
                          placeholder="e.g.splinterlands"
                          value={this.state.tag}
                          onChange={(e) =>
                            this.setState({ tag: e.target.value })
                          }
                          // onChange={e => this.setState({ category: [...this.state.category, 'Content Discovery'] })}
                          // onKeyDown={e => this.handleKeyDown(e.target.value)}
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
                        {/* {errors.tag && !this.state.tag_arr.length ? (
                          <div className="error my-2">{errors.tag}</div>
                        ) : (
                          ""
                        )} */}
                        <div>
                          <div className="flex flex-row my-3 overscroll-contain">
                            {this.state.tag_arr.map((data, i) => {
                              return (
                                <div key={i}>
                                  <div className="group-6-6" key={i}>
                                    <div className="rectangle-1-0-8" />
                                    <div className="rectangle-1-0-9" />
                                    <div className="rectangle-1-1-0" />
                                    <p className="text-1">{data}</p>
                                    <div className="group-6-5">
                                      <div className="rectangle-1-3-3" />
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 icon1"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        onClick={(e) => this.removeTag(data)}
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        {errors.tag_arr && this.state.tag_arr.length === 0 ? (
                          <div className="error my-2">{errors.tag_arr}</div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="my-2 px-2 w-full overflow-hidden sm:my-2 sm:px-2 md:my-2 md:px-2 lg:my-2 lg:px-2 xl:my-2 xl:px-2">
                        <p className="font-bold text-lg mt-8">
                          Social media links
                        </p>
                        <div>
                          <input
                            type="text"
                            className="form-control custom-input px-5 mt-4"
                            id="facebook"
                            name="facebook"
                            placeholder="Facebook"
                            value={this.state.facebook}
                            onChange={(e) =>
                              this.setState({ facebook: e.target.value })
                            }
                            error={errors.facebook && Boolean(errors.facebook)}
                            helpertext={errors.facebook ? errors.facebook : ""}
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            className="form-control custom-input px-5 mt-4"
                            id="twitter"
                            name="twitter"
                            placeholder="Twitter"
                            value={this.state.twitter}
                            onChange={(e) =>
                              this.setState({ twitter: e.target.value })
                            }
                            error={errors.twitter && Boolean(errors.twitter)}
                            helpertext={errors.twitter ? errors.twitter : ""}
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            className="form-control custom-input px-5 mt-4"
                            id="instagram"
                            name="instagram"
                            placeholder="Instagram"
                            value={this.state.instagram}
                            onChange={(e) =>
                              this.setState({ instagram: e.target.value })
                            }
                            error={
                              errors.instagram && Boolean(errors.instagram)
                            }
                            helpertext={
                              errors.instagram ? errors.instagram : ""
                            }
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            className="form-control custom-input px-5 mt-4"
                            id="youtube"
                            name="youtube"
                            placeholder="Youtube"
                            value={this.state.youtube}
                            onChange={(e) =>
                              this.setState({ youtube: e.target.value })
                            }
                            error={errors.youtube && Boolean(errors.youtube)}
                            helpertext={errors.youtube ? errors.youtube : ""}
                          />
                        </div>
                      </div>
                      <div className="my-2 px-2 w-full overflow-hidden sm:my-2 sm:px-2 md:my-2 md:px-2 lg:my-2 lg:px-2 xl:my-2 xl:px-2">
                        <p className="font-bold text-lg mt-8">Source code</p>
                        <div>
                          <input
                            type="text"
                            className="form-control custom-input px-5 mt-4"
                            id="github"
                            name="github"
                            placeholder="Github"
                            value={this.state.github}
                            onChange={(e) =>
                              this.setState({ github: e.target.value })
                            }
                            error={errors.github && Boolean(errors.github)}
                            helpertext={errors.github ? errors.github : ""}
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            className="form-control custom-input px-5 mt-4"
                            id="discord"
                            name="discord"
                            placeholder="Discord"
                            value={this.state.discord}
                            onChange={(e) =>
                              this.setState({ discord: e.target.value })
                            }
                            error={errors.discord && Boolean(errors.discord)}
                            helpertext={errors.discord ? errors.discord : ""}
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            className="form-control custom-input px-5 mt-4"
                            id="gitlab"
                            name="gitlab"
                            placeholder="Gitlab"
                            value={this.state.gitlab}
                            onChange={(e) =>
                              this.setState({ gitlab: e.target.value })
                            }
                            error={errors.gitlab && Boolean(errors.gitlab)}
                            helpertext={errors.gitlab ? errors.gitlab : ""}
                          />
                        </div>
                        <div className="flex my-4 justify-center ">
                          <button
                            className={`sub-header-button text-white ${this.state.isSubmitting ? "" : ""
                              }`}
                            type="submit"
                            disabled={this.state.isSubmitting}
                          >
                            {this.state.isSubmitting
                              ? "Submitting..."
                              : "Submit"}
                          </button>
                          <button
                            className={`mx-4 rounded-full border-0 p-4 text-black bg-gray-300`}
                            type="reset"
                            onClick={(e) => this.resetForm(e)}
                          >
                            Reset
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
        {/* <div>
          <Footer />
        </div> */}
      </Fragment>
    );
  }
}

export default CreateApp;
