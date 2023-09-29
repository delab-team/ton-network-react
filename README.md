# ton-network-provider

The library is needed to simplify the conclusion of smart contracts on the front end.

## Install
```
yarn add @delab-team/ton-network-provider
```


```typescript
import { ProviderTonConnect } from '@delab-team/ton-network-provider'
import { useTonConnectUI } from '@tonconnect/ui-react'

const [tonConnectUI, setOptions] = useTonConnectUI()

const networkProvider = new ProviderTonConnect(wallet: TonConnectUI, isTestnet: boolean)
```