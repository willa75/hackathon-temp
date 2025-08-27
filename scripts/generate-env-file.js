const outputsJson =  require("../.sst/outputs.json");
const path = require("path");
const { writeFileSync } = require("fs");

const envFilePath = path.resolve(__dirname, "../.env");

const envFileContent = Object.entries(outputsJson)
    .map(([key, value]) => `${key}=${value}`).join("\n");

writeFileSync(envFilePath, envFileContent);
