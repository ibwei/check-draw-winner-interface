import { ChainId } from 'mojitoswap-sdk'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateBlockNumber, toggleEnableMaxHops } from './actions'
import { KCC_NETWORK_IDS } from '../../constants/kcc'
import { useActiveWeb3React } from '../../hooks'
import { switchNetwork } from 'utils/wallet'
import useDebounce from 'hooks/useDebounce'

export default function Updater(): null {
  const { library, chainId } = useActiveWeb3React()
  const dispatch = useDispatch()


  const [state, setState] = useState<{ chainId: number | undefined; blockNumber: number | null }>({
    chainId,
    blockNumber: null,
  })

  const blockNumberCallback = useCallback(
    (blockNumber: number) => {
      setState((s) => {
        if (chainId === s.chainId) {
          if (typeof s.blockNumber !== 'number') return { chainId, blockNumber }
          return { chainId, blockNumber: Math.max(blockNumber, s.blockNumber) }
        }
        return s
      })
    },
    [chainId, setState]
  )

  useEffect(() => {
    if (window?.ethereum && !KCC_NETWORK_IDS.includes(chainId as any)) {
      switchNetwork(process.env.REACT_APP_CHAIN_ID as any)
    }
  }, [chainId])

  // attach/detach listeners
  useEffect(() => {
    if (!library || !chainId) return undefined

    setState({ chainId, blockNumber: null })

    library
      .getBlockNumber()
      .then(blockNumberCallback)
      .catch((error) => console.error(`Failed to get block number for chainId: ${chainId}`, error))

    library.on('block', blockNumberCallback)
    return () => {
      library.removeListener('block', blockNumberCallback)
    }
  }, [dispatch, chainId, library, blockNumberCallback])

  const debouncedState = useDebounce(state, 100)

  useEffect(() => {
    if (!debouncedState.chainId || !debouncedState.blockNumber ) return
    dispatch(updateBlockNumber({ chainId: debouncedState.chainId, blockNumber: debouncedState.blockNumber }))
  }, [ dispatch, debouncedState.blockNumber, debouncedState.chainId])

  return null
}

