const { spawn } = require("child_process");

const devProcess = spawn(
  "npm",
  [
    "run",
    "services:up",
    "&&",
    "npm",
    "run",
    "services:wait:database",
    "&&",
    "npm",
    "run",
    "migrations:up",
    "&&",
    "next",
    "dev",
  ],
  {
    stdio: "inherit",
    shell: true,
  },
);

devProcess.on("exit", (code) => {
  console.log("\nShutting down services...");

  const stop = spawn("npm", ["run", "services:stop"], {
    stdio: "inherit",
    shell: true,
  });

  stop.on("exit", () => process.exit(code));
});

process.on("SIGINT", () => {
  devProcess.kill("SIGINT");
});
