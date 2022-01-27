import axios from 'axios';
import {Link} from 'next';
import {useState, Fragment} from 'react';
import tw from 'twin.macro';
import Button from '../components/Button'
import {faCalendar, faEnvelope, faPlus, faUser, faUserPlus, faInfoCircle, faCheck, faCheckCircle, faChevronDown} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Modal from '../components/Modal';
import { Menu, Transition } from '@headlessui/react'
import { SidebarNav } from '../components/SidebarNav';
import { Controller } from 'react-hook-form';
import { Listbox } from '@headlessui/react'

const roles = [
  { id: 1, name: 'Owner'},
  { id: 2, name: 'Admin'},
  { id: 3, name: 'Data Scientist'}
]
const [selectedRole, setSelectedRole] = useState(roles[0])
export default function Testerei(){
    const name = "Canada Domain"
    const domainid = "ID451346262346246"
    const [selectedRole, setSelectedRole] = useState(roles[0])
    // function ChangeRoleModal({show, onClose, email, data}){
    //     console.log("changemodal data", data)
    
    //     const [role, setRole] = useState("")
    
    //     useEffect(()=>{
    //         setBudget(data.role);
    //     }, [data])
    
    //     useEffect(()=>{
    
    //     }, [balance])
    
    //     function incrementBudget(){
    //         setBudget(prevCount => prevCount + 1)
    //     }
    //     function decrementBudget(){
    //         setBudget(prevCount => prevCount - 1)
    //     }
    
    //     const onUpgrade = ()=> {
    //         console.log("budget", budget)
    //         setBalance(budget);
    //         console.log("balance", balance)
    //         adjustBudget(email, budget)
    //         handleBudgetInUserModal(budget);
    //         onClose();
    //         console.log("onUpgrade", email, balance, budget)
    //     }
    
        return(
            <Modal show={true} onClose={""}>
                <div tw="grid grid-cols-12 text-left p-6 rounded-lg gap-4">
                    <div tw="col-span-full flex-col items-center">
                        <h2 tw="font-bold text-4xl my-6 text-gray-800"><FontAwesomeIcon size="xl" icon={faCheck} tw="mr-3"/></h2>
                        <h2 tw="font-bold text-4xl my-6 text-gray-800">Change Roles</h2>
                    </div>
                    <p tw="col-span-full text-justify my-6">Permissions for a user are set by their assigned role. These permissions are used for managing the domain. To review and customize the default set of roles visit the Permissions page.</p>
    
                    <h3 tw="col-span-full font-bold mt-3 text-gray-600">Change Role</h3>
                    <Listbox value={selectedRole} onChange={setSelectedRole}>
                        <Listbox.Button tw="col-span-full flex py-4 px-6 border border-gray-200 rounded-lg text-left justify-between focus:shadow-active hover:shadow-active active:ring-primary-500 active:text-gray-800">
                            <span>{selectedRole.name}</span>
                            <span>▼</span>
                        </Listbox.Button>
                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                        <Listbox.Options tw="relative col-span-full overflow-auto text-gray-800 rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {roles.map((role) => (
                                <Listbox.Option key={role.id} value={role} tw="cursor-default select-none relative text-gray-800">
                                        {({ selected }) => (
                                            <div css={[tw`py-2 px-6  items-center`, selected && tw`flex justify-between bg-gray-50`]}>
                                            <span css={[tw`font-normal`, selected && tw`font-medium`]}>{role.name}</span>
                                            {selected ? (<span tw='items-center'><FontAwesomeIcon icon={faCheck} size="sm"/> </span> ) : null}
                                            </div>
                                        )}
                                   
                                </Listbox.Option>
                        ))}
                        </Listbox.Options>
                        </Transition>
                    </Listbox>
                    <div tw="col-span-full flex-col bg-gray-50 items-center border border-gray-100 rounded p-6 space-x-3 my-6">
                        <div>
                            <p>This role is for users who will be performing computations on your datasets. They may be users you know directly or those who found your domain through search and discovery.</p>
                        </div>
                        <div tw="flex py-10 space-x-10 items-center">
                            <FontAwesomeIcon size="lg" icon={faCheckCircle} title="Accept" tw="text-success-500"/>
                            <div tw="block">
                                <p tw="font-bold text-black">Can Make Data Requests</p>
                                <p>Allows users to make data requests</p>
                            </div>
                        </div>
                    </div>
                    <div tw="col-span-full flex justify-between">
                        <Button variant={"primary"} isHollow onClick={""}>Cancel</Button>
                        <Button variant={"primary"} onClick={""}>Upgrade</Button>
                    </div>
                </div>
            </Modal>
        )
    }
    // return (
    //     <div tw="h-screen w-screen bg-error-50 flex">
    //         <SidebarNav></SidebarNav>
    //         <div tw="relative p-1 flex flex-col justify-between w-64 gap-5 h-screen bg-gray-300 z-10">
    //             <header tw="flex flex-grow bg-primary-200 justify-center items-center"> 
    //                 HEADER
    //             </header>
    //             <div tw="flex flex-grow bg-primary-500 justify-center items-center">
    //                 CONTENT
    //             </div>
    //             <footer tw="flex flex-grow bg-primary-800 justify-center items-center">
    //                 FOOTER
    //             </footer>
    //         </div>
    //     </div>)}
        // <div tw="flex items-center">
        //     <img src={"avatar.jpg"} tw="w-20 h-20 rounded-full mr-4" alt={name} />
        //     <div tw="block">
        //         <Menu>
        //             <Menu.Button tw="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20">
        //                     {name}<FontAwesomeIcon size="sm" icon={faChevronDown}/>
        //             </Menu.Button>
        //             <Transition
        //                 as={Fragment}
        //                 enter="transition ease-out duration-100"
        //                 enterFrom="transform opacity-0 scale-95"
        //                 enterTo="transform opacity-100 scale-100"
        //                 leave="transition ease-in duration-75"
        //                 leaveFrom="transform opacity-100 scale-100"
        //                 leaveTo="transform opacity-0 scale-95"
        //                 >
        //             <Menu.Items tw="w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        //                 <Menu.Item>
        //                 {({ active }) => (
        //                     <a
        //                     css={[tw`flex rounded-md items-center w-full px-2 py-2 text-sm`, active && tw`bg-primary-200`]}
        //                     href="/account-settings"
        //                     >
        //                     Account settings
        //                     </a>
        //                 )}
        //                 </Menu.Item>
        //                 <Menu.Item>
        //                 {({ active }) => (
        //                     <a
        //                     css={[tw`flex rounded-md items-center w-full px-2 py-2 text-sm`, active && tw`bg-primary-200`]}
        //                     href="/account-settings"
        //                     >
        //                     Documentation
        //                     </a>
        //                 )}
        //                 </Menu.Item>
        //             </Menu.Items>
        //             </Transition>
        //         </Menu>
        //         <div tw="block text-lg truncate">{domainid}</div>
        //     </div>
        // </div>
