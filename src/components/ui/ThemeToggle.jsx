import React from 'react';
import { Moon, Sun } from "lucide-react";
import useDarkMode from '../../hooks/useDarkMode';

const ThemeToggle = () => {

    const [isDark, setIsDark] = useDarkMode()
    return (
        <div>
            <div
                className='dark:rotate-45 max-w-max transition-all duration-300 cursor-pointer'
                onClick={() => setIsDark(e => !e)}>
                {
                    isDark
                        ? <Sun size={10} />
                        : <Moon size={10} />
                }
            </div>
        </div>
    );
};

export default ThemeToggle;