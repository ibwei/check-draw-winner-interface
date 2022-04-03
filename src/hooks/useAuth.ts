import { useCallback } from 'react'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector'

import { toast } from 'react-toastify';
import { switchNetwork } from '../utils/wallet'


import { injected, connectorsByName } from '../connectors/index'



export enum ConnectorNames {
  Injected = 'injected',
  WalletConnect = 'walletconnect',
}

const connectorLocalStorageKey = 'connectorId'

const useAuth = () => {
  const chainId = process.env.REACT_APP_CHAIN_ID
  const { activate, deactivate } = useWeb3React()

  const login = useCallback((connectorID: ConnectorNames) => {
    console.log('connectorsByName', connectorsByName)
    const connector = connectorsByName?.[connectorID] ? connectorsByName[connectorID] : injected
    if (connector) {
      activate(connector, async (error: Error) => {
        window.localStorage.removeItem(connectorLocalStorageKey)
        if (error instanceof UnsupportedChainIdError) {
          await switchNetwork(chainId as any)
        } else if (error instanceof NoEthereumProviderError) {
          toast.error('No provider was found')
        } else if (
          error instanceof UserRejectedRequestErrorInjected ||
          error instanceof UserRejectedRequestErrorWalletConnect
        ) {
          if (connector instanceof WalletConnectConnector) {
            const walletConnector = connector as WalletConnectConnector
            walletConnector.walletConnectProvider = null
          }
          toast.error('Please authorize to access your account')
        } else {
          toast.error(error.message)
        }
      })
    } else {
      toast.error('The connector config is wrong')
    }
  }, [])

  return { login, logout: deactivate }
}

export default useAuth
