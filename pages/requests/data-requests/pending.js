import React, { useState, useEffect, useMemo } from 'react';
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
    faTrash, faLink, faUsers, faUserCircle, faChevronRight, faCaretUp, faComment, faTimes,
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

function RequestModal({ show, onClose, requestData, userData }) {
    const [requestSize, setRequestSize] = useState(0)
    const [dataSubjects, setDataSubjects] = useState(0)
    const [linkedDatasets, setLinkedDatasets] = useState([])
    const [tags, setTags] = useState([])
    const [numVals, setNumVals] = useState(0)
    const [reason, setReason] = useState("")
    const [status, setStatus] = useState("")
    const [id, setId] = useState("")
    const [resultId, setResultId] = useState("")
    const [requestDate, setRequestDate] = useState("")
    const [full_name, setFull_name] = useState("")
    const [email, setEmail] = useState("");
    const [institution, setInstitution] = useState("");
    const [website, setWebsite] = useState("");
    const [role, setRole] = useState("")
    const [budget, setBudget] = useState(0)
    const [allocatedBudget, setAllocatedBudget] = useState(0)
    const [budgetVariant, setBudgetVariant] = useState("")
    const router = useRouter();

    useEffect(() => {
        console.log("requestData: ", requestData)
        setRequestSize(requestData.request_size);
        setDataSubjects(requestData.data_subjects);
        let sets_array = requestData.linked_datasets?.split(', ')
        setLinkedDatasets(sets_array)
        setReason(requestData.reason);
        setStatus(requestData.status);
        setId(requestData.id);
        setRequestDate(requestData.request_date);
        let tags_array = requestData.tags?.split(', ')
        setTags(tags_array)
        setNumVals(requestData.num_of_values)
        setResultId(requestData.result_id)
    }, [requestData]);


    const sets = linkedDatasets?.map((set) =>
        <Tag variant="gray"><p tw="font-bold">{set}</p></Tag>
    )

    const tags2 = tags?.map((tag) =>
        <Tag variant="primary"><p tw="font-bold">#{tag}</p></Tag>
    )

    useEffect(() => {
        console.log("userData: ", userData)
        setFull_name(userData.full_name);
        setEmail(userData.email);
        setInstitution(userData.institution);
        setWebsite(userData.website);
        setRole("Data Scientist");
        setBudget(userData.budget)
        setAllocatedBudget(userData.allocated_budget)
    }, [userData]);

    useEffect(() => {
        if (budget<allocatedBudget){
            setBudgetVariant('gray')
        } else {
            setBudgetVariant('error-bg')
        }
    }, [budget])

    return (
        <Modal show={show} onClose={onClose}>
            <div tw="col-span-full">
                <div tw="h-auto w-auto p-4 text-sm">
                    <div tw="flex inline-flex">
                        <p tw="font-bold text-gray-600 mr-2">Request ID:</p>
                        <Tag variant={'gray'}><p tw="font-bold text-gray-800">{id}</p></Tag>
                    </div>
                    <div tw="flex items-center justify-between my-5">
                        <div tw="flex space-x-3 items-center">
                            <h2 tw="font-bold font-rubik text-4xl text-gray-800">{full_name}</h2>
                        </div>
                        <div>
                            <Tag variant={'primary-bg'}><p tw="font-bold">{status}</p></Tag>
                        </div>
                    </div>

                    <div tw="divide-y divide-gray-200 w-auto">
                        <div tw="flex inline-flex justify-start mb-10 w-full">
                            <div tw="flex inline-flex whitespace-nowrap mr-8">
                                <div tw="bg-gray-50 border border-gray-100 p-4 rounded">
                                    <div tw="divide-y divide-gray-200">
                                        <div tw="flex items-center justify-center divide-x divide-gray-200 mb-2">
                                            <div tw="pr-4">
                                                <div tw="flex inline-flex items-center">
                                                    <p tw="text-gray-800 text-lg font-bold">{requestSize} ɛ</p>
                                                </div>
                                                <p tw="text-gray-600 text-sm">Request Size</p>
                                            </div>
                                            <div tw="px-4">
                                                <div tw="flex inline-flex items-center">
                                                    <p tw="text-gray-800 text-lg font-bold mr-2">{dataSubjects}</p>
                                                </div>
                                                <p tw="text-gray-600 text-sm">Data Subjects</p>
                                            </div>
                                        </div>
                                        <div>
                                            <div tw="flex space-x-3 mt-2">
                                                <p tw="font-bold text-gray-600">Linked Datasets:</p>
                                            </div>
                                            <div tw="flex space-x-3 mt-2">
                                                {sets}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div tw="flex-col border border-gray-100 rounded p-4 space-y-3">
                                    <div tw="flex space-x-3 items-center">
                                        <p tw="font-bold text-gray-600">Role:</p>
                                        <Tag variant={'primary'}><p tw="font-bold">{role}</p></Tag>
                                    </div>
                                    <div tw="flex space-x-3 items-center">
                                        <p tw="font-bold text-gray-600">Privacy Budget:</p>
                                        <Tag variant={budgetVariant}><p tw="font-bold">{budget} ɛ</p></Tag><p tw="text-xs text-gray-600"> used of </p><Tag variant={'gray'}><p tw="font-bold">{allocatedBudget} ɛ</p></Tag>
                                    </div>
                                    <div tw="flex space-x-3 items-center">
                                        <p tw="font-bold text-gray-600">Email:</p>
                                        <a tw="text-gray-600 underline" href={"emailto:"+email}>{email}</a>
                                    </div>
                                    <div tw="flex space-x-3 items-center">
                                        <p tw="font-bold text-gray-600">Company/Institution:</p>
                                        <p tw="text-gray-600">{institution}</p>
                                    </div>
                                    <div tw="flex space-x-3 items-center">
                                        <p tw="font-bold text-gray-600">Website/profile:</p>
                                        <a tw="text-gray-600 underline" href={website}>{website}</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div tw="">
                            <div>
                                <h3 tw="font-bold mt-6 text-gray-800 mb-2 text-lg">Request Details</h3>
                                <div tw="border border-gray-100 divide-y divide-gray-200">
                                    <div tw="flex-col rounded p-4 space-y-3">
                                        <div tw="flex space-x-3">
                                            <p tw="font-bold text-gray-600">Request ID:</p>
                                            <Tag variant={'gray'}><p tw="font-bold text-gray-800">{id}</p></Tag>
                                        </div>
                                        <div tw="flex space-x-3">
                                            <p tw="font-bold text-gray-600">Request Date:</p>
                                            <p tw="text-gray-600">{moment(requestDate).format('YYYY-MMM-DD HH:MM')}</p>
                                        </div>
                                        <div tw="flex space-x-3">
                                            <p tw="font-bold text-gray-600">Tags:</p>
                                            {tags2}
                                        </div>
                                        <div tw="flex space-x-3">
                                            <p tw="font-bold text-gray-600">Result ID:</p>
                                            <Tag variant={'gray'}><p tw="font-bold text-gray-800">{resultId}</p></Tag>
                                        </div>
                                        <div tw="flex space-x-3">
                                            <p tw="font-bold text-gray-600"># of Values:</p>
                                            <p tw="text-gray-600">{numVals}</p>
                                        </div>
                                    </div>
                                    <div tw="p-4">
                                        <div tw="bg-gray-50 rounded p-2">
                                            <p tw="font-bold text-gray-600">Reason:</p>
                                            <p tw="text-gray-600">{reason}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default function Pending(props) {
    const [requestList, setRequestList] = useState([]);
    const [id, setId] = useState("")
    const [comment, setComment] = useState("")
    const [update, setUpdate] = useState("")
    const [loading, setLoading] = useState(false);
    const [showCommentModal, setShowCommentModal] = useState(false)
    const [showRequestModal, setShowRequestModal] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [variant, setVariant] = useState('primary');

    const [requestData, setRequestData] = useState(
        {
            "status": "",
            "id": "",
            "request_date": "",
            "updated_on": "",
            "updated_by": "",
            "comments": "",
            "initial_budget": "",
            "requested_budget": "",
            "reason": "",
        }
    );
    const [userData, setUserData] = useState(
        {
            "email": "",
            "full_name": "",
            "institution": "",
            "website": "",
            "role": "Data Scientist",
        }
    );

    useEffect(async () => {
        await setRequestList(props.list)
    }, [])

    useEffect(async () => {
        await setRequestList(props.list)
    }, [props.list])

    useEffect(() => {
        console.log("data request list", requestList)
    }, [showRequestModal])

    async function getUser(e) {
        try{
            const apiRes = await fetch(
                "api/get_user_by_id",
                {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id: e
                    })
                }
            );

            if(apiRes.status == 200){
                const user = await apiRes.json();
                setUserData(user)
            }
        }
        catch (error){
            console.log(error)
        }
    }

    const acceptRequest = () => {
        setShowCommentModal(true)
        setUpdate("accept")
    }
    const rejectRequest = () => {
        setShowCommentModal(true)
        setUpdate("reject")
    }

    async function onSubmitComment() {
        try {
            const apiRes = await fetch(
                '/api/update_data_request',
                {
                    method: "PUT",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id: id,
                        comments: comment,
                        update: update
                    })
                }
            );
            if(apiRes.status == 200){
                setVariant('success');
                setAlertMessage('Request successfully '+update+"ed")
                setShowAlert(true);
                setShowCommentModal(false)
            }
            else{
                console.error(err)
                setVariant('error');
                setAlertMessage('There was an error '+update+'ing the request');
                setShowAlert(true);
            }
        }
        catch(error){
            console.log(error);
        }
    }

    const onSkipComment = async () => {
        try {
            const apiRes = await fetch(
                '/api/update_data_request',
                {
                    method: "PUT",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id: id,
                        comments: "",
                        update: update
                    })
                }
            );
            if(apiRes.status == 200){
                setVariant('success');
                setAlertMessage('Request successfully '+update+"ed")
                setShowAlert(true);
                setShowCommentModal(false)
            }
            else{
                console.error(err)
                setVariant('error');
                setAlertMessage('There was an error '+update+'ing the request');
                setShowAlert(true);
            }
        }
        catch(error){
            console.log(error);
        }
    }

    const requestsData = useMemo(() => [...requestList], [requestList]);
    const requestsColumns = useMemo(
        () => [
            {
                Header: () => <div tw="flex font-normal space-x-2"><div tw="font-roboto capitalize">#ID</div></div>,
                accessor: 'id',
                Cell: ({ row }) => (
                    <button tw="flex space-x-2 items-center" onClick={() => {
                        setRequestData(row.original)
                        getUser(row.original.request_owner);
                        setShowRequestModal(true);
                    }}>
                        <p tw="text-gray-600">#{row.values.id}</p>
                    </button>
                ),
            },
            {
                Header: () => <div tw="flex font-normal space-x-2"><div tw="font-roboto capitalize">Name</div></div>,
                accessor: 'name',
                Cell: ({ row }) => (<p tw="text-gray-600">{row.values.name}</p>),
            },
            {
                Header: () =>
                    <div tw="flex font-normal space-x-2 items-center">
                        <FontAwesomeIcon icon={faCalendar} size="sm" />
                        <div tw="font-roboto capitalize">Request Date</div>
                    </div>,
                accessor: 'request_date',
                Cell: ({row}) => {
                    {
                        var d = moment(row.values.request_date).format('YYYY-MMM-DD HH:MM')
                        return d;
                    }
                }
            },
            {
                Header: () =>
                    <div tw="flex font-normal space-x-2 items-center">
                        <FontAwesomeIcon icon={faUser} size="sm" />
                        <div tw="font-roboto capitalize">Linked Datasets</div>
                    </div>,
                accessor: 'linked_datasets',
                Cell: ({ row }) =>{{
                    var sets = row.values.linked_datasets
                    var sets_array = sets.split(', ')
                    const items = sets_array.map((set) =>
                        <Tag variant="gray"><p tw="font-bold">{set}</p></Tag>
                    );
                    return(items)
                }}
            },
            {
                Header: () =>
                    <div tw="flex font-normal space-x-2 items-center">
                        <div tw="font-bold">∑</div>
                        <div tw="font-roboto capitalize">Requested</div>
                    </div>,
                accessor: 'request_size',
                Cell: ({ row }) => {
                    {
                        return (<Tag variant={'primary'}><p tw="font-bold">{row.values.request_size} ε</p></Tag>)
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
                Cell: ({row}) => (
                    <div tw="flex inline-flex">
                        <button tw="mr-2" onClick={() => {setId(row.original.id); acceptRequest();}} >
                            <FontAwesomeIcon size="lg" icon={faCheckCircle} title="Accept" tw="text-gray-200 hover:text-success-500"/>
                        </button>
                        <button tw="mr-2"  onClick={() => {setId(row.original.id); rejectRequest();}}>
                            <FontAwesomeIcon size="lg" icon={faTimesCircle} title="Decline" tw="text-gray-200 hover:text-error-500"/>
                        </button>
                    </div>
                )
            }
        ])
    }
    const tableInstance = useTable({ columns: requestsColumns, data: requestsData }, useGlobalFilter, tableHooks, useSortBy);
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, preGlobalFilteredRows, setGlobalFilter, state } = tableInstance;

    return (
        <div tw="flex-col justify-center">
            <div tw="col-start-9 col-span-4">
                <Alert show={showAlert} onClose={() => setShowAlert(false)} variant={variant}>
                    <FontAwesomeIcon icon={faExclamationCircle} size="2x" tw=""/>
                    <p>{alertMessage}</p>
                </Alert>
            </div>
            <div tw="flex justify-between items-center">
                <div tw="inline-flex space-x-4">
                    <GlobalFilter preGlobalFilteredRows={preGlobalFilteredRows} setGlobalFilter={setGlobalFilter} globalFilter={state.globalFilter} />
                </div>
            </div>
            <RequestModal show={showRequestModal} onClose={() => setShowRequestModal(false)} requestData={requestData} userData={userData} />
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


            <Modal show={showCommentModal} onClose={() => setShowCommentModal(false)}>
                <div tw="col-span-full text-center">
                    <div tw="flex flex-col p-3 mt-3">
                        <FontAwesomeIcon icon={faComment} size="2x" tw="text-black self-center m-6"/>
                        <h1 tw="text-3xl font-bold font-rubik text-gray-800">
                            Would you like to leave a comment?
                        </h1>
                    </div>
                    <div tw="p-6 text-gray-600 font-roboto">
                        <p>
                            Lorem ipsum carrots, enhanced undergraduate developer, but they do occaecat time and vitality, such as labor and obesity. Over the years come, who nostrud exercise.
                        </p>
                    </div>
                    <form tw="flex flex-col justify-start font-roboto mx-4">
                        <label tw="text-left my-2 inline-flex"> <p tw="font-bold text-gray-500">Comment </p><p tw="pl-1 inline relative text-sm italic text-primary-600 ">(optional)</p></label>
                        <input
                            tw="text-left p-3 border border-gray-300 rounded-lg break-words resize-y focus:shadow-active hover:shadow-active active:ring-primary-500 active:text-gray-800"
                            type="text"
                            placeholder="You can leave a comment about your decision"
                            value={comment} onChange={e => setComment(e.target.value)}
                        />
                        <div tw="flex justify-end p-6 mt-10">
                            <button
                                tw="text-primary-500 font-bold py-2 px-4 mr-6 rounded-lg"
                                type="button"
                                onClick={onSkipComment}
                            >
                                Skip
                            </button>
                            <button
                                tw="bg-primary-500 rounded text-white font-bold py-2 px-4 mr-6"
                                type="button"
                                onClick={onSubmitComment}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    )
}