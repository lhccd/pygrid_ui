import { Layout } from '../components/Layout'
import { Tab } from '../components/Tab'
import tw, {styled} from 'twin.macro'
import {faUsers} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Modal from '../components/Modal'
import {useState, useEffect} from 'react';
import axios from 'axios';
import {getToken, decodeToken} from '../lib/auth'
import {useRouter} from 'next/router'
import HttpService from '../services/HttpService'

// export const getStaticProps = async () => {
//     const res = await fetch('http://localhost:80/api/v1/users/active_users');
//     const data = await res.json();
//     return(
//         console.log(data)
//     )
// }

export default function Users() {
    const isAuthenticated = getToken()
    const router = useRouter()
    const access_token = decodeToken()

    // if (typeof window !== 'undefined'){
    //     if (isAuthenticated){
    //         (async () => {
    //             const response = await axios.get('http://localhost:80/api/v1/users/active_users',{
    //                 headers: {
    //                     'Authorization': `token ${access_token}`
    //                 }})
    //                 .then((res)=>{
    //                     console.log(access_token)
    //                     console.log(res.data)
    //                 })
    //                 .catch((error)=>{
    //                     console.error(error)
    //                 })
    //         })()

    return(
        <Layout>
            <div tw="col-span-12">
                <div tw="flex items-center">
                    <div tw="flex p-2 mb-2">
                        <FontAwesomeIcon size="3x" icon={faUsers} tw="mr-3"/>
                        <h1 tw="text-5xl font-rubik font-medium">Users</h1>
                    </div>
                </div>
                <p tw="mb-8">Manage users, edit user permissions and credentials.</p>
                <Tab></Tab>
            </div>
        </Layout>
    )
    //     }else{
    //         router.replace('/login')
    //         return null
    //     }
    // }
    // return null
}