const httpStatus = require('http-status');
const { Property } = require('../models');
const ApiError = require('../utils/ApiError');

const createProperty = async (propertyBody) => {
  return Property.create(propertyBody);
};

const queryProperties = async (filter, options) => {
  return Property.paginate(filter, options);
};

const getPropertyById = async (id) => {
  return Property.findById(id);
};

const updatePropertyById = async (propertyId, updateBody) => {
  const property = await getPropertyById(propertyId);
  if (!property) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Property not found');
  }
  Object.assign(property, updateBody);
  await property.save();
  return property;
};

/**
 * Delete property by id
 * @param {ObjectId} propertyId
 * @returns {Promise<Property>}
 */
const deletePropertyById = async (propertyId) => {
  const property = await getPropertyById(propertyId);
  if (!property) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Property not found');
  }
  await property.remove();
  return property;
};

module.exports = {
  createProperty,
  queryProperties,
  getPropertyById,
  updatePropertyById,
  deletePropertyById,
};
