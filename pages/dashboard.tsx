import { withIronSessionSsr } from "iron-session/next";
import type { NextPage } from 'next'
import React, { useCallback } from 'react';
import Dashboard from '../components/Dashboard';
import Layout from '../components/Layout';

const Dashboards: NextPage = ({ id, title }: any) => {

  return (
    <Layout title={title}>
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
  {
    cookieName: process.env.IRON_SESSION_COOKIE || '',
    password:  process.env.IRON_SESSION_SECRET || '',
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  },
);

// Dashboards.getInitialProps = async () => {
//   const title = ['Outlet', 'Tanglin Mall'];
//   return { title };
// };


export default Dashboards
