const axios = require('axios');
const { propertyService } = require('../services');

const fetchProperties = async (day) => {
  const { data } = await axios({
    method: 'get',
    url: 'https://test-leadev.osc-fr1.scalingo.io/citimaImmo',
    headers: {
      'api-key': process.env.API_KEY,
    },
    params: {
      day,
    },
  });
  data.forEach((property) => {
    propertyService.updateProperty(property);
  });
};

module.exports = {
  fetchProperties,
};
