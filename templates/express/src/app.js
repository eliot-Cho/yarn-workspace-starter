"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const loaders_1 = require("./loaders");
const serverStart = async () => {
    const app = (0, express_1.default)();
    await (0, loaders_1.loader)(app);
    app.listen(config_1.config.port);
};
serverStart()
    .then(() => console.log(`Server Run on ${config_1.config.port}`))
    .catch((err) => {
    console.error("Server Run Failed");
    console.error(err);
    process.exit(1);
});
