import { useState, useEffect, useMemo } from 'react';
import { useGlobalFilter, useSortBy, useTable } from 'react-table'
import axios from 'axios';
import tw from 'twin.macro';
import { GlobalFilter } from '../components/GlobalFilter';

const Table = tw.table`
  table-fixed
  text-base
  text-gray-900
`;

const TableHead = tw.thead`
    px-6 py-4 text-base font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-t border-b border-gray-200
`;

const TableRow = tw.tr`
    px-6 py-4 whitespace-nowrap border-t border-b border-gray-200
`;

const TableHeader = tw.th`
    px-6 py-4 text-base font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-t border-b border-gray-200    
`;

const TableBody = tw.tbody`
`;

const TableData = tw.td`
    px-6 py-4 whitespace-nowrap border-t border-b border-gray-200
`;

const Button = tw.button`
  pl-4
  pr-4
  pt-2
  pb-2
  text-black
  rounded-md
  bg-primary-300
  hover:bg-primary-200
  transition-colors
`;
export default function UsersOld(){

    const [userlist, setUserlist] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUserlist = async () => {
        try{
            setLoading(true);
            const apiRes = await fetch(
                '/api/accepted_userlist',
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
        hooks.visibleColumns.push((columns) => [
            ...columns,
            {
                id: "Edit", 
                Header: 'Edit',
                Cell: ({ row }) => (
                    <Button onClick={() => alert("Editing: " + row.values.id)}>Edit</Button>
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
            <h1 tw="text-center">REACT TABLE</h1>
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