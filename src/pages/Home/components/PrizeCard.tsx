import React, { useState } from 'react'
import styled from 'styled-components'
import { FlexRow, Ticket } from '../styles'
import { DRAW_ROUND } from '../../../utils/luckyDrawHelpers'
import { TokenMarketData } from '../../../utils/nftMarektHelpers'
import { find } from 'lodash'

interface PrizeCardProps {
  prize: number // 4,3,2,1,0
  number: number[]
  nftList: TokenMarketData[]
}

const Imgs = {
  prize0: require('../../../assets/images/home/prize-0.png'),
  prize1: require('../../../assets/images/home/prize-1.png'),
  prize2: require('../../../assets/images/home/prize-2.png'),
  prize3: require('../../../assets/images/home/prize-3.png'),
  prize4: require('../../../assets/images/home/prize-4.png'),
}

const Box = styled.div<{ prize: number }>`
  width: 1000px;
  position: relative;
  margin-top: 60px;
  border-radius: 80px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: ${({ prize }) => (prize > 1 ? '68px 98px 0 98px' : '68px 98px')};
`

const ImgPrize = styled.img`
  width: 572px;
  height: 158px;
  margin-top: 128px;
`

const FlexCenterCol = styled(FlexRow)`
  flex-direction: column;
  justify-content: center;
`

const FlexGrid = styled(FlexRow)`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-gap: 40px;
  padding-bottom: 50px;
`

const FlexBetween = styled(FlexRow)<{ prize: number }>`
  justify-content: ${({ prize }) => (prize ? 'space-between' : 'center')};
`

const ViewMore = styled.p`
  color: white;
  font-size: 16px;
  text-align: center;
  margin: 48px 0 53px 0;
  cursor: pointer;
`

const PrizeCard: React.FunctionComponent<PrizeCardProps> = ({ prize, number, nftList }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  const isWinner = (item: any) => {
    const number = String(item)
    const t = find(nftList, { tokenId: number })
    if (t) {
      return true
    } else {
      return false
    }
  }

  const winnerList = React.useMemo(() => {
    const winner = []
    for (let i = 0; i < nftList.length; i++) {
      console.log(typeof number[0])
      const t = number.includes(nftList[i].tokenId as any)
      if (t) {
        winner.push(nftList[i].tokenId)
      }
    }
    return winner
  }, [nftList, number])

  const renderPrize = React.useMemo(() => {
    return (
      <>
        {winnerList.length ? (
          <>
            <FlexCenterCol style={{ color: 'red', marginBottom: '40px' }}>WinnerList In NFT Market</FlexCenterCol>
            <FlexGrid style={{ border: '1px solid red', padding: '20px', marginBottom: '40px' }}>
              {winnerList.map((item, index) => {
                return (
                  <Ticket isWinner={true} key={item}>
                    {item}
                  </Ticket>
                )
              })}
            </FlexGrid>
          </>
        ) : (
          <FlexCenterCol style={{ color: 'red', marginBottom: '40px', border: '1px solid red',padding:'20px' }}>
            No winnerList in NFT Market
          </FlexCenterCol>
        )}

        {number?.length && (
          <FlexGrid>
            {number.map((item, index) => {
              return (
                <Ticket isWinner={isWinner(item)} key={item}>
                  {item}
                </Ticket>
              )
            })}
          </FlexGrid>
        )}
      </>
    )
  }, [prize, number, nftList])

  return (
    <FlexCenterCol>
      <ImgPrize src={Imgs[`prize${prize ?? 0}`]} />
      <Box prize={prize}>{renderPrize}</Box>
    </FlexCenterCol>
  )
}

export default PrizeCard
