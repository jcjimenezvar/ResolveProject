import mongoose, { Schema } from "mongoose";

const model = mongoose.Schema;

const schema = new Schema({
  id: Number,
  neigborhood: String
});

const mongoModel = mongoose.model("AirB&B", schema);

exports = module.exports = mongoModel;
