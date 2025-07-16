import React, { useEffect, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const ThemeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(() => {
        return localStorage.theme === "dark" ||
            (!("theme" in localStorage) &&
                window.matchMedia("(prefers-color-scheme: dark)").matches)
            ? true
            : false;
    })

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add("dark");
            localStorage.theme = "dark"
        } else {
            document.documentElement.classList.remove("dark")
            localStorage.theme = "light"
        }
    }, [isDark])


    const themeData = {
        isDark,
        setIsDark
    }

    return (
        <ThemeContext value={themeData}>
            {children}
        </ThemeContext>
    );
};

export default ThemeProvider;