class ThiefCaughtFail extends Event {
	name = "Thief";
	message = "A thief has been caught on (STATION_NAME), but their attempts were futile! Civil unrest has decreased."
	threat = 10;

	run(station) {
		addEventLog(this.message, station, "#00aa00")
		station.addUnrest(-10);
	}
}

class ThiefCaughtSucceed extends Event {
	name = "Thief";
	message = "A thief has been caught on (STATION_NAME), but they got away! Revenue decreased, Civil unrest has increased."
	threat = 20;

	run(station) {
		addEventLog(this.message, station, "#aa0000")
		station.addUnrest(10);
		station.addRevenue(-50);
	}
}

class EnemyCommunicationIntercepted extends Event {
	name = "Enemy Communication Intercepted"
	message = "Attention, enemy communication intercepted. Security level elevated. Civil unrest increased."
	threat = 20

	run(station){
		addEventLog(this.message, station, "#0000aa")
		station.addUnrest(25);
		intercept.play();
	}
}

class PlasmaBubble extends Event {
	name = "Plasma Bubble"
	message = "(STATION_NAME) has entered an area of space with more plasma than the last, increased revenue!"
	threat = 20

	run(station){
		addEventLog(this.message, station, "#ff00ff")
		station.addRevenue(50);
	}
}

class ThiefDetected extends Event {
	name = "Thief";
	message = "A thief has been detected on (STATION_NAME), civil unrest has increased."
	threat = 30;

	run(station) {
		addEventLog(this.message, station, "#aa0000")
		station.addUnrest(15);
	}
}

class TraitorDetained extends Event {
	name = "Syndicate Agent";
	message = "A syndicate agent has been detected on (STATION_NAME), and has been properly detained. But not without decreasing the station revenue! Civil Unrest decreased."
	threat = 30;

	run(station) {
		addEventLog(this.message, station, "#aa0000")
		station.addRevenue(-25);
		station.addUnrest(-10);
	}
}

class Rumors extends Event {
	name = "Rumors";
	message = "Rumors about Nanotrasen decomissioning (STATION_NAME) have spread, civil unrest increased."
	threat = 40;

	run(station) {
		addEventLog(this.message, station, "#aa0000")
		station.addUnrest(-45);
	}
}

class LingRumor extends Event {
	name = "Changeling Rumors";
	message = "Rumors about changelings aboard (STATION_NAME) have spread, civil unrest increased."
	threat = 40;

	run(station) {
		addEventLog(this.message, station, "#aa0000")
		station.addUnrest(-35);
	}
}

class AIActivity extends Event {
	name = "Disturbing AI Activity";
	message = "Crewmembers onboard (STATION_NAME) have noticed odd and disturbing AI activity, civil unrest increased."
	threat = 40;

	run(station) {
		addEventLog(this.message, station, "#aa0000")
		station.addUnrest(-40);
	}
}

class WizardRumors extends Event {
	name = "Wizard Rumors";
	message = "Rumors about the Wizard Federation attacking (STATION_NAME) has spread, civil unrest increased."
	threat = 50;

	run(station) {
		addEventLog(this.message, station, "#aa0000")
		station.addUnrest(-50);
	}
}

class ForeignLifeformsMinor extends Event {
	name = "Foreign Lifeforms";
	message = "Foreign Lifeforms detected on (STATION_NAME), but the AI was able to vent the lifeforms before they did any harm. Civil unrest increased."
	threat = 50;

	run(station) {
		addEventLog(this.message, station, "#aa0000")
		station.addUnrest(-50);
	}
}

class InsanityWave extends Event {
	name = "Insanity Wave";
	message = "A bluespace anomaly has triggered, causing crewmembers aboard (STATION_NAME) to see nightmares. Civil unrest increased."
	threat = 50;

	run(station) {
		addEventLog(this.message, station, "#aa0000")
		station.addUnrest(-50);
	}
}

class BluespaceAnomaly extends Event {
	name = "Bluespace Anomaly";
	message = "A bluespace anomaly has hit (STATION_NAME), our sensors were unable to figure out what happened."
	threat = 50;

	run(station) {
		addEventLog(this.message, station, "#0000ff")
		spanomalies.play()
		station.addUnrest(
			Math.floor(Math.random() * (Math.floor(50) - Math.ceil(-50)) + Math.floor(100))
		);
		station.addRevenue(
			Math.floor(Math.random() * (Math.floor(1000) - Math.ceil(-1000)) + Math.floor(100))
		);
	}
}

class NuclearEmergencyFailure extends Event {
	name = "Failed Nuclear Operation"
	message = "A team of nuclear operatives have failed to detonate the nuclear fission device on (STATION_NAME). The cargo techs have sold the loot for extra revenue."
	threat = 70;

	run(station) {
		addEventLog(this.message, station, "#00aa00")
		station.addRevenue(500);
	}
}

class NuclearEmergencySuccess extends Event {
	name = "Successful Nuclear Operation"
	message = "A team of nuclear operatives have successfully detonated the nuclear fission device on (STATION_NAME). You were able to rebuild it but with a cost."
	threat = 100;

	run(station) {
		addEventLog(this.message, station, "#aa0000")
		stations.addRevenue(-50000);
	}
}

const eventPool = [
	new NuclearEmergencySuccess(),
	new NuclearEmergencyFailure(),
	new ThiefDetected(),
	new TraitorDetained(),
	new ThiefCaughtSucceed(),
	new ThiefCaughtFail(),
	new EnemyCommunicationIntercepted(),
	new PlasmaBubble(),
	new Rumors(),
	new LingRumor(),
	new AIActivity(),
	new WizardRumors(),
	new ForeignLifeformsMinor(),
	new InsanityWave(),
	new BluespaceAnomaly()
]