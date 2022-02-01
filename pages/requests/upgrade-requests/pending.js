import { Layout } from '../../../components/Layout'
import tw, {styled} from 'twin.macro'
import {faHandsHelping, faSearch, faUsers} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {getToken, decodeToken} from '../../../lib/auth'
import {useRouter} from 'next/router'
import AccordionUpgrade from "../../../components/AccordionUpgrade";


const JaneDoe = [
    {
        ID: '21a68e773ba747f0a4b6169bf28e8bed',
        Name: 'Jane Doe',
        RequestedOn: '2021-JUL-14 10:31',
        CurrentBalance: 10,
        AllocatedBudget: 10,
        CurrentBudget: 10,
        BudgetRequest: 12,
        Role: 'Data Scientist',
        Email: 'jane.doe@gmail.com',
        Company: 'OpenMined',
        Website: 'https://www.openmined.org',
        Reason: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        Status: 'Pending'
    }
]

const Berke = [
    {
        ID: '21a68es27baf474f0a4h616dbf2gef8be4d',
        Name: 'Berke Atropat',
        RequestedOn: '2021-JUL-16 20:39',
        CurrentBalance: 22,
        AllocatedBudget: 22,
        CurrentBudget: 22,
        BudgetRequest: 18,
        Role: 'Data Scientist',
        Email: 'berke.atropat@gmail.com',
        Company: 'TUM',
        Website: 'https://www.tum.de',
        Reason: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        Status: 'Pending'
    }
]

export default function Networks() {
    const [networks, setNetworks] = useState([JaneDoe, Berke])

    const networkItems = networks.map((info) =>
        <AccordionUpgrade info={info}/>
    );

    return(
        <div tw="col-start-2 col-end-12 mt-6">
            <div tw="my-10">
                <div tw="w-96 flex content-center border border-gray-300 rounded-lg p-2 focus:shadow-active hover:shadow-active active:ring-primary-500 active:text-gray-800">
                    <FontAwesomeIcon icon={faSearch} tw="mx-2 my-1 mr-4"/>
                    <input
                        name="search"
                        type="text"
                        placeholder="Search"
                        tw="w-full focus:outline-none"
                    />
                </div>
            </div>
            <div tw="border border-gray-200 rounded-lg divide-y divide-gray-200">{networkItems}</div>
        </div>
    )
    //     }else{
    //         router.replace('/login')
    //         return null
    //     }
    // }
    // return null
}