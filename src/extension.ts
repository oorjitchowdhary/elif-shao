import * as vscode from 'vscode';
import { DateUtils } from './utils/utils';
import { auth } from './github/auth';
import { createRepoIssue, getIssueComments } from './github/issues';
import { Utils } from './utils';
const sherlock = require("sherlockjs");
import * as datefns from "date-fns";

// This method is called when the extension is run
export async function activate(context: vscode.ExtensionContext) {
	// Pass context to Utils for making it available everywhere
	Utils.context = context;

	console.log('Congratulations, your extension "elif" is now active!');

	// Hello World Command
	let helloWorldCommand = vscode.commands.registerCommand('elif.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from ELIF!');
	});
	context.subscriptions.push(helloWorldCommand);

	// GitHub commands
	require('./github/index');

	// Reminder Command
	let reminder = vscode.commands.registerCommand("elif.remind", () => {
    
		// setting a placeholder
		var placeholderTask: string = "Example: Attend a meeting in 30 mins";
		 
		vscode.window
		  .showInputBox({
			ignoreFocusOut: true,
			placeHolder: `${placeholderTask}`,
			prompt: `Set a reminder! (Use "repeat" to repeat the reminder)`,
		  })
		  .then((reminder) => {
			if (!reminder) {
			  return;
			}
			
			// extracting the task, date and time from sherlockjs
			const event = sherlock.parse(reminder);
	
			// warning for invalid message
			if (!event.eventTitle || !event.startDate) {
			  vscode.window.showWarningMessage(
				"Sorry, couldn't understand. Please type in again."
			  );
			  return;
			}
			
			// get title and create reminder message
			let reminderMessage: string = ` ⏰  '${
			  event.eventTitle
			}' in ${datefns.formatDistanceToNow(event.startDate)}`;
			vscode.window.showInformationMessage(reminderMessage);
	
			// set time for reminder
			const timePeriod = datefns.differenceInMilliseconds(
			  event.startDate,
			  new Date()
			);

			let repeat = false;
			if (reminder.includes("repeat")) {
				console.log("repeat this reminder");
				repeat = true;
			}
	
			// set timer for the reminder
			if (repeat) {
				var timer = setInterval(function () {
					vscode.window
					  .showInformationMessage(`⏰  '${event.eventTitle}' is now!`);
				  }, timePeriod);
			}
			else {
				var timer = setInterval(function () {
					vscode.window
					  .showInformationMessage(`⏰  '${event.eventTitle}' is now!`)
					  .then(() => {
						clearTimeout(timer);
					  });
				  }, timePeriod);
			}
		  });
	  });

	context.subscriptions.push(disposable);

	// change between dark/light theme based on time  
	let changeTheme = vscode.commands.registerCommand('elif.changeTheme', () => {
		let nightTheme: string = vscode.workspace.getConfiguration().get('nightTheme') || "Default Dark+";
		let nightIconTheme: string = vscode.workspace.getConfiguration().get('nightIconTheme') || vscode.workspace.getConfiguration('workbench').get('iconTheme') || "vs-minimal";
		let lightTheme: string = vscode.workspace.getConfiguration().get('dayTheme') || "Default Light+";
		let lightIconTheme: string = vscode.workspace.getConfiguration().get('dayIconTheme') || vscode.workspace.getConfiguration('workbench').get('iconTheme') || "vs-minimal";

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
			// vscode.window.showInformationMessage("DayTime = " + DateUtils.isDayTime());

			if (DateUtils.isDayTime()) {
				vscode.window.showInformationMessage('Let me turn on the lights for you!');
				enableLightTheme();
			}
			else {
				vscode.window.showInformationMessage('I will turn the lights off for you!');
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
	  context.subscriptions.push(reminder);
}

// This method is called when your extension is deactivated
export function deactivate() {}
