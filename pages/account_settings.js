import { useForm } from "react-hook-form"
import tw from 'twin.macro'
import {useCallback, useState} from "react";

export default function AccountSettings() {
    const [showModal, setShowModal] = useState(false);
    const [userIsDomainOwner, setUserIsDomainOwner] = useState(false);

    return(
        <div>
            <div id="app" tw="flex flex-col h-screen w-screen py-10">
                <div id="sidebar-here">

                </div>

                <div id="settings" tw="grid grid-cols-12 flex-grow text-left ml-6 text-lg">
                    <div id="header">

                    </div>

                    <div id="info">

                    </div>

                    <div id="divider" tw="col-start-1 col-end-9 grid grid-cols-9 divide-y">
                        <div id="profile-form" tw="col-start-1 col-end-9 bg-white text-lg rounded">
                            <p tw="text-2xl text-left font-bold">Profile</p>
                            <form tw="grid grid-cols-9 text-gray-600 text-sm py-6 rounded-lg gap-2">
                                <label tw="col-start-1 col-end-5 text-left font-bold mt-2" htmlFor="name">Full Name</label>
                                <input tw="col-start-1 col-end-5 text-left p-3 border border-gray-300 rounded-lg" id="name" name="name" type="name" placeholder="Full Name" required />
                                <label tw="col-start-1 col-end-5 text-left font-bold mt-2" htmlFor="email">Email</label>
                                <input tw="col-start-1 col-end-5 text-left p-3 border border-gray-300 rounded-lg" id="email" name="email" type="email" placeholder="abc@university.edu" autoComplete="email" required />
                                <label tw="col-start-1 col-end-5 text-left font-bold mt-2" htmlFor="company">Company/Institution</label>
                                <input tw="col-start-1 col-end-5 text-left p-3 border border-gray-300 rounded-lg" id="company" name="company" type="text" placeholder="Company/Institution" required />
                                <p tw="col-start-1 col-end-5 text-gray-600 text-sm ml-3">Which company, organization, or institution are you affiliated with?</p>
                                <label tw="col-start-1 col-end-5 text-left font-bold mt-2" htmlFor="website">Website/Profile</label>
                                <input tw="col-start-1 col-end-5 text-left p-3 border border-gray-300 rounded-lg" id="website" name="website" type="text" placeholder="Website/Profile" required />
                                <p tw="col-start-1 col-end-5 text-gray-600 text-sm ml-3 mr-5">Provide a link to your personal or university web page or a social media profile to help others get to know you</p>
                                <div id="buttons" tw="col-start-1 text-center mt-10 inline-flex content-start whitespace-nowrap">
                                    <button tw="bg-primary-500 rounded text-white font-bold py-2 px-4 mr-6" type="submit">Save Changes</button>
                                    <button tw="text-primary-500 font-bold py-2" type="reset">Cancel</button>
                                </div>
                            </form>
                        </div>

                        <div id="password-form" tw="col-start-1 col-end-9 bg-white text-lg rounded">
                            <p tw="text-2xl text-left font-bold mt-10">Password</p>
                            <form tw="grid grid-cols-9 text-gray-600 text-sm py-6 rounded-lg gap-2">
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
                                            tw="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                        >
                                            <div tw="relative w-auto my-6 mx-auto max-w-3xl">
                                                {/*content*/}
                                                <div tw="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                                    {/*header*/}
                                                    <div tw="flex items-start justify-between p-5 border-b border-solid border-blue-200 rounded-t">
                                                        <h3 tw="text-3xl font-semibold">
                                                            Are you Sure You Want to Delete Your Account?
                                                        </h3>
                                                    </div>
                                                    {/*body*/}
                                                    <div tw="relative p-6 flex-auto">
                                                        {userIsDomainOwner ?
                                                            <p tw="my-4 text-blue-500 text-lg leading-relaxed">
                                                                Because you are the domain owner, the domain node along with all uploaded datasets, user accounts,
                                                                and requests will be deleted. All network memberships will also be removed. If you would like to keep
                                                                this domain node but no longer want to be an owner press “cancel” and follow the instructions here to
                                                                transfer ownership of your domain node.
                                                            </p>
                                                            :
                                                            <p tw="my-4 text-blue-500 text-lg leading-relaxed">
                                                                If deleted all uploaded documents will be deleted and all open requests will be closed. Keep in mind
                                                                any legal agreements pertaining to the use of your data requests will still apply according to the
                                                                terms of the agreement signed. If you would like to proceed press “Delete Account” if not you can click
                                                                “Cancel”.
                                                            </p>
                                                        }
                                                    </div>
                                                    {/*footer*/}
                                                    <div tw="flex items-center justify-end p-6 border-t border-solid border-blue-200 rounded-b">
                                                        {userIsDomainOwner ?
                                                            <button
                                                                tw="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                type="button"
                                                                onClick={() => setShowModal(false)}
                                                            >
                                                                Delete Node
                                                            </button>
                                                        :
                                                            <button
                                                                tw="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                type="button"
                                                                onClick={() => setShowModal(false)}
                                                            >
                                                                Delete Account
                                                            </button>
                                                        }
                                                        <button
                                                            tw="text-red-500 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}