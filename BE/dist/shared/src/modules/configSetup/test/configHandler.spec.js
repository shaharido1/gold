"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configHandler_1 = require("../configHandler");
const configPathTest_1 = require("./configPathTest");
const chai_1 = require("chai");
require("mocha");
describe('Testing config handler', () => {
    let settings;
    (function (settings) {
        settings["object"] = "object";
        settings["Environment"] = "config_env";
        settings["CustomPath"] = "./validateMockData.custom.json";
    })(settings || (settings = {}));
    const testResults = {
        dev: { 'a': { '1': 'a1', '2': 'a2' }, 'b': 'B' },
        test: { 'a': 'A', 'b': 'B', 'c': 'C' },
        prod: { 'a': { '1': 'a.1', '2': 'a.2', '3': { '1': 'a.3.1', '2': 'a.3.2' } }, 'b': 'B' },
        custom: { 'o': 'O', 'h': 'H', 'a': 'A', 'd': 'D' }
    };
    it('config handler - only file', (done) => {
        process.env[settings.Environment] = undefined;
        const configHandler = new configHandler_1.ConfigHandler(configPathTest_1.configFileLocation);
        chai_1.expect(configHandler.finalConfig).to.be.a(settings.object);
        chai_1.expect(configHandler.finalConfig).to.deep.equal(testResults.dev);
        done();
    });
    it('Test the object in test environment', (done) => {
        process.env[settings.Environment] = configHandler_1.EnvironementMode.test;
        const configHandler = new configHandler_1.ConfigHandler(configPathTest_1.configFileLocation);
        chai_1.expect(configHandler.environmentMode).to.equal(configHandler_1.EnvironementMode.test);
        chai_1.expect(configHandler.finalConfig).to.be.a(settings.object);
        chai_1.expect(configHandler.finalConfig).to.deep.equal(testResults.test);
        done();
    });
    it('Test the object in development environment', (done => {
        process.env[settings.Environment] = configHandler_1.EnvironementMode.dev;
        const configHandler = new configHandler_1.ConfigHandler(configPathTest_1.configFileLocation);
        chai_1.expect(configHandler.environmentMode).to.equal(configHandler_1.EnvironementMode.dev);
        chai_1.expect(configHandler.finalConfig).to.be.a(settings.object);
        chai_1.expect(configHandler.finalConfig).to.deep.equal(testResults.dev);
        done();
    }));
    it('Test the object in production environment', (done => {
        process.env[settings.Environment] = configHandler_1.EnvironementMode.prod;
        const configHandler = new configHandler_1.ConfigHandler(configPathTest_1.configFileLocation);
        chai_1.expect(configHandler.environmentMode).to.equal(configHandler_1.EnvironementMode.prod);
        chai_1.expect(configHandler.finalConfig).to.be.a(settings.object);
        chai_1.expect(configHandler.finalConfig).to.deep.equal(testResults.prod);
        done();
    }));
    it('Test the object in custom ', (done => {
        process.env[settings.Environment] = configHandler_1.EnvironementMode.custom;
        process.env['configFileLocation'] = settings.CustomPath;
        const configHandler = new configHandler_1.ConfigHandler(configPathTest_1.configFileLocation);
        chai_1.expect(configHandler.environmentMode).to.equal(configHandler_1.EnvironementMode.custom);
        chai_1.expect(configHandler.finalConfig).to.be.a(settings.object);
        chai_1.expect(configHandler.finalConfig).to.deep.equal(testResults.custom);
        done();
    }));
});
//# sourceMappingURL=configHandler.spec.js.map