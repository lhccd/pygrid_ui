import React, {useEffect, useRef, useState} from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight, faPlus, faTimes} from "@fortawesome/free-solid-svg-icons";
import tw from "twin.macro";
import Tag from "./Tag"; 
import Button from "./Button"
import ToggleSwitch from "./ToggleSwitch";

import {Disclosure, Switch} from "@headlessui/react"  

export default function AccordionRoles (props) {
    const [active, setActive] = useState(false)
    const [height, setHeight] = useState('0px')
    const [joined, setJoined] = useState("");

    useEffect(() => {}, [joined])

    const onClickLeave = () => {
    Status = false;
        setJoined(false);
    }

    const onClickJoin = () => {
    Status = true;
        setJoined(true);
    }


    return(
        <div>
            <Disclosure>
            {({ open }) => (
                <div css={[open && tw`bg-gray-50`]}> 
                    <Disclosure.Button tw="flex w-full justify-between items-center p-5">
                        <div tw="flex items-start items-center">
                            <div tw="box-border appearance-none cursor-pointer focus:outline-none">
                                <FontAwesomeIcon icon={faChevronRight} size="lg"
                                                    css={[tw`mr-4`,
                                                        (active) && tw`transform duration-700 ease rotate-90`]}/>
                                <p tw="inline-block text-lg text-gray-800 font-bold">{props.info.role}</p>
                            </div>
                        </div>
                    </Disclosure.Button>
                    <Disclosure.Panel tw="overflow-auto duration-700 ease-in-out w-full">
                        <div tw="flex inline-flex items-start w-full p-4">
                            <div tw="divide-y divide-gray-200 mx-8 w-full">
                                <p tw="mb-8">
                                    {props.info.description}
                                </p>
                                <ul id="domain-info" tw="grid grid-cols-6 gap-6 text-left text-sm my-2 py-10">
                                    <li tw="col-span-3 flex space-x-8 items-center">
                                        <ToggleSwitch onToggle={() => props.info.permissions.MakeDataRequests}></ToggleSwitch>
                                        <div tw="block">
                                            <p tw="font-bold">Can Make Data Requests</p>
                                            <p tw="text-gray-400">Allows users to make data requests</p>
                                        </div>
                                    </li>
                                    <li tw="col-span-3 flex space-x-8 items-center">
                                        <ToggleSwitch onToggle={() => props.info.permissions.EditRoles}></ToggleSwitch>
                                        <div tw="block">
                                            <p tw="font-bold">Can Edit Roles</p>
                                            <p tw="text-gray-400">Allows users to edit permissions applied to roles</p>
                                        </div>
                                    </li>
                                    <li tw="col-span-3 flex space-x-8 items-center">
                                        <ToggleSwitch onToggle={() => props.info.permissions.TriageDataRequests}></ToggleSwitch>
                                        <div tw="block">
                                            <p tw="font-bold">Can Triage Data Requests</p>
                                            <p tw="text-gray-400">Allows users to accept or deny data requests</p>
                                        </div>
                                    </li>
                                    <li tw="col-span-3 flex space-x-8 items-center">
                                        <ToggleSwitch onToggle={() => props.info.permissions.UploadData}></ToggleSwitch>
                                        <div tw="block">
                                            <p tw="font-bold">Can Upload Data</p>
                                            <p tw="text-gray-400">Allows user to upload datasets to the domain</p>
                                        </div>
                                    </li>
                                    <li tw="col-span-3 flex space-x-8 items-center">
                                        <ToggleSwitch onToggle={() => props.info.permissions.ManagePrivacyBudgets}></ToggleSwitch>
                                        <div tw="block">
                                            <p tw="font-bold">Can Manage Privacy Budgets</p>
                                            <p tw="text-gray-400">Allows users to adjust privacy budgets and accept or deny upgrade requests</p>
                                        </div>
                                    </li>
                                    <li tw="col-span-3 flex space-x-8 items-center">
                                        <ToggleSwitch onToggle={() => props.info.permissions.UploadLegalDocuments}></ToggleSwitch>
                                        <div tw="block">
                                            <p tw="font-bold">Can Upload Legal Documents</p>
                                            <p tw="text-gray-400">Allows users to upload legal documents in the Domain Configuration settings</p>
                                        </div>
                                    </li>
                                    <li tw="col-span-3 flex space-x-8 items-center">
                                        <ToggleSwitch onToggle={() => props.info.permissions.ManageUsers}></ToggleSwitch>
                                        <div tw="block">
                                            <p tw="font-bold">Can Manage Users</p>
                                            <p tw="text-gray-400">Allows users to accept or deny account requests and reassign roles for users of this domain</p>
                                        </div>
                                    </li>
                                    <li tw="col-span-3 flex space-x-8 items-center">
                                        <ToggleSwitch onToggle={() => props.info.permissions.EditDomainSettings}></ToggleSwitch>
                                        <div tw="block">
                                            <p tw="font-bold">Can Edit Domain Settings</p>
                                            <p tw="text-gray-400">Allows users to edit Domain Profile Configuration settings</p>
                                        </div>
                                    </li>
                                    <li tw="col-span-3 flex space-x-8 items-center">
                                        <ToggleSwitch onToggle={() => props.info.permissions.CreateUsers}></ToggleSwitch>
                                        <div tw="block">
                                            <p tw="font-bold">Can Create Users</p>
                                            <p tw="text-gray-400">Allows users to create or edit users</p>
                                        </div>
                                    </li>
                                    <li tw="col-span-3 flex space-x-8 items-center">
                                        <ToggleSwitch onToggle={() => props.info.permissions.ManageInfrastructure}></ToggleSwitch>
                                        <div tw="block">
                                            <p tw="font-bold">Can Manage Infrastructure</p>
                                            <p tw="text-gray-400">Allows users to delete the node, manage node workers, and adjust auto scaling controls outside of the PyGridUI environment</p>
                                        </div>
                                    </li>
                                </ul>
                                <Button tw="px-2 py-2 mb-5" isSmall variant={"primary"}>Save Changes</Button>
                            </div>
                            {/* <div tw="w-1/2 flex justify-center">
                                <div tw="bg-gray-50 border border-gray-100 rounded p-6 divide-y divide-gray-200 w-max">
                                    <div tw="flex items-center justify-center divide-x divide-gray-200 mb-4">
                                        <div tw="pr-4">
                                            <p tw="text-gray-800 text-xl">HostedDomains</p>
                                            <p tw="text-gray-600 text-sm">Hosted Domains</p>
                                        </div>
                                        <div tw="px-4">
                                            <p tw="text-gray-800 text-xl">HostedDatasets</p>
                                            <p tw="text-gray-600 text-sm">Hosted Datasets</p>
                                        </div>
                                    </div>
                                    <div tw="pt-4">
                                        <div tw="text-gray-600 text-sm font-bold pb-2">All Tags:</div>
                                        <div tw="">tagItems</div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </Disclosure.Panel>
                </div>
                )}
            </Disclosure>
        </div>
    )
}