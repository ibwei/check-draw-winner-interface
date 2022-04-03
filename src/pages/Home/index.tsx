import React, { FunctionComponent, useEffect } from 'react'
import styled from 'styled-components'
import { ColumnCentenBox } from '../../components/index'
import useAuth, { ConnectorNames } from '../../hooks/useAuth'
import { useWeb3React } from '@web3-react/core'
import { useLuckyDrawContract } from '../../hooks/useContract'
import { arrayFromObject, calculateCountdown } from '../../utils/index'
import { getLuckyDrawInfo, pickWinnerByPrivateKey } from 'utils/luckyDrawHelpers'
import { useLuckyDrawInfo, DRAW_ROUND } from '../../utils/luckyDrawHelpers'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { toast } from 'react-toastify'
import LoadingBall from './components/LoadingBall'
import NumberLoader from './components/Loader'

import Title from './components/Title'
import Banner from './components/Banner'
import Prize from './components/PrizeCard'
import { Container, Ticket, FlexRow } from './styles'
import useInterval from 'hooks/useInterval'
import Elipisis from 'components/Elipisis/Elipisis'
import useState from 'react'
import { getNftsMarketData, TokenMarketData } from 'utils/nftMarektHelpers'

dayjs.extend(utc)

const Imgs = {
  search: require('../../assets/images/home/search.svg').default,
  blank: require('../../assets/images/home/blank.png'),
}

const FlexCol = styled(FlexRow)`
  flex-direction: column;
  border-bottom: 1px solid white;
`

const ImgEmpty = styled.img`
  height: 140px;
  width: 140px;
  margin: 80px 0 30px;
`

const TextEmpty = styled.div`
  font-size: 24px;
  color: rgba(255, 255, 255, 0.6);
`

const ImgSearch = styled.img`
  width: 32px;
  height: 32px;
`

const Background = styled.div`
  background: #1d2124;
  width: 100%;
  min-height: 100vh;
  padding-bottom: 360px;
`

const Text = styled.p`
  font-size: 40px;
  font-weight: bold;
  color: white;
`

const HomeWrap = styled(ColumnCentenBox)`
  width: 100%;
  min-height: 100vh;
`

const Input = styled.input`
  height: 38px;
  width: 200px;
  border: none;
  background: transparent;
  outline: none;
  color: white;
  font-size: 24px;
`

const ScrollView = styled.div<{ hiddenY: boolean }>`
  height: 400px;
  width: 100%;

  margin-top: 15px;
  /* Scrollbar */

  overflow-y: auto;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    width: 3px;
  }
  ::-webkit-scrollbar-thumb {
    background: #838383;
    border-radius: 3px;
  }
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px #838383;
    border-radius: 3px;
  }
`

const FlexGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 40px;
`

export const Button = styled.button<{ disabled?: boolean }>`
  width: 390px;
  height: 80px;
  font-family: 'Poppins';
  background: ${({ disabled }) =>
    disabled ? `#C9C9C9` : `conic-gradient(from 180deg at 50% 50%, #8EE107 0deg, #00A66A 360deg)`};
  border: 1px solid rgba(255, 255, 255, 0.24);
  box-sizing: border-box;
  border-radius: 160px;
  font-size: 32px;
  font-weight: bold;
  color: white;
  text-align: center;
  align-items: center;
  cursor: pointer;
  margin-top: 60px;
  cursor: ${({ disabled }) => {
    if (disabled) {
      return 'not-allowed'
    }
    return 'pointer'
  }};
  &:hover {
    background: ${({ disabled }) =>
      disabled
        ? `#C9C9C9`
        : `conic-gradient(
      from 180deg at 50% 50%,
      #5c2dbf 0deg,
      #d22176 95.62deg,
      #ffb545 191.25deg,
      #a21a84 360deg,
      #e125b8 360deg
    )`};
  }
