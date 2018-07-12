"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appConfig_1 = require("./config/appConfig");
const redis = require("redis");
const client = redis.createClient({ host: "redis" });
function subscribe() {
    client.on("message", (channel, message) => {
        try {
            const json = JSON.parse(message);
            console.log(json);
        }
        catch (e) {
        }
    });
    client.subscribe(appConfig_1.appConfig.publishToApollo);
}
subscribe();
//# sourceMappingURL=server.js.map