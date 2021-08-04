"use strict";
import * as vscode from "vscode";
const sherlock = require("sherlockjs");
import * as datefns from "date-fns";
  
export function activate(context: vscode.ExtensionContext) {
  let reminder = vscode.commands.registerCommand("elif.remind", () => {
    
    // setting a placeholder
    var placeholderTask: string = "Example: Attend a meeting in 30 mins";
    
    vscode.window
      .showInputBox({
        ignoreFocusOut: true,
        placeHolder: `${placeholderTask}`,
        prompt: `Set a reminder!`,
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

        // set timer for the reminder
        var timer = setInterval(function () {
          vscode.window
            .showInformationMessage(`⏰  '${event.eventTitle}' is now!`)
            .then(() => {
              clearTimeout(timer);
            });
        }, timePeriod);
        
      });
  });
  context.subscriptions.push(reminder);
}