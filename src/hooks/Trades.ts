import { Currency, CurrencyAmount, Pair, Token, Trade } from 'mojitoswap-sdk'
import { useMemo } from 'react'

import { BASES_TO_CHECK_TRADES_AGAINST, CUSTOM_BASES } from '../constants'
import { useEnableMaxHops } from '../state/application/hooks'


