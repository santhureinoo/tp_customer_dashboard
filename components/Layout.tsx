import Sidebar from "./Sidebar"
import React from 'react';
import Head from "next/head";
import { gql, useQuery } from "@apollo/client";
import { global_input } from "../common/types";

interface Props {
    title: string[];
    groupId: string;
    children: any;
}

const Layout = ({ title, groupId, children }: Props) => {
    const [sidebarOpen, setSidebarOpen] = React.useState(true);
    const [globalSetting, setGlobalSetting] = React.useState("");
    const [group, setGroup] = React.useState<{
        group_name: string
        live_energy_measurement: string
        hide: boolean
    }>({
        group_name: '',
        live_energy_measurement: '',
        hide: false
    });
    //Group Query by Id
    const getGroupQuery = gql`query Fetchgroup($GroupWhereUniqueInput: GroupWhereUniqueInput!) {
        group (where: $GroupWhereUniqueInput){
            group_id,
            group_name,
            live_energy_measurement,
            hide
        }
         
     }`

    const getGroupVariable = {
        "variables":
        {
            "GroupWhereUniqueInput": { "group_id": groupId }
        }
    }

    const getGlobalInputQuery = gql`
    query Global_input($where: Global_inputWhereUniqueInput!) {
        global_input(where: $where) {
          live_energy_measurement
        }
      }`;

    const getGlobalInputVariable = {
        "variables": {
            "where": {
                "global_input_id": 1
            }
        }
    }
    const getGroupByIdResult = useQuery(getGroupQuery, getGroupVariable);
    const getGlobalInputResult = useQuery(getGlobalInputQuery, getGlobalInputVariable);

    React.useEffect(() => {
        if (getGroupByIdResult.data) {
            setGroup({
                group_name: getGroupByIdResult.data.group.group_name,
                live_energy_measurement: getGroupByIdResult.data.group.live_energy_measurement,
                hide: getGroupByIdResult.data.group.hide
            })
        }
    }, [getGroupByIdResult.data]);

    React.useEffect(() => {
        if (getGlobalInputResult.data) {
            setGlobalSetting(getGlobalInputResult.data.global_input.live_energy_measurement);
        }
    }, [getGlobalInputResult]);
    return (
        <React.Fragment>
            <Head>
                <title>Dashboard</title>
                <link rel="icon" href="asserts/TP Favicon-Circle.svg" />
            </Head>
            <main className="flex h-screen bg-custom-lightgray">
                <Sidebar group={group} setSidebarOpen={setSidebarOpen} url={globalSetting} sidebarOpen={sidebarOpen} />
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