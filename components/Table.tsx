import Searchfield from "./Searchfield";
import React, { useRef } from 'react';
import OutletEdit from "./OutletEdit";
import { DummyTableDataRow } from "../common/constant";
import TinyEditDeleteMenu from "./TinyEditDeleteMenu";
import { TableProps } from "../common/types";

interface Props {
    handleEdit(): any;
    handleDelete(): any;
    handleAddNew(): any;
    rightSideElements: JSX.Element[];
    leftSideElements: JSX.Element[];
    buttonText: string;
}

const Table = ({ headers, data, handleAddNew, handleEdit, handleDelete, rightSideElements = [], leftSideElements = [], buttonText }: Props & TableProps) => {
    const [openTinyMenuIndex, setOpenTinyMenuIndex] = React.useState(-1);
    return (
        <>
            <div className="shadow-md p-4 bg-white">
                <div className="grid grid-cols-2 justify-between py-2 grow-0">
                    <div className="flex flex-row gap-x-2">
                        {rightSideElements}
                    </div>
                    <div className="flex flex-row justify-end gap-x-2">
                        {leftSideElements}
                        <button type="button" onClick={(e) => { handleAddNew() }} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            {buttonText}
                        </button>
                    </div>
                </div>
                <table className="items-center w-full bg-transparent border-collapse overflow-scroll">
                    <thead>
                        <tr>
                            {headers.map((header,idx) => {
                                return (<th key={header+"-"+idx} className="px-6 bg-blueGray-50 text-gray-300 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-t-0 border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    {header}
                                </th>)
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((obj,i) => {
                            return (
                                <tr key={'data-'+i} className="odd:bg-white even:bg-slate-100">
                                    {Object.keys(obj).map((key,i) => {
                                        return (
                                            <td key={key+'-'+i} className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                {obj[key]}
                                            </td>
                                        )
                                    })}
                                    <th onClick={(e: React.MouseEvent<HTMLElement>) => {
                                        if (i === openTinyMenuIndex) setOpenTinyMenuIndex(-1)
                                        else setOpenTinyMenuIndex(i);
                                    }} className="relative cursor-pointer px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg>
                                        <div className={`${openTinyMenuIndex === i ? 'absolute' : 'hidden'} z-20 top-8 -left-8`}>
                                            <TinyEditDeleteMenu onEdit={handleEdit} onDelete={handleDelete} />
                                        </div>
                                    </th>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div className="container flex justify-end p-3 px-8">
                <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm space-x-3" aria-label="Pagination">
                        <a
                            href="#"
                            className="relative inline-flex items-center px-2 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        >
                            <span className="sr-only">Previous</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                        </a>
                        {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
                        <a
                            href="#"
                            aria-current="page"
                            className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 rounded-md relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                        >
                            1
                        </a>
                        <a
                            href="#"
                            className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative rounded-md inline-flex items-center px-4 py-2 border text-sm font-medium"
                        >
                            2
                        </a>
                        <a
                            href="#"
                            className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden rounded-md md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
                        >
                            3
                        </a>
                        <a
                            href="#"
                            className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden rounded-md md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
                        >
                            4
                        </a>
                        <a
                            href="#"
                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border rounded-md border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        >
                            <span className="sr-only">Next</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                        </a>
                    </nav>
                </div>
            </div>
        </>

    )
}

export default Table;