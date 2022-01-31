import React, { useState, useEffect, Fragment } from "react";
import regeneratorRuntime from "regenerator-runtime";
import { useAsyncDebounce } from "react-table";
import tw from "twin.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCheck } from "@fortawesome/free-solid-svg-icons";
import {Listbox, Transition} from "@headlessui/react"

const SearchContainer = tw.div`
mb-6
mt-6
`;


const status = [
    { id: 0, role: 'Accepted' },
    { id: 1, role: 'Rejected' },
    { id: 2, role: 'Pending' },
  ]

export function GlobalFilterStatus({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const [selectedStatus, setSelectedStatus] = useState(status[0])
  const onChange = useAsyncDebounce((value) => {
    console.log("GLOBAL FILTER STATUS", {value})
    setGlobalFilter(value || undefined);
  }, 300);

 useEffect(() => {
    if (selectedStatus.status == 'Status'){
      // console.log("in useeffect if", selectedStatus)
      onChange(undefined);
    }
    else{
      // console.log("in useeffect else")
        setValue(selectedStatus.status);
        onChange(selectedStatus.statu);
    }
}, [selectedStatus])

  return (
    <SearchContainer>
        <Listbox value={selectedStatus} onChange={setSelectedStatus}>
            <Listbox.Button tw="flex w-60 p-4 h-10 border-2 border-gray-200 rounded-lg text-left text-sm text-gray-600 justify-between items-center truncate">
                <span>{selectedStatus.status}</span>
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
            <Listbox.Options tw="absolute w-60 mt-1 overflow-auto text-gray-800 border-2 border-gray-200 rounded-md">
            {status.map((status) => (
                    <Listbox.Option key={status.id} value={status} tw="absolute bg-white cursor-default select-none relative text-gray-800">
                            {({ selected }) => (
                                <div css={[tw`py-2 px-6  items-center`, selected && tw`flex justify-between bg-gray-50`]}>
                                <span css={[tw`font-normal`, selected && tw`font-medium`]}>{status.status}</span>
                                {selected ? (<span tw='items-center'><FontAwesomeIcon icon={faCheck} size="sm"/> </span> ) : null}
                                </div>
                            )}
                        
                    </Listbox.Option>
            ))}
            </Listbox.Options>
            </Transition>
        </Listbox>
        {/* <FontAwesomeIcon tw="mx-2 text-gray-600" icon={faSearch} size="lg"/>
        <Input
          value={value || ""}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`Search: ${count} records...`}
        /> */}
    </SearchContainer>
  );
}
