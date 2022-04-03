
import BigNumber from 'bignumber.js'
import { CampaignType, FarmConfig, PoolConfig, Team, MinningConfig } from '../constants/types'

export type TranslatableText =
  | string
  | {
    id: number
    fallback: string
    data?: {
      [key: string]: string | number
    }
  }

export interface Farm extends FarmConfig {
  tokenAmount?: BigNumber
  quoteTokenAmount?: BigNumber
  lpTotalInQuoteToken?: BigNumber
  lpTotalSupply?: BigNumber
  tokenPriceVsQuote?: BigNumber
  poolWeight?: BigNumber
  userData?: {
    allowance: BigNumber
    tokenBalance: BigNumber
    stakedBalance: BigNumber
    earnings: BigNumber
  }
}

export interface Pool extends PoolConfig {
  totalStaked?: BigNumber
  startBlock?: number
  endBlock?: number
  withdrawFee?: string
  userData?: {
    allowance: BigNumber
    stakingTokenBalance: BigNumber
    stakedBalance: BigNumber
    pendingReward: BigNumber
    totalShare?: any
    selfShare?: any
    lastDepositedTime?: number
  }
}

export interface Minning extends MinningConfig {
  allocMojitoAmount: BigNumber
  allocPoint?: BigNumber
  lastRewardBlock?: BigNumber
  lpToken?: string
  quantity: BigNumber
  totalQuantity: BigNumber
  userReward?: string
  userVolume?: string
}

export interface Referral {
  id: number,
  address: string,
  url: string,
  shape: string,
  name: string,
}


// Slices states


export interface FarmsState {
  data: Farm[]
}

export interface PoolsState {
  data: Pool[]
}

export enum ProfileAvatarFetchStatus {
  NOT_FETCHED = 'not-fetched',
  FETCHING = 'fetching',
  FETCHED = 'fetched',
}

export interface MinningState {
  data: Minning[]
  totalReward: number
  rewardPools: number
}

export interface ReferralState {
  post: Referral[]
  contractInfo: {
    loading: boolean,
    contract: string[],
    amount: string[],
    index: number[]
  }
}


export type TeamResponse = {
  0: string
  1: string
  2: string
  3: string
  4: boolean
}

export type TeamsById = {
  [key: string]: Team
}

export interface TeamsState {
  isInitialized: boolean
  isLoading: boolean
  data: TeamsById
}

export interface Achievement {
  id: string
  type: CampaignType
  address: string
  title: TranslatableText
  description?: TranslatableText
  badge: string
  points: number
}

export enum AchievementFetchStatus {
  ERROR = 'error',
  NOT_FETCHED = 'not-fetched',
  FETCHING = 'fetching',
  FETCHED = 'fetched',
}

export interface AchievementState {
  achievements: Achievement[]
  achievementFetchStatus: AchievementFetchStatus
}

// API Price State
export interface PriceApiList {
  /* eslint-disable camelcase */
  [key: string]: {
    name: string
    symbol: string
    price: string
    price_BNB: string
  }
}

export interface PriceApiListThunk {
  /* eslint-disable camelcase */
  [key: string]: number
}

export interface PriceApiResponse {
  /* eslint-disable camelcase */
  updated_at: string
  data: PriceApiList
}

export interface PriceApiThunk {
  /* eslint-disable camelcase */
  updated_at: string
  data: PriceApiListThunk
}

export interface PriceState {
  isLoading: boolean
  lastUpdated: string
  data: PriceApiListThunk
}

// Block

export interface BlockState {
  currentBlock: number
  initialBlock: number
}

// Collectibles

export interface CollectiblesState {
  isInitialized: boolean
  isLoading: boolean
  data: {
    [key: string]: number[]
  }
}

// Global state

export interface State {
  farms: FarmsState
  prices: PriceState
  pools: PoolsState
  teams: TeamsState
  achievements: AchievementState
  block: BlockState
  collectibles: CollectiblesState
  minning: MinningState
  referral: ReferralState
}
