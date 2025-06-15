const API_BASE_URL = 'http://localhost:5006/api';

export const createInvestor = async (investorData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/investors`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(investorData)
        });

        if (!response.ok) {
            throw new Error('Failed to create investor');
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating investor:', error);
        throw error;
    }
}; 