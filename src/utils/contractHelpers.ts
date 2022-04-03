import Web3 from 'web3'
import { ethers } from 'ethers'
import { AbiItem } from 'web3-utils'
import web3NoAccount from 'utils/web3'
import { poolsConfig } from 'constants/index'
import { PoolCategory } from 'constants/types'

// Addresses
import {
  getAddress,
  getMjtAddress,
  getLuckyDrawAddress
} from 'utils/addressHelpers'

// ABI
import krc20Abi from 'constants/abis/erc20.json'
import lpTokenAbi from 'constants/abis/lpToken.json'
import mjtABI from 'constants/abis/mjt.json'
import luckyDrawAbi from 'constants/abis/lucky-draw.json'


import { Contract } from 'ethers'
import { JsonRpcProvider } from '@ethersproject/providers'
import { KCC_NETWORKS } from '../constants/kcc';
import getLibrary from './getLibrary';
import { useWeb3React } from '@web3-react/core';

import NetworkConnector from '../connectors/NetworkConnector';

import { NETWORK_CHAIN_ID, NETWORK_URL } from 'connectors'
import { getWalletProvider } from '../hooks/useWalletProvider';

const getContract = (abi: any, address: string, web3?: Web3) => {
  const _web3 = web3 ?? web3NoAccount
  return new _web3.eth.Contract(abi as unknown as AbiItem, address)
}


export const getLuckyDrawContract = (web3: any) => {
  return getContract(luckyDrawAbi, getLuckyDrawAddress(), web3)
}

export const getLuckyDrawPrivateKeyContract = () => {
  const provider = getWalletProvider()
  const contract = new ethers.Contract(
    getLuckyDrawAddress(),
    luckyDrawAbi,
    provider
  );
  return contract
}


export const getKrc20Contract = (address: string, web3?: Web3) => {
  return getContract(krc20Abi, address, web3)
}

export const getLpContract = (address: string, web3?: Web3) => {
  return getContract(lpTokenAbi, address, web3)
}

export const getMjtContract = (web3?: Web3) => {
  // return new Contract(getMjtAddress(), mjtABI)
  return getContract(mjtABI, getMjtAddress(), web3)
}