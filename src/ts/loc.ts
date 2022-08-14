class Loc {
    lang: string;
    table: object;

    // constructor(lang, table) {
    //     this.lang = lang;
    //     this.table = table;
    // }

    async init() {
        this.lang = window.navigator.language;
        this.table = await this.getKeys(this.lang);
    }

    /**
     * 
     * @param {string} lang 
     * @returns Contents of `lang`.json
     */
    getKeys(lang): object {
        // return fetch("assets/loc/" + lang + ".json")
        //     .then(response => response.json())
        //     .then(data => data)
        //     .catch(error => console.log(error));
        return require("../../public/assets/loc/" + lang + ".json")
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
            if (!element.firstChild || !(element.firstChild as HTMLElement).nodeValue) {
                continue;
            }

            const text = (element.firstChild as HTMLElement).nodeValue!;

            if (text.includes("\n")) {
                continue;
            }
            if (text.includes(" ")) {
                const substrings = text.split(" ");
                var buffer: string[] = [];
    
                for (var substring of substrings) {
                    buffer.push(loc.getString(substring));
                }
    
                const final = buffer.join(" ");
                (element.firstChild as HTMLElement).nodeValue = final;
            } else {
                (element.firstChild as HTMLElement).nodeValue = loc.getString(text);
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

export var loc = new Loc();
initializeLoc(loc);