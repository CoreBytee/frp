import { spawn } from "node:child_process";
import { pEvent } from "p-event";

export default async function unzip(input: string, output: string) {
	const result = spawn("tar", ["-xvf", input], {
		stdio: "inherit",
		cwd: output,
		shell: true,
	});

	result.on("error", (error) => {
		console.error("Error during extraction:", error);
		process.exit(1);
	});

	await pEvent(result, "close");
}
