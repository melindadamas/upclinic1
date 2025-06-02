import React from 'react';
import { Box, Container, Heading, Text, VStack, Button, Image, Flex, useColorModeValue } from '@chakra-ui/react';
import { FaCheck, FaGoogle } from 'react-icons/fa';
import { GoogleLoginButton } from '../components/auth/GoogleAuth';

const GoogleAuthSuccessPage = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={8} align="stretch">
        <Box 
          p={8} 
          bg={bgColor} 
          borderRadius="xl" 
          boxShadow="lg"
          borderWidth="1px"
          borderColor={borderColor}
          textAlign="center"
        >
          <Flex 
            w="80px" 
            h="80px" 
            borderRadius="full" 
            bg="green.100" 
            color="green.500" 
            justify="center" 
            align="center"
            mx="auto"
            mb={6}
          >
            <FaCheck size={40} />
          </Flex>
          
          <Heading as="h1" size="xl" mb={4}>
            Autenticação Concluída!
          </Heading>
          
          <Text fontSize="lg" mb={8}>
            Você foi autenticado com sucesso usando sua conta Google.
          </Text>
          
          <Button 
            colorScheme="brand" 
            size="lg" 
            w="full" 
            maxW="300px" 
            mx="auto"
          >
            Continuar para o UpClinic
          </Button>
        </Box>
        
        <Box 
          p={6} 
          bg={bgColor} 
          borderRadius="xl" 
          boxShadow="md"
          borderWidth="1px"
          borderColor={borderColor}
        >
          <Heading as="h2" size="md" mb={4}>
            Próximos Passos
          </Heading>
          
          <VStack spacing={4} align="stretch">
            <Flex align="center">
              <Box 
                w="24px" 
                h="24px" 
                borderRadius="full" 
                bg="green.100" 
                color="green.500" 
                display="flex" 
                alignItems="center" 
                justifyContent="center" 
                mr={3}
              >
                <FaCheck size={12} />
              </Box>
              <Text>Autenticação com Google concluída</Text>
            </Flex>
            
            <Flex align="center">
              <Box 
                w="24px" 
                h="24px" 
                borderRadius="full" 
                bg="gray.100" 
                color="gray.500" 
                display="flex" 
                alignItems="center" 
                justifyContent="center" 
                mr={3}
              >
                <Text fontSize="xs" fontWeight="bold">2</Text>
              </Box>
              <Text>Complete seu perfil</Text>
            </Flex>
            
            <Flex align="center">
              <Box 
                w="24px" 
                h="24px" 
                borderRadius="full" 
                bg="gray.100" 
                color="gray.500" 
                display="flex" 
                alignItems="center" 
                justifyContent="center" 
                mr={3}
              >
                <Text fontSize="xs" fontWeight="bold">3</Text>
              </Box>
              <Text>Configure suas preferências</Text>
            </Flex>
            
            <Flex align="center">
              <Box 
                w="24px" 
                h="24px" 
                borderRadius="full" 
                bg="gray.100" 
                color="gray.500" 
                display="flex" 
                alignItems="center" 
                justifyContent="center" 
                mr={3}
              >
                <Text fontSize="xs" fontWeight="bold">4</Text>
              </Box>
              <Text>Comece a usar o UpClinic</Text>
            </Flex>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default GoogleAuthSuccessPage;
