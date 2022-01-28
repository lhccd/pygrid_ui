import { useState, useEffect, useMemo } from 'react';
import tw, { styled, css } from 'twin.macro';
import Tag from '../../components/Tag'
import Modal from '../../components/Modal';
import Alert from '../../components/Alert';
import Button from '../../components/Button';
import Spinner from '../../components/Spinner';
import ConfirmationFlowModal from '../../components/ConfirmationFlowModal'
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
    faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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

async function acceptUserByID(email) {
    console.log("acceptUserByID Called", { email })
    try {
        const body = JSON.stringify(email)
        console.log("requesting put", body)
        const apiRes = await fetch('/api/accept_user_by_id',
            {
                method: "PUT",
                headers: {
                    'Accept': "application/json",
                    'Content-Type': "application/json"
                },
                body: body
            });
        const data = await apiRes.json()
        console.log("ACCEPT USER BY ID outside returns", data)
    }
    catch (error) {
        console.log("error in updateUserByID", error)
    }
}

async function denyUserByID(email) {
    console.log("denyUserByID Called", { email })
    try {
        const body = JSON.stringify(email)
        console.log("requesting put", body)
        const apiRes = await fetch('/api/deny_user_by_id',
            {
                method: "PUT",
                headers: {
                    'Accept': "application/json",
                    'Content-Type': "application/json"
                },
                body: body
            });
        const data = await apiRes.json()
        console.log("DENY USER BY ID outside returns", data)
    }
    catch (error) {
        console.log("error in updateUserByID", error)
    }
}

function PendingUserModal({ show, onClose, data }) {
    const [showAdjustBudgetModal, setShowAdjustBudgetModal] = useState(false)
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
    }, [showAdjustBudgetModal]);

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
                            <button onClick={() => setShowAdjustBudgetModal(true)}>
                                <FontAwesomeIcon size="lg" icon={faCheckCircle} title="Accept" tw="text-gray-200" />
                            </button>
                            <button onClick={async () => {
                                await denyUserByID(row.values.email);
                                console.log("DELETING ROW FROM PENDING TABLE ...", { row })
                                // setUserlist(userlist.splice(row.id, 1));
                                await fetchUserlist();
                            }
                            }><FontAwesomeIcon size="lg" icon={faTimesCircle} title="Decline" tw="text-gray-200" /></button>
                        </div>
                        <ConfirmationFlowModal show={showAdjustBudgetModal} onClose={() => setShowAdjustBudgetModal(false)}
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
function AdjustBudgetModal({ show, onClose, email, data, handleBudgetInUserModal }) {
    console.log("adjustbudgetmodal data", data)

    const [balance, setBalance] = useState(0)
    const [budget, setBudget] = useState(0)

    useEffect(() => {
        setBalance(data);
        setBudget(data);
    }, [data])

    useEffect(() => {

    }, [balance])

    function incrementBudget() {
        setBudget(prevCount => prevCount + 1)
    }
    function decrementBudget() {
        setBudget(prevCount => prevCount - 1)
    }

    const onUpgrade = () => {
        console.log("budget", budget)
        setBalance(budget);
        console.log("balance", balance)
        adjustBudget(email, budget)
        handleBudgetInUserModal(budget);
        onClose();
        console.log("onUpgrade", email, balance, budget)
    }

    return (
        <Modal show={show} onClose={onClose}>
            <div tw="grid grid-cols-12 text-left p-6 rounded-lg gap-4">
                <div tw="col-span-full flex-col items-center">
                    <h2 tw="font-bold text-4xl my-6 text-gray-800">∑</h2>
                    <h2 tw="font-bold text-4xl my-6 text-gray-800">Upgrade Budget</h2>
                </div>
                <p tw="col-span-full text-justify my-6">Allocating Privacy Budget (PB) is an optional setting that allows you to maintain a set standard of privacy while offloading the work of manually approving every data request for a single user. You can think of privacy budget as credits you give to a user to perform computations from. These credits of  Epsilon(ɛ) indicate the amount of visibility a user has into any one entity of your data. The more budget the more visibility. By default all users start with 0ɛ and must have their data requests approved manually until upgraded. You can learn more about privacy budgets and how to allocate them at Course.OpenMined.org</p>

                <h3 tw="col-span-full font-bold mt-3 text-gray-600">Adjust Privacy Budget</h3>
                <div tw="col-span-full flex bg-gray-50 items-center justify-between border border-gray-100 rounded p-4 space-x-3 my-6">
                    <div>
                        <p tw="text-error-400 font-bold">{balance} ɛ</p>
                        <p>Current Balance</p>
                    </div>
                    <div>
                        <p tw="text-gray-800 font-bold">{budget} ɛ</p>
                        <p>Allocated Budget</p>
                    </div>
                    <div tw="flex">
                        <button tw='px-6 py-4 font-bold text-lg rounded-l-lg border-2 border-gray-200 bg-gray-50' onClick={decrementBudget}>-</button>
                        <p tw="px-8 py-4 border-t-2 border-b-2 border-gray-200 text-lg">{budget}</p>
                        <button tw='px-6 py-4 font-bold text-lg rounded-r-lg border-2 border-gray-200 bg-gray-50' onClick={incrementBudget}>+</button>
                    </div>
                </div>
                <div tw="col-span-full flex justify-between">
                    <Button variant={"primary"} isHollow onClick={onClose}>Cancel</Button>
                    <Button variant={"primary"} onClick={onUpgrade}>Upgrade</Button>
                </div>
            </div>
        </Modal>
    )
}
async function adjustBudget(email, budget) {
    console.log("adjustBudget Called", { email })
    try {
        const body = JSON.stringify({ "email": email, "budget": budget })
        console.log("requesting put", body)
        const apiRes = await fetch('/api/adjust_budget_by_id',
            {
                method: "PUT",
                headers: {
                    'Accept': "application/json",
                    'Content-Type': "application/json"
                },
                body: body
            });
        const data = await apiRes.json()
        console.log("ADJUST BUDGET BY ID outside returns", data)
    }
    catch (error) {
        console.log("error in updateUserByID", error)
    }
}

