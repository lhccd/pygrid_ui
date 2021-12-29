import { useState, useEffect } from 'react';
import tw, {styled} from 'twin.macro';
import { Table } from './Table';
import { Table2 } from './Table2';
import Modal from '../components/Modal';
import Alert from '../components/Alert';
import Button from '../components/Button';
import {faCalendar, faEnvelope, faPlus, faUser, faUserPlus, faInfoCircle} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import ListBox from './ListBox';
import HttpService from '../services/HttpService'
import axios from 'axios'
import {getToken} from "../services/UserService";

const CreateUserModal = ({show, onClose}) => (
    <Modal show={show} onClose={onClose}>
        <form onSubmit={""} tw="grid grid-cols-12 text-sm text-center font-bold p-6 rounded-lg gap-4 ">
            <div tw="col-span-12 my-3 text-left text-gray-800">
                <FontAwesomeIcon icon={faUserPlus} size="2x" tw="my-4"/>  
                <p tw="text-2xl">
                    Create a User
                </p>
                <p tw="mt-3 text-sm font-normal">
                    PyGrid utilizes users and roles to appropriately permission data at a higher level. All users with the permission CAN CREATE USERS are allowd to create users in the domain. Create a user by filling out the fields below. 
                </p>
            </div>
            <div tw="col-span-6 text-left ">
                <label tw="block my-2" htmlFor="fullname">Full Name<p tw="pl-1 inline relative bottom-1 text-primary-500 ">*</p></label>
                <input
                tw="block p-3 border border-gray-300 rounded-lg w-full
                            focus:shadow-active hover:shadow-active active:ring-primary-500 active:text-gray-800"
                name="full_name"
                type="text"
                placeholder="Jane Doe"
                autoComplete="on"
                />
            </div>
            <div tw="col-span-6 text-left">
                <label tw="block my-2" htmlFor="email">Email<p tw="pl-1 inline relative bottom-1 text-primary-500 ">*</p></label>
                <input
                tw="block p-3 border border-gray-300 rounded-lg w-full
                            focus:shadow-active hover:shadow-active active:ring-primary-500 active:text-gray-800"
                name="email"
                type="email"
                placeholder="abc@university.edu"
                autoComplete="on"
                />
            </div>
            <div tw="col-span-6 block text-left">
                <label tw="block my-2" htmlFor="pw">Password<p tw="pl-1 inline relative bottom-1 text-primary-500 ">*</p></label>
                <input
                tw="block p-3 border border-gray-300 rounded-lg w-full
                            focus:shadow-active hover:shadow-active active:ring-primary-500 active:text-gray-800"
                name="password"
                type="password"
                placeholder="Text here"
                autoComplete="on"
                />
            </div>
            <div tw="col-span-6 inline-block text-left">
                <label tw="block my-2" htmlFor="confirmpw">Confirm Password<p tw="pl-1 inline relative bottom-1 text-primary-500">*</p></label>
                <input
                tw="block p-3 border border-gray-300 rounded-lg w-full
                            focus:shadow-active hover:shadow-active active:ring-primary-500 active:text-gray-800"
                name="confirmpw"
                type="password"
                placeholder="Text here"
                autoComplete="on"
                />
            </div>
            <div tw="col-span-12 block text-left">
                <label tw="block my-2" htmlFor="website">Role<p tw="pl-1 inline relative bottom-1 text-primary-500">*</p></label>
                <input
                    tw="block p-3 border border-gray-300 rounded-lg w-full
                                focus:shadow-active hover:shadow-active active:ring-primary-500 active:text-gray-800"
                    name="website"
                    type="text"
                    placeholder="This can help a domain owner vett your application"
                    autoComplete="on"
                />
            </div>
            <div tw="col-span-5">
                <label tw="col-span-full block my-2 text-left" htmlFor="website">Set Privacy Budget (PB)<p tw="pl-1 inline text-xs italic font-normal text-primary-500 ">(optional)</p></label>
                <input
                    tw="col-span-3 block p-3 border border-gray-300 rounded-lg w-full
                                focus:shadow-active hover:shadow-active active:ring-primary-500 active:text-gray-800"
                    name="website"
                    type="text"
                    placeholder="This can help a domain owner vett your application"
                    autoComplete="on"
                />
            </div>
            <div tw="col-span-7 text-justify font-normal font-mono my-2">
                <p>Allocating Privacy Budget (PB) is an optional setting that allows you to maintain a set standard of privacy while offloading the work of manually approving every data request for a single user. You can think of privacy budget as credits you give to a user to perform computations from. These credits of Epsilon(ɛ) indicate the amount of visibility a user has into any one entity of your data. You can learn more about privacy budgets and how to allocate them at Course.OpenMined.org</p>
            </div>
            <div tw="col-span-full flex justify-between font-bold text-xl">
                <button tw="bg-white rounded text-primary-500 text-center my-6 px-3 py-2 my-5 border-2 border-primary-500 " type="submit" onClick={() => setShowModal(false)}>Cancel</button>
                <button tw="bg-primary-500 rounded text-white text-center my-6 px-3 py-2 my-5" type="submit"><FontAwesomeIcon icon={faPlus} tw="mr-3"/>Create</button>
            </div>
        </form>
    </Modal>
)

