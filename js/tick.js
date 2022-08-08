let tickNumber = 0;

function tick() {
	setTimeout(tick, 150);
	tickNumber++;
	for (let i = 0; i < stations.length; i++) {
		const station = stations[i];
		station.tick(tickNumber);
	}

	if (tickNumber % 150 === 0)	runEvent();
	if (tickNumber % 500 === 0)	{
		localStorage.setItem("nt_sim_data", exportData());
		console.log("Autosaved.")
	}
}