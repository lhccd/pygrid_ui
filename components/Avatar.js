import tw from 'twin.macro'
import {logout} from '../lib/auth'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import {faChevronDown} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

export default function Avatar({ name, picture, domainid }) {
    return (
      <div tw="flex items-center mx-4 my-6">
            <img src={"avatar.jpg"} tw="w-20 h-20 rounded-full mr-1" alt={name} />
            <div tw="block">
                <Menu>
                    <Menu.Button tw="flex space-x-2 items-center w-full px-4 text-xl font-bold truncate text-gray-50 rounded-md bg-opacity-20">
                            <p tw="truncate">{name}</p>
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
                                <img src="/avatar.jpg" tw="w-10 h-10 rounded-full" alt="Canada Domain"/>
                                <div id="content" tw="relative w-auto truncate">
                                  <p tw="relative text-xl font-bold truncate">{name}</p>
                                  <p>Online</p>
                                </div>
                              </div>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                              <a
                              css={[tw`flex rounded-md items-center w-full px-2 py-2 text-sm text-gray-600`, active && tw`bg-primary-200`]}
                              href="/account-settings"
                              >
                              Profile
                              </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                              <a
                              css={[tw`flex rounded-md items-center w-full px-2 py-2 text-sm text-gray-600`, active && tw`bg-primary-200`]}
                              href="/domain-settings"
                              >
                              Configurations
                              </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                              <a
                              css={[tw`flex rounded-md items-center w-full px-2 py-2 text-sm text-gray-600`, active && tw`bg-primary-200`]}
                              href="/account-settings"
                              >
                              Version Updates
                              </a>
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
                    <div tw="mx-4 my-2 px-2 text-gray-50 block text-sm font-bold rounded truncate bg-gray-800 text-primary-200">{domainid}</div>
                    <button tw="px-4 text-left" onClick={logout}>
                        <p size="sm" tw="lowercase bg-transparent hover:text-white underline">
                            {('logout')}
                        </p>
                    </button>
                </Menu>
            </div>
        </div>
    )
}