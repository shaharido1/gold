"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("rxjs/index");
let observer1;
const a = new index_1.Observable((observer) => {
    observer1 = observer;
});
observer1.next('1');
const subs = a.subscribe((msg) => {
    console.log(msg);
});
observer1.next('2');
let i = 0;
setInterval(() => observer1.next(i++), 1000);
//# sourceMappingURL=try.js.map