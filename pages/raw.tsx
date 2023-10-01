import { withIronSessionSsr } from "iron-session/next";
import type { NextPage } from 'next'
import React, { useCallback } from 'react';
import { getIronSessionCookieSetting } from "../common/helper";
import Layout from '../components/Layout';
import RawTable from "../components/RawTable";

const RawScreen: NextPage = ({ id, title }: any) => {

  return (
    <Layout title={title} groupId={id}>
      <RawTable groupId={id} title={title}></RawTable>
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
        title: req.session.group.name,
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


export default RawScreen
