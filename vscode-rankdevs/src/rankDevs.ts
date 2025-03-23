import * as vscode from 'vscode';
import { sendTypingDataToBackend } from './apiService';

export class RankDevs{
    private context: vscode.ExtensionContext;
    private typingStartTime: number | null = null;
    private isTyping: boolean = false;

    constructor(context: vscode.ExtensionContext) {
        this.context = context;
    }

    public setApiKey(apiKey: string): void{
        this.context.globalState.update('rankDevsApiKey', apiKey);
        vscode.window.showInformationMessage("API Key set successfully");
    }

    public trackTyping(event: vscode.TextDocumentChangeEvent): void{
        if (!this.isTyping) {
            this.typingStartTime = Date.now();
            this.isTyping = true;
            console.log("Typing started!");
        }

        setTimeout(() => {
            const now = Date.now();
            if (now - this.typingStartTime! >= 10000) {
                this.stopTracking();
            }
        }, 10000);
    }

    private stopTracking(): void{
        if (!this.isTyping || !this.typingStartTime) return;

        const duration = Date.now() - this.typingStartTime;
        this.typingStartTime = null;
        this.isTyping = false;

        const language = vscode.window.activeTextEditor?.document.languageId || 'unknown';

        const apiKey = this.context.globalState.get<string>('rankDevsApiKey');
        if (apiKey) {
            sendTypingDataToBackend({apiKey, typingTime:duration, language});
        } else {
            console.error('API key is missing!');
        }
    }

}