/**
 * Station class.
 */
class Station {
	name = "Station Station"
	revenue = 1000
	unrest = 0
	upgrades = [] // No upgrades. Fuck you.
	shuttleSent = 0
	booleans = {
		ertSent: false,
		decomissioned: false,
	}
	createdOn = 0;
	
	payPerCrewmember = 15;
	crewmemberPrice = 150;
	crew = 5;

	requireUpkeep = true;

	constructor(name,revenue,unrest,tickCreated,upgrades,ppc,ertSent,decomissioned,shuttleSent) {
		this.name = name
		this.revenue = revenue
		this.unrest = unrest
		this.upgrades = upgrades
		this.shuttleSent = shuttleSent
		this.booleans.ertSent = ertSent
		this.booleans.decomissioned = decomissioned
		this.createdOn = tickCreated
	}

	tick(tickNumber) {
		const div = document.getElementById(this.createdOn)

		if ((this.createdOn - tickNumber * -1) % 20 === 0) {
			// More crewmembers being paid well = More revenue, but more bad events
			// Less crewmembers = Less revenue but less bad events
			addCredits(this.calculatedRevenue);
		}

		if ((this.createdOn - tickNumber * -1) % 10 === 0) {
			if (this.requireUpkeep) {
				addCredits(-Math.floor(this.payPerCrewmember * this.crew));
				if (this.payPerCrewmember < this.desiredPPC) {
					this.addUnrest(Math.floor(Math.random() * 15) + 10);
					addEventLog("Crewmembers aboard (STATION_NAME) believe that they aren't being paid good enough for their hard work! Civil unrest increased.", this, "#aa0000")
				} else {
					// Removed due to the stupid amount of log spamming there was
					// addEventLog(`Nanotrasen paid ${this.crew} crewmembers ${this.payPerCrewmember} credits aboard (STATION_NAME). Civil unrest decreased.`, this, "#aa0000")
					this.addUnrest(-1);
				}
			}
		}

		if (this.payPerCrewmember < 0) {
			this.payPerCrewmember = 0;
		}

		div.getElementsByClassName("station_revenue")[0].innerHTML = `Revenue: ${this.calculatedRevenue}`
		div.getElementsByClassName("station_unrest")[0].innerHTML = `Unrest: ${this.unrest}`
		div.getElementsByClassName("station_uptime")[0].innerHTML = `Uptime: ${this.uptime}`
		div.getElementsByClassName("station_crew")[0].innerHTML = `Crew: ${this.crew} <img src="assets/images/person.svg" style="width: 18px; vertical-align: middle;" alt="person icon"></img>`
		
		div.getElementsByClassName("station_ppc")[0].innerHTML = `CPPC: ${this.payPerCrewmember} | DPPC: ${this.desiredPPC}`;

		// div.getElementsByClassName("station_shuttle")[0].innerHTML = `Emergency Shuttle Status: ${this.shuttleStatus}`
	}

	destroy() {
		// In what world must you destroy a station?
		// Do not use if you are decomissioning/selling a station.
		// This is the main thing that destroys the Station instance
		// And the div.

		const div = document.getElementById(this.createdOn.toString());
		
		if (div != null) {
			div.remove();			
		}
		//if (station != null) station.remove() // Station shouldn't even be null unless EU is tinkering with it.
		this.revenue = 0;
		this.requireUpkeep = false;

		stationsBought--;
		stations = stations.filter((element) => {return this != element})
	}

	sellStation() {
		addEventLog(`Nanotrasen sold (STATION_NAME) ${credits<this.revenue ? "at a profit" : "at a loss"}.`, this, `#000000`)
		if (credits > this.revenue) {
			addCredits(-credits);
			this.destroy();
		}
		addCredits(Math.floor(credits / 2));
		this.destroy();

	}

	addRevenue(revenue) {
		if (this.revenue > 0) {
			this.revenue += revenue;
		}
	}

	addUnrest(unrest) {
		if (this.unrest >= 0 && this.unrest <= 100) {
			let oldUnrest = this.unrest;
			this.unrest += unrest;
			if (this.unrest > 0 && this.unrest < 100) return true
			else this.unrest = oldUnrest

			return false
		}
	}

	addCrew(crewmembers) {
		this.crew += crewmembers
		if (this.crew <= 0) {
			// What is a station without the crew to manage it?
			this.destroy()
		}
	}

	buyCrew(crewmembers) {
		if (credits >= this.crewmemberPrice) {
			this.addCrew(crewmembers);
			addCredits(-this.crewmemberPrice);
		}
	}

	get shuttleStatus() {
		if (this.shuttleSent == 1) {
			return "Bluespace"
		}else if (this.shuttleSent) {
			return "Docked"
		}
		return "Central Command"
	}

	get desiredPPC() {
		return 5 + Math.floor((this.revenue + this.crew) / 10)
	}

	get uptime() {
		return Math.floor(((this.createdOn - tickNumber) * -1) / 10);
	}

        get calculatedRevenue() {
                return this.revenue + this.crew * Math.floor(this.payPerCrewmember)
        }

	export() {
		return {
			name: this.name,
			revenue: this.revenue,
			unrest: this.unrest,
			upgrades: this.upgrades,
			shuttleSent: this.shuttleSent,
			ppc: this.payPerCrewmember,
			ertSent: this.booleans.ertSent,
			decomissioned: this.booleans.decomissioned,
			tickCreated: this.createdOn
		}
	}
}
