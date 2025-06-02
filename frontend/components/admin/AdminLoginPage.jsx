import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
  Alert,
  AlertIcon,
  AlertDescription,
  useToast,
  InputGroup,
  InputRightElement,
  IconButton
} from '@chakra-ui/react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

/**
 * Página de login para o painel administrativo restrito
 * Acesso exclusivo para gestores do sistema
 */
const AdminLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  // Função para alternar visibilidade da senha
  const handleTogglePassword = () => setShowPassword(!showPassword);

  // Função para lidar com o login
  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Validação básica
    if (!username || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      // Em produção, isso seria uma chamada à API
      // Simulação de verificação de credenciais
      setTimeout(() => {
        // Credenciais fixas para demonstração
        // Em produção, isso seria validado no backend
        if (username === 'admin' && password === 'upclinic2025') {
          // Login bem-sucedido
          localStorage.setItem('adminToken', 'admin-token-example');
          
          toast({
            title: 'Login realizado com sucesso',
            description: 'Bem-vindo ao painel administrativo',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          
          // Redireciona para o painel administrativo
          navigate('/admin/dashboard');
        } else {
          // Credenciais inválidas
          setError('Usuário ou senha inválidos');
          setLoading(false);
        }
      }, 1000);
    } catch (err) {
      setError('Erro ao realizar login. Tente novamente.');
      setLoading(false);
    }
  };

  return (
    <Container maxW="md" py={12}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading size="lg" mb={2}>Painel Administrativo</Heading>
          <Text color="gray.600">Acesso restrito para gestores do UpClinic</Text>
        </Box>
        
        {error && (
          <Alert status="error" borderRadius="md">
            <AlertIcon />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <Box as="form" onSubmit={handleLogin}>
          <VStack spacing={4}>
            <FormControl id="username" isRequired>
              <FormLabel>Usuário</FormLabel>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Digite seu usuário"
              />
            </FormControl>
            
            <FormControl id="password" isRequired>
              <FormLabel>Senha</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite sua senha"
                />
                <InputRightElement>
                  <IconButton
                    aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                    icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                    variant="ghost"
                    onClick={handleTogglePassword}
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>
            
            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              width="full"
              mt={4}
              isLoading={loading}
              loadingText="Entrando..."
            >
              Entrar
            </Button>
          </VStack>
        </Box>
        
        <Text fontSize="sm" color="gray.500" textAlign="center">
          Este é um acesso restrito para administradores do sistema.
          <br />
          Se você é um usuário do UpClinic, por favor utilize a página de login principal.
        </Text>
      </VStack>
    </Container>
  );
};

export default AdminLoginPage;
