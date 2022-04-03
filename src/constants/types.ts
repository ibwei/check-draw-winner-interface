
import BigNumber from 'bignumber.js'
import { Token as SdkToken } from 'mojitoswap-sdk'

export type TranslatableText =
  | string
  | {
    key: string
    data?: {
      [key: string]: string | number
    }
  }

export interface Address {
  322?: string
  321?: string
}

export interface Token {
  symbol: string
  address?: Address
  decimals?: number
  projectLink?: string
}

export enum PoolIds {
  poolBasic = 'poolBasic',
  poolUnlimited = 'poolUnlimited',
}

export type IfoStatus = 'idle' | 'coming_soon' | 'live' | 'finished'

interface IfoPoolInfo {
  saleAmount: string
  raiseAmount: string
  mjtToBurn: string
  distributionRatio: number // Range [0-1]
}

export interface Ifo {
  id: string
  isActive: boolean
  address: string
  unlimitedAddress: string
  name: string
  lpToken: string
  currency: any
  token: Token
  releaseBlockNumber: number
  endBlockNumber: number
  totalSale: string
  targetRaise: string
  campaignId: string
  tokenOfferingPrice: number
  banner: string
  logo: string
  description?: string
  articleUrl?: string
  twitterUrl?: string
  telegramUrl?: string
  facebookUrl?: string
  websiteUrl?: string
  discordUrl?: string
  qaUrl?: string
  version: number
  [PoolIds.poolBasic]?: IfoPoolInfo
  [PoolIds.poolUnlimited]: IfoPoolInfo
  introduction?: string
  highlight?: string
  totalSupply?: string
  initialSupply?: string
  userCap?: string
  tokenVestingPeriod?: string
  tokenDistribution?: string
}


export enum PoolCategory {
  'COMMUNITY' = 'Community',
  'CORE' = 'Core',
  'KCS' = 'KCS', // Pools using native KCS behave differently than pools using a token
  'Auto' = 'Auto',
  'Manual' = 'Manual',
}

export interface MinningConfig {
  pid: number
  lpAddresses: Address
  token: Token
  tokenName: string
  quoteToken: Token
  quoteName: string
}

export interface FarmConfig {
  pid: number
  lpSymbol: string
  lpAddresses: Address
  token: Token
  quoteToken: Token
  lpTokenBalanceMC?: any
  multiplier?: string
  isCommunity?: boolean
  dual?: {
    rewardPerBlock: number
    earnLabel: string
    endBlock: number
    showTips?: boolean
    leftTip?: string
    rightTip?: string
  }
}

export interface PoolConfig {
  name: string
  sousId: number
  earningToken: Token
  stakingToken: Token
  stakingLimit?: number
  contractAddress: Address
  poolCategory: PoolCategory
  tokenPerBlock: string
  sortOrder: number
  harvest?: boolean
  isFinished?: boolean
}

export type Images = {
  lg: string
  md: string
  sm: string
  ipfs?: string
}

export type TeamImages = {
  alt: string
} & Images

export type Team = {
  id: number
  name: string
  description: string
  isJoinable?: boolean
  users: number
  points: number
  images: TeamImages
  background: string
  textColor: string
}

export type CampaignType = 'ifo' | 'teambattle' | 'participation'

export type Campaign = {
  id: string
  type: CampaignType
  title?: TranslatableText
  description?: TranslatableText
  badge?: string
}

export type PageMeta = {
  title: string
  description: string
  image: string
}
