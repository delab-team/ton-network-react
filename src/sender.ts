/* eslint-disable max-len */
import { SendTransactionRequest, TonConnectUI } from '@tonconnect/ui'
import { Address, Cell, SendMode, beginCell, storeStateInit } from 'ton-core'
import { Maybe } from 'ton-core/dist/utils/maybe'

export type SenderArguments = {
    value: bigint;
    to: Address;
    sendMode?: Maybe<SendMode>;
    bounce?: Maybe<boolean>;
    init?: Maybe<{
        code?: Maybe<Cell>;
        data?: Maybe<Cell>;
    }>;
    body?: Maybe<Cell>;
}
export interface Sender {
    readonly address?: Address;
    send(args: SenderArguments): Promise<void>;
}

export class SenderTonConnect implements Sender {
    public static address: Address | undefined = undefined

    private _wallet: TonConnectUI

    constructor (wallet: TonConnectUI) {
        this._wallet = wallet
    }

    public async send (args: SenderArguments): Promise<void> {
        const initString = args.init ? beginCell().storeWritable(storeStateInit(args.init)).endCell().toBoc()
            .toString('base64') : undefined

        const payload = args.body ? args.body.toBoc().toString('base64') : undefined

        const tx: SendTransactionRequest = {
            validUntil: Date.now() + 1000000,
            messages: [
                {
                    address: Address.parseFriendly(args.to.toString()).address.toString(),
                    amount: args.value.toString(),
                    stateInit: initString,
                    payload
                }
            ]
        }

        try {
            const res = await this._wallet.sendTransaction(tx)
            console.log('tx', res)

            if (res) {
                console.log('ok', res)
            } else {
                console.error('error not tr')
            }
        } catch (error) {
            console.error('claimMulti', error)
        }
    }
}
