import React, {useEffect, useRef, useState} from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight, faChevronDown, faPlus, faTimes, faExclamationCircle, faExclamationTriangle, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import tw from "twin.macro";
import Tag from "./Tag"; 
import Button from "./Button"
import ToggleSwitch from "./ToggleSwitch";
import Alert from "./Alert";
import axios from 'axios';

import {Disclosure, Switch} from "@headlessui/react"  

export default function AccordionRoles (props) {
    // console.log("ACCORDIONROLES props", props)
    const [active, setActive] = useState(false);
    const [height, setHeight] = useState('0px');
    const [role, setRole] = useState('');
    const [description, setDescription] = useState('');
    const [makeDataRequests, setMakeDataRequests] = useState(false);
    const [editRoles, setEditRoles] = useState(false);
    const [triageDataRequests, setTriageDataRequests] = useState(false);
    const [uploadData, setUploadData] = useState(false);
    const [managePrivacyBudgets, setManagePrivacyBudgets] = useState(false);
    const [uploadLegalDocuments, setUploadLegalDocuments] = useState(false);
    const [manageUsers, setManageUsers] = useState(false);
    const [editDomainSettings, setEditDomainSettings] = useState(false);
    const [createUsers, setCreateUsers] = useState(false);
    const [manageInfrastructure, setManageInfrastructure] = useState(false);


    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [variant, setVariant] = useState('primary');

    useEffect(()=>{
        setRole(props.role)
        setDescription(props.description)
        setMakeDataRequests(props.permissions.MakeDataRequests);
        setEditRoles(props.permissions.EditRoles);
        setTriageDataRequests(props.permissions.TriageDataRequests);
        setUploadData(props.permissions.UploadData);
        setManagePrivacyBudgets(props.permissions.ManagePrivacyBudgets);
        setUploadLegalDocuments(props.permissions.UploadLegalDocuments);
        setManageUsers(props.permissions.ManageUsers);
        setEditDomainSettings(props.permissions.EditDomainSettings);
        setCreateUsers(props.permissions.CreateUsers);
        setManageInfrastructure(props.permissions.ManageInfrastructure);
    }, [props])

    async function updatePermissions(){
        try{
            const apiRes = await axios(
                {
                    method: 'PUT',
                    url: `api/role-by-domain`,
                    headers: {
                        "Accept": "application/json",
                    },
                    data : {
                        role_name: role,
                        MakeDataRequests: makeDataRequests,
                        EditRoles: editRoles,
                        TriageDataRequests: triageDataRequests,
                        UploadData: uploadData,
                        ManagePrivacyBudgets: managePrivacyBudgets,
                        UploadLegalDocuments: uploadLegalDocuments,
                        ManageUsers: manageUsers,
                        EditDomainSettings: editDomainSettings,
                        CreateUsers: createUsers,
                        ManageInfrastructure: manageInfrastructure
                    }
                });
            if(apiRes.status == 200){
                setVariant('success');
                setAlertMessage('User profile information successfully changed')
                setShowAlert(true);
            }
            else{
                setVariant('error');
                setAlertMessage("Couldn't update the user profile")
                setShowAlert(true);
            }

        }
        catch (e) {
            console.log("Couldn't fetch the role");
        }

    };

    return(
        <div>
            <div tw="absolute right-0 flex w-1/3 z-50">
                <Alert show={showAlert} onClose={() => setShowAlert(false)} variant={variant} autoDelete={true} autoDeleteTime={3000}>
                    <FontAwesomeIcon icon={faExclamationCircle} size="2x" tw=""/>
                    <p>{alertMessage}</p>
                </Alert>
            </div>
            <Disclosure>
            {({ open }) => (
                <div css={[open && tw`bg-gray-50`]}> 
                    <Disclosure.Button tw="flex w-full justify-between items-center p-5">
                        <div tw="flex items-start items-center">
                            <div tw="box-border appearance-none cursor-pointer focus:outline-none">
                                { open ? 
                                    <FontAwesomeIcon icon={faChevronDown} size="lg" css={[tw`mr-4`, (active) && tw`transform duration-700 ease rotate-90`]}/>
                                    : 
                                    <FontAwesomeIcon icon={faChevronRight} size="lg" css={[tw`mr-4`, (active) && tw`transform duration-700 ease rotate-90`]}/>
                                }
                                <p tw="inline-block text-lg text-gray-800 font-bold">{role}</p>
                            </div>
                        </div>
                    </Disclosure.Button>
                    <Disclosure.Panel tw="overflow-auto duration-700 ease-in-out w-full">
                        <div tw="flex inline-flex items-start w-full p-4">
                            <div tw="divide-y divide-gray-200 mx-8 w-full">
                                <p tw="mb-8">
                                    {description}
                                </p>
                                <ul id="domain-info" tw="grid grid-cols-6 gap-6 text-left text-sm my-2 py-10">
                                    <li tw="col-span-3 flex space-x-8 items-center">
                                        <ToggleSwitch toggleProp={makeDataRequests} onToggle={() => setMakeDataRequests(!makeDataRequests)}></ToggleSwitch>
                                        <div tw="block">
                                            <p tw="font-bold">Can Make Data Requests</p>
                                            <p tw="text-gray-400">Allows users to make data requests</p>
                                        </div>
                                    </li>
                                    <li tw="col-span-3 flex space-x-8 items-center">
                                        <ToggleSwitch toggleProp={editRoles} onToggle={() => setEditRoles(!editRoles)}></ToggleSwitch>
                                        <div tw="block">
                                            <p tw="font-bold">Can Edit Roles</p>
                                            <p tw="text-gray-400">Allows users to edit permissions applied to roles</p>
                                        </div>
                                    </li>
                                    <li tw="col-span-3 flex space-x-8 items-center">
                                        <ToggleSwitch toggleProp={triageDataRequests} onToggle={() => setTriageDataRequests(!triageDataRequests)}></ToggleSwitch>
                                        <div tw="block">
                                            <p tw="font-bold">Can Triage Data Requests</p>
                                            <p tw="text-gray-400">Allows users to accept or deny data requests</p>
                                        </div>
                                    </li>
                                    <li tw="col-span-3 flex space-x-8 items-center">
                                        <ToggleSwitch toggleProp={uploadData} onToggle={() => setUploadData(!uploadData)}></ToggleSwitch>
                                        <div tw="block">
                                            <p tw="font-bold">Can Upload Data</p>
                                            <p tw="text-gray-400">Allows user to upload datasets to the domain</p>
                                        </div>
                                    </li>
                                    <li tw="col-span-3 flex space-x-8 items-center">
                                        <ToggleSwitch toggleProp={managePrivacyBudgets} onToggle={() => setManagePrivacyBudgets(!managePrivacyBudgets)}></ToggleSwitch>
                                        <div tw="block">
                                            <p tw="font-bold">Can Manage Privacy Budgets</p>
                                            <p tw="text-gray-400">Allows users to adjust privacy budgets and accept or deny upgrade requests</p>
                                        </div>
                                    </li>
                                    <li tw="col-span-3 flex space-x-8 items-center">
                                        <ToggleSwitch toggleProp={uploadLegalDocuments} onToggle={() => setUploadLegalDocuments(!uploadLegalDocuments)}></ToggleSwitch>
                                        <div tw="block">
                                            <p tw="font-bold">Can Upload Legal Documents</p>
                                            <p tw="text-gray-400">Allows users to upload legal documents in the Domain Configuration settings</p>
                                        </div>
                                    </li>
                                    <li tw="col-span-3 flex space-x-8 items-center">
                                        <ToggleSwitch toggleProp={manageUsers} onToggle={() => setManageUsers(!manageUsers)}></ToggleSwitch>
                                        <div tw="block">
                                            <p tw="font-bold">Can Manage Users</p>
                                            <p tw="text-gray-400">Allows users to accept or deny account requests and reassign roles for users of this domain</p>
                                        </div>
                                    </li>
                                    <li tw="col-span-3 flex space-x-8 items-center">
                                        <ToggleSwitch toggleProp={editDomainSettings} onToggle={() => setEditDomainSettings(!editDomainSettings)}></ToggleSwitch>
                                        <div tw="block">
                                            <p tw="font-bold">Can Edit Domain Settings</p>
                                            <p tw="text-gray-400">Allows users to edit Domain Profile Configuration settings</p>
                                        </div>
                                    </li>
                                    <li tw="col-span-3 flex space-x-8 items-center">
                                        <ToggleSwitch toggleProp={createUsers} onToggle={() => setCreateUsers(!createUsers)}></ToggleSwitch>
                                        <div tw="block">
                                            <p tw="font-bold">Can Create Users</p>
                                            <p tw="text-gray-400">Allows users to create or edit users</p>
                                        </div>
                                    </li>
                                    <li tw="col-span-3 flex space-x-8 items-center">
                                        <ToggleSwitch toggleProp={manageInfrastructure} onToggle={() => setManageInfrastructure(!manageInfrastructure)}></ToggleSwitch>
                                        <div tw="block">
                                            <p tw="font-bold">Can Manage Infrastructure</p>
                                            <p tw="text-gray-400">Allows users to delete the node, manage node workers, and adjust auto scaling controls outside of the PyGridUI environment</p>
                                        </div>
                                    </li>
                                </ul>
                                <Button tw="px-2 py-2 mb-5" isSmall variant={"primary"} onClick={()=> updatePermissions()}>Save Changes</Button>
                            </div>
                        </div>
                    </Disclosure.Panel>
                </div>
                )}
            </Disclosure>
        </div>
    )
}