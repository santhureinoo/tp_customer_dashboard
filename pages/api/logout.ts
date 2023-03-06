// pages/api/logout.ts

import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(
    async function handler(req: any, res: any) {
        req.session.destroy();
        res.redirect(`/`)
    },
    {
        cookieName: process.env.IRON_SESSION_COOKIE || '',
        password: process.env.IRON_SESSION_SECRET || '',
        // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
        cookieOptions: {
            secure: process.env.NODE_ENV === "production",
        },
    },
);