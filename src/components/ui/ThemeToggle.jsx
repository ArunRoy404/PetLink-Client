import { Moon, Sun } from "lucide-react";
import { useThemeContext } from '../../context/ThemeContext';

const ThemeToggle = () => {
    const { isDark, setIsDark } = useThemeContext()

    
    return (
        <div>
            <div
                className='dark:rotate-45 max-w-max transition-all duration-300 cursor-pointer'
                onClick={() => setIsDark(e => !e)}>
                {
                    isDark
                        ? <Sun size={20} />
                        : <Moon size={20} />
                }
            </div>
        </div>
    );
};

export default ThemeToggle;