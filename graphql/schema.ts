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
    RSM: [String]
    ASM: [String]
    TSI: [String]
    ChannelDesc: [String]
    BaseChannel: [String]
    ShortChannel: [String]
    StartDate: String
    EndDate: String
  }

  input GPFilterInput {
    Year: [Int]
    Month: [Int]
    Branch: [String]
    ZM: [String]
    RSM: [String]
    ASM: [String]
    TSI: [String]
    ChannelDesc: [String]
    BaseChannel: [String]
    ShortChannel: [String]
    StartDate: String
    EndDate: String
  }

  type YearlyRetailing {
    year: Int!
    value: Float!
  }

  type GPBreakdown {
    year: Int
    label: String
    value: Int
  }

  type HierarchyNode {
    key: String!
    name: String!
    breakdown: [YearlyRetailing!]!
    growth: Float
    childrenCount: Int
  }

  type StoreHierarchyNode {
    key: String!
    name: String!
    breakdown: [YearlyRetailing!]!
    growth: Float
    childrenCount: Int
  }

  type RetailingStats {
    breakdown: [YearlyRetailing!]!
    growth: Float
  }

  type GPStats {
    breakdown: [GPBreakdown!]!
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

  type BaseChannelRetailing {
    base_channel: String
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
    Branch: String
    DSE_Code: String
    ZM: String
    RSM: String
    ASM: String
    TSI: String
    customer_type: String
    customer_name: String
  }

  type StoreRetailingTrend {
    year: Int
    month: Int
    retailing: Float
  }

  type StoreGPTrend {
    year: Int
    month: Int
    gp: Float
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

  type StoreGPStat {
    year: Int
    month: Int
    monthName: String
    gp: Float
  }

  type StoreGPStats {
    highestGPMonth: StoreGPStat
    lowestGPMonth: StoreGPStat
    averageGP: Float
  }

  type CategoryRetailingStat {
    category: String!
    breakdown: [YearlyRetailing!]
  }

  type StoreStats {
    highestRetailingMonth: StoreRetailingStat
    lowestRetailingMonth: StoreRetailingStat
    highestRetailingBrand: StoreBrandStat
    lowestRetailingBrand: StoreBrandStat
    averageRetailing: Float
  }

  type StoreDetails {
    storeCode: String
    storeName: String
    channelDesc: String
  }

  type StoreBill {
    documentNo: String
    totalRetailing: Float
    documentDate: String
  }

  type TopStore {
    store_code: String
    store_name: String
    branch_name: String
    channel_desc: String
    average_retailing: Float
  }

  type TopStoresResponse {
    totalCount: Int
    stores: [TopStore!]!
  }

  type CategoryDistribution {
    category: String!
    breakdown: [YearlyRetailing!]!
    growth: Float
  }

  type Query {
    retailingBreakdown(
      level: String!
      parent: String
      filters: FilterInput
      source: String
    ): [HierarchyNode]
    storeRetailingBreakdown(
      storeCode: String!
      level: String!
      parent: String
      source: String
      year: [Int]
      month: [Int]
    ): [StoreHierarchyNode]

    retailingStats(filters: FilterInput, source: String): RetailingStats
    gpStats(
      filters: GPFilterInput
      source: String
      gpType: String = "p3m"
    ): GPStats
    highestRetailingBranch(filters: FilterInput, source: String): HighestBranch
    highestRetailingBrand(filters: FilterInput, source: String): HighestBrand
    retailingByCategory(
      filters: FilterInput
      source: String
    ): [CategoryRetailing]
    retailingByBaseChannel(
      filters: FilterInput
      source: String
    ): [BaseChannelRetailing]
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
    storeGPTrend(
      storeCode: String!
      source: String
      year: [Int]
      month: [Int]
      gpType: String = "p3m"
    ): [StoreGPTrend]
    getStoreDetails(storeCode: String!, source: String): StoreDetails
    getLastStoreBills(
      storeCode: String!
      source: String
      year: [Int]
      month: [Int]
    ): [StoreBill]
    getStoreStats(
      storeCode: String!
      source: String
      year: [Int]
      month: [Int]
    ): StoreStats
    getStoreGPStats(
      storeCode: String!
      source: String
      year: [Int]
      month: [Int]
      gpType: String
    ): StoreGPStats
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
      rsm: String
      asm: String
      tsi: String
      category: String
      branch: String
      baseChannel: String
      shortChannel: String
      channelDesc: String
      brand: String
      brandform: String
      startDate: String
      endDate: String
    ): TopStoresResponse

    categoryDistribution(
      filters: FilterInput
      source: String!
    ): [CategoryDistribution!]!
  }
`;
