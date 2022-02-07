import { Layout } from '../components/Layout'
import tw, {styled} from 'twin.macro'
import {faExclamationCircle} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Alert from '../components/Alert';
import {useState, useEffect} from 'react'
import { Tab } from "@headlessui/react"
import { Fragment } from 'react'
import Pending from './requests/data-requests/pending'
import History from './requests/data-requests/history'
import Spinner from '../components/Spinner';

export default function DataRequests() {
    const [pendingRequestList, setPendingRequestsList] = useState([])
    const [historyRequestList, setHistoryRequestsList] = useState([])
    const [pendingRequestsLength, setPendingRequestsLength] = useState("")
    const [toggleTab, setToggleTab] = useState("")
    const [showAlert, setShowAlert ] =useState(true)
    const [loading, setLoading] = useState(true);


    const fetchPendingRequestList = async () => {
        try {
            setLoading(true);
            const apiRes = await fetch(
                '/api/pending_d_request_list',
                {
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                }
            );
            const data = await apiRes.json();
            setPendingRequestsLength(data.length);
            setPendingRequestsList(data)

            setLoading(false)
        }
        catch(error){
            console.log(error);
        }
    }

    const fetchHistoryRequestList = async () => {
        try {
            setLoading(true);
            const apiRes = await fetch(
                '/api/history_d_request_list',
                {
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                }
            );
            const data = await apiRes.json();
            setHistoryRequestsList(data)

            setLoading(false)
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        fetchPendingRequestList()
        fetchHistoryRequestList()
    }, [toggleTab])

    useEffect(() => {
        fetchPendingRequestList()
        fetchHistoryRequestList()
    }, [])

    return(
        <Layout current={"data requests"}>
            <div tw="col-start-2 col-end-12 mt-6 grid grid-cols-12">
                <div tw="col-span-full">
                    <div tw="flex items-center">
                        <div tw="flex mb-4">
                            <h1 tw="text-4xl font-bold font-rubik mr-4">∑</h1>
                            <h1 tw="text-5xl font-normal font-rubik">Data Requests</h1>
                        </div>
                    </div>
                    <div tw="my-10">
                        <Alert variant={'primary'} show={showAlert} onClose={()=>setShowAlert(false)}><FontAwesomeIcon icon={faExclamationCircle}/><p>Data requests are one-time requests made from Data Scientists on your node to download the results of their computations. Unlike setting privacy budgets data requests must be manually triaged and do not count as ongoing credits. They are individual allowances based off of specific computations on specified data objects.</p></Alert>
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
                                    selected && tw`border-primary-500 text-primary-500 border-b-0 border-t-2 border-r-2 border-l-2 rounded-t-md`]}>Pending ({pendingRequestsLength})</button>
                                )}
                            </Tab>
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                <button
                                    css={[tw`p-4 bg-white text-center font-bold text-gray-400 w-1/2 bg-white border-b-2 border-primary-500 `,
                                    selected && tw`border-primary-500 text-primary-500 border-b-0 border-t-2 border-r-2 border-l-2 rounded-t-md`]}>History</button>
                                )}
                            </Tab>
                        </Tab.List>
                        <Tab.Panels>
                            <Tab.Panel>
                            {loading ?
                                    <div tw="my-10 flex w-full justify-center">
                                        <Spinner />
                                    </div> : <Pending list={pendingRequestList}/>}</Tab.Panel>
                            <Tab.Panel> {loading ?
                                    <div tw="my-10 flex w-full justify-center">
                                        <Spinner />
                                    </div> : <History list={historyRequestList}/>}</Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                </div>
            </div>
        </Layout>
    )
}