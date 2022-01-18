import axios from 'axios';
import {Link} from 'next';
import tw from 'twin.macro';
import {faCalendar, faEnvelope, faPlus, faUser, faUserPlus, faInfoCircle} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { Layout } from '../../../components/Layout'
import Tag from '../../../components/Tag'
import Button from '../../../components/Button';
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

const defaultEndpoint = 'https://rickandmortyapi.com/api/character/'
const API_URL = "http://localhost/api/v1/users/user-detail?user_email="

import cookie from "cookie"

// WORKING getServerSideProps!!!! 
export async function getServerSideProps({ query }){
    const access = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDMyMDg1MTEsInN1YiI6IjExNmMwOWZhLWYwYWMtNDhmMC04YTEyLTBhNGZkNjcwYTUyOSJ9.ZTVQuKhYcK-kzAsRYG_H_Yu0z3J1teUpOGIPRzkdSYw'
    const { email } = query;
    const res = await fetch(`${API_URL}${email}`, { 
        method: 'get', 
        headers: {
            "Accept": "application/json", "Authorization": `Bearer ${access}`
        }
    })
    const data = await res.json();
    console.log("res", res, "data", data)
    return{
        props: {
            data
        }
    }
}

export async function getServerSidePropsTESTrickAndMortyAPI({ query }){
    const { email } = query;
    const res = await fetch(`${defaultEndpoint}/${email}`)
    const data = await res.json();
    console.log("res", res, "data", data)
    return{
        props: {
            data
        }
    }
}

export default function Testerei({ data }){
    console.log("dynamic routing", data)
    return (
        <Layout>
            <h1>TESTPAGE</h1>
            <div tw="col-span-full flex items-center justify-between">
                <div tw="flex space-x-3 items-center">
                    <h2 tw="font-bold text-4xl text-gray-800">{data.full_name}</h2>
                    <Tag>Data Scientist</Tag>
                </div>
                <Button tw="float-right">Delete User</Button>
            </div>
            <p tw="col-span-full">Change Role</p> 

            <h3 tw="col-span-full font-bold mt-3 text-gray-600">Privacy Budget</h3>
            <div tw="col-span-full flex bg-gray-50 items-center justify-between border border-gray-100 rounded p-4 space-x-3">
                <div>
                    <p tw="text-error-400 font-bold">{data.budget} ɛ</p>
                    <p>Current Balance</p>
                </div>
                <div>
                    <p tw="text-gray-800 font-bold">10.00 ɛ</p>
                    <p>Allocated Budget</p>
                </div>
                <Button variant={"primary"} isSmall isHollow>Adjust Budget</Button>
            </div>
            <h3 tw="col-span-full font-bold mt-3 text-gray-600">Background</h3>
            <div tw="col-span-full flex-col border border-gray-100 rounded p-4 space-y-3">
                <div tw="flex space-x-3">
                    <p tw="font-bold text-gray-600">Email:</p>
                    <p>{data.email}</p>
                </div>
                <div tw="flex space-x-3">
                    <p tw="font-bold text-gray-600">Company/Institution:</p>
                    <p>{data.institution}</p>
                </div>
                <div tw="flex space-x-3">
                    <p tw="font-bold text-gray-600">Website/profile:</p>
                    <p>{data.website}</p>
                </div>
            </div>
            <h3 tw="col-span-full font-bold mt-3 text-gray-600">System</h3>
            <div tw="col-span-full flex-col border border-gray-100 rounded p-4 space-y-3">
                <div tw="flex space-x-3">
                    <p tw="font-bold text-gray-600">Date Added:</p>
                    <p>{data.added_by}</p>
                </div>
                <div tw="flex space-x-3">
                    <p tw="font-bold text-gray-600">Data Access Agreement:</p>
                    <p>{data.daa_pdf}</p>
                </div>
                <div tw="flex space-x-3">
                    <p tw="font-bold text-gray-600">Uploaded On:</p>
                    <p>{data.created_at}</p>
                </div>
            </div>
        </Layout>
    )
}