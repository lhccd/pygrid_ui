import { useState, useEffect, useMemo } from 'react';
import { get, set, useForm } from "react-hook-form"
import tw, {styled} from 'twin.macro';
import { Link } from 'next/link'
import Tag from '../../components/Tag'
import Modal from '../../components/Modal';
import Alert from '../../components/Alert';
import Button from '../../components/Button';
import {faCalendar, faEnvelope, faPlus, faUser, faUserPlus, faInfoCircle, faCheckCircle, faTimesCircle} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useRouter } from 'next/router'

import { useGlobalFilter, useSortBy, useTable } from 'react-table'
import { GlobalFilter } from '../../components/GlobalFilter';
import { Router } from 'next/router';
import { Tab } from "@headlessui/react"
import { Fragment } from 'react'

const Table = tw.table`
  table-auto
  text-base
  text-gray-900
`;

const TableHead = tw.thead`
    px-6 py-4 text-base font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border border-gray-200
`;

const TableRow = tw.tr`
    px-6 py-4 whitespace-nowrap border border-gray-200
`;

const TableHeader = tw.th`
    px-6 py-4 text-base font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border border-gray-200    
`;

const TableBody = tw.tbody`
`;

const TableData = tw.td`
    px-6 py-4 whitespace-nowrap border border-gray-200
`;

async function denyUserByID(email){
    console.log("denyUserByID Called", {email})
    try{
        const body = JSON.stringify(email)
        console.log("requesting put", body)
        const apiRes = await fetch('/api/deny_user_by_id',
            {
                method: "PUT",
                headers:{
                    'Accept': "application/json",
                    'Content-Type': "application/json"
                },
                body: body
            });
        const data = await apiRes.json()
        console.log("DENY USER BY ID outside returns", data)
    }
    catch(error) {
        console.log("error in updateUserByID", error)
    }
}

export default function Denied(){
    const [userlist, setUserlist] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUserlist = async () => {
        try{
            setLoading(true);
            const apiRes = await fetch(
                '/api/denied_userlist',
                {
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                }
            );
            const data = await apiRes.json();
            console.log("userlist from backend", {data})
            setUserlist(data);
        }
        finally {
            setLoading(false);
        }
    }

    const usersData = useMemo(() => [...userlist], [userlist]);
    const usersColumns = useMemo(
        () => 
            userlist[0] 
                ? Object.keys(userlist[0])
                    .map((key) => {
                        return { Header: key, accessor: key };
                    })
            : [], 
        [userlist]
    );
    
    const tableHooks = (hooks) => {
        const router = useRouter()
        hooks.visibleColumns.push((columns) => [
            ...columns,
            {
                id: "Edit", 
                Header: 'Edit',
                Cell: ({ row }) => (
                    <Button onClick={() => acceptUserByID(row.values.email)}><FontAwesomeIcon size="lg" icon={faCheckCircle} title="Accept" tw="text-success-500" /></Button>
                )
            }
        ])
    }
    const tableInstance = useTable({ columns: usersColumns, data: usersData}, useGlobalFilter, tableHooks, useSortBy);
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, preGlobalFilteredRows, setGlobalFilter,  state} = tableInstance;

    useEffect(() => {
        fetchUserlist();
    }, [])

    const isEven = (idx) => idx % 2 === 0;

    return(
        <div tw="flex-col justify-center">
            <GlobalFilter preGlobalFilteredRows={preGlobalFilteredRows} setGlobalFilter={setGlobalFilter} globalFilter={state.globalFilter}/>
            <div tw="flex justify-center" >
                <Table {...getTableProps()}>
                    <TableHead>
                        {headerGroups.map((headerGroup) => (
                            <TableRow {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => ( 
                                    <TableHeader {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        { column.render("Header")}
                                        { column.isSorted ? (column.isSortedDesc ? " ▼" : " ▲") : ""}
                                    </TableHeader>
                                ))}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody {...getTableBodyProps()}>
                        {rows.map((row, idx) => {
                            prepareRow(row);
                            return (
                                <TableRow {...row.getRowProps()}>
                                {row.cells.map((cell,idx) => (
                                    <TableData {...cell.getCellProps()}>
                                        {cell.render('Cell')}
                                    </TableData>
                                ))}
                                </TableRow>)
                        })}

                    </TableBody>
                </Table> 
            </div>
        </div>
    )
}