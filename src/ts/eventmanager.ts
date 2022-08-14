import { addCredits, credits, stations } from ".";
import { eventPool } from "./datasets/events";

export let threatLevel = 20;

export function setThreatLevel(threat: number) {
	threatLevel = threat
}

// thanks stack overflow.
function shuffleArray(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}


/**
 * Calculates a threat level and runs the corresponding event from the `eventPool`.
 */
export function runRandomEvent() {
	// Check if we have ANY stations at all. Stop yelling at me JS.
	if (stations.length > 0) {
		// Calculate threat level, either +10 or -10
		// WHY THE FUCK IS MY THREAT LEVEL UNDEFINED?
		// FUCK IT. IM RENAMING PREVIOUS THREAT LEVEL TO CURRENT THREAT LEVEL
		threatLevel = Math.floor(Math.random() * 2) == 0 ? threatLevel + 10 : threatLevel - 10;

		console.log(threatLevel);
		
		// Clamp threatlevel
		if (threatLevel > 100) threatLevel = 100;
		if (threatLevel < 10) threatLevel = 10;
                // Need to shuffle array else shit can get stuck
                shuffleArray(eventPool)

		// For everything in the event pool
		// Yes. I know this is bad. Refactor it.
		for (let i = 0; i < eventPool.length; i++) {
			const station = stations[Math.floor(Math.random() * stations.length)]
			const event = eventPool[i];

			// Event checks
			if (
				(threatLevel == event.threat || event.threat == -1) &&
				credits >= event.minimumCredits &&
				station.unrest >= event.minimumUnrest &&
				station.uptime >= event.minimumUptime &&
				station.crew >= event.minimumCrew
			) {
				// If so run event on the station
				
				runEvent(event, station);

				// Break out of for loop since we're done with it.
				break;
			} else {
				// Otherwise reset and try again
				console.log(`"${event.name}" failed to run, failed checks. Threat level: ${threatLevel}, event threat level: ${station.threat}`)
			}
		}
	}
}

/**
 * Runs a specific event, if you want a random event use `runRandomEvent()`
 * @param {Event} event 
 */
export function runEvent(event, station) {
	addCredits(parseInt(event.changedCredits));
	station.addRevenue(parseInt(event.changedRevenue));
	station.addUnrest(parseInt(event.changedUnrest), false);
	station.addCrew(event.changedCrew);

	// Run the function in the class allowing for some custom
	// javascript, defaults to an addEventLog.
	// Used by events such as NuclearOperativesSuccess
	// to destroy the station, or do something else with it
	event.run(station);

	console.log(`Event "${event.name}" has been run.`)
}