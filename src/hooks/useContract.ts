import { Contract } from '@ethersproject/contracts'
import { ChainId, WETH } from 'mojitoswap-sdk'
import { useMemo } from 'react'
import ENS_ABI from '../constants/abis/ens-registrar.json'
import ENS_PUBLIC_RESOLVER_ABI from '../constants/abis/ens-public-resolver.json'
import { ERC20_BYTES32_ABI } from '../constants/abis/erc20'
import ERC20_ABI from '../constants/abis/erc20.json'
import WETH_ABI from '../constants/abis/weth.json'
import { MULTICALL_ABI, MULTICALL_ADDRESS } from 'constants/multicall'
import useWeb3 from 'hooks/useWeb3'

import {
  getKrc20Contract,
  getMjtContract,
  getLuckyDrawContract
} from 'utils/contractHelpers'
import { useWeb3React } from '@web3-react/core'
import { getWalletProvider } from './useWalletProvider';


export const useERC20 = (address: string) => {
  const web3 = useWeb3()
  return useMemo(() => getKrc20Contract(address, web3), [address, web3])
}

export const useMjt = () => {
  const web3 = useWeb3()
  return useMemo(() => getMjtContract(web3), [web3])
}

export const useLuckyDrawContract = () => {
  const web3 = useWeb3()
  return useMemo(() => getLuckyDrawContract(web3), [web3])
}



