import { NumberValue } from "d3";

export interface TableProps {
    headers: string[];
    data: any[];
    headerColor?: string;
}

export interface Contact {
    ContactPerson: string;
    Position: string;
    EmailAddress: string;
    PhoneNumber: string;
}

export interface BenchMarkKWHProps {
    Percentage: string;
    ActualKHW: NumberValue;
}

export interface BenchMarkProps {
    MinKWH: BenchMarkKWHProps;
    MaxKWH: BenchMarkKWHProps;
    CurrentKHW: BenchMarkKWHProps;
}

export interface DropdownProps {
    display: any;
    value: string;
}