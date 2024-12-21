const cron = require('node-cron');
const prismaClient = require('@prisma/client').PrismaClient;
const { fetchMutualFundData } = require('../services/rapidapi');
const prisma = new prismaClient();

cron.schedule('0 * * * *', async () => {
    console.log('Updating portfolio NAV hourly...');
    try {
        const portfolios = await prisma.Portfolio.findMany();

        for (const portfolio of portfolios) {
            const navData = await fetchMutualFundData(portfolio.schemeId);
            const currentNAV = navData.length ? navData[0].currentNAV : null;

            if (currentNAV) {
                await prisma.Portfolio.update({
                    where: { id: portfolio.id },
                    data: { currentNAV },
                });
            }
        }

        console.log('Portfolio NAVs updated successfully.');
    } catch (error) {
        console.error('Error updating portfolio NAVs:', error.message);
    }
});

module.exports = cron;
