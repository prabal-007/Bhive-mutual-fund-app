import { useState, useEffect } from 'react';
import { getSchemesByFamily } from '../servises/api';

const Schemes = ({ rtaAgentCode }) => {
    const [schemes, setSchemes] = useState([]);

    useEffect(() => {
        const fetchSchemes = async () => {
            if (rtaAgentCode) {
                const data = await getSchemesByFamily(rtaAgentCode);
                setSchemes(data);
            }
        };

        fetchSchemes();
    }, [rtaAgentCode]);

    return (
        <div>
            <h2>Available Schemes</h2>
            <ul>
                {schemes.length === 0 ? (
                    <li>No schemes available</li>
                ) : (
                    schemes.map((scheme, index) => (
                        <li key={index}>{scheme.name} - Minimum Investment: ₹{scheme.minimumInvestment}</li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default Schemes;
