import * as vscode from "vscode";
import { RankDevs } from "./rankDevs";
import { StatsManager } from "./StatsManager";

let globalContext: vscode.ExtensionContext;
let intervalIdForCleanup: NodeJS.Timeout;
let intervalIdForApiCall: NodeJS.Timeout;

//? run as soon as user open vs code
export async function activate(context: vscode.ExtensionContext) {
  console.log("Hi Tamal! RankDevs extension is now active!");
  globalContext = context;

  const rankDevs = new RankDevs(context);
  const manager = StatsManager.getInstance(context);
  await manager.init();

  console.log(globalContext.globalState.get("name"));

  //? Run whenever user change something in their codebase
  context.subscriptions.push(
    vscode.workspace.onDidChangeTextDocument((event) => {
      rankDevs.trackTyping(event);
    })
  );

  //? run when user first time install the app
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
      console.log("Yo! User setting api key");

      const apiKeyVal: string | undefined =
        context.globalState.get("rankDevsApiKey");

      vscode.window
        .showInputBox({
          prompt: "Enter your Api Key : ",
          value: apiKeyVal,
        })
        .then((apiKey) => {
          if (apiKey) rankDevs.setApiKey(apiKey);
        });
    }
  );

  //? to clear up the api Key
  const clearKeyCommand = vscode.commands.registerCommand(
    "vscode-rankdevs.clearApiKey",
    () => {
      context.globalState.update("rankDevsApiKey", undefined);
      vscode.window.showInformationMessage("API Key cleared");
    }
  );

  //? to clean up the register command
  context.subscriptions.push(disposable, clearKeyCommand);

  // **Interval-Based Cleanup for Daily/Weekly/Monthly Logs**
  intervalIdForCleanup = setInterval(() => {
    manager.intervalWiseCleanUp();
  }, 10 * 60 * 1000); // Run every 10 minutes

  // **Interval-Based test Cleanup**
  // intervalIdForCleanup = setInterval(() => {
  //   const manager = StatsManager.getInstance(globalContext);
  //   manager.testCleanUp();
  // }, 2000); // Run every 2 seconds

  // **Interval-Based api call**
  intervalIdForApiCall = setInterval(() => {
    rankDevs.callApiService();
  }, 20 * 1000); // Run every 20 seconds
}

//? run as soon as user close vs code
export function deactivate() {
  console.log("RankDevs got de-active ");
  globalContext.globalState.update("name", "Tamal");
  console.log(globalContext.globalState.get("name"));

  clearInterval(intervalIdForCleanup);
  clearInterval(intervalIdForApiCall);

  const manager = StatsManager.getInstance(globalContext);
  const rankDevs = new RankDevs(globalContext);

  rankDevs.callApiService();
  rankDevs.stopTracking();
  5;
  manager.cleanup();
  manager.intervalWiseCleanUp(); //? clean up before user gets out of the vs code
}
