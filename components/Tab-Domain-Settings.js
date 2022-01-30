import React, {useEffect, useState} from 'react';
import tw, {styled} from 'twin.macro';
import { Table } from './Table';
import { Table2 } from './Table2';
import Modal from '../components/Modal';
import {
    faPlus,
    faInfoCircle,
    faCheck,
    faTimes,
    faExclamationTriangle,
    faDownload
} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import ListBox from './ListBox';
import Tag from "./Tag";
import {useForm} from "react-hook-form";
import ToggleSwitch from "./ToggleSwitch";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons/faCheckCircle";
import * as fileSaver from "file-saver";
import axios from "axios";

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
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [datasets, setDatasets] = useState(0);
    const [deployed, setDeployed] = useState("");
    const [owner, setOwner] = useState("");
    const [description, setDescription] = useState("");
    const [email, setEmail] = useState("");
    const [newTag, setNewTag] = useState("");
    const [tags, setTags] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const { register, handleSubmit, errors, reset } = useForm();

    useEffect(() => {
        getDomain();
    }, []);

    async function getDomain() {
        try{
            const apiRes = await axios({
                method: "GET",
                url: "api/domain-profile",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                }
            });
            if(apiRes.status == 200){
                const domain = await apiRes.data;
                setName(domain.name);
                setId(domain.id);
                setDatasets(domain.datasets);
                setDeployed(domain.deployed);
                setOwner(domain.owner);
                setDescription(domain.description);
                setEmail(domain.email);
                setTags(domain.tags);
            }
            else{
                alert("Couldn't fetch the domain profile!");
            }
        }
        catch (error){
            console.error(error);
        }
    }

    const onAddTag = () => {
        if (newTag!=""){
            setTags((tags) => ([...tags, newTag]));
        }
    }

    const tagItems = tags.map((tag) =>
        <Tag>{tag} <button
            onClick={() => setTags(tags.filter(item => item !== tag))}
            type="button"><FontAwesomeIcon icon={faTimes} size="sm" tw=""/></button></Tag>
    );

    async function onSubmitProfile(){
        const body =JSON.stringify({
            description,
            email,
            tags
        })
        try{
            const apiRes = await fetch(
                "api/domain-profile",
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
                const data = await apiRes.json();
                console.log(data);
            }
            else{
                alert("Couldn't update the domain profile!");
            }
        }
        catch (error){
            console.log(error);
        }
    }

    async function onPurgeNode() {
        setShowModal(false);
        setShowFeedbackModal(true);
        /*
        try{
            const apiRes = await fetch(
                "api/domain-profile",
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
                alert("Couldn't delete the domain profile!");
            }
        }
        catch (error){
            console.log(error);
        }
         */
    }

    async function onSubmitFeedbackForm(values) {
        try {
            const frustrations =  values.frustrations;
            const suggestions =  values.suggestions;
            const body =JSON.stringify({
                frustrations,
                suggestions
            })
            const apiRes = await fetch("api/utils/feedback",
                {
                    method: "POST",
                    headers:{
                        'Accept': "application/json",
                        'Content-Type': "application/json"
                    },
                    body: body
                });
            if(apiRes.status == 200){
                setShowFeedbackModal(false);
                router.push('/signup');
            }
            else{
                alert(apiRes.status + " Something went wrong! Please try again!")
            }
        }catch (err) {
            console.error(err)
        }
    }

    const onClickSkipFeedback = () => {
        setShowFeedbackModal(false);
        router.push('/signup');
    }

    return (
        <>
            <div id="domain-box" tw="col-start-3 col-end-11 text-gray-800">
                <div tw="divide-y">
                    <div id="general">
                        <h1 tw="font-bold text-left text-xl font-rubik my-4 mt-10">General</h1>
                        <div tw="divide-y divide-gray-200 divide-solid">
                            <ul id="domain-info" tw="text-left text-sm mt-4 mb-8">
                                <li tw="py-2" key="name">
                                    <a tw="font-bold text-gray-700">Domain Name: </a>
                                    <a tw="font-mono">{name}</a>
                                </li>
                                <li tw="py-2" key="id">
                                    <a tw="font-bold text-gray-700">ID#: </a>
                                    <a>{id}</a>
                                </li>
                                <li tw="py-2" key="datasets">
                                    <a tw="font-bold text-gray-700">Hosted Datasets: </a>
                                    <a tw="font-mono">{datasets}</a>
                                </li>
                                <li tw="py-2" key="deployedOn">
                                    <a tw="font-bold text-gray-700">Deployed On: </a>
                                    <a tw="font-mono">{deployed}</a>
                                </li>
                                <li tw="py-2" key="owner">
                                    <a tw="font-bold text-gray-700">Owner: </a>
                                    <a tw="font-mono">{owner}</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div id="profile-options">
                        <form tw="col-span-8 my-5" onSubmit={onSubmitProfile}>
                            <div tw="mt-8">
                                <label tw="text-xl font-bold font-rubik mt-8" htmlFor="description">Domain Description</label><p tw="pl-2 inline relative text-primary-500 italic">Optional</p>
                            </div>
                            <div tw="mt-2">
                                <input tw="p-2 border border-gray-300 rounded text-black w-full" id="description" name="description" type="text" placeholder="Describe your domain to potential users here..."
                                       value={description} onChange={e => setDescription(e.target.value)}/>
                            </div>
                            <div tw="mt-8">
                                <label tw="text-xl font-bold font-rubik mt-8" htmlFor="email">Support Email</label><p tw="pl-2 inline relative text-primary-500 italic">Optional</p>
                            </div>
                            <div tw="mt-2">
                                <p tw="text-sm text-gray-600">An email available for users to use when they have specific questions about your domain node</p>
                            </div>
                            <div tw="mt-2">
                                <input tw="p-2 border border-gray-300 rounded text-black w-full" id="email" name="email" type="email" placeholder="support@company.org"
                                       value={email} onChange={e => setEmail(e.target.value)}/>
                            </div>
                            <div tw="mt-8">
                                <label tw="text-xl font-bold font-rubik mt-8" htmlFor="tags">Tags</label><p tw="pl-2 inline relative text-primary-500 italic">Optional</p>
                            </div>
                            <div tw="mt-2 inline-flex w-full">
                                <input tw="p-2 border border-gray-300 rounded-l text-black w-full" id="tags" name="tags" type="text" placeholder="Create new tag here..."
                                       value={newTag} onChange={e => setNewTag(e.target.value)}/>
                                <button tw="border border-gray-300 bg-gray-100 rounded-r text-gray-800 p-2 whitespace-nowrap" type="button"
                                        onClick={onAddTag}>Add</button>
                            </div>
                            <div id="tags" tw="my-2">
                                {tagItems}
                            </div>
                            <div id="buttons" tw="text-center my-8 inline-flex content-start whitespace-nowrap">
                                <button tw="bg-primary-500 rounded text-white font-bold py-2 px-4 mr-6" type="button" onClick={onSubmitProfile}>Save Changes</button>
                            </div>
                        </form>
                    </div>


                    <div id="purge-node" tw="">
                        <p tw="text-xl text-left font-bold font-rubik mt-10">Reset/Purge Domain Node</p>
                        <div tw="text-gray-500 py-6 rounded-lg gap-2">
                            <p tw="text-sm mr-5">
                                Description here of what this option means. Also might want to provide a link out that explains how to delete a node via command line.
                            </p>
                            <button tw="bg-error-500 rounded text-white font-bold py-2 px-4 mr-6 mt-10" type="submit"
                                    onClick={() => setShowModal(true)}
                            >Reset/Purge Node</button>

                            <Modal show={showModal} onClose={() => setShowModal(false)}>
                                <div tw="text-center ">
                                    <div tw="flex flex-col p-3 mt-3">
                                        <FontAwesomeIcon icon={faExclamationTriangle} size="2x" tw="text-warning-500 self-center m-6"/>
                                        <h1 tw="text-3xl font-bold font-rubik text-gray-800">
                                            Are you Sure You Want to Reset/Purge this Domain Node?
                                        </h1>
                                    </div>
                                    <div tw="p-6 font-roboto text-gray-600">
                                        <p>
                                            Description here of what this option means. Also might want to provide a link out
                                            that explains how to delete a node via command line.
                                        </p>
                                    </div>
                                    <div tw="flex justify-center p-6 font-bold font-roboto">
                                        <button
                                            tw="bg-error-500 rounded text-white font-bold py-2 px-4 mr-6"
                                            type="button"
                                            onClick={onPurgeNode}
                                        >
                                            Reset/Purge Node
                                        </button>
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
                                            Your Domain Node Has Been Reset/Purged
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
                </div>
            </div>
        </>
    )
}

