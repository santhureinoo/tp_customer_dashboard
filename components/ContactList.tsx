import { Contact } from "../common/types";
import rfdc from 'rfdc';
import CustomizedInput from "./CustomizedInput";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faXmarkCircle } from '@fortawesome/free-solid-svg-icons'


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
                                <div className="flex flex-row items-center gap-x-2">
                                    <FontAwesomeIcon style={{ fontSize: '2em', color: 'Dodgerblue' }} icon={faCircleCheck} />
                                    <h4 className="text-slate-400">Primary Contact</h4>
                                </div>
                                <div>
                                    <FontAwesomeIcon style={{ fontSize: '2em', cursor: 'pointer', color: 'Tomato' }} onClick={e => {
                                        const clonedContactList = cloneDeep(contactList);
                                        clonedContactList.splice(idx, 1);
                                        setContactList(clonedContactList);
                                    }} icon={faXmarkCircle} />
                                </div>
                            </div>
                            <div className="mt-3 grid grid-cols-2 gap-x-2 gap-y-6 ">
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