import { JsonRpcProvider } from '@ethersproject/providers'
import { KCC_NETWORKS } from '../constants/kcc'

export function useProvider(chainId = 321) {
  const provider = new JsonRpcProvider(KCC_NETWORKS[chainId].rpc, { chainId: 321, name: 'kcc' })
  return provider
}
