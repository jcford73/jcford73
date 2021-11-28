const fs = require("fs");
const { spawnSync } = require("child_process");

console.log('Removing deploy directory.')
fs.rmSync("./deploy", { force: true, recursive: true });
fs.mkdirSync("./deploy");

console.log('Copying plain.*.')
fs.copyFileSync('./plain.html','./deploy/plain.html')
fs.copyFileSync('./plain.js','./deploy/plain.js')
fs.copyFileSync('./plain.css','./deploy/plain.css')

console.log('Building Angular')
const ngBuildResult = spawnSync("npx", ["ng", "build"], { cwd: "./angular" });
console.log('Moving Angular')
fs.renameSync("./angular/dist/portfolio-frontend", "./deploy/angular");
console.log('Done')
