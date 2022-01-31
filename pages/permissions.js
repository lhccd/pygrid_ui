import { Layout } from '../components/Layout'
import tw, {styled, css} from 'twin.macro'
import {faCheck, faChevronRight} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import { Listbox, Transition, Disclosure} from '@headlessui/react'
import Accordion from "../components/Accordion";
import {useState, useEffect, Fragment} from 'react'
import { Tab } from "@headlessui/react"
import Active from './users/active-users'
import Pending from './users/pending-users'
import Denied from './users/denied-users'
import AccordionRoles from '../components/AccordionRoles'
import { GlobalFilterRoles } from '../components/GlobalFilterRoles'
const SearchContainer = tw.div`
mb-6
mt-6
`;
const roles = [
    {   
        id: 1, 
        role: "Owner",
        description: "There is only one Owner account assigned to any one domain node. The owner account is the highest level permission and is a requirement for deploying a domain node. If you should ever want to transfer ownership of your domain node to someone else you can do so by following these steps.",
        permissions: {
            MakeDataRequests: true, 
            EditRoles: true, 
            TriageDataRequests: true, 
            UploadData: true, 
            ManagePrivacyBudgets: true, 
            UploadLegalDocuments: true, 
            ManageUsers: true, 
            EditDomainSettigs: true, 
            CreateUsers: true, 
            ManageInfrastructure: true
        }
    },
    {   
        id: 2, 
        role: "Admin", 
        description: "This role is for users who will help you manage your node. This should be users you trust. The main difference between this user and a Compliance Officer is that this user by default not only can manage requests but can also edit Domain Settings. This is the highest level permission outside of an Owner.",        MakeDataRequests: true,
        permissions: {
            MakeDataRequests: true, 
            EditRoles: true, 
            TriageDataRequests: true, 
            UploadData: true, 
            ManagePrivacyBudgets: true, 
            UploadLegalDocuments: true, 
            ManageUsers: true, 
            EditDomainSettigs: true, 
            CreateUsers: true,
            ManageInfrastructure: false
        }
    },
    {   
        id: 3, 
        role: "Compliance Officer",
        description: "This role is for users who will help you manage requests made on your node. They should be users you trust. They are not able to change domain settings or edit roles but they are by default able to accept or deny user requests on behalf of the domain node.",
        permissions: {
            MakeDataRequests: false, 
            EditRoles: false, 
            TriageDataRequests: true, 
            UploadData: false, 
            ManagePrivacyBudgets: true, 
            UploadLegalDocuments: false, 
            ManageUsers: true, 
            EditDomainSettigs: false, 
            CreateUsers: false, 
            ManageInfrastructure: false
        }
    },
    {   
        id: 4, 
        role: "Data Scientist",
        description: "This role is for users who will be performing computations on your datasets. They may be users you know directly or those who found your domain through search and discovery. By default this user can see a list of your datasets and can request to get results. This user will also be required to sign a Data Access Agreement if you have required one in the Domain Settings Configurations.",
        permissions: {
            MakeDataRequests: true, 
            EditRoles: true, 
            TriageDataRequests: false, 
            UploadData: false, 
            ManagePrivacyBudgets: false, 
            UploadLegalDocuments: false, 
            ManageUsers: false, 
            EditDomainSettigs: false, 
            CreateUsers: false, 
            ManageInfrastructure: false
        }
    }
]

export default function Permissions() {
    
    const [selectedRole, setSelectedRole] = useState(roles[0])

    // FROM BERKE

    const RoleItems = roles.map((info) =>
        <AccordionRoles info={info}/>
    );
  
    // END BERKE
    return(
        <Layout current={"permissions"}>
            <div tw="col-start-2 col-end-12 mt-6 grid grid-cols-12">
                <div tw="col-span-full flex items-center">
                    <div tw="flex mb-4">
                        <FontAwesomeIcon size="3x" icon={faCheck} tw="mr-4"/>
                        <h1 tw="text-5xl font-normal font-rubik">Permissions</h1>
                    </div>
                </div>
                <p tw="mb-8 col-span-full">Permissions for a user are set by their assigned role. These permissions are used for managing the domain. Review and customize what permissions apply to the roles below.</p>
                <SearchContainer>
                    <Listbox value={selectedRole} onChange={setSelectedRole}>
                        <Listbox.Button tw="flex w-60 p-4 h-10 border-2 border-gray-200 rounded-lg text-left text-sm text-gray-600 justify-between items-center truncate">
                            <span>{selectedRole.role}</span>
                            <span tw="ml-2 text-xs">▼</span>
                        </Listbox.Button>
                        <Transition
                            as={Fragment}
                            enter="transition duration-100 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                        >
                        <Listbox.Options tw="absolute w-60 overflow-auto text-gray-800 border-2 border-gray-200 rounded-md mt-1">
                        {roles.map((role) => (
                                <Listbox.Option key={role.id} value={role} tw="absolute bg-white cursor-default select-none relative text-gray-800">
                                        {({ selected }) => (
                                            <div css={[tw`py-2 px-6  items-center`, selected && tw`flex justify-between bg-gray-50`]}>
                                            <span css={[tw`font-normal`, selected && tw`font-medium`]}>{role.role}</span>
                                            {selected ? (<span tw='items-center'><FontAwesomeIcon icon={faCheck} size="sm"/> </span> ) : null}
                                            </div>
                                        )}
                                    
                                </Listbox.Option>
                        ))}
                        </Listbox.Options>
                        </Transition>
                    </Listbox>
                </SearchContainer>
                {/* <Listbox value={selectedRole} onChange={setSelectedRole}>
                    <Listbox.Button tw="flex w-60 p-4 h-10 border-2 border-gray-200 rounded-lg text-left text-sm text-gray-600 justify-between items-center truncate">
                        <span>{selectedRole.role}</span>
                        <span tw="ml-2 text-xs">▼</span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                    >
                    <Listbox.Options tw="absolute overflow-auto text-gray-800 border-2 border-gray-200 rounded-md">
                    {roles.map((role) => (
                            <Listbox.Option key={role.id} value={role} tw="absolute bg-white cursor-default select-none relative text-gray-800">
                                    {({ selected }) => (
                                        <div css={[tw`py-2 px-6  items-center`, selected && tw`flex justify-between bg-gray-50`]}>
                                            <span css={[tw`font-normal`, selected && tw`font-medium`]}>{role.role}</span>
                                            {selected && (<span tw='items-center'><FontAwesomeIcon icon={faCheck} size="sm"/></span> )}
                                        </div>
                                    )}
                            </Listbox.Option>
                    ))}
                    </Listbox.Options>
                    </Transition>
                </Listbox> */}
                <h3 tw="col-span-full mt-8 mb-4 text-2xl font-medium">Roles</h3>
                <div tw="col-span-full border border-gray-200 rounded-lg divide-y divide-gray-200">{RoleItems}</div>
            </div>
        </Layout>
    )
}