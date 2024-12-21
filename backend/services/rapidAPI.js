const axios = require('axios');

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const RAPIDAPI_HOST =process.env.RAPIDAPI_HOST

const fetchMutualFundData = async (rtaAgentCode) => {
  const options = {
    method: 'GET',
    url: `https://${RAPIDAPI_HOST}/master`,
    params: {
      RTA_Agent_Code: rtaAgentCode,
    },
    headers: {
      'x-rapidapi-key': RAPIDAPI_KEY,
      'x-rapidapi-host': RAPIDAPI_HOST,
    },
  };

  try {
    const response = await axios.request(options);
    console.log('Raw Data from RapidAPI:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching mutual fund data:', error.message);
    throw new Error('Unable to fetch mutual fund data');
  }
};


const fetchLatestNAV = async (schemeCode) => {
  try {
    const response = await axios.get('https://latest-mutual-fund-nav.p.rapidapi.com/latest', {
      params: { schemeCode },
      headers: {
        'x-rapidapi-key': 'your-api-key',
        'x-rapidapi-host': 'latest-mutual-fund-nav.p.rapidapi.com',
      },
    });

    if (response.data) {
      return response.data;
    } else {
      throw new Error('No data returned from /latest endpoint.');
    }
  } catch (error) {
    console.error(`Error fetching latest NAV for scheme ${schemeCode}:`, error.message);
    throw error;
  }
};


const fetchMasterData = async (rtaAgentCode) => {
  try {
    const response = await axios.get('https://latest-mutual-fund-nav.p.rapidapi.com/master', {
      params: { RTA_Agent_Code: rtaAgentCode },
      headers: {
        'x-rapidapi-key': 'your-api-key',
        'x-rapidapi-host': 'latest-mutual-fund-nav.p.rapidapi.com',
      },
    });

    if (response.data) {
      return response.data;
    } else {
      throw new Error('No data returned from /master endpoint.');
    }
  } catch (error) {
    console.error(`Error fetching master data for agent ${rtaAgentCode}:`, error.message);
    throw error;
  }
};


const fetchHistoricNAV = async (schemeCode, startDate, endDate) => {
  try {
    const response = await axios.get('https://latest-mutual-fund-nav.p.rapidapi.com/historic', {
      params: { schemeCode, startDate, endDate },
      headers: {
        'x-rapidapi-key': 'your-api-key',
        'x-rapidapi-host': 'latest-mutual-fund-nav.p.rapidapi.com',
      },
    });

    if (response.data) {
      return response.data;
    } else {
      throw new Error('No data returned from /historic endpoint.');
    }
  } catch (error) {
    console.error(`Error fetching historic NAV for scheme ${schemeCode}:`, error.message);
    throw error;
  }
};

module.exports = {
  fetchMutualFundData,
};