function Config(){
    const [DAARequired, setDAARequired] = useState(false);
    const [DAAUploaded, setDAAUploaded] = useState(false);
    const [DAASent, setDAASent] = useState(false);
    const { register, handleSubmit, errors, reset } = useForm();
    const [daa, setDaa] = useState(null);

    useEffect( () => {

        }
    ,[DAARequired])


    const onUploadDaa = (e) => {
        setDAAUploaded(true);
        setDAASent(false);
        let files = e.target.files;
        setDaa(files[0]);
    }

    const onXClick = () => {
        setDAAUploaded(false);
        setDaa(null);
    }

    const onDAAClick = () => {
        fileSaver.saveAs(daa);
    };

    const sendDaa = () => {
        setDAASent(true);
    }

    return (
        <>
            <div tw="col-start-3 col-end-11 divide-y text-gray-800">
                <div id="daa-toggle" tw="">
                    <div tw="flex justify-between mt-10">
                        <p tw="text-xl text-left font-bold font-rubik">Require Data Access Agreement</p>
                        <ToggleSwitch onToggle={() => setDAARequired(!DAARequired)}/>
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
                                <p tw="text-xl text-left font-bold font-rubik mt-10">Data Access Agreement<div tw="pl-2 inline relative bottom-1 text-primary-500 font-bold">*</div></p>
                                <div tw="text-gray-500 text-sm py-6 rounded-lg gap-2">
                                    <p tw="text-sm mr-5">
                                        A Data Access Agreement (DAA) is a... Please upload the legal agreement you would like to require for your domain users.
                                    </p>
                                </div>
                                {DAAUploaded
                                    ?
                                    [DAASent
                                        ?
                                        <div>
                                            <div tw="w-2/3 flex justify-between bg-gray-100 text-black my-4 py-1">
                                                <button tw="mx-2 underline font-bold " type="button" onClick={onDAAClick}>
                                                    {daa.name}
                                                </button>
                                            </div>
                                            <div tw="my-10 flex items-center space-x-3 p-3 bg-primary-100">
                                                <FontAwesomeIcon icon={faInfoCircle} tw="" />
                                                <p tw="text-gray-800 cursor-pointer break-normal">
                                                    If you need to change your data access agreement, please contact OpenMined at support@openmined.org and we will
                                                    help walk you through the process.
                                                </p>
                                            </div>
                                        </div>
                                        :
                                        <div>
                                            <div tw="w-2/3 flex justify-between bg-gray-100 text-black my-4 py-1">
                                                <button tw="mx-2 underline font-bold " type="button" onClick={onDAAClick}>
                                                    {daa.name}
                                                </button>
                                                <button tw="font-bold mx-2" type="button" onClick={onXClick}>
                                                    <FontAwesomeIcon icon={faTimes} size="sm" tw=""/>
                                                </button>
                                            </div>
                                            <div>
                                                <button
                                                    tw="text-primary-500 font-bold py-2 px-4 mr-6 border rounded-lg border-primary-500"
                                                    type="button"
                                                    onClick={() => document.getElementById('daa_pdf').click()}
                                                >
                                                    <FontAwesomeIcon icon={faPlus} size="sm" tw="mr-2" />
                                                    Replace File
                                                </button>
                                                <input tw="hidden"
                                                       id="daa_pdf"
                                                       name="daa_pdf"
                                                       type='file'
                                                       {...register("daa_pdf", { onChange: onUploadDaa, required: true })}
                                                />
                                            </div>
                                            <div id="buttons" tw="text-center mt-10 inline-flex content-start whitespace-nowrap">
                                                <button tw="bg-primary-500 rounded text-white font-bold py-2 px-4 mr-6" type="button" onClick={sendDaa}>Save Changes</button>
                                            </div>
                                        </div>
                                    ]
                                    :
                                    <div>
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
                                            <button tw="bg-primary-500 rounded text-white font-bold py-2 px-4 mr-6" type="button" onClick={sendDaa}>Save Changes</button>
                                        </div>
                                    </div>
                                }
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
    const [lastUpdated, setLastUpdated] = useState("");
    const [version, setVersion] = useState("");
    const [repo, setRepo] = useState("");
    const [branch, setBranch] = useState("");
    const [hash, setHash] = useState("");
    const { register, handleSubmit, errors, reset } = useForm();

    useEffect(() => {
        getVersion();
    }, []);

    async function getVersion() {
        try{
            const apiRes = await axios({
                method: "GET",
                url: "api/domain-version",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                }
            });

            if(apiRes.status == 200){
                const domain = await apiRes.data;
                setLastUpdated(domain.lastUpdated);
                setVersion(domain.version);
                setHash(domain.hash);
                setRepo(domain.repo);
                setBranch(domain.branch);
            }
            else{
                alert("Couldn't fetch the domain version!");
            }
        }
        catch (error){
            console.error(error);
        }
    }

    async function onUpdate(){
        const body =JSON.stringify({
            repo,
            branch,
            hash
        })
        try{
            const apiRes = await fetch(
                "api/domain-version",
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
                const domain = await apiRes.json();
                console.log(domain);
            }
            else{
                alert("Couldn't update the domain version!");
            }
        }
        catch (error){
            console.log(error);
        }
    }


    return (
        <>
            <div id="domain-box" tw="col-start-3 col-end-11 text-gray-800">
                <div tw="divide-y">
                    <div id="version">
                        <h1 tw="font-bold text-left text-xl my-4 mt-10 font-rubik">Current Version</h1>
                        <div tw="divide-y divide-gray-200 divide-solid">
                            <ul id="domain-info" tw="text-left text-sm mt-4 mb-8">
                                <li tw="py-2" key="lastUpdated">
                                    <a tw="font-bold text-gray-700">Last Updated: </a>
                                    <a tw="font-mono">{lastUpdated}</a>
                                </li>
                                <li tw="py-2" key="version">
                                    <a tw="font-bold text-gray-700">Version: </a>
                                    <a tw="font-mono">{version}</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div id="update">
                        <h1 tw="font-bold text-left text-xl mt-8 font-rubik">Update Version</h1>
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
                                    <input tw="p-2 border border-gray-300 rounded text-black w-full" id="repo" name="repo" type="text" placeholder="Repository"
                                           value={repo} onChange={e => setRepo(e.target.value)}/>
                                </div>
                                <div tw="w-1/4 mr-4">
                                    <input tw="p-2 border border-gray-300 rounded text-black w-full" id="branch" name="branch" type="text" placeholder="Branch"
                                           value={branch} onChange={e => setBranch(e.target.value)}/>
                                </div>
                                <div tw="w-1/4">
                                    <input tw="p-2 border border-gray-300 rounded text-black w-full" id="commit-hash" name="commit-hash" type="text" placeholder="Commit Hash"
                                           value={hash} onChange={e => setHash(e.target.value)}/>
                                </div>
                            </div >
                            <div id="buttons" tw="text-center mt-10 inline-flex content-start whitespace-nowrap">
                                <button tw="bg-primary-500 rounded text-white font-bold py-2 px-2 mr-6" type="button" onClick={onUpdate}>Update</button>
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
