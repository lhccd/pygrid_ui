import axios from 'axios';
import { useEffect, useState } from 'react';
import {Link} from 'next';
import tw from 'twin.macro';
import {faCalendar, faTrash, faEnvelope, faPlus, faUser, faUserPlus, faInfoCircle} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { Layout } from '../../../components/Layout'
import Tag from '../../../components/Tag'
import Button from '../../../components/Button';
import Modal from '../../../components/Modal';
import useSWR from 'swr'
import {useRouter} from 'next/router'

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
    const body = JSON.stringify(query);
    const res = await fetch(`api/user-detail`, {
        method: 'POST',
        headers: {
            "Accept": "application/json"
        },
        body: body
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

async function adjustBudget(email, budget){
    console.log("adjustBudget Called", {email})
    try{
        const body = JSON.stringify({"email": email, "budget":budget})
        console.log("requesting put", body)
        const apiRes = await fetch('/api/adjust_budget_by_id',
            {
                method: "PUT",
                headers:{
                    'Accept': "application/json",
                    'Content-Type': "application/json"
                },
                body: body
            });
        const data = await apiRes.json()
        console.log("ADJUST BUDGET BY ID outside returns", data)
    }
    catch(error) {
        console.log("error in updateUserByID", error)
    }
}

function AdjustBudgetModal({show, onClose, data}){
    console.log("adjustbudgetmodal data", data)

    const [balance, setBalance] = useState(()=>{return data.budget})
    const [budget, setBudget] = useState(()=>{return 10.0})

    function incrementBudget(){
        setBudget(prevCount => prevCount + 1)
    }
    function decrementBudget(){
        setBudget(prevCount => prevCount - 1)
    }

    const onUpgrade = ()=> {
        console.log("budget", budget)
        setBalance(budget);
        console.log("balance", balance)
        adjustBudget(data.email, budget)
        onClose();
        console.log("onUpgrade", data.email, balance, budget)
    }

    useEffect(()=>{
        
    }, [balance])
    
    return(
        <Modal show={show} onClose={onClose}>
            <div tw="grid grid-cols-12 text-left p-6 rounded-lg gap-4">
                <div tw="col-span-full flex-col items-center">
                    <h2 tw="font-bold text-4xl my-6 text-gray-800">∑</h2>
                    <h2 tw="font-bold text-4xl my-6 text-gray-800">Upgrade Budget</h2>
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
                    <div tw="flex border border-gray-200 rounded justify-between">
                        <Button tw='bg-gray-200 text-white' isSmall onClick={decrementBudget}>-</Button>
                        <p tw="px-8 py-2 text-center text-lg">{budget}</p>
                        <Button tw='bg-gray-200 text-white' isSmall onClick={incrementBudget}>+</Button>
                    </div>
                </div>
               <div tw="col-span-full flex justify-between">
                   <Button variant={"primary"} isHollow onClick={onClose}>Cancel</Button>
                   <Button variant={"primary"} onClick={onUpgrade}>Upgrade</Button>
               </div>
            </div>
        </Modal>
    )
}

export default function Testerei({ data }){
    const [showAdjustBudgetModal, setShowAdjustBudgetModal] = useState(false)
    console.log("dynamic routing", data)
    const router = useRouter()
    const refreshData = () => {
        router.replace(router.asPath);
    }
    useEffect(()=>{
        console.log("refresh data?")
        refreshData();
    }, [showAdjustBudgetModal])

    return (
        <Layout>
            <div tw="col-start-3 col-end-10 h-auto">
                <div tw="col-span-full flex items-center justify-between my-5">
                    <div tw="flex space-x-3 items-center">
                        <h2 tw="font-bold text-4xl text-gray-800">{data.full_name}</h2>
                        <Tag>Data Scientist</Tag>
                    </div>
                    <Button tw="float-right" tw="space-x-3 text-gray-400"><FontAwesomeIcon size="sm" icon={faTrash}/>  Delete User</Button>
                </div>
                <p tw="col-span-full">Change Role</p> 
                
                <h3 tw="col-span-full font-bold mt-10 text-gray-600">Privacy Budget</h3>
                <div tw="col-span-full flex bg-gray-50 items-center justify-between border border-gray-100 rounded p-4 space-x-3">
                    <div>
                        <p tw="text-error-400 font-bold">{data.budget} ɛ</p>
                        <p>Current Balance</p>
                    </div>
                    <div>
                        <p tw="text-gray-800 font-bold">10.00 ɛ</p>
                        <p>Allocated Budget</p>
                    </div>
                    <Button variant={"primary"} onClick={() => setShowAdjustBudgetModal(true)} isSmall isHollow>Adjust Budget</Button>
                    <AdjustBudgetModal show={showAdjustBudgetModal} onClose={()=>setShowAdjustBudgetModal(false)} data={data}/>
                </div>
                <h3 tw="col-span-full font-bold mt-10 text-gray-600">Background</h3>
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
                <h3 tw="col-span-full font-bold mt-10 text-gray-600">System</h3>
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
            </div>
        </Layout>
    )
}