
import { gql, request } from 'graphql-request'
import { getBaseNftFields, getBaseTransactionFields, getCollectionBaseFields } from './queries'

const GRAPH_API_NFTMARKET = 'https://thegraph.kcc.network/subgraphs/name/mojito/nft-market'

export interface Transaction {
  id: string
  block: string
  timestamp: string
  askPrice: string
  netPrice: string
  buyer: { id: string }
  seller: { id: string }
  withBNB: boolean
  nft?: TokenMarketData
}

export interface TokenMarketData {
  tokenId: string
  metadataUrl: string
  currentAskPrice: string
  currentSeller: string
  latestTradedPriceInBNB: string
  tradeVolumeBNB: string
  totalTrades: string
  isTradable: boolean
  otherId: string
  collection?: {
    id: string
  }
  updatedAt?: string
  transactionHistory?: Transaction[]
}

export const getNftsMarketData = async (
  where = {},
  first = 1000,
  orderBy = 'id',
  orderDirection: 'asc' | 'desc' = 'desc',
  skip = 0,
): Promise<TokenMarketData[]> => {
  try {
    const res = await request(
      GRAPH_API_NFTMARKET,
      gql`
        query getNftsMarketData($first: Int, $skip: Int!, $where: NFT_filter, $orderBy: NFT_orderBy, $orderDirection: OrderDirection) {
          nfts(where: $where, first: $first, orderBy: $orderBy, orderDirection: $orderDirection, skip: $skip) {
            ${getBaseNftFields()}
            transactionHistory {
              ${getBaseTransactionFields()}
            }
          }
        }
      `,
      { where, first, skip, orderBy, orderDirection },
    )

    return res.nfts
  } catch (error) {
    console.error('Failed to fetch NFTs market data', error)
    return []
  }
}