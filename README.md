<h1 align="center">ton-network-provider</h1>

<p align="center">
  <a href="LICENSE">
    <img src="https://camo.githubusercontent.com/75c3e724ce69f6c3d1e997e9066547e00cb9000aaf566eadc8a52ab76c7d07f8/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f6c6963656e73652f64656c61622d7465616d2f636f6e6e6563743f7374796c653d666f722d7468652d6261646765" alt="license mit" />
  </a>
  <a href="TYPESCRIPT">
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="typescript" />
  </a>
  <a href="NPM">
    <img src="https://img.shields.io/npm/v/@delab-team/ton-network-react" height="28px" />
  </a>
</p>

<p align="center">The @delab-team/ton-network-provider library is a powerful tool designed to streamline the process of interacting with the TON (Telegram Open Network) blockchain's smart contracts on the frontend of your web applications.</p>

## Install
```jsx
yarn add @delab-team/ton-network-provider
```

## Usage
```typescript
import { ProviderTonConnect } from '@delab-team/ton-network-provider'
import { useTonConnectUI } from '@tonconnect/ui-react'

const [tonConnectUI, setOptions] = useTonConnectUI()

const networkProvider = new ProviderTonConnect(wallet: TonConnectUI, isTestnet: boolean)
```