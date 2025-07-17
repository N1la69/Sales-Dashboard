import { gql } from "graphql-tag";

export const typeDefs = gql`
  input FilterInput {
    Year: String
    Month: String
    Category: String
    Brand: String
    Brandform: String
    Branch: String
    ZM: String
    SM: String
    BE: String
    Channel: String
    BroadChannel: String
    ShortChannel: String
  }

  type Query {
    totalRetailing(filters: FilterInput): Float!
  }
`;
