import React, {useEffect, useRef, useState} from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCaretUp,
    faCheckCircle,
    faChevronRight,
    faPlus,
    faSearch,
    faTimes,
    faTimesCircle
} from "@fortawesome/free-solid-svg-icons";
import tw from "twin.macro";
import Tag from "./Tag";

import {Disclosure} from "@headlessui/react"
import Button from "./Button";

export default function Accordion (props) {
    const [active, setActive] = useState(false)
    const [height, setHeight] = useState('0px')
    const [joined, setJoined] = useState(props.info[0].Status);

    const contentSpace = useRef(null)

    function toggleAccordion() {
        setActive(!active)
        setHeight(active ? '0px' : `${contentSpace.current.scrollHeight}px`)
    }

    useEffect(() => {}, [joined])

    const onClickLeave = () => {
        props.info[0].Status = false;
        setJoined(false);
    }

    const onClickJoin = () => {
        props.info[0].Status = true;
        setJoined(true);
    }

    return(
        <div tw="p-5">
            <Disclosure>
                <Disclosure.Button tw="flex w-full justify-between items-center">
                    <div tw="flex items-start items-center">
                        <div tw="box-border appearance-none cursor-pointer focus:outline-none">
                            <FontAwesomeIcon icon={faChevronRight} size="lg"
                                                css={[tw`mr-4`,
                                                    (active) && tw`transform duration-700 ease rotate-90`]}/>
                            <p tw="inline-block text-lg text-gray-800 font-bold">{props.info[0].Name}</p>
                        </div>
                        <div tw="flex inline-flex ml-4">
                            <Tag variant={"gray"} tw="">
                                <div tw="font-bold">{props.info[0].CurrentBudget} ɛ</div>
                            </Tag>
                            <p tw="text-gray-600 text-sm mr-2">+</p>
                            <Tag variant={"primary"} tw="">
                                <div tw="font-bold">{props.info[0].BudgetRequest} ɛ</div>
                            </Tag>
                        </div>
                    </div>
                    <div tw="space-x-3">
                        <a tw="text-gray-600">{props.info[0].RequestedOn}</a>
                        <button><FontAwesomeIcon size="lg" icon={faCheckCircle} title="Accept" tw="text-gray-200 hover:text-success-500" /></button>
                        <button><FontAwesomeIcon size="lg" icon={faTimesCircle} title="Decline" tw="text-gray-200 hover:text-error-500" /></button>
                    </div>
                </Disclosure.Button>
                <Disclosure.Panel tw="overflow-auto duration-700 ease-in-out w-full">
                    <div tw="flex inline-flex items-start w-full">
                        <div tw="w-1/2 flex justify-center">
                            <div tw="bg-gray-50 border border-gray-100 rounded p-8 mt-8 divide-y divide-gray-200 w-max">
                                <div tw="flex items-center divide-x divide-gray-200 mb-4">
                                    <div tw="pr-4">
                                        <p tw="text-gray-800 text-lg text-error-600 font-bold">{props.info[0].CurrentBalance} ɛ</p>
                                        <p tw="text-gray-600 text-sm">Current Balance</p>
                                    </div>
                                    <div tw="px-4">
                                        <p tw="text-gray-800 text-lg font-bold">{props.info[0].AllocatedBudget} ɛ</p>
                                        <p tw="text-gray-600 text-sm">Allocated Budget</p>
                                    </div>
                                </div>
                                <div tw="flex items-center justify-center pt-4">
                                    <div tw="pr-4">
                                        <div tw="flex inline-flex items-center">
                                            <p tw="text-gray-800 text-lg font-bold">{props.info[0].CurrentBudget} ɛ</p>
                                            <p tw="text-primary-600 text-lg font-bold ml-2">+</p>
                                            <Tag variant={"primary"} tw="">
                                                <div tw="font-bold">{props.info[0].BudgetRequest} ɛ</div>
                                            </Tag>
                                        </div>
                                        <p tw="text-gray-600 text-sm">Current Budget</p>
                                    </div>
                                    <div tw="px-4">
                                        <FontAwesomeIcon icon={faChevronRight} size="lg" tw="text-gray-400"/>
                                    </div>

                                    <div tw="px-4">
                                        <div tw="flex inline-flex items-center">
                                            <p tw="text-gray-800 text-lg font-bold mr-2">{props.info[0].BudgetRequest+props.info[0].CurrentBudget} ɛ</p>
                                            <Tag variant={"primary"} tw="">
                                                <div tw="font-bold">{props.info[0].BudgetRequest} <FontAwesomeIcon icon={faCaretUp}/></div>
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
                                    <li tw="py-2" key={props.info[0].Role.key}>
                                        <a tw="font-bold text-gray-700">Role: </a>
                                        <Tag variant={"primary"} tw="text-primary-600 text-xs"><div tw="font-bold">{props.info[0].Role}</div></Tag>
                                    </li>
                                    <li tw="py-2" key={props.info[0].Email.key}>
                                        <a tw="font-bold text-gray-700">Email: </a>
                                        <a tw="text-gray-600 underline" href={"mailto:"+props.info[0].Email}>{props.info[0].Email}</a>
                                    </li>
                                    <li tw="py-2" key={props.info[0].Company.key}>
                                        <a tw="font-bold text-gray-700">Company/Institution: </a>
                                        <a tw="text-gray-600">{props.info[0].Company}</a>
                                    </li>
                                    <li tw="py-2" key={props.info[0].Website.key}>
                                        <a tw="font-bold text-gray-700">Website/Profile: </a>
                                        <a tw="text-gray-600 underline" href={props.info[0].Website}>{props.info[0].Website}</a>
                                    </li>
                                    <li tw="py-2" key={props.info[0].Reason.key}>
                                        <a tw="font-bold text-gray-700">Reason: </a>
                                        <a tw="text-gray-600">{props.info[0].Reason}</a>
                                    </li>
                                </ul>
                                <a tw="underline text-primary-600" href="">View User Profile</a>
                            </div>
                            <p tw="pt-4">
                                {props.info[0].Description}
                            </p>
                        </div>
                    </div>
                </Disclosure.Panel>
            </Disclosure>
        </div>
    )

    // return (
    //     <div tw="p-5">
    //         <div tw="flex justify-between w-full">
    //             <div tw="flex items-start items-center">
    //                 <button
    //                     tw="box-border appearance-none cursor-pointer focus:outline-none"
    //                     onClick={toggleAccordion}
    //                 >
    //                     <FontAwesomeIcon icon={faChevronRight} size="lg"
    //                                      css={[tw`mr-4`,
    //                                          (active) && tw`transform duration-700 ease rotate-90`]}/>
    //                     <p tw="inline-block text-lg text-gray-800 font-bold">{props.info[0].Name}</p>
    //                 </button>
    //                 {props.info[0].Status ?
    //                     <div tw="bg-primary-100 inline-block mr-2 px-2 py-1 ml-2 text-xs font-bold text-primary-600 rounded shadow-sm flex-shrink-0">
    //                         Guest
    //                     </div>
    //                     :
    //                     <p tw="text-gray-600 text-sm ml-2">(not a member)</p>
    //                 }
    //             </div>
    //             <div>
    //                 {props.info[0].Status ?
    //                     <button tw="text-error-500 border border-error-500 rounded bg-white text-center font-bold px-3 py-2 whitespace-nowrap" type="button"
    //                             onClick={onClickLeave}
    //                     >
    //                         Leave Network
    //                     </button>
    //                     :
    //                     <button tw="text-primary-500 border border-primary-500 rounded bg-white text-center font-bold px-3 py-2 whitespace-nowrap" type="button"
    //                             onClick={onClickJoin}
    //                     >
    //                         Join as Guest
    //                     </button>
    //                 }
    //             </div>
    //         </div>
    //         <div
    //             ref={contentSpace}
    //             style={{ maxHeight: `${height}` }}
    //             tw="overflow-auto duration-700 ease-in-out w-full"
    //         >
    //             <div tw="flex inline-flex items-start w-full p-4">
    //                 <div tw="divide-y divide-gray-200 ml-8 w-1/2">
    //                     <div tw="">
    //                         <ul id="domain-info" tw="text-left text-sm my-2">
    //                             <li tw="py-2" key="name">
    //                                 <a tw="font-bold text-gray-700">Member Since: </a>
    //                                 <a tw="font-mono">{props.info[0].MemberSince}</a>
    //                             </li>
    //                             <li tw="py-2" key="id">
    //                                 <a tw="font-bold text-gray-700">ID#: </a>
    //                                 <a>{props.info[0].ID}</a>
    //                             </li>
    //                             <li tw="py-2" key="datasets">
    //                                 <a tw="font-bold text-gray-700">URL: </a>
    //                                 <a tw="font-mono">{props.info[0].URL}</a>
    //                             </li>
    //                         </ul>
    //                     </div>
    //                     <p tw="pt-4">
    //                         {props.info[0].Description}
    //                     </p>
    //                 </div>
    //                 <div tw="w-1/2 flex justify-center">
    //                     <div tw="bg-gray-50 border border-gray-100 rounded p-6 divide-y divide-gray-200 w-max">
    //                         <div tw="flex items-center justify-center divide-x divide-gray-200 mb-4">
    //                             <div tw="pr-4">
    //                                 <p tw="text-gray-800 text-xl">{props.info[0].HostedDomains}</p>
    //                                 <p tw="text-gray-600 text-sm">Hosted Domains</p>
    //                             </div>
    //                             <div tw="px-4">
    //                                 <p tw="text-gray-800 text-xl">{props.info[0].HostedDatasets}</p>
    //                                 <p tw="text-gray-600 text-sm">Hosted Datasets</p>
    //                             </div>
    //                         </div>
    //                         <div tw="pt-4">
    //                             <div tw="text-gray-600 text-sm font-bold pb-2">All Tags:</div>
    //                             <div tw="">{tagItems}</div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // )

}