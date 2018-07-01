"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
class ConfigFetch {
    constructor(DefaultConfig, routeName, configServerAddress) {
        this.configServerAddress = {
            host: '172.30.65.113',
            port: '5000'
        };
        this.defaultConfig = DefaultConfig;
        this.route = routeName;
        this.configServerAddress = configServerAddress || this.configServerAddress;
    }
    init() {
        return new Promise((resolve, reject) => {
            console.log('start Fetch');
            // const request: RequestInit = {
            //   method: 'GET'
            //   };
            const url = `http://${this.configServerAddress.host}:${this.configServerAddress.port}/${this.route}`;
            const request = {
                params: { type: 'producer' }
            };
            axios_1.default.get(url, request)
                .then(response => {
                // console.log('serverConfig');
                const serverConfig = (response.data);
                const env = process.env;
                const envConfig = {};
                Object.keys(env)
                    .filter(key => key.includes('TES', 0))
                    .map(key => {
                    envConfig[key] = env[key];
                });
                console.log('!@');
                console.log(this.defaultConfig);
                console.log(serverConfig);
                console.log(envConfig);
                console.log('!@');
                this.finalConfig = Object.assign({}, this.defaultConfig, { serverConfig, envConfig });
                return resolve(this.finalConfig);
            })
                .catch(err => console.error(err));
        });
    }
}
exports.ConfigFetch = ConfigFetch;
//# sourceMappingURL=configFetch.js.map