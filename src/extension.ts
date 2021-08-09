// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { DateUtils } from './utils/utils';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "elif" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('elif.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from ELIF!');
	});

	context.subscriptions.push(disposable);

	// change between dark/light theme based on time  
	let changeTheme = vscode.commands.registerCommand('elif.changeTheme', () => {
		let nightTheme: string = vscode.workspace.getConfiguration('nightlight').get('nightTheme') || "Default Dark+";
		let nightIconTheme: string = vscode.workspace.getConfiguration('nightlight').get('nightIconTheme') || vscode.workspace.getConfiguration('workbench').get('iconTheme') || "vs-minimal";
		let lightTheme: string = vscode.workspace.getConfiguration('nightlight').get('dayTheme') || "Default Light+";
		let lightIconTheme: string = vscode.workspace.getConfiguration('nightlight').get('dayIconTheme') || vscode.workspace.getConfiguration('workbench').get('iconTheme') || "vs-minimal";

		/**
		 * Enable a given icon theme 
		 * @param iconTheme 
		 */
		function enableIconTheme(iconTheme: string) {
			const userConfig = vscode.workspace.getConfiguration();
			userConfig.update("workbench.iconTheme", iconTheme, vscode.ConfigurationTarget.Global);
		}

		/**
		 * Enable given theme 
		 * @param theme 
		 */
		function enableTheme(theme: string) {
			const userConfig = vscode.workspace.getConfiguration();
			userConfig.update("workbench.colorTheme", theme, vscode.ConfigurationTarget.Global);
		}

		/**
		 * Enable light theme set on the configurations 
		 */
		function enableLightTheme() {
			enableIconTheme(lightIconTheme);
			enableTheme(lightTheme);
		}

		/**
		 * Enable dark theme set on the configurations 
		 */
		function enableDarkTheme() {
			enableIconTheme(nightIconTheme);
			enableTheme(nightTheme);
		}

		/**
		 * Change theme based on time of the day 
		 */
		function changeTheme() {
			// const userConfig = vscode.workspace.getConfiguration();
			// const currentTheme = userConfig.get("workbench.colorTheme") as string;
			vscode.window.showInformationMessage("DayTime = " + DateUtils.isDayTime());

			if (DateUtils.isDayTime()) {
				enableLightTheme();
			}
			else {
				enableDarkTheme();
			}
		}
		changeTheme();
		setInterval(changeTheme, 60 * 1000);
	});

	context.subscriptions.push(changeTheme);
}

// this method is called when your extension is deactivated
export function deactivate() { }





