const fs = require("fs");
const path = require("path");

const nextDir = path.join(process.cwd(), ".next");
const maxAttempts = 12;
const retryDelayMs = 150;

function sleep(durationMs) {
  return new Promise((resolve) => setTimeout(resolve, durationMs));
}

async function removeNextDirectory() {
  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    try {
      fs.rmSync(nextDir, {
        recursive: true,
        force: true,
        maxRetries: 0,
      });
      return;
    } catch (error) {
      if (!["ENOTEMPTY", "EBUSY", "EPERM"].includes(error.code) || attempt === maxAttempts - 1) {
        throw error;
      }

      await sleep(retryDelayMs);
    }
  }
}

removeNextDirectory().catch((error) => {
  console.error("[clean-next] Failed to remove .next:", error);
  process.exitCode = 1;
});
