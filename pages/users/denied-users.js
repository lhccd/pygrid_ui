import { useState, useEffect, useMemo } from 'react';
import { get, set, useForm } from "react-hook-form"
import tw, {styled} from 'twin.macro';
import { Link } from 'next/link'
import Tag from '../../components/Tag'
import Modal from '../../components/Modal';
import Alert from '../../components/Alert';
import Button from '../../components/Button';
import Spinner from '../../components/Spinner';
import {faCalendar, faEnvelope, faPlus, faUser, faUserPlus, faInfoCircle, faCheckCircle, faExclamationCircle, faTimesCircle} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useRouter } from 'next/router'
import moment from 'moment'
import { useGlobalFilter, useSortBy, useTable } from 'react-table'
import { GlobalFilter } from '../../components/GlobalFilter';
import { Router } from 'next/router';
import { Tab } from "@headlessui/react"
import { Fragment } from 'react'

const Table = tw.table`
    min-w-full
    my-5
    table-fixed
    text-base
    text-gray-900
`;

const TableHead = tw.thead`
    p-2
`;

const TableRow = tw.tr`
    border border-gray-200
`;

const TableHeader = tw.th`
    p-2 text-gray-500 border border-gray-200    
`;

const TableBody = tw.tbody`
`;

const TableData = tw.td`
    p-2 border border-gray-200
`;

async function acceptUserByID(email){
    console.log("acceptUserByID Called", {email})
    try{
        const body = JSON.stringify(email)
        console.log("requesting put", body)
        const apiRes = await fetch('/api/accept_user_by_id',
            {
                method: "PUT",
                headers:{
                    'Accept': "application/json",
                    'Content-Type': "application/json"
                },
                body: body
            });
        const data = await apiRes.json()
        console.log("ACCEPT USER BY ID outside returns", data)
    }
    catch(error) {
        console.log("error in updateUserByID", error)
    }
}

/* 
    FOR YUSUF, the button sends you the email of the user in the table!!!
    AS FOR NOW, ONLY A POST REQUEST REACHES THE API MIDDLEWARE, GET REQUEST DOESN'T REACH ANYWHERE
    If you figured out, how the below function can work with your api middleware, it should be done ;) 
*/
async function downloadDAA(email){
    try{
        const apiRes = await axios({
            method: 'GET',
            url: '/api/user-daa-pdf',
            headers: {
                "Accept": "application/json",
            },
            params: {
                user_email: email
            }
        });
        if(apiRes.status === 200){
            try {
                const data = await apiRes.data.data;
                let decodedStringAtoB = atob(data);
                let bytes = new Uint8Array(decodedStringAtoB.length);
                for (let i = 0; i < decodedStringAtoB.length; i++)
                    bytes[i] = decodedStringAtoB.charCodeAt(i);
                let a = window.document.createElement('a');

                a.href = window.URL.createObjectURL(new Blob([bytes], {type: 'application/octet-stream'}));
                a.download = email + "_agreement" + ".pdf";
                document.body.appendChild(a)
                a.click();
                document.body.removeChild(a)
            }
            catch (e) {
                alert("Wrong file format has been uploaded! DAA is invalid!");
            }
        }
        else{
            alert("Couldn't find any agreement file in the domain");
        }
    }
    catch(error) {
        console.error(error)
    }
}

