import { useState, useEffect, useMemo } from 'react';
import tw, { styled, css } from 'twin.macro';
import Tag from '../../../components/Tag'
import Modal from '../../../components/Modal';
import Alert from '../../../components/Alert';
import Button from '../../../components/Button';
import Spinner from '../../../components/Spinner';
import {
    faCalendar,
    faEnvelope,
    faPlus,
    faUser,
    faUserPlus,
    faInfoCircle,
    faCheckCircle,
    faTimesCircle,
    faExclamationCircle,
    faExpandAlt,
    faTrash, faLink, faUsers, faUserCircle,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'
import moment from 'moment'

import { useGlobalFilter, useSortBy, useTable } from 'react-table'
import { GlobalFilter } from '../../../components/GlobalFilter';
import { Router } from 'next/router';
import { Tab } from "@headlessui/react"
import { Fragment } from 'react'
import {GlobalFilterStatus} from "../../../components/GlobalFilterStatus";

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

function RequestModal({ show, onClose, data }) {
    //Deal later!
    const [full_name, setFull_name] = useState("")
    const [budget, setBudget] = useState("")
    const [email, setEmail] = useState("");
    const [institution, setInstitution] = useState("");
    const [website, setWebsite] = useState("");
    const [added_by, setAdded_by] = useState("")
    const [daa_pdf, setDaa_pdf] = useState("")
    const [created_at, setCreated_at] = useState("")
    const router = useRouter();

    useEffect(() => {
        setFull_name(data.full_name);
        setBudget(data.budget);
        setEmail(data.email);
        setInstitution(data.institution);
        setWebsite(data.website);
        setAdded_by(data.added_by);
        setDaa_pdf(data.daa_pdf);
        setCreated_at(data.created_at);
    }, [data]);

    useEffect(() => {
    }, [budget]);

    function handleBudgetInUserModal(value) {
        setBudget(value)
    };


    return (
        <Modal show={show} onClose={onClose}>
            <div tw="col-span-full">
                <div tw="w-full m-5"><button tw="items-center font-bold space-x-2" onClick={() => router.push(`/users/${email}`)}><FontAwesomeIcon size="sm" icon={faExpandAlt} />   Expand Page</button></div>
                <div tw="h-auto px-20 py-10">
                    <div tw="flex items-center justify-between my-5">
                        <div tw="flex space-x-3 items-center">
                            <h2 tw="font-bold font-rubik text-4xl text-gray-800">{full_name}</h2>
                            <Tag variant={'primary'}>Data Scientist</Tag>
                        </div>
                        <div tw="inline-flex p-5 space-x-2">
                            <button>
                                <FontAwesomeIcon size="lg" icon={faCheckCircle} title="Accept" tw="text-gray-200" />
                            </button>
                            <button onClick={async () => {
                                await denyUserByID(email);
                                console.log("DELETING ROW FROM PENDING TABLE ...", email)
                                // setUserlist(userlist.splice(row.id, 1));
                                onClose();
                            }
                            }><FontAwesomeIcon size="lg" icon={faTimesCircle} title="Decline" tw="text-gray-200" /></button>
                        </div>
                        email={email} data={budget} handleBudgetInUserModal={handleBudgetInUserModal} />
                    </div>

                    <h3 tw="font-bold mt-10 text-gray-600">Background</h3>
                    <div tw="flex-col border border-gray-100 rounded p-4 space-y-3">
                        <div tw="flex space-x-3">
                            <p tw="font-bold text-gray-600">Email:</p>
                            <p>{email}</p>
                        </div>
                        <div tw="flex space-x-3">
                            <p tw="font-bold text-gray-600">Company/Institution:</p>
                            <p>{institution}</p>
                        </div>
                        <div tw="flex space-x-3">
                            <p tw="font-bold text-gray-600">Website/profile:</p>
                            <p>{website}</p>
                        </div>
                    </div>
                    <h3 tw="font-bold mt-10 text-gray-600">System</h3>
                    <div tw="flex-col border border-gray-100 rounded p-4 space-y-3">
                        <div tw="flex space-x-3">
                            <p tw="font-bold text-gray-600">Date Added:</p>
                            <p>{added_by}</p>
                        </div>
                        <div tw="flex space-x-3">
                            <p tw="font-bold text-gray-600">Data Access Agreement:</p>
                            <p>{daa_pdf}</p>
                        </div>
                        <div tw="flex space-x-3">
                            <p tw="font-bold text-gray-600">Uploaded On:</p>
                            <p>{created_at}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default function History() {
    const [requestlist, setRequestlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showRequestModal, setShowRequestModal] = useState(false);
    const [showAlert, setShowAlert] = useState(true);

    const [requestData, setRequestData] = useState(
        {
            "email": "",
            "full_name": "",
            "status": "",
            "id": 0,
            "request_size": 0,
            "updated_on": "",
            "updated_by": "",
            "datasets": ""
        });

    useEffect(() => {
        fetchRequestlist()
    }, [showRequestModal])

    const fetchRequestlist = async () => {
        try {
            setLoading(true);
            const apiRes = await fetch(
                '/api/CHANGE_THIS',
                {
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                }
            );
            const data = await apiRes.json();
            console.log("request list: ", { data })
            setRequestlist(data);
        }
        finally {
            setLoading(false);
        }
    }

    async function getRequest(id) {
        const body = JSON.stringify({
            id,
        })
        try {
            const apiRes = await fetch(
                "api/CHANGE_THIS",
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
                setRequestData(data)
                console.log("requestData: ", requestData)
            }
            else {
                alert("Couldn't fetch the request!");
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const requestsData = useMemo(() => [...requestlist], [requestlist]);
    const requestsColumns = useMemo(
        () => [
            {
                Header: () => <div tw="flex font-normal space-x-2"><div tw="font-roboto capitalize">#ID</div></div>,
                accessor: 'id',
                Cell: ({ row }) => (
                    <p tw="text-gray-600">{row.values.id}</p>
                ),
            },
            {
                Header: () => <div tw="flex font-normal space-x-2"><div tw="font-roboto capitalize">Name</div></div>,
                accessor: 'full_name',
                Cell: ({ row }) => (
                    <p tw="text-gray-600">{row.values.full_name}</p>
                ),
            },
            {
                Header: () => <div tw="flex font-normal space-x-2"><div tw="font-roboto capitalize">Status</div></div>,
                accessor: 'status',
                Cell: ({ row }) => (
                    <p tw="text-gray-600">{row.values.status}</p>
                ),
            },
            {
                Header: () =>
                    <div tw="flex font-normal space-x-2 items-center">
                        <FontAwesomeIcon icon={faCalendar} size="sm" />
                        <div tw="font-roboto capitalize">Updated On</div>
                    </div>,
                accessor: 'updated_on',
                Cell: ({ cell: { value } }) => {
                    {
                        var d = moment(value).format('YYYY-MMM-DD HH:MM')
                        return d;
                    }
                }
            },
            {
                Header: () =>
                    <div tw="flex font-normal space-x-2 items-center">
                        <FontAwesomeIcon icon={faUser} size="sm" />
                        <div tw="font-roboto capitalize">Updated By</div>
                    </div>,
                accessor: 'updated_by',
                Cell: ({ row }) => {
                    {
                        <p tw="text-gray-600">{row.values.updated_by}</p>
                    }
                }
            },
            {
                Header: () =>
                    <div tw="flex font-normal space-x-2 items-center">
                        <div tw="font-bold">∑</div>
                        <div tw="font-roboto capitalize">Requested</div>
                    </div>,
                accessor: 'requested',
                Cell: ({ row }) => {
                    {
                        <p tw="text-gray-600">{row.values.requested}</p>
                    }
                }
            },
            {
                Header: () =>
                    <div tw="flex font-normal space-x-2 items-center">
                        <div tw="font-bold">∑</div>
                        <div tw="font-roboto capitalize">New Budget</div>
                    </div>,
                accessor: 'new',
                Cell: ({ row }) => {
                    {
                        <p tw="text-gray-600">{row.values.new}</p>
                    }
                }
            },
        ], []
    );

    const tableHooks = (hooks) => {
        const router = useRouter()
        hooks.visibleColumns.push((columns) => [
            ...columns,
            {
                id: "action",
                Header: 'Action',
                Cell: ({ row }) => (
                    <div>
                        <Button tw="flex space-x-2 items-center" onClick={() => {
                            getRequest(row.values.id);
                            setShowRequestModal(true);
                        }}>
                            >See Details</Button>
                    </div>
                )
            }
        ])
    }
    const tableInstance = useTable({ columns: requestsColumns, data: requestsData }, useGlobalFilter, tableHooks, useSortBy);
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, preGlobalFilteredRows, setGlobalFilter, state } = tableInstance;

    useEffect(() => {
        fetchRequestlist();
    }, [])

    return (
        <div tw="flex-col justify-center">
            <div tw="flex justify-between items-center">
                <div tw="inline-flex space-x-4">
                    <GlobalFilter preGlobalFilteredRows={preGlobalFilteredRows} setGlobalFilter={setGlobalFilter} globalFilter={state.globalFilter} />
                    <GlobalFilterStatus preGlobalFilteredRows={preGlobalFilteredRows} setGlobalFilter={setGlobalFilter} globalFilter={state.globalFilter} />
                </div>
            </div>
            <RequestModal show={showRequestModal} onClose={() => setShowRequestModal(false)} data={requestData} />
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