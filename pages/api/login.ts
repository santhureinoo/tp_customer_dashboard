// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import { request, gql } from 'graphql-request'
import { withIronSessionApiRoute } from "iron-session/next";
import { ApolloClient, gql, HttpLink, InMemoryCache } from "@apollo/client";
import fetch from "cross-fetch";
import { getIronSessionCookieSetting } from "../../common/helper";
import { useMixpanelContext } from "../../context/mixpanel-provider";
import mixpanel from "mixpanel";
import moment from "moment";
import { UAParser } from "ua-parser-js";
import { getClientIp } from "request-ip";
type Data = {
    name: string
}

const validateCaptcha = (response_key: any) => {
    return new Promise((resolve, reject) => {
        const secret_key = process.env.RECAPT_SECRET;
        const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${response_key}`
        fetch(url, {
            method: 'post'
        })
            .then((response) => response.json())
            .then((google_response) => {
                if (google_response.success == true) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            })
            .catch((err) => {
                resolve(false)
            })
    })
}


export default withIronSessionApiRoute(
    async function handler(req: any, res: any) {
        if (!(await validateCaptcha(req.query['g-recaptcha-response']))) {
            return res.redirect(`/`)
        }

        const clientIP = getClientIp(req);
        delete req.body['g-recaptcha-response'];

        const getFirstGroupPasswordVariable = {
            "where": {
                "password": {
                    "equals": req.query['group-id']
                }
            }
        }
        const getFirstGroupPassword = gql`
        query FindFirstGroup_password($where: Group_passwordWhereInput) {
            findFirstGroup_password(where: $where) {
              group_id
            }
          }
        `;

        //Group Query by Id
        const getGroupQuery = gql`query Fetchgroup($GroupWhereUniqueInput: GroupWhereUniqueInput!) {
            group (where: $GroupWhereUniqueInput){
                group_id,
                group_name
            }
        }`;


        const client = new ApolloClient({
            link: new HttpLink({ uri: 'http://127.0.0.1:4000', fetch }),
            cache: new InMemoryCache(),
        });

        const result: any = await client.query({
            query: getFirstGroupPassword,
            variables: getFirstGroupPasswordVariable
        });


        if (result.data && result.data.findFirstGroup_password && result.data.findFirstGroup_password.group_id) {
            req.session.group = {
                id: result.data.findFirstGroup_password.group_id,
            };

            const groupInfoResult: any = await client.query({
                query: getGroupQuery, variables: {
                    "variables":
                    {
                        "GroupWhereUniqueInput": { "group_id": result.data.findFirstGroup_password.group_id }
                    }
                }
            });

            await req.session.save();

            const mixpanelConfig = mixpanel.init(process.env.MIXPANEL_TOKEN || '3583f33e37fcb53346be88d215695dc4');
            const uaParser = new UAParser(req.headers['user-agent']);
            mixpanelConfig.people.set(result.data.findFirstGroup_password.group_id, {
                name: groupInfoResult.data.group.name,
                $last_seen: moment().format("MMM DD YYYY"),
            }, () => {
                mixpanelConfig.track(
                    'Signed In',
                    {
                        'distinct_id': result.data.findFirstGroup_password.group_id,
                        'name': groupInfoResult.data.group.name,
                        'Signin At': moment().format("MMM DD YYYY"),
                        '$os': uaParser.getOS().name + ' ' + uaParser.getOS().version,
                        "$browser": uaParser.getBrowser().name + ' ' + uaParser.getBrowser().version,
                        "$device": uaParser.getDevice().model + ' ' + uaParser.getDevice().type,
                        'ip': clientIP,
                    }
                );
            })

            res.redirect(`/customer`);
        } else {
            res.redirect(`/`)
        }
    },
    getIronSessionCookieSetting(),
);

