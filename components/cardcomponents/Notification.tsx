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
        <div className="gap-x-1 rounded-lg border-2 p-1 flex flex-row items-center text-extraSmall">
            <Image src={`/asserts/${IconColor}warningicon.svg`} width="25" height="25" />
            <p>
                {Description}
            </p>
            <span>{IsOpen ? 'Open' : 'Closed'}</span>
        </div>

    )
}

export default Notification;