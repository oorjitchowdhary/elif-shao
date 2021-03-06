import * as vscode from "vscode";
import { Utils } from "../utils";
import { auth } from "./auth";
import { createIssueComment, createRepoIssue, getIssueComments } from "./issues";

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

// Create a new GitHub issue
let createGitHubIssueCommand = vscode.commands.registerCommand('elif.createGitHubIssue', async () => {
    if (!Utils.isGitHubLoggedIn()) {
        vscode.window.showInformationMessage('You are not logged in with GitHub!');
        vscode.commands.executeCommand('elif.githubAuth');
    } else {
        createRepoIssue();
    }
});

Utils.context.subscriptions.push(createGitHubIssueCommand);

// Get comments for a GitHub issue
let githubIssueCommentsCommand = vscode.commands.registerCommand('elif.githubIssueComments', async () => {
    if (!Utils.isGitHubLoggedIn()) {
        vscode.window.showInformationMessage('You are not logged in with GitHub!');
        vscode.commands.executeCommand('elif.githubAuth');
    } else {
        const intervalTime = await vscode.window.showInputBox({
            placeHolder: "Enter the interval time in minutes",
            prompt: "Notifications interval time",
            ignoreFocusOut: true
        });

        // Store refresh interval time
        await Utils.context.globalState.update("commentsRefreshInterval", intervalTime);

        vscode.window.showInformationMessage('Issue notifications refresh interval time set to ' + intervalTime + ` ${parseInt(intervalTime || '') === 1 ? 'minute' : 'minutes'}.`);

        setInterval(async () => {
            await getIssueComments();
        }, parseInt(intervalTime || '') * 60000);
    }
});

Utils.context.subscriptions.push(githubIssueCommentsCommand);

// Create a issue comment
let createIssueCommentCommand = vscode.commands.registerCommand('elif.createIssueComment', async () => {
    if (!Utils.isGitHubLoggedIn()) {
        vscode.window.showInformationMessage('You are not logged in with GitHub!');
        vscode.commands.executeCommand('elif.githubAuth');
    } else {
        await createIssueComment();
    }
});

Utils.context.subscriptions.push(createIssueCommentCommand);