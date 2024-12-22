import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getUserPortfolio, getFundFamilies, getSchemesByFamily } from '../servises/api';

const Dashboard = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [fundFamilies, setFundFamilies] = useState([]);
  const [selectedFamily, setSelectedFamily] = useState('');
  const [schemes, setSchemes] = useState([]);
  const [amount, setAmount] = useState('');
  const [schemeId, setSchemeId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    console.log("userId:", userId);

    const fetchPortfolio = async () => {
      if (userId) {
        try {
          const userPortfolio = await getUserPortfolio(userId);
        //   console.log("User Portfolio:", userPortfolio);
          setPortfolio(userPortfolio);
        } catch (error) {
          console.error("Error fetching portfolio:", error);
          alert("Failed to load portfolio.");
        }
      }
    };

    const fetchFundFamilies = async () => {
      try {
        const families = await getFundFamilies();
        // console.log("Fund Families:", families);
        setFundFamilies(families);
      } catch (error) {
        console.error("Error fetching fund families:", error);
        alert("Failed to load fund families.");
      }
    };

    fetchPortfolio();
    fetchFundFamilies();
  }, []);

  useEffect(() => {
    if (selectedFamily) {
      const fetchSchemes = async () => {
        try {
          const schemesData = await getSchemesByFamily(selectedFamily);
          setSchemes(schemesData);
        } catch (error) {
          console.error("Error fetching schemes:", error);
          alert("Failed to load schemes.");
        }
      };
      fetchSchemes();
    }
  }, [selectedFamily]);

  const handleAddInvestment = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert("Please log in first.");
      return;
    }

    try {
      await axios.post("http://localhost:3000/funds/portfolio/add", {
        userId,
        schemeId,
        investedAmount: amount,
      });
      alert("Investment added successfully!");

      const userPortfolio = await getUserPortfolio(userId);
      setPortfolio(userPortfolio);

      setAmount('');
      setSchemeId('');
      setSelectedFamily('');
    } catch (error) {
      console.error("Error adding investment:", error);
      alert("Failed to add investment.");
    }
  };

  return (
    <>
      <div className="bg-gray-50 min-h-screen flex items-center justify-center py-10">
        <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center text-blue-600">Welcome to Your Dashboard</h1>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800">Your Portfolio</h2>
            {portfolio.length === 0 ? (
              <p className="text-gray-600">Your portfolio space is empty.</p>
            ) : (
              <ul className="mt-4 space-y-4">
                {portfolio.map((investment, index) => (
                  <li key={index} className="border p-4 rounded-lg shadow-sm bg-gray-100">
                    <p className="text-lg font-semibold">{investment.schemeName}</p>
                    <p className="text-sm text-gray-600">Amount Invested: ₹{investment.investedAmount}</p>
                    <p className="text-sm text-gray-600">Current Value: ₹{investment.currentValue}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800">Add New Investment</h2>
            <div className="mt-4 space-y-4">
              <div className="flex flex-col">
                <label className="text-gray-700" htmlFor="fundFamily">Select Fund Family</label>
                <select
                  id="fundFamily"
                  className="border border-gray-300 rounded-md p-2 mt-2"
                  onChange={(e) => setSelectedFamily(e.target.value)}
                >
                  <option value="">Select Fund Family</option>
                  {fundFamilies.length === 0 ? (
                    <option disabled>Loading fund families...</option>
                  ) : (
                    fundFamilies.map((family) => (
                      <option key={family.rtaAgentCode} value={family.rtaAgentCode}>
                        {family.name}
                      </option>
                    ))
                  )}
                </select>
              </div>

              {selectedFamily && (
                <div className="flex flex-col">
                  <label className="text-gray-700" htmlFor="scheme">Select Scheme</label>
                  <select
                    id="scheme"
                    className="border border-gray-300 rounded-md p-2 mt-2"
                    onChange={(e) => setSchemeId(e.target.value)}
                  >
                    <option value="">Select Scheme</option>
                    {schemes.length === 0 ? (
                      <option disabled>Loading schemes...</option>
                    ) : (
                      schemes.map((scheme) => (
                        <option key={scheme.code} value={scheme.code}>
                          {scheme.name}
                        </option>
                      ))
                    )}
                  </select>
                </div>
              )}

              <div className="flex flex-col mt-4">
                <label className="text-gray-700" htmlFor="amount">Amount to Invest</label>
                <input
                  type="number"
                  id="amount"
                  className="border border-gray-300 rounded-md p-2 mt-2"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <button className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md mt-6" onClick={handleAddInvestment}>
                Add Investment
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
