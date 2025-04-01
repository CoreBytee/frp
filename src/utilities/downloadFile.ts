import { basename } from "node:path";
import ProcessBar from "./ProcessBar.js";
import { appendFileSync } from "node:fs";

export default async function downloadFile(url: string, output: string) {
	const base = basename(output);
	const response = await fetch(url);
	const contentLength = Number.parseInt(
		response.headers.get("content-length") as string,
	);
	const processBar = new ProcessBar(contentLength, `Downloading ${base}`);
	const reader = response.body?.getReader();

	if (!reader) throw new Error("Failed to get reader from response body");

	let received = 0;

	while (true) {
		const result = await reader.read();
		if (result.done) break;

		appendFileSync(output, Buffer.from(result.value), {
			encoding: "binary",
		});

		received += result.value.length;
		processBar.update(received);
	}

	processBar.finish();
}
