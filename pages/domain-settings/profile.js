import React, {useEffect, useState} from 'react';
import tw, {styled} from 'twin.macro';
import Modal from '/components/Modal';
import {
    faPlus,
    faInfoCircle,
    faCheck,
    faTimes,
    faExclamationTriangle,
    faExclamationCircle,
    faDownload
} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Tag from "/components/Tag";
import Alert from "/components/Alert";
import {useForm} from "react-hook-form";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons/faCheckCircle";
import axios from "axios";
import moment from "moment";
import {useRouter} from "next/router";

export default function Profile(){
    const router = useRouter();
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

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertVariant, setAlertVariant] = useState('primary');
    
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
            onClick={
                () => {
                    setTags(tags.filter(item => item !== tag))
                }
            }
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
                setAlertVariant('success');
                setAlertMessage('Domain Profile successfully updated')
                setShowAlert(true);
                console.log(data);
            }
            else{
                setAlertVariant('error');
                setAlertMessage("Couldn't update the domain profile!")
                setShowAlert(true);
                // alert("Couldn't update the domain profile!");
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
                setAlertVariant('success');
                setAlertMessage('Feedback successfully submitted')
                setShowAlert(true);
                router.push('/signup');
            }
            else{
                setAlertVariant('error');
                setAlertMessage('Something went wrong! Please try again!')
                setShowAlert(true);
                // alert(apiRes.status + " Something went wrong! Please try again!")
            }
        }catch (err) {
            console.error(err)
        }
    }

    const onClickSkipFeedback = () => {
        setAlertVariant('warning');
        setAlertMessage('Feedback was skipped')
        setShowAlert(true);
        setShowFeedbackModal(false);
        router.push('/signup');
    }

    return (
        <>
            <div tw="absolute right-0 w-1/2 z-50">
                <Alert show={showAlert} onClose={() => setShowAlert(false)} variant={alertVariant} autoDelete={true} autoDeleteTime={3000}>
                    <FontAwesomeIcon icon={faExclamationCircle} size="2x" tw=""/>
                    <p>{alertMessage}</p>
                </Alert>
            </div>
            <div id="domain-box" tw="col-start-3 col-end-11 text-gray-800">
                <div tw="divide-y">
                    <div id="general">
                        <h1 tw="font-bold text-left text-xl font-rubik my-4 mt-10">General</h1>
                        <div tw="divide-y divide-gray-200 divide-solid">
                            <ul id="domain-info" tw="text-left text-sm mt-4 mb-8">
                                <li tw="py-2" key={name.key}>
                                    <a tw="font-bold text-gray-700">Domain Name: </a>
                                    <a tw="font-mono">{name}</a>
                                </li>
                                <li tw="py-2" key={id.key}>
                                    <a tw="font-bold text-gray-700">ID#: </a>
                                    <a>{id}</a>
                                </li>
                                <li tw="py-2" key={datasets.key}>
                                    <a tw="font-bold text-gray-700">Hosted Datasets: </a>
                                    <a tw="font-mono">{datasets}</a>
                                </li>
                                <li tw="py-2" key={deployed.key}>
                                    <a tw="font-bold text-gray-700">Deployed On: </a>
                                    <a tw="font-mono">{moment(deployed).format('YYYY-MMM-DD HH:MM')}</a>
                                </li>
                                <li tw="py-2" key={owner.key}>
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
                        <p tw="text-xl text-left font-bold font-rubik mt-10">Delete Domain Node</p>
                        <div tw="text-gray-500 py-6 rounded-lg gap-2">
                            <p tw="text-sm mr-5">
                                Description here of what this option means. Also might want to provide a link out that explains how to delete a node via command line.
                            </p>
                            <button tw="bg-error-500 rounded text-white font-bold py-2 px-4 mr-6 mt-10" type="submit"
                                    onClick={() => setShowModal(true)}
                            >Delete Node</button>

                            <Modal show={showModal} onClose={() => setShowModal(false)}>
                                <div tw="text-center col-span-full">
                                    <div tw="flex flex-col p-3 mt-3">
                                        <FontAwesomeIcon icon={faExclamationTriangle} size="2x" tw="text-warning-500 self-center m-6"/>
                                        <h1 tw="text-3xl font-bold font-rubik text-gray-800">
                                            Are you Sure You Want to Delete this Domain Node?
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
                                            Delete Node
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
                                <div tw="col-span-full text-center">
                                    <div tw="flex flex-col p-3 mt-3">
                                        <FontAwesomeIcon icon={faCheckCircle} size="2x" tw="text-success-500 self-center m-6"/>
                                        <h1 tw="text-3xl font-bold font-rubik text-gray-800">
                                            Your Domain Node Has Been Deleted
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