import React from 'react';
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  VStack, 
  Button, 
  Image, 
  Flex, 
  Icon, 
  List, 
  ListItem, 
  ListIcon,
  SimpleGrid,
  useColorModeValue
} from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { FaCheckCircle, FaEnvelope, FaBook, FaVideo, FaRocket } from 'react-icons/fa';

const ConfirmationPage = () => {
  const location = useLocation();
  const { plan, billing, trial, email } = location.state || {};
  
  // Dados dos planos
  const planData = {
    plus: {
      name: 'Plus',
      color: 'brand.500'
    },
    pro: {
      name: 'Pro',
      color: 'brand.600'
    },
    master: {
      name: 'Master',
      color: 'gray.800'
    }
  };
  
  const selectedPlan = planData[plan] || planData.plus;
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  
  return (
    <Box py={16}>
      <Container maxW="container.lg">
        <VStack spacing={12} align="center">
          {/* Confirmação */}
          <Box 
            textAlign="center" 
            bg={bgColor} 
            p={10} 
            borderRadius="xl" 
            boxShadow="xl"
            w="full"
          >
            <Icon as={FaCheckCircle} w={20} h={20} color="green.500" mb={6} />
            
            <Heading as="h1" size="xl" mb={4}>
              {trial 
                ? 'Seu teste gratuito foi ativado!' 
                : 'Sua assinatura foi confirmada!'}
            </Heading>
            
            <Text fontSize="lg" mb={6}>
              {trial 
                ? `Parabéns! Você agora tem acesso ao plano ${selectedPlan.name} por 7 dias gratuitamente.` 
                : `Parabéns! Você agora tem acesso ao plano ${selectedPlan.name} do UpClinic.`}
            </Text>
            
            <Flex 
              justify="center" 
              align="center" 
              bg="white" 
              p={4} 
              borderRadius="md" 
              boxShadow="md"
              mb={8}
            >
              <Icon as={FaEnvelope} mr={3} color="brand.500" />
              <Text>
                Enviamos um email de confirmação para <strong>{email || 'seu email'}</strong>
              </Text>
            </Flex>
            
            <Button 
              as={RouterLink} 
              to="/login" 
              size="lg" 
              colorScheme="brand" 
              px={8}
            >
              Acessar o UpClinic
            </Button>
          </Box>
          
          {/* Manual Digital */}
          <Box w="full">
            <Flex 
              direction={{ base: 'column', md: 'row' }} 
              align="center" 
              justify="space-between"
              bg="brand.50" 
              p={8} 
              borderRadius="xl" 
              boxShadow="md"
              gap={8}
            >
              <Box flex="1">
                <Heading as="h2" size="lg" mb={4} color="brand.700">
                  <Icon as={FaBook} mr={2} />
                  Manual Digital Completo
                </Heading>
                
                <Text fontSize="md" mb={6}>
                  Enviamos para seu email um manual digital completo com todas as informações necessárias para você aproveitar ao máximo o UpClinic.
                </Text>
                
                <List spacing={3} mb={6}>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    Guia passo a passo de todas as funcionalidades
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    Vídeos tutoriais para cada módulo
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    Dicas e melhores práticas
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    FAQ detalhado
                  </ListItem>
                </List>
                
                <Button 
                  leftIcon={<FaBook />} 
                  colorScheme="brand" 
                  variant="outline"
                >
                  Baixar Manual Digital
                </Button>
              </Box>
              
              <Box 
                flex="1" 
                maxW={{ base: '100%', md: '300px' }}
                borderRadius="md" 
                overflow="hidden"
                boxShadow="lg"
              >
                <Image 
                  src="/manual-preview.png" 
                  alt="Manual Digital UpClinic" 
                  fallbackSrc="https://via.placeholder.com/300x400?text=Manual+Digital"
                />
              </Box>
            </Flex>
          </Box>
          
          {/* Próximos Passos */}
          <Box w="full">
            <Heading as="h2" size="lg" mb={8} textAlign="center">
              Próximos Passos
            </Heading>
            
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
              <VStack 
                p={6} 
                bg="white" 
                borderRadius="xl" 
                boxShadow="md"
                spacing={4}
                align="flex-start"
              >
                <Flex 
                  w={12} 
                  h={12} 
                  bg="brand.100" 
                  color="brand.700" 
                  borderRadius="full" 
                  justify="center" 
                  align="center"
                >
                  <Text fontWeight="bold" fontSize="xl">1</Text>
                </Flex>
                
                <Heading as="h3" size="md">
                  Faça Login
                </Heading>
                
                <Text>
                  Acesse o UpClinic com o email e senha que você cadastrou durante o processo de assinatura.
                </Text>
                
                <Button 
                  as={RouterLink} 
                  to="/login" 
                  variant="ghost" 
                  colorScheme="brand" 
                  size="sm"
                >
                  Acessar agora
                </Button>
              </VStack>
              
              <VStack 
                p={6} 
                bg="white" 
                borderRadius="xl" 
                boxShadow="md"
                spacing={4}
                align="flex-start"
              >
                <Flex 
                  w={12} 
                  h={12} 
                  bg="brand.100" 
                  color="brand.700" 
                  borderRadius="full" 
                  justify="center" 
                  align="center"
                >
                  <Text fontWeight="bold" fontSize="xl">2</Text>
                </Flex>
                
                <Heading as="h3" size="md">
                  Siga o Tour Guiado
                </Heading>
                
                <Text>
                  No seu primeiro acesso, você será recebido com um tour interativo que apresentará as principais funcionalidades do sistema.
                </Text>
                
                <Button 
                  leftIcon={<FaVideo />} 
                  variant="ghost" 
                  colorScheme="brand" 
                  size="sm"
                >
                  Ver prévia do tour
                </Button>
              </VStack>
              
              <VStack 
                p={6} 
                bg="white" 
                borderRadius="xl" 
                boxShadow="md"
                spacing={4}
                align="flex-start"
              >
                <Flex 
                  w={12} 
                  h={12} 
                  bg="brand.100" 
                  color="brand.700" 
                  borderRadius="full" 
                  justify="center" 
                  align="center"
                >
                  <Text fontWeight="bold" fontSize="xl">3</Text>
                </Flex>
                
                <Heading as="h3" size="md">
                  Configure seu Perfil
                </Heading>
                
                <Text>
                  Personalize seu perfil, configure suas preferências e comece a utilizar o UpClinic para transformar sua clínica.
                </Text>
                
                <Button 
                  leftIcon={<FaRocket />} 
                  variant="ghost" 
                  colorScheme="brand" 
                  size="sm"
                >
                  Dicas de configuração
                </Button>
              </VStack>
            </SimpleGrid>
          </Box>
          
          {/* Suporte */}
          <Box 
            w="full" 
            p={8} 
            bg="gray.50" 
            borderRadius="xl" 
            textAlign="center"
          >
            <Heading as="h2" size="md" mb={4}>
              Precisa de ajuda?
            </Heading>
            
            <Text mb={6}>
              Nossa equipe de suporte está disponível para ajudar você em qualquer dúvida ou dificuldade.
            </Text>
            
            <Button colorScheme="brand" variant="outline">
              Contatar Suporte
            </Button>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default ConfirmationPage;
