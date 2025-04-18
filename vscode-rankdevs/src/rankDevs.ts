import * as vscode from "vscode";
import { sendTypingDataToBackend } from "./apiService";
import { StatsManager } from "./StatsManager";

//? test

export class RankDevs {
  private context: vscode.ExtensionContext;
  private typingStartTime: number | null = null;
  private typingStartLan: string = "";
  private typingTimer: NodeJS.Timeout | null = null; // Timer reference
  private isTyping: boolean = false;

  constructor(context: vscode.ExtensionContext) {
    this.context = context;
  }

  public setApiKey(apiKey: string): void {
    this.context.globalState.update("rankDevsApiKey", apiKey);
    vscode.window.showInformationMessage("API Key set successfully");
  }

  //? Store the first typed time of a frequent typed code inside typingStartTime within less than 10 seconds break
  public trackTyping(event: vscode.TextDocumentChangeEvent): void {
    const currentLanguage =
      vscode.window.activeTextEditor?.document.languageId || "unknown";

    if (!this.isTyping) {
      this.typingStartTime = Date.now();
      this.isTyping = true;
      this.typingStartLan = currentLanguage;
    }

    if (this.typingTimer) clearTimeout(this.typingTimer);
    if (currentLanguage !== this.typingStartLan) {
      this.stopTracking();
      return;
    }

    this.typingTimer = setTimeout(() => {
      const now = Date.now();
      if (now - this.typingStartTime! >= 10000) {
        this.stopTracking();
      }
    }, 10000);
  }

  private stopTracking(): void {
    if (!this.isTyping || !this.typingStartTime) return;

    const duration = Date.now() - this.typingStartTime;
    this.typingStartTime = null;
    this.isTyping = false;

    const manager = StatsManager.getInstance(this.context);
    const apiKey = this.context.globalState.get<string>("rankDevsApiKey");
    if (apiKey) {
      manager.addTypingData(this.typingStartLan, duration, apiKey); //? {'js',120}
    } else {
      console.error("API key is missing!");
    }
  }

  public callApiService(): void {
    console.log("Call Api Service called");

    const apiKey = this.context.globalState.get<string>("rankDevsApiKey");
    if (apiKey) {
      sendTypingDataToBackend(apiKey, this.context);
    } else {
      console.error("API key is missing!");
    }
  }
}
