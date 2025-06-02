import React, { useState, useEffect } from 'react';
import { Box, Container, Heading, Text, VStack, HStack, Button, Alert, AlertIcon, useToast } from '@chakra-ui/react';
import { GoogleLoginButton } from '../components/auth/GoogleAuth';

// Componente para testar o fluxo de login com Google
const TestGoogleAuthPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();

  // Verificar se o usuário já está autenticado ao carregar a página
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Verificar se há um token JWT no localStorage
        const token = localStorage.getItem('upclinic_token');
        
        if (!token) {
          setIsLoading(false);
          return;
        }
        
        // Verificar a validade do token no backend
        const response = await fetch('/auth/verify', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        const data = await response.json();
        
        if (data.authenticated) {
          setIsAuthenticated(true);
          setUser(data.user);
        } else {
          // Token inválido, remover do localStorage
          localStorage.removeItem('upclinic_token');
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        setError('Não foi possível verificar seu status de autenticação');
        // Token inválido ou erro de conexão, remover do localStorage
        localStorage.removeItem('upclinic_token');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // Verificar se há parâmetros de autenticação na URL (após redirecionamento do Google)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const errorMessage = urlParams.get('message');
    
    if (token) {
      // Salvar o token no localStorage
      localStorage.setItem('upclinic_token', token);
      
      // Limpar a URL
      window.history.replaceState({}, document.title, window.location.pathname);
      
      // Verificar a autenticação novamente
      setIsLoading(true);
      
      toast({
        title: 'Login realizado com sucesso!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      
      // Recarregar a página para verificar a autenticação
      window.location.reload();
    }
    
    if (errorMessage) {
      setError(decodeURIComponent(errorMessage));
      
      // Limpar a URL
      window.history.replaceState({}, document.title, window.location.pathname);
      
      toast({
        title: 'Erro de autenticação',
        description: decodeURIComponent(errorMessage),
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [toast]);

  // Função para realizar logout
  const handleLogout = async () => {
    try {
      await fetch('/auth/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('upclinic_token')}`
        }
      });
      
      // Remover o token do localStorage
      localStorage.removeItem('upclinic_token');
      
      // Atualizar o estado
      setIsAuthenticated(false);
      setUser(null);
      
      toast({
        title: 'Logout realizado com sucesso!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Erro ao realizar logout:', error);
      
      toast({
        title: 'Erro ao realizar logout',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="xl" textAlign="center">
          Teste de Autenticação com Google
        </Heading>
        
        <Text textAlign="center">
          Esta página permite testar o fluxo completo de login/cadastro com Google no UpClinic.
        </Text>
        
        {error && (
          <Alert status="error" borderRadius="md">
            <AlertIcon />
            {error}
          </Alert>
        )}
        
        <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="md">
          {isLoading ? (
            <Text textAlign="center">Verificando autenticação...</Text>
          ) : isAuthenticated ? (
            <VStack spacing={4} align="stretch">
              <Heading as="h2" size="md">
                Usuário Autenticado
              </Heading>
              
              <Box p={4} bg="gray.50" borderRadius="md">
                <Text><strong>Nome:</strong> {user?.name}</Text>
                <Text><strong>Email:</strong> {user?.email}</Text>
              </Box>
              
              <Button colorScheme="red" onClick={handleLogout}>
                Sair
              </Button>
            </VStack>
          ) : (
            <VStack spacing={6}>
              <Heading as="h2" size="md">
                Faça login para testar
              </Heading>
              
              <GoogleLoginButton text="Entrar com Google" />
              
              <HStack>
                <Button variant="outline" colorScheme="brand" size="sm">
                  Voltar para a página inicial
                </Button>
              </HStack>
            </VStack>
          )}
        </Box>
        
        <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="md">
          <Heading as="h2" size="md" mb={4}>
            Instruções de Teste
          </Heading>
          
          <VStack spacing={3} align="stretch">
            <Text>
              <strong>1.</strong> Clique no botão "Entrar com Google" acima.
            </Text>
            <Text>
              <strong>2.</strong> Você será redirecionado para a página de login do Google.
            </Text>
            <Text>
              <strong>3.</strong> Após autenticar com sua conta Google, você será redirecionado de volta para esta página.
            </Text>
            <Text>
              <strong>4.</strong> Se a autenticação for bem-sucedida, você verá suas informações de usuário.
            </Text>
            <Text>
              <strong>5.</strong> Você pode clicar em "Sair" para testar o fluxo de logout.
            </Text>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default TestGoogleAuthPage;
