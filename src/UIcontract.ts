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
        this._ui.log('UIProvider write', message)
    }

    public async prompt (message: string): Promise<boolean> {
        this._ui.log('UIProvider prompt', message)
        return true
    }

    public async input (message: string): Promise<string> {
        this._ui.log('UIProvider input', message)
        return ''
    }

    public async choose<T> (message: string, choices: T[], display: (v: T) => string): Promise<T> {
        this._ui.log('UIProvider choose', message)
        return choices[0]
    }

    public setActionPrompt (message: string): void {
        this._ui.log('UIProvider setActionPrompt', message)
    }

    public clearActionPrompt (): void {
        this._ui.log('UIProvider clearActionPrompt', true)
    }
}
