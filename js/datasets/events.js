class Rumor extends Event {
	name = "Rumor"
	message = "Rumors about bullshit."
	color = "#aa0000"
	threat = 30

	changedUnrest = 20

	minimumUptime = 50
	minimumCrew = 40
}

class AntagMajor extends Event {
	name = "Antag Major"
	message = "So spooky."
	color = "#aa0000"
	threat = 80

	changedUnrest = 50
	changedRevenue = -500
	changedCredits = -1500

	minimumUptime = 180
	minimumCrew = 30
}

class ThiefCaughtFail extends Event {
	name = "Thief";
	message = "A thief has been caught on (STATION_NAME), but their attempts to steal were futile! Civil unrest has decreased."
	color = "#00aa00";
	threat = 10;

	changedUnrest = -10

	minimumUptime = 30
	minimumCrew = 40
}

class ThiefCaughtSucceed extends Event {
	name = "Thief";
	message = "A thief has been caught on (STATION_NAME), but they got away! Credits decreased, Civil unrest has increased."
	color = "#aa0000"
	threat = 20;

	changedUnrest = 10
	changedRevenue = -50
	changedCredits = -150

	minimumUptime = 30
	minimumCrew = 40
}

class EnemyCommunicationIntercepted extends Event {
	name = "Enemy Communication Intercepted"
	message = "Attention, enemy communication intercepted. Security level elevated. Civil unrest increased."
	threat = 20

	changedUnrest = 25

	minimumUptime = 50
	minimumCrew = 20

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

	changedRevenue = 50
	changedCredits = 500

	minimumUptime = 15
	minimumCrew = 10
}

class ThiefDetected extends Event {
	name = "Thief";
	message = "A thief has been detected on (STATION_NAME), civil unrest has increased."
	threat = 30;

	changedUnrest = 15

	minimumUptime = 30
	minimumCrew = 40
}

class TraitorDetained extends Event {
	name = "Syndicate Agent";
	message = "A syndicate agent has been detected on (STATION_NAME), and has been properly detained. But not without decreasing the station revenue! Civil Unrest decreased."
	threat = 30;

	changedUnrest = 15
	changedRevenue = -25

	minimumUptime = 60
	minimumCrew = 50
}

class NTRumors extends Rumor {
	name = "Rumors";
	message = "Rumors about Nanotrasen decomissioning (STATION_NAME) have spread, civil unrest increased."
	threat = 40;

	changedUnrest = 25;
	minimumUptime = 80;
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
	
	changedUunrest = 35
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
	message = "A team of nuclear operatives have successfully detonated the nuclear fission device on (STATION_NAME). You havent heard from it since the unauthorized nuclear explosion alert."
	threat = 100;

	run(station) {
		addEventLog(this.message, station, this.color);
		station.destroy();
	}
}

class MalfAISuccess extends AntagMajor {
	name = "Malfunctioning AI"
	message = "A nuclear fission device has exploded unwillingly aboard (STATION_NAME), checking the logs, it reveals that this was the cause of a Malfunctioning AI! You havent heard from the station since."
	threat = 100;

	run(station) {
		addEventLog(this.message, station, this.color);
		station.destroy();
	}
}

class BloodCultSuccess extends AntagMajor {
	name = "Blood Cult Success"
	message = " Space time anomalies have been detected on (STATION_NAME). Nar'Sie has risen. You are forced to abandon the station before any more damage can be done."
	threat = 100;

	minimumCrew = 15;

	run(station) {
		spanomalies.play()
		addEventLog(this.message, station, this.color);
		station.destroy();
	}
}

class RevolutionSuccess extends AntagMajor {
	name = "Successful Nuclear Operation"
	message = "A revolution has sparked on (STATION_NAME) due to low unrest. Multiple casualties and a distress signal, \"SEND HELP PLEASE\"."
	threat = 100;

	minimumUnrest = 90;
	changedCrew = -50;
}

class WizardSuccess extends AntagMajor {
	name = "Successful Wizard Attack"
	message = "A wizard has attacked (STATION_NAME) causing mass crew damage. Multiple casualties and a distress signal, \"SEND HELP PLEASE\"."
	threat = 100;

	minimumUnrest = 50;
	changedCrew = -100;
}

class Tragedy extends Event {
	// -1 threat means it can happen anytime.
	message = "A tragedy has occured. a crewmember aboard (STATION_NAME) has died."
	threat = -1;

	changedCrew = -1;
}


const eventPool = [
	new NuclearEmergencySuccess(),
	new RevolutionSuccess(),
	new WizardSuccess(),
	new MalfAISuccess(),
	new BloodCultSuccess(),

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
	new BluespaceAnomaly(),

	new Tragedy()
]