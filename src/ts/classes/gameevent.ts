import { loc } from "../loc";

/**
 * Adds a log in the Events category with a message and color.
 * @param {string} message 
 * @param {Station} station 
 * @param {string} color 
 */
 export function addEventLog(message, station, color) {
	const id = (Math.random() + 1).toString(36).substring(7); // get random ID string
	let paragraph = document.createElement("p"); // create paragraph

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
	name: string = "Null";
	message: string = "Nothing. What did you expect."
	color: string = "#000000"
	threat: number = 0;

	changedCredits: number = 0
	changedRevenue: number = 0
	changedUnrest: number = 0
	changedCrew: number = 0

	minimumCredits: number = 0
	minimumUnrest: number = 0
	minimumUptime: number = 0
	minimumCrew: number = 0

	run(station) {addEventLog(this.message, station, this.color)}
}