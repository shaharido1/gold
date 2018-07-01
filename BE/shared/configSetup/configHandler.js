"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConfigHandler = /** @class */ (function () {
    function ConfigHandler(app) {
        app.get('/getConfig', function (req, res) {
            console.log(req.query.type);
            res.send('ok');
        });
    }
    return ConfigHandler;
}());
exports.ConfigHandler = ConfigHandler;
