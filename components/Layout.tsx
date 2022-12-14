import Sidebar from "./Sidebar"
import React from 'react';
import Head from "next/head";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';
import CustomSelect from "./cardcomponents/CustomSelect";

interface Props {
    title: string[];
    children: any;
}

const Layout = ({ title, children }: Props) => {
    const [sidebarOpen, setSidebarOpen] = React.useState(true);
    return (
        <React.Fragment>
            <Head>
                <title>Dashboard</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex h-screen bg-custom-lightgray">
                <Sidebar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
                <div className="flex-1 flex flex-col overflow-scroll ">
                    <div className="flex-1 overflow-x-hidden overflow-y-auto bg-custom-lightgray">
                        <div className="container mx-auto px-6 py-8">
                            <button onClick={e => {
                                setSidebarOpen(!sidebarOpen)
                            }} className="text-gray-500 focus:outline-none lg:hidden">
                                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 6H20M4 12H20M4 18H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                        strokeLinejoin="round"></path>
                                </svg>
                            </button>
                            {children}
                        </div>
                    </div>
                </div>
            </main>
        </React.Fragment>
    )
}

export default Layout;