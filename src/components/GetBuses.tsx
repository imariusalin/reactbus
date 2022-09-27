import { useQuery } from "react-query";
import { GraphQLClient, gql } from "graphql-request";

const API_URL = `https://api.digitransit.fi/graphiql/hsl`;

const graphQLClient = new GraphQLClient(API_URL);

export function useGetBuses() {
  return useQuery("get-buses", async () => {
    const { getBusesList } = await graphQLClient.request(gql`
      query {
        {
          stop(id: "HSL:1201110") {
            name
            stoptimesWithoutPatterns {
              scheduledArrival
              realtimeArrival
              serviceDay
              trip {
                route {
                  shortName
                  longName
                 
                }
              }
            }
          }
        }
      }
    `);
    return getBusesList;
  });
}
