import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "http://18.141.128.98:4000/",
    cache: new InMemoryCache(),
});

export default client;