/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-unused-vars */
export interface UIProvider {
    write(message: string): void;
    prompt(message: string): Promise<boolean>;
    input(message: string): Promise<string>;
    choose<T>(message: string, choices: T[], display: (v: T) => string): Promise<T>;
    setActionPrompt(message: string): void;
    clearActionPrompt(): void;
}

export class UIProviderTonConnect implements UIProvider {
    private _ui: Console

    constructor () {
        this._ui = console
    }

    public write (message: string): void {
        window.alert(message)
    }

    public async prompt (message: string): Promise<boolean> {
        const data = await window.confirm(message)
        return data
    }

    public async input (message: string): Promise<string> {
        const data = await window.prompt(message)
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
