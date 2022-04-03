import { ChainId } from 'mojitoswap-sdk'
import addresses from '../constants/contract'
import tokens from '../constants/tokens'
import { Address } from '../constants/types'

export const getAddress = (address: Address): string => {
  if (!address) {
    return ''
  }
  const chainId = process.env.REACT_APP_CHAIN_ID as any
  return address[chainId] ? address[chainId] : address[ChainId.MAINNET]
}

export const getMjtAddress = () => {
  return getAddress(tokens.mjt.address)
}
export const getLuckyDrawAddress = () => {
  return getAddress(addresses.luckydraw)
}
export const getMulticallAddress = () => {
  return getAddress(addresses.mulltiCall)
}

export const getWkcsAddress = () => {
  return getAddress(tokens.wkcs.address)
}

