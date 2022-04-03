import { createAction } from '@reduxjs/toolkit'

export type PopupContent =
  | {
    txn: {
      hash: string
      success: boolean
      summary?: string
    }
  }
  | {
    listUpdate: {
      listUrl: string
      auto: boolean
    }
  }

export const updateBlockNumber = createAction<{ chainId: number; blockNumber: number }>('app/updateBlockNumber')
export const toggleWalletModal = createAction<void>('app/toggleWalletModal')
export const toggleSettingsMenu = createAction<void>('app/toggleSettingsMenu')
export const addPopup =
  createAction<{ key?: string; removeAfterMs?: number | null; content: PopupContent }>('app/addPopup')
export const removePopup = createAction<{ key: string }>('app/removePopup')

export const updateAirdropLoading = createAction<{ loading: boolean }>('app/updateAirdropLoading')
export const toggleEnableMaxHops = createAction<boolean>('app/toggleEnableMaxHops')
