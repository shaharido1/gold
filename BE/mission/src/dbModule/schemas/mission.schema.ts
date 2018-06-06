const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const missionTemplate = mongoose.Schema({
  name: String,
});


export const Mission = mongoose.model("mission", missionTemplate);
