import { withIronSessionSsr } from "iron-session/next";
import type { NextPage } from 'next'
import React, { useCallback } from 'react';
import { getIronSessionCookieSetting } from "../common/helper";
import Dashboard from '../components/Dashboard';
import Layout from '../components/Layout';

const Dashboards: NextPage = ({ id, title }: any) => {

  return (
    <Layout title={title} groupId={id}>
      <Dashboard groupId={id} />
    </Layout>
  )
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }: any) {

    if (!req.session || !req.session.group || !req.session.group.id) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        }
      }
    }

    return {
      props: {
        title: ['Outlet', 'Tanglin Mall'],
        id: req.session.group.id,
      },
    };
  },
  getIronSessionCookieSetting()
);

// Dashboards.getInitialProps = async () => {
//   const title = ['Outlet', 'Tanglin Mall'];
//   return { title };
// };


export default Dashboards
