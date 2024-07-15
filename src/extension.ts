import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.generateDockerfile', () => {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (workspaceFolders && workspaceFolders.length > 0) {
            const projectPath = workspaceFolders[0].uri.fsPath;
            const language = detectLanguage(projectPath);
            if (language) {
                const dockerfileContent = generateDockerfile(language);
                if (dockerfileContent) {
                    const dockerfilePath = path.join(projectPath, 'Dockerfile');
                    fs.writeFileSync(dockerfilePath, dockerfileContent);
                    vscode.window.showInformationMessage('Dockerfile created successfully!');
                } else {
                    vscode.window.showErrorMessage('Failed to generate Dockerfile.');
                }
            } else {
                vscode.window.showErrorMessage('Could not detect the project language.');
            }
        } else {
            vscode.window.showErrorMessage('No workspace folder found.');
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}

function detectLanguage(projectPath: string): string | null {
    const files = fs.readdirSync(projectPath);
    if (files.includes('package.json')) {
        return 'Node.js';
    } else if (files.includes('requirements.txt')) {
        return 'Python';
    } else {
        return null;
    }
}

function generateDockerfile(language: string): string | null {
    if (language === 'Node.js') {
        return generateNodejsDockerfile();
    } else if (language === 'Python') {
        return generatePythonDockerfile();
    } else {
        return null;
    }
}

function generateNodejsDockerfile(): string {
    return `
    FROM node:14
    WORKDIR /usr/src/app
    COPY package*.json ./
    RUN npm install
    COPY . .
    EXPOSE 8080
    CMD ["node", "app.js"]
    `;
}

function generatePythonDockerfile(): string {
    return `
    FROM python:3.8
    WORKDIR /usr/src/app
    COPY requirements.txt ./
    RUN pip install --no-cache-dir -r requirements.txt
    COPY . .
    EXPOSE 5000
    CMD ["python", "app.py"]
    `;
}
