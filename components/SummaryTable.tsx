import { TableProps } from "../common/types";

const SummaryTable = ({ headers, data, headerColor }: TableProps) => {
    return (
        <table>
            <thead>
                <tr className={`${headerColor ? headerColor : ''}`}>
                    {headers.map((header, idx) => {
                        return (<th key={header + '-' + idx} className="px-6 bg-blueGray-50 text-gray-300 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-t-0 border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            {header}
                        </th>);
                    })}
                </tr>
            </thead>
            <tbody>
                {data.map((obj, idx) => {
                    return (
                        <tr key={'data-' + idx}>
                            {Object.keys(obj).map((key, idx) => {
                                return (
                                    <td key={key + '-' + idx} className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        {obj[key]}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default SummaryTable;