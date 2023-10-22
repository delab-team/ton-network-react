/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import { TonConnectUI } from '@tonconnect/ui'
import { Address, Cell, Contract, ContractProvider, OpenedContract, SendMode, TonClient4 } from 'ton'
import { getHttpV4Endpoint } from '@orbs-network/ton-access'
import { SenderTonConnect } from './sender'
import { UIProviderTonConnect } from './UIcontract'

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

export interface NetworkProvider {
    network(): 'mainnet' | 'testnet';
    sender(): SenderTonConnect;
    api(): TonClient4;
    provider(address: Address, init?: {
        code?: Cell;
        data?: Cell;
    }): ContractProvider;
    isContractDeployed(address: Address): Promise<boolean>;
    waitForDeploy(address: Address, attempts?: number, sleepDuration?: number): Promise<void>;
    /**
     * @deprecated
     *
     * Use your Contract's `sendDeploy` method (or similar) together with `waitForDeploy` instead.
     */
    deploy(contract: Contract, value: bigint, body?: Cell, waitAttempts?: number): Promise<void>;
    open<T extends Contract>(contract: T): OpenedContract<T>;
    ui(): UIProviderTonConnect;
}

export class ProviderTonConnect implements NetworkProvider {
    private _wallet: TonConnectUI

    private _client: TonClient4

    private _network: 'mainnet' | 'testnet'

    private _endpoint: string

    constructor (wallet: TonConnectUI, isTestnet: boolean) {
        this._wallet = wallet

        this._client = new TonClient4({ endpoint: '' })

        this._network = isTestnet ? 'testnet' : 'mainnet'

        this._endpoint = ''
    }

    public async sunc (): Promise<void> {
        const endpoint = await getHttpV4Endpoint({ network: this._network })

        this._client = new TonClient4({ endpoint })

        this._endpoint = endpoint
    }

    public network (): 'mainnet' | 'testnet' {
        return this._network
    }

    public sender (): SenderTonConnect {
        return new SenderTonConnect(this._wallet)
    }

    public api (): TonClient4 {
        return new TonClient4({ endpoint: this._endpoint })
    }

    public provider (address: Address, init?: {
        code?: Cell;
        data?: Cell;
    }): ContractProvider {
        const initLocal: { code: Cell, data: Cell } | undefined = init && init.code && init.data ? { code: init.code as Cell, data: init.data as Cell } : undefined
        return this._client.provider(address, initLocal)
    }

    public isContractDeployed (address: Address): Promise<boolean> {
        return this._client.isContractDeployed(0, address)
    }

    public async waitForDeploy (address: Address, attempts?: number, sleepDuration?: number): Promise<void> {
        let wait = true
        const _sleepDuration = sleepDuration ?? 1000
        const _attempts = attempts ?? 60
        const _countInteration = _attempts
        let i = 0
        while (wait) {
            i++
            await sleep(_sleepDuration)

            const isDeploy = await this._client.isContractDeployed(0, address)
            if (isDeploy) {
                wait = false
            }

            if (_countInteration === i) {
                wait = false
            }
        }
    }

    public async deploy (contract: Contract, value: bigint, body?: Cell, waitAttempts?: number): Promise<void> {
        const sender = this.sender()

        await sender.send({
            value,
            to: contract.address,
            body,
            init: contract.init,
            sendMode: SendMode.PAY_GAS_SEPARATELY
        })

        await this.waitForDeploy(contract.address, waitAttempts ?? 1)
    }

    public open <T extends Contract> (contract: T): OpenedContract<T>  {
        return this._client.open(contract)
    }

    public ui (): UIProviderTonConnect {
        return new UIProviderTonConnect()
    }
}
