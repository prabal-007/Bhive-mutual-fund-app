const axios = require('axios')

const API_URL = 'https://latest-mutual-fund-nav.p.rapidapi.com/fundfamily/';
const API_KEY = process.env.RAPIDAPI_KEY;

const fetchFundData = async (fundFamily) => {
    try {
        const response = await axios.get(`${API_URL}${fundFamily}`, {
            headers: {
                'x-rapidapi-key': API_KEY,
                'x-rapidapi-host': 'latest-mutual-fund-nav.p.rapidapi.com'
            },
        });
        return response.data;
    } catch (e) {
        console.error('error : ', e);
        throw new Error("Falied to fatch")
    }
}

module.exports = { fetchFundData };