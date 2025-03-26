import * as vscode from 'vscode';
import { RankDevs } from './rankDevs';

//? run as soon as user open vs code
export function activate(context: vscode.ExtensionContext) {
	console.log('RankDevs extension is now active!');

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
}

//? run as soon as user close vs code
export function deactivate() {
	console.log('RankDevs extension is now deactivated!');
}