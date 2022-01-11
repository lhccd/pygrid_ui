import React, { useState } from 'react';
import tw, {styled} from 'twin.macro';
import { Table } from './Table';
import { Table2 } from './Table2';
import Modal from '../components/Modal';
import {faPlus, faInfoCircle, faCheck, faTimes} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import ListBox from './ListBox';
import Tag from "./Tag";
import {useForm} from "react-hook-form";
import ToggleSwitch from "./ToggleSwitch";

// const styles = {
//     container: ({ hasBg }) => [
//       tw`flex w-full`, // Add base styles first
//       hasBg && tw`bg-black`, // Then add conditional styles
//     ],
//     button: ({ toggleState }) => [
//         tw`p-4 text-center w-1/2 bg-white border`,
//         (toggleState === 1) && tw`bg-primary-300`,
//         (toggleState === 2) && tw`bg-primary-500`,
//         (toggleState === 3) && tw`bg-primary-800`
//     ]
// }
const Button = styled.button(({ state }) => [
    tw`p-4 bg-gray-50 text-center w-1/2 bg-white border-primary-500 border-t-2 border-r-2 border-l-2`,
    (state === 1) && tw`bg-gray-50`,
    (state === 2) && tw`bg-gray-100`,
    (state === 3) && tw`bg-gray-50`
])

const Content = styled.div(({ state }) => [
    tw`bg-gray-300 p-5 w-full h-full hidden`,
    (state === 1) && tw`bg-gray-300 block`,
    (state === 2) && tw`bg-gray-500 block`,
    (state === 3) && tw`bg-gray-800 block`

])

const DomainBody = [
    {
        Name: 'CANADA DOMAIN',
        ID: 'ID#449f4f997a96467f90f7af8b396928f1',
        HostedDatasets: '2',
        DeployedOn: '09.07.2021',
        Owner: ['KYOKO ENG'],
        Network: '---',
        SupportContact: 'support@abc.com',
        LastUpdated: '2021-JUL-09 09:45',
        Version: 'Version Name Here'
    }
]

