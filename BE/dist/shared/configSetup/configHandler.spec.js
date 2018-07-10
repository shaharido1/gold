"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configHandler_1 = require("./configHandler");
describe('Test validate of config file', () => {
    process.env["test1"] = "ss";
    const configHandler = new configHandler_1.ConfigHandler('');
});
//# sourceMappingURL=configHandler.spec.js.map