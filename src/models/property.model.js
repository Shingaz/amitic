const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const localizationSchema = mongoose.Schema({
  postalCode: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const summarySchema = mongoose.Schema({
  localization: {
    type: localizationSchema,
  },
  surface: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rooms: {
    type: Number,
    required: true,
  },
  property: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const propertySchema = mongoose.Schema({
  businessId: {
    type: String,
    required: true,
  },
  publisherReference: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  summary: {
    type: summarySchema,
  },
});

// add plugin that converts mongoose to json
propertySchema.plugin(toJSON);
propertySchema.plugin(paginate);


propertySchema.index({ businessId: 1, 'summary.localization': 1, 'summary.surface': 1 }, { unique: true });

/**
 * @typedef Property
 */
const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
