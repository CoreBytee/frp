import { mkdirSync, renameSync, rmSync } from "node:fs";
import { join } from "node:path";
import {
	archiveArch,
	archiveOS,
	archiveType,
} from "./utilities/downloadConstants.js";
import downloadFile from "./utilities/downloadFile.js";
import unzip from "./utilities/unzip.js";

const GITHUB_BASE_URL = "https://github.com/";
const GITHUB_REPO = "fatedier/frp";
const GITHUB_VERSION = "0.61.2";
const GITHUB_BASE_FILE = `frp_${GITHUB_VERSION}_${archiveOS()}_${archiveArch()}`;
const GITHUB_FILE = `${GITHUB_BASE_FILE}.${archiveType()}`;

const DOWNLOAD_URL = `${GITHUB_BASE_URL}${GITHUB_REPO}/releases/download/v${GITHUB_VERSION}/${GITHUB_FILE}`;

const OUTPUT_DIRECTORY = join(import.meta.dirname, "../.binaries");
const OUTPUT_EXTRACTED_DIRECTORY = join(OUTPUT_DIRECTORY, GITHUB_BASE_FILE);
const OUTPUT_FILE = join(OUTPUT_DIRECTORY, GITHUB_FILE);

mkdirSync(OUTPUT_DIRECTORY, { recursive: true });
await downloadFile(DOWNLOAD_URL, OUTPUT_FILE);
unzip(OUTPUT_FILE, OUTPUT_DIRECTORY);

if (archiveType() === "zip") {
	renameSync(
		join(OUTPUT_EXTRACTED_DIRECTORY, "frpc.exe"),
		join(OUTPUT_DIRECTORY, "frpc.exe"),
	);

	renameSync(
		join(OUTPUT_EXTRACTED_DIRECTORY, "frps.exe"),
		join(OUTPUT_DIRECTORY, "frps.exe"),
	);
} else {
	renameSync(
		join(OUTPUT_EXTRACTED_DIRECTORY, "frpc"),
		join(OUTPUT_DIRECTORY, "frpc"),
	);

	renameSync(
		join(OUTPUT_EXTRACTED_DIRECTORY, "frps"),
		join(OUTPUT_DIRECTORY, "frps"),
	);
}

renameSync(
	join(OUTPUT_EXTRACTED_DIRECTORY, "LICENSE"),
	join(OUTPUT_DIRECTORY, "LICENSE"),
);

rmSync(OUTPUT_EXTRACTED_DIRECTORY, { recursive: true, force: false });

rmSync(OUTPUT_FILE, { recursive: true, force: false });
