import * as vscode from "vscode";
import { Utils } from "../utils";
const axios = require("axios");

const createRepoIssue = async () => {
    vscode.window.showInformationMessage("Creating an issue on GitHub...");

    // Ask the user for issue details
    const issueTitle = await vscode.window.showInputBox({
        placeHolder: "Issue title",
        prompt: "Issue title",
        ignoreFocusOut: true
    });

    const issueBody = await vscode.window.showInputBox({
        placeHolder: "Describe your issue here",
        prompt: "Issue body",
        ignoreFocusOut: true
    });

    const githubRepo = await Utils.context.globalState.get("lastGitHubRepoChecked")
    ? await Utils.context.globalState.get("lastGitHubRepoChecked")
    : await vscode.window.showInputBox({
        placeHolder: "oorjitchowdhary/elif-shao",
        prompt: "GitHub repository location",
        ignoreFocusOut: true
    });

    // Confirmation dialogue
    const confirmIssue = await vscode.window.showInformationMessage(`Creating a new issue: ${issueTitle}.\n\nAre you sure you want to continue?`, 'Yes', 'No');
    if (confirmIssue === 'Yes') {
        // POST to GitHub Issues API
        await axios.post(`https://api.github.com/repos/${githubRepo}/issues`, {
            title: issueTitle,
            body: issueBody
        }, {
            headers: {
                "Authorization": `token ${Utils.getGitHubAccessToken()}`
            }
        }).then(async (data: { json: () => any; }) => {
            const response = await data.json();
            // Display the issue url to the user
            vscode.window.showInformationMessage(`Issue created: ${response.url}`);
        });
    }
};

const getIssueComments = async () => {
    vscode.window.showInformationMessage("Fetching issue comments...");
    const githubRepo = await Utils.context.globalState.get("lastGitHubRepoChecked")
    ? await Utils.context.globalState.get("lastGitHubRepoChecked")
    : await vscode.window.showInputBox({
        placeHolder: "oorjitchowdhary/elif-shao",
        prompt: "GitHub repository location",
        ignoreFocusOut: true
    });

    const issueNumber = await Utils.context.globalState.get("lastGitHubIssueNumber")
    ? await Utils.context.globalState.get("lastGitHubIssueNumber")
    : await vscode.window.showInputBox({
        placeHolder: "Issue number",
        prompt: "Issue number",
        ignoreFocusOut: true
    });

    await Utils.context.globalState.update("lastGitHubRepoChecked", githubRepo);
    await Utils.context.globalState.update("lastGitHubIssueNumber", issueNumber);

    const oldCommentCount: number = await Utils.context.globalState.get("lastGitHubIssueCommentsCount") || NaN;

    await axios.get(`https://api.github.com/repos/${githubRepo}/issues/${issueNumber}/comments`, {
        headers: {
            "Authorization": `token ${Utils.getGitHubAccessToken()}`
        }
    }).then(async (response: any) => {
        vscode.window.showInformationMessage(`${response.data.length} comments fetched.`);
        if (response.data.length === oldCommentCount) {
            vscode.window.showInformationMessage("No new comments for your issue.");
        } else {
            vscode.window.showInformationMessage(`You have ${response.data.length - oldCommentCount} new comments.`);
            await Utils.context.globalState.update("lastGitHubIssueCommentsCount", response.data.length);
            response.data.slice(-(response.data.length - oldCommentCount)).forEach((comment: { user: { login: any; }; body: any; }) => {
                vscode.window.showInformationMessage(`@${comment.user.login} - ${comment.body}`);
            });
        }
    }).catch((error: any) => console.log(error));
};

const createIssueComment = async () => {
    const issueComment = await vscode.window.showInputBox({
        placeHolder: "Issue comment",
        prompt: "Issue comment",
        ignoreFocusOut: true
    });

    const issueNumber = await Utils.context.globalState.get("lastGitHubIssueNumber")
    ? await Utils.context.globalState.get("lastGitHubIssueNumber")
    : await vscode.window.showInputBox({
        placeHolder: "Issue number",
        prompt: "Issue number",
        ignoreFocusOut: true
    });

    const githubRepo = await Utils.context.globalState.get("lastGitHubRepoChecked")
    ? await Utils.context.globalState.get("lastGitHubRepoChecked")
    : await vscode.window.showInputBox({
        placeHolder: "oorjitchowdhary/elif-shao",
        prompt: "GitHub repository location",
        ignoreFocusOut: true
    });

    const confirmComment = await vscode.window.showInformationMessage(`Creating a new comment: ${issueComment}.\n\nAre you sure you want to continue?`, 'Yes', 'No');
    if (confirmComment === 'Yes') {
        await axios.post(`https://api.github.com/repos/${githubRepo}/issues/${issueNumber}/comments`, {
            body: issueComment
        }, {
            headers: {
                "Authorization": `token ${Utils.getGitHubAccessToken()}`
            }
        }).then(async (data: { json: () => any; }) => {
            const response = await data.json();
            // Display the comment url to the user
            vscode.window.showInformationMessage(`Comment created: ${response.url}`);
        });
    }
};

export { createRepoIssue, getIssueComments, createIssueComment };