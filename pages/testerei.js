import axios from 'axios';
import {Link} from 'next';
import {getToken} from "../services/UserService";
import {useState} from 'react';
import tw from 'twin.macro';
import Button from '../components/Button'
import {getUsers} from "../services/UserService";
import {faCalendar, faEnvelope, faPlus, faUser, faUserPlus, faInfoCircle} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Modal from '../components/Modal';

const UserModal = ({show, onClose}) => (
    <Modal show={show} onClose={onClose}>
        <div>
            <h2>Jane Doe (Full Name)</h2>
            <p>Data Scientist (Role)</p>
            <Button>Delete User</Button>
            <Link>Change Role</Link>
            <div>
                <h3>Privacy Budget</h3>
                <p>Current Balance</p>
                <p>Allocated Budget</p>
                <Button variant={"primary"} isHollow>Adjust Budget</Button>
            </div>
            <div>
                <h3>Background</h3>
                <p>Email:</p>
                <p>Company/Institution:</p>
                <p>Website/profile:</p>
            </div>
            <div>
                <h3>System</h3>
                <p>Date Added:</p>
                <p>Data Access Agreement:</p>
                <p>Uploaded On:</p>
            </div>
        </div>
    </Modal>
)
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


import useSWR from 'swr'

function getUserlist(){
    const fetcher = (...args) => fetch(...args).then(res => res.json())
    const { data, error } = useSWR('/api/userlist', fetcher)
    console.log("useSWR in outside function", data)
    return {
        userlist: data,
        isLoading: !error && !data,
        isError: error
    }
}

export default function Testerei(){
    const [showModal, setShowModal] = useState(false);
    const { userlist, isLoading, isError } = getUserlist()
    console.log("useSWR in default function", userlist)
    if (isLoading) return <div>loading...</div>
    // return <div>hello {data}!</div>
    
    function getUserlist2(e){
        e.preventDefault()
        // const Token = getToken()
        const Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDE4Mjc5MDQsInN1YiI6IjgzNWY2MjYwLTUxYjYtNGNlNS1hYjFmLTA0ZjA4MDk5YWY2MyJ9.wqHVG4GzA7-Eolp4ABw_Px6eZDCGThF4FhiSN3BcuMg"
        console.log("testerei, this is the token:", Token)
        axios.get('http://localhost:80/api/v1/users/active-users',{ headers: {'Authorization': `Bearer ${Token}`}})
            .then(res => setUserList(res.data))
            .catch(err => console.log(err))
    }
    // setUserList(getUsers())

    async function getUserlist3() {
        console.log("################################################################################");
        try{
            const apiRes = await fetch(
                "api/userlist",
                {
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                }
            );

            if(apiRes.status == 200){
                const user = await apiRes.json();
                setUserList(user)
            }
            else{
                alert("Couldn't fetch the userlist!");
            }
        }
        catch (error){
            console.log(error);
        }
    }
    
    // const users = getUsers()
    // console.log("THIS is the USERS", getUsers())
    // const Token = getToken()
    // console.log("printing token", `Bearer ${Token}`)
    // // axios.get('http://localhost:80/api/v1/users/active_users', {'Authorization': `Bearer ${Token}`})
    // // .then(function (response) {
    // //     // handle success
    // //     console.log('success', response);
    // // })
    // // .catch(function (error) {
    // //     // handle error
    // //     console.log('error', error);
    // // })
    // var config = {
    //     method: 'get',
    //     url: 'http://localhost:80/api/v1/users/active_users',
    //     headers: { 
    //       'Authorization': `Bearer ${Token}`,
    //     }
    //   };
      
    //   axios(config)
    //   .then(function (response) {
    //     console.log('success', JSON.stringify(response.data));
    //   })
    //   .catch(function (error) {
    //     console.log('fail', error);
    //   });
    
    return (
        <div>
            <h1>TESTPAGE</h1>
            {/* <Button variant={'primary'} onClick={getUserlist}>Get All Users</Button> */}
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
                    userlist.map(user => (
                    <tr key={user.email}>
                        <td tw="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                            <div tw="flex items-center">
                                <div tw="flex-shrink-0 w-10 h-10">
                                    <img tw="w-10 h-10 rounded-full" src="https://source.unsplash.com/user/erondu"
                                        alt="admin dashboard ui"/>
                                </div>

                                <div tw="ml-4">
                                    <div tw="text-sm font-medium leading-5 text-gray-900">
                                    <button onClick={() => setShowModal(true)}>
                                        {user.full_name}
                                    </button>
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
                <Modal show={showModal} onClose={()=>setShowModal(false)}>
        <div>
            <h2>Jane Doe (Full Name)</h2>
            <p>Data Scientist (Role)</p>
            <Button>Delete User</Button>
            <Link>Change Role</Link>
            <div>
                <h3>Privacy Budget</h3>
                <p>Current Balance</p>
                <p>Allocated Budget</p>
                <Button variant={"primary"} isHollow>Adjust Budget</Button>
            </div>
            <div>
                <h3>Background</h3>
                <p>Email:</p>
                <p>Company/Institution:</p>
                <p>Website/profile:</p>
            </div>
            <div>
                <h3>System</h3>
                <p>Date Added:</p>
                <p>Data Access Agreement:</p>
                <p>Uploaded On:</p>
            </div>
        </div>
    </Modal>
                </tbody>
            </table>
            {/* {
                userList.map(user => (
                    <div key={user.email} tw="bg-primary-200 col-span-3 text-white p-3 rounded-2xl">
                        <div key={user.email}>{user.email}</div>
                        <div key={user.email}>{user.full_name}</div>
                        <div key={user.email}>{user.budget}</div>
                        <div key={user.email}>{user.created_at}</div>
                        <div key={user.email}>{user.created_at}</div>
                        <div key={user.email}>{user.added_by}</div>
                    </div>
                ))
            } */}
        </div>
    )
}