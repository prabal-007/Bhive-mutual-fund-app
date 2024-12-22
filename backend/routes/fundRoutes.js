const express = require('express');
const axios = require('axios');
const prisma = require('@prisma/client');
const { PrismaClient } = prisma;
const prismaClient = new PrismaClient();
const { fetchMutualFundData } = require('../services/rapidapi');

require('../services/scheduler');

const router = express.Router();
const RAPIDAPI_HOST = process.env.RAPIDAPI_HOST;
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;

router.get('/schemes', async (req, res) => {
    const { rtaAgentCode } = req.query;

    if (!rtaAgentCode) {
        return res.status(400).json({ message: 'RTA Agent Code is required' });
    }

    try {
        const data = await fetchMutualFundData(rtaAgentCode);

        const openEndedSchemes = data
            .filter(
                (scheme) =>
                    scheme.Purchase_Allowed === true &&
                    scheme.Redemption_Allowed === true
            )
            .map((scheme) => ({
                name: scheme.Scheme_Name,
                code: scheme.Scheme_Code,
                minimumInvestment: scheme.Minimum_Purchase_Amount,
            }));

        res.status(200).json(openEndedSchemes);
    } catch (error) {
        console.error('Error fetching schemes:', error.message);
        res.status(500).json({ error: 'Failed to fetch mutual fund schemes' });
    }
});

router.get('/families', async (req, res) => {
    const options = {
        method: 'GET',
        url: `https://${RAPIDAPI_HOST}/master`,
        headers: {
            'x-rapidapi-key': RAPIDAPI_KEY,
            'x-rapidapi-host': RAPIDAPI_HOST,
        },
    };

    try {
        const response = await axios.request(options);
        const families = response.data.map((fund) => ({
            name: fund.AMC_Code,
            rtaAgentCode: fund.RTA_Agent_Code,
        }));
        res.json(families);
    } catch (error) {
        console.error('Error fetching fund families:', error);
        res.status(500).json({ error: 'Failed to fetch fund families.' });
    }
});

// Add portfolio item
router.post('/portfolio/add', async (req, res) => {
    const { userId, schemeId, schemeName, investedAmount } = req.body;

    if (!userId || !schemeId || !schemeName || !investedAmount) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const newPortfolioItem = await prismaClient.Portfolio.create({
            data: {
                userId,
                schemeId,
                schemeName,
                investedAmount,
            },
        });
        res.status(201).json(newPortfolioItem);
    } catch (error) {
        console.error('Error saving portfolio item:', error);
        res.status(500).json({ error: 'Failed to save portfolio item.' });
    }
});

router.get('/portfolio/user/:userId', async (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        const portfolioItems = await prismaClient.Portfolio.findMany({
            where: { userId: parseInt(userId, 10) },
        });

        if (!portfolioItems.length) {
            return res.status(404).json({ message: 'Portfolio is empty for this user.' });
        }

        // ser portfolio with current NAV data
        const enrichedPortfolio = await Promise.all(
            portfolioItems.map(async (item) => {
                const navData = await fetchMutualFundData(item.schemeId);
                const currentNAV = navData.length ? navData[0].currentNAV : null;

                return {
                    ...item,
                    currentNAV,
                };
            })
        );

        res.status(200).json(enrichedPortfolio);
    } catch (error) {
        console.error('Error fetching portfolio:', error);
        res.status(500).json({ error: 'Failed to fetch portfolio.' });
    }
});

// Fetch current NAV for a specific scheme
router.get('/nav/:schemeCode', async (req, res) => {
    const { schemeCode } = req.params;

    if (!schemeCode) {
        return res.status(400).json({ error: 'Scheme Code is required' });
    }

    try {
        const options = {
            method: 'GET',
            url: `https://${RAPIDAPI_HOST}/latest`,
            params: {
                schemeCode: schemeCode,
            },
            headers: {
                'x-rapidapi-key': RAPIDAPI_KEY,
                'x-rapidapi-host': RAPIDAPI_HOST,
            },
        };

        const response = await axios.request(options);

        if (response.data && response.data.length > 0) {
            const scheme = response.data.find(item => item.Scheme_Code === schemeCode);
            if (scheme) {
                res.status(200).json(scheme);
            } else {
                res.status(404).json({ error: 'Scheme not found' });
            }
        } else {
            res.status(404).json({ error: 'No data available for this scheme' });
        }
    } catch (error) {
        console.error('Error fetching NAV:', error.message);
        res.status(500).json({ error: 'Failed to fetch NAV for scheme' });
    }
});

module.exports = router;