const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const print = require('./print');

/* eslint-disable no-console */

// Prep command executor
const exec = (command) => {
  return execSync(command, { stdio: 'inherit' });
};

// Helper that copies files
const copyTo = (path, dest) => {
  const body = fs.readFileSync(path, 'utf-8');
  fs.writeFileSync(dest, body, 'utf-8');
};

const currDir = process.env.PWD;

print.title('Initializing DCE ESLint Standards');

console.log('\nThis\'ll just take a moment.\n');

print.subtitle('Installing dependencies...');
exec('npm install --save-dev eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react');

print.subtitle('Adding .eslintrc.json file');
copyTo(
  path.join(__dirname, '.eslintrc.json'),
  path.join(currDir, '.eslintrc.json')
);
console.log('File created!');

console.log('\n');

print.title('Done!');

console.log('\nMake sure your code editor is set up to enforce ESLint rules.');
