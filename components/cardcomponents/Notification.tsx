import Card from '../Card';
import Jumbotron from './Jumbotron';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation, faCircle } from '@fortawesome/free-solid-svg-icons';

interface Props {
    IconColor: 'red' | 'green' | 'orange';
    Description: string;
    IsOpen: boolean;
}

const Notification = ({ IconColor, Description, IsOpen }: Props): JSX.Element => {
    return (
        <div className="gap-x-1 rounded-lg border-2 p-1 flex flex-row items-center text-extraSmall">
            <FontAwesomeIcon className={`${'bg-'+IconColor+'-200'} rounded-lg p-1 ${'text-' + IconColor + '-600'}`} icon={faTriangleExclamation} />
            <p>
                {Description}
            </p>
            <span>{IsOpen ? 'Open' : 'Closed'}</span>
        </div>

    )
}

export default Notification;