import { ApolloClient, InMemoryCache } from '@apollo/client';
import { graphQLUri } from "../env";

export const client = new ApolloClient({
    uri: graphQLUri,
    cache: new InMemoryCache(),
});