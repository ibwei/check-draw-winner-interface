

export const MojitoSwap = {
  FULLNAME: 'MojitoSwap',
  DOCS_URL: 'https://docs.kcc.io/#/',
  GITHUB_URL: 'https://github.com/kcc-community',
  DISCORD_URL: 'https://discord.com/invite/H5ucJydSyd',
  MEDIA_URL: 'https://kccofficial.medium.com',
  TWITTER: 'https://twitter.com/KCCOfficialTW',
  TELEGRAM: 'https://t.me/KCCOfficialEnglishCommunity',
  CONTACT_LIST: [
    {
      app: 'Twitter',
      icon: require('../assets/images/home/twitter.svg').default,
      route: 'https://twitter.com/KCCOfficialTW',
    },
    {
      app: 'Github',
      icon: require('../assets/images/home/github.svg').default,
      route: 'https://github.com/kcc-community',
    },
    {
      app: 'Telegram',
      icon: require('../assets/images/home/tel.svg').default,
      route: 'https://t.me/KCCOfficialEnglishCommunity',
    },

    {
      app: 'Mediumn',
      icon: require('../assets/images/home/medium.svg').default,
      route: 'https://discord.com/invite/H5ucJydSyd',
    },
  ],
}

export const APP = {
  TOKEN_INFO_CDN: 'https://cdn.jsdelivr.net/gh/kucoin-community-chain/tokens-info@main/icons/',
}


// footer nanList
export const FOOTER_LIST = [
  {
    title: 'Contract',
    children: [
      {
        navText: 'Apply For Farm',
        navRoute: MojitoSwap.MEDIA_URL,
      },
      {
        navText: 'Apply For IDO',
        navRoute: MojitoSwap.MEDIA_URL,
      },
      {
        navText: 'Token Listing',
        navRoute: MojitoSwap.MEDIA_URL,
      },
    ],
  },
  {
    title: 'About',
    children: [
      {
        navText: 'CoinMarketCap',
        navRoute: MojitoSwap.DOCS_URL,
      },
      {
        navText: 'CoinGecko',
        navRoute: MojitoSwap.GITHUB_URL,
      },
      {
        navText: 'Defillama',
        navRoute: MojitoSwap.GITHUB_URL,
      },
    ],
  },
  {
    title: 'Help',
    children: [
      {
        navText: 'Docs',
        navRoute: MojitoSwap.TELEGRAM,
      },
      {
        navText: 'Github',
        navRoute: MojitoSwap.TWITTER,
      },
      {
        navText: 'Bug Bounty',
        navRoute: MojitoSwap.DISCORD_URL,
      },
      {
        navText: 'Contact Support',
        navRoute: MojitoSwap.DISCORD_URL,
      },
    ],
  },
]
