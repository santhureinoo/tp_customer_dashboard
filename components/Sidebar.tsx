import Link from "next/link";
import React from "react";
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie, faSignOut } from '@fortawesome/free-solid-svg-icons';

interface Props {
    sidebarOpen: boolean;
    groupName: string;
    setSidebarOpen(sidebarOpen: boolean): void;
}

const Sidebar = ({ sidebarOpen, groupName, setSidebarOpen }: Props) => {
    const router = useRouter();
    return (
        <>
            <div onClick={e => {
                setSidebarOpen(!sidebarOpen);
            }} className={`${sidebarOpen ? 'block' : 'hidden'} drop-shadow-lg fixed z-20 inset-0 bg-white opacity-50 transition-opacity lg:hidden`}></div>
            <div className={`${sidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'} flex flex-col justify-between fixed z-30 inset-y-0 left-0 w-48 transition duration-300 h-screen transform bg-white overflow-y-auto lg:translate-x-0 lg:static lg:inset-0`}>

                <div>
                    <div className="flex items-center pt-8 px-4">
                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="13" cy="13" r="13" fill="#E8F2FF" />
                            <g clipPath="url(#clip0_1293_87)">
                                <path d="M12.9137 12.7804C13.7079 12.7804 14.3955 12.4956 14.9574 11.9337C15.5192 11.3718 15.8041 10.6843 15.8041 9.89013C15.8041 9.09618 15.5192 8.40862 14.9573 7.84658C14.3953 7.28482 13.7078 7 12.9137 7C12.1195 7 11.4321 7.28482 10.8702 7.84668C10.3083 8.40853 10.0234 9.09609 10.0234 9.89013C10.0234 10.6843 10.3083 11.3719 10.8703 11.9338C11.4322 12.4955 12.1198 12.7804 12.9137 12.7804Z" fill="#147CFC" />
                                <path d="M17.9717 16.2273C17.9555 15.9935 17.9228 15.7384 17.8745 15.4691C17.8258 15.1977 17.7631 14.9412 17.688 14.7067C17.6105 14.4644 17.505 14.2251 17.3746 13.9957C17.2393 13.7577 17.0804 13.5504 16.902 13.3799C16.7155 13.2014 16.4872 13.058 16.2232 12.9533C15.9601 12.8492 15.6685 12.7965 15.3565 12.7965C15.234 12.7965 15.1156 12.8467 14.8868 12.9957C14.746 13.0875 14.5813 13.1937 14.3974 13.3112C14.2402 13.4113 14.0273 13.5052 13.7643 13.5901C13.5076 13.6732 13.2471 13.7153 12.9899 13.7153C12.7327 13.7153 12.4723 13.6732 12.2154 13.5901C11.9526 13.5053 11.7397 13.4114 11.5827 13.3113C11.4006 13.1949 11.2358 13.0887 11.0929 12.9956C10.8643 12.8466 10.7458 12.7964 10.6233 12.7964C10.3113 12.7964 10.0198 12.8492 9.75674 12.9534C9.49288 13.0579 9.26446 13.2013 9.07779 13.3799C8.89953 13.5506 8.74051 13.7578 8.60537 13.9957C8.4751 14.2251 8.36963 14.4643 8.29199 14.7068C8.21701 14.9413 8.1543 15.1977 8.10559 15.4691C8.05734 15.7381 8.02457 15.9932 8.00836 16.2276C7.99243 16.4572 7.98438 16.6955 7.98438 16.9362C7.98438 17.5626 8.1835 18.0697 8.57617 18.4437C8.96399 18.8128 9.47714 19 10.1012 19H15.8792C16.5032 19 17.0162 18.8128 17.4041 18.4437C17.7969 18.07 17.996 17.5628 17.996 16.9361C17.9959 16.6943 17.9878 16.4558 17.9717 16.2273Z" fill="#147CFC" />
                            </g>
                            <defs>
                                <clipPath id="clip0_1293_87">
                                    <rect width="12" height="12" fill="white" transform="translate(7 7)" />
                                </clipPath>
                            </defs>
                        </svg>

                        <div className="flex">
                            <h2 className="text-[14px] mx-2 font-bold">Welcome,<br />{groupName}</h2>
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
                                <span className="mx-3 text-[14px]">Dashboard</span>
                            </a>
                        </Link>
                    </nav>
                </div>

                <nav className="mt-10 space-y-3 px-2 py-4">
                    <Link href="/api/logout">
                        <a className="link">
                            <FontAwesomeIcon style={{ cursor: 'pointer' }} icon={faSignOut} />
                            <span className="mx-3 text-[14px]">LogOut</span>
                        </a>
                    </Link>

                </nav>
            </div>
        </>
    )
}

export default Sidebar;