import * as vscode from 'vscode';
import { RankDevs } from './rankDevs';

export function activate(context: vscode.ExtensionContext) {
	console.log('RankDevs extension is now active!');

	const rankDevs = new RankDevs(context);

	// Track user typing by registering the change event in the active editor

	context.subscriptions.push(
		vscode.workspace.onDidChangeTextDocument((event) => rankDevs.trackTyping(event))
	)

	const disposable = vscode.commands.registerCommand('vscode-rankdevs.setApiKey', () => {
		
		vscode.window.showInputBox({
			prompt: 'Enter your Api Key : '
		}).then((apiKey) => {
			if (apiKey) rankDevs.setApiKey(apiKey);
		});
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {
	console.log('RankDevs extension is now deactivated!');
}