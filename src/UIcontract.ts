/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { UIProvider } from "@ton/blueprint"

export class UIProviderTonConnect implements UIProvider {

    constructor () {
    }

    public write (message: string): void {
        window.alert(message)
    }

    public async prompt (message: string): Promise<boolean> {
        const data = window.confirm(message)
        return data
    }

    public async input (message: string): Promise<string> {
        const data = window.prompt(message)
        return data ?? ''
    }

    public async choose<T> (message: string, choices: T[], display: (v: T) => string): Promise<T> {
        window.alert('choose dont support')
        return choices[0]
    }

    public setActionPrompt (message: string): void {
        window.alert('setActionPrompt dont support')
    }

    public clearActionPrompt (): void {
        window.alert('clearActionPrompt dont support')
    }
}
