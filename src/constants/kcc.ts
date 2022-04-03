import { ChainId } from 'mojitoswap-sdk'

export const KCC_NETWORKS = {
  [ChainId.MAINNET]: {
    name: 'KCC-MAINNET',
    fullName: 'KCC Mainnet Network',
    abbr: 'KCC',
    rpc: 'https://rpc-mainnet.kcc.network',
    chain_id: 321,
    decimals: 18,
    symbol: 'KCS',
    browser: 'https://explorer.kcc.io',
    logo: 'https://cdn.jsdelivr.net/gh/kucoin-community-chain/tokens-info@main/icons/chain-321.png',
    bridgeCoreAddress: '0xe61dd9cA7364225aFBFB79e15AD33864424e6aE4',
    standard: 'KRC20',
  },
  [ChainId.TESTNET]: {
    name: 'KCC-TEST',
    fullName: 'KCC Test Network',
    abbr: 'KCC-TEST',
    rpc: 'https://rpc-testnet.kcc.network',
    chain_id: 322,
    decimals: 18,
    symbol: 'KCS',
    browser: 'https://scan-testnet.kcc.network',
    logo: 'https://cdn.jsdelivr.net/gh/kucoin-community-chain/tokens-info@main/icons/chain-321.png',
    bridgeCoreAddress: '0xA976440272c709C69970A40cb9249BfAa4759A7A',
    standard: 'KRC20',
  },
}

export const KCC_NETWORK_IDS = [322, 321]

export interface NetworkType {
  name: string
  rpc: string
  fullName: string
  chain_id: number
  symbol: string
  browser: string
  decimals: number
  logo: string
  bridgeCoreAddress: string
  standard: string
  fee?: number
  abbr: string
}

export interface AddEthereumChainParameter {
  chainId: string // A 0x-prefixed hexadecimal string
  chainName: string
  nativeCurrency: {
    name: string
    symbol: string // 2-6 characters long
    decimals: number
  }
  rpcUrls: string[]
  blockExplorerUrls?: string[]
  iconUrls?: string[] // Currently ignored.
}
