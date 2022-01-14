import { useForm } from "react-hook-form"
import tw from 'twin.macro'
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Layout } from "../components/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faExclamationTriangle, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import Modal from "../components/Modal"
import {getToken} from "../lib/auth";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons/faCheckCircle";


export default function AccountSettings() {
    const TOKEN = getToken();
    const router = useRouter();
    const { register, handleSubmit, errors, reset } = useForm();

    const [showModal, setShowModal] = useState(false);
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);

    const [full_name, setFull_name] = useState("");
    const [email, setEmail] = useState("");
    const [institution, setInstitution] = useState("");
    const [website, setWebsite] = useState("");

    const [isDomainOwner, setIsDomainOwner] = useState(false);

    useEffect(() => {
        getUser();
    }, []);

    async function getUser() {
        console.log("################################################################################");

        try{
            const apiRes = await fetch(
                "api/user-profile",
                {
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                }
            );

            if(apiRes.status == 200){
                const user = await apiRes.json();
                setFull_name(user.full_name);
                setEmail(user.email);
                setInstitution(user.institution);
                setWebsite(user.website);
            }
            else{
                alert("Couldn't fetch the user profile!");
            }
        }
        catch (error){
            console.log(error);
        }
    }

    async function onUpdateInfo() {
        const body =JSON.stringify({
            full_name: full_name,
            email,
            institution,
            website
        })
        try{
            const apiRes = await fetch(
                "api/user-profile",
                {
                    method: "PUT",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: body
                }
            );

            if(apiRes.status == 200){
                const user = await apiRes.json();
                console.log(user);
            }
            else{
                alert("Couldn't update the user profile!");
            }
        }
        catch (error){
            console.log(error);
        }
    }

    async function onUpdatePassword(values) {
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

    async function onDeleteAccount() {
        setShowModal(false);
        setShowFeedbackModal(true);
        try{
            const apiRes = await fetch(
                "api/user-profile",
                {
                    method: "DELETE",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                }
            );

            if(apiRes.status == 200){
                const response = await apiRes.json();
                console.log(response);
            }
            else{
                alert("Couldn't delete the user profile!");
            }
        }
        catch (error){
            console.log(error);
        }
    }

    async function onSubmitFeedbackForm(values) {
        setShowFeedbackModal(false);
        router.push('/login');
    }

    const onClickSkipFeedback = () => {
        setShowFeedbackModal(false);
        router.push('/login');
    }

    return (
        <div tw="font-roboto">
            <Layout >
                <div tw="col-span-9 my-10 mx-3 flex items-center space-x-3 p-3 bg-primary-100 border-t-4 border-primary-500">
                    <FontAwesomeIcon icon={faInfoCircle} tw="" />
                    <p tw="text-gray-800 cursor-pointer">Your profile information is public-facing information that other users and node owners can see.</p>
                </div>

                <div tw="col-span-5 mx-3">
                    <p tw="text-2xl text-left font-bold font-rubik">Profile</p>
                    <form tw="text-gray-500 my-5">
                        <div tw="mt-2">
                            <label tw="font-bold text-sm" htmlFor="name">Full Name</label><p tw="pl-1 inline relative bottom-1 text-primary-500 font-bold">*</p>
                        </div>
                        <div tw="mt-2">
                            <input tw="p-2 border border-gray-300 rounded text-black w-full" id="name" name="name"
                                   value={full_name} onChange={e => setFull_name(e.target.value)} type="name" placeholder="Full Name" required/>
                        </div>
                        <div tw="mt-4">
                            <label tw="font-bold text-sm" htmlFor="email">Email</label><p tw="pl-1 inline relative bottom-1 text-primary-500 font-bold">*</p>
                        </div>
                        <div tw="mt-2">
                            <input tw="p-2 border border-gray-300 rounded text-black w-full" id="email" name="email"
                                   value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="abc@university.edu" autoComplete="email" required />
                        </div>
                        <div tw="mt-4">
                            <label tw="font-bold text-sm" htmlFor="company">Company/Institution</label><p tw="pl-1 inline relative text-primary-500 text-xs italic">(optional)</p>
                        </div>
                        <div tw="mt-2">
                            <input tw="p-2 border border-gray-300 rounded text-black w-full" id="company" name="company"
                                   value={institution} onChange={e => setInstitution(e.target.value)} type="text" placeholder="Company/Institution" />
                        </div>
                        <div tw="mt-2">
                            <p tw="text-sm ml-3">Which company, organization, or institution are you affiliated with?</p>
                        </div>
                        <div tw="mt-4">
                            <label tw="font-bold text-sm" htmlFor="website">Website/Profile</label><p tw="pl-1 inline relative text-primary-500 text-xs italic">(optional)</p>
                        </div>
                        <div tw="mt-2">
                            <input tw="p-2 border border-gray-300 rounded text-black w-full" id="website" name="website"
                                   value={website} onChange={e => setWebsite(e.target.value)} type="text" placeholder="Website/Profile" />
                        </div>
                        <div tw="text-left mt-2">
                            <p tw="text-sm ml-3 mr-5">Provide a link to your personal or university web page or a social media profile to help others get to know you</p>
                        </div>
                        <div id="buttons" tw="text-center mt-10 inline-flex content-start whitespace-nowrap">
                            <button tw="bg-primary-500 rounded text-white font-bold py-2 px-4 mr-6" type="button" onClick={onUpdateInfo}>Save Changes</button>
                            <button tw="text-primary-500 font-bold" type="reset">Cancel</button>
                        </div>
                    </form>
                </div>

                <div tw="col-start-1 col-span-5 mx-3">
                    <p tw="text-2xl text-left font-bold font-rubik mt-10">Password</p>
                    <form tw="text-gray-500 my-5" onSubmit={onUpdatePassword}>
                        <div tw="mt-2">
                            <label tw="text-sm font-bold" htmlFor="password-old">Current Password</label><p tw="pl-1 inline relative bottom-1 text-primary-500 font-bold">*</p>
                        </div>
                        <div tw="mt-2">
                            <input tw="p-2 border border-gray-300 rounded text-black w-full" id="password-old" name="password-old" type="password" placeholder="********" required />                        </div>
                        <div tw="mt-4">
                            <label tw="text-sm font-bold" htmlFor="password-new">New Password</label><p tw="pl-1 inline relative bottom-1 text-primary-500 font-bold">*</p>
                        </div>
                        <div tw="mt-2">
                            <input tw="p-2 border border-gray-300 rounded text-black w-full" id="password-new" name="password-new" type="password" placeholder="********" required />
                        </div>

                        <div id="buttons" tw="col-start-1 text-center mt-10 inline-flex content-start whitespace-nowrap">
                            <button tw="bg-primary-500 rounded text-white font-bold py-2 px-4 mr-6" type="submit">Change Password</button>
                            <button tw="text-primary-500 font-bold" type="reset">Cancel</button>
                        </div>
                    </form>
                </div>

                <div id="delete-account" tw="col-span-9 mx-3">
                    <p tw="text-2xl text-left font-bold font-rubik mt-10">Delete Account</p>
                    <div tw="py-6 rounded-lg gap-2">
                        <p tw="text-sm text-gray-600 mr-5">
                            When you delete your user account all information relating to you will be deleted as well as any permissions and requests.
                            If you are the domain owner the domain node will be deleted as well and will be closed to all users.
                            To transfer ownership of a domain node before deleting your account you can follow the instructions <a tw="text-primary-500 underline">here</a>.
                        </p>
                        <button tw="bg-error-500 rounded text-white font-bold py-2 px-4 mr-6 mt-10" type="submit"
                            onClick={() => setShowModal(true)}
                        >Delete Account</button>
                        <Modal show={showModal} onClose={() => setShowModal(false)}>
                            <div tw="text-center ">
                                <div tw="flex flex-col p-3 mt-3">
                                    <FontAwesomeIcon icon={faExclamationTriangle} size="2x" tw="text-warning-500 self-center m-6"/>
                                    <h1 tw="text-3xl font-bold font-rubik text-gray-800">
                                        Are you Sure You Want to Delete Your Account?
                                    </h1>
                                </div>
                                <div tw="p-6 font-roboto text-gray-600">
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
                                <div tw="flex justify-center p-6 font-bold font-roboto">
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
                                        tw="text-error-500 font-bold py-2 px-4 mr-6 rounded"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </Modal>

                        <Modal show={showFeedbackModal} onClose={() => setShowFeedbackModal(false)}>
                            <div tw="text-center">
                                <div tw="flex flex-col p-3 mt-3">
                                    <FontAwesomeIcon icon={faCheckCircle} size="2x" tw="text-success-500 self-center m-6"/>
                                    <h1 tw="text-3xl font-bold font-rubik text-gray-800">
                                        Your Account Has Been Deleted
                                    </h1>
                                </div>
                                <div tw="p-6 text-gray-600 font-roboto">
                                    <p>
                                        To help us improve future experiences could you share with us any frustrations
                                        or suggestions you have with or for the PyGridUI Platform?
                                    </p>
                                </div>
                                <form tw="flex flex-col justify-start font-roboto mx-4" onSubmit={handleSubmit(onSubmitFeedbackForm)}>
                                    <label tw="text-left my-2 inline-flex" htmlFor="frustrations"> <p tw="font-bold text-gray-500">Frustrations </p><p tw="pl-1 inline relative text-sm italic text-primary-600 ">(optional)</p></label>
                                    <input
                                        tw="text-left p-3 border border-gray-300 rounded-lg break-words resize-y focus:shadow-active hover:shadow-active active:ring-primary-500 active:text-gray-800"
                                        name="frustrations"
                                        type="text"
                                        placeholder="What felt vague or cumbersome?"
                                        {...register("frustrations", { required: false })}
                                    />
                                    <label tw="text-left my-2 mt-4 inline-flex" htmlFor="suggestions"> <p tw="font-bold text-gray-500">Suggestions</p><p tw="pl-1 inline relative text-sm italic text-primary-600 ">(optional)</p></label>
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
                                            tw="text-primary-500 font-bold py-2 px-4 mr-6 rounded-lg"
                                            type="button"
                                            onClick={onClickSkipFeedback}
                                        >
                                            Skip
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </Modal>
                    </div>
                </div>
            </Layout>
        </div>
    )
}