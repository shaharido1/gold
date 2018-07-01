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
const mission_method_1 = require("../dbModule/methods/mission.method");
const mission_schema_1 = require("../dbModule/schemas/mission.schema");
const connect_1 = require("../dbModule/connect");
const config_1 = require("./config/config");
describe("publisher DB methods", () => {
    let missionMethod;
    const missionToAdd = {
        name: "test1"
    };
    beforeAll((done) => __awaiter(this, void 0, void 0, function* () {
        yield connect_1.DBManager.connect(config_1.DBTestConfig.url);
        const initMission = yield mission_schema_1.Mission.init();
        missionMethod = new mission_method_1.MissionMethods(initMission);
        done();
    }));
    afterAll((done) => {
        connect_1.DBManager.disconnect(done);
    });
    it("should add mission to db", () => {
        expect.assertions(2);
        return missionMethod.add(missionToAdd).then(mission => {
            expect(mission).toBeDefined();
            if (mission) {
                expect(mission._id).toBeDefined();
            }
        }).catch((err) => console.log(err));
    });
    it("should get mission from db", () => __awaiter(this, void 0, void 0, function* () {
        expect.assertions(3);
        const missionAdded = yield missionMethod.add(missionToAdd);
        expect(missionAdded._id).toBeDefined();
        return missionMethod.get(missionAdded._id).then(mission => {
            expect(mission).toBeDefined();
            if (mission) {
                expect(mission._id).toBeDefined();
            }
        }).catch((err) => console.log(err));
    }));
    it("should get all mission from db", () => {
        expect.assertions(2);
        return missionMethod.getAll().then(missions => {
            expect(missions).toBeDefined();
            if (missions) {
                expect(missions.length).toBeDefined();
            }
        }).catch((err) => console.log(err));
    });
    it("should remove mission from db", (done) => __awaiter(this, void 0, void 0, function* () {
        expect.assertions(2);
        const missionAdded = yield missionMethod.add(missionToAdd);
        expect(missionAdded._id).toBeDefined();
        yield missionMethod.remove(missionAdded._id);
        return missionMethod.get(missionAdded._id)
            .then(mission => expect(mission).toBeUndefined())
            .catch(() => {
            done();
        });
    }));
    it("should update mission from db", (done) => __awaiter(this, void 0, void 0, function* () {
        expect.assertions(5);
        const missionAdded = yield missionMethod.add(missionToAdd);
        expect(missionAdded._id).toBeDefined();
        const newName = "test2";
        missionAdded.name = newName;
        const missionReturnFromUpdate = yield missionMethod.update(missionAdded);
        expect(missionReturnFromUpdate).toBeDefined();
        expect(missionReturnFromUpdate.name).toEqual(newName);
        const missionUpdated = yield missionMethod.get(missionAdded._id);
        expect(missionUpdated).toBeDefined();
        expect(missionUpdated.name).toEqual(newName);
        done();
    }));
    it("should update field in mission from db", (done) => __awaiter(this, void 0, void 0, function* () {
        expect.assertions(5);
        const missionAdded = yield missionMethod.add(missionToAdd);
        expect(missionAdded._id).toBeDefined();
        const fieldToUpdate = { name: "test2" };
        const missionReturnFromUpdate = yield missionMethod.updateField(missionAdded._id, fieldToUpdate);
        expect(missionReturnFromUpdate).toBeDefined();
        expect(missionReturnFromUpdate.name).toEqual(fieldToUpdate.name);
        const missionUpdated = yield missionMethod.get(missionAdded._id);
        expect(missionUpdated).toBeDefined();
        expect(missionUpdated.name).toEqual(fieldToUpdate.name);
        done();
    }));
    it("should remove mission from db", (done) => {
        return missionMethod.removeAll().then(() => {
            done();
        }).catch((err) => console.log(err));
    });
});
//# sourceMappingURL=mission.method.test.js.map