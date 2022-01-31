import { Layout } from '../../../components/Layout'
import tw, {styled} from 'twin.macro'
import {faHandsHelping, faSearch, faUsers} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {getToken, decodeToken} from '../../../lib/auth'
import {useRouter} from 'next/router'
import AccordionUpgrade from "../../../components/AccordionUpgrade";


const UnitedNations = [
    {
        Name: 'United Nations',
        MemberSince: '2021-JUL-14 10:31',
        ID: '21a68e773ba747f0a4b6169bf28e8bed',
        URL: 'https://un.openmined.org',
        Description: 'The UN hosts data related to the commodity and...',
        HostedDomains: 0,
        HostedDatasets: 0,
        Tags: ["Commodities", "Census"],
        Status: true
    }
]

const WorldHealthOrganization = [
    {
        Name: 'World Health Organization',
        MemberSince: '',
        ID: '21a68e773ba747f0a4b6169bf28e8bed',
        URL: 'https://who.openmined.org',
        Description: 'The World Health Organization hosts data related to...',
        HostedDomains: 0,
        HostedDatasets: 0,
        Tags: ["Health"],
        Status: false
    }
]

export default function Networks() {
    const [networks, setNetworks] = useState([WorldHealthOrganization, UnitedNations])

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