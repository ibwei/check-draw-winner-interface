import { AbiItem } from 'web3-utils'
import { Interface } from '@ethersproject/abi'
import { getWeb3NoAccount } from 'utils/web3'
import MultiCallAbi from 'constants/abis/Multicall.json'
import { getMulticallAddress } from 'utils/addressHelpers'
// import { MULTICALL_ADDRESS } from 'constants/multicall'
import Web3 from 'web3'
import { ethers } from 'ethers'

interface Call {
  address: string // Address of the contract
  name: string // Function name on the contract (example: balanceOf)
  params?: any[] // Function params
}

interface MulticallOptions {
  requireSuccess?: boolean
}

type MultiCallResponse<T> = T | null

const multicall = async (abi: any[], calls: Call[]) => {
  const web3 = getWeb3NoAccount()
  const multi = new web3.eth.Contract(MultiCallAbi as unknown as AbiItem, getMulticallAddress())
  const itf = new Interface(abi)

  const calldata = calls.map((call) => {
    return [call.address.toLowerCase(), itf.encodeFunctionData(call.name, call.params)]
  })

  const { returnData } = await multi.methods.aggregate(calldata).call()
  const res = returnData.map((call, i) => itf.decodeFunctionResult(calls[i].name, call))
  return res
}


export const multiClaim = async (abi: any[], calls: Call[], account: string, library: any) => {
  const web3 = new Web3(library.provider)
  const multi = new web3.eth.Contract(MultiCallAbi as unknown as AbiItem, getMulticallAddress())
  const itf = new Interface(abi)

  const calldata = calls.map((call) => {
    return [call.address.toLowerCase(), itf.encodeFunctionData(call.name, call.params)]
  })

  const { returnData } = await multi.methods.aggregate(calldata).send({ from: account, gasLimit: 1000000 })
    .on('transactionHash', (tx) => {
      console.log('hash =', tx)
      return tx.transactionHash
    })
  console.log('returnData =', returnData)
  const res = returnData.map((call, i) => itf.decodeFunctionResult(calls[i].name, call))
  return res
}

/**
 * Multicall V2 uses the new "tryAggregate" function. It is different in 2 ways
 *
 * 1. If "requireSuccess" is false multicall will not bail out if one of the calls fails
 * 2. The return includes a boolean whether the call was successful e.g. [wasSuccessful, callResult]
 */
export const multicallv2 = async <T = any>(
  abi: any[],
  calls: Call[],
  options: MulticallOptions = { requireSuccess: true },
): Promise<MultiCallResponse<T>> => {
  const { requireSuccess } = options
  const multi = new ethers.Contract(getMulticallAddress(), MultiCallAbi, null)
  const itf = new Interface(abi)

  const calldata = calls.map((call) => [call.address.toLowerCase(), itf.encodeFunctionData(call.name, call.params)])
  const returnData = await multi.tryAggregate(requireSuccess, calldata)
  const res = returnData.map((call, i) => {
    const [result, data] = call
    return result ? itf.decodeFunctionResult(calls[i].name, data) : null
  })

  return res
}

export default multicall
