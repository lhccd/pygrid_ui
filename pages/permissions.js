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
        <Layout>
            <div tw="col-start-2 col-end-12 mt-6 grid grid-cols-12">
                <div tw="col-span-full flex items-center">
                    <div tw="flex mb-4">
                        <FontAwesomeIcon size="3x" icon={faCheck} tw="mr-4"/>
                        <h1 tw="text-5xl font-normal font-rubik">Permissions</h1>
                    </div>
                </div>
                <p tw="mb-8 col-span-full">Permissions for a user are set by their assigned role. These permissions are used for managing the domain. Review and customize what permissions apply to the roles below.</p>
                <Listbox value={selectedRole} onChange={setSelectedRole}>
                    <Listbox.Button tw="col-span-4 flex py-4 px-6 border border-gray-200 rounded-lg text-left justify-between">
                        <span>{selectedRole.role}</span>
                        <span>▼</span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                    <Listbox.Options tw="flex flex-col relative col-span-4 overflow-auto text-gray-800 rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {roles.map((role) => (
                            <Listbox.Option key={role.id} value={role} tw="flex cursor-default select-none relative text-gray-800">
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
                </Listbox>
                <h3 tw="col-span-full mt-8 mb-4 text-2xl font-medium">Roles</h3>
                <div tw="col-span-full border border-gray-200 rounded-lg divide-y divide-gray-200">{RoleItems}</div>
            </div>
        </Layout>
    )
}