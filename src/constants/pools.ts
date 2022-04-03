import tokens from './tokens'
import { PoolConfig, PoolCategory } from './types'

import BigNumber from 'bignumber.js'

const MJT_PER_BLOCK_INIT = new BigNumber(3)

export function calculateMjtPerBlockByTimestamp() {
  const startTimestamp = new Date('2021/10/28 11:38:49').getTime()
  const nowTimestamp = new Date().getTime()
  const allTimestamp = new BigNumber(nowTimestamp).minus(startTimestamp).toNumber()
  const days180 = 60 * 60 * 24 * 1000 * 180

  if (days180 > allTimestamp) {
    return MJT_PER_BLOCK_INIT
  }
  const n = Number(new BigNumber(allTimestamp).div(days180).toFixed(0, 1))
  let kccPerBlock = 3
  for (let i = 0; i < n; i++) {
    kccPerBlock -= kccPerBlock * 0.2
  }
  return new BigNumber(kccPerBlock)
}

const MJT_PER_BLOCK = calculateMjtPerBlockByTimestamp().multipliedBy(0.9)

// when adding new pool, pls keep sousId the same as sortOrder
const pools: PoolConfig[] = [
  {
    name: 'Manual MJT',
    sousId: 0,
    stakingToken: tokens.mjt,
    earningToken: tokens.mjt,
    contractAddress: {
      322: '0x84F10c60Aa2d69aA38Ae307D3bd57e2825BD5617',
      321: '0x25C6d6A65C3ae5d41599Ba2211629B24604Fea4F',
    },
    poolCategory: PoolCategory.Manual,
    harvest: true,
    tokenPerBlock: String(MJT_PER_BLOCK.multipliedBy(0.25)),
    sortOrder: 0,
    isFinished: false,
  },
  {
    name: 'Auto MJT',
    sousId: 0,
    stakingToken: tokens.mjt,
    earningToken: tokens.mjt,
    contractAddress: {
      322: '0x516dbE24c123C35930ef217553C177f81be0E64B',
      321: '0xF0D7C82E9f9bE85b2d1F8bedE40Afe1c1Fa7560c',
    },
    poolCategory: PoolCategory.Auto,
    harvest: true,
    tokenPerBlock: String(MJT_PER_BLOCK.multipliedBy(0.25)),
    sortOrder: 1, // Never change it,it's the unique tag for AutoPool
    isFinished: false,
  },
  // {
  //   name: 'Earn KCS',
  //   sousId: 2,
  //   stakingToken: tokens.mjt,
  //   earningToken: tokens.wkcs,
  //   contractAddress: {
  //     322: '0x9BCF38167448A8736FB32cd05CaDB3C2024681e9',
  //     321: '0x326D754c64329aD7cb35744770D56D0E1f3B3124',
  //   },
  //   poolCategory: PoolCategory.CORE,
  //   harvest: true,
  //   tokenPerBlock: '0.000000001',
  //   sortOrder: 2,
  //   isFinished: false,
  // },
  // {
  //   name: 'Earn MJT',
  //   sousId: 3,
  //   stakingToken: tokens.wkcs,
  //   earningToken: tokens.mjt,
  //   contractAddress: {
  //     322: '0x447e2935A8D070F17DEF31113669aE93d76FeF58',
  //     321: '0x555Ea72d7347E82C614C16f005fA91cAf06DCB5a',
  //   },
  //   poolCategory: PoolCategory.CORE,
  //   harvest: true,
  //   tokenPerBlock: '0.1',
  //   sortOrder: 3,
  //   isFinished: false,
  // },
  // {
  //   name: 'Earn USDT',
  //   sousId: 4,
  //   stakingToken: tokens.mjt,
  //   earningToken: tokens.usdt,
  //   contractAddress: {
  //     322: '0x2A0746E62da421a9F5A282771D5bE41e39655b0F',
  //     321: '0x555Ea72d7347E82C614C16f005fA91cAf06DCB5a',
  //   },
  //   poolCategory: PoolCategory.CORE,
  //   harvest: true,
  //   tokenPerBlock: '1',
  //   sortOrder: 4,
  //   isFinished: false,
  // },
]

export default pools
