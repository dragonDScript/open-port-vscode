const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let disposable = vscode.commands.registerCommand('open-a-port-in-vscode.open', function () {
		let options = {
			prompt: "Port: ",
			placeHolder: "3000"
		}
		
		let value = vscode.window.showInputBox(options)
		value.then(async function (port) {
			if (!port) return;
			let webview = vscode.window.createWebviewPanel("preview", port, vscode.ViewColumn.One)
			webview.webview.html = `
			<!DOCTYPE html>
			<html>
			<head>
			</head>
			<body>
				<iframe src="http://localhost:${port}" frameborder="0" style="width: 100vw; height: 100vh;"> 
			</body>
			</html>
			`
		})
	});

	context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
