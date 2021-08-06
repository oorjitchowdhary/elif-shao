import * as vscode from "vscode";
import { Utils } from "../utils";
import { auth } from "./auth";
import { createRepoIssue, getIssueComments } from "./issues";

// Github Auth
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

Utils.context.subscriptions.push(githubAuthCommand);

let createGitHubIssueCommand = vscode.commands.registerCommand('elif.createGitHubIssue', async () => {
    if (!Utils.isGitHubLoggedIn()) {
        vscode.window.showInformationMessage('You are not logged in with GitHub!');
        vscode.commands.executeCommand('elif.githubAuth');
    } else {
        createRepoIssue();
    }
});

Utils.context.subscriptions.push(createGitHubIssueCommand);

let githubIssueCommentsCommand = vscode.commands.registerCommand('githubIssueComments', async () => {
    if (!Utils.isGitHubLoggedIn()) {
        vscode.window.showInformationMessage('You are not logged in with GitHub!');
        vscode.commands.executeCommand('elif.githubAuth');
    } else {
        const intervalTime = await vscode.window.showInputBox({
            placeHolder: "Enter the interval time in seconds",
            prompt: "Notifications interval time",
            ignoreFocusOut: true
        });

        setInterval(async () => {
            await getIssueComments();
        }, parseInt(intervalTime || ''));
    }
});

Utils.context.subscriptions.push(githubIssueCommentsCommand);