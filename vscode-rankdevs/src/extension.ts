import * as vscode from 'vscode';
import { RankDevs } from './rankDevs';
import { StatsManager } from './StatsManager';


let globalContext: vscode.ExtensionContext;
let intervalIdForCleanup: NodeJS.Timeout;
let intervalIdForApiCall: NodeJS.Timeout;

//? run as soon as user open vs code
export function activate(context: vscode.ExtensionContext) {
	console.log('RankDevs extension is now active!');
	globalContext = context;

	const rankDevs = new RankDevs(context);

	//? Run whenever user change something in their codebase
	context.subscriptions.push(
		vscode.workspace.onDidChangeTextDocument((event) => rankDevs.trackTyping(event))
	)

	//? run when user run the setApiKey command
	const disposable = vscode.commands.registerCommand('vscode-rankdevs.setApiKey', () => {
		
		vscode.window.showInputBox({
			prompt: 'Enter your Api Key : '
		}).then((apiKey) => {
			if (apiKey) rankDevs.setApiKey(apiKey);
		});
	});

	//? to clean up the register command
	context.subscriptions.push(disposable);

	// **Interval-Based Cleanup for Daily/Weekly/Monthly Logs**
    intervalIdForCleanup = setInterval(() => {
        const manager = StatsManager.getInstance(globalContext);
		manager.intervalWiseCleanUp();
	}, 10 * 60 * 1000); // Run every 10 minutes
	
	// **Interval-Based api call**
	intervalIdForApiCall = setInterval(() => {
		rankDevs.callApiService();
	}, 2 * 60 * 1000); // Run every 2 minutes

}

//? run as soon as user close vs code
export function deactivate() {
	clearInterval(intervalIdForCleanup);
	clearInterval(intervalIdForApiCall);
	const manager = StatsManager.getInstance(globalContext);
	manager.cleanup(globalContext)
}