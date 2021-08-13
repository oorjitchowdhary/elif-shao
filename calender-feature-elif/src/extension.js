"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const HelloWorldPanel_1 = require("./HelloWorldPanel");
const SidebarProvider_1 = require("./SidebarProvider");
function activate(context) {
    console.log('Congratulations, your extension "elif" is now active!');
    const sidebarProvider = new SidebarProvider_1.SidebarProvider(context.extensionUri);
    context.subscriptions.push(vscode.window.registerWebviewViewProvider("elif-sidebar", sidebarProvider));
    context.subscriptions.push(vscode.commands.registerCommand("elif.helloWorld", () => {
        HelloWorldPanel_1.HelloWorldPanel.createOrShow(context.extensionUri);
    }));
    context.subscriptions.push(vscode.commands.registerCommand("elif.refresh", () => __awaiter(this, void 0, void 0, function* () {
        yield vscode.commands.executeCommand("workbench.action.closeSidebar");
        yield vscode.commands.executeCommand("workbench.view.extension.elif-sidebar-view");
        HelloWorldPanel_1.HelloWorldPanel.kill();
        HelloWorldPanel_1.HelloWorldPanel.createOrShow(context.extensionUri);
        setTimeout(() => {
            vscode.commands.executeCommand("workbench.action.webview.openDeveloperTools");
        }, 500);
    })));
    context.subscriptions.push(vscode.commands.registerCommand("elif.askQuestion", () => __awaiter(this, void 0, void 0, function* () {
        let answer = yield vscode.window.showInformationMessage("How are you today?", "good", "bad");
        if (answer === "bad") {
            vscode.window.showInformationMessage("Sorry to hear that");
        }
        else {
            console.log({ answer });
        }
    })));
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map