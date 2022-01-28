import { Layout } from '../components/Layout'
import tw, {styled} from 'twin.macro'
import {faExclamationCircle, faUsers} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import Alert from '../components/Alert';
import {useState, useEffect} from 'react'
import { Tab } from "@headlessui/react"
import { Fragment } from 'react'
import Active from './users/active-users'
import Pending from './users/pending-users'
import Denied from './users/denied-users'

export default function Requests() {
    const [acceptedUsersLength, setAcceptedUsersLength] = useState("")
    const [deniedUsersLength, setDeniedUsersLength] = useState("")
    const [pendingUsersLength, setPendingUsersLength] = useState("")
    const [toggleTab, setToggleTab] = useState("")
    const [showAlert, setShowAlert ] =useState(true)

    const fetchUserlist = async (list_type) => {
        try{
            const apiRes = await fetch(
                `/api/${list_type}`,
                {
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                }
            );
            const data = await apiRes.json();
            // console.log("userlist from backend", (Object.keys(data).length))
            const list_size = Object.keys(data).length
            if(list_type === 'accepted_userlist'){
                setAcceptedUsersLength(list_size);
            }
            if(list_type === 'pending_userlist'){
                setPendingUsersLength(list_size);}
            if(list_type === 'denied_userlist') {
                setDeniedUsersLength(list_size)}
        }
        catch(error) {
            console.log("data fetching on user side failed", error);
        }
    }

    useEffect(() => {
        fetchUserlist('accepted_userlist')
        fetchUserlist('pending_userlist')
        fetchUserlist('denied_userlist')
        console.log("LIST LENGTHS", acceptedUsersLength, deniedUsersLength, pendingUsersLength)
    }, [toggleTab])
 


    return(
        <Layout>
            <div tw="col-start-2 col-end-12 mt-6 grid grid-cols-12">
                <div tw="col-span-full">
                    <div tw="flex items-center">
                        <div tw="flex mb-4">
                            <h1 tw="text-4xl font-bold font-rubik mr-4">∑</h1>
                            <h1 tw="text-5xl font-normal font-rubik">Data Requests</h1>
                        </div>
                    </div>
                    <div tw="my-10">
                        <Alert variant={'primary'} show={showAlert} onClose={()=>setShowAlert(false)}><FontAwesomeIcon icon={faExclamationCircle} size="sm"/><p>Data requests are one-time requests made from Data Scientists on your node to download the results of their computations. Unlike setting privacy budgets data requests must be manually triaged and do not count as ongoing credits. They are individual allowances based off of specific computations on specified data objects.</p></Alert>
                    </div>
                    <Tab.Group onChange={(index) => {
                        console.log('Changed selected tab to:', index);
                        setToggleTab(index)
                    }}>
                        <Tab.List tw="flex">
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                <button
                                    css={[tw`p-4 bg-white text-center font-bold text-gray-400 w-1/2 bg-white border-b-2 border-primary-500 `,
                                    selected && tw`border-primary-500 text-primary-500 border-b-0 border-t-2 border-r-2 border-l-2 rounded-t-md`]}>Pending Users ({pendingUsersLength})</button>
                                )}
                            </Tab>
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                <button
                                    css={[tw`p-4 bg-white text-center font-bold text-gray-400 w-1/2 bg-white border-b-2 border-primary-500 `,
                                    selected && tw`border-primary-500 text-primary-500 border-b-0 border-t-2 border-r-2 border-l-2 rounded-t-md`]}>Denied Users ({deniedUsersLength})</button>
                                )}
                            </Tab>
                        </Tab.List>
                        <Tab.Panels>
                        <Tab.Panel><Pending/></Tab.Panel>
                        <Tab.Panel><Denied/></Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                </div>
            </div>
        </Layout>
    )
}