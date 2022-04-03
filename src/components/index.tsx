import styled from 'styled-components'
export const Image = styled.img``

export const FlexBox = styled.div`
  display: flex;
`

export const ColumnCentenBox = styled(FlexBox)<{ align?: string }>`
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: ${({ align }) => align ?? 'center'};
`

export const RowCenterBox = styled(FlexBox)<{ align?: string }>`
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: ${({ align }) => align ?? 'center'};
`

export const BetweenBox = styled(FlexBox)`
  justify-content: space-between;
  align-items: center;
`

export const CenterBox = styled(FlexBox)<{ dir?: string }>`
  flex-flow: ${({ dir }) => dir ?? 'column'} nowrap;
  justify-content: center;
  align-items: center;
`

export const MobileView = styled.div`
  width: 100%;
  @media (max-width: 768px) {
    display: block;
  }
  @media (min-width: 769px) {
    display: none;
  }
`

export const BrowserView = styled.div`
  width: 100%;
  @media (max-width: 768px) {
    display: none;
  }
  @media (min-width: 769px) {
    display: block;
  }
`
