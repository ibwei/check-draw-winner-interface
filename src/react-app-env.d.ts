/// <reference types="react-scripts" />

interface Window {
  ethereum?: {
    isMetaMask?: true
    on: (...args: any[]) => void
    removeListener: (...args: any[]) => void
    autoRefreshOnNetworkChange: boolean
    request: any
    chainId: string
  }
  web3?: any
  gtag?: any
  location?: any
}
