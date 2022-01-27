import { Layout } from '../components/Layout'
import tw, {styled} from 'twin.macro'
import {faCheck} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import { Listbox, Transition, Disclosure} from '@headlessui/react'
import {useState, useEffect, Fragment} from 'react'
import { Tab } from "@headlessui/react"
import Active from './users/active-users'
import Pending from './users/pending-users'
import Denied from './users/denied-users'

export default function Permissions() {
    const roles = [
        { id: 1, name: 'Owner'},
        { id: 2, name: 'Admin'},
        { id: 3, name: 'Data Scientist'}
    ]
    const [selectedRole, setSelectedRole] = useState(roles[0])
    return(
        <Layout>
            <div tw="col-span-full flex items-center">
                <div tw="flex p-2 mb-2">
                    <FontAwesomeIcon size="3x" icon={faCheck} tw="mr-3"/>
                    <h1 tw="text-5xl font-rubik font-medium">Permissions</h1>
                </div>
            </div>
            <p tw="mb-8 col-span-full">Permissions for a user are set by their assigned role. These permissions are used for managing the domain. Review and customize what permissions apply to the roles below.</p>
            <Listbox value={selectedRole} onChange={setSelectedRole}>
                <Listbox.Button tw="col-span-full flex py-4 px-6 border border-gray-200 rounded-lg text-left justify-between focus:shadow-active hover:shadow-active active:ring-primary-500 active:text-gray-800">
                    <span>{selectedRole.name}</span>
                    <span>▼</span>
                </Listbox.Button>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                <Listbox.Options tw="relative col-span-full overflow-auto text-gray-800 rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none">
                {roles.map((role) => (
                        <Listbox.Option key={role.id} value={role} tw="cursor-default select-none relative text-gray-800">
                                {({ selected }) => (
                                    <div css={[tw`py-2 px-6  items-center`, selected && tw`flex justify-between bg-gray-50`]}>
                                    <span css={[tw`font-normal`, selected && tw`font-medium`]}>{role.name}</span>
                                    {selected ? (<span tw='items-center'><FontAwesomeIcon icon={faCheck} size="sm"/> </span> ) : null}
                                    </div>
                                )}
                            
                        </Listbox.Option>
                ))}
                </Listbox.Options>
                </Transition>
            </Listbox>
            <h3 tw="col-span-full mt-8 text-xl font-bold">Roles</h3>
            <Disclosure>
                <Disclosure.Button tw="flex justify-between col-span-full px-4 py-2 text-sm font-medium text-left bg-primary-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                    Data Scientist
                </Disclosure.Button>
                <Disclosure.Panel tw="col-span-full text-gray-500">
                    Yes! You can purchase a license that you can share with your entire
                    team.
                </Disclosure.Panel>
            </Disclosure>
            <Disclosure>
                <Disclosure.Button tw="flex justify-between col-span-full px-4 py-2 text-sm font-medium text-left bg-primary-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                    Compliance Officer
                </Disclosure.Button>
                <Disclosure.Panel tw="col-span-full text-gray-500">
                    Yes! You can purchase a license that you can share with your entire
                    team.
                </Disclosure.Panel>
            </Disclosure>
            <Disclosure>
                <Disclosure.Button tw="flex justify-between col-span-full px-4 py-2 text-sm font-medium text-left bg-primary-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                    Admin
                </Disclosure.Button>
                <Disclosure.Panel tw="col-span-full text-gray-500">
                    Yes! You can purchase a license that you can share with your entire
                    team.
                </Disclosure.Panel>
            </Disclosure>
            <Disclosure>
                <Disclosure.Button tw="flex justify-between col-span-full px-4 py-2 text-sm font-medium text-left bg-primary-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                    Owner
                </Disclosure.Button>
                <Disclosure.Panel tw="col-span-full text-gray-500">
                    Yes! You can purchase a license that you can share with your entire
                    team.
                </Disclosure.Panel>
            </Disclosure>
        </Layout>
    )
}