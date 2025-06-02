import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  Select,
  HStack,
  useToast,
  Divider,
  Image,
  Flex,
  Badge,
  Link,
  Icon,
  useColorModeValue
} from '@chakra-ui/react';
import { FaBook, FaVideo, FaSearch, FaDownload, FaThumbsUp, FaThumbsDown, FaExternalLinkAlt } from 'react-icons/fa';
import ManualService from '../services/manual/ManualService';
import { useAuth } from '../contexts/AuthContext';
import { useSubscription } from '../contexts/SubscriptionContext';

/**
 * Página do Manual Digital integrado ao UpClinic
 * Acessível após login, com conteúdo personalizado por plano
 */
const ManualDigitalPage = () => {
  const { user } = useAuth();
  const { userPlan } = useSubscription();
  const toast = useToast();
  
  // Estados
  const [manualStructure, setManualStructure] = useState([]);
  const [currentSection, setCurrentSection] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [userProgress, setUserProgress] = useState({ progress: 0, sectionsRead: [] });
  const [sectionVideos, setSectionVideos] = useState([]);
  const [feedbackSent, setFeedbackSent] = useState(false);
  
  // Cores
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const accentColor = useColorModeValue('blue.500', 'blue.300');
  
  // Carregar estrutura do manual ao iniciar
  useEffect(() => {
    const loadManualData = async () => {
      try {
        // Em produção, isso seria uma chamada à API real
        // Simulação de estrutura do manual
        const mockStructure = [
          {
            id: 'getting-started',
            title: 'Primeiros Passos',
            description: 'Introdução ao UpClinic e configuração inicial',
            sections: [
              { id: 'welcome', title: 'Bem-vindo ao UpClinic', level: 1 },
              { id: 'system-requirements', title: 'Requisitos do Sistema', level: 1 },
              { id: 'account-setup', title: 'Configuração da Conta', level: 1 },
              { id: 'initial-settings', title: 'Configurações Iniciais', level: 1 }
            ]
          },
          {
            id: 'core-features',
            title: 'Funcionalidades Principais',
            description: 'Aprenda a usar os recursos essenciais do sistema',
            sections: [
              { id: 'dashboard', title: 'Dashboard', level: 1 },
              { id: 'agenda', title: 'Agenda e Agendamentos', level: 1 },
              { id: 'patients', title: 'Gerenciamento de Pacientes', level: 1 },
              { id: 'prontuario', title: 'Prontuário Eletrônico', level: 1 },
              { id: 'telemedicine', title: 'Telemedicina', level: 1, planRequired: 'plus' }
            ]
          },
          {
            id: 'advanced-features',
            title: 'Funcionalidades Avançadas',
            description: 'Recursos avançados para otimizar seu fluxo de trabalho',
            sections: [
              { id: 'reports', title: 'Relatórios e Análises', level: 1, planRequired: 'pro' },
              { id: 'wearables', title: 'Integração com Wearables', level: 1, planRequired: 'pro' },
              { id: 'ai-anamnesis', title: 'Anamnese Automática por IA', level: 1, planRequired: 'master' },
              { id: 'population-map', title: 'Mapa Populacional', level: 1, planRequired: 'master' }
            ]
          },
          {
            id: 'administration',
            title: 'Administração',
            description: 'Gerenciamento e configurações administrativas',
            sections: [
              { id: 'user-management', title: 'Gerenciamento de Usuários', level: 1 },
              { id: 'subscription', title: 'Gerenciamento de Assinatura', level: 1 },
              { id: 'clinic-settings', title: 'Configurações da Clínica', level: 1 }
            ]
          },
          {
            id: 'support',
            title: 'Suporte',
            description: 'Obtenha ajuda e suporte técnico',
            sections: [
              { id: 'faq', title: 'Perguntas Frequentes', level: 1 },
              { id: 'troubleshooting', title: 'Solução de Problemas', level: 1 },
              { id: 'contact-support', title: 'Contato com Suporte', level: 1 }
            ]
          }
        ];
        
        setManualStructure(mockStructure);
        
        // Simular progresso do usuário
        const mockProgress = {
          progress: 35,
          sectionsRead: ['welcome', 'system-requirements', 'account-setup', 'dashboard', 'agenda']
        };
        
        setUserProgress(mockProgress);
      } catch (error) {
        console.error('Erro ao carregar estrutura do manual:', error);
        toast({
          title: 'Erro ao carregar manual',
          description: 'Não foi possível carregar o conteúdo do manual. Tente novamente mais tarde.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };
    
    loadManualData();
  }, [toast, userPlan]);
  
  // Carregar conteúdo da seção
  const loadSectionContent = async (sectionId) => {
    try {
      // Em produção, isso seria uma chamada à API real
      // Simulação de conteúdo da seção
      const mockContent = {
        id: sectionId,
        title: manualStructure
          .flatMap(category => category.sections)
          .find(section => section.id === sectionId)?.title || 'Seção',
        content: `
          <h1>Conteúdo da seção ${sectionId}</h1>
          <p>Este é um exemplo de conteúdo para a seção selecionada. Em um ambiente de produção, este conteúdo seria carregado dinamicamente do servidor com base no ID da seção e no plano do usuário.</p>
          <p>O conteúdo pode incluir texto formatado, imagens, links e outros elementos HTML.</p>
          <h2>Subtítulo de exemplo</h2>
          <p>Mais conteúdo de exemplo para demonstrar a estrutura do manual digital.</p>
          <ul>
            <li>Item de lista 1</li>
            <li>Item de lista 2</li>
            <li>Item de lista 3</li>
          </ul>
          <p>Para mais informações, consulte a documentação completa ou entre em contato com o suporte.</p>
        `,
        lastUpdated: '2025-05-15'
      };
      
      setCurrentSection(mockContent);
      
      // Carregar vídeos relacionados
      const mockVideos = [
        {
          id: 'video1',
          title: `Tutorial: ${mockContent.title}`,
          description: 'Vídeo explicativo sobre esta funcionalidade',
          url: 'https://example.com/videos/tutorial1.mp4',
          thumbnail: 'https://via.placeholder.com/320x180',
          duration: '3:45'
        },
        {
          id: 'video2',
          title: `Exemplo prático: ${mockContent.title}`,
          description: 'Demonstração prática de uso',
          url: 'https://example.com/videos/demo1.mp4',
          thumbnail: 'https://via.placeholder.com/320x180',
          duration: '5:20'
        }
      ];
      
      setSectionVideos(mockVideos);
      
      // Marcar seção como lida se ainda não estiver
      if (user && !userProgress.sectionsRead.includes(sectionId)) {
        const updatedSectionsRead = [...userProgress.sectionsRead, sectionId];
        const totalSections = manualStructure.reduce(
          (total, category) => total + category.sections.length, 
          0
        );
        const updatedProgress = Math.round((updatedSectionsRead.length / totalSections) * 100);
        
        setUserProgress({
          progress: updatedProgress,
          sectionsRead: updatedSectionsRead
        });
        
        // Em produção, isso seria uma chamada à API
        // ManualService.markSectionAsRead(sectionId, user.id);
      }
    } catch (error) {
      console.error(`Erro ao carregar conteúdo da seção ${sectionId}:`, error);
      toast({
        title: 'Erro ao carregar seção',
        description: 'Não foi possível carregar o conteúdo desta seção. Tente novamente mais tarde.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };
  
  // Realizar busca no manual
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    try {
      // Em produção, isso seria uma chamada à API real
      // Simulação de resultados de busca
      setTimeout(() => {
        const mockResults = [
          {
            id: 'result1',
            sectionId: 'dashboard',
            title: 'Dashboard',
            excerpt: '...O <mark>Dashboard</mark> do UpClinic oferece uma visão geral das suas atividades e métricas importantes...',
            category: 'Funcionalidades Principais'
          },
          {
            id: 'result2',
            sectionId: 'reports',
            title: 'Relatórios e Análises',
            excerpt: '...Os <mark>relatórios</mark> permitem visualizar dados e estatísticas sobre pacientes, consultas e faturamento...',
            category: 'Funcionalidades Avançadas'
          },
          {
            id: 'result3',
            sectionId: 'agenda',
            title: 'Agenda e Agendamentos',
            excerpt: '...A funcionalidade de <mark>agenda</mark> permite gerenciar consultas e compromissos de forma eficiente...',
            category: 'Funcionalidades Principais'
          }
        ];
        
        setSearchResults(mockResults);
        setIsSearching(false);
      }, 1000);
    } catch (error) {
      console.error('Erro ao buscar no manual:', error);
      toast({
        title: 'Erro na busca',
        description: 'Não foi possível realizar a busca. Tente novamente mais tarde.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setIsSearching(false);
    }
  };
  
  // Enviar feedback sobre o manual
  const handleSendFeedback = (feedback) => {
    // Em produção, isso seria uma chamada à API
    // ManualService.sendFeedback(feedback);
    
    setFeedbackSent(true);
    
    toast({
      title: 'Feedback enviado',
      description: 'Agradecemos seu feedback sobre o manual digital.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    
    setTimeout(() => {
      setFeedbackSent(false);
    }, 5000);
  };
  
  // Verificar se uma seção está disponível para o plano do usuário
  const isSectionAvailable = (section) => {
    if (!section.planRequired) return true;
    
    const planHierarchy = { plus: 1, pro: 2, master: 3 };
    return planHierarchy[userPlan] >= planHierarchy[section.planRequired];
  };
  
  // Renderizar badge de plano requerido
  const renderPlanBadge = (planRequired) => {
    if (!planRequired) return null;
    
    const planColors = {
      plus: 'orange',
      pro: 'blue',
      master: 'purple'
    };
    
    return (
      <Badge 
        colorScheme={planColors[planRequired]} 
        ml={2}
        fontSize="xs"
      >
        {planRequired.toUpperCase()}
      </Badge>
    );
  };
  
  return (
    <Container maxW="container.xl" py={8}>
      <Box mb={6}>
        <Heading size="lg" mb={2}>Manual Digital UpClinic</Heading>
        <Text color="gray.600">
          Guia completo de uso e referência para o sistema UpClinic
        </Text>
      </Box>
      
      <Tabs colorScheme="blue" variant="enclosed">
        <TabList>
          <Tab><Icon as={FaBook} mr={2} /> Conteúdo</Tab>
          <Tab><Icon as={FaSearch} mr={2} /> Busca</Tab>
          <Tab><Icon as={FaVideo} mr={2} /> Vídeos</Tab>
        </TabList>
        
        <TabPanels>
          {/* Aba de Conteúdo */}
          <TabPanel p={0} pt={4}>
            <Flex 
              direction={{ base: 'column', md: 'row' }} 
              gap={6}
              align="start"
            >
              {/* Sidebar com estrutura do manual */}
              <Box 
                w={{ base: '100%', md: '300px' }} 
                borderWidth="1px"
                borderRadius="md"
                p={4}
                bg={bgColor}
                position="sticky"
                top="20px"
              >
                <Box mb={4}>
                  <Text fontWeight="bold" mb={2}>Seu progresso</Text>
                  <Flex align="center" mb={1}>
                    <Box flex="1">
                      <Box 
                        w="100%" 
                        h="8px" 
                        bg="gray.100" 
                        borderRadius="full"
                        overflow="hidden"
                      >
                        <Box 
                          w={`${userProgress.progress}%`} 
                          h="100%" 
                          bg={accentColor} 
                          borderRadius="full"
                        />
                      </Box>
                    </Box>
                    <Text ml={3} fontSize="sm" fontWeight="medium">
                      {userProgress.progress}%
                    </Text>
                  </Flex>
                  <Text fontSize="xs" color="gray.500">
                    {userProgress.sectionsRead.length} seções lidas
                  </Text>
                </Box>
                
                <Divider mb={4} />
                
                <Accordion allowMultiple defaultIndex={[0]}>
                  {manualStructure.map((category) => (
                    <AccordionItem key={category.id} border="0">
                      <AccordionButton px={2} py={3} _hover={{ bg: 'gray.50' }}>
                        <Box flex="1" textAlign="left" fontWeight="medium">
                          {category.title}
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                      <AccordionPanel pb={4} px={2}>
                        <VStack align="stretch" spacing={1}>
                          {category.sections.map((section) => (
                            <Button
                              key={section.id}
                              variant="ghost"
                              justifyContent="flex-start"
                              size="sm"
                              pl={section.level * 2}
                              rightIcon={
                                !isSectionAvailable(section) 
                                  ? renderPlanBadge(section.planRequired)
                                  : userProgress.sectionsRead.includes(section.id)
                                  ? <Icon as={FaCheck} color="green.500" boxSize={3} />
                                  : null
                              }
                              onClick={() => isSectionAvailable(section) && loadSectionContent(section.id)}
                              isDisabled={!isSectionAvailable(section)}
                              opacity={isSectionAvailable(section) ? 1 : 0.6}
                              _hover={{ bg: 'gray.100' }}
                              color={
                                userProgress.sectionsRead.includes(section.id)
                                  ? 'green.600'
                                  : 'inherit'
                              }
                            >
                              {section.title}
                            </Button>
                          ))}
                        </VStack>
                      </AccordionPanel>
                    </AccordionItem>
                  ))}
                </Accordion>
                
                <Divider my={4} />
                
                <Button 
                  leftIcon={<FaDownload />} 
                  variant="outline" 
                  size="sm" 
                  w="100%"
                  colorScheme="blue"
                >
                  Baixar Manual PDF
                </Button>
              </Box>
              
              {/* Conteúdo da seção selecionada */}
              <Box flex="1">
                {currentSection ? (
                  <Box 
                    borderWidth="1px"
                    borderRadius="md"
                    p={6}
                    bg={bgColor}
                  >
                    <Heading size="lg" mb={2}>{currentSection.title}</Heading>
                    <Text fontSize="sm" color="gray.500" mb={6}>
                      Última atualização: {new Date(currentSection.lastUpdated).toLocaleDateString('pt-BR')}
                    </Text>
                    
                    <Box 
                      className="manual-content"
                      dangerouslySetInnerHTML={{ __html: currentSection.content }}
                      sx={{
                        'h1': {
                          fontSize: 'xl',
                          fontWeight: 'bold',
                          mt: 6,
                          mb: 3
                        },
                        'h2': {
                          fontSize: 'lg',
                          fontWeight: 'semibold',
                          mt: 5,
                          mb: 2
                        },
                        'p': {
                          mb: 4,
                          lineHeight: 1.7
                        },
                        'ul, ol': {
                          pl: 5,
                          mb: 4
                        },
                        'li': {
                          mb: 1
                        }
                      }}
                    />
                    
                    {sectionVideos.length > 0 && (
                      <Box mt={8}>
                        <Heading size="md" mb={4}>Vídeos Relacionados</Heading>
                        <Flex gap={4} wrap="wrap">
                          {sectionVideos.map(video => (
                            <Box 
                              key={video.id} 
                              borderWidth="1px"
                              borderRadius="md"
                              overflow="hidden"
                              w={{ base: '100%', sm: '280px' }}
                            >
                              <Image 
                                src={video.thumbnail} 
                                alt={video.title}
                                w="100%"
                              />
                              <Box p={3}>
                                <Heading size="sm" mb={1}>{video.title}</Heading>
                                <Text fontSize="sm" color="gray.600" mb={2}>
                                  {video.description}
                                </Text>
                                <Text fontSize="xs" color="gray.500">
                                  Duração: {video.duration}
                                </Text>
                                <Button 
                                  size="sm" 
                                  colorScheme="blue" 
                                  leftIcon={<FaPlay />}
                                  mt={2}
                                  w="100%"
                                >
                                  Assistir
                                </Button>
                              </Box>
                            </Box>
                          ))}
                        </Flex>
                      </Box>
                    )}
                    
                    <Divider my={8} />
                    
                    <Box>
                      <Heading size="sm" mb={4}>Este conteúdo foi útil?</Heading>
                      <HStack>
                        <Button 
                          leftIcon={<FaThumbsUp />} 
                          colorScheme="green" 
                          variant="outline"
                          size="sm"
                          onClick={() => handleSendFeedback({ 
                            sectionId: currentSection.id, 
                            helpful: true, 
                            comment: '' 
                          })}
                          isDisabled={feedbackSent}
                        >
                          Sim, foi útil
                        </Button>
                        <Button 
                          leftIcon={<FaThumbsDown />} 
                          colorScheme="red" 
                          variant="outline"
                          size="sm"
                          onClick={() => handleSendFeedback({ 
                            sectionId: currentSection.id, 
                            helpful: false, 
                            comment: '' 
                          })}
                          isDisabled={feedbackSent}
                        >
                          Não foi útil
                        </Button>
                      </HStack>
                      {feedbackSent && (
                        <Text fontSize="sm" color="green.500" mt={2}>
                          Obrigado pelo seu feedback!
                        </Text>
                      )}
                    </Box>
                  </Box>
                ) : (
                  <Box 
                    borderWidth="1px"
                    borderRadius="md"
                    p={6}
                    bg={bgColor}
                    textAlign="center"
                  >
                    <Heading size="md" mb={4}>Bem-vindo ao Manual Digital</Heading>
                    <Text mb={6}>
                      Selecione uma seção no menu à esquerda para começar.
                    </Text>
                    <Image 
                      src="https://via.placeholder.com/600x300?text=Manual+Digital+UpClinic"
                      alt="Manual Digital UpClinic"
                      mx="auto"
                      borderRadius="md"
                    />
                  </Box>
                )}
              </Box>
            </Flex>
          </TabPanel>
          
          {/* Aba de Busca */}
          <TabPanel>
            <Box mb={6}>
              <FormControl>
                <FormLabel>Buscar no manual</FormLabel>
                <Flex>
                  <Input 
                    placeholder="Digite termos de busca..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    mr={2}
                  />
                  <Button 
                    colorScheme="blue" 
                    onClick={handleSearch}
                    isLoading={isSearching}
                  >
                    Buscar
                  </Button>
                </Flex>
              </FormControl>
            </Box>
            
            {searchResults.length > 0 ? (
              <VStack spacing={4} align="stretch">
                <Text fontWeight="medium">
                  {searchResults.length} resultados encontrados
                </Text>
                
                {searchResults.map(result => (
                  <Box 
                    key={result.id}
                    borderWidth="1px"
                    borderRadius="md"
                    p={4}
                    _hover={{ borderColor: 'blue.300' }}
                  >
                    <Heading size="sm" mb={1}>
                      <Link 
                        color="blue.600" 
                        onClick={() => {
                          loadSectionContent(result.sectionId);
                          // Mudar para a aba de conteúdo
                          document.querySelector('[role="tab"]').click();
                        }}
                      >
                        {result.title}
                      </Link>
                    </Heading>
                    <Text fontSize="sm" color="gray.500" mb={2}>
                      {result.category}
                    </Text>
                    <Text 
                      fontSize="sm" 
                      dangerouslySetInnerHTML={{ __html: result.excerpt }}
                    />
                  </Box>
                ))}
              </VStack>
            ) : searchQuery && !isSearching ? (
              <Box 
                borderWidth="1px"
                borderRadius="md"
                p={6}
                textAlign="center"
              >
                <Heading size="md" mb={2}>Nenhum resultado encontrado</Heading>
                <Text>
                  Tente usar termos diferentes ou mais gerais na sua busca.
                </Text>
              </Box>
            ) : null}
          </TabPanel>
          
          {/* Aba de Vídeos */}
          <TabPanel>
            <Box mb={6}>
              <Heading size="md" mb={4}>Biblioteca de Vídeos</Heading>
              <Text mb={4}>
                Explore nossa coleção de vídeos tutoriais para aprender a usar o UpClinic de forma eficiente.
              </Text>
              
              <Select 
                placeholder="Filtrar por categoria" 
                mb={4}
                maxW="300px"
              >
                <option value="all">Todos os vídeos</option>
                <option value="getting-started">Primeiros Passos</option>
                <option value="core-features">Funcionalidades Principais</option>
                <option value="advanced-features">Funcionalidades Avançadas</option>
                <option value="administration">Administração</option>
              </Select>
            </Box>
            
            <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={6}>
              {/* Vídeos simulados */}
              {[1, 2, 3, 4, 5, 6].map(index => (
                <Box 
                  key={index}
                  borderWidth="1px"
                  borderRadius="md"
                  overflow="hidden"
                >
                  <Image 
                    src={`https://via.placeholder.com/320x180?text=Video+Tutorial+${index}`}
                    alt={`Tutorial ${index}`}
                  />
                  <Box p={4}>
                    <Heading size="sm" mb={1}>Tutorial: Funcionalidade {index}</Heading>
                    <Text fontSize="sm" color="gray.600" mb={2}>
                      Aprenda a usar esta funcionalidade do UpClinic de forma eficiente.
                    </Text>
                    <Flex justify="space-between" align="center">
                      <Text fontSize="xs" color="gray.500">
                        Duração: {Math.floor(Math.random() * 5) + 2}:{Math.floor(Math.random() * 60).toString().padStart(2, '0')}
                      </Text>
                      <Badge colorScheme={index % 3 === 0 ? 'green' : index % 3 === 1 ? 'blue' : 'purple'}>
                        {index % 3 === 0 ? 'Básico' : index % 3 === 1 ? 'Intermediário' : 'Avançado'}
                      </Badge>
                    </Flex>
                    <Button 
                      size="sm" 
                      colorScheme="blue" 
                      leftIcon={<FaPlay />}
                      mt={3}
                      w="100%"
                    >
                      Assistir
                    </Button>
                  </Box>
                </Box>
              ))}
            </SimpleGrid>
            
            <Box textAlign="center" mt={8}>
              <Button colorScheme="blue" variant="outline">
                Carregar Mais Vídeos
              </Button>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default ManualDigitalPage;
