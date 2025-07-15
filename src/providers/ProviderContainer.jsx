import { ThemeProvider } from '@material-tailwind/react';
import AuthProvider from './AuthProvider';

const customTheme = {
    button: {
        defaultProps: {
            color: "primary",
            variant: "filled",
        },
        styles: {
            base: {
                initial: {
                    fontWeight: "font-medium",
                    borderRadius: "rounded-lg",
                },
            },
        },
    },
    input: {
        defaultProps: {
            color: "primary",
            variant: "outlined",
        },
    },
};



const ProviderContainer = ({ children }) => {
    return (
        <AuthProvider>
            <ThemeProvider value={customTheme}>
                {children}
            </ThemeProvider>
        </AuthProvider>
    );
};

export default ProviderContainer;