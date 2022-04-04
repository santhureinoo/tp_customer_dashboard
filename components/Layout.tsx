import Sidebar from "./Sidebar"
import React from 'react';

interface Props {
    title: string;
    children: any;
}

const Layout = ({ title, children }: Props) => {
    const [sidebarOpen, setSidebarOpen] = React.useState(true);
    return (
        <>
            <div className="flex h-screen bg-gray-200">
                <Sidebar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
                <div className="flex-1 flex flex-col overflow-scroll ">
                    <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
                        <div className="container mx-auto px-6 py-8">
                            <button onClick={e => {
                                setSidebarOpen(!sidebarOpen)
                            }} className="text-gray-500 focus:outline-none lg:hidden">
                                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 6H20M4 12H20M4 18H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                        strokeLinejoin="round"></path>
                                </svg>
                            </button>
                            <h3 className="text-gray-700 text-3xl font-medium">{title}</h3>

                            <div className="flex flex-col mt-8">
                                <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                                    <div
                                        className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                                        {children}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Layout;