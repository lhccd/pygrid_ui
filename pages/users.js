import { Layout } from '../components/Layout'
import tw, {styled} from 'twin.macro'
import {faUsers} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import { Tab } from "@headlessui/react"
import { Fragment } from 'react'
import Active from './users/active-users'
import Pending from './users/pending-users'
import Denied from './users/denied-users'

export default function Users() {
    return(
        <Layout>
            <div tw="col-span-12">
                <div tw="flex items-center">
                    <div tw="flex p-2 mb-2">
                        <FontAwesomeIcon size="3x" icon={faUsers} tw="mr-3"/>
                        <h1 tw="text-5xl font-rubik font-medium">Users</h1>
                    </div>
                </div>
                <p tw="mb-8">Manage users, edit user permissions and credentials.</p>
                <Tab.Group>
                    <Tab.List tw="flex">
                        <Tab as={Fragment}>
                            {({ selected }) => (
                            <button
                                css={[tw`p-4 bg-white text-center font-bold text-gray-400 w-1/2 bg-white border-b-2 border-primary-500 `,
                                selected && tw`border-primary-500 text-primary-500 border-b-0 border-t-2 border-r-2 border-l-2 rounded-t-md`]}>Active Users</button>
                            )}
                        </Tab>
                        <Tab as={Fragment}>
                            {({ selected }) => (
                            <button
                                css={[tw`p-4 bg-white text-center font-bold text-gray-400 w-1/2 bg-white border-b-2 border-primary-500 `,
                                selected && tw`border-primary-500 text-primary-500 border-b-0 border-t-2 border-r-2 border-l-2 rounded-t-md`]}>Pending Users</button>
                            )}
                        </Tab>
                        <Tab as={Fragment}>
                            {({ selected }) => (
                            <button
                                css={[tw`p-4 bg-white text-center font-bold text-gray-400 w-1/2 bg-white border-b-2 border-primary-500 `,
                                selected && tw`border-primary-500 text-primary-500 border-b-0 border-t-2 border-r-2 border-l-2 rounded-t-md`]}>Denied Users</button>
                            )}
                        </Tab>
                    </Tab.List>
                    <Tab.Panels>
                    <Tab.Panel><Active/></Tab.Panel>
                    <Tab.Panel><Pending/></Tab.Panel>
                    <Tab.Panel><Denied/></Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </Layout>
    )
}