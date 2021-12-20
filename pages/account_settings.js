import { useForm } from "react-hook-form"
import tw from 'twin.macro'
import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import {SidebarNav} from "../components/SidebarNav";

export default function AccountSettings() {
    const router = useRouter();
    const { register, handleSubmit, errors, reset } = useForm();

    const [showModal, setShowModal] = useState(false);
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);

    const [full_Name, setFull_Name] = useState(null);
    const [email, setEmail] = useState(null);
    const [institution, setInstitution] = useState(null);
    const [website, setWebsite] = useState(null);

    const [isDomainOwner, setIsDomainOwner] = useState(false);

    useEffect(() => {
        /*
        axios.get('http://localhost/api/v1/users/me')
            .then(function (response) {
                console.log(response);
                setFull_Name(response.config.full_name);
                setEmail(response.config.email);
                setInstitution(response.config.institution);
                setWebsite(response.config.website);
            })

         */
    }, [full_Name, email, institution, website]);

    async function getUser(){

        /*
        let config = {
            method: 'get',
            url: 'http://localhost/api/v1/users/me',
        }
        try{
            const response = await axios(config)
            console.log(response);
            setFull_Name(response.config.full_name);
            setEmail(response.config.email);
            setInstitution(response.config.institution);
            setWebsite(response.config.website);

        }catch (err){
            console.error(err);
        }
         */
    }

    async function onUpdateInfo(values){
        /*
        let config = {
            method: 'put',
            url: 'http://localhost/api/v1/users/me',
            body: {
                "full_name": values.full_name,
                "email": values.email,
                "institution": values.institution,
                "website": values.website
            }
        }
        try{
            const response = await axios(config)
            console.log(response);
            await router.push('/account_settings')
        }catch (err){
            console.error(err);
        }

         */
    }

    async function onUpdatePassword(values){
        /*
        let config = {
            method: 'put',
            url: 'http://localhost/api/v1/users/me',
            body: {
                "password_old": values.password_old,
                "password_new": values.password_new,
            }
        }
        try{
            const response = await axios(config)
            console.log(response);
            await router.push('/account_settings')
        }catch (err){
            console.error(err);
        }

         */
    }

    async function onDeleteAccount(){
        setShowModal(false);
        setShowFeedbackModal(true);
        /*
        let config = {
            method: 'delete',
            url: 'http://localhost/api/v1/users',
        }
        try{
            const response = await axios(config)
            console.log(response);
        }catch (err){
            console.error(err);
        }

         */
    }

    async function onSubmitFeedbackForm(values){
        /*
        const formData = new FormData
        formData.append("frustrations", values.frustrations)
        formData.append("suggestions", values.suggestions)
        let config = {
            method: 'post',
            url: 'http://localhost/api/v1/???',
            data: formData
        }
        try{
            console.log("config data: ", values)
            const response = await axios(config)
            console.log(response);
            router.push('/login')
        }catch (err){
            console.error(err);
        }

         */
    }

    const onClickSkipFeedback = () => {
        setShowFeedbackModal(false);
        reset();
        //router.push('/login');
    }

    return(
        <div>
            <div id="app" tw="flex h-screen w-screen">
                <SidebarNav />

                <div id="settings" tw="grid grid-cols-12 flex-grow text-left ml-6 py-10 text-lg">
                    <div id="header">

                    </div>

                    <div id="info">

                    </div>

                    <div id="divider" tw="col-start-1 col-end-9 grid grid-cols-9 divide-y">
                        <div id="profile-form" tw="col-start-1 col-end-9 bg-white text-lg rounded">
                            <p tw="text-2xl text-left font-bold">Profile</p>
                            <form tw="grid grid-cols-9 text-gray-600 text-sm py-6 rounded-lg gap-2" onSubmit={onUpdateInfo}>
                                <label tw="col-start-1 col-end-5 text-left font-bold mt-2" htmlFor="name">Full Name</label>
                                <input tw="col-start-1 col-end-5 text-left p-3 border border-gray-300 rounded-lg" id="name" name="name" value={full_Name} type="name" placeholder="Full Name" required />
                                <label tw="col-start-1 col-end-5 text-left font-bold mt-2" htmlFor="email">Email</label>
                                <input tw="col-start-1 col-end-5 text-left p-3 border border-gray-300 rounded-lg" id="email" name="email" value={email} type="email" placeholder="abc@university.edu" autoComplete="email" required />
                                <label tw="col-start-1 col-end-5 text-left font-bold mt-2" htmlFor="company">Company/Institution</label>
                                <input tw="col-start-1 col-end-5 text-left p-3 border border-gray-300 rounded-lg" id="company" name="company" value={institution} type="text" placeholder="Company/Institution" required />
                                <p tw="col-start-1 col-end-5 text-gray-600 text-sm ml-3">Which company, organization, or institution are you affiliated with?</p>
                                <label tw="col-start-1 col-end-5 text-left font-bold mt-2" htmlFor="website">Website/Profile</label>
                                <input tw="col-start-1 col-end-5 text-left p-3 border border-gray-300 rounded-lg" id="website" name="website" value={website} type="text" placeholder="Website/Profile" required />
                                <p tw="col-start-1 col-end-5 text-gray-600 text-sm ml-3 mr-5">Provide a link to your personal or university web page or a social media profile to help others get to know you</p>
                                <div id="buttons" tw="col-start-1 text-center mt-10 inline-flex content-start whitespace-nowrap">
                                    <button tw="bg-primary-500 rounded text-white font-bold py-2 px-4 mr-6" type="submit">Save Changes</button>
                                    <button tw="text-primary-500 font-bold py-2" type="reset">Cancel</button>
                                </div>
                            </form>
                        </div>

                        <div id="password-form" tw="col-start-1 col-end-9 bg-white text-lg rounded">
                            <p tw="text-2xl text-left font-bold mt-10">Password</p>
                            <form tw="grid grid-cols-9 text-gray-600 text-sm py-6 rounded-lg gap-2" onSubmit={onUpdatePassword}>
                                <label tw="col-start-1 col-end-5 text-left font-bold mt-2" htmlFor="password-old">Current Password</label>
                                <input tw="col-start-1 col-end-5 text-left p-3 border border-gray-300 rounded-lg" id="password-old" name="password-old" type="password" placeholder="********" required />
                                <label tw="col-start-1 col-end-5 text-left font-bold mt-2" htmlFor="password-new">New Password</label>
                                <input tw="col-start-1 col-end-5 text-left p-3 border border-gray-300 rounded-lg" id="password-new" name="password-new" type="password" placeholder="********" required />
                                <div id="buttons" tw="col-start-1 text-center mt-10 inline-flex content-start whitespace-nowrap">
                                    <button tw="bg-primary-500 rounded text-white font-bold py-2 px-4 mr-6" type="submit">Change Password</button>
                                    <button tw="text-primary-500 font-bold py-2" type="reset">Cancel</button>
                                </div>
                            </form>
                        </div>

                        <div id="delete-account" tw="col-start-1 col-end-9 bg-white text-lg rounded">
                            <p tw="text-2xl text-left font-bold mt-10">Delete Account</p>
                            <div tw="text-gray-600 text-sm py-6 rounded-lg gap-2">
                                <p tw="text-gray-600 text-sm mr-5">
                                    When you delete your user account all information relating to you will be deleted as well as any permissions and requests.
                                    If you are the domain owner the domain node will be deleted as well and will be closed to all users.
                                    To transfer ownership of a domain node before deleting your account you can follow the instructions here.
                                </p>
                                <div id="delete-button"
                                     tw="col-start-1 text-center mt-10 inline-flex content-start whitespace-nowrap"
                                >
                                    <button tw="bg-error-500 rounded text-white font-bold py-2 px-4 mr-6" type="submit"
                                            onClick={() => setShowModal(true)}
                                    >Delete Account</button>
                                </div>

                                {showModal ? (
                                    <>
                                        <div
                                            tw="justify-center items-center flex fixed inset-0 text-center backdrop-blur-sm"
                                        >
                                            <div tw="max-w-lg">
                                                <div tw="rounded-sm shadow bg-white p-3">
                                                    <div tw="flex justify-end p-2 pr-5">
                                                        <button
                                                            onClick={() => setShowModal(false)}>
                                                            X
                                                        </button>
                                                    </div>
                                                    <div tw="flex justify-center p-3">
                                                        <h1 tw="text-2xl font-bold mt-3">
                                                            Are you Sure You Want to Delete Your Account?
                                                        </h1>
                                                    </div>
                                                    <div tw="p-6">
                                                        {isDomainOwner ?
                                                            <p>
                                                                Because you are the domain owner, the domain node along with all uploaded datasets, user accounts,
                                                                and requests will be deleted. All network memberships will also be removed. If you would like to keep
                                                                this domain node but no longer want to be an owner press “cancel” and follow the instructions <a>here</a> to
                                                                transfer ownership of your domain node.
                                                            </p>
                                                            :
                                                            <p>
                                                                If deleted all uploaded documents will be deleted and all open requests will be closed. Keep in mind
                                                                any legal agreements pertaining to the use of your data requests will still apply according to the
                                                                terms of the agreement signed. If you would like to proceed press “Delete Account” if not you can click
                                                                “Cancel”.
                                                            </p>
                                                        }
                                                    </div>
                                                    <div tw="flex justify-center p-6">
                                                        {isDomainOwner ?
                                                            <button
                                                                tw="bg-error-500 rounded text-white font-bold py-2 px-4 mr-6"
                                                                type="button"
                                                                onClick={onDeleteAccount}
                                                            >
                                                                Delete Node
                                                            </button>
                                                        :
                                                            <button
                                                                tw="bg-error-500 rounded text-white font-bold py-2 px-4 mr-6"
                                                                type="button"
                                                                onClick={onDeleteAccount}
                                                            >
                                                                Delete Account
                                                            </button>
                                                        }
                                                        <button
                                                            tw="text-error-500 font-bold py-2 px-4 mr-6"
                                                            type="button"
                                                            onClick={() => setShowModal(false)}
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : null}


                                {showFeedbackModal ? (
                                    <>
                                        <div
                                            tw="justify-center items-center flex fixed inset-0 text-center backdrop-blur-sm"
                                        >
                                            <div tw="max-w-lg">
                                                <div tw="rounded-sm shadow bg-white p-3">
                                                    <div tw="flex justify-end p-2 pr-5">
                                                        <button
                                                            onClick={onClickSkipFeedback}>
                                                            X
                                                        </button>
                                                    </div>
                                                    <div tw="flex justify-center p-3">
                                                        <h1 tw="text-2xl font-bold mt-3">
                                                            Your Account Has Been Deleted
                                                        </h1>
                                                    </div>
                                                    <div tw="p-6">
                                                        <p>
                                                            To help us improve future experiences could you share with us any frustrations
                                                            or suggestions you have with or for the PyGridUI Platform?
                                                        </p>
                                                    </div>
                                                    <form tw="flex flex-col justify-start mx-4" onSubmit={handleSubmit(onSubmitFeedbackForm)}>
                                                        <label tw="text-left my-2 inline-flex" htmlFor="frustrations"> <p tw="font-bold">Frustrations </p><p tw="pl-1 inline relative text-sm text-primary-500 ">(optional)</p></label>
                                                        <input
                                                            tw="text-left p-3 border border-gray-300 rounded-lg break-words focus:shadow-active hover:shadow-active active:ring-primary-500 active:text-gray-800"
                                                            name="frustrations"
                                                            type="text"
                                                            placeholder="What felt vague or cumbersome?"
                                                            {...register("frustrations", { required: false })}
                                                        />
                                                        <label tw="text-left my-2 mt-4 inline-flex" htmlFor="suggestions"> <p tw="font-bold">Suggestions</p><p tw="pl-1 inline relative text-sm text-primary-500 ">(optional)</p></label>
                                                        <input
                                                            tw="text-left p-3 border border-gray-300 rounded-lg focus:shadow-active hover:shadow-active active:ring-primary-500 active:text-gray-800"
                                                            name="suggestions"
                                                            type="text"
                                                            placeholder="Did you have moments of thinking “I wish I could...”"
                                                            {...register("suggestions", { required: false })}
                                                        />
                                                        <div tw="flex justify-center p-6 mt-10">
                                                            <button
                                                                tw="bg-primary-500 rounded text-white font-bold py-2 px-4 mr-6"
                                                                type="submit"
                                                            >
                                                                Submit Response
                                                            </button>
                                                            <button
                                                                tw="text-primary-500 font-bold py-2 px-4 mr-6"
                                                                type="button"
                                                                onClick={onClickSkipFeedback}
                                                            >
                                                                Skip
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : null}

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}