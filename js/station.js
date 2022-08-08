class Station {
	name = "Station Station"
	revenue = 100
	unrest = 0
	upgrades = [] // No upgrades. Fuck you.
	shuttleSent = 0
	booleans = {
		ertSent: false,
		decomissioned: false,
	}
	createdOn = null;

	constructor(name,revenue,unrest,tickCreated,upgrades,ertSent,decomissioned,shuttleSent) {
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
			addCredits(this.revenue);
		}
		if ((this.createdOn - tickNumber * -1) % 10 === 0) {
			addCredits(-Math.floor(this.revenue / 4));
		}

		div.getElementsByClassName("station_revenue")[0].innerHTML = `Revenue: ${this.revenue}`
		div.getElementsByClassName("station_unrest")[0].innerHTML = `Unrest: ${this.unrest}`
		div.getElementsByClassName("station_shuttle")[0].innerHTML = `Emergency Shuttle Status: ${this.getShuttleStatus()}`
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

	getShuttleStatus() {
		if (this.shuttleSent == 1) {
			return "Bluespace"
		}else if (this.shuttleSent) {
			return "Docked"
		}
		return "Central Command"
	}

	export() {
		return {
			name: this.name,
			revenue: this.revenue,
			unrest: this.unrest,
			upgrades: this.upgrades,
			shuttleSent: this.shuttleSent,
			ertSent: this.booleans.ertSent,
			decomissioned: this.booleans.decomissioned,
			tickCreated: this.createdOn
		}
	}
}