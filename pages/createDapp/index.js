import React, { Component, Fragment } from 'react'
import { Formik, Form, ErrorMessage } from "formik";
import Moralis from "moralis";
import toast, { Toaster } from 'react-hot-toast';
import * as Yup from "yup";
import Header from '../components/Header'
import plus from "/public/images/plus.png"
import Button from '../components/customButton'

const validation = Yup.object().shape({
    name: Yup.string().required('This field is required'),
    short_description: Yup.string().required('This field is required'),
    full_description: Yup.string().required('This field is required'),
    website_url: Yup.string().required('This field is required'),
    tage: Yup.string().required('This field is required'),

})


class CreateApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            short_description: "",
            full_description: "",
            website_url: "",
            app_status: "",
            category: [],
            porject_information: "",
            tage: "",
            tag_arr: [],
            facebook: "",
            twitter: "",
            instagram: "",
            youtube: "",
            github: "",
            discord: "",
            gitlab: "",
            isSubmitting: false,

        };
    }


    removeTag = (removeData) => {
        const index = this.state.tag_arr.indexOf(removeData);
        console.log(index)
        if (index > -1) {
            this.state.tag_arr.splice(index, 1);
        }
        this.setState({ tag_arr: this.state.tag_arr });
    }


    setSocilaMedia = (e) => {
        console.log("ljhck", e.target.value)
    }

    submitApp = async () => {
        const { name, short_description, full_description, website_url, app_status, category, porject_information, tag_arr, facebook, twitter, instagram, youtube, github, discord, gitlab } = this.state;
        if (name !== "" && short_description !== "" && full_description !== "" && website_url !== "" && app_status !== "" && category.length && porject_information !== "" && tag_arr.length) {
            let snc = {
                facebook: facebook,
                twitter: twitter,
                instagram: instagram,
                youtube: youtube,
            };
            let code = {
                github: github,
                discord: discord,
                gitlab
            }
            try {
                // this.setState({ isSubmitting: true })
                const Dapps = Moralis.Object.extend("Dapps");
                const newObject = new Dapps();
                newObject.set("name", name);
                newObject.set("short_description", short_description);
                newObject.set("full_description", full_description);
                newObject.set("app_status", app_status);
                newObject.set("type", category);
                newObject.set("tage", tag_arr);
                newObject.set("sns", snc);
                newObject.set("code", code);
                // newObject.set("reaction",);
                newObject.set("status", "ACTIVE");
                let response = await newObject.save();
                let result = JSON.parse(JSON.stringify(response));
                if (result) {

                    toast.success("Succefully submited");
                    // this.setState({ isSubmitting: false })
                } else {
                    toast.error("Some Error Occured..!!");
                    // this.setState({ isSubmitting: false })
                }
            } catch (error) {
                toast.error("Some Error Occured..!!");
                this.setState({ isSubmitting: false })

            }
        }
    }


    render() {
        console.log('state', this.state)
        return (
            <Fragment>
                <div className="relative wrapper overflow-hidden">
                    <Toaster position="top-right" />

                    <div className="max-width-1200 mx-auto">
                        <div className="relative z-10 bg-transparent">
                            <div className="relative py-6 px-4 sm:px-6 lg:px-8">
                                <Header />
                            </div>
                        </div>
                    </div>
                </div>
                <Formik
                    initialValues={{

                    }}
                    enableReinitialize={true}
                    validationSchema={validation}
                    onSubmit={this.submitApp}
                >
                    {({
                        setFieldValue,
                        setFieldTouched,
                        values,
                        errors,
                        touched,
                    }) => {
                        return (
                            <Form>

                                <div className="relative bg-white">
                                    <div className="max-w-7xl mx-auto px-4 sm:px-6">
                                        <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
                                            <div className="flex justify-start lg:w-0 lg:flex-1">
                                                <div className="w-1/5">
                                                    <div className="icon-div">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 custom-back-icon" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className="w-3/5 text-center">
                                                    <p className="font-bold text-2xl">Submit an DApp</p>
                                                </div>
                                                <div className="w-1/5">
                                                    <button className={`sub-header-button text-white ${this.state.isSubmitting ? "" : ""}`} type="submit">{this.state.isSubmitting ? "Submitting..." : "Submit"}</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="component-app-detail">
                                    <div class="flex justify-center">
                                        <div class="flex flex-wrap -mx-2 overflow-hidden sm:-mx-2 md:-mx-2 lg:-mx-2 xl:-mx-2">
                                            <div class="my-2 px-2 w-full overflow-hidden sm:my-2 sm:px-2 md:my-2 md:px-2 lg:my-2 lg:px-2 xl:my-2 xl:px-2">
                                                <input
                                                    type="text"
                                                    // className="form-control custom-input px-5"
                                                    className={`form-control custom-input px-5
                                                    ${touched.name && errors.name ? "is-invalid" : ""}`}
                                                    id="name"
                                                    name="name"
                                                    placeholder="App Name *"
                                                    value={this.state.name}
                                                    onChange={e => this.setState({ name: e.target.value })}
                                                />
                                                {errors.name && !this.state.name ? (<div className="error my-2">{errors.name}</div>) : ""}
                                            </div>
                                            <div class="my-2 px-2 w-full overflow-hidden sm:my-2 sm:px-2 md:my-2 md:px-2 lg:my-2 lg:px-2 xl:my-2 xl:px-2">
                                                <input
                                                    type="text"
                                                    className={`form-control custom-input px-5
                                                    ${touched.short_description && errors.short_description ? "is-invalid" : ""}`}
                                                    id="short_description"
                                                    name="short_description"
                                                    placeholder="Short Description*"
                                                    value={this.state.short_description}
                                                    onChange={e => this.setState({ short_description: e.target.value })}
                                                />
                                                {errors.short_description && !this.state.short_description ? (<div className="error my-2">{errors.short_description}</div>) : ""}
                                            </div>
                                            <div class="my-2 px-2 w-full overflow-hidden sm:my-2 sm:px-2 md:my-2 md:px-2 lg:my-2 lg:px-2 xl:my-2 xl:px-2">
                                                <input
                                                    type="text"
                                                    // className="form-control custom-input px-5"
                                                    className={`form-control custom-input px-5
                                                    ${touched.full_description && errors.full_description ? "is-invalid" : ""}`}
                                                    id="full_description"
                                                    name="full_description"
                                                    placeholder="Full Description*"
                                                    value={this.state.full_description}
                                                    onChange={e => this.setState({ full_description: e.target.value })}
                                                />
                                                {errors.full_description && !this.state.full_description ? (<div className="error my-2">{errors.full_description}</div>) : ""}
                                            </div>
                                            <div class="my-2 px-2 w-full overflow-hidden sm:my-2 sm:px-2 md:my-2 md:px-2 lg:my-2 lg:px-2 xl:my-2 xl:px-2">
                                                <input
                                                    type="text"
                                                    // className="form-control custom-input px-5"
                                                    className={`form-control custom-input px-5
                                                    ${touched.website_url && errors.website_url ? "is-invalid" : ""}`}
                                                    id="website_url"
                                                    name="website_url"
                                                    placeholder="website URL*"
                                                    value={this.state.website_url}
                                                    onChange={e => this.setState({ website_url: e.target.value })}
                                                />
                                                {errors.website_url && !this.state.website_url ? (<div className="error my-2">{errors.full_description}</div>) : ""}

                                            </div>
                                            <div class="my-2 px-2 w-full overflow-hidden sm:my-2 sm:px-2 md:my-2 md:px-2 lg:my-2 lg:px-2 xl:my-2 xl:px-2">
                                                <p className="font-bold text-lg mt-8">App Status*</p>
                                                <div class="flex flex-row my-6">
                                                    <div>
                                                        <div className="group-6-6">
                                                            <div className="rectangle-1-0-8" />
                                                            <div className="rectangle-1-0-9" />
                                                            <div className="rectangle-1-1-0" onClick={e => this.setState({ app_status: "Live" })} />
                                                            <p className="text-1">Live</p>
                                                            <div className="group-6-5">
                                                                <div className="rectangle-1-3-3" />
                                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 icon" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="group-6-6">
                                                            <div className="rectangle-1-0-8" />
                                                            <div className="rectangle-1-0-9" />
                                                            <div className="rectangle-1-1-0"
                                                                onClick={e => this.setState({ app_status: "Beta" })}
                                                            />
                                                            <p className="text-1">Beta</p>
                                                            <div className="group-6-5">
                                                                <div className="rectangle-1-3-3" />
                                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 icon" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="group-6-6">
                                                            <div className="rectangle-1-0-8" />
                                                            <div className="rectangle-1-0-9" />
                                                            <div className="rectangle-1-1-0"
                                                                onClick={e => this.setState({ app_status: "Alpha" })}
                                                            />
                                                            <p className="text-1">Alpha</p>
                                                            <div className="group-6-5">
                                                                <div className="rectangle-1-3-3" />
                                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 icon" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="group-6-6">
                                                            <div className="rectangle-1-0-8" />
                                                            <div className="rectangle-1-0-9" />
                                                            <div className="rectangle-1-1-0"
                                                                onClick={e => this.setState({ app_status: "Work in Progress" })}
                                                            />
                                                            <p className="text-1">Work in Progress</p>
                                                            <div className="group-6-5">
                                                                <div className="rectangle-1-3-3" />
                                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 icon" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="my-2 px-2 w-full overflow-hidden sm:my-2 sm:px-2 md:my-2 md:px-2 lg:my-2 lg:px-2 xl:my-2 xl:px-2">
                                                <p className="font-bold text-lg mt-8">Category*</p>
                                                <div class="flex flex-row my-6">
                                                    <div>
                                                        <div className="group-6-6">
                                                            <div className="rectangle-1-0-8" />
                                                            <div className="rectangle-1-0-9" />
                                                            <div className="rectangle-1-1-0"
                                                                onClick={e => this.setState({ category: [...this.state.category, 'Games'] })}
                                                            />
                                                            <p className="text-1">Games</p>
                                                            <div className="group-6-5">
                                                                <div className="rectangle-1-3-3" />
                                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 icon" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="group-6-6">
                                                            <div className="rectangle-1-0-8" />
                                                            <div className="rectangle-1-0-9" />
                                                            <div className="rectangle-1-1-0"
                                                                // onClick={e => this.setState({ category: [...this.state.category, 'Entertainment'] })}
                                                                onClick={e => this.setState({ category: [...this.state.category, 'Entertainment'] })}

                                                            />
                                                            <p className="text-1">Entertainment</p>
                                                            <div className="group-6-5">
                                                                <div className="rectangle-1-3-3" />
                                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 icon" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="group-6-6">
                                                            <div className="rectangle-1-0-8" />
                                                            <div className="rectangle-1-0-9" />
                                                            <div className="rectangle-1-1-0"
                                                                onClick={e => this.setState({ category: [...this.state.category, 'Exchanges'] })}
                                                            />
                                                            <p className="text-1">Exchanges</p>
                                                            <div className="group-6-5">
                                                                <div className="rectangle-1-3-3" />
                                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 icon" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="group-6-6">
                                                            <div className="rectangle-1-0-8" />
                                                            <div className="rectangle-1-0-9" />
                                                            <div className="rectangle-1-1-0"
                                                                onClick={e => this.setState({ category: [...this.state.category, 'Development'] })}
                                                            />
                                                            <p className="text-1">Development</p>
                                                            <div className="group-6-5">
                                                                <div className="rectangle-1-3-3" />
                                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 icon" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="flex flex-row my-6">
                                                    <div>
                                                        <div className="group-6-6">
                                                            <div className="rectangle-1-0-8" />
                                                            <div className="rectangle-1-0-9" />
                                                            <div className="rectangle-1-1-0"
                                                                onClick={e => this.setState({ category: [...this.state.category, 'Gambling'] })}
                                                            />
                                                            <p className="text-1">Gambling</p>
                                                            <div className="group-6-5">
                                                                <div className="rectangle-1-3-3" />
                                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 icon" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="group-6-6">
                                                            <div className="rectangle-1-0-8" />
                                                            <div className="rectangle-1-0-9" />
                                                            <div className="rectangle-1-1-0"
                                                                onClick={e => this.setState({ category: [...this.state.category, 'Wallet'] })}
                                                            />
                                                            <p className="text-1">Wallet</p>
                                                            <div className="group-6-5">
                                                                <div className="rectangle-1-3-3" />
                                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 icon" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="group-6-6">
                                                            <div className="rectangle-1-0-8" />
                                                            <div className="rectangle-1-0-9" />
                                                            <div className="rectangle-1-1-0"
                                                                onClick={e => this.setState({ category: [...this.state.category, 'Finance'] })}
                                                            />
                                                            <p className="text-1">Finance</p>
                                                            <div className="group-6-5">
                                                                <div className="rectangle-1-3-3" />
                                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 icon" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="group-6-6">
                                                            <div className="rectangle-1-0-8" />
                                                            <div className="rectangle-1-0-9" />
                                                            <div className="rectangle-1-1-0"
                                                                onClick={e => this.setState({ category: [...this.state.category, 'Promotion'] })}
                                                            />
                                                            <p className="text-1">Promotion</p>
                                                            <div className="group-6-5">
                                                                <div className="rectangle-1-3-3" />
                                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 icon" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="flex flex-row my-6">
                                                    <div>
                                                        <div className="group-6-6">
                                                            <div className="rectangle-1-0-8" />
                                                            <div className="rectangle-1-0-9" />
                                                            <div className="rectangle-1-1-0"
                                                                onClick={e => this.setState({ category: [...this.state.category, 'Social'] })}
                                                            />
                                                            <p className="text-1">Social</p>
                                                            <div className="group-6-5">
                                                                <div className="rectangle-1-3-3" />
                                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 icon" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="group-6-6">
                                                            <div className="rectangle-1-0-8" />
                                                            <div className="rectangle-1-0-9" />
                                                            <div className="rectangle-1-1-0"
                                                                onClick={e => this.setState({ category: [...this.state.category, 'Media'] })}
                                                            />
                                                            <p className="text-1">Media</p>
                                                            <div className="group-6-5">
                                                                <div className="rectangle-1-3-3" />
                                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 icon" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="group-6-6">
                                                            <div className="rectangle-1-0-8" />
                                                            <div className="rectangle-1-0-9" />
                                                            <div className="rectangle-1-1-0"
                                                                onClick={e => this.setState({ category: [...this.state.category, 'Security'] })}
                                                            />
                                                            <p className="text-1">Security</p>
                                                            <div className="group-6-5">
                                                                <div className="rectangle-1-3-3" />
                                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 icon" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="group-6-6">
                                                            <div className="rectangle-1-0-8" />
                                                            <div className="rectangle-1-0-9" />
                                                            <div className="rectangle-1-1-0"
                                                                onClick={e => this.setState({ category: [...this.state.category, 'Utility'] })}
                                                            />
                                                            <p className="text-1">Utility</p>
                                                            <div className="group-6-5">
                                                                <div className="rectangle-1-3-3" />
                                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 icon" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="flex flex-row my-6">
                                                    <div>
                                                        <div className="group-6-6">
                                                            <div className="rectangle-1-0-8" />
                                                            <div className="rectangle-1-0-9" />
                                                            <div className="rectangle-1-1-0"
                                                                onClick={e => this.setState({ category: [...this.state.category, 'Interface'] })}
                                                            />
                                                            <p className="text-1">Interface</p>
                                                            <div className="group-6-5">
                                                                <div className="rectangle-1-3-3" />
                                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 icon" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="group-6-6">
                                                            <div className="rectangle-1-0-8" />
                                                            <div className="rectangle-1-0-9" />
                                                            <div className="rectangle-1-1-0"
                                                                onClick={e => this.setState({ category: [...this.state.category, 'Education'] })}
                                                            />
                                                            <p className="text-1">Education</p>
                                                            <div className="group-6-5">
                                                                <div className="rectangle-1-3-3" />
                                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 icon" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="group-6-6">
                                                            <div className="rectangle-1-0-8" />
                                                            <div className="rectangle-1-0-9" />
                                                            <div className="rectangle-1-1-0"
                                                                onClick={e => this.setState({ category: [...this.state.category, 'Health'] })}
                                                            />
                                                            <p className="text-1">Health</p>
                                                            <div className="group-6-5">
                                                                <div className="rectangle-1-3-3" />
                                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 icon" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="group-6-6">
                                                            <div className="rectangle-1-0-8" />
                                                            <div className="rectangle-1-0-9" />
                                                            <div className="rectangle-1-1-0"
                                                                onClick={e => this.setState({ category: [...this.state.category, 'Content Discovery'] })}
                                                            />
                                                            <p className="text-1">Content Discovery</p>
                                                            <div className="group-6-5">
                                                                <div className="rectangle-1-3-3" />
                                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 icon" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="my-2 px-2 w-full overflow-hidden sm:my-2 sm:px-2 md:my-2 md:px-2 lg:my-2 lg:px-2 xl:my-2 xl:px-2">
                                                <p className="font-bold text-lg mt-8">Project Information*</p>
                                                <div class="flex flex-row my-6">
                                                    <div>
                                                        <div className="group-6-6">
                                                            <div className="rectangle-1-0-8" />
                                                            <div className="rectangle-1-0-9" />
                                                            <div className="rectangle-1-1-0"
                                                                onClick={e => this.setState({ porject_information: "Airdrop" })}
                                                            />
                                                            <p className="text-1">Airdrop</p>
                                                            <div className="group-6-5">
                                                                <div className="rectangle-1-3-3" />
                                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 icon" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="group-6-6">
                                                            <div className="rectangle-1-0-8" />
                                                            <div className="rectangle-1-0-9" />
                                                            <div className="rectangle-1-1-0"
                                                                onClick={e => this.setState({ porject_information: "Sacrifice Phrase" })}
                                                            />
                                                            <p className="text-1">Sacrifice Phrase</p>
                                                            <div className="group-6-5">
                                                                <div className="rectangle-1-3-3" />
                                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 icon" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="my-2 px-2 w-full overflow-hidden sm:my-2 sm:px-2 md:my-2 md:px-2 lg:my-2 lg:px-2 xl:my-2 xl:px-2">
                                                <p className="font-bold text-lg mt-8">Tags*</p>
                                                <input
                                                    type="text"
                                                    // className="form-control custom-input px-5 mt-4"
                                                    className={`form-control custom-input px-5 mt-4
                                                    ${touched.tage && errors.tage ? "is-invalid" : ""}`}
                                                    id="tage"
                                                    name="tage"
                                                    placeholder="e.g.splinterlands"
                                                    value={this.state.tage}
                                                    onChange={e => this.setState({ tage: e.target.value })}
                                                    // onChange={e => this.setState({ category: [...this.state.category, 'Content Discovery'] })}
                                                    // onKeyDown={e => this.handleKeyDown(e.target.value)}
                                                    onKeyPress={(e) => {
                                                        if (e.key === "Enter") {
                                                            e.preventDefault();
                                                            this.setState({ tag_arr: [...this.state.tag_arr, this.state.tage] },
                                                                () => {
                                                                    this.setState({ tage: "" })
                                                                })
                                                            console.log(e.target.value);
                                                        }
                                                    }}
                                                />
                                                {errors.tage && !this.state.tag_arr.length ? (<div className="error my-2">{errors.tage}</div>) : ""}
                                                <div>
                                                    <div class="flex flex-row my-3">
                                                        {
                                                            this.state.tag_arr.map((data, i) => {
                                                                return (
                                                                    <div>
                                                                        <div className="group-6-6" key={i}>
                                                                            <div className="rectangle-1-0-8" />
                                                                            <div className="rectangle-1-0-9" />
                                                                            <div className="rectangle-1-1-0" />
                                                                            <p className="text-1">{data}</p>
                                                                            <div className="group-6-5">
                                                                                <div className="rectangle-1-3-3" />
                                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 icon1" viewBox="0 0 20 20" fill="currentColor" onClick={e => this.removeTag(data)}>
                                                                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                                                </svg>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="my-2 px-2 w-full overflow-hidden sm:my-2 sm:px-2 md:my-2 md:px-2 lg:my-2 lg:px-2 xl:my-2 xl:px-2">
                                                <p className="font-bold text-lg mt-8">Social media links</p>
                                                <div>
                                                    <input
                                                        type="text"
                                                        className="form-control custom-input px-5 mt-4"
                                                        id="facebook"
                                                        name="facebook"
                                                        placeholder="Facebook"
                                                        value={this.state.facebook}
                                                        onChange={e => this.setState({ facebook: e.target.value })}
                                                        error={
                                                            errors.facebook && Boolean(errors.facebook)
                                                        }
                                                        helperText={
                                                            errors.facebook ? errors.facebook : ""
                                                        }
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
                                                        onChange={e => this.setState({ twitter: e.target.value })}
                                                        error={
                                                            errors.twitter && Boolean(errors.twitter)
                                                        }
                                                        helperText={
                                                            errors.twitter ? errors.twitter : ""
                                                        }
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
                                                        onChange={e => this.setState({ instagram: e.target.value })}
                                                        error={
                                                            errors.instagram && Boolean(errors.instagram)
                                                        }
                                                        helperText={
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
                                                        onChange={e => this.setState({ youtube: e.target.value })}
                                                        error={
                                                            errors.youtube && Boolean(errors.youtube)
                                                        }
                                                        helperText={
                                                            errors.youtube ? errors.youtube : ""
                                                        }
                                                    />
                                                </div>

                                            </div>
                                            <div class="my-2 px-2 w-full overflow-hidden sm:my-2 sm:px-2 md:my-2 md:px-2 lg:my-2 lg:px-2 xl:my-2 xl:px-2">
                                                <p className="font-bold text-lg mt-8">Source code</p>
                                                <div>
                                                    <input
                                                        type="text"
                                                        className="form-control custom-input px-5 mt-4"
                                                        id="github"
                                                        name="github"
                                                        placeholder="Github"
                                                        value={this.state.github}
                                                        onChange={e => this.setState({ github: e.target.value })}
                                                        error={
                                                            errors.github && Boolean(errors.github)
                                                        }
                                                        helperText={
                                                            errors.github ? errors.github : ""
                                                        }
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
                                                        onChange={e => this.setState({ discord: e.target.value })}
                                                        error={
                                                            errors.discord && Boolean(errors.discord)
                                                        }
                                                        helperText={
                                                            errors.discord ? errors.discord : ""
                                                        }
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
                                                        onChange={e => this.setState({ gitlab: e.target.value })}
                                                        error={
                                                            errors.gitlab && Boolean(errors.gitlab)
                                                        }
                                                        helperText={
                                                            errors.gitlab ? errors.gitlab : ""
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        )
                    }}
                </Formik>

            </Fragment >
        )
    }

}



export default CreateApp;