//     )
// }
// export  const getServerSideProps = async () => {
//     // const res = await fetch('https://jsonplaceholder.typicode.com/users')
//     const res = await fetch('http://localhost:80/api/v1/users/active_users', {headers: { Accept: 'application/json', Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDExNDU3NjQsInN1YiI6IjkwNTZhNjY4LTg1YWQtNGI1Ni04ZmFhLTU2YjAzMDZlYzY0MSJ9.6pWAvJerU-TyQujMBDAXE0qIyKJqKMNyAT6PLZYEuDA`}})
//     // const res = await fetch('http://localhost:80/api/v1/users/active_users', {headers: { Accept: 'application/json', Authorization: `Bearer ${Token}`}})
//     const posts = await res.json()
//     // const response = axios.get('http://localhost:80/api/v1/users/active_users',{ headers: {'Authorization': `Bearer ${Token}`}})
//     // console.log("response looks like: ", response)
//     // const users = JSON.stringify(response.data)
//     return {
//       props: { userList : posts }, // will be passed to the page component as props
//     }
// }

// async function getUserlist(){
//     const Token = getToken()
//         axios.get('http://localhost:80/api/v1/users/active_users',{ headers: {'Authorization': `Bearer ${Token}`}})
//         .then(res => setUserList(res.data))
//         .catch(err => console.log(err))
//     console.log("response looks like: ", response.data)
//     return response.data
// }

