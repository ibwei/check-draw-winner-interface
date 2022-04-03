import { ChainId, JSBI, Percent, Token, WETH, ROUTER_ADDRESS } from 'mojitoswap-sdk'
import BigNumber from 'bignumber.js'
import tokens from './tokens'

export const BUNDLE_ID = '1'

export const timeframeOptions = {
  WEEK: '1 week',
  MONTH: '1 month',
  // THREE_MONTHS: '3 months',
  // YEAR: '1 year',
  HALF_YEAR: '6 months',
  ALL_TIME: 'All time',
}

export const RA = ROUTER_ADDRESS[321]

// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[]
}

export const MJT = {
  [ChainId.TESTNET]: new Token(322, tokens.mjt.address[ChainId.TESTNET], 18, 'MJT', 'MojitoSwap Token'),
  [ChainId.MAINNET]: new Token(321, tokens.mjt.address[ChainId.MAINNET], 18, 'MJT', 'MojitoSwap Token'),
}
export const USDC = {
  [ChainId.TESTNET]: new Token(322, tokens.usdc.address[ChainId.TESTNET], 18, 'USDC', 'USDC'),
  [ChainId.MAINNET]: new Token(321, tokens.usdc.address[ChainId.MAINNET], 18, 'USDC', 'USDC'),
}
export const USDT = {
  [ChainId.TESTNET]: new Token(322, tokens.usdt.address[ChainId.TESTNET], 18, 'USDT', 'USDT'),
  [ChainId.MAINNET]: new Token(321, tokens.usdt.address[ChainId.MAINNET], 18, 'USDT', 'USDT'),
}

export const DAI = {
  [ChainId.TESTNET]: new Token(322, tokens.dai.address[ChainId.TESTNET], 18, 'DAI', 'DAI'),
  [ChainId.MAINNET]: new Token(321, tokens.dai.address[ChainId.MAINNET], 18, 'DAI', 'DAI'),
}

export const BTCK = {
  [ChainId.TESTNET]: new Token(322, tokens.btck.address[ChainId.TESTNET], 18, 'BTCK', 'BTCK'),
  [ChainId.MAINNET]: new Token(321, tokens.btck.address[ChainId.MAINNET], 18, 'BTCK', 'BTCK'),
}

export const ETH = {
  [ChainId.TESTNET]: new Token(322, tokens.eth.address[ChainId.TESTNET], 18, 'ETH', 'ETH'),
  [ChainId.MAINNET]: new Token(321, tokens.eth.address[ChainId.MAINNET], 18, 'ETH', 'ETH'),
}

const WETH_ONLY: ChainTokenList = {
  [ChainId.MAINNET]: [WETH[ChainId.MAINNET]],
  [ChainId.TESTNET]: [WETH[ChainId.TESTNET]],
}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  [ChainId.TESTNET]: [
    WETH[ChainId.TESTNET],
    MJT[ChainId.TESTNET],
    USDC[ChainId.TESTNET],
    USDT[ChainId.TESTNET],
    DAI[ChainId.TESTNET],
    BTCK[ChainId.TESTNET],
    ETH[ChainId.TESTNET],
  ],
  [ChainId.MAINNET]: [
    WETH[ChainId.MAINNET],
    MJT[ChainId.MAINNET],
    USDC[ChainId.MAINNET],
    USDT[ChainId.MAINNET],
    DAI[ChainId.MAINNET],
    BTCK[ChainId.MAINNET],
    ETH[ChainId.MAINNET],
  ],
}

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */

export const CUSTOM_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  [ChainId.MAINNET]: {},
  // [ChainId.TESTNET]: {
  //   '0xAe2933C2aD27984983f9396e25218a70fC791812': [MJT]
  // },
}

// used for display in the default list when adding liquidity
export const SUGGESTED_BASES: ChainTokenList = {
  [ChainId.TESTNET]: [
    MJT[ChainId.TESTNET],
    USDT[ChainId.TESTNET],
    USDC[ChainId.TESTNET],
    ETH[ChainId.TESTNET],
    BTCK[ChainId.TESTNET],
    DAI[ChainId.TESTNET],
  ],
  [ChainId.MAINNET]: [
    MJT[ChainId.MAINNET],
    USDT[ChainId.MAINNET],
    USDC[ChainId.MAINNET],
    ETH[ChainId.MAINNET],
    BTCK[ChainId.MAINNET],
    DAI[ChainId.MAINNET],
  ],
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  [ChainId.TESTNET]: [WETH[ChainId.TESTNET], MJT[ChainId.TESTNET], USDT[ChainId.TESTNET]],
  [ChainId.MAINNET]: [WETH[ChainId.MAINNET], MJT[ChainId.MAINNET], USDT[ChainId.MAINNET]],
}

export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
  [ChainId.TESTNET]: [
    [MJT[ChainId.TESTNET], USDT[ChainId.TESTNET]],
    [MJT[ChainId.TESTNET], USDC[ChainId.TESTNET]],
    [MJT[ChainId.TESTNET], DAI[ChainId.TESTNET]],
    [MJT[ChainId.TESTNET], WETH[ChainId.TESTNET]],
    [USDT[ChainId.TESTNET], WETH[ChainId.TESTNET]],
    [USDC[ChainId.TESTNET], WETH[ChainId.TESTNET]],
    [DAI[ChainId.TESTNET], WETH[ChainId.TESTNET]],
  ],
  [ChainId.MAINNET]: [
    [MJT[ChainId.MAINNET], USDT[ChainId.MAINNET]],
    [MJT[ChainId.MAINNET], USDC[ChainId.MAINNET]],
    [MJT[ChainId.MAINNET], DAI[ChainId.MAINNET]],
    [MJT[ChainId.MAINNET], WETH[ChainId.MAINNET]],
    [USDT[ChainId.MAINNET], WETH[ChainId.MAINNET]],
    [USDC[ChainId.MAINNET], WETH[ChainId.MAINNET]],
    [DAI[ChainId.MAINNET], WETH[ChainId.MAINNET]],
  ],
}

export const NetworkContextName = 'NETWORK'

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 80
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000))
export const BIPS_BASE = JSBI.BigInt(10000)
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE) // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE) // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE) // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE) // 15%

// used to ensure the user doesn't send so much ETH so they end up with <.01
export const MIN_ETH: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)) // .01 ETH

export const KCC_BLOCK_TIME = 3
export const MJT_PER_BLOCK_INIT = new BigNumber(3)

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

// console.log(`per block${calculateMjtPerBlockByTimestamp().toNumber()} mjt`)

export const MJT_PER_BLOCK = calculateMjtPerBlockByTimestamp().multipliedBy(0.9)

export const BLOCKS_PER_YEAR = new BigNumber((60 / KCC_BLOCK_TIME) * 60 * 24 * 365) // 10512000

export const BASE_URL = 'https://mojitoswap.finance'
export const BASE_EXCHANGE_URL = process.env.REACT_APP_OFFICIAL_URL
export const BASE_ADD_LIQUIDITY_URL = `/add`
export const BASE_LIQUIDITY_POOL_URL = `/pool`
export const LOTTERY_MAX_NUMBER_OF_TICKETS = 50
export const LOTTERY_TICKET_PRICE = 1
export const IPFS_GATEWAY = 'https://ipfs.io/ipfs'
export const DEFAULT_TOKEN_DECIMAL = new BigNumber(10).pow(18)

export { default as poolsConfig } from './pools'


export const MOJITOSWAP_SWAP_URL = 'https://app.mojitoswap.finance/swap'