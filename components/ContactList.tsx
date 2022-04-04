import { Contact } from "../common/types";
import rfdc from 'rfdc';
import CustomizedInput from "./CustomizedInput";

const cloneDeep = rfdc();

interface Props {
    contactList: Contact[];
    setContactList(contacts: Contact[]): void;
}

const ContactList = ({ contactList, setContactList }: Props): React.ReactElement => {
    return (
        <>
            <div className="space-y-6">
                {contactList.map((contactObj, idx) => {
                    return (
                        <>
                            <div className="flex flex-row justify-between items-center">
                                <div className="flex flex-row content-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25">
                                        <g stroke="null">
                                            <path
                                                fill="#84D3DB"
                                                fillRule="evenodd"
                                                stroke="#fff"
                                                d="M12.3 0c6.794 0 12.3 5.507 12.3 12.3 0 6.794-5.506 12.3-12.3 12.3C5.507 24.6 0 19.095 0 12.3 0 5.507 5.507 0 12.3 0h0zM6.86 12.628c.165-.957 1.257-1.49 2.118-.971.079.046.153.102.223.165l.007.007c.386.37.82.756 1.25 1.138l.368.331 4.372-4.587c.261-.273.452-.45.844-.538 1.342-.296 2.285 1.344 1.334 2.346l-5.45 5.719c-.513.548-1.43.598-1.982.075-.317-.294-.66-.593-1.008-.895-.602-.523-1.217-1.057-1.717-1.585-.3-.3-.43-.792-.36-1.205h0z"
                                                clipRule="evenodd"
                                            ></path>
                                        </g>
                                    </svg>
                                    <h4>Primary Contact</h4>
                                </div>
                                <div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="25"
                                        height="25"
                                        data-name="Layer 1"
                                        className="cursor-pointer"
                                        onClick={e => {
                                            const clonedContactList = cloneDeep(contactList);
                                            clonedContactList.splice(idx, 1);
                                            setContactList(clonedContactList);
                                        }}
                                    >
                                        <path
                                            fill="#dd7171"
                                            fillRule="evenodd"
                                            stroke="null"
                                            d="M12.261 0A12.261 12.261 0 110 12.261 12.261 12.261 0 0112.261 0z"
                                            className="cls-1"
                                        ></path>
                                        <path
                                            fill="#ea1515"
                                            fillRule="evenodd"
                                            stroke="null"
                                            d="M5.273 9.116c-.582-.574-1.05-.935-.32-1.643l2.353-2.297c.746-.754 1.183-.716 1.885 0l3.165 3.17 3.153-3.154c.577-.584.935-1.053 1.643-.323l2.292 2.354c.754.746.716 1.185 0 1.885l-3.16 3.164 3.16 3.17c.714.695.751 1.134 0 1.885l-2.3 2.354c-.708.73-1.077.269-1.643-.32l-3.145-3.168-3.173 3.18c-.694.712-1.13.75-1.885 0l-2.353-2.296c-.73-.709-.27-1.078.32-1.643l3.164-3.162-3.156-3.156z"
                                            className="cls-2"
                                        ></path>
                                    </svg>

                                </div>
                            </div>
                            <div className="mt-3 grid grid-cols-2 gap-x-2 gap-y-6 items-end ">
                                <CustomizedInput value={contactObj.ContactPerson} label={"Contact Person"} inputType="text" />
                                <CustomizedInput value={contactObj.Position} label={"Position"} inputType="text" />
                                <CustomizedInput value={contactObj.EmailAddress} label={"Email Address"} inputType="mail" />
                                <CustomizedInput value={contactObj.PhoneNumber} label={"Phone Number"} inputType="text" />
                            </div>
                        </>)
                })}
                <div className="flex justify-end">
                    <span onClick={e => {
                        setContactList([...contactList, {
                            ContactPerson: 'Andrew Showlin',
                            Position: 'Finance Manager',
                            EmailAddress: 'andrew@gmail.com',
                            PhoneNumber: '+628788719580',
                        }])
                    }} className="cursor-pointer text-sm text-sky-400">Add More Person in Charge</span>
                </div>
            </div>

        </>
    )
}

export default ContactList;