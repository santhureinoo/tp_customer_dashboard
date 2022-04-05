import type { NextPage } from 'next'
import Table from '../components/Table'
import React from 'react';
import CustomerEdit from '../components/CustomerEdit'
import { DummyTableDataRow } from '../common/constant'

const Customers: NextPage = () => {
  const [openCustomerEdit, setOpenCustomerEdit] = React.useState(false);

  function getDummyCustomerData(): any[] {
    const dummyArr = [];
    for (var i = 0; i < 17; i++) {
      dummyArr.push(DummyTableDataRow);
    }
    return dummyArr;
  }

  return (
    <React.Fragment>
      <Table headers={['Equipment ID', 'Customer', 'Outlet', 'Equipment Type', 'Equipment Name', 'Valid as Of']} data={getDummyCustomerData()} handleAddNew={() => setOpenCustomerEdit(true)} handleEdit={() => setOpenCustomerEdit(true)} handleDelete={() => setOpenCustomerEdit(true)} rightSideElements={[]} leftSideElements={[]} buttonText={'+ Add New Customer'} />
      <CustomerEdit openCustomerEdit={openCustomerEdit} setOpenCustomerEdit={setOpenCustomerEdit} />
    </React.Fragment >
  )
}

Customers.getInitialProps = async () => {
  const title = 'Customer';
  return { title };
};


export default Customers
