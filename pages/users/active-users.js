import { useState, useEffect, useMemo } from 'react';
import { get, set, useForm } from "react-hook-form"
import tw, { styled, css } from 'twin.macro';
import Link from 'next/link'
import Tag from '../../components/Tag'
import Modal from '../../components/Modal';
import Alert from '../../components/Alert';
import Button from '../../components/Button';
import Spinner from '../../components/Spinner';

import {
    faCalendar,
    faEnvelope,
    faPlus,
    faUser,
    faCheck,
    faUserPlus,
    faInfoCircle,
    faCheckCircle,
    faTimesCircle,
    faTrash,
    faExpandAlt,
    faExclamationCircle
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useRouter } from 'next/router'

import { useGlobalFilter, useSortBy, useTable } from 'react-table'
import { GlobalFilter } from '../../components/GlobalFilter';
import { Router } from 'next/router';
import { Tab, Listbox, Transition } from "@headlessui/react"
import { Fragment } from 'react'
import moment from 'moment'
import { GlobalFilterRoles } from '../../components/GlobalFilterRoles';
const SearchContainer = tw.div`
col-span-full
mb-6
mt-6
`;
const Table = tw.table`
    min-w-full
    my-5
    table-fixed
    text-base
    text-gray-900
`;

const TableHead = tw.thead`
    p-2
`;

const TableRow = tw.tr`
    border border-gray-200
`;

const TableHeader = tw.th`
    p-2 text-gray-500 border border-gray-200    
`;

const TableBody = tw.tbody`
`;

const TableData = tw.td`
    p-2 border border-gray-200
`;

const roles = [
    {   
        id: 1, 
        role: "Owner",
        description: "There is only one Owner account assigned to any one domain node. The owner account is the highest level permission and is a requirement for deploying a domain node. If you should ever want to transfer ownership of your domain node to someone else you can do so by following these steps.",
        permissions: {
            MakeDataRequests: true, 
            EditRoles: true, 
            TriageDataRequests: true, 
            UploadData: true, 
            ManagePrivacyBudgets: true, 
            UploadLegalDocuments: true, 
            ManageUsers: true, 
            EditDomainSettigs: true, 
            CreateUsers: true, 
            ManageInfrastructure: true
        }
    },
    {   
        id: 2, 
        role: "Admin", 
        description: "This role is for users who will help you manage your node. This should be users you trust. The main difference between this user and a Compliance Officer is that this user by default not only can manage requests but can also edit Domain Settings. This is the highest level permission outside of an Owner.",        MakeDataRequests: true,
        permissions: {
            MakeDataRequests: true, 
            EditRoles: true, 
            TriageDataRequests: true, 
            UploadData: true, 
            ManagePrivacyBudgets: true, 
            UploadLegalDocuments: true, 
            ManageUsers: true, 
            EditDomainSettigs: true, 
            CreateUsers: true,
            ManageInfrastructure: false
        }
    },
    {   
        id: 3, 
        role: "Compliance Officer",
        description: "This role is for users who will help you manage requests made on your node. They should be users you trust. They are not able to change domain settings or edit roles but they are by default able to accept or deny user requests on behalf of the domain node.",
        permissions: {
            MakeDataRequests: false, 
            EditRoles: false, 
            TriageDataRequests: true, 
            UploadData: false, 
            ManagePrivacyBudgets: true, 
            UploadLegalDocuments: false, 
            ManageUsers: true, 
            EditDomainSettigs: false, 
            CreateUsers: false, 
            ManageInfrastructure: false
        }
    },
    {   
        id: 4, 
        role: "Data Scientist",
        description: "This role is for users who will be performing computations on your datasets. They may be users you know directly or those who found your domain through search and discovery. By default this user can see a list of your datasets and can request to get results. This user will also be required to sign a Data Access Agreement if you have required one in the Domain Settings Configurations.",
        permissions: {
            MakeDataRequests: true, 
            EditRoles: true, 
            TriageDataRequests: false, 
            UploadData: false, 
            ManagePrivacyBudgets: false, 
            UploadLegalDocuments: false, 
            ManageUsers: false, 
            EditDomainSettigs: false, 
            CreateUsers: false, 
            ManageInfrastructure: false
        }
    }
]

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

