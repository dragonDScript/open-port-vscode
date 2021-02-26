const vscode = require('vscode');
const net = require('net');
/**
 * @param {number} port
 */
async function getWebviewContent(port) {
	const req = await window.fetch(`http://localhost:${port}`)
	return req.text()
}

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
			webview.webview.html = await getWebviewContent(port)
		})
	});

	context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