function Profile(){
    const [showModal, setShowModal] = useState(false);
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const { register, handleSubmit, errors, reset } = useForm();

    function onSubmitProfile(values){

    }

    async function onPurgeNode() {
        setShowModal(false);
        setShowFeedbackModal(true);
    }

    async function onSubmitFeedbackForm(values) {
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
        setShowFeedbackModal(false)
    }

    const onClickSkipFeedback = () => {
        setShowFeedbackModal(false);
        reset();
        //router.push('/login');
    }

    return (
        <>
            <div id="domain-box" tw="col-start-3 col-end-11 text-gray-800">
                <div tw="divide-y">
                    <div id="general">
                        <h1 tw="font-bold text-left text-xl my-4 mt-10">General</h1>
                        <div tw="divide-y divide-gray-200 divide-solid">
                            <ul id="domain-info" tw="text-left text-sm mt-4 mb-8">
                                <li tw="py-2">
                                    <a tw="font-bold text-gray-700">Domain Name: </a>
                                    <a tw="font-mono">{DomainBody[0].Name}</a>
                                </li>
                                <li tw="py-2">
                                    <a tw="font-bold text-gray-700">ID#: </a>
                                    <a>{DomainBody[0].ID}</a>
                                </li>
                                <li tw="py-2">
                                    <a tw="font-bold text-gray-700">Hosted Datasets: </a>
                                    <a tw="font-mono">{DomainBody[0].HostedDatasets}</a>
                                </li>
                                <li tw="py-2">
                                    <a tw="font-bold text-gray-700">Deployed On: </a>
                                    <a tw="font-mono">{DomainBody[0].DeployedOn}</a>
                                </li>
                                <li tw="py-2">
                                    <a tw="font-bold text-gray-700">Owner: </a>
                                    <a tw="font-mono">{DomainBody[0].Owner}</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div id="profile-options">
                        <form tw="col-span-8 my-5" onSubmit={onSubmitProfile}>
                            <div tw="mt-8">
                                <label tw="text-xl font-bold mt-8" htmlFor="description">Domain Description</label><p tw="pl-2 inline relative text-primary-500 italic">Optional</p>
                            </div>
                            <div tw="mt-2">
                                <input tw="p-2 border border-gray-300 rounded text-black w-full py-8" id="description" name="description" type="text" placeholder="Describe your domain to potential users here..."/>
                            </div>
                            <div tw="mt-8">
                                <label tw="text-xl font-bold mt-8" htmlFor="email">Support Email</label><p tw="pl-2 inline relative text-primary-500 italic">Optional</p>
                            </div>
                            <div tw="mt-2">
                                <p tw="text-sm text-gray-600">An email available for users to use when they have specific questions about your domain node</p>
                            </div>
                            <div tw="mt-2">
                                <input tw="p-2 border border-gray-300 rounded text-black w-full" id="email" name="email" type="email" placeholder="support@company.org"/>
                            </div>
                            <div tw="mt-8">
                                <label tw="text-xl font-bold mt-8" htmlFor="tags">Tags</label><p tw="pl-2 inline relative text-primary-500 italic">Optional</p>
                            </div>
                            <div tw="mt-2 inline-flex w-full">
                                <input tw="p-2 border border-gray-300 rounded-l text-black w-full" id="tags" name="tags" type="text" placeholder="Create new tag here..."/>
                                <button tw="border border-gray-300 bg-gray-100 rounded-r text-gray-800 p-2 whitespace-nowrap" type="button">Add</button>
                            </div>
                            <div id="tags" tw="mt-2">
                                <Tag>Commodities <FontAwesomeIcon icon={faTimes} size="sm" tw=""/></Tag>
                                <Tag>Trade <FontAwesomeIcon icon={faTimes} size="sm" tw=""/></Tag>
                                <Tag>Canada <FontAwesomeIcon icon={faTimes} size="sm" tw=""/></Tag>
                            </div>
                            <div id="buttons" tw="text-center mt-10 inline-flex content-start whitespace-nowrap">
                                <button tw="bg-primary-500 rounded text-white font-bold py-2 px-4 mr-6" type="submit">Save Changes</button>
                            </div>
                        </form>
                    </div>


                    <div id="purge-node" tw="">
                        <p tw="text-xl text-left font-bold mt-10">Reset/Purge Domain Node</p>
                        <div tw="text-gray-500 text-sm py-6 rounded-lg gap-2">
                            <p tw="text-sm mr-5">
                                Description here of what this option means. Also might want to provide a link out that explains how to delete a node via command line.
                            </p>
                            <div id="delete-button"
                                 tw="text-center mt-10 inline-flex content-start whitespace-nowrap"
                            >
                                <button tw="bg-error-500 rounded text-white font-bold py-2 px-4 mr-6" type="submit"
                                        onClick={() => setShowModal(true)}
                                >Reset/Purge Node</button>
                            </div>
                            <Modal show={showModal} onClose={() => setShowModal(false)}>
                                <div>
                                    <div tw="flex justify-center p-3">
                                        <h1 tw="text-2xl font-bold mt-3">
                                            Are you Sure You Want to Reset/Purge this Domain Node?
                                        </h1>
                                    </div>
                                    <div tw="p-6">
                                        <p>
                                            Description here of what this option means. Also might want to provide a link out
                                            that explains how to delete a node via command line.
                                        </p>
                                    </div>
                                    <div tw="flex justify-center p-6">
                                        <button
                                            tw="bg-error-500 rounded text-white font-bold py-2 px-4 mr-6"
                                            type="button"
                                            onClick={onPurgeNode}
                                        >
                                            Reset/Purge Node
                                        </button>
                                        <button
                                            tw="text-error-500 font-bold py-2 px-4 mr-6"
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </Modal>
                            <Modal show={showFeedbackModal} onClose={() => setShowFeedbackModal(false)}>
                                <div>
                                    <div tw="flex justify-center p-3">
                                        <h1 tw="text-2xl font-bold mt-3">
                                            Your Domain Node Has Been Reset/Purged
                                        </h1>
                                    </div>
                                    <div tw="p-6">
                                        <p>
                                            To help us improve future experiences could you share with us any frustrations or
                                            suggestions you have with or for the PyGridUI Platform?
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
                                                tw="text-primary-500 font-bold py-2 px-4 mr-6 border rounded-lg border-primary-500"
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
                </div>
            </div>
        </>
    )
}

