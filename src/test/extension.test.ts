import * as assert from 'assert';
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { detectLanguage, generateDockerfile } from '../extension';

suite('Extension Test Suite', () => {
    vscode.window.showInformationMessage('Start all tests.');

    test('Detect Language - Node.js', () => {
        const projectPath = path.join(__dirname, 'mockProjects', 'nodejs');
        const detectedLanguage = detectLanguage(projectPath);
        assert.strictEqual(detectedLanguage, 'Node.js');
    });

    test('Detect Language - Python', () => {
        const projectPath = path.join(__dirname, 'mockProjects', 'python');
        const detectedLanguage = detectLanguage(projectPath);
        assert.strictEqual(detectedLanguage, 'Python');
    });

    test('Detect Language - Java', () => {
        const projectPath = path.join(__dirname, 'mockProjects', 'java');
        const detectedLanguage = detectLanguage(projectPath);
        assert.strictEqual(detectedLanguage, 'Java');
    });

    test('Detect Language - PHP', () => {
        const projectPath = path.join(__dirname, 'mockProjects', 'php');
        const detectedLanguage = detectLanguage(projectPath);
        assert.strictEqual(detectedLanguage, 'PHP');
    });

    test('Generate Dockerfile - Node.js', () => {
        const dockerfileContent = generateDockerfile('Node.js');
        assert.notStrictEqual(dockerfileContent, null, 'Dockerfile content should not be null');
        if (dockerfileContent) {
            assert.ok(dockerfileContent.includes('FROM node:14'));
            assert.ok(dockerfileContent.includes('WORKDIR /usr/src/app'));
        }
    });

    test('Generate Dockerfile - Python', () => {
        const dockerfileContent = generateDockerfile('Python');
        assert.notStrictEqual(dockerfileContent, null, 'Dockerfile content should not be null');
        if (dockerfileContent) {
            assert.ok(dockerfileContent.includes('FROM python:3.8'));
            assert.ok(dockerfileContent.includes('WORKDIR /usr/src/app'));
        }
    });

    test('Generate Dockerfile - Java', () => {
        const dockerfileContent = generateDockerfile('Java');
        assert.notStrictEqual(dockerfileContent, null, 'Dockerfile content should not be null');
        if (dockerfileContent) {
            assert.ok(dockerfileContent.includes('FROM openjdk:11'));
            assert.ok(dockerfileContent.includes('WORKDIR /app'));
        }
    });

    test('Generate Dockerfile - PHP', () => {
        const dockerfileContent = generateDockerfile('PHP');
        assert.notStrictEqual(dockerfileContent, null, 'Dockerfile content should not be null');
        if (dockerfileContent) {
            assert.ok(dockerfileContent.includes('FROM php:7.4-apache'));
            assert.ok(dockerfileContent.includes('COPY . /var/www/html/'));
        }
    });
});
