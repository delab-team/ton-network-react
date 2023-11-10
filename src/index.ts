import { NetworkProvider, UIProvider } from '@ton/blueprint'
import { Sender } from '@ton/core'
import { ProviderTonConnect } from './provider'
import { SenderTonConnect, SenderArguments } from './sender'
import { UIProviderTonConnect } from './UIcontract'

export type { NetworkProvider, Sender, SenderArguments, UIProvider }
export { ProviderTonConnect, SenderTonConnect, UIProviderTonConnect }
