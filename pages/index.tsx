import React, { FormEvent } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { withIronSessionSsr } from "iron-session/next";
import { gql, useLazyQuery } from '@apollo/client';
const GroupLogin = () => {
    const formRef = React.useRef<HTMLFormElement | null>(null);
    const [groupId, setGroupId] = React.useState('');
    const [groupIdError, setGroupIdError] = React.useState('');
    const getFirstGroupPasswordQuery = gql`
    query FindFirstGroup_password($where: Group_passwordWhereInput) {
        findFirstGroup_password(where: $where) {
          group_id
        }
      }
    `;


    const getFirstGroupPassword = useLazyQuery(getFirstGroupPasswordQuery);

    const onSubmit = async (e: FormEvent<HTMLButtonElement>) => {
        setGroupIdError('');
        if (groupId) {
            const result = await getFirstGroupPassword[0]({
                "variables": {
                    "where": {
                        "password": {
                            "equals": groupId
                        }
                    }
                }
            })

            if (result.data && result.data.findFirstGroup_password && result.data.findFirstGroup_password.group_id) {
                formRef.current?.submit();
                // e.currentTarget.submit();
            } else {
                setGroupIdError("This groupd ID doesn't exist.")
            }
        } else {
            setGroupIdError("Group ID is required.")
        }
    }
    return (
        <React.Fragment>
            <div className="bg-[#F5F5F7] dark:bg-[#F5F5F7]">
                <div className="flex bg-[#FFFFFF] justify-center h-screen">
                    <div className="hidden bg-cover lg:block lg:w-2/3 bg-[url('/grouplogin.jpg')]">
                        <div className="flex h-full px-20 py-20 bg-gray-900 bg-opacity-40">
                            <div>
                                {/* <h2 className="text-4xl">Welcome to</h2> */}
                                <img width='350' src="/asserts/tablepointer.svg"></img>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
                        <div className="flex-1 bg-white shadow-2xl p-4">
                            <div>
                                <h2 className="text-2xl font-thin">Welcome to</h2>
                                <h2 className="text-2xl font-bold">Customer Dashboard</h2>
                            </div>

                            <div className="mt-8">
                                <form ref={formRef} action="/api/login" className='flex flex-col'>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm text-[#989AAC] dark:text-[#989AAC]">Group ID</label>
                                        <input type="text" name="group-id" id="group-id" value={groupId}
                                            onChange={e => { setGroupIdError(''); setGroupId(e.currentTarget.value) }}
                                            className={`block w-full px-4 py-2 mt-2 placeholder-gray-400 border 
                                            ${groupIdError ? 'border-red-200 focus:border-red-400 dark:focus:border-red-400 dark:border-red-700 focus:ring-red-400 ' :
                                                    'border-gray-200 focus:border-blue-400 dark:focus:border-blue-400 dark:border-gray-700 focus:ring-blue-400 '}
                                             rounded-md dark:placeholder-gray-600 focus:outline-none focus:ring focus:ring-opacity-40`} />
                                        {groupIdError && <p className="py-2 text-red-500 text-xs italic">{groupIdError}</p>}
                                        <span className='float-right pt-2 text-[#989AAC] dark:text-[#989AAC] text-xs'>{`Don’t have your Group ID? Contact Your Account Manager`}</span>
                                    </div>
                                    <ReCAPTCHA className='mt-6' size="normal" sitekey={process.env.RECAPT_SITEKEY || ''} />
                                    <div className="mt-6">
                                        <button onClick={e => onSubmit(e)} type="button"
                                            className="w-full px-4 py-2 tracking-wide  transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                            Sign in
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment >
    )
}

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req }: any) {
        if (req.session && req.session.group && req.session.group.id) {
            return {
                redirect: {
                    destination: '/dashboard',
                    permanent: false,
                }
            }
        }
        return {
            props: {}, // will be passed to the page component as props
        }
    },
    {
        cookieName: "group_cookie",
        password: "3gPKYNRUgfPUAvifn51hydCA8NP8VdXh",
        // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
        cookieOptions: {
            secure: process.env.NODE_ENV === "production",
        },
    },
);


export default GroupLogin;