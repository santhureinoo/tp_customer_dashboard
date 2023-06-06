// pages/api/logout.ts

import { withIronSessionApiRoute } from "iron-session/next";
import { getIronSessionCookieSetting } from "../../common/helper";

export default withIronSessionApiRoute(
    async function handler(req: any, res: any) {
        req.session.destroy();
        res.redirect(`/`)
    },
    getIronSessionCookieSetting,
);