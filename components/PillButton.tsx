interface Props {
    className: string;
    text: string;
}

const PillButton = ({className, text}: Props) => {
    return (
        <button className={`rounded-full p-2 ${className}`}>
            {text}
        </button>
    )
}

export default PillButton;