"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
class DBManager {
    static connect(Url, logService) {
        return new Promise((resolve, reject) => {
            mongoose.connect(Url);
            const db = mongoose.connection;
            db.on("error", (e) => {
                logService.error(e);
                return reject(e);
            });
            db.once("open", function () {
                console.log("connected to mongo!");
                return resolve();
            });
        });
    }
    static disconnect(done) {
        mongoose.disconnect(done);
    }
}
exports.DBManager = DBManager;
//# sourceMappingURL=connect.js.map