import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  Flex, 
  Heading, 
  Text, 
  Progress, 
  useDisclosure, 
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  VStack,
  HStack,
  Icon,
  Badge,
  useToast
} from '@chakra-ui/react';
import Joyride, { STATUS } from 'react-joyride';
import { FaPlay, FaCheck, FaLock, FaInfoCircle } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { useSubscription } from '../../contexts/SubscriptionContext';
import VideoPlayer from './VideoPlayer';

/**
 * Componente responsável pelo gerenciamento do onboarding interativo
 * Exibe tutoriais, vídeos e guias baseados no plano do usuário
 */
const OnboardingManager = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuth();
  const { userPlan, planType } = useSubscription();
  const toast = useToast();
  
  // Estado para controlar o progresso do onboarding
  const [onboardingProgress, setOnboardingProgress] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [showTour, setShowTour] = useState(false);
  
  // Configuração do tour guiado com Joyride
  const [tourSteps, setTourSteps] = useState([]);
  const [runTour, setRunTour] = useState(false);
  
  // Definição dos passos de onboarding baseados no plano
  const onboardingSteps = {
    plus: [
      { id: 'welcome', title: 'Bem-vindo ao UpClinic', description: 'Conheça as funcionalidades básicas', videoUrl: '/videos/welcome.mp4', required: true },
      { id: 'profile', title: 'Configure seu Perfil', description: 'Personalize suas informações', videoUrl: '/videos/profile-setup.mp4', required: true },
      { id: 'agenda', title: 'Agendamento', description: 'Aprenda a gerenciar sua agenda', videoUrl: '/videos/agenda.mp4', required: true },
      { id: 'prontuario', title: 'Prontuário Eletrônico', description: 'Registre informações dos pacientes', videoUrl: '/videos/prontuario.mp4', required: true },
      { id: 'telemedicina', title: 'Telemedicina Básica', description: 'Realize consultas remotas', videoUrl: '/videos/telemedicina-basica.mp4', required: true },
    ],
    pro: [
      { id: 'welcome', title: 'Bem-vindo ao UpClinic Pro', description: 'Conheça as funcionalidades avançadas', videoUrl: '/videos/welcome-pro.mp4', required: true },
      { id: 'profile', title: 'Configure seu Perfil', description: 'Personalize suas informações', videoUrl: '/videos/profile-setup.mp4', required: true },
      { id: 'agenda', title: 'Agendamento Avançado', description: 'Aprenda a gerenciar sua agenda', videoUrl: '/videos/agenda-pro.mp4', required: true },
      { id: 'prontuario', title: 'Prontuário Eletrônico', description: 'Registre informações dos pacientes', videoUrl: '/videos/prontuario-pro.mp4', required: true },
      { id: 'telemedicina', title: 'Telemedicina Avançada', description: 'Realize consultas remotas com recursos avançados', videoUrl: '/videos/telemedicina-pro.mp4', required: true },
      { id: 'relatorios', title: 'Relatórios', description: 'Analise dados e métricas', videoUrl: '/videos/relatorios.mp4', required: false },
      { id: 'wearables', title: 'Integração com Wearables', description: 'Conecte dispositivos de saúde', videoUrl: '/videos/wearables.mp4', required: false },
    ],
    master: [
      { id: 'welcome', title: 'Bem-vindo ao UpClinic Master', description: 'Conheça todas as funcionalidades', videoUrl: '/videos/welcome-master.mp4', required: true },
      { id: 'profile', title: 'Configure seu Perfil', description: 'Personalize suas informações', videoUrl: '/videos/profile-setup.mp4', required: true },
      { id: 'agenda', title: 'Agendamento Completo', description: 'Aprenda a gerenciar sua agenda', videoUrl: '/videos/agenda-master.mp4', required: true },
      { id: 'prontuario', title: 'Prontuário Inteligente', description: 'Utilize IA para otimizar registros', videoUrl: '/videos/prontuario-master.mp4', required: true },
      { id: 'telemedicina', title: 'Telemedicina Premium', description: 'Recursos avançados de telemedicina', videoUrl: '/videos/telemedicina-master.mp4', required: true },
      { id: 'relatorios', title: 'Relatórios Avançados', description: 'Análise completa de dados', videoUrl: '/videos/relatorios-master.mp4', required: false },
      { id: 'wearables', title: 'Integração com Wearables', description: 'Conecte dispositivos de saúde', videoUrl: '/videos/wearables-master.mp4', required: false },
      { id: 'anamnese', title: 'Anamnese Automática', description: 'Utilize IA para transcrição', videoUrl: '/videos/anamnese-automatica.mp4', required: false },
      { id: 'mapa', title: 'Mapa Populacional', description: 'Análise de dados populacionais', videoUrl: '/videos/mapa-populacional.mp4', required: false },
    ]
  };
  
  // Definição dos passos do tour guiado
  const getTourSteps = () => {
    return [
      {
        target: '.dashboard-header',
        content: 'Este é o seu Dashboard personalizado. Aqui você encontra um resumo das suas atividades e acesso rápido às principais funcionalidades.',
        disableBeacon: true,
      },
      {
        target: '.sidebar-menu',
        content: 'No menu lateral você encontra todas as funcionalidades disponíveis para o seu plano.',
        placement: 'right',
      },
      {
        target: '.agenda-button',
        content: 'Clique aqui para acessar sua agenda e gerenciar consultas.',
      },
      {
        target: '.prontuario-button',
        content: 'Acesse o prontuário eletrônico para registrar informações dos pacientes.',
      },
      {
        target: '.telemedicina-button',
        content: 'Realize consultas remotas através da nossa plataforma de telemedicina.',
      },
      {
        target: '.profile-menu',
        content: 'Aqui você pode acessar seu perfil, configurações e sair do sistema.',
        placement: 'left',
      },
      {
        target: '.help-button',
        content: 'Precisa de ajuda? Clique aqui para acessar o manual completo ou entrar em contato com o suporte.',
        placement: 'left',
      }
    ];
  };
  
  // Efeito para carregar o progresso do onboarding
  useEffect(() => {
    // Simulação de carregamento do progresso do usuário
    // Em produção, isso viria de uma API
    const loadOnboardingProgress = async () => {
      try {
        // Simula chamada à API
        setTimeout(() => {
          // Verifica se é o primeiro acesso
          const isFirstAccess = localStorage.getItem('firstAccess') !== 'false';
          
          if (isFirstAccess) {
            // Se for primeiro acesso, mostra modal de boas-vindas
            onOpen();
            localStorage.setItem('firstAccess', 'false');
          }
          
          // Carrega passos completados (simulado)
          const savedSteps = JSON.parse(localStorage.getItem('completedSteps') || '[]');
          setCompletedSteps(savedSteps);
          
          // Calcula progresso
          const steps = onboardingSteps[userPlan] || onboardingSteps.plus;
          const requiredSteps = steps.filter(step => step.required);
          const completedRequired = savedSteps.filter(stepId => 
            requiredSteps.some(reqStep => reqStep.id === stepId)
          );
          
          const progress = requiredSteps.length > 0 
            ? Math.round((completedRequired.length / requiredSteps.length) * 100) 
            : 0;
            
          setOnboardingProgress(progress);
        }, 1000);
      } catch (error) {
        console.error('Erro ao carregar progresso do onboarding:', error);
      }
    };
    
    loadOnboardingProgress();
    setTourSteps(getTourSteps());
  }, [userPlan, onOpen]);
  
  // Manipulador para iniciar o tour guiado
  const handleStartTour = () => {
    setRunTour(true);
  };
  
  // Manipulador para eventos do tour
  const handleJoyrideCallback = (data) => {
    const { status } = data;
    
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRunTour(false);
      
      // Marca o tour como concluído
      const newCompletedSteps = [...completedSteps];
      if (!newCompletedSteps.includes('guided-tour')) {
        newCompletedSteps.push('guided-tour');
        setCompletedSteps(newCompletedSteps);
        localStorage.setItem('completedSteps', JSON.stringify(newCompletedSteps));
        
        // Atualiza o progresso
        updateProgress(newCompletedSteps);
      }
      
      toast({
        title: status === STATUS.FINISHED ? 'Tour concluído!' : 'Tour ignorado',
        description: status === STATUS.FINISHED 
          ? 'Você concluiu o tour guiado. Continue explorando o sistema.' 
          : 'Você pode reiniciar o tour a qualquer momento pelo menu de ajuda.',
        status: status === STATUS.FINISHED ? 'success' : 'info',
        duration: 5000,
        isClosable: true,
      });
    }
  };
  
  // Função para atualizar o progresso
  const updateProgress = (steps) => {
    const currentSteps = onboardingSteps[userPlan] || onboardingSteps.plus;
    const requiredSteps = currentSteps.filter(step => step.required);
    const completedRequired = steps.filter(stepId => 
      requiredSteps.some(reqStep => reqStep.id === stepId)
    );
    
    const progress = requiredSteps.length > 0 
      ? Math.round((completedRequired.length / requiredSteps.length) * 100) 
      : 0;
      
    setOnboardingProgress(progress);
  };
  
  // Manipulador para iniciar um vídeo
  const handleStartVideo = (step) => {
    setCurrentVideo(step);
  };
  
  // Manipulador para concluir um vídeo
  const handleVideoComplete = () => {
    if (currentVideo) {
      // Marca o vídeo como concluído
      const newCompletedSteps = [...completedSteps];
      if (!newCompletedSteps.includes(currentVideo.id)) {
        newCompletedSteps.push(currentVideo.id);
        setCompletedSteps(newCompletedSteps);
        localStorage.setItem('completedSteps', JSON.stringify(newCompletedSteps));
        
        // Atualiza o progresso
        updateProgress(newCompletedSteps);
      }
      
      setCurrentVideo(null);
      
      toast({
        title: 'Vídeo concluído!',
        description: `Você concluiu o vídeo "${currentVideo.title}".`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  };
  
  // Renderiza os passos de onboarding
  const renderOnboardingSteps = () => {
    const steps = onboardingSteps[userPlan] || onboardingSteps.plus;
    
    return (
      <VStack spacing={4} align="stretch" mt={6}>
        {steps.map((step) => (
          <Box 
            key={step.id}
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            borderColor={completedSteps.includes(step.id) ? "green.200" : "gray.200"}
            bg={completedSteps.includes(step.id) ? "green.50" : "white"}
          >
            <Flex justify="space-between" align="center">
              <HStack>
                <Icon 
                  as={completedSteps.includes(step.id) ? FaCheck : FaPlay}
                  color={completedSteps.includes(step.id) ? "green.500" : "brand.500"}
                  boxSize={5}
                />
                <Box>
                  <Heading size="sm">{step.title}</Heading>
                  <Text color="gray.600" fontSize="sm">{step.description}</Text>
                </Box>
                {step.required && (
                  <Badge colorScheme="red" ml={2}>Obrigatório</Badge>
                )}
              </HStack>
              
              <Button
                size="sm"
                colorScheme={completedSteps.includes(step.id) ? "green" : "brand"}
                leftIcon={<Icon as={completedSteps.includes(step.id) ? FaCheck : FaPlay} />}
                onClick={() => handleStartVideo(step)}
              >
                {completedSteps.includes(step.id) ? "Rever" : "Iniciar"}
              </Button>
            </Flex>
          </Box>
        ))}
      </VStack>
    );
  };
  
  return (
    <>
      {/* Tour guiado */}
      <Joyride
        steps={tourSteps}
        run={runTour}
        continuous
        showProgress
        showSkipButton
        styles={{
          options: {
            primaryColor: '#1976D2',
            zIndex: 10000,
          },
        }}
        callback={handleJoyrideCallback}
        locale={{
          back: 'Anterior',
          close: 'Fechar',
          last: 'Finalizar',
          next: 'Próximo',
          skip: 'Pular',
        }}
      />
      
      {/* Modal de boas-vindas */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg="brand.500" color="white" borderTopRadius="md">
            Bem-vindo ao UpClinic {userPlan.charAt(0).toUpperCase() + userPlan.slice(1)}!
          </ModalHeader>
          <ModalCloseButton color="white" />
          
          <ModalBody py={6}>
            <VStack spacing={6} align="stretch">
              <Text>
                Estamos muito felizes em tê-lo conosco! Para ajudá-lo a aproveitar ao máximo o UpClinic, 
                preparamos um guia de introdução personalizado para o seu plano.
              </Text>
              
              <Box bg="blue.50" p={4} borderRadius="md">
                <Heading size="sm" mb={2} color="blue.700">
                  <Icon as={FaInfoCircle} mr={2} />
                  Seu plano: {userPlan.toUpperCase()} ({planType})
                </Heading>
                <Text color="blue.700">
                  Este plano inclui {userPlan === 'plus' ? 'funcionalidades essenciais' : 
                    userPlan === 'pro' ? 'recursos avançados' : 'acesso completo'} para otimizar sua prática clínica.
                </Text>
              </Box>
              
              <Box>
                <Heading size="sm" mb={3}>O que você gostaria de fazer primeiro?</Heading>
                <HStack spacing={4}>
                  <Button 
                    colorScheme="brand" 
                    leftIcon={<FaPlay />}
                    onClick={() => {
                      onClose();
                      handleStartTour();
                    }}
                  >
                    Tour Guiado
                  </Button>
                  <Button 
                    variant="outline" 
                    colorScheme="brand"
                    onClick={onClose}
                  >
                    Explorar por Conta Própria
                  </Button>
                </HStack>
              </Box>
            </VStack>
          </ModalBody>
          
          <ModalFooter bg="gray.50" borderBottomRadius="md">
            <Text fontSize="sm" color="gray.600">
              Você pode acessar este guia a qualquer momento através do menu de ajuda.
            </Text>
          </ModalFooter>
        </ModalContent>
      </Modal>
      
      {/* Modal de vídeo */}
      <Modal 
        isOpen={currentVideo !== null} 
        onClose={() => setCurrentVideo(null)}
        size="xl"
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{currentVideo?.title}</ModalHeader>
          <ModalCloseButton />
          
          <ModalBody>
            {currentVideo && (
              <VideoPlayer 
                videoUrl={currentVideo.videoUrl}
                onComplete={handleVideoComplete}
              />
            )}
          </ModalBody>
          
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={() => setCurrentVideo(null)}>
              Fechar
            </Button>
            <Button colorScheme="brand" onClick={handleVideoComplete}>
              Marcar como Concluído
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      
      {/* Conteúdo principal */}
      <Box p={6}>
        <Flex justify="space-between" align="center" mb={6}>
          <Heading size="lg">Guia de Introdução</Heading>
          <Button 
            colorScheme="brand" 
            leftIcon={<FaPlay />}
            onClick={handleStartTour}
          >
            Iniciar Tour Guiado
          </Button>
        </Flex>
        
        <Box mb={6}>
          <Flex justify="space-between" align="center" mb={2}>
            <Text fontWeight="medium">Progresso do Onboarding</Text>
            <Text>{onboardingProgress}% concluído</Text>
          </Flex>
          <Progress 
            value={onboardingProgress} 
            colorScheme="brand" 
            height="8px" 
            borderRadius="full" 
          />
        </Box>
        
        {renderOnboardingSteps()}
      </Box>
    </>
  );
};

export default OnboardingManager;