// async function getUsers() {
//     const Token = getToken()
//     console.log("this is the token for auth", Token)
    // const res = await fetch('http://localhost:80/api/v1/users/active_users'
    // ,{
    //     headers: { Accept: 'application/json', Authorization: `Bearer ${Token}`}
    // }
    // )
    // const posts = await res.json()
//     console.log("response from fetch", res)
//     console.log("data from fetch", posts)
//     // By returning { props: { posts } }, the Blog component
//     // will receive `posts` as a prop at build time
//     return posts
// }

// function getUsers(){
//     const Token = getToken()
//     var config = {
//         method: 'get',
//         url: 'http://localhost:80/api/v1/users/active_users',
//         headers: { 
//           'Authorization': `Bearer ${Token}`,
//         }
//       };
     
//     axios(config)
//     .then(function (response) {
//         console.log('the data in the response looks like: ', JSON.stringify(response.data))
//         return JSON.stringify(response.data) 
//     })
//     .catch(function (error) {
//         console.log('fail', error);
//     })
// } 


// import useSWR from 'swr'

// function getUserlist(){
//     const fetcher = (...args) => fetch(...args).then(res => res.json())
//     const { data, error } = useSWR('/api/userlist', fetcher)
//     console.log("useSWR in outside function", data)
//     return {
//         userlist: data,
//         isLoading: !error && !data,
//         isError: error
//     }
// }

// export default function Testerei(){
//     const [showModal, setShowModal] = useState(false);
//     const { userlist, isLoading, isError } = getUserlist()
//     console.log("useSWR in default function", userlist)
//     if (isLoading) return <div>loading...</div>
//     // return <div>hello {data}!</div>
    
//     function getUserlist2(e){
//         e.preventDefault()
//         // const Token = getToken()
//         const Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDE4Mjc5MDQsInN1YiI6IjgzNWY2MjYwLTUxYjYtNGNlNS1hYjFmLTA0ZjA4MDk5YWY2MyJ9.wqHVG4GzA7-Eolp4ABw_Px6eZDCGThF4FhiSN3BcuMg"
//         console.log("testerei, this is the token:", Token)
//         axios.get('http://localhost:80/api/v1/users/active-users',{ headers: {'Authorization': `Bearer ${Token}`}})
//             .then(res => setUserList(res.data))
//             .catch(err => console.log(err))
//     }
//     // setUserList(getUsers())

//     async function getUserlist3() {
//         console.log("################################################################################");
//         try{
//             const apiRes = await fetch(
//                 "api/userlist",
//                 {
//                     method: "GET",
//                     headers: {
//                         "Accept": "application/json",
//                         "Content-Type": "application/json"
//                     }
//                 }
//             );

//             if(apiRes.status == 200){
//                 const user = await apiRes.json();
//                 setUserList(user)
//             }
//             else{
//                 alert("Couldn't fetch the userlist!");
//             }
//         }
//         catch (error){
//             console.log(error);
//         }
//     }
    
//     // const users = getUsers()
//     // console.log("THIS is the USERS", getUsers())
//     // const Token = getToken()
//     // console.log("printing token", `Bearer ${Token}`)
//     // // axios.get('http://localhost:80/api/v1/users/active_users', {'Authorization': `Bearer ${Token}`})
//     // // .then(function (response) {
//     // //     // handle success
//     // //     console.log('success', response);
//     // // })
//     // // .catch(function (error) {
//     // //     // handle error
//     // //     console.log('error', error);
//     // // })
//     // var config = {
//     //     method: 'get',
//     //     url: 'http://localhost:80/api/v1/users/active_users',
//     //     headers: { 
//     //       'Authorization': `Bearer ${Token}`,
//     //     }
//     //   };
      
//     //   axios(config)
//     //   .then(function (response) {
//     //     console.log('success', JSON.stringify(response.data));
//     //   })
//     //   .catch(function (error) {
//     //     console.log('fail', error);
//     //   });
    
