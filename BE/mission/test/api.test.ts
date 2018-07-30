import { DBManager } from '../src/dbModule/connect';
const supertest = require('supertest');
const { app, stop } = require('../src/server');
const mongoose = require('mongoose');

describe('publisher api', () => {

  let request;
  let server;

  before(async(done) => {
    server = app.listen(done);
    request = supertest.agent(server);

  });

  it('get publisher should return 200 OK', () => {
    return request.get('/publisher')
        .expect(200);
  });
  it('get test2 should return 404', () => {
    return request.get('/test2')
        .expect(404);
  });
  //
  // it("add entity", async(done) => {
  //   return await request(app)
  //       .post("/addMission")
  //       .set("Accept", "application/json")
  //       .send({missions: { name: "test3" }})
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
      const { missions } = mongoose.connection.collections;
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