export default function Denied(){
    const [userlist, setUserlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showUserModal, setShowUserModal] = useState(false);
    const [showAlert, setShowAlert] = useState(true);

    const [userData, setUserData] = useState(
        {
            "email": "",
            "full_name": "",
            "id": 0,
            "institution": "",
            "website": "",
            "status": "",
            "role": null,
            "budget": 0,
            "created_at": "",
            "added_by": "",
            "daa_pdf": ""
        });

    useEffect(() => {
        fetchUserlist()
    }, [showUserModal])

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

    async function getUser(email) {
        const body = JSON.stringify({
            email,
        })
        try {
            const apiRes = await fetch(
                "api/get_user_by_id",
                {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body
                }
            );

            if (apiRes.status == 200) {
                const data = await apiRes.json();
                setUserData(data)
                console.log("userData: ", userData)
            }
            else {
                alert("Couldn't fetch the user!");
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const usersData = useMemo(() => [...userlist], [userlist]);
    const usersColumns = useMemo(
        () => [
            {
                Header: () => <div tw="flex font-normal space-x-2"><div tw="font-roboto capitalize">Name</div></div>,
                accessor: 'full_name',
                Cell: ({ row }) => (
                    <button tw="flex space-x-2 items-center" onClick={() => {
                        getUser(row.values.email);
                        setShowUserModal(true);
                    }}>
                        <p tw="text-gray-600">{row.values.full_name}</p>
                        <Tag variant={'primary'}>{row.values.email}</Tag>
                    </button>
                ),
            },
            {
                Header: () =>
                    <div tw="flex font-normal space-x-2 items-center">
                        <FontAwesomeIcon icon={faCalendar} size="sm" />
                        <div tw="font-roboto capitalize">Date Denied</div>
                    </div>,
                accessor: 'created_at',
                Cell: ({ cell: { value } }) => {
                    {
                        var d = moment(value).format('YYYY-MMM-DD HH:MM')
                        return d;
                    }
                }
            },
            { Header: () => <div tw="flex font-normal space-x-2 items-center"><FontAwesomeIcon icon={faUser} size="sm" /><div tw="font-roboto capitalize">Denied By</div></div>, accessor: 'added_by' },
            { 
                Header: () => <div tw="flex font-normal space-x-2 items-center"><div tw="font-roboto capitalize">DAA</div></div>, 
                accessor: 'daa',
                Cell: ({ row }) => (
                    <button tw="flex space-x-2 items-center bg-gray-100 px-2 py-1" 
                        onClick={
                            async () => 
                                {
                                    await downloadDAA(row.values.email);
                                    console.log("DOWNLOADING DAA FROM DENIED TABLE ...", {row})
                                    // setUserlist(userlist.splice(row.id, 1))
                                }
                        }>
                            <p tw="text-black underline text-xs">Download DAA</p>
                    </button>
                ),
            },
            { Header: () => <div tw="flex font-normal space-x-2 items-center"><div tw="font-roboto capitalize">Institution</div></div>, accessor: 'institution' },
            { Header: () => <div tw="flex font-normal space-x-2 items-center"><FontAwesomeIcon icon={faEnvelope} size="sm" /><div tw="font-roboto capitalize">Email</div></div>, accessor: 'email' }], []
    );
    
    const tableHooks = (hooks) => {
        const router = useRouter()
        hooks.visibleColumns.push((columns) => [
            ...columns,
            {
                id: "Edit", 
                Header: 'Edit',
                Cell: ({ row }) => (
                    <button onClick={ async () => 
                        {
                            await acceptUserByID(row.values.email);
                            console.log("DELETING ROW FROM PENDING TABLE ...", {row})
                            // setUserlist(userlist.splice(row.id, 1))
                            await fetchUserlist();
                        }
                    }><FontAwesomeIcon size="lg" icon={faCheckCircle} title="Accept" tw="text-success-500" /></button>
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
            <Alert show={showAlert} onClose={() => setShowAlert(false)}>
                <div>
                    <FontAwesomeIcon icon={faExclamationCircle} size="xl" />
                    <p>Denied users are users who have applied to your domain but who have been denied access to make data requests.</p>
                </div>
            </Alert>
            <div tw="flex justify-between items-center">
                <div tw="inline-flex space-x-4">
                    <div tw="">
                        <GlobalFilter preGlobalFilteredRows={preGlobalFilteredRows} setGlobalFilter={setGlobalFilter} globalFilter={state.globalFilter} />
                    </div>
                </div>
            </div>
            {loading ?
                <div tw="my-10 flex w-full justify-center">
                    <Spinner />
                </div> : 
                <div tw="flex justify-center" >
                    <Table {...getTableProps()}>
                        <TableHead>
                            {headerGroups.map((headerGroup) => (
                                <TableRow {...headerGroup.getHeaderGroupProps()} tw="text-sm text-gray-600">
                                    {headerGroup.headers.map((column) => (
                                        <TableHeader {...column.getHeaderProps(column.getSortByToggleProps())} css={[column.isSorted && tw`bg-gray-50`]}>
                                            <div css={[tw`items-center space-x-2`, column.isSorted && tw`flex justify-between items-center space-x-2`]}>
                                                {column.render("Header")}
                                                {column.isSorted ? (column.isSortedDesc ? <div> ▼</div> : <div>▲ </div>) : <div> </div>}
                                            </div>
                                        </TableHeader>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHead>
                        <TableBody {...getTableBodyProps()}>
                            {rows.map((row, idx) => {
                                prepareRow(row);
                                return (
                                    <TableRow {...row.getRowProps()} tw="text-sm text-gray-600">
                                        {row.cells.map((cell, idx) => (
                                            <TableData {...cell.getCellProps()}>
                                                {cell.render('Cell')}
                                            </TableData>
                                        ))}
                                    </TableRow>)
                            })}
                        </TableBody>
                    </Table>
                </div>
            }
        </div>
    )
}