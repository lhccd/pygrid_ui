import Modal from './Modal';
import Alert from './Alert';
import Button from './Button';
import {
    faCalendar,
    faEnvelope,
    faPlus,
    faUser,
    faUserPlus,
    faInfoCircle,
    faCheckCircle,
    faFileContract,
    faTimesCircle,
    faExclamationCircle,
    faExpandAlt,
    faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Tab } from "@headlessui/react"
import { Fragment, useState, useEffect } from 'react'
import tw, { styled, css } from 'twin.macro'

export default function ConfirmationFlowModal({ show, onClose, email, data, handleBudgetInUserModal }) {
    const [balance, setBalance] = useState(0)
    const [budget, setBudget] = useState(0)
    const [toggleTab, setToggleTab] = useState("")

    useEffect(() => {
        setBalance(data);
        setBudget(data);
    }, [data])

    useEffect(() => {

    }, [balance])

    function incrementBudget() {
        setBudget(prevCount => prevCount + 1)
    }
    function decrementBudget() {
        setBudget(prevCount => prevCount - 1)
    }

    const onUpgrade = () => {
        console.log("budget", budget)
        setBalance(budget);
        console.log("balance", balance)
        adjustBudget(email, budget)
        handleBudgetInUserModal(budget);
        onClose();
        console.log("onUpgrade", email, balance, budget)
    }

    return (
        <Modal show={show} onClose={onClose}>
            <div tw="col-start-2 col-span-9">
                <Tab.Group onChange={(index) => {
                    console.log('Changed selected tab to:', index);
                    setToggleTab(index)
                }}>
                    <Tab.List tw="flex">
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    css={[tw`p-4 bg-white text-center font-bold text-gray-400 w-1/2 bg-white border-b-2 border-primary-500 `,
                                    selected && tw`border-primary-500 text-primary-500 border-b-0 border-t-2 border-r-2 border-l-2 rounded-t-md`]}>Step 1</button>
                            )}
                        </Tab>
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    css={[tw`p-4 bg-white text-center font-bold text-gray-400 w-1/2 bg-white border-b-2 border-primary-500 `,
                                    selected && tw`border-primary-500 text-primary-500 border-b-0 border-t-2 border-r-2 border-l-2 rounded-t-md`]}>Step 2</button>
                            )}
                        </Tab>
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    css={[tw`p-4 bg-white text-center font-bold text-gray-400 w-1/2 bg-white border-b-2 border-primary-500 `,
                                    selected && tw`border-primary-500 text-primary-500 border-b-0 border-t-2 border-r-2 border-l-2 rounded-t-md`]}>Step 3</button>
                            )}
                        </Tab>
                    </Tab.List>
                    <Tab.Panels>
                        <Tab.Panel>
                            <div tw="space-y-2">
                                <h1>TAB 1</h1>
                                <div tw="col-span-full flex-col items-center space-y-2">
                                    <FontAwesomeIcon size="2x" icon={faFileContract} title="Accept" tw="" />
                                    <h2 tw="font-bold text-3xl text-gray-800">Data Access Agreement (DAA)</h2>
                                </div>
                                <div>
                                    <p tw="text-gray-600">Before you accept this application your domain requires a Data Access Agreement to be signed and uploaded by the user. Has the document been...</p>
                                </div>
                                <div tw="flex p-4 space-x-4 items-center">
                                    <FontAwesomeIcon size="lg" icon={faCheckCircle} title="Accept" tw="text-success-500" />
                                    <div tw="block">
                                        <p tw="font-bold text-black">Signed by the appropriate parties</p>
                                    </div>
                                </div>
                                <div tw="flex p-4 space-x-4 items-center">
                                    <FontAwesomeIcon size="lg" icon={faCheckCircle} title="Accept" tw="text-success-500" />
                                    <div tw="block">
                                        <p tw="font-bold text-black">Dated within appropriate date range</p>
                                    </div>
                                </div>
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <h1>TAB 2</h1>
                            <div tw="col-span-full flex-col items-center">
                                <h2 tw="font-bold text-4xl my-6 text-gray-800">∑</h2>
                                <h2 tw="font-bold text-4xl my-6 text-gray-800">Upgrade Budget</h2>
                            </div>
                            <div>
                                <p tw="text-gray-600">Allocating Privacy Budget (PB) is an optional setting that allows you to maintain a set standard of privacy while offloading the work of manually approving every data request for a single user. You can think of privacy budget as credits you give to a user to perform computations from. These credits of  Epsilon(ɛ) indicate the amount of visibility a user has into any one entity of your data. The more budget the more visibility. By default all users start with 0ɛ and must have their data requests approved manually until upgraded.

                                    You can learn more about privacy budgets and how to allocate them at Course.OpenMined.org</p>
                            </div>
                            <h3 tw="col-span-full font-bold mt-3 text-gray-600">Adjust Privacy Budget</h3>
                            <div tw="flex items-center p-6 divide-x-2 text-sm text-gray-600">
                                <div tw="pr-4">
                                    <p tw="px-4 py-2 text-error-400 font-bold">{balance} ɛ</p>
                                    <p tw="">Current Balance</p>
                                </div>
                                <div tw="pl-6">
                                    <div tw="flex">
                                        <button tw='px-3 py-2 font-bold text-lg rounded-l-lg border-2 border-gray-200 bg-gray-50' onClick={decrementBudget}>-</button>
                                        <p tw="px-4 py-2 border-t-2 border-b-2 border-gray-200 text-lg">{budget}</p>
                                        <button tw='px-3 py-2 font-bold text-lg rounded-r-lg border-2 border-gray-200 bg-gray-50' onClick={incrementBudget}>+</button>
                                    </div>
                                    <p>Allocated Budget</p>
                                </div>
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <h1>TAB 3</h1>
                            <div tw="col-span-full flex-col items-center">
                                <FontAwesomeIcon size="2x" icon={faUserPlus} tw="" />
                                <h2 tw="font-bold text-4xl my-6 text-gray-800">Users Successfully Added</h2>
                            </div>
                            <div>
                                <p tw="text-gray-600">Congratulations! You have just added new user(s) to your domain.

                                    Pro Tip(s): If you would like to speed up this workflow in the future you can download Data Access Agreements directly from the table view. You can also select multiple users in the users table and then batch Accept or Deny their requests.</p></div>
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
            {/* <div tw="grid grid-cols-12 text-left p-6 gap-4">
                <div tw="col-span-full flex-col items-center">
                    <h2 tw="font-bold text-4xl my-6 text-gray-800">∑</h2>
                    <h2 tw="font-bold text-4xl my-6 text-gray-800">Data Access Upgrade Budget</h2>
                </div>
                <p tw="col-span-full text-justify my-6">Allocating Privacy Budget (PB) is an optional setting that allows you to maintain a set standard of privacy while offloading the work of manually approving every data request for a single user. You can think of privacy budget as credits you give to a user to perform computations from. These credits of  Epsilon(ɛ) indicate the amount of visibility a user has into any one entity of your data. The more budget the more visibility. By default all users start with 0ɛ and must have their data requests approved manually until upgraded. You can learn more about privacy budgets and how to allocate them at Course.OpenMined.org</p>

                <h3 tw="col-span-full font-bold mt-3 text-gray-600">Adjust Privacy Budget</h3>
                <div tw="col-span-full flex bg-gray-50 items-center justify-between border border-gray-100 rounded p-4 space-x-3 my-6">
                    <div>
                        <p tw="text-error-400 font-bold">{balance} ɛ</p>
                        <p>Current Balance</p>
                    </div>
                    <div>
                        <p tw="text-gray-800 font-bold">{budget} ɛ</p>
                        <p>Allocated Budget</p>
                    </div>
                    <div tw="flex">
                        <button tw='px-6 py-4 font-bold text-lg rounded-l-lg border-2 border-gray-200 bg-gray-50' onClick={decrementBudget}>-</button>
                        <p tw="px-8 py-4 border-t-2 border-b-2 border-gray-200 text-lg">{budget}</p>
                        <button tw='px-6 py-4 font-bold text-lg rounded-r-lg border-2 border-gray-200 bg-gray-50' onClick={incrementBudget}>+</button>
                    </div>
                </div>
                <div tw="col-span-full flex justify-between">
                    <Button variant={"primary"} isHollow onClick={onClose}>Cancel</Button>
                    <Button variant={"primary"} onClick={onUpgrade}>Upgrade</Button>
                </div>
            </div> */}
        </Modal>
    )
}