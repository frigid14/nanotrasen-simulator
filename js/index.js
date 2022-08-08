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
		addEventLog(`Nanotrasen purchased extra station capacity for ${capacityPrice} credits.`, new Station("", 0,0,0,[]), "#00aa00")
		addCredits(-capacityPrice)
		maxStations++;
		capacityPrice = Math.floor(capacityPrice *= 1.75);
		document.getElementById("stationsAmount").innerHTML = `${stationsBought}/${maxStations}`
		document.getElementById("capacityPrice").innerHTML = `(${capacityPrice})`
	}
}

function exportData() {
	const fullData = {
		stationAmount: 0,
		stationPrice: 0,
		capacityPrice: 0,
		tickNumber: 0, 
		credits: 0, 
		stations: []
	}
	for (let i = 0; i < stations.length; i++) {
		const data = stations[i];
		fullData.stations.push(data);
	}

	fullData.stationAmount = stationsBought;
	fullData.stationPrice = stationPrice;
	fullData.capacityPrice = capacityPrice;
	fullData.tickNumber = tickNumber;
	fullData.credits = credits;

	return btoa(JSON.stringify(fullData));
}

function importData(data) {
	try {
		const packedData = atob(JSON.parse(data));
		for (let i = 0; i < packedData.stations.length; i++) {
			const station = packedData.stations[i];
			addStation(new Station(
				station.name,
				station.revenue,
				station.unrest,
				station.createdOn,
				station.upgrades,
				false,false,0
			));
		}

		stationsBought = packedData.stationAmount
		stationPrice = packedData.stationPrice
		capacityPrice = packedData.capacityPrice
		tickNumber = packedData.tickNumber
		credits = packedData.credits
	} catch (e) {
		console.error(e)
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
	` // Add emergency shuttle status WYCI
	// <p class="station_shuttle">Emergency Shuttle Status: ${station.getShuttleStatus()}</p>
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