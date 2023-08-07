import mixpanel from "mixpanel";
import moment from "moment";
import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { getClientIp } from "request-ip";
import { assert, object, number, string, array, validate } from 'superstruct'
import UAParser from "ua-parser-js";

const router = createRouter<NextApiRequest, NextApiResponse>();

const validation = object({
    distinct_id: string(),
    name: string(),
    event_name: string(),
    attributes: object(),
})

router
    .use(async (req: NextApiRequest, event: NextApiResponse, next) => {
        const start = Date.now();
        await next(); // call next in chain
        const end = Date.now();
        console.log(`Request took ${end - start}ms`);
    })
    .post((req, res) => {
        if (validate(req.body, validation)) {
            const body = req.body;
            const mixpanelObj = mixpanel.init(process.env.MIXPANEL_TOKEN || '3583f33e37fcb53346be88d215695dc4');
            const uaParser = new UAParser(req.headers['user-agent']);
            mixpanelObj.people.set(body.distinct_id, {
                name: body.name,
                $last_seen: moment().format("MMM DD YYYY"),
            },() => {
                mixpanelObj.track(body.event_name, {
                    ...body.attributes,
                    '$os': uaParser.getOS().name + ' ' + uaParser.getOS().version,
                    "$browser": uaParser.getBrowser().name + ' ' + uaParser.getBrowser().version,
                    "$device": uaParser.getDevice().model + ' ' + uaParser.getDevice().type,
                    'ip': getClientIp(req),
                });
            });
          
            return res.status(200).json({
                status: true,
                message: 'Event has been successfully tracked',
            });
        }
        return res.status(400).json({
            status: false,
            message: 'Incorrect parameters',
        })
    });


export default router.handler({
    onError: (req, event) => {
        // console.error(err.stack);
        // return new NextResponse("Something broke!", {
        //     status: err.statusCode || 500,
        // });
    },

});