import React, { FunctionComponent } from 'react'
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'
import { Provider } from 'react-redux'
import store from './state'

import {  BrowserRouter } from 'react-router-dom'
import getLibrary from 'utils/getLibrary'


const Web3ProviderNetwork = createWeb3ReactRoot('NETWORK')


const Providers: FunctionComponent = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
        <Provider store={store}>
          <BrowserRouter>{children}</BrowserRouter>
        </Provider>
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  )
}

export default Providers
