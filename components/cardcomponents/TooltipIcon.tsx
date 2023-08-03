import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "antd";

interface Props {
    text: string | JSX.Element;
}

const TooltipIcon = ({ text }: Props) => {
    return (
        <Tooltip title={<div className="leading-tight w-100">{text}</div>} trigger="hover">
            <FontAwesomeIcon color='#43A4FD' className="text-[25px]" icon={faInfoCircle} />
        </Tooltip>
    )
}

export default TooltipIcon;