import React, {useEffect, useRef, useState} from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCaretUp,
    faCheckCircle,
    faChevronRight,
    faChevronDown,
    faPlus,
    faSearch,
    faTimes,
    faTimesCircle
} from "@fortawesome/free-solid-svg-icons";
import tw from "twin.macro";
import Tag from "./Tag";

import {Disclosure} from "@headlessui/react"
import Button from "./Button";
import moment from "moment";
import axios from "axios";

export default function Accordion (props) {
    const [user, setUser] = useState([])
    const [role, setRole] = useState("")

    useEffect(() => {
        getUser()
    }, [])

    async function getUser() {
        try{
            const apiRes = await fetch(
                "api/get_user_by_id",
                {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id: props.info.request_owner
                    })
                }
            );

            if(apiRes.status == 200){
                const user = await apiRes.json();
                setUser(user)
            }
    }
        catch (error){
            console.log(error)
        }
    }

    useEffect(async() => {
        try{
            const roleRes = await axios(
                {
                    url: "api/role-of-user",
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    params: {
                        email: user.email
                    }
                }
            );

            if(roleRes.status == 200){
                const userRole = await roleRes.data;
                setRole(userRole)
            }
        }
        catch (error){
            console.log(error)
        }
    }, [user])

    const acceptRequest = () => {
        props.openModal()
        props.setId(props.info.id)
        props.setUpdate("accept")
    }
    const rejectRequest = () => {
        props.openModal()
        props.setId(props.info.id)
        props.setUpdate("reject")
    }

    return(
        <div tw="p-5">
            <Disclosure>
            {({ open }) => (
                <>
                <div tw="flex w-full justify-between items-center">
                    <Disclosure.Button tw="flex items-start items-center">
                        <div tw="box-border appearance-none cursor-pointer focus:outline-none">
                            { open ?
                                <FontAwesomeIcon icon={faChevronDown} size="lg" css={[tw`mr-4`]}/>
                                :
                                <FontAwesomeIcon icon={faChevronRight} size="lg" css={[tw`mr-4`, (open) && tw`transform duration-700 ease rotate-90`]}/>
                            }
                            <p tw="inline-block text-lg text-gray-800 font-bold">{user.full_name}</p>
                        </div>
                        <div tw="flex inline-flex ml-4">
                            <Tag variant={"gray"} tw="">
                                <div tw="font-bold">{props.info.initial_budget} ɛ</div>
                            </Tag>
                            <p tw="text-gray-600 text-sm mr-2">+</p>
                            <Tag variant={"primary"} tw="">
                                <div tw="font-bold">{props.info.requested_budget} ɛ</div>
                            </Tag>
                        </div>
                    </Disclosure.Button>
                    <div tw="space-x-3">
                        <a tw="text-gray-600">{moment(props.info.request_date).format('YYYY-MMM-DD HH:MM')}</a>
                        <button><FontAwesomeIcon size="lg" icon={faCheckCircle} title="Accept" tw="text-gray-200 hover:text-success-500" onClick={acceptRequest}/></button>
                        <button><FontAwesomeIcon size="lg" icon={faTimesCircle} title="Decline" tw="text-gray-200 hover:text-error-500" onClick={rejectRequest}/></button>
                    </div>
                </div>
                <Disclosure.Panel tw="overflow-auto duration-700 ease-in-out w-full">
                    <div tw="flex inline-flex items-start w-full">
                        <div tw="w-1/2 flex justify-center">
                            <div tw="bg-gray-50 border border-gray-100 rounded p-8 mt-8 divide-y divide-gray-200 w-max">
                                <div tw="flex items-center divide-x divide-gray-200 mb-4">
                                    <div tw="pr-4">
                                        <p tw="text-gray-800 text-lg text-error-600 font-bold">{user.budget} ɛ</p>
                                        <p tw="text-gray-600 text-sm">Current Balance</p>
                                    </div>
                                    <div tw="px-4">
                                        <p tw="text-gray-800 text-lg font-bold">{user.allocated_budget} ɛ</p>
                                        <p tw="text-gray-600 text-sm">Allocated Budget</p>
                                    </div>
                                </div>
                                <div tw="flex items-center justify-center pt-4">
                                    <div tw="pr-4">
                                        <div tw="flex inline-flex items-center">
                                            <p tw="text-gray-800 text-lg font-bold">{props.info.initial_budget} ɛ</p>
                                            <p tw="text-primary-600 text-lg font-bold ml-2">+</p>
                                            <Tag variant={"primary"} tw="">
                                                <div tw="font-bold">{props.info.requested_budget} ɛ</div>
                                            </Tag>
                                        </div>
                                        <p tw="text-gray-600 text-sm">Current Budget</p>
                                    </div>
                                    <div tw="px-4">
                                        <FontAwesomeIcon icon={faChevronRight} size="lg" tw="text-gray-400"/>
                                    </div>

                                    <div tw="px-4">
                                        <div tw="flex inline-flex items-center">
                                            <p tw="text-gray-800 text-lg font-bold mr-2">{props.info.requested_budget+props.info.initial_budget} ɛ</p>
                                            <Tag variant={"primary"} tw="">
                                                <div tw="font-bold">{props.info.requested_budget} <FontAwesomeIcon icon={faCaretUp}/></div>
                                            </Tag>
                                        </div>
                                        <p tw="text-gray-600 text-sm">Requested Budget</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div tw="px-4 w-1/2">
                            <div tw="text-sm ">
                                <ul id="domain-info" tw="mb-2">
                                    <li tw="py-2" key={user.role?.key}>
                                        <a tw="font-bold text-gray-700">Role: </a>
                                        <Tag variant={"primary"} tw="text-primary-600 text-xs"><div tw="font-bold">{role}</div></Tag>
                                    </li>
                                    <li tw="py-2" key={user.email?.key}>
                                        <a tw="font-bold text-gray-700">Email: </a>
                                        <a tw="text-gray-600 underline" href={"mailto:"+0}>{user.email}</a>
                                    </li>
                                    <li tw="py-2" key={user.institution?.key}>
                                        <a tw="font-bold text-gray-700">Company/Institution: </a>
                                        <a tw="text-gray-600">{user.institution}</a>
                                    </li>
                                    <li tw="py-2" key={user.website?.key}>
                                        <a tw="font-bold text-gray-700">Website/Profile: </a>
                                        <a tw="text-gray-600 underline" href={user.website}>{user.website}</a>
                                    </li>
                                    <li tw="py-2" key={props.info.reason?.key}>
                                        <a tw="font-bold text-gray-700">Reason: </a>
                                        <a tw="text-gray-600">{props.info.reason}</a>
                                    </li>
                                </ul>
                                <a tw="underline text-primary-600" href="">View User Profile</a>
                            </div>
                        </div>
                    </div>
                </Disclosure.Panel>
                </>)}
            </Disclosure>
        </div>
    )
}