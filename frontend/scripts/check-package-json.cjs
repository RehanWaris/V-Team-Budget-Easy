#!/usr/bin/env node
const { readFileSync, writeFileSync } = require('node:fs');
const { resolve, basename } = require('node:path');

const cwd = process.cwd();
const frontendDir = basename(cwd) === 'frontend' ? cwd : resolve(cwd, 'frontend');
const packagePath = resolve(frontendDir, 'package.json');
const templatePath = resolve(frontendDir, 'scripts', 'package.json.template');

function restorePackageJson(template) {
  writeFileSync(packagePath, template, 'utf8');
  console.log('✅ package.json has been restored from scripts/package.json.template.');
}

function main() {
  let raw;
  try {
    raw = readFileSync(packagePath, 'utf8');
  } catch (error) {
    console.error(`Unable to read ${packagePath}: ${error.message}`);
    process.exit(1);
  }

  try {
    JSON.parse(raw);
    console.log('✅ package.json is valid JSON.');
    if (process.argv.includes('--restore')) {
      console.log('package.json is already valid. No changes written.');
    }
    return;
  } catch (error) {
    console.error('❌ package.json is invalid JSON:', error.message);
    if (!process.argv.includes('--restore')) {
      console.log('Run again with --restore to overwrite the file with the committed template.');
      process.exit(1);
    }
  }

  let template;
  try {
    template = readFileSync(templatePath, 'utf8');
  } catch (error) {
    console.error(`Unable to read ${templatePath}: ${error.message}`);
    process.exit(1);
  }

  try {
    restorePackageJson(template);
  } catch (error) {
    console.error('Failed to restore package.json:', error.message);
    process.exit(1);
  }
}

main();
