import { Layout } from '../components/Layout'
import tw, {styled} from 'twin.macro'
import {faExclamationCircle} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Alert from '../components/Alert';
import {useState, useEffect} from 'react'
import { Tab } from "@headlessui/react"
import { Fragment } from 'react'
import Pending from './requests/upgrade-requests/pending'
import History from './requests/upgrade-requests/history'
import Spinner from '../components/Spinner';

export default function UpgradeRequests() {
    const [pendingRequestList, setPendingRequestsList] = useState([])
    const [historyRequestList, setHistoryRequestsList] = useState([])
    const [pendingRequestsLength, setPendingRequestsLength] = useState(0)
    const [toggleTab, setToggleTab] = useState("")
    const [showAlert, setShowAlert ] =useState(true)
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);

    const fetchPendingRequestList = async () => {
        try {
            setLoading(true);
            const apiRes = await fetch(
                '/api/pending_u_request_list',
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
                '/api/history_u_request_list',
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
    }, [refresh])

    useEffect(() => {
        fetchPendingRequestList()
        fetchHistoryRequestList()
    }, [])

    return(
        <Layout current={"upgrade requests"}>
            <div tw="col-start-2 col-end-12 mt-6 grid grid-cols-12">
                <div tw="col-span-full">
                    <div tw="flex items-center">
                        <div tw="flex mb-4">
                            <h1 tw="text-4xl font-bold font-rubik mr-4">∑</h1>
                            <h1 tw="text-5xl font-normal font-rubik">Upgrade Requests</h1>
                        </div>
                    </div>
                    <div tw="my-10">
                        <Alert variant={'primary'} show={showAlert} onClose={()=>setShowAlert(false)}><FontAwesomeIcon icon={faExclamationCircle}/><p>Upgrade requests are requests made by Data Scientists on your node to get a larger amount of privacy budget allocated to them. You can think of privacy budget as credits you give to a user to perform computations from. These credits of Epsilon(ɛ) indicate the amount of visibility a user has into any one entity of your data.</p></Alert>
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
                                    </div> : <Pending list={pendingRequestList} refresh={()=>setRefresh(!refresh)}/>
                                }
                                </Tab.Panel>
                            <Tab.Panel>
                                {loading ?
                                        <div tw="my-10 flex w-full justify-center">
                                            <Spinner />
                                        </div> : <History list={historyRequestList} refresh={()=>setRefresh(!refresh)}/>
                                }</Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                </div>
            </div>
        </Layout>
    )
}