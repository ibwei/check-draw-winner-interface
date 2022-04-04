import React, { FunctionComponent, useEffect } from 'react'
import styled from 'styled-components'
import { ColumnCentenBox } from '../../components/index'
import useAuth, { ConnectorNames } from '../../hooks/useAuth'
import { useWeb3React } from '@web3-react/core'
import { useLuckyDrawContract } from '../../hooks/useContract'
import { arrayFromObject, calculateCountdown, stringSplit } from '../../utils/index'
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
  height: 68px;
  width: 600px;
  height: 300px;
  background: transparent;
  outline: none;
  color: white;
  font-size: 24px;
  border: 1px solid red;
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

  const kcsfans1 =
    '097403083630093527066952067358067849071434079594071933092694092460094561055468109936057764097620086531088723070298057912084559078559083379109519108576060390093657089978081913084492079131053427053455080568097719094255080048094380069674089449103830066310092473094011100486078267086082063841087312071742097557096958089820070765059863092546084382107624092662064328067991078135108930071540098379101691078045056755071342088060104971104291076707057984108479089377107207107134086201079136103725092050087845056359062525069379062512103704084327063330099519080471066204091718084512058932060243108136109933072967101615061934067605055313'

  const kcs997 =
    '159287171593153958164896178966174681179210156067150404169476150955173714160596166102166192170038160622156824176784170126159268153604169709169519179280165624158838179922173756175726161015151514152017177963163632161970161591164467161263151587150560171724166437150223153041153565173453174544163234170284179119179375179116165985155363157911169335163711170996152672164988157053155957174344158352179260153986165155165161173761173748169108154271170644154328153691153944169276167548161355165910175189168756167863155480156215163728151589170839161753155368159610153785175124169512152769176199173840173807167357'

  const af =
    '163623157317170620156550163681151296176968158866156832154373171950152541154524154541172922155736171231161944155258153372178115170162174113171794171243154640152055170881165197171108160746177276172759175597175443162731167108164500151160157843171599150923164075167853167063167961167744156148176237178611177602161869163586173847157355161288150965173380179229155330158284178602167759166761158645152037158382164088175737160981169637174550156600163151178361175511156187171574162221167499150505174353169704176656175159166161166026162407166500153286176576156943178998153330163775155102167436168983163457163883'

  const google =
    '059109074462101460102217106852084602103869099321083718097184097865064633057775093337070248082616104428052631098077067720068265071012100720101235087494105367055657060721056675072338076538102030070120053778060743070494052341092135096513104546058326060671078525067750086818092220085053057963087341086741109922075230082315073385075360094580090805109916067048086019085279054655087594107525100905065947079596087701108511100155073532108213062944055176058517109012063623082227094286082496097885075389055973073234093730063016101067060918099327107708097771107073058327054517108176078341057737075922100078104813093517'

  const ticketid = '034957031443035776039246030571'

  const number1 = stringSplit(kcsfans1, 6)
  const number2 = stringSplit(kcs997, 6)
  const number3 = stringSplit(af, 6)
  const number4 = stringSplit(google, 6)
  const number5 = stringSplit(ticketid, 6)

  console.log('number', number1)
  console.log('number', number2)
  console.log('number', number3)
  console.log('number', number4)
  console.log('number', number5)

  const myKucoinNumber = [...number1, ...number2, ...number3, ...number4, ...number5]

  return (
    <HomeWrap>
      {/* <Button onClick={pickWinnerByUser.bind(null, 4)}>pickbyUser</Button>
      <Button onClick={pickWinnerByPrivateKey.bind(null, 4)}>pickbyWalletKey</Button>
      <Button onClick={drawAllWinners}>drawAllWinner</Button> */}
      <Background>
        <Banner />
        <Container>
          <Title />

          <FlexCol style={{ borderBottom: 'none' }}>
            {!account && (
              <Button style={{ margin: '0 auto', position: 'relative', zIndex: 1111 }} onClick={asistLogin.bind(null)}>
                Connect Wallet
              </Button>
            )}
          </FlexCol>
          {/* <FlexCol style={{ borderBottom: 'none' }}>
            {account && (
              <Button style={{ margin: '0 auto', position: 'relative', zIndex: 1111 }} onClick={reset.bind(null)}>
                Reset
              </Button>
            )}
          </FlexCol> */}
          {/* <FlexCol style={{ borderBottom: 'none' }}>{account && <Input></Input>}</FlexCol> */}
        </Container>

        <Prize prize={0} number={winnerList[DRAW_ROUND.ROUND5]} nftList={nftList} ownList={myKucoinNumber} />
        <Prize prize={1} number={winnerList[DRAW_ROUND.ROUND4]} nftList={nftList} ownList={myKucoinNumber} />
        <Prize prize={2} number={winnerList[DRAW_ROUND.ROUND3]} nftList={nftList} ownList={myKucoinNumber} />
        <Prize prize={3} number={winnerList[DRAW_ROUND.ROUND2]} nftList={nftList} ownList={myKucoinNumber} />
        <Prize prize={4} number={winnerList[DRAW_ROUND.ROUND1]} nftList={nftList} ownList={myKucoinNumber} />
      </Background>
    </HomeWrap>
  )
}

export default Home
