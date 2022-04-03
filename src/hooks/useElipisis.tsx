import React from 'react'
import useInterval from './useInterval'

function useElipisis() {
  const [elipisis, setElipisis] = React.useState<string>('.')
  useInterval(() => {
    if (elipisis === '.') {
      setElipisis(() => '..')
    } else if (elipisis === '..') {
      setElipisis(() => '...')
    } else {
      setElipisis(() => '.')
    }
  }, 300)
  return elipisis
}

export default useElipisis
