import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import {faChevronDown, faCheck} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import tw, {css} from 'twin.macro'

const roles = [
  { role: 'Domain Owner' },
  { role: 'Admin' },
  { role: 'Data Scientist' },
]

function ListBox2() {
  const [selected, setSelected] = useState(roles[0])

  return (
    <div tw="">
      <Listbox value={selected} onChange={setSelected}>
        <div tw="relative mt-1">
          <Listbox.Button tw="relative w-full p-3 border border-gray-300 rounded-lg focus:shadow-active hover:shadow-active active:ring-primary-500 active:text-gray-800">
            <span tw="block truncate">{selected.name}</span>
            <span tw="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <FontAwesomeIcon
                icon={faChevronDown}
                size="sm"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options tw="absolute p-3 border border-gray-300 rounded-lg focus:shadow-active hover:shadow-active active:ring-primary-500 active:text-gray-800">
              {roles.map((role) => (
                <Listbox.Option
                  key={roles}
                  tw='text-primary-900 bg-white cursor-default select-none relative py-2 pl-10 pr-4'
                  value={role}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        tw='font-medium truncate'
                      >
                        {role.role}
                      </span>
                      {selected ? (
                        <span
                          tw='text-primary-600 absolute inset-y-0 left-0 flex items-center pl-3'
                        >
                        <FontAwesomeIcon
                                icon={faCheck}
                                size="sm"
                        />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
function ListBox() {
  const [selectedRole, setSelectedRole] = useState(roles[0])
  
  return (
    <div tw="w-72 relative inline">
      <Listbox value={selectedRole} onChange={setSelectedRole}>
        <Listbox.Button tw='relative w-full p-3 border border-gray-300 rounded-lg focus:shadow-active hover:shadow-active active:ring-primary-500 active:text-gray-800'>
          <span tw="absolute inset-y-0 left-4 flex items-center pr-2 pointer-events-none">
            <FontAwesomeIcon
              icon={faCheck}
              size="sm"
            />
          </span>
          <span tw="absolute inset-y-0 left-10 flex items-center pr-2 pointer-events-none">
            <FontAwesomeIcon
              icon={faCheck}
              size="sm"
            />
          </span>
          <span tw="block truncate">{selectedRole.role}</span>
          <span tw="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <FontAwesomeIcon
              icon={faChevronDown}
              size="sm"
            />
          </span>
        </Listbox.Button>
        <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
        <Listbox.Options tw="absolute w-full py-1 mt-1 bg-primary-50 overflow-auto text-gray-800 rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none">
          {roles.map((role) => (
                <Listbox.Option key={role.role} value={role} tw="cursor-default select-none relative py-2 pl-10 pr-4 bg-primary-50 text-gray-800">
                   {({ selected }) => (
                     <>
                      {selected ? (<span tw='text-primary-600 absolute inset-y-0 left-0 flex items-center pl-3'><FontAwesomeIcon icon={faCheck} size="sm"/> </span> ) : null}
                      <span css={[tw`font-normal`, selected && tw`font-medium`]}> {role.role}</span>
                    </>   
                   )}
                </Listbox.Option>
          ))}
        </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
  )
}

export default ListBox