import tokens from './tokens'
import { FarmConfig } from './types'

const devFarms: FarmConfig[] = [
  {
    pid: 1,
    lpSymbol: 'USDT/KCS LP',
    lpAddresses: {
      322: '0x4047C095D63397Dfc44C9183C2cE01B38ae3c72A',
      // 322: '0x4047c095d63397dfc44c9183c2ce01b38ae3c72a',
      321: '0xB3b92d6b2656f9cEb4A381718361A21BF9B82BD9',
    },
    token: tokens.usdt,
    quoteToken: tokens.wkcs,
  },
  {
    pid: 2,
    lpSymbol: 'MJT/KCS LP',
    lpAddresses: {
      322: '0x99Ae42cADE7116cE3d08515977F643534687Eb12',
      321: '0x99Ae42cADE7116cE3d08515977F643534687Eb12',
    },
    token: tokens.mjt,
    quoteToken: tokens.wkcs,
  },
  {
    pid: 4,
    lpSymbol: 'ETH/KCS LP',
    lpAddresses: {
      322: '0x7c80A5F68F3cc8CeA2014510F093f8EB8c577Acb',
      321: '0x99Ae42cADE7116cE3d08515977F643534687Eb12',
    },
    token: tokens.eth,
    quoteToken: tokens.wkcs,
  },
  {
    pid: 5,
    lpSymbol: 'MJT/USDC LP',
    lpAddresses: {
      322: '0x7Eb6b41f5cDd45b6a03DC3cdBA0666a6D37660Ac',
      321: '0x99Ae42cADE7116cE3d08515977F643534687Eb12',
    },
    token: tokens.mjt,
    quoteToken: tokens.usdc,
  },
  {
    pid: 6,
    lpSymbol: 'KCS/USDC LP',
    lpAddresses: {
      322: '0xb349a3429E30C0Cf2C01BCeba9CF05FC5101Ef0f',
      321: '0x99Ae42cADE7116cE3d08515977F643534687Eb12',
    },
    token: tokens.wkcs,
    quoteToken: tokens.usdc,
  },
  {
    pid: 7,
    lpSymbol: 'USDT/USDC LP',
    lpAddresses: {
      322: '0x8726ce53B4850E5154e0dDAF8e80EE97A61f0400',
      321: '0x99Ae42cADE7116cE3d08515977F643534687Eb12',
    },
    token: tokens.usdt,
    quoteToken: tokens.usdc,
  },
  {
    pid: 8,
    lpSymbol: 'BTCK/KCS LP',
    lpAddresses: {
      322: '0xE0e3e9871F7dCf5166b108cB7193E41E4f03fa32',
      321: '0x67990BFEeB3c3537FC67C23f294312155D764b20',
    },
    token: tokens.btck,
    quoteToken: tokens.wkcs,
  },
  {
    pid: 9,
    lpSymbol: 'SWAP/USDT LP',
    lpAddresses: {
      322: '0x4A880121604db56e64985314c5B45A5FE0717651',
      321: '0x4A880121604db56e64985314c5B45A5FE0717651',
    },
    token: tokens.swap,
    quoteToken: tokens.usdt,
  },
]

