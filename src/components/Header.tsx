import React from 'react'
import styled from 'styled-components'
import { BetweenBox, RowCenterBox, CenterBox, Image } from './index'
import Text from 'components/Text'
import { MOJITOSWAP_SWAP_URL } from '../constants/index'

const HeaderWrap = styled(BetweenBox)`
  height: 60px;
  width: 100%;
  background: #fff;
`

const LogoWrap = styled.div`
  width: 196px;
  height: 36px;
  margin-left: 24px;
`
const AuditWrap = styled.div`
  width: 117px;
  height: 30px;
`
export const Button = styled(CenterBox)`
  background: linear-gradient(91.72deg, #14d89d 1.03%, #0ac4dd 102.03%);
  border-radius: 22px;
  font-family: 'SF Pro Display Bold';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  /* identical to box height */
  width: 130px;
  height: 36px;
  text-align: center;
  color: #ffffff;
  margin-right: 24px;
  cursor: pointer;
`

const LanguageBox = styled(RowCenterBox)`
  margin: 0 24px;
`

const LanguageIcon = styled.div`
  width: 24px;
  height: 24px;
`

const Header = () => {
  return (
    <HeaderWrap>
      <LogoWrap>
        <Image src={require('../assets/images/home/logo.svg').default} />
      </LogoWrap>
      <RowCenterBox>
        <AuditWrap>
          <Image src={require('../assets/images/home/peckshield.svg').default} />
        </AuditWrap>
        <LanguageBox>
          <LanguageIcon>
            <Image src={require('../assets/images/icon/earth.svg').default} />
          </LanguageIcon>
          <Text style={{ fontFamily: 'SF Pro Display Bold', marginLeft: '10px' }}>EN</Text>
        </LanguageBox>
        <Button
          onClick={() => {
            window.open(MOJITOSWAP_SWAP_URL)
          }}
        >
          GET MJT
        </Button>
      </RowCenterBox>
    </HeaderWrap>
  )
}

export default Header
