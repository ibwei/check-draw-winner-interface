import useElipisis from 'hooks/useElipisis'
import React, { CSSProperties } from 'react'

interface Props {
  styles?: CSSProperties
}

const Elipisis: React.FunctionComponent<Props> = ({ styles }) => {
  const elipisis = useElipisis()
  return <span style={{ display: 'inline-block', width: '20px', textAlign: 'left', ...styles }}> {elipisis}</span>
}

export default Elipisis
