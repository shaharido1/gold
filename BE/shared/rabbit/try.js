
const rxjs = require('rxjs/index')

let observer1;
const a = new rxjs.Observable((observer) => {
  observer1 = observer;
});


const subs = a.subscribe((msg) => {
  console.log(msg);
}, (e) => console.log("err" + e));

let i = 0;

setInterval(() => {
    observer1.next(i++)
    if (i===5) {
        observer1.error(i)
    }
}, 1000);