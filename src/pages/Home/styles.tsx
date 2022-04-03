import styled, { css } from 'styled-components'

export const borderBg = require('../../assets/images/home/border.svg').default

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

export const FlexRow = styled.div<{ justify?: string; align?: string; width?: string }>`
  display: flex;
  justify-content: ${({ justify }) => justify && justify};
  align-items: ${({ align }) => align ?? 'center'};
  width: ${({ width }) => width && width};
`

export const Ticket = styled.div<{ isWinner: boolean }>`
  position: relative;
  z-index: 3;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: ${({ isWinner }) => {
    if (isWinner) {
      return '20px'
    }
    return '14px'
  }};
  border: ${({ isWinner }) => {
    if (isWinner) {
      return '2px solid red'
    }
    return 'none'
  }};
  padding: ${({ isWinner }) => {
    if (isWinner) {
      return '10px 20px'
    }
    return '0px'
  }};
`