//     return (
//         <div>
//             <h1>TESTPAGE</h1>
//             {/* <Button variant={'primary'} onClick={getUserlist}>Get All Users</Button> */}
//             <table tw="min-w-full my-3">
//                 <thead>
//                     <tr>
//                         <th
//                             tw="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
//                             Name</th>
//                         <th
//                             tw="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
//                             Σ Balance</th>
//                         <th
//                             tw="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
//                             Σ Allocated Budget</th> 
//                         <th
//                             tw="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
//                             <FontAwesomeIcon icon={faCalendar} size="sm" tw="mr-1"/>Date Added</th>
//                         <th
//                             tw="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
//                             <FontAwesomeIcon icon={faUser} size="sm" tw="mr-1"/>Added By</th>
//                         <th
//                             tw="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
//                             <FontAwesomeIcon icon={faEnvelope} size="sm" tw="mr-1"/>Email</th>
//                     </tr>
//                 </thead>

//                 <tbody tw="bg-white">
//                 {
//                     userlist.map(user => (
//                     <tr key={user.email}>
//                         <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
//                             <div tw="flex items-center">
//                                 <div tw="flex-shrink-0 w-10 h-10">
//                                     <img tw="w-10 h-10 rounded-full" src="https://source.unsplash.com/user/erondu"
//                                         alt="admin dashboard ui"/>
//                                 </div>

//                                 <div tw="ml-4">
//                                     <div tw="text-sm font-medium leading-5 text-gray-900">
//                                     <button onClick={() => setShowModal(true)}>
//                                         {user.full_name}
//                                     </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </td>

//                         <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
//                             <div tw="ml-4">
//                                 <div tw="text-sm font-medium leading-5 text-gray-900">
//                                     {user.budget}
//                                 </div>
//                             </div>
//                         </td>

//                         <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
//                             <div tw="ml-4">
//                                 <div tw="text-sm font-medium leading-5 text-gray-900">
//                                     {user.created_at}
//                                 </div>
//                             </div>
//                         </td>

//                         <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
//                             <div tw="ml-4">
//                                 <div tw="text-sm font-medium leading-5 text-gray-900">
//                                     {user.added_by}
//                                 </div>
//                             </div>
//                         </td>

//                         <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
//                             <div tw="text-sm leading-5 text-gray-500">{user.email}</div>
//                         </td>

//                         <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
//                             <div tw="text-sm leading-5 text-gray-500">{user.email}</div>
//                         </td>
//                     </tr>))
//                 }
//                 <Modal show={showModal} onClose={()=>setShowModal(false)}>
//         <div>
//             <h2>Jane Doe (Full Name)</h2>
//             <p>Data Scientist (Role)</p>
//             <Button>Delete User</Button>
//             <Link>Change Role</Link>
//             <div>
//                 <h3>Privacy Budget</h3>
//                 <p>Current Balance</p>
//                 <p>Allocated Budget</p>
//                 <Button variant={"primary"} isHollow>Adjust Budget</Button>
//             </div>
//             <div>
//                 <h3>Background</h3>
//                 <p>Email:</p>
//                 <p>Company/Institution:</p>
//                 <p>Website/profile:</p>
//             </div>
//             <div>
//                 <h3>System</h3>
//                 <p>Date Added:</p>
//                 <p>Data Access Agreement:</p>
//                 <p>Uploaded On:</p>
//             </div>
//         </div>
//     </Modal>
//                 </tbody>
//             </table>
//             {/* {
//                 userList.map(user => (
//                     <div key={user.email} tw="bg-primary-200 col-span-3 text-white p-3 rounded-2xl">
//                         <div key={user.email}>{user.email}</div>
//                         <div key={user.email}>{user.full_name}</div>
//                         <div key={user.email}>{user.budget}</div>
//                         <div key={user.email}>{user.created_at}</div>
//                         <div key={user.email}>{user.created_at}</div>
//                         <div key={user.email}>{user.added_by}</div>
//                     </div>
//                 ))
//             } */}
//         </div>
//     )
// }