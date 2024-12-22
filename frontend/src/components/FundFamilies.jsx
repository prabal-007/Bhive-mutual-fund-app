import { useState, useEffect } from 'react';
import { getFundFamilies } from '../servises/api';

const FundFamilies = ({ onSelectFamily }) => {
    const [fundFamilies, setFundFamilies] = useState([]);

    useEffect(() => {
        const fetchFundFamilies = async () => {
            const families = await getFundFamilies();
            setFundFamilies(families);
        };

        fetchFundFamilies();
    }, []);

    return (<>
        <div>
            <h2>Select a Fund Family</h2>
            <ul>
                {fundFamilies.map((family, index) => (
                    <li key={index} onClick={() => onSelectFamily(family.rtaAgentCode)}>
                        {family.name}
                    </li>
                ))}
            </ul>
        </div>
    </>
    );
};

export default FundFamilies;
