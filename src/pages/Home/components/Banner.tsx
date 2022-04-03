import React from 'react'
import styled from 'styled-components'
import { Container, FlexRow } from '../styles'
import { getLuckyDrawAddress } from '../../../utils/addressHelpers'

const Imgs = {
  bg: require('../../../assets/images/home/banner.png'),
  box: require('../../../assets/images/home/box.png'),
  title: require('../../../assets/images/home/banner-title.png'),
  titleSub: require('../../../assets/images/home/banner-sub.png'),
  titleRule: require('../../../assets/images/home/title-rule.png'),
  timeBox: require('../../../assets/images/home/box-time.png'),
  point: require('../../../assets/images/home/point.png'),
}


const Bg = styled.div`
  width: 100%;
  height: 856px;
  position: absolute;
  top:0;
  left:0;
  margin-top: 60px;
`

const ImgBannerBg = styled.img<{ rotate?: boolean }>`
  height: 856px;
  width: 432px;
  position: absolute;
  left: ${({ rotate }) => `${rotate ? 'calc(100vw - 432px)' : '0'}`};
  transform: ${({ rotate }) => `rotate(${rotate ? '180deg' : '0'})`};
`

const FlexCenterCol = styled(FlexRow)`
  flex-direction: column;
  justify-content: center;
  height: 856px;
`

const ImgTitle = styled.img`
  width: 819px;
  margin-bottom: 50px;
`

const ImgTitleSub = styled.img`
  width: 417px;
  margin-top: -45px;
  margin-bottom: 40px;
`

const ImgTitleRule = styled.img`
  width: 99px;
  margin-top: 158px;
`

const ImgBox = styled.img`
  height: 478px;
  width: 764px;
`

const ImgTimeBox = styled.div`
  background: url(${Imgs.timeBox}) no-repeat;
  background-size: 100% 100%;
  width: 60px;
  height: 80px;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 36px;
  font-weight: bold;
`

const ImgPoint = styled.img`
  width: 10px;
  height: 35px;
  margin-right: 12px;
`

const Text = styled.p`
  color: white;
  font-size: 12px;
  text-align: center;
  max-width: 1050px;
  margin-top: 30px;
`

const RuleWrap = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
`


const Banner: React.FunctionComponent = () => {
  return (
    <>
      <Bg>
        <ImgBannerBg src={Imgs.bg} />
        <ImgBannerBg src={Imgs.bg} rotate />
      </Bg>
      <FlexCenterCol style={{ height: 'auto', justifyContent: 'flex-start' }}>
        <Text style={{ fontSize: '60px', marginTop: '100px', fontWeight: 'bold' }}>
          Winner in the MojitoSwap NFT Market
        </Text>
        <Text style={{ fontSize: '20px', marginTop: '00px', fontWeight: 'bold' }}>
          NFT Market中的出售的中奖号码将被红色圈起来
        </Text>
      </FlexCenterCol>
    </>
  )
}

export default Banner
