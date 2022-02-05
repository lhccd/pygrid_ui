import Modal from './Modal';
import Alert from './Alert';
import Button from './Button';
import {
    faCalendar,
    faEnvelope,
    faPlus,
    faUser,
    faUserPlus,
    faTimes,
    faInfoCircle,
    faCheckCircle,
    faFileContract,
    faTimesCircle,
    faExclamationCircle,
    faArrowRight,
    faArrowLeft,
    faExpandAlt,
    faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Tab } from "@headlessui/react"
import { Fragment, useState, useEffect } from 'react'
import tw, { styled, css } from 'twin.macro'

async function acceptUserByID(email) {
    console.log("acceptUserByID Called", { email })
    try {
        const body = JSON.stringify(email)
        console.log("requesting put", body)
        const apiRes = await fetch('/api/accept_user_by_id',
            {
                method: "PUT",
                headers: {
                    'Accept': "application/json",
                    'Content-Type': "application/json"
                },
                body: body
            });
        const data = await apiRes.json()
        console.log("ACCEPT USER BY ID outside returns", data)
    }
    catch (error) {
        console.log("error in updateUserByID", error)
    }
}

async function adjustBudget(email, budget) {
    console.log("adjustBudget Called", { email })
    try {
        const body = JSON.stringify({ "email": email, "budget": budget })
        console.log("requesting put", body)
        const apiRes = await fetch('/api/adjust_budget_by_id',
            {
                method: "PUT",
                headers: {
                    'Accept': "application/json",
                    'Content-Type': "application/json"
                },
                body: body
            });
        const data = await apiRes.json()
        console.log("ADJUST BUDGET BY ID outside returns", data)
    }
    catch (error) {
        console.log("error in updateUserByID", error)
    }
}

