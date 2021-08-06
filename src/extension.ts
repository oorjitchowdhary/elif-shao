import * as vscode from 'vscode';
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

	  context.subscriptions.push(reminder);
}

// This method is called when your extension is deactivated
export function deactivate() {}
