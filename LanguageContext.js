import React, { createContext, useContext, useState, useEffect } from 'react';
import i18n from './i18n'; // Ensure i18n is configured

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [selectedLanguage, setSelectedLanguage] = useState('en'); // Default to 'en'


    useEffect(() => {
        const initializeLanguage = () => {
            let initialLanguage = ''; // Default language

            if (global.userLanguagetype) {
                initialLanguage = global.userLanguagetype.startsWith('en') ? 'Eng' : 'Chaini';
                // initialLanguage = global.userLanguagetype.startsWith('en') ? 'Chaini' : 'Eng';
            }

            console.log('Initializing Language:', initialLanguage); // Debugging line
            setSelectedLanguage(initialLanguage);
            i18n.changeLanguage(initialLanguage);
        };

        initializeLanguage();
    }, []);

    return (
        <LanguageContext.Provider value={{ selectedLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
