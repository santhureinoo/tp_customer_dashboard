import { v4 as uuidv4 } from 'uuid';

interface Props {
    label : string;
    data : string[];
}
const TableOptionField = ({label,data} : Props) => {
    return (
        <div key={uuidv4()} className="flex gap-x-2">
            <span key={uuidv4()} className="my-auto text-sm">{label}</span>
            <select key={uuidv4()} className="border-2 rounded-lg h-full p-2 outline-none">
                {data.map((item, idx) => {
                    return (<option key={uuidv4()}>{item}</option>)
                })}
            </select>
        </div>
    )
}

export default TableOptionField;