import { useEffect, useState } from "react";

const useDarkMode = () => {

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

    return [isDark, setIsDark]
};

export default useDarkMode;