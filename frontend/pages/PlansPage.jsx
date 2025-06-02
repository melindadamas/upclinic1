import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  SimpleGrid, 
  VStack, 
  HStack, 
  Button, 
  Flex, 
  Badge, 
  Icon, 
  Divider,
  List,
  ListItem,
  ListIcon,
  Switch,
  useColorModeValue
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaCheck, FaTimes, FaRegClock } from 'react-icons/fa';

const PlansPage = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  
  const highlightColor = useColorModeValue('brand.50', 'brand.900');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  const toggleBilling = () => {
    setIsAnnual(!isAnnual);
  };

  // Preços mensais e anuais
  const prices = {
    plus: {
      monthly: 15,
      annual: 15 * 12 - 15 * 3, // 3 meses grátis no plano anual
    },
    pro: {
      monthly: 35,
      annual: 35 * 12 - 35 * 3, // 3 meses grátis no plano anual
    },
    master: {
      monthly: 45,
      annual: 45 * 12 - 45 * 3, // 3 meses grátis no plano anual
    }
  };

  return (
    <Box py={16}>
      <Container maxW="container.xl">
        <VStack spacing={12}>
          {/* Header */}
          <Box textAlign="center" maxW="container.md" mx="auto">
            <Heading as="h1" size="2xl" mb={4}>
              Escolha o plano ideal para sua clínica
            </Heading>
            <Text fontSize="lg" color="gray.600" mb={8}>
              Todos os planos incluem acesso ao suporte técnico e atualizações regulares
            </Text>
            
            {/* Toggle anual/mensal */}
            <Flex justify="center" align="center" mb={8}>
              <Text fontWeight={!isAnnual ? "bold" : "normal"} color={!isAnnual ? "brand.500" : "gray.500"}>
                Mensal
              </Text>
              <Switch 
                mx={4} 
                size="lg" 
                colorScheme="brand" 
                isChecked={isAnnual} 
                onChange={toggleBilling}
              />
              <Text fontWeight={isAnnual ? "bold" : "normal"} color={isAnnual ? "brand.500" : "gray.500"}>
                Anual
              </Text>
              <Badge ml={2} colorScheme="green" variant="solid" borderRadius="full" px={2}>
                Economize 25%
              </Badge>
            </Flex>
          </Box>

          {/* Planos */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} w="full">
            {/* Plano Plus */}
            <Box 
              borderWidth="1px" 
              borderColor={borderColor} 
              borderRadius="xl" 
              overflow="hidden"
              transition="all 0.3s"
              _hover={{ transform: 'translateY(-5px)', boxShadow: 'xl' }}
            >
              <Box bg="brand.500" color="white" p={6}>
                <Heading as="h3" size="lg" mb={2}>
                  Plus
                </Heading>
                <Text>Para profissionais individuais</Text>
              </Box>
              
              <VStack spacing={6} p={6} align="stretch">
                <Box>
                  <Flex align="baseline">
                    <Text fontSize="3xl" fontWeight="bold">
                      R$ {isAnnual ? (prices.plus.annual / 12).toFixed(0) : prices.plus.monthly}
                    </Text>
                    <Text ml={2} color="gray.500">
                      /mês
                    </Text>
                  </Flex>
                  {isAnnual && (
                    <Text color="gray.500" fontSize="sm">
                      Faturado anualmente: R$ {prices.plus.annual}/ano
                    </Text>
                  )}
                </Box>
                
                <Badge colorScheme="green" alignSelf="flex-start" borderRadius="full" px={3} py={1}>
                  <Flex align="center">
                    <Icon as={FaRegClock} mr={1} />
                    <Text>7 dias grátis</Text>
                  </Flex>
                </Badge>
                
                <Divider />
                
                <List spacing={3}>
                  <ListItem>
                    <ListIcon as={FaCheck} color="green.500" />
                    Agendamento básico de consultas
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheck} color="green.500" />
                    Prontuário eletrônico simplificado
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheck} color="green.500" />
                    Telemedicina com recursos básicos
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheck} color="green.500" />
                    Integração limitada com Apple Health/Google Fit
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaTimes} color="red.500" />
                    Relatórios avançados
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaTimes} color="red.500" />
                    Autenticação biométrica
                  </ListItem>
                </List>
                
                <Button 
                  as={RouterLink} 
                  to={`/checkout/plus?billing=${isAnnual ? 'annual' : 'monthly'}`}
                  colorScheme="brand" 
                  size="lg" 
                  w="full"
                >
                  Começar teste grátis
                </Button>
              </VStack>
            </Box>
            
            {/* Plano Pro */}
            <Box 
              borderWidth="2px" 
              borderColor="brand.500" 
              borderRadius="xl" 
              overflow="hidden"
              boxShadow="xl"
              position="relative"
              transition="all 0.3s"
              _hover={{ transform: 'translateY(-5px)', boxShadow: '2xl' }}
              zIndex={1}
            >
              <Box position="absolute" top={0} right={0} bg="accent.500" color="white" px={4} py={1} borderBottomLeftRadius="md">
                Mais popular
              </Box>
              
              <Box bg="brand.600" color="white" p={6}>
                <Heading as="h3" size="lg" mb={2}>
                  Pro
                </Heading>
                <Text>Para clínicas em crescimento</Text>
              </Box>
              
              <VStack spacing={6} p={6} align="stretch">
                <Box>
                  <Flex align="baseline">
                    <Text fontSize="3xl" fontWeight="bold">
                      R$ {isAnnual ? (prices.pro.annual / 12).toFixed(0) : prices.pro.monthly}
                    </Text>
                    <Text ml={2} color="gray.500">
                      /mês
                    </Text>
                  </Flex>
                  {isAnnual && (
                    <Text color="gray.500" fontSize="sm">
                      Faturado anualmente: R$ {prices.pro.annual}/ano
                    </Text>
                  )}
                </Box>
                
                <Divider />
                
                <List spacing={3}>
                  <ListItem>
                    <ListIcon as={FaCheck} color="green.500" />
                    Todas as funcionalidades do Plus
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheck} color="green.500" />
                    Telemedicina com recursos avançados
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheck} color="green.500" />
                    Relatórios de telemedicina básicos
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheck} color="green.500" />
                    Integração completa com Apple Health/Google Fit
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheck} color="green.500" />
                    Integração com Samsung Health
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheck} color="green.500" />
                    Notificações push personalizadas
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheck} color="green.500" />
                    Modo escuro
                  </ListItem>
                </List>
                
                <Button 
                  as={RouterLink} 
                  to={`/checkout/pro?billing=${isAnnual ? 'annual' : 'monthly'}`}
                  colorScheme="accent" 
                  size="lg" 
                  w="full"
                >
                  Escolher plano Pro
                </Button>
              </VStack>
            </Box>
            
            {/* Plano Master */}
            <Box 
              borderWidth="1px" 
              borderColor={borderColor} 
              borderRadius="xl" 
              overflow="hidden"
              transition="all 0.3s"
              _hover={{ transform: 'translateY(-5px)', boxShadow: 'xl' }}
            >
              <Box bg="gray.800" color="white" p={6}>
                <Heading as="h3" size="lg" mb={2}>
                  Master
                </Heading>
                <Text>Para clínicas estabelecidas</Text>
              </Box>
              
              <VStack spacing={6} p={6} align="stretch">
                <Box>
                  <Flex align="baseline">
                    <Text fontSize="3xl" fontWeight="bold">
                      R$ {isAnnual ? (prices.master.annual / 12).toFixed(0) : prices.master.monthly}
                    </Text>
                    <Text ml={2} color="gray.500">
                      /mês
                    </Text>
                  </Flex>
                  {isAnnual && (
                    <Text color="gray.500" fontSize="sm">
                      Faturado anualmente: R$ {prices.master.annual}/ano
                    </Text>
                  )}
                </Box>
                
                <Divider />
                
                <List spacing={3}>
                  <ListItem>
                    <ListIcon as={FaCheck} color="green.500" />
                    Todas as funcionalidades do Pro
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheck} color="green.500" />
                    Integração completa com todos os wearables e IoT
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheck} color="green.500" />
                    Dashboard personalizado avançado
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheck} color="green.500" />
                    Relatórios de telemedicina completos
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheck} color="green.500" />
                    Autenticação biométrica
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheck} color="green.500" />
                    Funcionalidades offline avançadas
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheck} color="green.500" />
                    Suporte prioritário
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheck} color="green.500" />
                    Acesso antecipado a novas funcionalidades
                  </ListItem>
                </List>
                
                <Button 
                  as={RouterLink} 
                  to={`/checkout/master?billing=${isAnnual ? 'annual' : 'monthly'}`}
                  colorScheme="gray" 
                  size="lg" 
                  w="full"
                >
                  Escolher plano Master
                </Button>
              </VStack>
            </Box>
          </SimpleGrid>
          
          {/* Seção de Descontos Progressivos */}
          <Box 
            w="full" 
            bg={highlightColor} 
            p={8} 
            borderRadius="xl" 
            mt={12}
          >
            <Heading as="h3" size="lg" mb={6} textAlign="center">
              Descontos Progressivos
            </Heading>
            
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
              <Box>
                <Heading as="h4" size="md" mb={4}>
                  Plano Mensal
                </Heading>
                <List spacing={3}>
                  <ListItem>
                    <ListIcon as={FaCheck} color="green.500" />
                    1º mês: <Text as="span" fontWeight="bold">100% de desconto</Text> (Gratuito)
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheck} color="green.500" />
                    2º mês: <Text as="span" fontWeight="bold">75% de desconto</Text>
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheck} color="green.500" />
                    3º mês: <Text as="span" fontWeight="bold">50% de desconto</Text>
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheck} color="green.500" />
                    4º mês: <Text as="span" fontWeight="bold">25% de desconto</Text>
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheck} color="green.500" />
                    5º mês em diante: Valor integral
                  </ListItem>
                </List>
              </Box>
              
              <Box>
                <Heading as="h4" size="md" mb={4}>
                  Plano Anual
                </Heading>
                <List spacing={3}>
                  <ListItem>
                    <ListIcon as={FaCheck} color="green.500" />
                    1º mês: <Text as="span" fontWeight="bold">100% de desconto</Text> (Gratuito)
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheck} color="green.500" />
                    2º mês: <Text as="span" fontWeight="bold">25% do valor total</Text>
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheck} color="green.500" />
                    3º mês: <Text as="span" fontWeight="bold">50% do valor total</Text>
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheck} color="green.500" />
                    4º mês: <Text as="span" fontWeight="bold">75% do valor total</Text>
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheck} color="green.500" />
                    5º mês: <Text as="span" fontWeight="bold">85% do valor total</Text>
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheck} color="green.500" />
                    6º mês em diante: Valor integral
                  </ListItem>
                </List>
              </Box>
            </SimpleGrid>
          </Box>
          
          {/* FAQ */}
          <Box w="full" mt={12}>
            <Heading as="h3" size="lg" mb={6} textAlign="center">
              Perguntas Frequentes
            </Heading>
            
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
              <VStack align="start" spacing={4}>
                <Heading as="h4" size="md">
                  O que está incluído no teste gratuito de 7 dias?
                </Heading>
                <Text>
                  O teste gratuito de 7 dias inclui acesso completo a todas as funcionalidades do plano Plus, sem compromisso. Você pode cancelar a qualquer momento durante o período de teste.
                </Text>
              </VStack>
              
              <VStack align="start" spacing={4}>
                <Heading as="h4" size="md">
                  Posso mudar de plano depois?
                </Heading>
                <Text>
                  Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento. As mudanças entrarão em vigor imediatamente e o valor será ajustado proporcionalmente.
                </Text>
              </VStack>
              
              <VStack align="start" spacing={4}>
                <Heading as="h4" size="md">
                  Como funciona o desconto progressivo?
                </Heading>
                <Text>
                  O desconto progressivo é aplicado automaticamente à sua assinatura. Você começará com o primeiro mês gratuito e os descontos serão aplicados gradualmente nos meses seguintes, conforme detalhado acima.
                </Text>
              </VStack>
              
              <VStack align="start" spacing={4}>
                <Heading as="h4" size="md">
                  Existe um limite de usuários?
                </Heading>
                <Text>
                  O plano Plus é limitado a 1 usuário principal. Os planos Pro e Master incluem múltiplos usuários, com a possibilidade de adicionar usuários extras por uma taxa adicional.
                </Text>
              </VStack>
            </SimpleGrid>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default PlansPage;
