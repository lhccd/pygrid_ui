import React, { useState } from "react";
import regeneratorRuntime from "regenerator-runtime";
import { useAsyncDebounce } from "react-table";
import tw from "twin.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchContainer = tw.div`
  mb-6
  mt-6
  flex
  justify-center
  items-center
  text-sm
  h-10
  rounded-lg
  border-2
  border-solid
  border-gray-200
 
`;

const Input = tw.input`
  p-4
  rounded-lg
  h-8
  items-center
`;

export function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 300);

  return (
    <SearchContainer>
        <FontAwesomeIcon tw="mx-2 text-gray-600" icon={faSearch} size="lg"/>
        <Input
          value={value || ""}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`Search: ${count} records...`}
        />
    </SearchContainer>
  );
}
