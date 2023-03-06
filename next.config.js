/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    RECAPT_SITEKEY: process.env.RECAPT_SITEKEY,
    RECAPT_SECRET: process.env.RECAPT_SECRET,
    IRON_SESSION_SECRET: process.env.IRON_SESSION_SECRET,
    IRON_SESSION_COOKIE: process.env.IRON_SESSION_COOKIE,
  }
}

module.exports = nextConfig