export default function Pending() {
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
        try {
            setLoading(true);
            const apiRes = await fetch(
                '/api/pending_userlist',
                {
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                }
            );
            const data = await apiRes.json();
            console.log("userlist from backend", { data })
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
                        <div tw="font-roboto capitalize">Request Date</div>
                    </div>,
                accessor: 'created_at',
                Cell: ({ cell: { value } }) => {
                    {
                        var d = moment(value).format('YYYY-MMM-DD HH:MM')
                        return d;
                    }
                }
            },
            { Header: () => <div tw="flex font-normal space-x-2 items-center"><div tw="font-roboto capitalize">DAA</div></div>, accessor: 'daa' },
            { Header: () => <div tw="flex font-normal space-x-2 items-center"><div tw="font-roboto capitalize">Institution</div></div>, accessor: 'added_by' },
            { Header: () => <div tw="flex font-normal space-x-2 items-center"><FontAwesomeIcon icon={faEnvelope} size="sm" /><div tw="font-roboto capitalize">Email</div></div>, accessor: 'email' }], []
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
                        <Button onClick={async () => {
                            await acceptUserByID(row.values.email);
                            console.log("DELETING ROW FROM PENDING TABLE ...", { row })
                            // setUserlist(userlist.splice(row.id, 1))
                            await fetchUserlist();
                        }
                        }><FontAwesomeIcon size="lg" icon={faCheckCircle} title="Accept" tw="text-gray-200" /></Button>
                        <Button onClick={async () => {
                            await denyUserByID(row.values.email);
                            console.log("DELETING ROW FROM PENDING TABLE ...", { row })
                            // setUserlist(userlist.splice(row.id, 1));
                            await fetchUserlist();
                        }
                        }><FontAwesomeIcon size="lg" icon={faTimesCircle} title="Decline" tw="text-gray-200" /></Button>
                    </div>
                )
            }
        ])
    }
    const tableInstance = useTable({ columns: usersColumns, data: usersData }, useGlobalFilter, tableHooks, useSortBy);
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, preGlobalFilteredRows, setGlobalFilter, state } = tableInstance;

    useEffect(() => {
        fetchUserlist();
    }, [])

    return (
        <div tw="flex-col justify-center">
            <Alert show={showAlert} onClose={() => setShowAlert(false)}>
                <div>
                    <FontAwesomeIcon icon={faExclamationCircle} size="xl" />
                    <p>Pending users are users who have applied to your domain but who are not yet authorized to perform data requests. You can review their uploaded Data Access Agreements(DAA) below and choose to accept or deny their account applications.</p>
                </div>
            </Alert>
            <div tw="flex justify-between items-center">
                <div tw="inline-flex space-x-4">
                    <div tw="">
                        <GlobalFilter preGlobalFilteredRows={preGlobalFilteredRows} setGlobalFilter={setGlobalFilter} globalFilter={state.globalFilter} />
                    </div>
                </div>
            </div>
            <PendingUserModal show={showUserModal} onClose={() => setShowUserModal(false)} data={userData} />
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