const proFarms: FarmConfig[] = [
  {
    pid: 1,
    lpSymbol: 'MJT/KCS LP',
    lpAddresses: {
      322: '0x4047C095D63397Dfc44C9183C2cE01B38ae3c72A',
      321: '0xa0d7C8aA789362CDf4FAAE24b9D1528eD5a3777f',
    },
    token: tokens.mjt,
    quoteToken: tokens.wkcs,
  },
  {
    pid: 2,
    lpSymbol: 'MJT/USDT LP',
    lpAddresses: {
      322: '0x99Ae42cADE7116cE3d08515977F643534687Eb12',
      321: '0xdd170Beed47e550190cD80C1Bb57F4CD369bD3C1',
    },
    token: tokens.mjt,
    quoteToken: tokens.usdt,
  },
  {
    pid: 3,
    lpSymbol: 'KCS/USDT LP',
    lpAddresses: {
      322: '0x7c80A5F68F3cc8CeA2014510F093f8EB8c577Acb',
      321: '0xB3b92d6b2656f9cEb4A381718361A21BF9B82BD9',
    },
    token: tokens.usdt,
    quoteToken: tokens.wkcs,
  },
  {
    pid: 4,
    lpSymbol: 'MJT/USDC LP',
    lpAddresses: {
      322: '0x7Eb6b41f5cDd45b6a03DC3cdBA0666a6D37660Ac',
      321: '0xA232918Ca4064667F9230Eb30Cd593c7c03959d7',
    },
    token: tokens.mjt,
    quoteToken: tokens.usdc,
  },
  {
    pid: 5,
    lpSymbol: 'KCS/USDC LP',
    lpAddresses: {
      322: '0xb349a3429E30C0Cf2C01BCeba9CF05FC5101Ef0f',
      321: '0x94bD136053aACcE8BC80EaAADfC7Bd1b1F5C51B3',
    },
    token: tokens.wkcs,
    quoteToken: tokens.usdc,
  },
  {
    pid: 6,
    lpSymbol: 'USDT/USDC LP',
    lpAddresses: {
      322: '0x8726ce53B4850E5154e0dDAF8e80EE97A61f0400',
      321: '0xeb06057E2405c8819e2cfFEA5Dea07A54ad569e3',
    },
    token: tokens.usdt,
    quoteToken: tokens.usdc,
  },
  {
    pid: 7,
    lpSymbol: 'ETH/KCS LP',
    lpAddresses: {
      322: '0x7c80A5F68F3cc8CeA2014510F093f8EB8c577Acb',
      321: '0x1F1EC5bcb2cB2a892D34A85d3eCb4C7e167Ff630',
    },
    token: tokens.eth,
    quoteToken: tokens.wkcs,
  },
  {
    pid: 8,
    lpSymbol: 'BTCK/KCS LP',
    lpAddresses: {
      322: '0xE0e3e9871F7dCf5166b108cB7193E41E4f03fa32',
      321: '0x67990BFEeB3c3537FC67C23f294312155D764b20',
    },
    token: tokens.btck,
    quoteToken: tokens.wkcs,
  },
  {
    pid: 9,
    lpSymbol: 'SFI/MJT LP',
    lpAddresses: {
      322: '',
      321: '0x139d08Da5CBbA1193468511054Eed930D395757F',
    },
    token: tokens.sfi,
    quoteToken: tokens.mjt,
  },
  {
    pid: 10,
    lpSymbol: 'COOHA/USDT LP',
    lpAddresses: {
      322: '',
      321: '0x6CB7A7E6f02dd23dFb4c226210A3184e288e0F3e',
    },
    token: tokens.cooha,
    quoteToken: tokens.usdt,
  },
  {
    pid: 11,
    lpSymbol: 'COOHA/MJT LP',
    lpAddresses: {
      322: '',
      321: '0xCb35f88DcA80Db74Eae5999F77A5a63739E611a8',
    },
    token: tokens.cooha,
    quoteToken: tokens.mjt,
    dual: {
      endBlock: 10000000000,
      earnLabel: 'MJT',
      rewardPerBlock: 0,
      showTips: true,
      leftTip: 'Adjust to 0.5x',
      rightTip: '2022-03-18 18:00' // must be type of dayjs constructor function
    }
  },
  {
    pid: 12,
    lpSymbol: 'KCS/SAND LP',
    lpAddresses: {
      322: '',
      321: '0x5A32b4dffA00e3cee3Fa77Ef467F35B4653ae615',
    },
    token: tokens.wkcs,
    quoteToken: tokens.sand,
    // dual: {
    //   endBlock: 10000000000,
    //   earnLabel: 'MJT',
    //   rewardPerBlock: 0,
    //   showTips: true,
    //   leftTip: 'Adjust to 0.5x',
    //   rightTip: '2022-03-18 18:00' // must be type of dayjs constructor function
    // },
  },
]

const mainnetEnvName = ['production-mainnet', 'preview']

const isMainnet = mainnetEnvName.includes(process.env.REACT_APP_ENV_NAME ?? '')

export default isMainnet ? proFarms : devFarms
