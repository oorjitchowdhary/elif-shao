import * as vscode from 'vscode';
import { auth } from './github/auth';
import { createRepoIssue } from './github/issues';
import { Utils } from './utils';

// This method is called when the extension is run
export async function activate(context: vscode.ExtensionContext) {
	// Pass context to Utils for making it available everywhere
	Utils.context = context;

	console.log('Congratulations, your extension "elif" is now active!');

	let helloWorldCommand = vscode.commands.registerCommand('elif.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from ELIF!');
	});

	context.subscriptions.push(helloWorldCommand);

	let githubAuthCommand = vscode.commands.registerCommand('elif.githubAuth', async () => {
		if (Utils.isGitHubLoggedIn()) {
			vscode.window.showInformationMessage('You are already logged in with GitHub and good to go!');
		} else {
			const ghAuthChoice = await vscode.window.showInformationMessage("Would you like to connect to GitHub to receive notifications?", "Yes", "No");
			if (ghAuthChoice === "Yes") {
				auth();
			}
		}
	});

	context.subscriptions.push(githubAuthCommand);

	let githubIssuesCommand = vscode.commands.registerCommand('elif.createGitHubIssue', async () => {
		if (!Utils.isGitHubLoggedIn()) {
			vscode.window.showInformationMessage('You are not logged in with GitHub!');
		} else {
			createRepoIssue();
		}
	});

	context.subscriptions.push(githubIssuesCommand);
}

// This method is called when your extension is deactivated
export function deactivate() {}
