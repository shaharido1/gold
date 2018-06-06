import { DBManager } from "../dbModule/connect";
import { Mission } from "../dbModule/schemas/mission.schema";
const supertest = require("supertest");
const {app, stop} = require("../server");
const mongoose = require("mongoose");

describe("test api", () => {

  let request;
  let server;

  beforeAll(async(done) => {
    server = app.listen(done);
    request = supertest.agent(server)

  });


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

  afterAll(async (done) => {
    try {
      await DBManager.disconnect(done);
      const {missions} = mongoose.connection.collections;
      await missions.conn.doClose(true, done);
      await mongoose.disconnect();
      // await server.close();
      // await stop();
      // await request.server.close();
    }
    catch (e) {
      console.log(e);
    }
  });


});

