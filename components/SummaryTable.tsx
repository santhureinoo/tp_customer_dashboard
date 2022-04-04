import { TableProps } from "../common/types";

const SummaryTable = ({ headers, data }: TableProps) => {
    return (
        <table>
            <thead>
                <tr>
                    {headers.map(header => {
                        return (<th className="px-6 bg-blueGray-50 text-gray-300 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-t-0 border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            {header}
                        </th>);
                    })}
                </tr>
            </thead>
            <tbody>
                {data.map(obj => {
                    return (
                        <tr>
                            {Object.keys(obj).map(key => {
                                return (
                                    <td className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
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