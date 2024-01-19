const ini = require("ini");
const objectPath = require("object-path");
const fs = require("fs").promises;

class IniParser {
    constructor(filePath) {
        this.data = {};
        this.filePath = filePath;
    }

    get(configPath) {
        return objectPath.get(this.data, configPath);
    }

    set(configPath, value) {
        objectPath.set(this.data, configPath, value);
    }

    async load() {
        this.data = ini.decode(await fs.readFile(this.filePath, "utf8"));
    }

    async save() {
        await fs.writeFile(this.filePath, ini.decode(this.data));
    }
}

module.exports = IniParser;