import Card from '../Card';
import Jumbotron from './Jumbotron';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation, faCircle } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

interface Props {
    IconColor: 'red' | 'green' | 'orange';
    Description: string;
    IsOpen: boolean;
}

const Notification = ({ IconColor, Description, IsOpen }: Props): JSX.Element => {
    return (
        <div className="gap-y-2 rounded-lg border-2 p-2 flex flex-col items-start text-sm">
            <Image alt="WarningIcon" src={`/asserts/${IconColor}warningicon.svg`} width="50" height="50" />
            <p className='font-bold'>
                {Description}
            </p>
            <span className='text-custom-darkblue  cursor-pointer'>{IsOpen ? 'Open' : 'Closed'}</span>
        </div>

    )
}

export default Notification;