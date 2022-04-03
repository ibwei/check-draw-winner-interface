import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'

export const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://thegraph.kcc.network/subgraphs/name/mojito/swap',
  }),
  cache: new InMemoryCache(),
})

export const healthClient = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.thegraph.com/index-node/graphql',
  }),
  cache: new InMemoryCache(),
})

export const v1Client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.thegraph.com/subgraphs/name/ianlapham/uniswap',
  }),
  cache: new InMemoryCache(),
})

export const stakingClient = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.thegraph.com/subgraphs/name/way2rach/talisman',
  }),
  cache: new InMemoryCache(),
})

export const blockClient = new ApolloClient({
  link: new HttpLink({
    uri: 'https://thegraph.kcc.network/subgraphs/name/kcc-blocks',
  }),
  cache: new InMemoryCache(),
})
