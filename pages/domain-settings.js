import { Layout } from '../components/Layout'
import { Tab } from "@headlessui/react"
import tw, {styled} from 'twin.macro'
import {faExclamationCircle, faUsers} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Modal from '../components/Modal'
import React, {useState, useEffect, Fragment} from 'react';
import axios from 'axios';
import {getToken, decodeToken} from '../lib/auth'
import {useRouter} from 'next/router'
import Configurations from "./domain-settings/configurations"
import Profile from "./domain-settings/profile"
import Updates from "./domain-settings/updates"
import Alert from "../components/Alert";

export default function DomainSettings(props) {
    const router = useRouter();
    const [toggleTab, setToggleTab] = useState(1)
    const [url, setUrl] = useState("");

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertVariant, setAlertVariant] = useState('primary');

    useEffect(()=>{
        getDomain()
        const tab = new URL(location.href).searchParams.get('tab')
        setToggleTab(tab)
        console.log("Tab opened:", toggleTab)
    },[])

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
                setUrl(domain.domain_url)
            }
            else{
                alert("Couldn't fetch the domain profile!");
            }
        }
        catch (error){
            console.error(error);
        }
    }

    const copyUrl =  () => {
        navigator.clipboard.writeText(url)
        setAlertVariant('success');
        setAlertMessage('URL copied to the clipbard')
        setShowAlert(true);
    }

    return(
        <div tw="font-roboto">
            <Layout>
                <div tw="col-span-12">
                    <div tw="col-span-12 flex items-center">
                        <div tw="flex mb-4">
                            <h1 tw="text-4xl font-rubik">Domain Settings</h1>
                        </div>
                    </div>
                    <p tw="mb-4">Provide contextual information for the Canada Domain node and set structural configurations.</p>
                    <div tw="mb-12 inline-flex">
                        <input tw="p-2 border border-gray-300 rounded-l text-black w-96" id="url" name="url" type="url" readOnly value={url} placeholder="domain-specific-url.com"/>
                        <button tw="border border-gray-300 bg-gray-100 rounded-r text-gray-800 p-2 whitespace-nowrap active:bg-gray-200" type="button" onClick={copyUrl}>Copy URL</button>
                    </div>
                    <div tw="col-start-9 col-span-4">
                        <Alert show={showAlert} onClose={() => setShowAlert(false)} variant={alertVariant}>
                            <FontAwesomeIcon icon={faExclamationCircle} size="2x" tw=""/>
                            <p>{alertMessage}</p>
                        </Alert>
                    </div>
                    <Tab.Group
                        defaultIndex={toggleTab}
                        onChange={(index) => {
                        console.log('Changed selected tab to:', index);
                        setToggleTab(index)}
                        }
                    >
                        <Tab.List tw="flex">
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <button
                                        css={[tw`p-4 bg-white text-center font-bold text-gray-400 w-1/2 bg-white border-b-2 border-primary-500 `,
                                            (selected) && tw`border-primary-500 text-primary-500 border-b-0 border-t-2 border-r-2 border-l-2 rounded-t-md`]}
                                        onClick={()=>router.push({pathname:"domain-settings", query:{"tab":0}})}
                                    >Profile</button>
                                )}
                            </Tab>
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <button
                                        css={[tw`p-4 bg-white text-center font-bold text-gray-400 w-1/2 bg-white border-b-2 border-primary-500 `,
                                            (selected) && tw`border-primary-500 text-primary-500 border-b-0 border-t-2 border-r-2 border-l-2 rounded-t-md`]}
                                        onClick={()=>router.push({pathname:"domain-settings", query:{"tab":1}})}
                                    >Configurations</button>
                                )}
                            </Tab>
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <button
                                        css={[tw`p-4 bg-white text-center font-bold text-gray-400 w-1/2 bg-white border-b-2 border-primary-500 `,
                                            (selected) && tw`border-primary-500 text-primary-500 border-b-0 border-t-2 border-r-2 border-l-2 rounded-t-md`]}
                                        onClick={()=>router.push({pathname:"domain-settings", query:{"tab":2}})}
                                    >Updates</button>
                                )}
                            </Tab>
                        </Tab.List>
                        <Tab.Panels>
                            <Tab.Panel><Profile/></Tab.Panel>
                            <Tab.Panel><Configurations/></Tab.Panel>
                            <Tab.Panel><Updates/></Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                </div>
            </Layout>


        </div>
    )
}