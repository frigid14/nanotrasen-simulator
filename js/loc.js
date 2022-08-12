class Loc {
    constructor(lang, table) {
        this.lang = lang;
        this.table = table;
    }

    async init() {
        this.lang = window.navigator.language;
        this.table = await this.getKeys(this.lang);
    }

    /**
     * 
     * @param {string} lang 
     * @returns Contents of `lang`.json
     */
    getKeys(lang) {
        return fetch("assets/loc/" + lang + ".json")
            .then(response => response.json())
            .then(data => data)
            .catch(error => console.log(error));
    }

    /**
     * Takes an Loc key, outputs the Loc string, returns null if none
     * @param {string} key 
     * @returns {string} loc key, else null
     */
    tryGetString(key) {
        if (this.table[key] != undefined) {
            return this.table[key];
        } else {
            return null;
        }
    }

    /**
     * Takes an Loc key and outputs the Loc string.
     * @param {string} key 
     * @returns {string} loc-string
     */
    getString(key) {
        return this.tryGetString(key) ?? key;
    }

    /**
     * Takes an Loc key, and outputs a formatted string based on args.
     * @param {string} key
     * @param {array} args
     * @returns {string}
     */
    formatString(key, args) {
        var string = this.getString(key);
        const regExp = /\${[0-9a-zA-Z]*}/g;
        const array = string.match(regExp);

        if (array == null) return key;

        for (let i = 0; i < array.length; i++) {
            string = string.replace(array[i], args[i]);
        }
        return string;
    }

    /**
     * Localizes the DOM.
     */
    localizeDOM() {
        const allElements = document.querySelectorAll("*");
        for (var element of allElements) {
            if (!element.firstChild || !element.firstChild.data) {
                continue;
            }

            const text = element.firstChild.data;

            if (text.includes("\n")) {
                continue;
            }
            if (text.includes(" ")) {
                const substrings = text.split(" ");
                var buffer = [];
    
                for (var substring of substrings) {
                    buffer.push(loc.getString(substring));
                }
    
                const final = buffer.join(" ");
                element.firstChild.data = final;
            } else {
                element.firstChild.data = loc.getString(text);
            }
        }
    }
}
async function initializeLoc(loc) {
    await loc.init();
    console.log("Loc initialized.");
    loc.localizeDOM();
    console.log("DOM localized.");
}

var loc = new Loc();
initializeLoc(loc);