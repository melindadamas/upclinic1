import React from 'react';
import { Box, Container, Flex, Heading, Text, Button, Image, SimpleGrid, Icon, VStack, HStack, Badge } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaCalendarAlt, FaUserMd, FaLaptopMedical, FaMobileAlt, FaChartLine, FaShieldAlt } from 'react-icons/fa';

const HomePage = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box bg="brand.600" color="white" py={16}>
        <Container maxW="container.xl">
          <Flex direction={{ base: 'column', lg: 'row' }} align="center" justify="space-between">
            <Box maxW={{ base: '100%', lg: '50%' }} mb={{ base: 8, lg: 0 }}>
              <Heading as="h1" size="2xl" mb={4} fontWeight="bold">
                UpClinic: Gestão Clínica Completa e Integrada
              </Heading>
              <Text fontSize="xl" mb={6}>
                Simplifique a gestão da sua clínica com um sistema completo de agendamento, prontuário eletrônico e telemedicina
              </Text>
              <HStack spacing={4}>
                <Button 
                  as={RouterLink} 
                  to="/planos" 
                  size="lg" 
                  bg="accent.500" 
                  _hover={{ bg: 'accent.600' }}
                  px={8}
                >
                  Experimente Gratuitamente
                </Button>
                <Button 
                  as={RouterLink} 
                  to="/demo" 
                  size="lg" 
                  variant="outline" 
                  borderColor="white" 
                  color="white"
                  _hover={{ bg: 'whiteAlpha.200' }}
                >
                  Agende uma Demonstração
                </Button>
              </HStack>
            </Box>
            <Box 
              maxW={{ base: '100%', lg: '45%' }}
              borderRadius="xl"
              overflow="hidden"
              boxShadow="2xl"
            >
              <Image 
                src="/dashboard-preview.png" 
                alt="UpClinic Dashboard" 
                fallbackSrc="https://via.placeholder.com/600x400?text=UpClinic+Dashboard"
              />
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* Benefícios Section */}
      <Box py={16} bg="gray.50">
        <Container maxW="container.xl">
          <VStack spacing={12}>
            <Box textAlign="center" maxW="container.md" mx="auto">
              <Heading as="h2" size="xl" mb={4}>
                Benefícios que transformam sua clínica
              </Heading>
              <Text fontSize="lg" color="gray.600">
                O UpClinic oferece soluções completas para otimizar seus processos e melhorar a experiência dos seus pacientes
              </Text>
            </Box>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
              {benefits.map((benefit, index) => (
                <Box 
                  key={index}
                  bg="white"
                  p={8}
                  borderRadius="xl"
                  boxShadow="md"
                  transition="all 0.3s"
                  _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
                >
                  <Icon as={benefit.icon} w={12} h={12} color="brand.500" mb={4} />
                  <Heading as="h3" size="md" mb={3}>
                    {benefit.title}
                  </Heading>
                  <Text color="gray.600" mb={4}>
                    {benefit.description}
                  </Text>
                  <Button 
                    as={RouterLink} 
                    to={benefit.link} 
                    variant="ghost" 
                    color="brand.500"
                    rightIcon={<Icon as={benefit.icon} />}
                  >
                    Saiba mais
                  </Button>
                </Box>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Trial Highlight Section */}
      <Box py={16} bg="brand.500" color="white">
        <Container maxW="container.xl">
          <Flex 
            direction={{ base: 'column', lg: 'row' }} 
            align="center" 
            justify="space-between"
            bg="whiteAlpha.200"
            p={8}
            borderRadius="xl"
          >
            <Box maxW={{ base: '100%', lg: '60%' }} mb={{ base: 8, lg: 0 }}>
              <Badge 
                bg="accent.500" 
                color="white" 
                fontSize="md" 
                px={3} 
                py={1} 
                borderRadius="full"
                mb={4}
              >
                NOVIDADE
              </Badge>
              <Heading as="h2" size="xl" mb={4}>
                Experimente o UpClinic gratuitamente por 7 dias
              </Heading>
              <Text fontSize="lg" mb={6}>
                Acesse todas as funcionalidades do plano Plus sem compromisso e descubra como o UpClinic pode transformar sua clínica.
              </Text>
            </Box>
            <Button 
              as={RouterLink} 
              to="/planos" 
              size="lg" 
              bg="white" 
              color="brand.500"
              _hover={{ bg: 'gray.100' }}
              px={8}
              fontSize="lg"
            >
              Começar teste gratuito
            </Button>
          </Flex>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box py={20} textAlign="center" bg="gray.50">
        <Container maxW="container.md">
          <Heading as="h2" size="xl" mb={6}>
            Pronto para transformar sua clínica?
          </Heading>
          <Text fontSize="lg" mb={8} color="gray.600">
            Junte-se a milhares de profissionais que já otimizaram sua gestão clínica com o UpClinic
          </Text>
          <Button 
            as={RouterLink} 
            to="/planos" 
            size="lg" 
            colorScheme="brand" 
            px={8}
            fontSize="lg"
          >
            Ver planos e preços
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

const benefits = [
  {
    title: 'Agenda Inteligente',
    description: 'Gerencie consultas, envie lembretes automáticos e evite faltas com nossa agenda completa e intuitiva.',
    icon: FaCalendarAlt,
    link: '/demo#agenda'
  },
  {
    title: 'Prontuário Eletrônico',
    description: 'Mantenha todos os dados dos pacientes organizados, seguros e acessíveis quando você precisar.',
    icon: FaUserMd,
    link: '/demo#prontuario'
  },
  {
    title: 'Telemedicina Integrada',
    description: 'Realize consultas online com videochamadas, chat e compartilhamento de documentos em tempo real.',
    icon: FaLaptopMedical,
    link: '/demo#telemedicina'
  },
  {
    title: 'Acesso Multiplataforma',
    description: 'Acesse o sistema de qualquer lugar através do seu computador, tablet ou smartphone.',
    icon: FaMobileAlt,
    link: '/demo#mobile'
  },
  {
    title: 'Relatórios e Análises',
    description: 'Visualize métricas importantes do seu negócio com dashboards personalizados e relatórios detalhados.',
    icon: FaChartLine,
    link: '/demo#relatorios'
  },
  {
    title: 'Segurança e Conformidade',
    description: 'Seus dados protegidos com criptografia de ponta a ponta e em conformidade com a LGPD.',
    icon: FaShieldAlt,
    link: '/demo#seguranca'
  }
];

export default HomePage;
