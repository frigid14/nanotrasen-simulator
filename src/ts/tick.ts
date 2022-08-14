import { exportData, stations } from ".";
import { runRandomEvent } from "./eventmanager";
import { Station } from "./station";

export let tickNumber = 0; // So we know what tick it is. Can be manipulated by importData

export function setTick(tickNum: number) {
	tickNumber = tickNum;
}

export function tick() {
	setTimeout(tick, 100); // Run every 100ms
	tickNumber++; // Increment tickNumber

	// Tick each station
	for (let i = 0; i < stations.length; i++) {
		const station: Station = stations[i];
		station.tick(tickNumber);
	}

	if (tickNumber % 150 === 0)	runRandomEvent(); // Run event every 150 ticks
	if (tickNumber % 500 === 0)	{ // Autosave every 500 ticks
		localStorage.setItem("nt_sim_data", exportData());
		console.log("Autosaved.")
	}
}