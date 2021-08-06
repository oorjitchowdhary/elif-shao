import * as vscode from "vscode";
import { Utils } from "../utils";
const axios = require("axios");

const createRepoIssue = async () => {
    vscode.window.showInformationMessage("Creating an issue on GitHub...");
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

    const githubRepo = await vscode.window.showInputBox({
        placeHolder: "oorjitchowdhary/elif-shao",
        prompt: "GitHub repository location",
        ignoreFocusOut: true
    });

    const confirmIssue = await vscode.window.showInformationMessage(`Creating a new issue: ${issueTitle}.\n\nAre you sure you want to continue?`, 'Yes', 'No');
    if (confirmIssue === 'Yes') {
        await axios.post(`https://api.github.com/repos/${githubRepo}/issues`, {
            title: issueTitle,
            body: issueBody
        }, {
            headers: {
                "Authorization": `token ${Utils.getGitHubAccessToken()}`
            }
        }).then(async (data: { json: () => any; }) => {
            const response = await data.json();
            vscode.window.showInformationMessage(`Issue created: ${response.url}`);
        });
    }
};

const getIssueComments = async () => {
    vscode.window.showInformationMessage("Fetching issue comments...");
    const githubRepo = await vscode.window.showInputBox({
        placeHolder: "oorjitchowdhary/elif-shao",
        prompt: "GitHub repository location",
        ignoreFocusOut: true
    });

    const issueNumber = await vscode.window.showInputBox({
        placeHolder: "Issue number",
        prompt: "Issue number",
        ignoreFocusOut: true
    });

    await Utils.context.globalState.update("lastGitHubRepoChecked", githubRepo);
    await Utils.context.globalState.update("lastGitHubIssueNumber", issueNumber);

    await axios.get(`https://api.github.com/repos/${githubRepo}/issues/${issueNumber}/comments`, {
        headers: {
            "Authorization": `token ${Utils.getGitHubAccessToken()}`
        }
    }).then(async (response: any) => {
        vscode.window.showInformationMessage(`${response.data.length} comments fetched.`);
        await Utils.context.globalState.update("lastGitHubIssueCommentsCount", response.data.length);
    }).catch((error: any) => console.log(error));
};

export { createRepoIssue, getIssueComments };