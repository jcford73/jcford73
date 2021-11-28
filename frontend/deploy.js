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
const ngBuildResult = spawnSync("npx", ["ng", "build"], { cwd: "./angular", stdio: [process.stdin, process.stdout, process.stderr] });
console.log('Moving Angular')
fs.renameSync("./angular/dist/portfolio-frontend", "./deploy/angular");

console.log('Deploying')
spawnSync("git", ["checkout","-b","deploy"], { cwd: "..", stdio: [process.stdin, process.stdout, process.stderr] })
spawnSync("git", ["add","frontend/deploy","--force"], { cwd: "..", stdio: [process.stdin, process.stdout, process.stderr] })
spawnSync("git", ["commit","-m","deploy"], { cwd: "..", stdio: [process.stdin, process.stdout, process.stderr] })
const subtree = spawnSync("git", ["subtree", "split", "--prefix=frontend/deploy"], { cwd: '..' })
spawnSync("git", ["push", "deploy", "+" + subtree.stdout?.toString() + ":gh-pages", "--force"], { cwd: "..", stdio: [process.stdin, process.stdout, process.stderr] })
spawnSync("git", ["checkout","master"], { cwd: "..", stdio: [process.stdin, process.stdout, process.stderr] })
spawnSync("git", ["branch","-D","deploy"], { cwd: "..", stdio: [process.stdin, process.stdout, process.stderr] })

console.log('Done')
