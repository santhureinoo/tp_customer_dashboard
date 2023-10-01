import Sidebar from "./Sidebar"
import React from 'react';
import Head from "next/head";
import { gql, useQuery } from "@apollo/client";

interface Props {
    title: string[];
    groupId: string;
    children: any;
}

const Layout = ({ title, groupId, children }: Props) => {
    const [sidebarOpen, setSidebarOpen] = React.useState(true);
    const [group, setGroup] = React.useState("");
    //Group Query by Id
    const getGroupQuery = gql`query Fetchgroup($GroupWhereUniqueInput: GroupWhereUniqueInput!) {
        group (where: $GroupWhereUniqueInput){
            group_id,
            group_name
        }
         
     }`

    const getGroupVariable = {
        "variables":
        {
            "GroupWhereUniqueInput": { "group_id": groupId }
        }
    }
    const getGroupByIdResult = useQuery(getGroupQuery, getGroupVariable)
    React.useEffect(() => {
        if (getGroupByIdResult.data) {
            setGroup(getGroupByIdResult.data.group.group_name)
        }
    }, [getGroupByIdResult.data]);
    return (
        <React.Fragment>
            <Head>
                <title>Dashboard</title>
                <link rel="icon" href="asserts/TP Favicon-Circle.svg" />
            </Head>
            <main className="flex h-screen bg-custom-lightgray">
                <Sidebar groupName={group} setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
                <div className="flex-1 flex flex-col">
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