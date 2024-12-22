import { useState, useEffect } from 'react';
import { getUserPortfolio } from '../servises/api';

const Portfolio = ({ userId }) => {
    const [portfolio, setPortfolio] = useState([]);

    useEffect(() => {
        const fetchPortfolio = async () => {
            const data = await getUserPortfolio(userId);
            setPortfolio(data);
        };

        fetchPortfolio();
    }, [userId]);

    return (
        <div>
            <h2>Your Portfolio</h2>
            <ul>
                {portfolio.length === 0 ? (
                    <li>No portfolio items found</li>
                ) : (
                    portfolio.map((item, index) => (
                        <li key={index}>
                            {item.schemeName} - ₹{item.investedAmount} - Current NAV: ₹{item.currentNAV || 'N/A'}
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default Portfolio;
