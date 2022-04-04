import CustomizedInput from "../components/CustomizedInput";
import PillButton from "../components/PillButton";

export const DummyTableDataRow = {
    EID: 'EQ-2405',
    CUS: 'KFC Indonesia',
    OUT: 'KFC Gunung Sahari',
    ETY: 'Exhaust 1',
    ENA: 'Exhaust 1',
    VAO: '20/10/2021 18:56',
}

export const DummyOutletDataRow = {
    OID: 'Out-29405',
    CUS: 'KFC indonesia',
    ONE: 'KFC Jakata Pusat',
    TRE: '$12.05',
    DOT: '20/11/2021',
    SOS: (<div className="flex flex-row bg-slate-900 items-center justify-between"><span>3%</span><PillButton/></div>)
}

export const dummyContactList = [
    {
        ContactPerson: 'Andrew Showlin',
        Position: 'Finance Manager',
        EmailAddress: 'andrew@gmail.com',
        PhoneNumber: '+628788719580',
    },
    {
        ContactPerson: 'Andrew Showlin',
        Position: 'Finance Manager',
        EmailAddress: 'andrew@gmail.com',
        PhoneNumber: '+628788719580',
    },
    {
        ContactPerson: 'Andrew Showlin',
        Position: 'Finance Manager',
        EmailAddress: 'andrew@gmail.com',
        PhoneNumber: '+628788719580',
    }
];

export const dummySummaryTableData = [
    {
        "ID": "Outlet-295BO",
        "Name": "Tang City MCD",
        "Equipment": "10",
        "ChkBox": <input type="checkbox" className="rounded-full bg-sky-600" value="CHK" />
    },
    {
        "ID": "Outlet-295BO",
        "Name": "Tang City MCD",
        "Equipment": "10",
        "ChkBox": <input type="checkbox" value="CHK" />
    },
    {
        "ID": "Outlet-295BO",
        "Name": "Tang City MCD",
        "Equipment": "10",
        "ChkBox": <input type="checkbox" value="CHK" />
    }
]

export const dummySummaryOutletTableData = [
    {
        "EquipmentID": "Outlet-295BO",
        "Type": "Tang City MCD",
        "Name": "10",
        "CaltrType": <CustomizedInput hideDropDownPrefixIcon={true} inputType="select" value="FastFood" dropDownData={["FastFood", "Test", "Test"]} />
    },
    {
        "EquipmentID": "Outlet-295BO",
        "Type": "Tang City MCD",
        "Name": "10",
        "CaltrType": <CustomizedInput hideDropDownPrefixIcon={true} inputType="select" value="FastFood" dropDownData={["FastFood", "Test", "Test"]} />
    },
    {
        "EquipmentID": "Outlet-295BO",
        "Type": "Tang City MCD",
        "Name": "10",
        "CaltrType": <CustomizedInput hideDropDownPrefixIcon={true} inputType="select" value="FastFood" dropDownData={["FastFood", "Test", "Test"]} />
    },
]