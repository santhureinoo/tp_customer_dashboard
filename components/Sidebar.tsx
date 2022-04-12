import Link from "next/link";
import React from "react";
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie } from '@fortawesome/free-solid-svg-icons';

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
                        <h2 className="text-3xl mx-2 font-bold">Welcome,<br />Customer</h2>
                    </div>
                </div>

                <nav className="mt-10 space-y-3 px-2">
                    <Link href="/">
                        <a className={router.pathname == "/" ? "link-active" : "link"}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="none"
                                viewBox="0 0 25 25"
                            >
                                <circle cx="12.5" cy="12.5" r="12.5" fill="#147CFC"></circle>
                                <path
                                    fill="#fff"
                                    fillRule="evenodd"
                                    d="M12.686 6.969a.466.466 0 01.332-.118c2.582.077 4.74 1.952 5.131 4.458a.137.137 0 010 .045.442.442 0 01-.11.325.459.459 0 01-.314.152l-4.339.286a.518.518 0 01-.392-.13.498.498 0 01-.166-.372l-.291-4.262v-.07a.448.448 0 01.149-.314zm-.298 6.262l3.76-.24.026.01a.615.615 0 01.428.181.591.591 0 01.17.426c-.147 2.16-1.73 3.963-3.885 4.428-2.154.465-4.363-.521-5.42-2.42a4.641 4.641 0 01-.579-1.772 3.365 3.365 0 01-.036-.557c.007-2.297 1.642-4.279 3.93-4.764a.622.622 0 01.675.336c.03.045.054.094.072.146.043.662.087 1.317.131 1.97l.104 1.543c-.002.121.017.242.056.357.092.226.32.37.568.356z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                            <span className="mx-3">Dashboard</span>
                        </a>
                    </Link>
                </nav>
            </div>
        </>
    )
}

export default Sidebar;