import React from 'react';
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  VStack, 
  HStack, 
  Button, 
  Image, 
  Icon, 
  Flex,
  Progress,
  useColorModeValue,
  Divider
} from '@chakra-ui/react';
import { FaCheckCircle, FaArrowRight, FaLightbulb, FaQuestionCircle } from 'react-icons/fa';

const OnboardingScreen = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  return (
    <Box minH="100vh" bg="gray.50">
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          {/* Cabeçalho de Boas-vindas */}
          <Box 
            bg="brand.600" 
            color="white" 
            p={8} 
            borderRadius="xl" 
            boxShadow="md"
          >
            <Flex direction={{ base: 'column', md: 'row' }} align="center" justify="space-between">
              <Box mb={{ base: 6, md: 0 }}>
                <Heading as="h1" size="xl" mb={4}>
                  Bem-vindo ao UpClinic!
                </Heading>
                <Text fontSize="lg" maxW="600px">
                  Estamos felizes em tê-lo conosco! Vamos configurar seu sistema para que você possa começar a usar todas as funcionalidades do UpClinic.
                </Text>
              </Box>
              <Image 
                src="/onboarding-welcome.png" 
                alt="Bem-vindo ao UpClinic" 
                maxW={{ base: '200px', md: '250px' }}
                fallbackSrc="https://via.placeholder.com/250x200?text=Bem-vindo"
              />
            </Flex>
          </Box>
          
          {/* Progresso do Onboarding */}
          <Box p={6} bg={bgColor} borderRadius="xl" boxShadow="md">
            <VStack spacing={4} align="stretch">
              <Flex justify="space-between" align="center">
                <Heading as="h2" size="md">
                  Progresso de Configuração
                </Heading>
                <Text fontWeight="bold" color="brand.500">
                  2/5 Etapas
                </Text>
              </Flex>
              
              <Progress value={40} colorScheme="brand" borderRadius="full" h="10px" />
              
              <HStack spacing={8} mt={2} wrap="wrap">
                <Flex align="center">
                  <Icon as={FaCheckCircle} color="green.500" mr={2} />
                  <Text>Perfil Básico</Text>
                </Flex>
                <Flex align="center">
                  <Icon as={FaCheckCircle} color="green.500" mr={2} />
                  <Text>Preferências</Text>
                </Flex>
                <Flex align="center">
                  <Box w={6} h={6} borderRadius="full" bg="gray.200" display="flex" alignItems="center" justifyContent="center" mr={2}>
                    <Text fontWeight="bold" fontSize="sm">3</Text>
                  </Box>
                  <Text>Configurar Agenda</Text>
                </Flex>
                <Flex align="center">
                  <Box w={6} h={6} borderRadius="full" bg="gray.200" display="flex" alignItems="center" justifyContent="center" mr={2}>
                    <Text fontWeight="bold" fontSize="sm">4</Text>
                  </Box>
                  <Text>Integrar Dispositivos</Text>
                </Flex>
                <Flex align="center">
                  <Box w={6} h={6} borderRadius="full" bg="gray.200" display="flex" alignItems="center" justifyContent="center" mr={2}>
                    <Text fontWeight="bold" fontSize="sm">5</Text>
                  </Box>
                  <Text>Convidar Equipe</Text>
                </Flex>
              </HStack>
            </VStack>
          </Box>
          
          {/* Próxima Etapa */}
          <Box p={6} bg={bgColor} borderRadius="xl" boxShadow="md">
            <VStack spacing={6} align="stretch">
              <Heading as="h2" size="md" color="brand.600">
                Próxima Etapa: Configurar sua Agenda
              </Heading>
              
              <Text>
                Vamos configurar sua agenda para que você possa começar a gerenciar seus compromissos e consultas de forma eficiente.
              </Text>
              
              <Box 
                p={4} 
                borderWidth="1px" 
                borderColor={borderColor} 
                borderRadius="md" 
                bg="gray.50"
              >
                <Flex align="center" mb={3}>
                  <Icon as={FaLightbulb} color="yellow.500" mr={2} boxSize={5} />
                  <Text fontWeight="bold">Dica:</Text>
                </Flex>
                <Text>
                  Configurar sua agenda com horários de atendimento, intervalos e tipos de consulta ajudará a otimizar seu fluxo de trabalho e evitar conflitos de agendamento.
                </Text>
              </Box>
              
              <Button 
                rightIcon={<FaArrowRight />} 
                colorScheme="brand" 
                size="lg" 
                alignSelf="flex-start"
              >
                Configurar Agenda
              </Button>
            </VStack>
          </Box>
          
          {/* Recursos Populares */}
          <Box p={6} bg={bgColor} borderRadius="xl" boxShadow="md">
            <VStack spacing={6} align="stretch">
              <Heading as="h2" size="md">
                Recursos Populares para Começar
              </Heading>
              
              <Flex 
                direction={{ base: 'column', md: 'row' }} 
                gap={6} 
                wrap="wrap"
              >
                <Box 
                  flex="1" 
                  minW={{ base: '100%', md: '250px' }}
                  p={4} 
                  borderWidth="1px" 
                  borderColor={borderColor} 
                  borderRadius="lg"
                  transition="all 0.3s"
                  _hover={{ transform: 'translateY(-5px)', boxShadow: 'md' }}
                >
                  <Image 
                    src="/feature-agenda.png" 
                    alt="Agenda Inteligente" 
                    h="150px" 
                    objectFit="cover" 
                    borderRadius="md" 
                    mb={4}
                    fallbackSrc="https://via.placeholder.com/300x150?text=Agenda+Inteligente"
                  />
                  <Heading as="h3" size="sm" mb={2}>
                    Agenda Inteligente
                  </Heading>
                  <Text fontSize="sm" mb={4}>
                    Gerencie consultas, envie lembretes automáticos e evite faltas com nossa agenda completa.
                  </Text>
                  <Button size="sm" colorScheme="brand" variant="outline">
                    Explorar
                  </Button>
                </Box>
                
                <Box 
                  flex="1" 
                  minW={{ base: '100%', md: '250px' }}
                  p={4} 
                  borderWidth="1px" 
                  borderColor={borderColor} 
                  borderRadius="lg"
                  transition="all 0.3s"
                  _hover={{ transform: 'translateY(-5px)', boxShadow: 'md' }}
                >
                  <Image 
                    src="/feature-prontuario.png" 
                    alt="Prontuário Eletrônico" 
                    h="150px" 
                    objectFit="cover" 
                    borderRadius="md" 
                    mb={4}
                    fallbackSrc="https://via.placeholder.com/300x150?text=Prontuário+Eletrônico"
                  />
                  <Heading as="h3" size="sm" mb={2}>
                    Prontuário Eletrônico
                  </Heading>
                  <Text fontSize="sm" mb={4}>
                    Mantenha todos os dados dos pacientes organizados, seguros e acessíveis quando você precisar.
                  </Text>
                  <Button size="sm" colorScheme="brand" variant="outline">
                    Explorar
                  </Button>
                </Box>
                
                <Box 
                  flex="1" 
                  minW={{ base: '100%', md: '250px' }}
                  p={4} 
                  borderWidth="1px" 
                  borderColor={borderColor} 
                  borderRadius="lg"
                  transition="all 0.3s"
                  _hover={{ transform: 'translateY(-5px)', boxShadow: 'md' }}
                >
                  <Image 
                    src="/feature-telemedicina.png" 
                    alt="Telemedicina Integrada" 
                    h="150px" 
                    objectFit="cover" 
                    borderRadius="md" 
                    mb={4}
                    fallbackSrc="https://via.placeholder.com/300x150?text=Telemedicina+Integrada"
                  />
                  <Heading as="h3" size="sm" mb={2}>
                    Telemedicina Integrada
                  </Heading>
                  <Text fontSize="sm" mb={4}>
                    Realize consultas online com videochamadas, chat e compartilhamento de documentos em tempo real.
                  </Text>
                  <Button size="sm" colorScheme="brand" variant="outline">
                    Explorar
                  </Button>
                </Box>
              </Flex>
            </VStack>
          </Box>
          
          {/* Vídeos de Treinamento */}
          <Box p={6} bg={bgColor} borderRadius="xl" boxShadow="md">
            <VStack spacing={6} align="stretch">
              <Heading as="h2" size="md">
                Vídeos de Treinamento Recomendados
              </Heading>
              
              <Flex 
                direction={{ base: 'column', md: 'row' }} 
                gap={6}
              >
                <Box flex="1" minW={{ base: '100%', md: '300px' }}>
                  <Box 
                    position="relative" 
                    borderRadius="lg" 
                    overflow="hidden" 
                    mb={3}
                  >
                    <Image 
                      src="/video-primeiros-passos.png" 
                      alt="Primeiros Passos" 
                      w="100%" 
                      fallbackSrc="https://via.placeholder.com/400x225?text=Primeiros+Passos"
                    />
                    <Flex 
                      position="absolute" 
                      top="0" 
                      left="0" 
                      right="0" 
                      bottom="0" 
                      bg="blackAlpha.600" 
                      justify="center" 
                      align="center"
                      borderRadius="lg"
                    >
                      <Box 
                        w="60px" 
                        h="60px" 
                        borderRadius="full" 
                        bg="whiteAlpha.800" 
                        display="flex" 
                        alignItems="center" 
                        justifyContent="center"
                      >
                        <Box 
                          w="0" 
                          h="0" 
                          borderTop="10px solid transparent" 
                          borderBottom="10px solid transparent" 
                          borderLeft="18px solid" 
                          borderLeftColor="brand.500" 
                          ml={1}
                        />
                      </Box>
                    </Flex>
                  </Box>
                  <Heading as="h3" size="sm" mb={1}>
                    Primeiros Passos no UpClinic
                  </Heading>
                  <Text fontSize="sm" color="gray.600">
                    5:32 min
                  </Text>
                </Box>
                
                <Box flex="1" minW={{ base: '100%', md: '300px' }}>
                  <Box 
                    position="relative" 
                    borderRadius="lg" 
                    overflow="hidden" 
                    mb={3}
                  >
                    <Image 
                      src="/video-agenda.png" 
                      alt="Configurando sua Agenda" 
                      w="100%" 
                      fallbackSrc="https://via.placeholder.com/400x225?text=Configurando+Agenda"
                    />
                    <Flex 
                      position="absolute" 
                      top="0" 
                      left="0" 
                      right="0" 
                      bottom="0" 
                      bg="blackAlpha.600" 
                      justify="center" 
                      align="center"
                      borderRadius="lg"
                    >
                      <Box 
                        w="60px" 
                        h="60px" 
                        borderRadius="full" 
                        bg="whiteAlpha.800" 
                        display="flex" 
                        alignItems="center" 
                        justifyContent="center"
                      >
                        <Box 
                          w="0" 
                          h="0" 
                          borderTop="10px solid transparent" 
                          borderBottom="10px solid transparent" 
                          borderLeft="18px solid" 
                          borderLeftColor="brand.500" 
                          ml={1}
                        />
                      </Box>
                    </Flex>
                  </Box>
                  <Heading as="h3" size="sm" mb={1}>
                    Configurando sua Agenda
                  </Heading>
                  <Text fontSize="sm" color="gray.600">
                    7:15 min
                  </Text>
                </Box>
              </Flex>
              
              <Button 
                variant="outline" 
                colorScheme="brand" 
                alignSelf="center"
              >
                Ver Todos os Vídeos
              </Button>
            </VStack>
          </Box>
          
          {/* Ajuda e Suporte */}
          <Box p={6} bg={bgColor} borderRadius="xl" boxShadow="md">
            <Flex 
              direction={{ base: 'column', md: 'row' }} 
              align={{ base: 'center', md: 'flex-start' }} 
              justify="space-between"
              gap={6}
            >
              <Box flex="1" textAlign={{ base: 'center', md: 'left' }}>
                <Flex 
                  align="center" 
                  mb={4} 
                  justify={{ base: 'center', md: 'flex-start' }}
                >
                  <Icon as={FaQuestionCircle} color="brand.500" mr={2} boxSize={5} />
                  <Heading as="h2" size="md">
                    Precisa de Ajuda?
                  </Heading>
                </Flex>
                
                <Text mb={4}>
                  Nossa equipe de suporte está disponível para ajudar você em qualquer dúvida ou dificuldade.
                </Text>
                
                <HStack spacing={4} justify={{ base: 'center', md: 'flex-start' }}>
                  <Button colorScheme="brand">
                    Contatar Suporte
                  </Button>
                  <Button variant="outline" colorScheme="brand">
                    Ver FAQ
                  </Button>
                </HStack>
              </Box>
              
              <Divider orientation="vertical" display={{ base: 'none', md: 'block' }} />
              
              <Box flex="1" textAlign={{ base: 'center', md: 'left' }}>
                <Heading as="h3" size="sm" mb={4}>
                  Recursos Adicionais
                </Heading>
                
                <VStack align={{ base: 'center', md: 'flex-start' }} spacing={3}>
                  <Button variant="link" colorScheme="brand">
                    Manual Digital Completo
                  </Button>
                  <Button variant="link" colorScheme="brand">
                    Biblioteca de Vídeos
                  </Button>
                  <Button variant="link" colorScheme="brand">
                    Webinars e Treinamentos
                  </Button>
                  <Button variant="link" colorScheme="brand">
                    Blog e Artigos
                  </Button>
                </VStack>
              </Box>
            </Flex>
          </Box>
          
          {/* Pular Onboarding */}
          <Flex justify="center" py={4}>
            <Button variant="ghost" size="sm">
              Pular onboarding e ir para o dashboard
            </Button>
          </Flex>
        </VStack>
      </Container>
    </Box>
  );
};

export default OnboardingScreen;
