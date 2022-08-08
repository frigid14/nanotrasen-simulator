let previousThreatLevel = 20;

/**
 * @abstract
 */
class Event {
	name = "Null";
	message = "Nothing. What did you expect."
	threat = null;

	run(station) {}
}

function addEventLog(message, station, color) {
	const id = (Math.random() + 1).toString(36).substring(7);
	let paragraph = document.createElement("p");

	message = message.replace("(STATION_NAME)", `<strong>${station.name}</strong>`)
	paragraph.innerHTML = `<button onclick="document.getElementById('${id}').parentNode.removeChild(document.getElementById('${id}'))">Close event</button> ${message}`;

	paragraph.style.color = color
	paragraph.id = id;

	document.getElementById("events").prepend(paragraph)
}

function runEvent() {
	if (stations.length > 0) {
		let threatLevel = Math.floor(Math.random() * 2) == 1 ? previousThreatLevel + 10 : previousThreatLevel - 10;
		if (threatLevel > 100) threatLevel = 100
		if (threatLevel < 10) threatLevel = 10
		previousThreatLevel = threatLevel;
		
		for (let i = 0; i < eventPool.length; i++) {
			const event = eventPool[i];
			if (event.threat == threatLevel) {
				const station = stations[Math.floor(Math.random() * stations.length)]
				console.log(`Event has been run.`)

				event.run(station);
				break;
			} else {
				console.log(`Unable to find any event with threat level: ${threatLevel}`)
			}
		}
	}
}