export default function ConfirmationFlowModal({ show, onClose, data }) {
    const [budget, setBudget] = useState(0)
    const [allocatedBudget, setAllocatedBudget] = useState(0)
    const [toggleState, setToggleState] = useState(1)
    const [showAlert, setShowAlert] = useState(false);
    const [alertVariant, setAlertVariant] = useState('primary')
    const [alertMessage, setAlertMessage] = useState('')
    const [email, setEmail] = useState('')
    console.log("CONFIRMATION FLOW MODAL", data)
    const toggleTab = (index) => {
        console.log(index);
        console.log(toggleState)
        setToggleState(index);
    };
    useEffect(() => {
        setEmail(data.email);
        setBudget(data.budget);
        setAllocatedBudget(data.allocated_budget);
    }, [data])

    useEffect(() => {
        setToggleState(1)
    }, [show])

    function incrementBudget() {
        setAllocatedBudget(prevCount => prevCount + 1)
    }
    function decrementBudget() {
        if (allocatedBudget > 0){
            setAllocatedBudget(prevCount => prevCount - 1)
        }else{
            setAlertVariant('error');
            setAlertMessage('Budget cannot be negative!')
            setShowAlert(true);
            setAllocatedBudget(0);
        }
    }

    const onUpgrade = async () => {
        setAllocatedBudget(allocatedBudget);
        await acceptUserByID(email);
        setAlertVariant('success');
        setAlertMessage('Allocated budget successfully adjusted!')
        setShowAlert(true);
        await adjustBudget(email, allocatedBudget);
        onClose();
        console.log("onUpgrade", email, allocatedBudget, budget)
    }

    return (
        <Modal show={show} onClose={onClose}>
            <div tw="absolute right-0 w-1/2 z-50">
                <Alert show={showAlert} onClose={() => setShowAlert(false)} variant={alertVariant} autoDelete={true} autoDeleteTime={3000}>
                    <FontAwesomeIcon icon={faExclamationCircle} size="2x" tw=""/>
                    <p>{alertMessage}</p>
                </Alert>
            </div>
            <div tw="col-start-2 col-span-10">
                <div tw="">
                    <div 
                        css={[tw`bg-white p-5 w-full h-full hidden`,
                        (toggleState === 1) && tw`bg-white block`,]}
                    >   
                        <div tw="space-y-2">
                            <div tw="col-span-full flex-col items-center space-y-2">
                                <FontAwesomeIcon size="2x" icon={faFileContract} title="Accept" tw="" />
                                <h2 tw="font-bold text-3xl text-gray-800">Data Access Agreement (DAA)</h2>
                            </div>
                            <div tw="flex space-x-1 py-5">
                                <div tw="bg-primary-500 w-1/3 h-1 rounded"></div>
                                <div tw="bg-gray-200 w-1/3 h-1 rounded"></div>
                                <div tw="bg-gray-200 w-1/3 h-1 rounded"></div>
                            </div>
                            <div>
                                <p tw="text-gray-600 mb-6">Before you accept this application your domain requires a Data Access Agreement to be signed and uploaded by the user. Has the document been...</p>
                            </div>
                            <div tw="flex space-x-4 items-center">
                                <FontAwesomeIcon size="lg" icon={faCheckCircle} title="Accept" tw="text-success-500" />
                                <div tw="block">
                                    <p tw="text-gray-600">Signed by the appropriate parties</p>
                                </div>
                            </div>
                            <div tw="flex space-x-4 items-center">
                                <FontAwesomeIcon size="lg" icon={faCheckCircle} title="Accept" tw="text-success-500" />
                                <div tw="block">
                                    <p tw="text-gray-600">Dated within appropriate date range</p>
                                </div>
                            </div>
                            <div tw="col-span-full flex justify-between py-5">
                                <Button variant={'primary'} isHollow onClick={onClose} tw="border-2"><FontAwesomeIcon icon={faTimes} tw="text-primary-500 mr-4"/>Cancel</Button>
                                <Button variant={'primary'} onClick={() => toggleTab(2)} tw="border-primary-500 border-2">Next<FontAwesomeIcon icon={faArrowRight} tw="text-white ml-4"/></Button>
                            </div>
                        </div>
                    </div>

                    <div
                        css={[tw`bg-white p-5 w-full h-full hidden`,
                        (toggleState === 2) && tw`bg-white block`,]}
                    >
                        <div tw="space-y-2">
                            <div tw="col-span-full flex-col items-center">
                                <h2 tw="font-bold text-4xl my-6 text-gray-800">∑</h2>
                                <h2 tw="font-bold text-4xl my-6 text-gray-800">Upgrade Budget</h2>
                            </div>
                            <div tw="flex space-x-1 py-5">
                                <div tw="bg-primary-500 w-1/3 h-1 rounded"></div>
                                <div tw="bg-primary-500 w-1/3 h-1 rounded"></div>
                                <div tw="bg-gray-200 w-1/3 h-1 rounded"></div>
                            </div>
                            <div>
                                <p tw="text-gray-600">Allocating Privacy Budget (PB) is an optional setting that allows you to maintain a set standard of privacy while offloading the work of manually approving every data request for a single user. You can think of privacy budget as credits you give to a user to perform computations from. These credits of  Epsilon(ɛ) indicate the amount of visibility a user has into any one entity of your data. The more budget the more visibility. By default all users start with 0ɛ and must have their data requests approved manually until upgraded.

                                    You can learn more about privacy budgets and how to allocate them at Course.OpenMined.org</p>
                            </div>
                            <h3 tw="col-span-full font-bold mt-3 text-gray-600 pt-5">Adjust Privacy Budget</h3>
                            <div tw="grid grid-cols-4 grid-rows-2 pt-1 pb-3 text-sm text-gray-600">
                                    <p tw="col-start-1 row-start-1 px-4 py-2 text-error-400 font-bold inline-block leading-10 text-center align-middle border-r-2">{budget} ɛ</p>
                                    <p tw="col-start-1 row-start-2 px-4 py-2 inline-block leading-6 text-center align-middle border-r-2">Current Balance</p>
                                    <div tw="col-start-2 row-start-1 flex justify-center px-4 py-2">
                                        <button tw='px-2 py-1 font-bold text-lg rounded-l-lg border-2 border-gray-200 bg-gray-50' onClick={decrementBudget}>-</button>
                                        <p tw="px-3 py-1 border-t-2 border-b-2 border-gray-200 text-lg">{allocatedBudget}</p>
                                        <button tw='px-2 py-1 font-bold text-lg rounded-r-lg border-2 border-gray-200 bg-gray-50' onClick={incrementBudget}>+</button>
                                    </div>
                                    <p tw="col-start-2 row-start-2 px-4 py-2 inline-block leading-6 text-center align-middle">Allocated Budget</p>
                            </div>
                            
                            <div tw="col-span-full flex justify-between py-5">
                                <Button variant={'primary'} isHollow onClick={() => toggleTab(1)} tw="border-2"><FontAwesomeIcon icon={faArrowLeft} tw="text-primary-500 mr-4"/>Cancel</Button>
                                <div>
                                    <Button variant={'primary'} isHollow type="button" tw="border-none" onClick={()=>{setAllocatedBudget(0); onUpgrade(); toggleTab(3)}}>Skip</Button>
                                    <Button variant={'primary'} onClick={()=>{setAllocatedBudget(allocatedBudget); onUpgrade(); toggleTab(3)}} tw="border-primary-500 border-2">Upgrade</Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        css={[tw`bg-white p-5 w-full h-full hidden`,
                        (toggleState === 3) && tw`bg-white block`,]}
                    >
                         <div tw="space-y-2">
                            <div tw="col-span-full flex-col items-center">
                                <FontAwesomeIcon size="2x" icon={faUserPlus} tw="" />
                                <h2 tw="font-bold text-4xl my-6 text-gray-800">Users Successfully Added</h2>
                            </div>
                            <div tw="flex space-x-1 py-5">
                                <div tw="bg-primary-500 w-1/3 h-1 rounded"></div>
                                <div tw="bg-primary-500 w-1/3 h-1 rounded"></div>
                                <div tw="bg-primary-500 w-1/3 h-1 rounded"></div>
                            </div>
                            <div>
                                <p tw="text-gray-600 mb-4">Congratulations! You have just added new user(s) to your domain.</p>
                                <p tw="text-gray-600 mt-4">
                                    Pro Tip(s): If you would like to speed up this workflow in the future you can download Data Access Agreements directly from the table view.
                                    You can also select multiple users in the users table and then batch Accept or Deny their requests.
                                </p>
                            </div>       
                            <div tw="col-span-full flex justify-end py-5">
                                <Button variant={'primary'} isHollow onClick={onClose} tw="border-none">Close</Button>
                            </div>  
                        </div>
                    </div>

                </div>
                {/* <ConfirmationFlowModal1/>
                <ConfirmationFlowModal2/>
                <ConfirmationFlowModal3/> */}
            </div>
        </Modal>
    )
}