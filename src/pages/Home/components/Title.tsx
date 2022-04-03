import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 58px;
`

const ImgMojitoSwap = styled.img`
  height: 36px;
  margin-right: 48px;
`

const ImgKucoin = styled.img`
  height: 32px;
`

const ImgMJT = styled.img`
  height: 36px;
  margin-right: 11px;
`

const Flex = styled.div`
  display: flex;
  align-items: center;
`

const Text = styled.p`
  color: white;
  font-size: 20px;
`

const Imgs = {
  swapLogo: require('../../../assets/images/home/logo-mojito.svg').default,
  kcLogo: require('../../../assets/images/home/logo-kucoin.svg').default,
  mjtLogo: require('../../../assets/images/home/logo-mjt.svg').default,
}

const Title = () => {

  return (
    <Container>
      <Flex>
        <ImgMojitoSwap src={Imgs['swapLogo']}/>
        <ImgKucoin src={Imgs['kcLogo']}/>
      </Flex>
      <Flex>
        <ImgMJT src={Imgs['mjtLogo']}/>
        <Text>Powered by MojitoSwap</Text>
      </Flex>
    </Container>
  )
}

export default Title