import AuthProvider from './AuthProvider';

const ProviderContainer = ({ children }) => {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
};

export default ProviderContainer;