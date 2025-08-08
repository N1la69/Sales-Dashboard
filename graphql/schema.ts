import { gql } from "graphql-tag";

export const typeDefs = gql`
  input FilterInput {
    Year: [Int]
    Month: [Int]
    Category: [String]
    Brand: [String]
    Brandform: [String]
    Subbrandform: [String]
    Branch: [String]
    ZM: [String]
    SM: [String]
    BE: [String]
    Channel: [String]
    BroadChannel: [String]
    ShortChannel: [String]
    StartDate: String
    EndDate: String
  }

  type HierarchyNode {
    key: String!
    name: String!
    breakdown: [YearlyRetailing!]!
    growth: Float
    childrenCount: Int
  }

  type YearlyRetailing {
    year: Int!
    value: Float!
  }

  type RetailingStats {
    breakdown: [YearlyRetailing!]!
    growth: Float
  }

  type HighestBranch {
    branch: String!
    breakdown: [YearlyRetailing!]!
    growth: Float
  }

  type HighestBrand {
    brand: String
    breakdown: [YearlyRetailing!]
    growth: Float
  }

  type CategoryRetailing {
    category: String
    breakdown: [YearlyRetailing!]
  }

  type BroadChannelRetailing {
    broad_channel: String
    breakdown: [YearlyRetailing!]
  }

  type MonthlyRetailingTrend {
    year: Int
    month: Int
    retailing: Float
  }

  type TopBrandform {
    brandform: String
    breakdown: [YearlyRetailing!]!
    growth: Float
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
    customer_name: String
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
    category: String!
    retailing: Float!
    yearWise: [YearlyRetailing!]!
  }

  type StoreStats {
    highestRetailingMonth: StoreRetailingStat
    lowestRetailingMonth: StoreRetailingStat
    highestRetailingBrand: StoreBrandStat
    lowestRetailingBrand: StoreBrandStat
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
    retailingBreakdown(
      level: String!
      parent: String
      filters: FilterInput
      source: String
    ): [HierarchyNode]

    retailingStats(filters: FilterInput, source: String): RetailingStats
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
    getStoreDetails(storeCode: String!, source: String): StoreDetails
    getStoreStats(
      storeCode: String!
      source: String
      year: [Int]
      month: [Int]
    ): StoreStats
    getCategoryRetailing(
      storeCode: String!
      source: String
      year: [Int]
      month: [Int]
    ): [CategoryRetailingStat]

    topStores(
      source: String!
      months: Int
      zm: String
      sm: String
      be: String
      category: String
      branch: String
      broadChannel: String
      brand: String
      startDate: String
      endDate: String
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
      branch: String
      brand: String
      broadChannel: String
      startDate: String
      endDate: String
    ): [DownloadTopStore!]!
  }
`;
