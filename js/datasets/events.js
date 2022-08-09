class Rumor extends Event {
	name = "Rumor"
	message = "Rumors about bullshit."
	color = "#aa0000"
	threat = 30

	changed = {
		unrest: 20
	}

	minimum = {
		uptime: 50,
		crew: 40
	}
}

class AntagMajor extends Event {
	name = "Antag Major"
	message = "So spooky."
	color = "#aa0000"
	threat = 80

	changed = {
		unrest: 50,
		revenue: -500,
		credits: -1500
	}

	minimum = {
		uptime: 180,
		crew: 30
	}
}

class ThiefCaughtFail extends Event {
	name = "Thief";
	message = "A thief has been caught on (STATION_NAME), but their attempts to steal were futile! Civil unrest has decreased."
	color = "#00aa00";
	threat = 10;

	changed = {
		unrest: -10
	}

	minimum = {
		uptime: 30,
		crew: 40
	}
}

class ThiefCaughtSucceed extends Event {
	name = "Thief";
	message = "A thief has been caught on (STATION_NAME), but they got away! Credits decreased, Civil unrest has increased."
	color = "#aa0000"
	threat = 20;

	changed = {
		unrest: 10,
		revenue: -50,
		credits: -150
	}

	minimum = {
		uptime: 30,
		crew: 40
	}
}

class EnemyCommunicationIntercepted extends Event {
	name = "Enemy Communication Intercepted"
	message = "Attention, enemy communication intercepted. Security level elevated. Civil unrest increased."
	threat = 20

	changed = {
		unrest: 25
	}

	minimum = {
		uptime: 50,
		crew: 20
	}

	run(station){
		addEventLog(this.message, station, "#0000aa")
		intercept.play();
	}
}

class PlasmaBubble extends Event {
	name = "Plasma Bubble"
	message = "(STATION_NAME) has entered an area of space with more plasma than the last, increased revenue!"
	threat = 20
	color = "#ff00ff"

	changed = {
		revenue: 50,
		credits: 500
	}

	minimum = {
		uptime: 15,
		crew: 10
	}
}

class ThiefDetected extends Event {
	name = "Thief";
	message = "A thief has been detected on (STATION_NAME), civil unrest has increased."
	threat = 30;

	changed = {
		unrest: 15
	}

	minimum = {
		uptime: 30,
		crew: 40
	}
}

class TraitorDetained extends Event {
	name = "Syndicate Agent";
	message = "A syndicate agent has been detected on (STATION_NAME), and has been properly detained. But not without decreasing the station revenue! Civil Unrest decreased."
	threat = 30;

	changed = {
		unrest: 15,
		revenue: -25
	}

	minimum = {
		uptime: 60,
		crew: 50
	}
}

class NTRumors extends Rumor {
	name = "Rumors";
	message = "Rumors about Nanotrasen decomissioning (STATION_NAME) have spread, civil unrest increased."
	threat = 40;

	changed = {
		unrest: -25
	}

	minimum = {
		uptime: 80
	}
}

class LingRumor extends Rumor {
	name = "Changeling Rumors";
	message = "Rumors about changelings aboard (STATION_NAME) have spread, civil unrest increased."
	threat = 40;
}

class AIActivity extends Rumor {
	name = "Disturbing AI Activity";
	message = "Crewmembers onboard (STATION_NAME) have noticed odd and disturbing AI activity, civil unrest increased."
	threat = 40;
}

class WizardRumors extends Rumor {
	name = "Wizard Rumors";
	message = "Rumors about the Wizard Federation attacking (STATION_NAME) has spread, civil unrest increased."
	threat = 50;
}

class ForeignLifeformsMinor extends Rumor {
	name = "Foreign Lifeforms";
	message = "Foreign Lifeforms detected on (STATION_NAME), but the AI was able to vent the lifeforms before they did any harm. Civil unrest increased."
	threat = 50;
}

class InsanityWave extends Event {
	name = "Insanity Wave";
	message = "A bluespace anomaly has triggered, causing crewmembers aboard (STATION_NAME) to see nightmares. Civil unrest increased."
	threat = 50;
	color = "#aa0000"
	
	changed = {
		unrest: 50
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

class NuclearEmergencySuccess extends AntagMajor {
	name = "Successful Nuclear Operation"
	message = "A team of nuclear operatives have successfully detonated the nuclear fission device on (STATION_NAME). You were able to rebuild it but with a cost."
	threat = 100;
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
	new NTRumors(),
	new LingRumor(),
	new AIActivity(),
	new WizardRumors(),
	new ForeignLifeformsMinor(),
	new InsanityWave(),
	new BluespaceAnomaly()
]