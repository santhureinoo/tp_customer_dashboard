import type { NextPage } from 'next'
import React from 'react';
import Dashboard from '../components/Dashboard';

const Customers: NextPage = () => {
  return (
    <React.Fragment>
      <Dashboard/>
    </React.Fragment >
  )
}

Customers.getInitialProps = async () => {
  const title = ['Outlet', 'Tanglin Mall'];
  return { title };
};


export default Customers