async function deleteUserByID(id) {
    try {
        const body = JSON.stringify({ "id": id })
        console.log("requesting delete", body)
        const apiRes = await fetch('/api/delete_user_by_id',
            {
                method: "DELETE",
                headers: {
                    'Accept': "application/json",
                    'Content-Type': "application/json"
                },
                body: body
            });
        const data = await apiRes.json()
        console.log("DELETE USER BY ID outside returns", data)
    }
    catch (error) {
        console.log("error in deleteuserbyid", error)
    }
}

async function adjustBudget(email, allocatedBudget) {
    console.log("adjustBudget Called", { email })
    try {
        const body = JSON.stringify({ "email": email, "budget": allocatedBudget })
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

function CreateUserModal({ show, onClose }) {
    const { register, handleSubmit, errors, reset } = useForm();
    const [allocatedBudget, setAllocatedBudget] = useState(0);
    const [showAlert, setShowAlert] = useState(false);
    const [alertVariant, setAlertVariant] = useState('primary')
    const [alertMessage, setAlertMessage] = useState('')
    const [selectedRole, setSelectedRole] = useState(roles[0])

    async function onSubmitForm(values) {
        const data = {
            "email": values.email,
            "full_name": values.full_name,
            "institution": values.institution,
            "password": values.password,
            "website": values.website,
            "allocated_budget": allocatedBudget,
            "role": selectedRole, 
        }

        let config = {
            method: 'post',
            url: 'http://localhost/api/v1/users/open',
            data
        }
        try {
            console.log("createuser modal form post to backend config data: ", values)
            const response = await axios(config)
            setAlertVariant('success');
            setAlertMessage('User successfully created!')
            setShowAlert(true);
            console.log(response);
            onClose();
        } catch (err) {
            console.error(err);
            setAlertVariant('error');
            setAlertMessage('User creation was unsuccessful')
            setShowAlert(true);
        }
    }
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
    return (
        <>
        <Modal tw="p-20" show={show} onClose={onClose}>
            <div tw="absolute right-0 w-1/2 z-50">
                <Alert show={showAlert} onClose={() => setShowAlert(false)} variant={alertVariant} autoDelete={true} autoDeleteTime={3000}>
                    <FontAwesomeIcon icon={faExclamationCircle} size="2x" tw=""/>
                    <p>{alertMessage}</p>
                </Alert>
            </div>
            <div tw="col-start-2 col-span-9">
            <form onSubmit={handleSubmit(onSubmitForm)} tw="grid grid-cols-12 text-sm text-center font-bold p-6 rounded-lg gap-4 ">
                <div tw="col-span-12 my-3 text-left text-gray-800">
                    <FontAwesomeIcon icon={faUserPlus} size="2x" tw="my-4" />
                    <p tw="text-3xl font-rubik text-gray-800">
                        Create a User
                    </p>
                    <div tw="mt-3 font-normal text-gray-600">
                        PyGrid utilizes users and roles to appropriately permission data at a higher level. All users with the permission CAN CREATE USERS are allowed to create users in the domain. Create a user by filling out the fields below.
                    </div>
                </div>
                <div tw="col-span-6 text-left ">
                    <label tw="block my-2 text-sm text-gray-500" htmlFor="full_name">Full Name<p tw="pl-1 inline relative bottom-1 text-primary-500 ">*</p></label>
                    <input
                        tw="block p-3 border border-gray-300 rounded-lg w-full
                                focus:shadow-active hover:shadow-active active:ring-primary-500 active:text-gray-800"
                        name="full_name"
                        type="text"
                        placeholder="Jane Doe"
                        autoComplete="on"
                        {...register("full_name", { required: true, message: 'You must enter a name' })}
                    />
                </div>
                <div tw="col-span-6 text-left">
                    <label tw="block my-2 text-sm text-gray-500" htmlFor="email">Email<p tw="pl-1 inline relative bottom-1 text-primary-500 ">*</p></label>
                    <input
                        tw="block p-3 border border-gray-300 rounded-lg w-full
                                focus:shadow-active hover:shadow-active active:ring-primary-500 active:text-gray-800"
                        name="email"
                        type="email"
                        placeholder="abc@university.edu"
                        autoComplete="on"
                        {...register("email", { required: true })}
                    />
                </div>
                <div tw="col-span-6 block text-left">
                    <label tw="block my-2 text-sm text-gray-500" htmlFor="pw">Password<p tw="pl-1 inline relative bottom-1 text-primary-500 ">*</p></label>
                    <input
                        tw="block p-3 border border-gray-300 rounded-lg w-full
                                focus:shadow-active hover:shadow-active active:ring-primary-500 active:text-gray-800"
                        name="password"
                        type="password"
                        placeholder="Text here"
                        autoComplete="on"
                        {...register("password", { required: true })}
                    />
                </div>
                <div tw="col-span-6 inline-block text-left">
                    <label tw="block my-2 text-sm text-gray-500" htmlFor="confirmpw">Confirm Password<p tw="pl-1 inline relative bottom-1 text-primary-500">*</p></label>
                    <input
                        tw="block p-3 border border-gray-300 rounded-lg w-full
                                focus:shadow-active hover:shadow-active active:ring-primary-500 active:text-gray-800"
                        name="confirmpw"
                        type="password"
                        placeholder="Text here"
                        autoComplete="on"
                        {...register("confirmpw", { required: true })}
                    />
                </div>
                <div tw="col-span-12 block text-left">
                    <label tw="block my-2" htmlFor="website">Role<p tw="pl-1 inline relative bottom-1 text-primary-500">*</p></label>
                    <Listbox value={selectedRole} onChange={setSelectedRole}>
                        <Listbox.Button tw="flex w-full p-4 h-10 border border-gray-300 rounded-lg text-left text-sm text-gray-600 justify-between items-center truncate focus:shadow-active hover:shadow-active active:ring-primary-500 active:text-gray-800">
                            <span>{selectedRole.role}</span>
                            <span tw="ml-2 text-xs">▼</span>
                        </Listbox.Button>
                        <Transition
                            as={Fragment}
                            enter="transition duration-100 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                        >
                        <Listbox.Options tw="absolute w-auto z-10 mt-1 overflow-auto text-gray-800 border-2 border-gray-200 rounded-md">
                        {roles.map((role) => (
                                <Listbox.Option key={role.id} value={role} tw="absolute bg-white cursor-default select-none relative text-gray-800">
                                        {({ selected }) => (
                                            <div css={[tw`py-2 px-6  items-center`, selected && tw`flex justify-between bg-gray-50`]}>
                                            <span css={[tw`font-normal`, selected && tw`font-medium`]}>{role.role}</span>
                                            {selected ? (<span tw='items-center'><FontAwesomeIcon icon={faCheck} size="sm"/> </span> ) : null}
                                            </div>
                                        )}
                                    
                                </Listbox.Option>
                        ))}
                        </Listbox.Options>
                        </Transition>
                    </Listbox>
                </div>
                <div tw="col-span-4">
                    <label tw="col-span-full block my-2 text-left text-sm text-gray-500" htmlFor="website">Set Privacy Budget (PB)<p tw="pl-1 inline text-base italic text-sm font-normal text-primary-600 ">(optional)</p></label>
                    <div tw="flex">
                        <button tw='px-6 py-4 font-bold text-lg rounded-l-lg border-2 border-gray-200 bg-gray-50' type="button" onClick={decrementBudget}>-</button>
                        <p tw="px-8 py-4 border-t-2 border-b-2 border-gray-200 text-lg">{allocatedBudget}</p>
                        <button tw='px-6 py-4 font-bold text-lg rounded-r-lg border-2 border-gray-200 bg-gray-50' type="button" onClick={incrementBudget}>+</button>
                    </div>
                </div>
                <div tw="col-span-7 text-justify font-normal font-mono my-2">
                    <p>Allocating Privacy Budget (PB) is an optional setting that allows you to maintain a set standard of privacy while offloading the work of manually approving every data request for a single user. You can think of privacy allocatedBudget as credits you give to a user to perform computations from. These credits of Epsilon(ɛ) indicate the amount of visibility a user has into any one entity of your data. You can learn more about privacy allocatedBudgets and how to allocate them at Course.OpenMined.org</p>
                </div>
                <div tw="col-span-full flex justify-between font-bold text-xl">
                    <button tw="bg-white rounded text-primary-500 text-center my-6 px-3 py-2 my-5 border-2 border-primary-500 " type="button" onClick={onClose}>Cancel</button>
                    <button tw="bg-primary-500 rounded text-white text-center my-6 px-3 py-2 my-5" type="submit"><FontAwesomeIcon icon={faPlus} tw="mr-3" />Create</button>
                </div>
            </form>
            </div>
        </Modal>
        </>
    )
}

function UserModal({ show, onClose, data }) {
    const [showAdjustBudgetModal, setShowAdjustBudgetModal] = useState(false);
    const [showChangeRoleModal, setShowChangeRoleModal] = useState(false);
    const [full_name, setFull_name] = useState("");
    const [id, setId] = useState("");
    const [allocatedBudget, setAllocatedBudget] = useState("");
    const [budget, setBudget] = useState("");
    const [email, setEmail] = useState("");
    const [institution, setInstitution] = useState("");
    const [website, setWebsite] = useState("");
    const [added_by, setAdded_by] = useState("");
    const [daa_pdf, setDaa_pdf] = useState("");
    const [created_at, setCreated_at] = useState("");
    const router = useRouter();
    console.log("USER MODAL", data)
    useEffect(() => {
        setFull_name(data.full_name);
        setId(data.id);
        setAllocatedBudget(data.allocated_budget);
        setBudget(data.budget);
        setEmail(data.email);
        setInstitution(data.institution);
        setWebsite(data.website);
        setAdded_by(data.added_by);
        setDaa_pdf(data.daa_pdf);
        setCreated_at(data.created_at);
    }, [data]);

    useEffect(() => {
    }, [showAdjustBudgetModal]);

    useEffect(() => {
    }, [allocatedBudget]);

    function handleBudgetInUserModal(value) {
        setAllocatedBudget(value)
    };

    return (
        <Modal show={show} onClose={onClose}>
            <div tw="col-span-full font-roboto">
                <div tw="w-full m-2 text-gray-400 text-sm"><button tw="items-center font-bold space-x-2" onClick={() => router.push(`/users/${email}`)}><FontAwesomeIcon size="sm" tw="mr-1" icon={faExpandAlt} />   Expand Page</button></div>
                <div tw="h-auto grid grid-cols-12">
                <div tw="col-start-2 col-span-10 flex items-center justify-between mt-5 mb-3">
                    <div tw="flex space-x-3 items-center">
                        <h2 tw="font-bold font-rubik text-4xl text-gray-800">{full_name}</h2>
                        <Tag variant={'primary'} tw="font-bold">Data Scientist</Tag>
                    </div>
                    <Button tw="float-right" tw="space-x-3 text-gray-400" type="button" onClick={()=>deleteUserByID(id)}><FontAwesomeIcon size="sm" icon={faTrash} />  Delete User</Button>
                </div>
                <button tw="col-start-2 col-span-2 text-primary-500 underline text-left text-sm" onClick={()=>setShowChangeRoleModal(true)}>Change Role</button>
                <ChangeRoleModal show={showChangeRoleModal} onClose={() => setShowChangeRoleModal(false)}
                        email={email}/>
                <h3 tw="font-bold mt-10 text-gray-600">Privacy Budget</h3>
                <div tw="flex bg-gray-50 items-center justify-between border border-gray-100 rounded p-4 space-x-3">
                    <div>
                        <p tw="text-error-400 font-bold">{budget} ɛ</p>
                        <p>Current Balance</p>
                    </div>
                    <div>
                        <p tw="text-gray-800 font-bold">{allocatedBudget} ɛ</p>
                        <p>Allocated Budget</p>
                    </div>
                    <Button variant={"primary"} onClick={() => setShowAdjustBudgetModal(true)} isSmall isHollow>Adjust Budget</Button>
                    <AdjustBudgetModal show={showAdjustBudgetModal} onClose={() => setShowAdjustBudgetModal(false)}
                        email={email} budget={budget} aBudget={allocatedBudget} handleBudgetInUserModal={handleBudgetInUserModal} />
                </div>
                <div tw="col-start-2 col-span-10 text-sm">
                    <h3 tw="font-bold mt-10 text-gray-600 mb-2">Background</h3>
                    <div tw="flex-col border border-gray-100 rounded p-4 space-y-3">
                        <div tw="flex space-x-3">
                            <p tw="font-bold text-gray-600">Email:</p>
                            <p>{email}</p>
                        </div>
                        <div tw="flex space-x-3">
                            <p tw="font-bold text-gray-600">Company/Institution:</p>
                            <p>{institution}</p>
                        </div>
                        <div tw="flex space-x-3">
                            <p tw="font-bold text-gray-600">Website/profile:</p>
                            <p>{website}</p>
                        </div>
                    </div>
                </div>
                <div tw="col-start-2 col-span-10 mb-5 text-sm">
                    <h3 tw="font-bold mt-10 text-gray-600 mb-2">System</h3>
                    <div tw="flex-col border border-gray-100 rounded p-4 space-y-3">
                        <div tw="flex space-x-3">
                            <p tw="font-bold text-gray-600">Date Added:</p>
                            <p>{added_by}</p>
                        </div>
                        <div tw="flex space-x-3">
                            <p tw="font-bold text-gray-600">Data Access Agreement:</p>
                            <p>{daa_pdf}</p>
                        </div>
                        <div tw="flex space-x-3">
                            <p tw="font-bold text-gray-600">Uploaded On:</p>
                            <p>{moment(created_at).format('YYYY-MMM-DD HH:MM')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </Modal>
    );
}

function ChangeRoleModal({ show, onClose, email, data }) {
    console.log("changemodal data", data)
    
    const [selectedRole, setSelectedRole] = useState(roles[0])
    return (
        <Modal show={show} onClose={onClose}>
            <div tw="col-span-full">
            <div tw="grid grid-cols-12 text-left p-6 rounded-lg text-gray-600">
                <div tw="col-span-full flex-col items-center">
                    <h2 tw="font-bold text-4xl my-6 text-gray-800"><FontAwesomeIcon size="xl" icon={faCheck} tw="mr-3" /></h2>
                    <h2 tw="font-bold text-4xl my-6 text-gray-800">Change Roles</h2>
                </div>
                <p tw="col-span-full text-justify">Permissions for a user are set by their assigned role. These permissions are used for managing the domain. To review and customize the default set of roles visit the Permissions page.</p>

                <SearchContainer>
                    <h3 tw="col-span-full font-bold mt-3 text-gray-600 mb-2">Change Role</h3>
                    <Listbox value={selectedRole} onChange={setSelectedRole}>
                        <Listbox.Button tw="flex w-full p-4 h-10 border-2 border-gray-200 rounded-lg text-left text-sm text-gray-600 justify-between items-center truncate">
                            <span>{selectedRole.role}</span>
                            <span tw="ml-2 text-xs">▼</span>
                        </Listbox.Button>
                        <Transition
                            as={Fragment}
                            enter="transition duration-100 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                        >
                        <Listbox.Options tw="absolute overflow-auto text-gray-800 border-2 border-gray-200 rounded-md mt-1">
                        {roles.map((role) => (
                                <Listbox.Option key={role.id} value={role} tw="absolute bg-white cursor-default select-none relative text-gray-800">
                                        {({ selected }) => (
                                            <div css={[tw`py-2 px-6  items-center`, selected && tw`flex justify-between bg-gray-50`]}>
                                            <span css={[tw`font-normal`, selected && tw`font-medium`]}>{role.role}</span>
                                            {selected ? (<span tw='items-center'><FontAwesomeIcon icon={faCheck} size="sm"/> </span> ) : null}
                                            </div>
                                        )}
                                    
                                </Listbox.Option>
                        ))}
                        </Listbox.Options>
                        </Transition>
                    </Listbox>
                </SearchContainer>
                <div tw="col-span-full flex-col bg-gray-50 items-center border border-gray-100 rounded p-6 space-x-3 text-sm overflow-auto">
                    <div>
                        <p tw="mb-3">{selectedRole.description}</p>
                    </div>
                        {Object.keys(selectedRole.permissions).map((key, idx)=>(
                            <div tw="flex py-2 space-x-10 items-center">
                                { selectedRole.permissions[key] ? <FontAwesomeIcon size="xs" icon={faCheckCircle} tw="text-success-500" /> : <FontAwesomeIcon size="xs" icon={faTimesCircle} tw="text-error-500" />}
                                <div tw="block">
                                    <p tw="font-bold text-black">{key}</p>
                                    {/* <p>Allows users to make data requests</p> */}
                                </div>
                            </div>
                        ))}
                </div>
                <div tw="col-span-full my-5">
                    <Link href="/permissions">
                        <a tw="text-primary-600 font-medium font-bold cursor-pointer text-sm p-2">Edit Role Permissions</a>
                    </Link>
                </div>
                <div tw="col-span-full flex justify-between">
                    <Button variant={"primary"} isHollow onClick={onClose}>Cancel</Button>
                    <Button variant={"primary"} onClick={onClose}>Change Role</Button>
                </div>
            </div>
            </div>
        </Modal>
    )
}

function AdjustBudgetModal({ show, onClose, email, budget, aBudget, handleBudgetInUserModal }) {
    // console.log("adjustallocatedBudgetmodal data", budget, aBudget)

    const [balance, setBalance] = useState(0)
    const [allocatedBudget, setAllocatedBudget] = useState(0)
    const [showAlert, setShowAlert] = useState(false);
    const [alertVariant, setAlertVariant] = useState('primary')
    const [alertMessage, setAlertMessage] = useState('')

    useEffect(() => {
        setBalance(budget);
        setAllocatedBudget(aBudget);
    }, [budget, aBudget])

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

    const onUpgrade = () => {
        // console.log("allocatedBudget", allocatedBudget)
        setBalance(balance);
        setAlertVariant('success');
        setAlertMessage('Allocated budget was successfully adjusted')
        setShowAlert(true);
        // console.log("balance", balance)
        adjustBudget(email, allocatedBudget)
        handleBudgetInUserModal(allocatedBudget);
        onClose();
        // console.log("onUpgrade", email, balance, allocatedBudget)
    }

    return (
        <Modal show={show} onClose={onClose}>
            <div tw="absolute right-0 w-1/2 z-50">
                <Alert show={showAlert} onClose={() => setShowAlert(false)} variant={alertVariant} autoDelete={true} autoDeleteTime={3000}>
                    <FontAwesomeIcon icon={faExclamationCircle} size="2x" tw=""/>
                    <p>{alertMessage}</p>
                </Alert>
            </div>
            <div tw="col-span-full">
                <div tw="grid grid-cols-12 text-left p-6 rounded-lg gap-4">
                    <div tw="col-span-full flex-col items-center">
                        <h2 tw="font-bold text-4xl my-6 text-gray-800">∑</h2>
                        <h2 tw="font-bold text-4xl my-6 text-gray-800">Upgrade Budget</h2>
                    </div>
                    <p tw="col-span-full text-justify my-6">Allocating Privacy Budget (PB) is an optional setting that allows you to maintain a set standard of privacy while offloading the work of manually approving every data request for a single user. You can think of privacy allocatedBudget as credits you give to a user to perform computations from. These credits of  Epsilon(ɛ) indicate the amount of visibility a user has into any one entity of your data. The more allocatedBudget the more visibility. By default all users start with 0ɛ and must have their data requests approved manually until upgraded. You can learn more about privacy allocatedBudgets and how to allocate them at Course.OpenMined.org</p>

                    <h3 tw="col-span-full font-bold mt-3 text-gray-600">Adjust Privacy Budget</h3>
                    <div tw="col-span-full flex items-end rounded my-6 divide-x divide-gray-200">
                        <div tw="pr-3">
                            <p tw="text-error-400 font-bold text-lg mb-4">{balance} ɛ</p>
                            <p tw="text-sm text-gray-600 mt-1">Current Balance</p>
                        </div>
                        <div>
                            <p tw="text-gray-800 font-bold">{allocatedBudget} ɛ</p>
                            <p>Allocated Budget</p>
                        </div>
                        <div tw="flex">
                            <button tw='px-6 py-4 font-bold text-lg rounded-l-lg border-2 border-gray-200 bg-gray-50' onClick={decrementBudget}>-</button>
                            <p tw="px-8 py-4 border-t-2 border-b-2 border-gray-200 text-lg">{allocatedBudget}</p>
                            <button tw='px-6 py-4 font-bold text-lg rounded-r-lg border-2 border-gray-200 bg-gray-50' onClick={incrementBudget}>+</button>
                        </div>
                    </div>
                    <div tw="col-span-full flex justify-between">
                        <Button variant={"primary"} isHollow onClick={onClose}>Cancel</Button>
                        <Button variant={"primary"} onClick={onUpgrade}>Upgrade</Button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

/*
function getUserByID(id){
    const [userDetail, setUserDetail] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function fetchData() {
            try{
                const email =  id;
                setLoading(true);
                const body =JSON.stringify({
                    email
                })
                const apiRes = await fetch('/api/get_user_by_id',
                    {
                        method: "POST",
                        headers:{
                            'Accept': "application/json",
                            'Content-Type': "application/json"
                        },
                        body: body
                    });
                const data = await apiRes.json()
                console.log("GET USER BY ID outside returns", data)
                setUserDetail(data)
            }
            finally {
                setLoading(false);
            }
        }

        if(id !== ''){
            fetchData();
        }
    }, []);

    return [userDetail, loading];
}

 */

export default function Active() {
    const [userlist, setUserlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateUserModal, setShowCreateUserModal] = useState(false);
    const [showUserModal, setShowUserModal] = useState(false);
    const [showAlert, setShowAlert] = useState(true);

    const [userData, setUserData] = useState(
        {
            "email": "",
            "full_name": "",
            "id": 0,
            "institution": "",
            "website": "",
            "status": "",
            "role": null,
            "allocatedBudget": 0,
            "created_at": "",
            "added_by": "",
            "daa_pdf": ""
        });

    useEffect(() => {
        fetchUserlist()
    }, [showUserModal])

    const fetchUserlist = async () => {
        try {
            setLoading(true);
            const apiRes = await fetch(
                '/api/accepted_userlist',
                {
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                }
            );
            const data = await apiRes.json();
            // console.log("userlist from backend", { data })
            setUserlist(data);
        }
        finally {
            setLoading(false);
        }
    }

    async function getUser(email) {
        const body = JSON.stringify({
            email,
        })
        try {
            const apiRes = await fetch(
                "api/get_user_by_id",
                {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body
                }
            );

            if (apiRes.status == 200) {
                const data = await apiRes.json();
                setUserData(data)
                // console.log("userData: ", userData)
            }
            else {
                alert("Couldn't fetch the user!");
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const usersData = useMemo(() => [...userlist], [userlist]);
    const usersColumns = useMemo(
        () => [
            {
                Header: () => <div tw="flex font-normal space-x-2"><div tw="font-roboto capitalize">Name</div></div>,
                accessor: 'full_name',
                Cell: ({ row }) => (
                    <button tw="flex space-x-2 items-center" onClick={() => {
                        getUser(row.values.email);
                        setShowUserModal(true);
                    }}>
                        <p tw="text-gray-600">{row.values.full_name}</p>
                        <Tag><p tw="text-xs text-primary-600 font-medium">{row.values.email}</p></Tag>
                    </button>
                ),
            },
            {
                Header: () => <div tw="flex font-normal space-x-2"><div tw="font-roboto capitalize">Σ Balance</div></div>,
                accessor: 'budget',
                Cell: ({ row }) => {
                    // console.log("ROW", row)
                    let allocatedBudgetDiff = row.values.budget <= row.values.allocated_budget
                    // console.log("allocatedBudgetDiff", allocatedBudgetDiff, "of", row.values.full_name,"allocated budget", row.values.allocated_budget, "budget/balance", row.values.budget)
                    return(
                        <div tw="flex space-x-2 items-center justify-center">
                            {/* {console.log("T ? F", row.values.allocated_budget >= row.values.budget)} */}
                            <Tag variant={(allocatedBudgetDiff) ? 'gray' : 'error'} fullColor={!allocatedBudgetDiff}><p css={[allocatedBudgetDiff ? tw`text-black font-bold` : tw`text-white font-bold`]}>{row.values.budget} ε</p></Tag>
                        </div>
                    )
                }
            },
            {
                Header: () => <div tw="flex font-normal space-x-2"><div tw="font-roboto capitalize">Σ Allocated Budget</div></div>,
                accessor: 'allocated_budget',
                Cell: ({ row }) => (
                    <div tw="flex space-x-2 items-center justify-center">
                        <Tag variant={'gray'}><p tw="text-black font-bold">{row.values.allocated_budget || "0"} ε</p></Tag>
                    </div>
                )
            },
            {
                Header: () =>
                    <div tw="flex font-normal space-x-2 items-center">
                        <FontAwesomeIcon icon={faCalendar} size="sm" />
                        <div tw="font-roboto capitalize">Date Added</div>
                    </div>,
                accessor: 'created_at',
                Cell: ({ cell: { value } }) => {
                    {
                        var d = moment(value).format('YYYY-MMM-DD HH:MM')
                        return d;
                    }
                }
            },
            { Header: () => <div tw="flex font-normal space-x-2 items-center"><FontAwesomeIcon icon={faUser} size="sm" /><div tw="font-roboto capitalize">Added By</div></div>, accessor: 'added_by' },
            { Header: () => <div tw="flex font-normal space-x-2 items-center"><FontAwesomeIcon icon={faEnvelope} size="sm" /><div tw="font-roboto capitalize">Email</div></div>, accessor: 'email' }], []
    );

    const tableHooks = (hooks) => {
        const router = useRouter()

        hooks.visibleColumns.push((columns) => [
            ...columns,
            {
                id: "Delete",
                Header: 'Delete',
                Cell: ({ row }) => (
                    
                    <div tw="flex items-center justify-center">
                        {/* {console.log(row.values)} */}
                        <Button 
                            tw="bg-gray-200 text-white" 
                            isSmall 
                            variant={'error'} 
                            onClick={
                                async () => {
                                    await deleteUserByID(row.original.id); 
                                    await fetchUserlist()
                                    }
                                }
                        >
                            Delete
                        </Button>
                    </div>    
                )
            }
        ])
    }
    const tableInstance = useTable({ columns: usersColumns, data: usersData }, useGlobalFilter, tableHooks, useSortBy);
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, preGlobalFilteredRows, setGlobalFilter, state } = tableInstance;

    useEffect(() => {
        fetchUserlist();
    }, [])


    return (
        <div tw="flex-col justify-center">
            <div tw="my-10">
                <Alert show={showAlert} onClose={() => setShowAlert(false)} autoDelete={false}>
                    <FontAwesomeIcon icon={faExclamationCircle} size="xl" />
                    <p>Active users are users who you have manually created or users who have had their account applications approved</p>
                </Alert>
            </div>
            <div tw="flex justify-between items-center">
                <div tw="inline-flex space-x-4">
                    <div tw="">
                        <GlobalFilter preGlobalFilteredRows={preGlobalFilteredRows} setGlobalFilter={setGlobalFilter} globalFilter={state.globalFilter} />
                    </div>
                    <div tw="">
                        <GlobalFilterRoles preGlobalFilteredRows={preGlobalFilteredRows} setGlobalFilter={setGlobalFilter} globalFilter={state.globalFilter} />
                    </div>
                </div>
                <button tw="bg-gray-800 rounded text-primary-200 text-center my-2 px-3 h-10 py-2 font-bold" onClick={() => setShowCreateUserModal(true)}><FontAwesomeIcon icon={faPlus} tw="mr-3" />Create User</button>
            </div>
            <CreateUserModal show={showCreateUserModal} onClose={() => setShowCreateUserModal(false)} />
            <UserModal show={showUserModal} onClose={() => setShowUserModal(false)} data={userData} />
            {loading ?
                <div tw="my-10 flex w-full justify-center">
                    <Spinner />
                </div> :
                <div tw="flex justify-center">
                    <Table {...getTableProps()}>
                        <TableHead>
                            {headerGroups.map((headerGroup) => (
                                <TableRow {...headerGroup.getHeaderGroupProps()} tw="text-sm text-gray-600">
                                    {headerGroup.headers.map((column) => (
                                        <TableHeader {...column.getHeaderProps(column.getSortByToggleProps())} css={[column.isSorted && tw`bg-gray-50`]}>
                                            <div css={[tw`items-center space-x-2`, column.isSorted && tw`flex justify-between items-center space-x-2`]}>
                                                {column.render("Header")}
                                                {column.isSorted ? (column.isSortedDesc ? <div> ▼</div> : <div>▲ </div>) : <div> </div>}
                                            </div>
                                        </TableHeader>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHead>
                        <TableBody {...getTableBodyProps()}>
                            {rows.map((row, idx) => {
                                prepareRow(row);
                                return (
                                    <TableRow {...row.getRowProps()} tw="text-sm text-gray-600">
                                        {row.cells.map((cell, idx) => (
                                            <TableData {...cell.getCellProps()} css={[cell.column.isSorted && tw`bg-gray-50`]}>
                                                {cell.render('Cell')}
                                            </TableData>
                                        ))}
                                    </TableRow>)
                            })}
                        </TableBody>
                    </Table>
                </div>
            }
        </div>
    )
}