function Config(){
    const [DAARequired, setDAARequired] = useState(true);
    const { register, handleSubmit, errors, reset } = useForm();
    const [daa, setDaa] = useState(null);

    const onUploadDaa = (e) => {
        setDAAUploaded(true);
        let files = e.target.files;
        setDaa(files[0]);
    }

    return (
        <>
            <div tw="col-start-3 col-end-11 divide-y text-gray-800">
                <div id="daa-toggle" tw="">
                    <div tw="flex justify-between mt-10">
                        <p tw="text-xl text-left font-bold">Require Data Access Agreement</p>
                        <ToggleSwitch />
                    </div>
                    <div tw="text-gray-500 text-sm py-6 rounded-lg gap-2">
                        <p tw="text-sm mr-5">
                            If enabled this will require any user not manualy created by an admin to upload a signed legal document
                            of your choosing before being able to apply for an account on this domain node.
                        </p>
                    </div>
                </div>
                <div id="daa-file">
                    {DAARequired
                        ? [
                            <div tw="">
                                <p tw="text-xl text-left font-bold mt-10">Data Access Agreement</p>
                                <div tw="text-gray-500 text-sm py-6 rounded-lg gap-2">
                                    <p tw="text-sm mr-5">
                                        A Data Access Agreement (DAA) is a... Please upload the legal agreement you would like to require for your domain users.
                                    </p>
                                </div>
                                <div>
                                    <button
                                        tw="text-primary-500 font-bold py-2 px-4 mr-6 border rounded-lg border-primary-500"
                                        type="button"
                                        onClick={() => document.getElementById('daa_pdf').click()}
                                    >
                                        <FontAwesomeIcon icon={faPlus} size="sm" tw="mr-2" />
                                        Upload File
                                    </button>
                                    <input tw="hidden"
                                           id="daa_pdf"
                                           name="daa_pdf"
                                           type='file'
                                           {...register("daa_pdf", { onChange: onUploadDaa, required: true })}
                                    />
                                </div>
                                <div id="buttons" tw="text-center mt-10 inline-flex content-start whitespace-nowrap">
                                    <button tw="bg-primary-500 rounded text-white font-bold py-2 px-4 mr-6" type="submit">Save Changes</button>
                                </div>
                            </div>
                        ]
                        : ""
                    }
                </div>
            </div>
        </>
    )
}


