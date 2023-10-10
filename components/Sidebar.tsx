import Link from "next/link";
import React from "react";
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from "next/image";
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
                    <div className="flex py-[20px] px-[10px]">
                        <Image alt="barcode not found" src="/asserts/Tablepointer Logo-Colour.svg" width={189} height={50} />
                    </div>
                    <div className="flex items-center px-4">
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
                            <a className={router.pathname == "/customer" ? "link-active" : "link"}>
                                <div className={`${router.pathname == "/customer" ? "bg-custom-darkblue" : "bg-custom-dark-gray"} p-2 rounded-full`}>
                                    <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M6.19264 0.57827C6.28647 0.494047 6.41059 0.4499 6.53764 0.455563C9.22331 0.53596 11.4678 2.4856 11.8746 5.09137C11.8772 5.10693 11.8772 5.1228 11.8746 5.13836C11.8834 5.26165 11.8417 5.38329 11.7588 5.47636C11.676 5.56943 11.5587 5.62627 11.433 5.63431L6.92075 5.93188C6.77153 5.94511 6.62354 5.896 6.51314 5.79663C6.40274 5.69726 6.34015 5.55682 6.34076 5.40982L6.03746 0.977614V0.904527C6.04298 0.779873 6.09881 0.662492 6.19264 0.57827ZM5.88298 7.09088L9.79394 6.8403L9.82054 6.85074C9.98849 6.85349 10.1484 6.92159 10.2652 7.04006C10.382 7.15852 10.4459 7.31765 10.4431 7.48242C10.289 9.72817 8.64251 11.6046 6.40187 12.088C4.16124 12.5714 1.86431 11.5458 0.764148 9.57063C0.440653 9.00175 0.236229 8.37522 0.162871 7.72779C0.13442 7.53594 0.121962 7.34214 0.125624 7.14831C0.133039 4.7603 1.83323 2.6991 4.21218 2.19405C4.50016 2.14014 4.7889 2.28393 4.91455 2.54382C4.94583 2.59098 4.97086 2.64185 4.98905 2.69522C5.03364 3.3836 5.0799 4.06546 5.12596 4.74445C5.16234 5.28069 5.19859 5.81513 5.23381 6.34957C5.232 6.47547 5.25178 6.60077 5.29235 6.72023C5.38783 6.95527 5.62546 7.10439 5.88298 7.09088Z" fill="white" />
                                    </svg>
                                </div>

                                <span className="mx-3 text-[14px]">Dashboard</span>
                            </a>
                        </Link>
                        <Link href="http://13.212.69.26:8001" passHref={true}>
                            <a className="link w-full" target="_blank">
                                <div className={`bg-custom-dark-gray px-1.5 py-2 rounded-full`}>
                                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.7273 -0.000335693H0.545454C0.24375 -0.000335693 0 0.243414 0 0.545119V11.4542C0 11.7559 0.24375 11.9997 0.545454 11.9997H14.7273C15.029 11.9997 15.2727 11.7559 15.2727 11.4542V0.545119C15.2727 0.243414 15.029 -0.000335693 14.7273 -0.000335693ZM13.154 3.3133L8.09148 8.37921C8.06585 8.40459 8.03124 8.41882 7.99517 8.41882C7.9591 8.41882 7.92449 8.40459 7.89886 8.37921L5.94716 6.42751L3.00682 9.36955C2.98119 9.39493 2.94658 9.40916 2.91051 9.40916C2.87444 9.40916 2.83983 9.39493 2.8142 9.36955L2.18693 8.74228C2.16155 8.71665 2.14732 8.68204 2.14732 8.64597C2.14732 8.6099 2.16155 8.57529 2.18693 8.54966L5.85 4.88489C5.90284 4.83205 5.98977 4.83205 6.04261 4.88489L7.99432 6.83489L12.3324 2.49512C12.3852 2.44228 12.4722 2.44228 12.525 2.49512L13.1523 3.12239C13.2068 3.17353 13.2068 3.26046 13.154 3.3133Z" fill="white" />
                                    </svg>

                                </div>
                                <span className="mx-3 text-custom-2xs">Live Energy Measurement</span>
                            </a>
                        </Link>
                        <Link href="/raw">
                            <a className={router.pathname == "/raw" ? "link-active" : "link"}>
                                <div className={`${router.pathname == "/raw" ? "bg-custom-darkblue" : "bg-custom-dark-gray"} p-2 rounded-full`}>
                                    <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 0H0.428571C0.191518 0 0 0.191518 0 0.428571V3.42857H9.42857V0.428571C9.42857 0.191518 9.23705 0 9 0ZM1.71429 2.25C1.4183 2.25 1.17857 2.01027 1.17857 1.71429C1.17857 1.4183 1.4183 1.17857 1.71429 1.17857C2.01027 1.17857 2.25 1.4183 2.25 1.71429C2.25 2.01027 2.01027 2.25 1.71429 2.25ZM0 11.5714C0 11.8085 0.191518 12 0.428571 12H9C9.23705 12 9.42857 11.8085 9.42857 11.5714V8.57143H0V11.5714ZM1.71429 9.75C2.01027 9.75 2.25 9.98973 2.25 10.2857C2.25 10.5817 2.01027 10.8214 1.71429 10.8214C1.4183 10.8214 1.17857 10.5817 1.17857 10.2857C1.17857 9.98973 1.4183 9.75 1.71429 9.75ZM0 7.71429H9.42857V4.28571H0V7.71429ZM1.71429 5.46429C2.01027 5.46429 2.25 5.70402 2.25 6C2.25 6.29598 2.01027 6.53571 1.71429 6.53571C1.4183 6.53571 1.17857 6.29598 1.17857 6C1.17857 5.70402 1.4183 5.46429 1.71429 5.46429Z" fill="white" />
                                    </svg>
                                </div>
                                <span className="mx-3 text-[14px]">Raw Data</span>
                            </a>
                        </Link>
                    </nav>
                </div>

                <nav className="mt-10 px-2 py-2">
                    <Link href="https://www.tablepointer.com/terms-conditions">
                        <a className="link w-full">
                            <span className="mx-3 font-bold text-custom-2xs">Terms of Service</span>
                        </a>
                    </Link>
                    <Link href="/api/logout">
                        <a className="link w-full place-content-center">
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