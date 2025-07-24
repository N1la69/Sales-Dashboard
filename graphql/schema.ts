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

  type MonthlyRetailingTrend {
    year: Int
    month: Int
    retailing: Float
  }

  type TopBrandform {
    brandform: String
    retailing: Float
  }

  type Store {
    id: Int
    Old_Store_Code: String
    New_Store_Code: String
    New_Branch: String
    DSE_Code: String
    ZM: String
    SM: String
    BE: String
    STL: String
    customer_type: String
  }

  type StoreRetailingTrend {
    year: Int
    month: Int
    retailing: Float
  }

  type StoreRetailingStat {
    year: Int
    month: Int
    monthName: String
    retailing: Float
  }

  type StoreBrandStat {
    brand: String
    retailing: Float
  }

  type CategoryRetailingStat {
    category: String
    retailing: Float
  }

  type StoreStats {
    highestRetailingMonth: StoreRetailingStat
    lowestRetailingMonth: StoreRetailingStat
    highestRetailingBrand: StoreBrandStat
    lowestRetailingBrand: StoreBrandStat
    categoryRetailing: [CategoryRetailingStat]
  }

  type StoreDetails {
    storeCode: String
    storeName: String
  }

  type TopStore {
    store_code: String
    store_name: String
    branch_name: String
    average_retailing: Float
  }

  type TopStoresResponse {
    totalCount: Int
    stores: [TopStore!]!
  }

  type DownloadTopStore {
    store_code: String
    store_name: String
    branch_name: String
    average_retailing: Float
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
    monthlyRetailingTrend(
      filters: FilterInput
      source: String
    ): [MonthlyRetailingTrend]
    topBrandforms(filters: FilterInput, source: String): [TopBrandform]

    suggestStores(branch: String, query: String!): [Store]
    allBranches: [String]
    storeRetailingTrend(
      storeCode: String!
      source: String
      year: [Int]
      month: [Int]
    ): [StoreRetailingTrend]
    getStoreStats(
      storeCode: String!
      source: String
      year: [Int]
      month: [Int]
    ): StoreStats
    getStoreDetails(storeCode: String!, source: String): StoreDetails
    topStores(
      source: String!
      months: Int!
      zm: String
      sm: String
      be: String
      category: String
      page: Int!
      pageSize: Int!
    ): TopStoresResponse
    downloadTopStores(
      source: String!
      months: Int!
      zm: String
      sm: String
      be: String
      category: String
    ): [DownloadTopStore!]!
  }
`;
