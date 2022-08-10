let previousThreatLevel = 20;

/**
 * Abstract event class that all Events inherit from.
 * @abstract
 */
class Event {
	name = "Null";
	message = "Nothing. What did you expect."
	threat = null;

	run(station) {}
}

/**
 * Adds a log in the Events category with a message and color.
 * @param {string} message 
 * @param {Station} station 
 * @param {string} color 
 */
function addEventLog(message, station, color) {
	const id = (Math.random() + 1).toString(36).substring(7); // get random ID string
	let paragraph = document.createElement("p"); // create paragraph

	// Replace every instance of (STATION_NAME) with the actual station name.
	message = message.replace("(STATION_NAME)", `<strong>${station.name}</strong>`)
	// TODO: Make this better
	paragraph.innerHTML = `<button onclick="document.getElementById('${id}').parentNode.removeChild(document.getElementById('${id}'))">Close event</button> ${message}`;

	// Change styles/id
	paragraph.style.color = color
	paragraph.id = id;

	document.getElementById("events").prepend(paragraph)
}

/**
 * Calculates a threat level and runs the corresponding event from the `eventPool`.
 */
function runEvent() {
	// Check if we have ANY stations at all. Stop yelling at me JS.
	if (stations.length > 0) {
		// Calculate threat level, either +10 or -10
		let threatLevel = Math.floor(Math.random() * 2) == 1 ? previousThreatLevel + 10 : previousThreatLevel - 10;
		
		// Clamp threatlevel
		if (threatLevel > 100) threatLevel = 100
		if (threatLevel < 10) threatLevel = 10

		// Set previousThreatLevel for shenanigans
		previousThreatLevel = threatLevel;
		
		// For everything in the event pool
		// Yes. I know this is bad. Refactor it.
		for (let i = 0; i < eventPool.length; i++) {
			const event = eventPool[i];
			// Check if event threat is equal to threatlevel
			if (event.threat == threatLevel) {
				// If so run event
				const station = stations[Math.floor(Math.random() * stations.length)]
				console.log(`Event has been run.`)

				event.run(station);
				break;
			} else {
				// Otherwise reset and try again
				console.log(`Unable to find any event with threat level: ${threatLevel}`)
			}
		}
	}
}