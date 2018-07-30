//
//
//
//
//
// describe("test DB methods", () => {
//   let missionMethod;
//   const missionToAdd = {
//     name: "test1"
//   };
//
//   before(async (done) => {
//     // await DBManager.connect(dBTestConfig.url);
//     const initMission = await Mission.init();
//     missionMethod = new MissionMethods(initMission);
//     done();
//   });
//
//   after((done) => {
//     DBManager.disconnect(done);
//   });
//
//
//   it("should add missions to db", () => {
//     expect.assertions(2);
//     return missionMethod.add(missionToAdd).then(missions => {
//       expect(missions).toBeDefined();
//       if (missions) {
//         expect(missions._id).toBeDefined();
//       }
//     }).catch((err) => console.log(err));
//   });
//
//   it("should get missions from db", async () => {
//     expect.assertions(3);
//     const missionAdded = await missionMethod.add(missionToAdd);
//     expect(missionAdded._id).toBeDefined();
//     return missionMethod.get(missionAdded._id).then(missions => {
//       expect(missions).toBeDefined();
//       if (missions) {
//         expect(missions._id).toBeDefined();
//       }
//     }).catch((err) => console.log(err));
//   });
//
//   it("should get all missions from db", () => {
//     expect.assertions(2);
//     return missionMethod.getAll().then(missions => {
//       expect(missions).toBeDefined();
//       if (missions) {
//         expect(missions.length).toBeDefined();
//       }
//     }).catch((err) => console.log(err));
//   });
//
//   it("should remove missions from db", async (done) => {
//     expect.assertions(2);
//     const missionAdded = await missionMethod.add(missionToAdd);
//     expect(missionAdded._id).toBeDefined();
//     await missionMethod.remove(missionAdded._id);
//     return missionMethod.get(missionAdded._id)
//         .then(missions => expect(missions).toBeUndefined())
//         .catch(() => {
//           done();
//         });
//   });
//
//   it("should update missions from db", async (done) => {
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
//   it("should update field in missions from db", async (done) => {
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
//   it("should remove missions from db", (done) => {
//     return missionMethod.removeAll().then(() => {
//       done();
//     }).catch((err) => console.log(err));
//   });
//
//
// });
