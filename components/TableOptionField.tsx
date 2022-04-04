interface Props {
    label : string;
    data : string[];
}
const TableOptionField = ({label,data} : Props) => {
    return (
        <div key={label+ '-container'} className="flex gap-x-2">
            <span key={label + '-span'} className="my-auto text-sm">{label}</span>
            <select key={label + '-select'} className="border-2 rounded-lg h-full p-2 outline-none">
                {data.map((item, idx) => {
                    return (<option key={item + '-' + idx}>{item}</option>)
                })}
            </select>
        </div>
    )
}

export default TableOptionField;