function Pending(){
    const [showAlert, setShowAlert] = useState(true);
    const [userList, setUserList] = useState([]);

    function getUserlist(e){
        e.preventDefault()
        const Token = getToken()
        axios.get('http://localhost:80/api/v1/users/active_users',{ headers: {'Authorization': `Bearer ${Token}`}})
            .then(res => setUserList(res.data))
            .catch(err => console.log(err))
    }

    useEffect(()=>{
        getUserlist
    })
    
    return (
        <>  
            <Alert show={showAlert} onClose={() => setShowAlert(false)}>
                <FontAwesomeIcon icon={faInfoCircle} size="2x" tw=""/>
                <p>Pending users are users who have applied to your domain but who are not yet authorized to perform data requests. You can review their uploaded Data Access Agreements(DAA) below and choose to accept or deny their account applications.</p>
            </Alert>
            <div tw="col-span-full">
                <div tw="flex justify-between">
                    <div tw="my-6 space-x-4">
                        <input
                            tw="p-3 border border-gray-300 rounded-lg focus:shadow-active hover:shadow-active active:ring-primary-500 active:text-gray-800"
                            name="search"
                            type="text"
                            placeholder="Search"
                        />
                    </div>
                    <button tw="bg-gray-800 rounded text-primary-200 text-center my-6 px-3 py-2 font-bold" onClick={() => setShowModal(true)}><FontAwesomeIcon icon={faPlus} tw="mr-3"/>Create User</button>
                </div>
            </div>
            <Button variant={'primary'} onClick={getUserlist}>Get All Users</Button>
            <table tw="min-w-full my-3">
                <thead>
                    <tr>
                        <th
                            tw="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            Name</th>
                        <th
                            tw="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            Σ Balance</th>
                        <th
                            tw="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            Σ Allocated Budget</th>
                        <th
                            tw="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            <FontAwesomeIcon icon={faCalendar} size="sm" tw="mr-1"/>Date Added</th>
                        <th
                            tw="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            <FontAwesomeIcon icon={faUser} size="sm" tw="mr-1"/>Added By</th>
                        <th
                            tw="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            <FontAwesomeIcon icon={faEnvelope} size="sm" tw="mr-1"/>Email</th>
                    </tr>
                </thead>

                <tbody tw="bg-white">
                {
                    userList.map(user => (
                    <tr key={user.email}>
                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <div tw="flex items-center">
                                <div tw="flex-shrink-0 w-10 h-10">
                                    <img tw="w-10 h-10 rounded-full" src="https://source.unsplash.com/user/erondu"
                                        alt="admin dashboard ui"/>
                                </div>

                                <div tw="ml-4">
                                    <div tw="text-sm font-medium leading-5 text-gray-900">
                                        {user.full_name}
                                    </div>
                                </div>
                            </div>
                        </td>

                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <div tw="ml-4">
                                <div tw="text-sm font-medium leading-5 text-gray-900">
                                    {user.budget}
                                </div>
                            </div>
                        </td>

                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <div tw="ml-4">
                                <div tw="text-sm font-medium leading-5 text-gray-900">
                                    {user.created_at}
                                </div>
                            </div>
                        </td>

                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <div tw="ml-4">
                                <div tw="text-sm font-medium leading-5 text-gray-900">
                                    {user.added_by}
                                </div>
                            </div>
                        </td>

                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <div tw="text-sm leading-5 text-gray-500">{user.email}</div>
                        </td>

                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <div tw="text-sm leading-5 text-gray-500">{user.email}</div>
                        </td>
                    </tr>))
                }
                </tbody>
            </table>
        </>
    )
}
function Active(){
    const [showAlert, setShowAlert] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [userList, setUserList] = useState([]);

    function getUserlist(e){
        e.preventDefault()
        const Token = getToken()
        axios.get('http://localhost:80/api/v1/users/active_users',{ headers: {'Authorization': `Bearer ${Token}`}})
            .then(res => setUserList(res.data))
            .catch(err => console.log(err))
    }
    return (
        <>
            <Alert show={showAlert} onClose={() => setShowAlert(false)}>
                <FontAwesomeIcon icon={faInfoCircle} size="2x" tw=""/>
                <p>Active users are users who you have manually created or users who have had their account applications approved</p>
            </Alert>
            <div tw="col-span-full">
                <div tw="flex justify-between">
                    <div tw="flex my-6 space-x-4">
                        <input
                            tw="inline p-3 border border-gray-300 rounded-lg focus:shadow-active hover:shadow-active active:ring-primary-500 active:text-gray-800"
                            name="search"
                            type="text"
                            placeholder="Search"
                        />
                        {/* <input
                            tw="p-3 border border-gray-300 rounded-lg focus:shadow-active hover:shadow-active active:ring-primary-500 active:text-gray-800"
                            name="search"
                            type="text"
                            placeholder="Role"
                        /> */}
                        <ListBox/>
                    </div>
                    <button tw="bg-gray-800 rounded text-primary-200 text-center my-6 px-3 py-2 font-bold" onClick={() => setShowModal(true)}><FontAwesomeIcon icon={faPlus} tw="mr-3"/>Create User</button>
                </div>
                    <CreateUserModal show={showModal} onClose={()=>setShowModal(false)}/>
                    <Button variant={'primary'} onClick={getUserlist}>Get All Users</Button>
            <table tw="min-w-full my-3">
                <thead>
                    <tr>
                        <th
                            tw="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            Name</th>
                        <th
                            tw="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            Σ Balance</th>
                        <th
                            tw="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            Σ Allocated Budget</th> 
                        <th
                            tw="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            <FontAwesomeIcon icon={faCalendar} size="sm" tw="mr-1"/>Date Added</th>
                        <th
                            tw="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            <FontAwesomeIcon icon={faUser} size="sm" tw="mr-1"/>Added By</th>
                        <th
                            tw="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            <FontAwesomeIcon icon={faEnvelope} size="sm" tw="mr-1"/>Email</th>
                    </tr>
                </thead>

                <tbody tw="bg-white">
                {
                    userList.map(user => (
                    <tr key={user.email}>
                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <div tw="flex items-center">
                                <div tw="flex-shrink-0 w-10 h-10">
                                    <img tw="w-10 h-10 rounded-full" src="https://source.unsplash.com/user/erondu"
                                        alt="admin dashboard ui"/>
                                </div>

                                <div tw="ml-4">
                                    <div tw="text-sm font-medium leading-5 text-gray-900">
                                        {user.full_name}
                                    </div>
                                </div>
                            </div>
                        </td>

                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <div tw="ml-4">
                                <div tw="text-sm font-medium leading-5 text-gray-900">
                                    {user.budget}
                                </div>
                            </div>
                        </td>

                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <div tw="ml-4">
                                <div tw="text-sm font-medium leading-5 text-gray-900">
                                    {user.created_at}
                                </div>
                            </div>
                        </td>

                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <div tw="ml-4">
                                <div tw="text-sm font-medium leading-5 text-gray-900">
                                    {user.added_by}
                                </div>
                            </div>
                        </td>

                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <div tw="text-sm leading-5 text-gray-500">{user.email}</div>
                        </td>

                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <div tw="text-sm leading-5 text-gray-500">{user.email}</div>
                        </td>
                    </tr>))
                }
                </tbody>
            </table>
            </div>
        </>
    )
}

