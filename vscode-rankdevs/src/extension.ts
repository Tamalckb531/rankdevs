import * as vscode from "vscode";
import { RankDevs } from "./rankDevs";
import { StatsManager } from "./StatsManager";
import { clearApiKeyBE } from "./apiService";

let globalContext: vscode.ExtensionContext;
let intervalIdForCleanup: NodeJS.Timeout;
let intervalIdForApiCall: NodeJS.Timeout;

//? run as soon as user open vs code
export function activate(context: vscode.ExtensionContext) {
  globalContext = context;

  const rankDevs = new RankDevs(context);
  const manager = StatsManager.getInstance(context);
  manager.init();
  manager.intervalWiseCleanUp(); //? initial clean-up while starting

  //? Run whenever user change something in their codebase
  context.subscriptions.push(
    vscode.workspace.onDidChangeTextDocument((event) => {
      rankDevs.trackTyping(event);
    })
  );

  //? run when user first time install the extension
  const existingKey: string | undefined =
    context.globalState.get("rankDevsApiKey");

  if (!existingKey) {
    vscode.window
      .showInputBox({
        prompt: "Enter your API Key: ",
        placeHolder: "abc#^$123",
      })
      .then((apiKey) => {
        if (apiKey) rankDevs.setApiKey(apiKey);
      });
  }

  //? run when user run the setApiKey command
  const disposable = vscode.commands.registerCommand(
    "vscode-rankdevs.setApiKey",
    () => {
      const apiKeyVal: string | undefined =
        context.globalState.get("rankDevsApiKey");

      vscode.window
        .showInputBox({
          prompt: "Enter your Api Key : ",
          value: apiKeyVal,
        })
        .then((apiKey) => {
          if (apiKey) rankDevs.setApiKey(apiKey, apiKeyVal);
        });
    }
  );

  //? to clear up the api Key
  const clearKeyCommand = vscode.commands.registerCommand(
    "vscode-rankdevs.clearApiKey",
    async () => {
      const isClear = await clearApiKeyBE(existingKey as string);
      if (isClear) {
        context.globalState.update("rankDevsApiKey", undefined);
      }
    }
  );

  //? to clean up the register command
  context.subscriptions.push(disposable, clearKeyCommand);

  // **Interval-Based Cleanup for Daily/Weekly/Monthly Logs**
  intervalIdForCleanup = setInterval(() => {
    manager.intervalWiseCleanUp();
  }, 2 * 60 * 1000); // Run every 2 minutes

  // **!Interval-Based test Cleanup -> DO NOT TOUCH**
  // intervalIdForCleanup = setInterval(() => {
  //   const manager = StatsManager.getInstance(globalContext);
  //   manager.testCleanUp();
  // }, 2000); // Run every 2 seconds
  // **!Interval-Based test Cleanup -> DO NOT TOUCH**

  // **Interval-Based api call**
  intervalIdForApiCall = setInterval(() => {
    rankDevs.callApiService();
  }, 2 * 60 * 1000); // Run every 2 minute
}

//? run as soon as user close vs code
export function deactivate() {
  clearInterval(intervalIdForCleanup);
  clearInterval(intervalIdForApiCall);
}
