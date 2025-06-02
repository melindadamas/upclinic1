import React from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import theme from './styles/theme';

// Páginas principais
import HomePage from './pages/HomePage';
import PlansPage from './pages/PlansPage';
import CheckoutPage from './pages/CheckoutPage';
import ConfirmationPage from './pages/ConfirmationPage';
import OnboardingScreen from './pages/OnboardingScreen';
import GoogleAuthSuccessPage from './pages/GoogleAuthSuccessPage';
import TestGoogleAuthPage from './pages/TestGoogleAuthPage';
import ManualDigitalPage from './pages/ManualDigitalPage';

// Componentes de autenticação
import { AuthProvider } from './contexts/AuthContext';
import { SubscriptionProvider } from './contexts/SubscriptionContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Componentes de administração
import AdminLoginPage from './components/admin/AdminLoginPage';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminRoute from './components/admin/AdminRoute';

// Componente de rodapé com link para admin
import Footer from './components/layout/Footer';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <SubscriptionProvider>
          <ThemeProvider>
            <Router>
              <Box minH="100vh" display="flex" flexDirection="column">
                <Box flex="1">
                  <Routes>
                    {/* Rotas públicas */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/planos" element={<PlansPage />} />
                    <Route path="/checkout/:planId" element={<CheckoutPage />} />
                    <Route path="/confirmacao" element={<ConfirmationPage />} />
                    <Route path="/auth/google/success" element={<GoogleAuthSuccessPage />} />
                    <Route path="/auth/test" element={<TestGoogleAuthPage />} />
                    
                    {/* Rotas protegidas (requer login) */}
                    <Route 
                      path="/onboarding" 
                      element={
                        <ProtectedRoute>
                          <OnboardingScreen />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/manual" 
                      element={
                        <ProtectedRoute>
                          <ManualDigitalPage />
                        </ProtectedRoute>
                      } 
                    />
                    
                    {/* Rotas de administração (acesso restrito) */}
                    <Route path="/admin/login" element={<AdminLoginPage />} />
                    <Route 
                      path="/admin/dashboard" 
                      element={
                        <AdminRoute>
                          <AdminDashboard />
                        </AdminRoute>
                      } 
                    />
                  </Routes>
                </Box>
                <Footer />
              </Box>
            </Router>
          </ThemeProvider>
        </SubscriptionProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
