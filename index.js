const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const startPromptSync = require('prompt-sync');

const print = require('./print');

/* eslint-disable no-console */

// Prep command executor
const exec = (command) => {
  return execSync(command, { stdio: 'inherit' });
};

// Initialize prompt
const prompt = startPromptSync();

// Helper that copies files
const copyTo = (path, dest) => {
  const body = fs.readFileSync(path, 'utf-8');
  fs.writeFileSync(dest, body, 'utf-8');
};

const currDir = process.env.PWD;

print.title('Initializing DCE ESLint Standards');

// Ask user to confirm
console.log('\nWe are about to install dependencies and add/overwrite .eslintrc.js');
console.log('');
print.subtitle('enter to confirm, ctrl + c to quit');
if (prompt() === null) {
  process.exit(0);
}

console.log('\nThis\'ll just take a moment.\n');

print.subtitle('Installing dependencies...');
exec('npx install-peerdeps --save-dev eslint-config-airbnb');
exec('npm i --save-dev eslint-config-airbnb-typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser');

print.subtitle('Adding .eslintrc.js file');
copyTo(
  path.join(__dirname, '.eslintrc.js'),
  path.join(currDir, '.eslintrc.js')
);
console.log('File created!');

console.log('\n');

print.title('Done!');

console.log('\nMake sure your code editor is set up to enforce ESLint rules.');
