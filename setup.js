const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function run(cmd) {
  try {
    execSync(cmd, { stdio: 'inherit', cwd: __dirname });
    return true;
  } catch (e) {
    return false;
  }
}

function canRequire(mod) {
  try { require(mod); return true; } catch (e) { return false; }
}

console.log('\n📦 Checking dependencies...\n');

// 1. Install all packages if node_modules missing or core packages not found
const needsInstall =
  !fs.existsSync(path.join(__dirname, 'node_modules')) ||
  !canRequire('express') ||
  !canRequire('chalk') ||
  !canRequire('axios');

if (needsInstall) {
  console.log('🔄 Installing packages (this may take a minute)...');
  run('npm install --ignore-scripts --prefer-offline') || run('npm install --ignore-scripts');
  console.log('✅ Packages installed.\n');
} else {
  console.log('✅ Packages already present.\n');
}

// 2. Rebuild native modules (sqlite3 only — canvas requires Python/C++ and is optional)
const nativeModules = [
  { name: 'sqlite3', path: path.join(__dirname, 'node_modules/sqlite3') },
];

const toRebuild = nativeModules
  .filter(m => fs.existsSync(m.path) && !canRequire(m.name))
  .map(m => m.name);

if (toRebuild.length > 0) {
  console.log(`🔨 Rebuilding native modules: ${toRebuild.join(', ')}...`);
  run(`npm rebuild ${toRebuild.join(' ')}`);
  console.log('✅ Native modules rebuilt.\n');
} else {
  console.log('✅ Native modules OK.\n');
}

console.log('🚀 Starting bot...\n');
