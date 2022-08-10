class Loc {
    constructor(lang, table) {
        this.lang = lang;
        this.table = table;
    }

    async init() {
        this.lang = window.navigator.language;
        this.table = await this.getKeys(this.lang);
    }

    getKeys(lang) {
        return fetch("assets/loc/" + lang + ".json")
            .then(response => response.json())
            .then(data => data)
            .catch(error => console.log(error));
    }

    tryGetString(key) {
        if (key in this.table) {
            return this.table[key];
        } else {
            return null;
        }
    }

    getString(key) {
        return this.tryGetString(key) ?? key;
    }
}

function localizeDOM() {
    const allElements = document.getElementsByTagName('*');
    for (var element of allElements) {
        if (!element.textContent.includes("\n")) {
            key = element.textContent;
            console.log(key);
            element.textContent = loc.getString(key);
        }
    }
}

async function initializeLoc(loc) {
    await loc.init();
    console.log("Loc initialized.");
    localizeDOM();
    console.log("DOM localized.");
}

var loc = new Loc();
initializeLoc(loc);