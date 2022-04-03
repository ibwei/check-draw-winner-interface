import { client } from '../apollo/client'
import { GLOBAL_DATA } from '../apollo/queries'
import Web3 from 'web3'
import { ChainId } from 'mojitoswap-sdk'
import { KCC_NETWORKS, NetworkType } from 'constants/kcc'


const { utils } = new Web3()

export const web3Utils = utils

export const getTotalLockedValue = async () => {
  const result = await client.query({
    query: GLOBAL_DATA(),
    fetchPolicy: 'cache-first',
  })
  console.log('result', result)
  return {
    totalLiquidityUSD: result.data.uniswapFactories[0]?.totalLiquidityUSD ?? '0',
    txCount: result.data.uniswapFactories[0]?.txCount ?? '0',
  }
}


export function getNetworkInfo(networkId: ChainId): NetworkType {
  return KCC_NETWORKS[networkId]
}

export function arrayFromObject(o: any) {
  console.log(o)
  const arr = []
  if (typeof o === 'object') {
    for (const key in o) {
      arr.push(o[key])
    }
    return arr
  }
  return []
}


export function calculateCountdown(endDate: number) {
  let diff = (Date.parse(new Date(endDate) as any) - Date.parse(new Date() as any)) / 1000

  // clear countdown when date is reached
  if (diff <= 0) return false

  const timeLeft = {
    years: 0,
    days: 0,
    hours: 0,
    min: 0,
    sec: 0,
  }

  // calculate time difference between now and expected date
  if (diff >= 365.25 * 86400) {
    // 365.25 * 24 * 60 * 60
    timeLeft.years = Math.floor(diff / (365.25 * 86400))
    diff -= timeLeft.years * 365.25 * 86400
  }
  if (diff >= 86400) {
    // 24 * 60 * 60
    timeLeft.days = Math.floor(diff / 86400)
    diff -= timeLeft.days * 86400
  }
  if (diff >= 3600) {
    // 60 * 60
    timeLeft.hours = Math.floor(diff / 3600)
    diff -= timeLeft.hours * 3600
  }
  if (diff >= 60) {
    timeLeft.min = Math.floor(diff / 60)
    diff -= timeLeft.min * 60
  }
  timeLeft.sec = diff

  return timeLeft
}
