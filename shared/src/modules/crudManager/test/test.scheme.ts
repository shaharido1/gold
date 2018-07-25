import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
const testTemplate = mongoose.Schema({
  name: String
});

export const Test = mongoose.model('test', testTemplate);
