const fs = require("fs");
const { spawnSync } = require("child_process");

console.log('Deploying')
spawnSync("git", ["checkout","-b","deploy"], { cwd: "..", stdio: [process.stdin, process.stdout, process.stderr] })
spawnSync("git", ["add","frontend/deploy","--force"], { cwd: "..", stdio: [process.stdin, process.stdout, process.stderr] })
spawnSync("git", ["commit","-m","deploy"], { cwd: "..", stdio: [process.stdin, process.stdout, process.stderr] })
const subtree = spawnSync("git", ["subtree", "split", "--prefix=frontend/deploy"], { cwd: '..', stdio: 'pipe', encoding: 'utf-8' })
console.log(subtree.stdout?.toString(), subtree)
spawnSync("git", ["push", "deploy", "+" + subtree.stdout?.toString() + ":refs/heads/gh-pages", "--force"], { cwd: "..", stdio: [process.stdin, process.stdout, process.stderr] })
spawnSync("git", ["checkout","master"], { cwd: "..", stdio: [process.stdin, process.stdout, process.stderr] })
spawnSync("git", ["branch","-D","deploy"], { cwd: "..", stdio: [process.stdin, process.stdout, process.stderr] })

console.log('Done')
