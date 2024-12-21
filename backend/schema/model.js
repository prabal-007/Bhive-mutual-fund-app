const Fund = require('./models/Fund');

const saveFundsToDB = async () => {
  try {
    const data = await fetchAllFunds();
    const funds = data.data;

    await Fund.insertMany(funds); // Bulk insert into MongoDB
    console.log('Funds saved to database.');
  } catch (error) {
    console.error('Error saving funds to DB:', error.message);
  }
};

saveFundsToDB();
