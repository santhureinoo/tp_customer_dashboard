// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import { request, gql } from 'graphql-request'
import { withIronSessionApiRoute } from "iron-session/next";
import { ApolloClient, gql, HttpLink, InMemoryCache } from "@apollo/client";
import fetch from "cross-fetch";
import { getIronSessionCookieSetting } from "../../common/helper";
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
            await req.session.save();
            res.redirect(`/dashboard`)
        } else {
            res.redirect(`/`)
        }
    },
    getIronSessionCookieSetting(),
);

