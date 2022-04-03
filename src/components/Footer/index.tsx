import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { FOOTER_LIST, MojitoSwap } from '../../constants/footerList'
import { BrowserView, MobileView, ColumnCentenBox, BetweenBox, RowCenterBox } from '../index'
import MFooter from './MFooter'
import { Image } from 'components/index'
import Text from 'components/Text'
import { Button } from '../Header'
import { MOJITOSWAP_SWAP_URL } from '../../constants/index'

export interface AppFooterProps {}

const AppFooterWrap = styled.div`
  padding-top: 75px;
  width: 100%;
  position: relative;
  z-index: 99;
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
  align-items: center;
  height: auto;
  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    text-align: center;
  }
`
const AppFooterContentWrap = styled.div`
  width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  @media (max-width: 768px) {
    width: 100%;
    padding-top: 0px;
  }
  @media (max-width: 1200px) and (min-width: 769px) {
    width: 100%;
    padding: 24px 24px 0px 24px;
  }
`

const FooterTitle = styled.span`
  font-family: 'SF Pro Display Bold';
  font-size: 20px;
  color: #14d89d;
  line-height: 34px;
`

const FooterNavText = styled.span`
  font-size: 14px;
  line-height: 34px;
  text-align: left;
  cursor: pointer;
  margin-top: 8px;
`

const CopyRightText = styled.div`
  width: 100%;
  opacity: 0.6;
  font-size: 14px;
  color: #666;
  @media (max-width: 768px) {
    border-top: none;
    text-align: center;
    height: auto;
    font-size: 12px;
    margin-top: 24px;
  }
  @media (max-width: 1200px) and (min-width: 769px) {
    width: 100%;
    height: auto;
    margin-top: 24px;
  }
`
const MediaIcon = styled.div`
  width: 42px;
  height: 42px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`
const Divider = styled.div`
  background: #c9c9c9;
  height: 1px;
  width: 100%;
  opacity: 0.6;
`

const MJTICON = styled.div`
  width: 24px;
  height: 24px;
`

const Footer: React.FunctionComponent<AppFooterProps> = () => {
  const nav2Target = ({ navText, navRoute }: { navText: string; navRoute: string }) => {
    let route = navRoute
    if (route) {
      if (route.startsWith('/')) {
        // router.push(route)
      } else if (route.startsWith('http')) {
        window.open(route, '_blank')
      } else if (route.startsWith('id')) {
        const url = `${MojitoSwap.DOCS_URL}`
        console.log('url', url)
        window.open(url, '_blank')
      }
    }
  }

  const FooterNavList = FOOTER_LIST.map((item, index) => {
    const children = item.children.map((nav, index) => {
      return (
        <FooterNavText key={index} onClick={nav2Target.bind(null, nav)}>
          {nav.navText}
        </FooterNavText>
      )
    })
    return (
      <ColumnCentenBox align="flex-start" key={index}>
        <FooterTitle>{item.title}</FooterTitle>
        <ColumnCentenBox align="flex-start">{children}</ColumnCentenBox>
      </ColumnCentenBox>
    )
  })

  return (
    <AppFooterWrap>
      <BrowserView>
        <AppFooterContentWrap>
          <BetweenBox style={{ alignItems: 'flex-start' }}>
            <ColumnCentenBox align="flex-start" style={{ width: '320px' }}>
              <Image src={require('../../assets/images/home/logo.svg').default} />
              <Text marginTop="16px" color="#666">
                One-stop-shop decentralized trading on KCC
              </Text>
              <BetweenBox style={{ width: '100%', marginTop: '32px' }}>
                {MojitoSwap.CONTACT_LIST.map((media, index) => {
                  return (
                    <MediaIcon
                      key={index}
                      onClick={() => {
                        window.open(media.route)
                      }}
                    >
                      <Image src={media.icon} />
                    </MediaIcon>
                  )
                })}
              </BetweenBox>
            </ColumnCentenBox>
            <RowCenterBox
              style={{ justifyContent: 'space-between', marginLeft: '270px', alignItems: 'flex-start', flex: 1 }}
            >
              {FooterNavList}
            </RowCenterBox>
          </BetweenBox>
        </AppFooterContentWrap>
        <Divider style={{ marginTop: '30px' }} />
        <AppFooterContentWrap>
          <BetweenBox style={{ height: '80px' }}>
            <CopyRightText>
              CopyRight © 2021 - {`${new Date().getFullYear()}`} MojitoSwap All Rights Reserved.
            </CopyRightText>
            <RowCenterBox>
              <RowCenterBox>
                <MJTICON>
                  <Image src={require('../../assets/images/home/mjt.svg').default} />
                </MJTICON>
                <Text style={{ marginLeft: '8px' }} color="#18BB97">
                  $120.00
                </Text>
                <Button
                  style={{
                    marginLeft: '32px',
                    width: '104px',
                    marginRight: '0px',
                    fontFamily: 'SF Pro Display',
                    fontSize: '16px',
                  }}
                  onClick={() => {
                    window.open(MOJITOSWAP_SWAP_URL)
                  }}
                >
                  Buy Mjt
                </Button>
              </RowCenterBox>
            </RowCenterBox>
          </BetweenBox>
        </AppFooterContentWrap>
      </BrowserView>
      <MobileView style={{ padding: '0 24px' }}>
        <MFooter />
      </MobileView>
    </AppFooterWrap>
  )
}

export default Footer
