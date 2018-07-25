"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_1 = require("../src/dbModule/connect");
const supertest = require("supertest");
const { app, stop } = require("../src/server");
const mongoose = require("mongoose");
describe("test api", () => {
    let request;
    let server;
    beforeAll((done) => __awaiter(this, void 0, void 0, function* () {
        server = app.listen(done);
        request = supertest.agent(server);
    }));
    it("get test should return 200 OK", () => {
        return request.get("/test")
            .expect(200);
    });
    it("get test2 should return 404", () => {
        return request.get("/test2")
            .expect(404);
    });
    //
    // it("add entity", async(done) => {
    //   return await request(app)
    //       .post("/addMission")
    //       .set("Accept", "application/json")
    //       .send({mission: { name: "test3" }})
    //       // .expect((res => {
    //       //   assert(res.body, { name: 'test3' });
    //       // }))
    //       .then (res => res)
    //       // .end((err, res) => {
    //       //   console.log(err);
    //       //   done();
    //       // });
    //       .catch(err => err);
    // });
    afterAll((done) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield connect_1.DBManager.disconnect(done);
            const { missions } = mongoose.connection.collections;
            yield missions.conn.doClose(true, done);
            yield mongoose.disconnect();
            // await server.close();
            // await stop();
            // await request.server.close();
        }
        catch (e) {
            console.log(e);
        }
    }));
});
//# sourceMappingURL=api.test.js.map