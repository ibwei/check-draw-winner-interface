import React from "react"
import { getLuckyDrawPrivateKeyContract } from "./contractHelpers"


export enum PRIZE_TYPE {
  'SUPER',
  'ONE',
  'TWO',
  'THREE',
  'FOUR',
}

export enum DRAW_ROUND {
  'ROUND5',
  'ROUND4',
  'ROUND3',
  'ROUND2',
  'ROUND1',
  'END',
  'NOTSTART'
}

export function useLuckyDrawInfo<T, K>(contract: any, property: string, initState: T, param?: any): K {
  const [info, setInfo] = React.useState<any>(initState)
  const handle = (res) => {
    console.log('res', res)
    console.log(property, res)
    if (property === 'drawStatus') {
      setInfo(() => res)
    } else if (property === 'getWinnerList') {
      setInfo(() => res)
    } else {
      setInfo(() => res)
    }
  }

  async function getInfo() {
    if (param !== undefined) {
      await contract.methods[property](param)
        .call()
        .then((res) => {
          handle(res)
        })
    } else {
      await contract.methods[property]()
        .call()
        .then((res) => {
          handle(res)
        })
    }
  }
  getInfo()
  return info
}
const luckyDrawPrivateKeyContract = getLuckyDrawPrivateKeyContract()



export const pickWinnerByPrivateKey = async (round: number) => {
  console.log('wallet start to pick...')
  const overrides = {
    gasPrice: '22000000000',
    gasLimit: '7500000',
  }
  const response = await luckyDrawPrivateKeyContract.pickWinner(round, overrides)
  console.log('wallet-response', response)
  return response
}

export async function getLuckyDrawInfo(contract: any, property: string, param?: any) {
  if (param !== undefined) {
    const response = await contract.methods[property](param).call()
    return response
  } else {
    const response = await contract.methods[property]().call()
    console.log('response', response)
    return response
  }
}
