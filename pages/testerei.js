import axios from 'axios';
import {getToken} from "../services/UserService";
import {useState} from 'react';
import tw from 'twin.macro';
import Button from '../components/Button'
import {getUsers} from "../services/UserService";
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

export default function Testerei(){
    const [userList, setUserList] = useState([]);

    function getUserlist(e){
        e.preventDefault()
        const Token = getToken()
        axios.get('http://localhost:80/api/v1/users/active_users',{ headers: {'Authorization': `Bearer ${Token}`}})
            .then(res => setUserList(res.data))
            .catch(err => console.log(err))
    }
    // setUserList(getUsers())
    console.log("ON site ", userList)

 
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
            <Button variant={'primary'} onClick={getUserlist}>Get All Users</Button>{
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
            }
        </div>
    )
}