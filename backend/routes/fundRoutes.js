const express = require('express');
const { fetchFundData } = require('../services/rapidAPI');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();

router.get('/', (req, res) => {
    res.json({msg: 'funds data'});
});

router.get('/funds/:family', async (req, res) => {
    const {family} = req.params;

    try {
        const fundData = await fetchFundData(family);
        res.status(200).json({data : fundData});
    } catch (e) {
        res.status(500).json({mgs: "error in fatching data"});
    }
});

router.post('portfolio/:userId', async (req, res) => {
    const { userId } = req.params;
    const { name, nav, fundFamily } = req.body;

    try {
        const portfolio = await prisma.portfolio.create({
            data: {
                userId: parseInt(userId),
                name: `${fundFamily} Portfolio`,
                funds: {
                    create: {
                        name,
                        nav: parseInt(nav),
                        fundFamily,
                    },
                }
            }
        })
        res.status(200).json({meg: "funds added", portfolio});
    } catch (e) {
        res.status(500).json({msg: 'Err saving fund', error});
    }
});

module.exports = router;