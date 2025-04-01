import { execSync } from "node:child_process";

export default function unzip(input: string, output: string) {
	const process = execSync(`tar -xvf ${input}`, {
		stdio: "inherit",
		cwd: output,
	});
}
