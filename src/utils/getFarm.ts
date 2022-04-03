import farms from 'constants/farms'
import { FarmConfig } from 'constants/types'

export function getFarmByPid(pid: number): FarmConfig {
  for (let i = 0; i < farms.length; i++) {
    if (pid === farms[i].pid) {
      return farms[i]
    }
  }
  return farms[0]
}

export function getFarmName(pid: number): string {
  const farm = getFarmByPid(pid)
  return `${farm.token.symbol.toUpperCase()}/${farm.quoteToken.symbol.toUpperCase()}`
}
