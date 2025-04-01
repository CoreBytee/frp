import terminalSize from "terminal-size";
import clamp from "./clamp.js";

export default class ProcessBar {
	terminalWidth: number;
	barLength: number;

	total: number;
	current: number;
	label: string;
	constructor(total: number, label?: string) {
		this.terminalWidth = terminalSize().columns;
		this.barLength = clamp(this.terminalWidth, 0, 100);

		this.label = label ? `${label} ` : "";
		this.total = total;
		this.current = 0;
	}

	update(current: number) {
		this.current = current;
		this.render();
	}

	render() {
		const percentage = (this.current / this.total) * 100;
		const barLength = Math.floor((percentage / 100) * (this.barLength - 10));
		const bar =
			"=".repeat(barLength) + " ".repeat(this.barLength - barLength - 10);
		const progressBar = `[${bar}] ${percentage.toFixed(2)}%`;
		process.stdout.write(`\r${this.label}${progressBar}`);
	}

	finish() {
		this.current = this.total;
		this.render();
		console.log("");
	}
}
