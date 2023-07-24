import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "antd";

interface Props {
    text: string;
}

const TooltipIcon = ({ text }: Props) => {
    return (
        <Tooltip title={text} trigger="hover">
            <FontAwesomeIcon color='#43A4FD' className="px-2 text-[25px]" icon={faInfoCircle} />
        </Tooltip>
    )
}

export default TooltipIcon;