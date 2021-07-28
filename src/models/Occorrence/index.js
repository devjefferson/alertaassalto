const mongoose = require('mongoose');

const OccorrenceSchema = new mongoose.Schema({
  category: {
    type: String,
    lowercase: true,
    //required: true
  },
  city: {
    type: String,
    lowercase: true,
  },
  cor: {
    type: String,
    lowercase: true,
  },
  country: {
    type: String,
    lowercase: true,
  },
  dateOcorrence: {
    type: Date,
  },
  death: {
    type: Boolean,
  },
  detalhes: {
    type: String,
    lowercase: true,
  },
  district: {
    type: String,
    lowercase: true,
  },
  isoCountryCode: {
    type: String,
  },
  latitude: {
    type: Number,

  },
  longitude: {
    type: Number,
  },
  name: {
    type: String | Number
  },
  placa: {
    type: String,
  },
  postalCode: {
    type: String,
  },
  region: {
    type: String,
    lowercase: true,
  },
  street: {
    type: String,
  },
  subcategory: {
    type: String,
    lowercase: true,
  },
  subregion: {
    type: String,
    lowercase: true,
  },
  timezone: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  type:{
    type: String,
    lowercase: true
  },
  userCreate: {
    type: String,
    ref: "users"
  },
})

module.exports = mongoose.model('occorrence', OccorrenceSchema)