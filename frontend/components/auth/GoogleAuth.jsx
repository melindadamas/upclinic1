import React from 'react';
import { Box, Button, Divider, Text, VStack, HStack, useColorModeValue, Icon } from '@chakra-ui/react';
import { FaGoogle } from 'react-icons/fa';

// Componente de botão de login com Google
const GoogleLoginButton = ({ onSuccess, onFailure, text = "Entrar com Google", isSignUp = false }) => {
  const handleGoogleLogin = () => {
    // Configuração do OAuth com as credenciais recebidas
    const clientId = "255336414400-b4t8cpgii65f63fkn7dudeont287vot9.apps.googleusercontent.com";
    
    // Determinar a URL de redirecionamento com base no ambiente
    const redirectUri = process.env.NODE_ENV === 'production'
      ? 'https://clinicupapp.com/auth/google/callback'
      : 'http://localhost:3000/auth/google/callback';
    
    // Escopos necessários para o login e acesso a informações básicas do perfil
    const scope = 'email profile';
    
    // Construir a URL de autorização
    const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&response_type=code&access_type=offline&prompt=consent`;
    
    // Redirecionar para a página de login do Google
    window.location.href = authUrl;
  };

  return (
    <Button
      w="full"
      maxW="400px"
      h="50px"
      variant="outline"
      colorScheme="gray"
      leftIcon={<Icon as={FaGoogle} color="red.500" boxSize={5} />}
      onClick={handleGoogleLogin}
      borderRadius="md"
      boxShadow="sm"
      _hover={{ bg: 'gray.50', transform: 'translateY(-2px)', boxShadow: 'md' }}
      transition="all 0.3s"
    >
      {text}
    </Button>
  );
};

// Componente de login completo com opção de email/senha e Google
const LoginForm = ({ onLogin, isSignUp = false }) => {
  const dividerColor = useColorModeValue('gray.300', 'gray.600');
  
  return (
    <VStack spacing={6} w="full" maxW="400px" mx="auto">
      {/* Formulário de login tradicional seria implementado aqui */}
      
      <HStack w="full">
        <Divider borderColor={dividerColor} />
        <Text fontSize="sm" color="gray.500" px={3} whiteSpace="nowrap">
          ou
        </Text>
        <Divider borderColor={dividerColor} />
      </HStack>
      
      <GoogleLoginButton 
        text={isSignUp ? "Cadastrar com Google" : "Entrar com Google"} 
        isSignUp={isSignUp}
      />
      
      <Text fontSize="xs" color="gray.500" textAlign="center">
        Ao continuar, você concorda com os Termos de Serviço e Política de Privacidade do UpClinic.
      </Text>
    </VStack>
  );
};

// Componente de modal de login
const LoginModal = ({ isOpen, onClose, onLogin, showSignUp = false }) => {
  const [isSignUp, setIsSignUp] = React.useState(showSignUp);
  
  return (
    <Box>
      <VStack spacing={8} p={6}>
        <Text fontSize="2xl" fontWeight="bold">
          {isSignUp ? "Criar uma conta" : "Entrar no UpClinic"}
        </Text>
        
        <LoginForm onLogin={onLogin} isSignUp={isSignUp} />
        
        <HStack>
          <Text fontSize="sm">
            {isSignUp ? "Já tem uma conta?" : "Não tem uma conta?"}
          </Text>
          <Button 
            variant="link" 
            colorScheme="brand" 
            fontSize="sm"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Entrar" : "Cadastre-se"}
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export { GoogleLoginButton, LoginForm, LoginModal };
