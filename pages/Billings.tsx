import type { NextPage } from 'next'
import Table from '../components/Table'
import React from 'react';
import { DummyBillingDataRow } from '../common/constant'
import TableOptionField from '../components/TableOptionField';
import BillingEdit from '../components/BillingEdit';
import { v4 as uuidv4 } from 'uuid';

const Billings: NextPage = () => {
  const [openBillingEdit, setOpenBillingEdit] = React.useState(false);

  function getDummyCustomerData(): any[] {
    const dummyArr = [];
    for (var i = 0; i < 17; i++) {
      dummyArr.push(DummyBillingDataRow);
    }
    return dummyArr;
  }

  return (
    <React.Fragment>
      <Table headers={['Invoice ID', 'Customer', 'Period', 'Outlets', 'Total Service Fee', 'Total Savings($)', 'Total Savings(kWh)']} data={getDummyCustomerData()} handleAddNew={() => setOpenBillingEdit(true)} handleEdit={() => setOpenBillingEdit(true)} handleDelete={() => setOpenBillingEdit(true)}
        rightSideElements={[<TableOptionField key={uuidv4()} label={'Customer'} data={['All', 'Some']} />,
        <TableOptionField key={uuidv4()} label={'Month'} data={['All', 'Some']} />]}
        leftSideElements={[]} />
      <BillingEdit openBillingEdit={openBillingEdit} setOpenBillingEdit={setOpenBillingEdit} />
    </React.Fragment >
  )
}

Billings.getInitialProps = async () => {
  const title = 'Billing';
  return { title };
};


export default Billings