function ActiveUsers(){

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
                    Active Users (3)
                </h3>
                </button>
                <button
                    css={[tw`p-4 bg-white text-center w-1/2 bg-white border-b-2 border-primary-500 `,
                    (toggleState === 2) && tw`border-primary-500 border-b-0 border-t-2 border-r-2 border-l-2 rounded-t-md`]}
                    onClick={() => toggleTab(2)}
                >
                <h3 css={[tw`text-center font-bold text-gray-600`, (toggleState === 2) && tw`text-primary-500`]}>
                    Pending Users (3)
                </h3>
                </button>
                <button
                    css={[tw`p-4 bg-white text-center w-1/2 bg-white border-b-2 border-primary-500 `,
                    (toggleState === 3) && tw`border-primary-500 border-b-0 border-t-2 border-r-2 border-l-2 rounded-t-md`]}
                    onClick={() => toggleTab(3)}
                >
                <h3 css={[tw`text-center font-bold text-gray-600`, (toggleState === 3) && tw`text-primary-500`]}>
                    Denied Users (0)
                </h3>
                </button>
            </div>


            <div tw="">
                <div 
                    css={[tw`bg-white p-5 w-full h-full hidden`,
                    (toggleState === 1) && tw`bg-white block`,]}
                >   
                    <Active></Active>
                </div>

                <div
                    css={[tw`bg-white p-5 w-full h-full hidden`,
                    (toggleState === 2) && tw`bg-white block`,]}
                >
                    <Pending/>
                </div>

                <div
                    css={[tw`bg-white p-5 w-full h-full hidden`,
                    (toggleState === 3) && tw`bg-white block`,]}
                >
                </div>

            </div>
        </div>
    )
}