function Updates(){
    const { register, handleSubmit, errors, reset } = useForm();

    function onUpdate(values){

    }

    return (
        <>
            <div id="domain-box" tw="col-start-3 col-end-11 text-gray-800">
                <div tw="divide-y">
                    <div id="version">
                        <h1 tw="font-bold text-left text-xl my-4 mt-10">Current Version</h1>
                        <div tw="divide-y divide-gray-200 divide-solid">
                            <ul id="domain-info" tw="text-left text-sm mt-4 mb-8">
                                <li tw="py-2">
                                    <a tw="font-bold text-gray-700">Last Updated: </a>
                                    <a tw="font-mono">{DomainBody[0].LastUpdated}</a>
                                </li>
                                <li tw="py-2">
                                    <a tw="font-bold text-gray-700">Version: </a>
                                    <a tw="font-mono">{DomainBody[0].Version}</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div id="update">
                        <h1 tw="font-bold text-left text-xl mt-8">Update Version</h1>
                        <form tw="col-span-8 my-5" onSubmit={onUpdate}>
                            <div tw="mt-2">
                                <p tw="text-sm text-gray-600">Please enter the [PLACEHOLDER] repository and branch in the fields below then press
                                    “Check for Update” to check for any library updates.</p>
                            </div>
                            <div id="" tw="inline-flex w-full mt-4">
                                <div tw="w-1/2">
                                    <label tw="font-bold text-sm" htmlFor="repo">Repository</label><p tw="pl-1 inline relative bottom-1 text-primary-500 font-bold">*</p><p tw="pl-1 inline relative text-primary-500 text-xs italic">(optional)</p>
                                </div>
                                <div tw="w-1/4">
                                    <label tw="font-bold text-sm" htmlFor="branch">Branch</label><p tw="pl-1 inline relative bottom-1 text-primary-500 font-bold">*</p><p tw="pl-1 inline relative text-primary-500 text-xs italic">(optional)</p>
                                </div>
                                <div tw="w-1/4">
                                    <label tw="font-bold text-sm" htmlFor="commit-hash">Commit Hash</label><p tw="pl-1 inline relative bottom-1 text-primary-500 font-bold">*</p><p tw="pl-1 inline relative text-primary-500 text-xs italic">(optional)</p>
                                </div>
                            </div>
                            <div tw="inline-flex w-full mt-2">
                                <div tw="w-1/2 mr-4">
                                    <input tw="p-2 border border-gray-300 rounded text-black w-full" id="repo" name="repo" type="text" placeholder="Repository" />
                                </div>
                                <div tw="w-1/4 mr-4">
                                    <input tw="p-2 border border-gray-300 rounded text-black w-full" id="branch" name="branch" type="text" placeholder="Branch" />
                                </div>
                                <div tw="w-1/4">
                                    <input tw="p-2 border border-gray-300 rounded text-black w-full" id="commit-hash" name="commit-hash" type="text" placeholder="Commit Hash" />
                                </div>
                            </div >
                            <div id="buttons" tw="text-center mt-10 inline-flex content-start whitespace-nowrap">
                                <button tw="bg-primary-500 rounded text-white font-bold py-2 px-2 mr-6" type="submit">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export function Tab(){

    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
        console.log(index);
        console.log(toggleState)
        setToggleState(index);
    };

    return (
        <div tw="flex flex-col relative w-auto bg-white break-all">
            <div tw="flex">
                <button
                    css={[tw`p-4 bg-white text-center w-1/2 bg-white border-b-2 border-primary-500 `,
                        (toggleState === 1) && tw`border-primary-500 border-b-0 border-t-2 border-r-2 border-l-2 rounded-t-md`]}
                    onClick={() => toggleTab(1)}
                >
                <h3 css={[tw`text-center font-bold text-gray-600`, (toggleState === 1) && tw`text-primary-500`]}>
                    Profile
                </h3>
                </button>
                <button
                    css={[tw`p-4 bg-white text-center w-1/2 bg-white border-b-2 border-primary-500 `,
                    (toggleState === 2) && tw`border-primary-500 border-b-0 border-t-2 border-r-2 border-l-2 rounded-t-md`]}
                    onClick={() => toggleTab(2)}
                >
                <h3 css={[tw`text-center font-bold text-gray-600`, (toggleState === 2) && tw`text-primary-500`]}>
                    Configurations
                </h3>
                </button>
                <button
                    css={[tw`p-4 bg-white text-center w-1/2 bg-white border-b-2 border-primary-500 `,
                    (toggleState === 3) && tw`border-primary-500 border-b-0 border-t-2 border-r-2 border-l-2 rounded-t-md`]}
                    onClick={() => toggleTab(3)}
                >
                <h3 css={[tw`text-center font-bold text-gray-600`, (toggleState === 3) && tw`text-primary-500`]}>
                    Updates
                </h3>
                </button>
            </div>

            <div tw="">
                <div
                    css={[tw`bg-white p-5 w-full h-full hidden`,
                    (toggleState === 1) && tw`bg-white block grid grid-cols-12`,]}
                >
                    <Profile/>
                </div>

                <div
                    css={[tw`bg-white p-5 w-full h-full hidden`,
                    (toggleState === 2) && tw`bg-white block grid grid-cols-12`,]}
                >
                    <Config/>
                </div>

                <div
                    css={[tw`bg-white p-5 w-full h-full hidden`,
                    (toggleState === 3) && tw`bg-white block grid grid-cols-12`,]}
                >
                    <Updates/>
                </div>

            </div>
        </div>
    )
}
