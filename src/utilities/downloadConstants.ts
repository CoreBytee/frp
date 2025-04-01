import os from "node:os";

const archMap = {
	x64: "amd64",
	arm64: "arm64",
	arm: "arm",
	loong64: "loong64",
	mips: "mips",
	mipsel: "mipsle",
	mips64: "mips64",
	mips64el: "mips64le",
	riscv64: "riscv64",
};

const osMap = {
	Windows_NT: "windows",
	Linux: "linux",
	Darwin: "darwin",
};

export function archiveArch() {
	const arch = os.arch();

	if (arch in archMap) {
		return archMap[arch as keyof typeof archMap];
	}
}

export function archiveOS() {
	const type = os.type();
	if (type in osMap) {
		return osMap[type as keyof typeof osMap];
	}
}

export function archiveType() {
	return archiveOS() === "windows" ? "zip" : "tar.gz";
}
