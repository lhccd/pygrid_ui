import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import {faChevronDown, faCheck} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import tw from 'twin.macro'

const roles = [
  { role: 'Domain Owner' },
  { role: 'Admin' },
  { role: 'Data Scientist' },
]

function ListBox2() {
  const [selected, setSelected] = useState(people[0])

  return (
    <div tw="">
      <Listbox value={selected} onChange={setSelected}>
        <div tw="relative mt-1">
          <Listbox.Button tw="relative w-full p-3 border border-gray-300 rounded-lg focus:shadow-active hover:shadow-active active:ring-primary-500 active:text-gray-800">
            <span tw="block truncate">{selected.name}</span>
            <span tw="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <FontAwesomeIcon
                icon={faChevronDown}
                size="md"
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
              {people.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  tw='text-primary-900 bg-white cursor-default select-none relative py-2 pl-10 pr-4'
                  value={person}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        tw='font-medium truncate'
                      >
                        {person.name}
                      </span>
                      {selected ? (
                        <span
                          tw='text-primary-600 absolute inset-y-0 left-0 flex items-center pl-3'
                        >
                        <FontAwesomeIcon
                                icon={faCheck}
                                size="md"
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
export default function ListBox() {
  const [selectedRole, setSelectedRole] = useState(roles[0])
  
  return (
    <div tw="">
      <Listbox value={selectedRole} onChange={setSelectedRole}>
        <Listbox.Button tw='relative p-3 border border-gray-300 rounded-lg focus:shadow-active hover:shadow-active active:ring-primary-500 active:text-gray-800'>
          <span tw="block truncate">{selectedRole.role}</span>
          <span tw="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <FontAwesomeIcon
              icon={faChevronDown}
              size="md"
            />
          </span>
        </Listbox.Button>
        <Listbox.Options>
          {roles.map((role)=>(
            <Listbox.Option key={role.role} value={role}>
              {role.role}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  )
}