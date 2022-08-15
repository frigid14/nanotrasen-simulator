import { buyStation, credits } from "../src/ts";

document.body.innerHTML = `
<h1>%body.title</h1>
<p id="note">%body.note</p>
<button class="settings_export">%body.exportData</button>
<button class="settings_import">%body.importData</button>
<button class="settings_save">%body.saveData</button>
<button class="settings_delete">%body.deleteData</button>
<p>%body.credits <span id="credits"></span></p>
<h2>%body.shop</h2>
<button id="buy_station_capacity"><span>%body.moreStationCapacity </span><span id="capacityPrice">5000</span></button>
<div class="content"><details id="stationcontent"><summary>%body.stations (<span id="stationsAmount">0/5</span>)</summary><button id="buyStation">%body.buyStation</button><div id="stations"></div></div><details id="events" open><summary>%body.events</summary><p>%events.nothingHappening</p></div></div>`

test("buyStation credits test", () => {

    buyStation();
    expect(credits).toBe(0);
});