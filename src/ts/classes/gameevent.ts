import { loc } from "../loc";

/**
 * Adds a log in the Events category with a message and color.
 * @param {string} message 
 * @param {Station} station 
 * @param {string} color 
 */
 export function addEventLog(message, station, color) {
	const id = (Math.random() + 1).toString(36).substring(7); // get random ID string
	const paragraph = document.createElement("p"); // create paragraph

	// Replace every instance of (STATION_NAME) with the actual station name.
	message = loc.getString(message);
	message = message.replace("(STATION_NAME)", `<strong>${station.name}</strong>`)
	// TODO: Make this better
	paragraph.innerHTML = `<button onclick="document.getElementById('${id}').parentNode.removeChild(document.getElementById('${id}'))">Close event</button> ${message}`;

	// Change styles/id
	paragraph.style.color = color
	paragraph.id = id;

	document.getElementById("events").prepend(paragraph)
}

/**
 * Abstract event class that all Events inherit from.
 * @abstract
 */
 export abstract class GameEvent {
	name = "Null";
	message = "Nothing. What did you expect."
	color = "#000000"
	threat = 0;

	changedCredits = 0
	changedRevenue = 0
	changedUnrest = 0
	changedCrew = 0

	minimumCredits = 0
	minimumUnrest = 0
	minimumUptime = 0
	minimumCrew = 0

	run(station) {addEventLog(this.message, station, this.color)}
}