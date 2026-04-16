const { spawn } = require("child_process");

const nextBin = require.resolve("next/dist/bin/next");
const args = ["dev", "--hostname", "127.0.0.1", ...process.argv.slice(2)];

const child = spawn(process.execPath, [nextBin, ...args], {
  cwd: process.cwd(),
  stdio: "inherit",
  env: process.env,
});

const shutdown = (signal) => {
  if (!child.killed) {
    child.kill(signal);
  }
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
