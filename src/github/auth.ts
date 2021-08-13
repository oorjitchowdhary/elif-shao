import * as vscode from "vscode";
import { Utils } from "../utils";
const app = require('polka')();
app.listen(12635);

export const auth = () => {
    // Initiate GitHub OAuth
    vscode.commands.executeCommand("vscode.open", vscode.Uri.parse("https://elif-shao-api.herokuapp.com/auth/github"));

    // Listen for GitHub OAuth token
    app.get("/auth/github/token/:token", async (req: any, res: any) => {
        const accessToken = req.params.token;
        if (!accessToken) {
            res.send("Server: something went wrong.");
            (app as any).server.close();
            return; 
        }
        
        // Store access token locally
        await Utils.context.globalState.update("githubAccessToken", accessToken);
        res.end("Server: GitHub authentication successful. You may close this tab now.");
        (app as any).server.close();
        vscode.window.showInformationMessage("GitHub authentication successful! You're ready to receive notifications.");
    });
};