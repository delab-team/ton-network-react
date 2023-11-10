/* eslint-disable max-len */
import { SendTransactionRequest, TonConnectUI } from '@tonconnect/ui'
import { Address, beginCell, Cell, Sender, SendMode, storeStateInit } from '@ton/core'
import { Maybe } from '@ton/core/dist/utils/maybe';

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
export class SenderTonConnect implements Sender {
    public address: Address | undefined = undefined

    private _wallet: TonConnectUI

    constructor (wallet: TonConnectUI) {
        this._wallet = wallet
        this.address = wallet.account ? Address.parse(wallet.account.address) : undefined
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
        } catch (error) {
            throw new Error(error + '')
        }
    }
}
