import tw from 'twin.macro'
import {logout} from '../lib/auth'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import {faChevronDown} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import avatarphoto from "/public/avatar.jpg"
import {useRouter} from "next/router";

export default function Avatar({ name, picture, domainid }) {
    const router = useRouter();

    return (
      <div tw="flex items-center px-3">
            <img src="/avatar.jpg" tw="w-20 h-20 rounded-full mr-2" alt={name} />
            {/* <div tw="block"> */}
                <Menu as="div" tw="w-40 space-y-2">
                    <Menu.Button tw="px-2 flex w-full space-x-2 items-center text-xl font-bold truncate text-gray-200 rounded-md bg-opacity-20">
                            <div tw="truncate">{name}</div>
                            <FontAwesomeIcon size="sm" icon={faChevronDown}/>
                    </Menu.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                        >
                    <Menu.Items tw="absolute w-56 mt-2 bg-white divide-y divide-gray-100 rounded-md shadow-lg bg-gray-50">
                        <Menu.Item>
                          {({ active }) => (
                              <div
                              css={[tw`flex items-center space-x-2 rounded-md items-center w-full px-2 py-2 text-sm text-gray-600`, active && tw`bg-primary-200`]}
                              >
                                <img src="/avatar.jpg" tw="w-10 h-10 rounded-full" alt={name}/>
                                <div id="content" tw="relative w-auto truncate">
                                  <p tw="relative text-xl font-bold truncate">{name}</p>
                                  <p>Online</p>
                                </div>
                              </div>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                              <button
                              css={[tw`flex rounded-md items-center w-full px-2 py-2 text-sm text-gray-600`, active && tw`bg-primary-200`]}
                              onClick={()=>router.push({pathname:"domain-settings", query:{"tab":0}})}
                              >
                              Profile
                              </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                              <button
                              css={[tw`flex rounded-md items-center w-full px-2 py-2 text-sm text-gray-600`, active && tw`bg-primary-200`]}
                              onClick={()=>router.push({pathname:"domain-settings", query:{"tab":1}})}
                              >
                              Configurations
                              </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                              <button
                              css={[tw`flex rounded-md items-center w-full px-2 py-2 text-sm text-gray-600`, active && tw`bg-primary-200`]}
                              onClick={()=>router.push({pathname:"domain-settings", query:{"tab":2}})}
                              >
                              Version Updates
                              </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                              <button
                              css={[tw`flex rounded-md items-center w-full px-2 py-2 text-sm text-gray-600`, active && tw`bg-primary-200`]}
                              onClick={logout}>
                              Logout
                              </button>
                          )}
                        </Menu.Item>
                    </Menu.Items>
                    </Transition>
                    <div tw="px-2 text-gray-50 block text-sm font-bold rounded truncate bg-gray-800 text-primary-200">ID#{domainid}</div>
                    <button tw="px-2 text-left" onClick={logout}>
                        <p size="sm" tw="lowercase bg-transparent hover:text-white underline">
                            {('logout')}
                        </p>
                    </button>
                </Menu>
            {/* </div> */}
       </div>
    )
}