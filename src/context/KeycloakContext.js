import React, { createContext, useContext, useState } from 'react';

const KeycloakContext = createContext(null);

export const KeycloakProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [keycloak, setKeycloak] = useState({
        tokenParsed: {
            given_name: 'Admin',
            family_name: 'User',
            email: 'admin@example.com'
        }
    });

    const login = async () => {
        // Simulate login
        setAuthenticated(true);
    };

    const logout = () => {
        // Simulate logout
        setAuthenticated(false);
    };

    return (
        <KeycloakContext.Provider value={{ keycloak, authenticated, login, logout }}>
            {children}
        </KeycloakContext.Provider>
    );
};

export const useKeycloak = () => {
    const context = useContext(KeycloakContext);
    if (!context) {
        throw new Error('useKeycloak must be used within a KeycloakProvider');
    }
    return context;
}; 