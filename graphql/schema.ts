import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Query {
    totalRetailing: Float!
  }
`;
