import Link from "next/link";
import React from "react";
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faWrench, faUserGroup, faBriefcase, faUser, faWallet } from '@fortawesome/free-solid-svg-icons'

interface Props {
    sidebarOpen: boolean;
    setSidebarOpen(sidebarOpen: boolean): void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: Props) => {
    const router = useRouter();
    return (
        <>
            <div onClick={e => {
                setSidebarOpen(!sidebarOpen);
            }} className={`${sidebarOpen ? 'block' : 'hidden'} drop-shadow-lg fixed z-20 inset-0 bg-white opacity-50 transition-opacity lg:hidden`}></div>
            <div className={`${sidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'} fixed z-30 inset-y-0 left-0 w-64 transition duration-300 transform bg-white overflow-y-auto lg:translate-x-0 lg:static lg:inset-0`}>
                <div className="flex items-start pt-8 px-4">
                    <div className="flex">
                        <span className="text-2xl mx-2 font-semibold">Welcome,<br />Admin</span>
                    </div>
                </div>

                <nav className="mt-10 space-y-3 px-2">
                    <Link href="/">
                        <a className={router.pathname == "/" ? "link-active" : "link"}>
                            <FontAwesomeIcon icon={faUserGroup} />
                            <span className="mx-3">Customer</span>
                        </a>
                    </Link>
                    <Link href="/Outlets">
                        <a className={router.pathname == "/Outlets" ? "link-active" : "link"}>
                            <FontAwesomeIcon icon={faBriefcase} />
                            <span className="mx-3">Outlet</span>
                        </a>
                    </Link>
                    <Link href="/Equipments">
                        <a className={router.pathname == "/Equipments" ? "link-active" : "link"}>
                            <FontAwesomeIcon icon={faWrench} />
                            <span className="mx-3">Equipment</span>
                        </a>
                    </Link>
                    <Link href="/Users">
                        <a className={router.pathname == "/Users" ? "link-active" : "link"}>
                            <FontAwesomeIcon icon={faUser} />
                            <span className="mx-3">User</span>
                        </a>
                    </Link>
                    <Link href="/Billings">
                        <a className={router.pathname == "/Billings" ? "link-active" : "link"}>
                            <FontAwesomeIcon icon={faWallet} />
                            <span className="mx-3">Billing</span>
                        </a>
                    </Link>
                </nav>
            </div>
        </>
    )
}

export default Sidebar;