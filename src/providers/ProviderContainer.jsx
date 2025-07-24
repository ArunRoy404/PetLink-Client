import AuthProvider from './AuthProvider';
import ThemeProvider from './ThemeProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient();

const ProviderContainer = ({ children }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </AuthProvider>
        </QueryClientProvider>
    );
};

export default ProviderContainer;