const STARTING_CREDITS = 1000
const stations = [];
let maxStations = 5;
let stationsBought = 0;
let credits = 0 //DO NOT MODIFY
let stationPrice = 1000;
let capacityPrice = 5000;

/**
 * Adds an integer amount of credits
 * @param {number} credits_added 
 */
function addCredits(credits_added) {
	credits += credits_added;
	document.getElementById("credits").innerHTML = `${credits.toString()}`;
	if (credits > 0) {
		document.getElementById("credits").style.color = "#00aa00"
	} else if (credits < 0) {
		document.getElementById("credits").style.color = "#ff0000"
	} else {
		document.getElementById("credits").style.color = "#000000"
	}
}

function buyStationCapacity() {
	if (credits >= capacityPrice) {
		addEventLog(`Nanotrasen purchased extra station capacity for ${stationPrice} credits.`, new Station("", 0,0,0,[]), "#00aa00")
		addCredits(-capacityPrice)
		maxStations++;
		capacityPrice = Math.floor(capacityPrice *= 1.75);
		document.getElementById("stationsAmount").innerHTML = `${stationsBought}/${maxStations}`
		document.getElementById("capacityPrice").innerHTML = `(${capacityPrice})`
	}
}

function addStation(station) {
	stations.push(station);
	const div = document.createElement("div")
	div.classList.add('station');
	div.innerHTML = `
	<p class="station_name">Name: ${station.name}</p>
	<p class="station_revenue">Revenue: ${station.revenue}</p>
	<p class="station_unrest">Unrest: ${station.unrest}</p>
	<p class="station_shuttle">Emergency Shuttle Status: ${station.getShuttleStatus()}</p>
	`
	document.getElementById("stations").appendChild(div)
	div.id = station.createdOn
	
	document.getElementById("buyStation").disabled = true
	setTimeout(function(){
		document.getElementById("buyStation").disabled = false
	}, 5000)
	welcome.play();
}

function generateStationName() {
	const prefix = STATION_PREFIXES[Math.floor(Math.random() * STATION_PREFIXES.length) - 1]
	const name = STATION_NAMES[Math.floor(Math.random() * STATION_NAMES.length) - 1]
	const suffix = STATION_SUFFIXES[Math.floor(Math.random() * STATION_SUFFIXES.length) - 1]
	
	return `${prefix} ${name} ${suffix} ${Math.floor(Math.random() * 1000)}`
}

function buyStation() {
	if (credits >= stationPrice && stationsBought < maxStations) {
		const station = new Station(generateStationName(), 150, 0, tickNumber, []);
		addStation(station)
		addEventLog(`Nanotrasen purchased (STATION_NAME) for ${stationPrice} credits.`, station, "#00aa00")
		addCredits(-stationPrice)
		stationPrice = Math.floor(stationPrice *= 1.75);
		document.getElementById("buyStation").innerHTML = `Buy Station (${stationPrice})`
		stationsBought++;
		document.getElementById("stationsAmount").innerHTML = `${stationsBought}/${maxStations}`
	}
}

window.addEventListener('load', function () {
	document.getElementById("buyStation").innerHTML = `Buy Station (${stationPrice})`
	addCredits(STARTING_CREDITS);
	tick();

	console.log("Game initialized.")
})