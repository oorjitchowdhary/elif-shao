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

export { createRepoIssue };