import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DatePicker, Select } from "antd";
import React from "react";
import moment from 'moment';
import { date_range_customer_dashboards_table, outlet } from "../common/types";
import dayjs, { Dayjs } from "dayjs";
import { zeroPad } from "../common/helper";
import axios from "axios";
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { Oval } from "react-loader-spinner";

const RawTable = ({ groupId, title }: any): JSX.Element => {

    const [selectedOutlet, setSelectedOutlet] = React.useState<outlet>();
    const [outletList, setOutletList] = React.useState<outlet[]>([]);
    const [dataMonthsForGroups, setDataMonthsForGroups] = React.useState<Dayjs[]>([]);

    const [selectedMonth, setSelectedMonth] = React.useState('01');
    const [selectedYear, setSelectedYear] = React.useState('2022');

    const [isDataLoading, setIsDataLoading] = React.useState(false);
    const [isDataDownloading, setIsDataDownloading] = React.useState(false);

    const [lastestLiveDate, setLastestLiveDate] = React.useState<date_range_customer_dashboards_table>({
        start_date: `01/${moment().format('MM/YYYY')}`,
        end_date: `01/${moment().add('1', 'months').format('MM/YYYY')}`
    });

    const [dataAndHeaders, setDataAndHeaders] = React.useState<{
        header: any[],
        data: any[]
    }>({
        header: [],
        data: []
    });

    const GetFindOutletsByGroupIDQuery = gql`
    query GetFindOutletsByGroupIDQuery($where: OutletWhereInput) {
        outlets(where: $where) {
          outlet_id
          name
          customer {
            name
          }
        }
      }
    `;

    const GetFindOutletsByGroupIDVariable = {
        "variables": {
            "where": {
                "customer": {
                    "is": {
                        "group_id": {
                            "equals": groupId
                        }
                    }
                }
            }
        }
    }

    const getFindFirstLastestReportDateQuery = gql`
    query FindFirstDate_range_customer_dashboard {
        findFirstDate_range_customer_dashboard {
          id
          start_date
          end_date
          updated_at
        }
      }
    `;

    const groupByOutletmonthQuery = gql`
    query GroupByOutlet_month($by: [Outlet_monthScalarFieldEnum!]!, $where: Outlet_monthWhereInput) {
        groupByOutlet_month(by: $by, where: $where) {
          outlet_date
        }
      }
    `;

    const groupByOutletNameVariable = {
        "variables": {
            "by": "outlet_date",
            "where": {
                "last_avail_tariff": {
                    "not": {
                        "equals": null
                    }
                },
                "outlet": {
                    "is": {
                        "customer": {
                            "is": {
                                "group_id": {
                                    "equals": groupId
                                }
                            }
                        }
                    }
                }
            }
        }
    }


    const getFindOutletsByGroupIDResult = useQuery(GetFindOutletsByGroupIDQuery, GetFindOutletsByGroupIDVariable);
    const getFindFirstLastestReportDateResult = useQuery(getFindFirstLastestReportDateQuery);
    const getGroupByOutletmonth = useQuery(groupByOutletmonthQuery, groupByOutletNameVariable);


    React.useEffect(() => {
        if (getFindFirstLastestReportDateResult.data
            && getFindFirstLastestReportDateResult.data.findFirstDate_range_customer_dashboard) {
            setLastestLiveDate(getFindFirstLastestReportDateResult.data.findFirstDate_range_customer_dashboard);
        }
    }, [getFindFirstLastestReportDateResult.data]);

    React.useEffect(() => {
        if (getGroupByOutletmonth.data &&
            getGroupByOutletmonth.data.groupByOutlet_month) {
            setDataMonthsForGroups(getGroupByOutletmonth.data.groupByOutlet_month.map((mon: any) => dayjs(mon.outlet_date, 'DD/MM/YYYY')));
        }
    }, [getGroupByOutletmonth.data])

    React.useEffect(() => {
        if (getFindOutletsByGroupIDResult.data && getFindOutletsByGroupIDResult.data.outlets) {
            setOutletList(getFindOutletsByGroupIDResult.data.outlets);
            if (getFindOutletsByGroupIDResult.data.outlets.length > 0) {
                setSelectedOutlet(getFindOutletsByGroupIDResult.data.outlets[0]);
            }
        }
    }, [getFindOutletsByGroupIDResult.data]);

    const onViewClick = React.useCallback(() => {
        setDataAndHeaders({
            data: [],
            header: [],
        });
        if (selectedOutlet) {
            setIsDataLoading(true);
            axios.post(`${process.env.NEXT_PUBLIC_SITE_URL}:4001/raw_data`, {
                "filename": `${title}_${selectedOutlet.customer?.name}_${selectedOutlet.name}_${dayjs().month(Number(selectedMonth) - 1).format("MMM")}_${selectedYear}.xlsx`
            }).then(res => {
                setIsDataLoading(false);
                setDataAndHeaders(res.data);
            }).catch(error => {
                setIsDataLoading(false);
                enqueueSnackbar('File not found for selected month or the outlet', {
                    variant: "error",
                });
            })
        }

    }, [selectedOutlet, selectedMonth, selectedYear]);

    const onDownloadClick = React.useCallback(() => {
        if (selectedOutlet) {
            setIsDataDownloading(true);
            axios.post(`${process.env.NEXT_PUBLIC_RAW_DATA_URL}`, {
                "filename": `${title}_${selectedOutlet.customer?.name}_${selectedOutlet.name}_${dayjs().month(Number(selectedMonth) - 1).format("MMM")}_${selectedYear}.xlsx`
            }).then(res => {
                const downloadFileName = res.data.filename;
                if (downloadFileName) {
                    const downloadURL = res.data.downloadURL;
                    axios.get(
                        downloadURL, {
                        responseType: 'blob',
                    }
                    ).then(response => {
                        var binaryData = [];
                        binaryData.push(response.data);
                        const href = URL.createObjectURL(new Blob(binaryData, { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));

                        // create "a" HTML element with href to file & click
                        const link = document.createElement('a');
                        link.href = href;
                        link.setAttribute('download', `${downloadFileName}`); //or any other extension
                        document.body.appendChild(link);
                        link.click();

                        // clean up "a" element & remove ObjectURL
                        document.body.removeChild(link);
                        URL.revokeObjectURL(href);

                        setIsDataDownloading(false);
                    }).catch(err => {
                        enqueueSnackbar('Error on downloading file', {
                            variant: "error",
                        });
                        setIsDataDownloading(false);
                    })
                }
            }).catch(err => {
                enqueueSnackbar('Error on preparing file', {
                    variant: "error",
                });
            })
        }
    }, [selectedOutlet, selectedMonth, selectedYear]);

    return <div className="flex flex-col gap-y-6 justify-between h-full mt-10">
        <div>
            <span className='text-custom-darkblue font-bold text-sm'>Group</span>
            <FontAwesomeIcon className="px-2 text-custom-gray text-sm" icon={faAngleRight} />
            <span className='text-custom-gray text-sm font-bold'>{title}</span>
            <FontAwesomeIcon className="px-2 text-custom-gray text-sm" icon={faAngleRight} />
            <span className='text-custom-gray text-sm font-bold'>{"Raw Data"}</span>
        </div>
        <div className="flex flex-row gap-x-3 px-4 w-100 items-center">
            <Select
                size="large"
                className="w-3/12"
                value={selectedOutlet?.outlet_id}
                onChange={(value) => {
                    setSelectedOutlet(outletList.find(outlet => outlet.outlet_id == value));
                }}
                options={
                    outletList.map(out => {
                        return { label: out.name, value: out.outlet_id }
                    })
                }
            />
            <DatePicker
                size="large"
                placeholder="Select date"
                value={dayjs(selectedMonth + '/' + selectedYear, 'MM/YYYY')}
                onChange={(value) => {
                    if (value) {
                        setSelectedMonth(zeroPad(value.month() + 1, 2));
                        setSelectedYear(value.year().toString());
                    }
                }}
                clearIcon={false}
                disabledDate={(date) => {
                    const latestLiveDateInDayjs = dayjs(lastestLiveDate.end_date, 'MM/YYYY');
                    const latestStartDateInDayjs = dayjs(lastestLiveDate.start_date, 'MM/YYYY');
                    if (date.isAfter(latestLiveDateInDayjs) || date.isBefore(latestStartDateInDayjs)) {
                        return true;
                    } else {
                        if (!dataMonthsForGroups.find(dat => dat.isSame(date, 'month'))) {
                            return true;
                        }
                        return false;
                    }
                }}
                format={'MM/YYYY'}
                picker={'month'}
            ></DatePicker>

            <button onClick={() => { !isDataLoading && onViewClick() }} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg w-1/12">
                {isDataLoading ? <Oval
                    height={25}
                    width={25}
                    color="white"
                    wrapperStyle={{}}
                    wrapperClass={"w-full flex justify-center"}
                    visible={true}
                    ariaLabel='oval-loading'
                    secondaryColor="white"
                    strokeWidth={2}
                    strokeWidthSecondary={2}
                /> : "View"}
            </button>
            <button onClick={() => { !isDataDownloading && onDownloadClick() }} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg w-1/12">
                {isDataDownloading ? <Oval
                    height={25}
                    width={25}
                    color="white"
                    wrapperStyle={{}}
                    wrapperClass={"w-full flex justify-center"}
                    visible={true}
                    ariaLabel='oval-loading'
                    secondaryColor="white"
                    strokeWidth={2}
                    strokeWidthSecondary={2}
                /> : "Download"}
            </button>
        </div>
        {dataAndHeaders.header.length > 0 && <table className="border-separate border border-slate-500">
            <thead>
                <tr>
                    {dataAndHeaders.header.map((col, ind) => { return <th key={`heder-${ind}`} className="border border-slate-600">{col}</th> })}
                </tr>
            </thead>
            <tbody>
                {dataAndHeaders.data.map((dat, parentInd) => {
                    return <tr key={`row-${parentInd}`}>{dat.map((da: any, index: number) => {
                        return <td key={`row-item-${index}`} className="border border-slate-700">
                            {index !== 0 ? da : moment(da).format('D/M/YYYY')}
                        </td>
                    })}

                    </tr>
                })}
            </tbody>
        </table>}

    </div>
}

export default RawTable;