# ton-network-provider

The library is needed to simplify the conclusion of smart contracts on the front end.

yarn add @delab-team/ton-network-provider


import { ProviderTonConnect } from '@delab-team/ton-network-provider'
import { TonConnectUI } from '@tonconnect/ui'

const networkProvider = new ProviderTonConnect(wallet: TonConnectUI, isTestnet: boolean)