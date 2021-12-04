import { useForm } from "react-hook-form"
import tw from 'twin.macro'

export default function AccountSettings() {
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
                                <div id="delete-button" tw="col-start-1 text-center mt-10 inline-flex content-start whitespace-nowrap">
                                    <button tw="bg-error-500 rounded text-white font-bold py-2 px-4 mr-6" type="submit">Delete Account</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}