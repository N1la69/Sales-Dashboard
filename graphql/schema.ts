import { gql } from "graphql-tag";

export const typeDefs = gql`
  input FilterInput {
    Year: [Int]
    Month: [Int]
    Category: [String]
    Brand: [String]
    Brandform: [String]
    Branch: [String]
    ZM: [String]
    SM: [String]
    BE: [String]
    Channel: [String]
    BroadChannel: [String]
    ShortChannel: [String]
  }

  type HighestBranch {
    branch: String
    retailing: Float
  }

  type HighestBrand {
    brand: String
    retailing: Float
  }

  type CategoryRetailing {
    category: String
    retailing: Float
  }

  type BroadChannelRetailing {
    broad_channel: String
    retailing: Float
  }

  type Query {
    totalRetailing(filters: FilterInput, source: String): Float
    highestRetailingBranch(filters: FilterInput, source: String): HighestBranch
    highestRetailingBrand(filters: FilterInput, source: String): HighestBrand
    retailingByCategory(
      filters: FilterInput
      source: String
    ): [CategoryRetailing]
    retailingByBroadChannel(
      filters: FilterInput
      source: String
    ): [BroadChannelRetailing]
  }
`;
