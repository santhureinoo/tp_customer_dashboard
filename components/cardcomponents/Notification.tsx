import Card from '../Card';
import Jumbotron from './Jumbotron';

interface Props {
    IconColor: 'red' | 'green' | 'orange';
    Description: string;
    IsOpen: boolean;
}

const redSVG = (): JSX.Element => {
    return (<svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="26"
        fill="none"
        viewBox="0 0 25 26"
    >
        <circle cx="12.5" cy="12.833" r="12.5" fill="#FDD3DB"></circle>
        <path
            fill="#ED113C"
            d="M7.746 13.372l2.025-3.314c.903-1.477 1.354-2.216 1.935-2.467a2 2 0 011.59 0c.582.251 1.033.99 1.936 2.467l2.025 3.314c.973 1.591 1.459 2.387 1.401 3.043a2 2 0 01-.804 1.435c-.53.39-1.462.39-3.328.39h-4.05c-1.865 0-2.797 0-3.327-.39a2 2 0 01-.805-1.435c-.057-.656.43-1.451 1.402-3.043z"
        ></path>
        <path
            stroke="#fff"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12.502 10.51v3.514M12.502 15.078v1.406"
        ></path>
    </svg>)
}

const orangeSVG = (): JSX.Element => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="none"
            viewBox="0 0 25 25"
        >
            <circle
                cx="12.5"
                cy="12.5"
                r="12.5"
                fill="#FF6F00"
                opacity="0.1"
            ></circle>
            <path
                fill="#FF6F00"
                d="M7.746 13.039L9.77 9.725c.903-1.477 1.354-2.216 1.935-2.467a2 2 0 011.59 0c.582.251 1.033.99 1.936 2.467l2.025 3.314c.973 1.591 1.459 2.387 1.401 3.043a2 2 0 01-.804 1.435c-.53.39-1.462.39-3.328.39h-4.05c-1.865 0-2.797 0-3.327-.39a2 2 0 01-.805-1.435c-.057-.656.43-1.452 1.402-3.043z"
            ></path>
            <path
                stroke="#fff"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12.502 10.177v3.514M12.502 14.745v1.406"
            ></path>
        </svg>
    )
}

const greenSVG = (): JSX.Element => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="26"
            fill="none"
            viewBox="0 0 25 26"
        >
            <circle
                cx="12.5"
                cy="13.166"
                r="12.5"
                fill="#1FBF5F"
                opacity="0.1"
            ></circle>
            <path
                fill="#1FBF5F"
                d="M7.746 13.705l2.025-3.314c.903-1.477 1.354-2.216 1.935-2.467a2 2 0 011.59 0c.582.251 1.033.99 1.936 2.467l2.025 3.314c.973 1.591 1.459 2.387 1.401 3.043a2 2 0 01-.804 1.435c-.53.39-1.462.39-3.328.39h-4.05c-1.865 0-2.797 0-3.327-.39a2 2 0 01-.805-1.435c-.057-.656.43-1.452 1.402-3.043z"
            ></path>
            <path
                stroke="#fff"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12.502 10.843v3.514M12.502 15.411v1.406"
            ></path>
        </svg>
    )
}

const Notification = ({ IconColor, Description, IsOpen }: Props): JSX.Element => {
    let iconSVG;
    switch (IconColor) {
        case 'red':
            iconSVG = redSVG();
            break;
        case 'orange':
            iconSVG = orangeSVG();
            break;
        default:
            iconSVG = greenSVG();
            break;
    }
    return (
        <div className="gap-x-2 rounded-lg border-2 p-1 flex flex-row items-center text-extraSmall">
            {iconSVG}
            <p>
                {Description}
            </p>
            <span>{IsOpen ? 'Open' : 'Closed'}</span>
        </div>

    )
}

export default Notification;