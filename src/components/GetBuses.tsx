import { useQuery } from 'react-query';
import { GraphQLClient, request } from 'graphql-request';

export const useGQLQuery = (key: string, query: any, variables  = {}, config = {}) => {
  const endpoint = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql';
  const headers = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "digitransit-subscription-key": "3d6b877b6def4672ad17e9ad2fe0f28e",
    }
  }

  const graphQLClient = new GraphQLClient(endpoint, headers);

  const fetchData = async () => await graphQLClient.request(query, variables);
  
  // const fetchData = async () => await request(endpoint, query, variables);

  return useQuery(key, fetchData, config);
};
