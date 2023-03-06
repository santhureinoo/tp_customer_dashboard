/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    RECAPT_SITEKEY: process.env.RECAPT_SITEKEY,
    RECAPT_SECRET: process.env.RECAPT_SECRET
  }
}

module.exports = nextConfig
