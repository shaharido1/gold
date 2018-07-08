// // import axios, { AxiosRequestConfig } from 'axios';
// // import { Address } from './interfaces/path';
//
// export class ConfigFetch {
//
//   route: string;
//   configServerAddress: Address = {
//     host: '172.30.65.113',
//     port: '5000'
//   };
//   defaultConfig;
//   finalConfig;
//
//
//   constructor(DefaultConfig, routeName, configServerAddress?) {
//     this.defaultConfig = DefaultConfig;
//     this.route = routeName;
//     this.configServerAddress = configServerAddress || this.configServerAddress;
//   }
//
//   init(): Promise<any> {
//     return new Promise((resolve, reject) => {
//       console.log('start Fetch');
//       // const request: RequestInit = {
//       //   method: 'GET'
//       //   };
//
//       const url = `http://${this.configServerAddress.host}:${this.configServerAddress.port}/${this.route}`;
//
//       const request: AxiosRequestConfig = {
//         params: { type: 'producer' }
//       };
//
//       axios.get(url, request)
//           .then(response => {
//             // console.log('serverConfig');
//             const serverConfig = (response.data);
//             const env: object = process.env;
//             const envConfig : any = {};
//             Object.keys(env)
//                 .filter(key => key.includes('TES', 0))
//                 .map(key => {
//                   envConfig[key] = env[key];
//                 });
//             console.log('!@');
//             console.log(this.defaultConfig);
//             console.log(serverConfig);
//             console.log(envConfig);
//             console.log('!@');
//
//
//             this.finalConfig = { ...this.defaultConfig, serverConfig, envConfig };
//             return resolve(this.finalConfig);
//           })
//           .catch(err => console.error(err));
//
//     });
//
//   }
//
// }
//# sourceMappingURL=configFetch.js.map