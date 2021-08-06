// This script will be run within the webview itself
// It cannot access the main VS Code APIs directly.

(function () {
  const vscode = acquireVsCodeApi();

  const oldState = /** @type {{ count: number} | undefined} */ (
    vscode.getState()
  );

  const button = /** @type {HTMLElement} */ (document.getElementById("button"));
  button.innerText = "hello from javascript";
})();
