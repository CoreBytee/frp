import { spawnSync } from "node:child_process";
import { platform } from "node:os";
import { join } from "node:path";

const isWindows = platform() === "win32";
const executable = `${join(import.meta.dir, "../../.binaries/frps")}${isWindows ? ".exe" : ""}`;
const args = process.argv.slice(2); // Pass all input arguments to the executable

spawnSync(executable, args, { stdio: "inherit" });