`

const startTime = '2022/04/02 14:04:00'
const prizeRomaName = ['Grand', 'First', 'Second', 'Third', 'Fourth']

const Home: FunctionComponent = () => {
  const { login, logout } = useAuth()

  const { account } = useWeb3React()

  const [isOpen, setIsOpen] = React.useState(false)
  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  const [clickStart, setClickStart] = React.useState<boolean>(false)

  // loading
  const [loading, setLoading] = React.useState<boolean>(false)

  // time tick
  const [count, setCount] = React.useState(0)

  useInterval(() => {
    setCount((c) => c + 1)
  }, 1000)

  const dateCountDown: any = React.useMemo(() => {
    const startTimestampUTC = dayjs(startTime).utc().unix()
    return calculateCountdown(startTimestampUTC * 1000)
  }, [count])

  const [currentRound, setCurrentRound] = React.useState<DRAW_ROUND>(DRAW_ROUND.ROUND1)

  const [nftList, setNftList] = React.useState<TokenMarketData[]>([])

  const luckyDrawContract = useLuckyDrawContract()

  const initUsers = {
    [DRAW_ROUND.ROUND1]: [],
    [DRAW_ROUND.ROUND2]: [],
    [DRAW_ROUND.ROUND3]: [],
    [DRAW_ROUND.ROUND4]: [],
    [DRAW_ROUND.ROUND5]: [],
  }

  const [winnerList, setWinnerList] = React.useState(initUsers)

  async function getWinnerList(round: DRAW_ROUND) {
    const buffer = await getLuckyDrawInfo(luckyDrawContract, 'getWinnerList', round)
    const users = arrayFromObject(buffer)
    return users
  }

  // init all status when app luanc

  // 监听到轮次发生变化，就获取对应轮次的中奖人员名单

  const updateWinnerListByRound = async (round: DRAW_ROUND) => {
    if (!winnerList[round]?.length) {
      const currentRoundUser = await getWinnerList(round)
      setWinnerList((oldWinnerList) => {
        return { ...oldWinnerList, [round]: currentRoundUser }
      })
    }
  }

  // 轮次变化更改显示winnerList
  React.useEffect(() => {
    updateWinnerListByRound(DRAW_ROUND.ROUND1)
    updateWinnerListByRound(DRAW_ROUND.ROUND2)
    updateWinnerListByRound(DRAW_ROUND.ROUND3)
    updateWinnerListByRound(DRAW_ROUND.ROUND4)
    updateWinnerListByRound(DRAW_ROUND.ROUND5)
  }, [currentRound, clickStart])

  const reset = async (round: number) => {
    const response = await luckyDrawContract.methods.reset().send({
      from: account,
    })
    console.log(response)
    setCurrentRound(() => DRAW_ROUND.ROUND1)
    setWinnerList(() => initUsers)
    toast.success('Reset Success')
    return response
  }

  const asistLogin = () => {
    login(ConnectorNames.Injected)
    window.localStorage.setItem('connectorId', 'injected')
  }

  React.useEffect(() => {
    async function getNFTsInMarket() {
      console.log('start to get NFts...')
      const subgraphRes = await getNftsMarketData(
        { collection: '0xb47f0ca0f9d5c5e953e67340566dbb22292c1f28', isTradable: true },
        1000
      )
      console.log('marketData', subgraphRes)
      setNftList(() => subgraphRes)
    }
    getNFTsInMarket()
  }, [])

  return (
    <HomeWrap>
      {/* <Button onClick={pickWinnerByUser.bind(null, 4)}>pickbyUser</Button>
      <Button onClick={pickWinnerByPrivateKey.bind(null, 4)}>pickbyWalletKey</Button>
      <Button onClick={drawAllWinners}>drawAllWinner</Button> */}
      <Background>
        <Banner />
        <Container>
          <Title />

          {!account && <Button onClick={asistLogin.bind(null)}>Connect Wallet</Button>}
          <FlexCol style={{ borderBottom: 'none' }}>
            {account && (
              <Button style={{ margin: '0 auto', position: 'relative', zIndex: 1111 }} onClick={reset.bind(null)}>
                Reset
              </Button>
            )}
          </FlexCol>
        </Container>

        <Prize prize={0} number={winnerList[DRAW_ROUND.ROUND5]} nftList={nftList} />
        <Prize prize={1} number={winnerList[DRAW_ROUND.ROUND4]} nftList={nftList} />
        <Prize prize={2} number={winnerList[DRAW_ROUND.ROUND3]} nftList={nftList} />
        <Prize prize={3} number={winnerList[DRAW_ROUND.ROUND2]} nftList={nftList} />
        <Prize prize={4} number={winnerList[DRAW_ROUND.ROUND1]} nftList={nftList} />
      </Background>
    </HomeWrap>
  )
}

export default Home
