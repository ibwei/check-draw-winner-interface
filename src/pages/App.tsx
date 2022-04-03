import Web3ReactManager from 'components/Web3ReactManager'
import { useEagerConnect } from 'hooks'
import React, { FunctionComponent, useState } from 'react'
import { Route, BrowserRouter, Router, Routes } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Home from './Home'

const App: FunctionComponent = () => {
  useEagerConnect()

  return (
    <>
      <ToastContainer />
      <Web3ReactManager>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Home />} path="/1" />
          <Route element={<Home />} path="/2" />

        </Routes>
      </Web3ReactManager>
    </>
  )
}

export default App
