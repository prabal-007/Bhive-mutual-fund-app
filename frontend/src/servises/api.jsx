import axios from 'axios';

const API_URL = 'http://localhost:3000/';

export const getFundFamilies = async () => {
    try {
        const token = localStorage.getItem('token');
console.log('Token:', token);
        const response = await axios.get('http://localhost:3000/funds/families', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        console.log("res : ", response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching fund families', error);
        return [];
    }
};

export const getSchemesByFamily = async (rtaAgentCode) => {
    try {
        const response = await axios.get(`${API_URL}funds/schemes`, {
            params: { rtaAgentCode }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching schemes', error);
        return [];
    }
};

export const getUserPortfolio = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}funds/portfolio/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user portfolio', error);
        return [];
    }
};
