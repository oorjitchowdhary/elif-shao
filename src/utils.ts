import * as vscode from "vscode";

export class Utils {
    static context: vscode.ExtensionContext;

    static isGitHubLoggedIn(): boolean {
        return !!this.context.globalState.get("githubAccessToken");
    }

    static getGitHubAccessToken(): string | undefined {
        return this.context.globalState.get("githubAccessToken");
    }
}