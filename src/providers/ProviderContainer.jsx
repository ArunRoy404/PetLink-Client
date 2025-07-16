import AuthProvider from './AuthProvider';
import ThemeProvider from './ThemeProvider';


const ProviderContainer = ({ children }) => {
    return (
        <AuthProvider>
            <ThemeProvider>
                {children}
            </ThemeProvider>
        </AuthProvider>
    );
};

export default ProviderContainer;