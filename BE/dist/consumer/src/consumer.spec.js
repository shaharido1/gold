// //
// //
// // const mockProd = new mockProd();
// // const consumser = new consumeer();
// //
// // before all =>
// // mockProd.init('qeueu_tst');
// // // push to entites (1 -199)
// //
// // consumser
// //
// //
// //
// //
// // afterAll => {
// //   mockProd - kill queue
// // }
// //
//
//
//
// import { RabbitAdapter } from '../../shared/rabbit/rabbit';
//
// describe("publisher DB methods", () => {
//   let rabbit : RabbitAdapter;
//   let mockProd : MockProd;
//   beforeAll( (done) => {
//     rabbit = new RabbitAdapter('test');
//     mockProd = new MockProd();
//     mockProd.init()
//     rabbit.initConnection().then( () => {
//       done();
//     })
//   });
//
//   afterAll((done) => {
//     // todo
//   });
//
//
//   it("should add mission to db", () => {
//     expect.assertions(2);
//     return missionMethod.add(missionToAdd).then(mission => {
//       expect(mission).toBeDefined();
//       if (mission) {
//         expect(mission._id).toBeDefined();
//       }
//     }).catch((err) => console.log(err));
//   });
//
//   it("should get mission from db", async () => {
//     expect.assertions(3);
//     const missionAdded = await missionMethod.add(missionToAdd);
//     expect(missionAdded._id).toBeDefined();
//     return missionMethod.get(missionAdded._id).then(mission => {
//       expect(mission).toBeDefined();
//       if (mission) {
//         expect(mission._id).toBeDefined();
//       }
//     }).catch((err) => console.log(err));
//   });
//
//   it("should get all mission from db", () => {
//     expect.assertions(2);
//     return missionMethod.getAll().then(missions => {
//       expect(missions).toBeDefined();
//       if (missions) {
//         expect(missions.length).toBeDefined();
//       }
//     }).catch((err) => console.log(err));
//   });
//
//   it("should remove mission from db", async (done) => {
//     expect.assertions(2);
//     const missionAdded = await missionMethod.add(missionToAdd);
//     expect(missionAdded._id).toBeDefined();
//     await missionMethod.remove(missionAdded._id);
//     return missionMethod.get(missionAdded._id)
//         .then(mission => expect(mission).toBeUndefined())
//         .catch(() => {
//           done();
//         });
//   });
//
//   it("should update mission from db", async (done) => {
//     expect.assertions(5);
//     const missionAdded = await missionMethod.add(missionToAdd);
//     expect(missionAdded._id).toBeDefined();
//     const newName = "test2";
//     missionAdded.name = newName;
//     const missionReturnFromUpdate = await missionMethod.update(missionAdded);
//     expect(missionReturnFromUpdate).toBeDefined();
//     expect(missionReturnFromUpdate.name).toEqual(newName);
//     const missionUpdated = await missionMethod.get(missionAdded._id);
//     expect(missionUpdated).toBeDefined();
//     expect(missionUpdated.name).toEqual(newName);
//     done();
//   });
//
//   it("should update mainField in mission from db", async (done) => {
//     expect.assertions(5);
//     const missionAdded = await missionMethod.add(missionToAdd);
//     expect(missionAdded._id).toBeDefined();
//     const fieldToUpdate = { name: "test2" };
//     const missionReturnFromUpdate = await missionMethod.updateField(missionAdded._id, fieldToUpdate);
//     expect(missionReturnFromUpdate).toBeDefined();
//     expect(missionReturnFromUpdate.name).toEqual(fieldToUpdate.name);
//     const missionUpdated = await missionMethod.get(missionAdded._id);
//     expect(missionUpdated).toBeDefined();
//     expect(missionUpdated.name).toEqual(fieldToUpdate.name);
//     done();
//   });
//
//   it("should remove mission from db", (done) => {
//     return missionMethod.removeAll().then(() => {
//       done();
//     }).catch((err) => console.log(err));
//   });
//
//
// });
//# sourceMappingURL=consumer.spec.js.map