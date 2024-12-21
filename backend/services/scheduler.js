const cron = require('node-cron');
const { fetchFundData } = require('./rapidAPI');
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const updateFundNav = async () => {
    try {
        const portfolios = await prisma.portfolio.findMany({
            include: { funds: true },
        });
        for (const item of portfolios) {
            for (const fund of item.funds) {
                const fundData = await fetchFundData(fund.fundFamily);
                const updatedFund = fundData.find((f) => f.name === fund.name);

                if (updatedFund) {
                    await prisma.fund.update({
                        where: {id: fund.id},
                        data: {nav: updatedFund.nav},
                    });
                }
            }
        }
        console.log("funds updated.")
    } catch (e) {
        console.error("error in updating fund", e);
    }
}

// cron.schedule('0 * * * *', updateFundNav);

module.exports = cron.schedule('0 * * * *', updateFundNav);