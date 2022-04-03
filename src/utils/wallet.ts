import i18next from 'i18next'
import { getNetworkInfo, web3Utils } from './index'
import { ChainId } from 'mojitoswap-sdk'

export const switchNetworkInPc = async (selectedNetworkInfo: any) => {
  await window.ethereum?.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: web3Utils.toHex(selectedNetworkInfo.chain_id).toString() }],
  })
}

export const addNetwork = async (selectedNetworkInfo: any) => {
  const net = {
    method: 'wallet_addEthereumChain',
    params: [
      {
        chainId: web3Utils.toHex(selectedNetworkInfo.chain_id).toString(), // A 0x-prefixed hexadecimal string
        chainName: selectedNetworkInfo.fullName,
        nativeCurrency: {
          name: selectedNetworkInfo.symbol,
          symbol: selectedNetworkInfo.symbol.toUpperCase(), // 2-6 characters long
          decimals: selectedNetworkInfo.decimals,
        },
        rpcUrls: [selectedNetworkInfo.rpc],
        blockExplorerUrls: [selectedNetworkInfo.browser],
        iconUrls: [selectedNetworkInfo.logo],
      },
    ],
  }
  await window.ethereum?.request(net)
}


export const switchNetwork = async (id: ChainId) => {
  const width = document.body.clientWidth ?? document.documentElement.clientWidth
  const selectedNetworkInfo = getNetworkInfo(id)

  if (width <= 768) {
    await addNetwork(selectedNetworkInfo)
  } else {
    try {
      await switchNetworkInPc(selectedNetworkInfo)
    } catch (error: any) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (error.code === 4902) {
        addNetwork(selectedNetworkInfo)
      }
    }
  }
}
