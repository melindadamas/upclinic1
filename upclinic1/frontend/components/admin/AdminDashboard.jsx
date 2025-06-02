import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Button,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Select,
  Input,
  InputGroup,
  InputLeftElement,
  HStack,
  VStack,
  Card,
  CardHeader,
  CardBody,
  SimpleGrid,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Switch
} from '@chakra-ui/react';
import { 
  FaSearch, 
  FaUsers, 
  FaMoneyBillWave, 
  FaChartLine, 
  FaUserPlus, 
  FaUserMinus,
  FaEdit,
  FaTrash,
  FaEye,
  FaLock,
  FaUnlock
} from 'react-icons/fa';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registrar componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

/**
 * Painel Administrativo para gestão de assinaturas
 * Acesso exclusivo para administradores do sistema
 */
const AdminDashboard = () => {
  const [period, setPeriod] = useState('month');
  const [searchTerm, setSearchTerm] = useState('');
  const [subscriptions, setSubscriptions] = useState([]);
  const [stats, setStats] = useState({});
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  // Carregar dados ao iniciar
  useEffect(() => {
    loadDashboardData();
  }, [period]);

  // Função para carregar dados do dashboard
  const loadDashboardData = () => {
    // Em produção, isso seria uma chamada à API
    // Simulação de dados para demonstração
    
    // Estatísticas
    const mockStats = {
      totalSubscriptions: 256,
      activeSubscriptions: 238,
      monthlyRevenue: period === 'month' ? 8750 : period === 'quarter' ? 26250 : 105000,
      conversionRate: 4.8,
      churnRate: 1.2,
      growthRate: 3.6,
      planDistribution: {
        plus: 45,
        pro: 35,
        master: 20
      },
      billingTypeDistribution: {
        monthly: 65,
        annual: 35
      }
    };
    
    // Assinaturas
    const mockSubscriptions = [
      {
        id: 'sub_001',
        customer: {
          name: 'Dr. Carlos Silva',
          email: 'carlos.silva@exemplo.com',
          phone: '(11) 98765-4321'
        },
        plan: 'master',
        billingType: 'annual',
        status: 'active',
        startDate: '2025-03-15',
        nextBillingDate: '2026-03-15',
        amount: 540.00,
        paymentMethod: 'credit_card'
      },
      {
        id: 'sub_002',
        customer: {
          name: 'Dra. Ana Oliveira',
          email: 'ana.oliveira@exemplo.com',
          phone: '(21) 98765-4321'
        },
        plan: 'pro',
        billingType: 'monthly',
        status: 'active',
        startDate: '2025-04-10',
        nextBillingDate: '2025-06-10',
        amount: 35.00,
        paymentMethod: 'credit_card'
      },
      {
        id: 'sub_003',
        customer: {
          name: 'Dr. Marcos Santos',
          email: 'marcos.santos@exemplo.com',
          phone: '(31) 98765-4321'
        },
        plan: 'plus',
        billingType: 'monthly',
        status: 'trial',
        startDate: '2025-05-20',
        nextBillingDate: '2025-05-27',
        amount: 0.00,
        paymentMethod: 'pending'
      },
      {
        id: 'sub_004',
        customer: {
          name: 'Dra. Juliana Costa',
          email: 'juliana.costa@exemplo.com',
          phone: '(41) 98765-4321'
        },
        plan: 'pro',
        billingType: 'annual',
        status: 'active',
        startDate: '2025-02-05',
        nextBillingDate: '2026-02-05',
        amount: 420.00,
        paymentMethod: 'boleto'
      },
      {
        id: 'sub_005',
        customer: {
          name: 'Dr. Roberto Almeida',
          email: 'roberto.almeida@exemplo.com',
          phone: '(51) 98765-4321'
        },
        plan: 'master',
        billingType: 'monthly',
        status: 'inactive',
        startDate: '2025-01-10',
        nextBillingDate: null,
        amount: 45.00,
        paymentMethod: 'credit_card'
      },
      {
        id: 'sub_006',
        customer: {
          name: 'Dra. Fernanda Lima',
          email: 'fernanda.lima@exemplo.com',
          phone: '(61) 98765-4321'
        },
        plan: 'plus',
        billingType: 'annual',
        status: 'active',
        startDate: '2025-04-15',
        nextBillingDate: '2026-04-15',
        amount: 180.00,
        paymentMethod: 'pix'
      },
      {
        id: 'sub_007',
        customer: {
          name: 'Dr. Paulo Mendes',
          email: 'paulo.mendes@exemplo.com',
          phone: '(71) 98765-4321'
        },
        plan: 'pro',
        billingType: 'monthly',
        status: 'pending',
        startDate: '2025-05-22',
        nextBillingDate: '2025-06-22',
        amount: 35.00,
        paymentMethod: 'boleto'
      }
    ];
    
    setStats(mockStats);
    setSubscriptions(mockSubscriptions);
  };

  // Filtrar assinaturas com base no termo de busca
  const filteredSubscriptions = subscriptions.filter(sub => {
    const searchLower = searchTerm.toLowerCase();
    return (
      sub.customer.name.toLowerCase().includes(searchLower) ||
      sub.customer.email.toLowerCase().includes(searchLower) ||
      sub.id.toLowerCase().includes(searchLower)
    );
  });

  // Função para visualizar detalhes da assinatura
  const handleViewSubscription = (subscription) => {
    setSelectedSubscription(subscription);
    onOpen();
  };

  // Função para atualizar status da assinatura
  const handleUpdateStatus = (id, newStatus) => {
    // Em produção, isso seria uma chamada à API
    // Simulação de atualização
    const updatedSubscriptions = subscriptions.map(sub => {
      if (sub.id === id) {
        return { ...sub, status: newStatus };
      }
      return sub;
    });
    
    setSubscriptions(updatedSubscriptions);
    
    toast({
      title: 'Status atualizado',
      description: `Assinatura ${id} atualizada para ${newStatus}`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    
    // Fechar modal se estiver aberto
    if (isOpen && selectedSubscription?.id === id) {
      setSelectedSubscription({ ...selectedSubscription, status: newStatus });
    }
  };

  // Dados para gráficos
  const revenueChartData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Receita Mensal (R$)',
        data: [6500, 7200, 7800, 8300, 8750, 9100],
        borderColor: 'rgba(25, 118, 210, 1)',
        backgroundColor: 'rgba(25, 118, 210, 0.2)',
        fill: true,
      },
    ],
  };

  const subscriptionsChartData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Novas Assinaturas',
        data: [28, 35, 42, 38, 45, 50],
        backgroundColor: 'rgba(76, 175, 80, 0.6)',
      },
      {
        label: 'Cancelamentos',
        data: [5, 8, 6, 4, 7, 3],
        backgroundColor: 'rgba(244, 67, 54, 0.6)',
      },
    ],
  };

  const planDistributionChartData = {
    labels: ['Plus', 'Pro', 'Master'],
    datasets: [
      {
        data: [stats.planDistribution?.plus || 0, stats.planDistribution?.pro || 0, stats.planDistribution?.master || 0],
        backgroundColor: [
          'rgba(255, 152, 0, 0.6)',
          'rgba(25, 118, 210, 0.6)',
          'rgba(66, 66, 66, 0.6)',
        ],
        borderColor: [
          'rgba(255, 152, 0, 1)',
          'rgba(25, 118, 210, 1)',
          'rgba(66, 66, 66, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Renderizar badge de status
  const renderStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge colorScheme="green">Ativo</Badge>;
      case 'inactive':
        return <Badge colorScheme="red">Inativo</Badge>;
      case 'trial':
        return <Badge colorScheme="purple">Teste</Badge>;
      case 'pending':
        return <Badge colorScheme="yellow">Pendente</Badge>;
      default:
        return <Badge colorScheme="gray">{status}</Badge>;
    }
  };

  // Renderizar badge de plano
  const renderPlanBadge = (plan) => {
    switch (plan) {
      case 'plus':
        return <Badge colorScheme="orange">Plus</Badge>;
      case 'pro':
        return <Badge colorScheme="blue">Pro</Badge>;
      case 'master':
        return <Badge colorScheme="gray">Master</Badge>;
      default:
        return <Badge>{plan}</Badge>;
    }
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Box mb={8}>
        <Heading size="lg" mb={2}>Painel Administrativo UpClinic</Heading>
        <Text color="gray.600">Gestão de assinaturas e monitoramento de receitas</Text>
      </Box>

      <Tabs colorScheme="blue" variant="enclosed">
        <TabList>
          <Tab>Dashboard</Tab>
          <Tab>Assinaturas</Tab>
          <Tab>Relatórios</Tab>
          <Tab>Configurações</Tab>
        </TabList>

        <TabPanels>
          {/* Dashboard Tab */}
          <TabPanel>
            <Box mb={6}>
              <Flex justify="space-between" align="center" mb={4}>
                <Heading size="md">Visão Geral</Heading>
                <Select 
                  value={period} 
                  onChange={(e) => setPeriod(e.target.value)} 
                  width="200px"
                >
                  <option value="month">Último Mês</option>
                  <option value="quarter">Último Trimestre</option>
                  <option value="year">Último Ano</option>
                </Select>
              </Flex>

              <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
                <Card>
                  <CardHeader bg="blue.50" p={4}>
                    <Flex align="center">
                      <Box 
                        bg="blue.500" 
                        p={2} 
                        borderRadius="md" 
                        color="white" 
                        mr={3}
                      >
                        <FaUsers />
                      </Box>
                      <Text fontWeight="medium">Assinaturas</Text>
                    </Flex>
                  </CardHeader>
                  <CardBody>
                    <Stat>
                      <StatNumber>{stats.activeSubscriptions || 0}</StatNumber>
                      <StatHelpText>
                        <StatArrow type="increase" />
                        {stats.growthRate || 0}% desde o último período
                      </StatHelpText>
                    </Stat>
                  </CardBody>
                </Card>

                <Card>
                  <CardHeader bg="green.50" p={4}>
                    <Flex align="center">
                      <Box 
                        bg="green.500" 
                        p={2} 
                        borderRadius="md" 
                        color="white" 
                        mr={3}
                      >
                        <FaMoneyBillWave />
                      </Box>
                      <Text fontWeight="medium">Receita</Text>
                    </Flex>
                  </CardHeader>
                  <CardBody>
                    <Stat>
                      <StatNumber>R$ {stats.monthlyRevenue?.toLocaleString() || 0}</StatNumber>
                      <StatHelpText>
                        <StatArrow type="increase" />
                        5.2% desde o último período
                      </StatHelpText>
                    </Stat>
                  </CardBody>
                </Card>

                <Card>
                  <CardHeader bg="orange.50" p={4}>
                    <Flex align="center">
                      <Box 
                        bg="orange.500" 
                        p={2} 
                        borderRadius="md" 
                        color="white" 
                        mr={3}
                      >
                        <FaUserPlus />
                      </Box>
                      <Text fontWeight="medium">Conversão</Text>
                    </Flex>
                  </CardHeader>
                  <CardBody>
                    <Stat>
                      <StatNumber>{stats.conversionRate || 0}%</StatNumber>
                      <StatHelpText>
                        <StatArrow type="increase" />
                        0.8% desde o último período
                      </StatHelpText>
                    </Stat>
                  </CardBody>
                </Card>

                <Card>
                  <CardHeader bg="red.50" p={4}>
                    <Flex align="center">
                      <Box 
                        bg="red.500" 
                        p={2} 
                        borderRadius="md" 
                        color="white" 
                        mr={3}
                      >
                        <FaUserMinus />
                      </Box>
                      <Text fontWeight="medium">Churn</Text>
                    </Flex>
                  </CardHeader>
                  <CardBody>
                    <Stat>
                      <StatNumber>{stats.churnRate || 0}%</StatNumber>
                      <StatHelpText>
                        <StatArrow type="decrease" />
                        0.3% desde o último período
                      </StatHelpText>
                    </Stat>
                  </CardBody>
                </Card>
              </SimpleGrid>
            </Box>

            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8} mb={8}>
              <Box p={4} borderWidth="1px" borderRadius="lg" height="350px">
                <Heading size="sm" mb={4}>Receita Mensal</Heading>
                <Line 
                  data={revenueChartData} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                    },
                  }}
                />
              </Box>

              <Box p={4} borderWidth="1px" borderRadius="lg" height="350px">
                <Heading size="sm" mb={4}>Assinaturas x Cancelamentos</Heading>
                <Bar 
                  data={subscriptionsChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                    },
                  }}
                />
              </Box>
            </SimpleGrid>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
              <Box p={4} borderWidth="1px" borderRadius="lg" height="300px">
                <Heading size="sm" mb={4}>Distribuição por Plano</Heading>
                <Pie 
                  data={planDistributionChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'right',
                      },
                    },
                  }}
                />
              </Box>

              <Box p={4} borderWidth="1px" borderRadius="lg">
                <Heading size="sm" mb={4}>Assinaturas Recentes</Heading>
                <Table variant="simple" size="sm">
                  <Thead>
                    <Tr>
                      <Th>Cliente</Th>
                      <Th>Plano</Th>
                      <Th>Data</Th>
                      <Th>Status</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {subscriptions.slice(0, 5).map((sub) => (
                      <Tr key={sub.id}>
                        <Td>{sub.customer.name}</Td>
                        <Td>{renderPlanBadge(sub.plan)}</Td>
                        <Td>{new Date(sub.startDate).toLocaleDateString('pt-BR')}</Td>
                        <Td>{renderStatusBadge(sub.status)}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            </SimpleGrid>
          </TabPanel>

          {/* Assinaturas Tab */}
          <TabPanel>
            <Box mb={6}>
              <Flex justify="space-between" align="center" mb={4}>
                <Heading size="md">Gerenciar Assinaturas</Heading>
                <InputGroup maxW="300px">
                  <InputLeftElement pointerEvents="none">
                    <FaSearch color="gray.300" />
                  </InputLeftElement>
                  <Input 
                    placeholder="Buscar por nome, email ou ID" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </Flex>

              <Box overflowX="auto">
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>ID</Th>
                      <Th>Cliente</Th>
                      <Th>Plano</Th>
                      <Th>Cobrança</Th>
                      <Th>Status</Th>
                      <Th>Próx. Cobrança</Th>
                      <Th>Valor</Th>
                      <Th>Ações</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {filteredSubscriptions.map((sub) => (
                      <Tr key={sub.id}>
                        <Td>{sub.id}</Td>
                        <Td>
                          <VStack align="start" spacing={0}>
                            <Text fontWeight="medium">{sub.customer.name}</Text>
                            <Text fontSize="sm" color="gray.600">{sub.customer.email}</Text>
                          </VStack>
                        </Td>
                        <Td>{renderPlanBadge(sub.plan)}</Td>
                        <Td>
                          <Badge colorScheme={sub.billingType === 'annual' ? 'green' : 'blue'}>
                            {sub.billingType === 'annual' ? 'Anual' : 'Mensal'}
                          </Badge>
                        </Td>
                        <Td>{renderStatusBadge(sub.status)}</Td>
                        <Td>
                          {sub.nextBillingDate 
                            ? new Date(sub.nextBillingDate).toLocaleDateString('pt-BR') 
                            : '-'}
                        </Td>
                        <Td>R$ {sub.amount.toFixed(2)}</Td>
                        <Td>
                          <HStack spacing={2}>
                            <Button 
                              size="sm" 
                              colorScheme="blue" 
                              variant="ghost"
                              onClick={() => handleViewSubscription(sub)}
                            >
                              <FaEye />
                            </Button>
                            {sub.status === 'active' ? (
                              <Button 
                                size="sm" 
                                colorScheme="red" 
                                variant="ghost"
                                onClick={() => handleUpdateStatus(sub.id, 'inactive')}
                              >
                                <FaLock />
                              </Button>
                            ) : (
                              <Button 
                                size="sm" 
                                colorScheme="green" 
                                variant="ghost"
                                onClick={() => handleUpdateStatus(sub.id, 'active')}
                              >
                                <FaUnlock />
                              </Button>
                            )}
                          </HStack>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            </Box>
          </TabPanel>

          {/* Relatórios Tab */}
          <TabPanel>
            <Box mb={6}>
              <Heading size="md" mb={4}>Relatórios</Heading>
              
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                <Card>
                  <CardHeader bg="blue.50" p={4}>
                    <Heading size="sm">Relatório de Receitas</Heading>
                  </CardHeader>
                  <CardBody>
                    <Text mb={4}>Análise detalhada de receitas por período, plano e método de pagamento.</Text>
                    <Button colorScheme="blue">Gerar Relatório</Button>
                  </CardBody>
                </Card>
                
                <Card>
                  <CardHeader bg="green.50" p={4}>
                    <Heading size="sm">Relatório de Assinaturas</Heading>
                  </CardHeader>
                  <CardBody>
                    <Text mb={4}>Análise de novas assinaturas, renovações e cancelamentos.</Text>
                    <Button colorScheme="green">Gerar Relatório</Button>
                  </CardBody>
                </Card>
                
                <Card>
                  <CardHeader bg="purple.50" p={4}>
                    <Heading size="sm">Relatório de Uso</Heading>
                  </CardHeader>
                  <CardBody>
                    <Text mb={4}>Análise de uso do sistema por funcionalidade e perfil de usuário.</Text>
                    <Button colorScheme="purple">Gerar Relatório</Button>
                  </CardBody>
                </Card>
                
                <Card>
                  <CardHeader bg="orange.50" p={4}>
                    <Heading size="sm">Relatório de Conversão</Heading>
                  </CardHeader>
                  <CardBody>
                    <Text mb={4}>Análise de taxas de conversão de trial para assinatura paga.</Text>
                    <Button colorScheme="orange">Gerar Relatório</Button>
                  </CardBody>
                </Card>
              </SimpleGrid>
            </Box>
          </TabPanel>

          {/* Configurações Tab */}
          <TabPanel>
            <Box mb={6}>
              <Heading size="md" mb={4}>Configurações</Heading>
              
              <VStack spacing={6} align="stretch">
                <Card>
                  <CardHeader bg="gray.50" p={4}>
                    <Heading size="sm">Configurações de Planos</Heading>
                  </CardHeader>
                  <CardBody>
                    <VStack spacing={4} align="stretch">
                      <FormControl display="flex" alignItems="center">
                        <FormLabel mb="0">
                          Permitir teste gratuito de 7 dias para plano Plus
                        </FormLabel>
                        <Switch colorScheme="blue" defaultChecked />
                      </FormControl>
                      
                      <FormControl display="flex" alignItems="center">
                        <FormLabel mb="0">
                          Aplicar descontos progressivos automaticamente
                        </FormLabel>
                        <Switch colorScheme="blue" defaultChecked />
                      </FormControl>
                      
                      <FormControl display="flex" alignItems="center">
                        <FormLabel mb="0">
                          Permitir upgrade de plano a qualquer momento
                        </FormLabel>
                        <Switch colorScheme="blue" defaultChecked />
                      </FormControl>
                      
                      <FormControl display="flex" alignItems="center">
                        <FormLabel mb="0">
                          Permitir downgrade de plano apenas no fim do ciclo
                        </FormLabel>
                        <Switch colorScheme="blue" defaultChecked />
                      </FormControl>
                    </VStack>
                  </CardBody>
                </Card>
                
                <Card>
                  <CardHeader bg="gray.50" p={4}>
                    <Heading size="sm">Configurações de Pagamento</Heading>
                  </CardHeader>
                  <CardBody>
                    <VStack spacing={4} align="stretch">
                      <FormControl display="flex" alignItems="center">
                        <FormLabel mb="0">
                          Integração com PagSeguro ativa
                        </FormLabel>
                        <Switch colorScheme="green" defaultChecked />
                      </FormControl>
                      
                      <FormControl display="flex" alignItems="center">
                        <FormLabel mb="0">
                          Permitir pagamento via boleto
                        </FormLabel>
                        <Switch colorScheme="green" defaultChecked />
                      </FormControl>
                      
                      <FormControl display="flex" alignItems="center">
                        <FormLabel mb="0">
                          Permitir pagamento via PIX
                        </FormLabel>
                        <Switch colorScheme="green" defaultChecked />
                      </FormControl>
                      
                      <FormControl display="flex" alignItems="center">
                        <FormLabel mb="0">
                          Enviar notificações de cobrança por email
                        </FormLabel>
                        <Switch colorScheme="green" defaultChecked />
                      </FormControl>
                    </VStack>
                  </CardBody>
                </Card>
                
                <Card>
                  <CardHeader bg="gray.50" p={4}>
                    <Heading size="sm">Configurações de Notificações</Heading>
                  </CardHeader>
                  <CardBody>
                    <VStack spacing={4} align="stretch">
                      <FormControl display="flex" alignItems="center">
                        <FormLabel mb="0">
                          Notificar sobre novas assinaturas
                        </FormLabel>
                        <Switch colorScheme="purple" defaultChecked />
                      </FormControl>
                      
                      <FormControl display="flex" alignItems="center">
                        <FormLabel mb="0">
                          Notificar sobre cancelamentos
                        </FormLabel>
                        <Switch colorScheme="purple" defaultChecked />
                      </FormControl>
                      
                      <FormControl display="flex" alignItems="center">
                        <FormLabel mb="0">
                          Notificar sobre falhas de pagamento
                        </FormLabel>
                        <Switch colorScheme="purple" defaultChecked />
                      </FormControl>
                      
                      <FormControl display="flex" alignItems="center">
                        <FormLabel mb="0">
                          Enviar relatório diário por email
                        </FormLabel>
                        <Switch colorScheme="purple" />
                      </FormControl>
                    </VStack>
                  </CardBody>
                </Card>
              </VStack>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Modal de detalhes da assinatura */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Detalhes da Assinatura
            <Text fontSize="sm" fontWeight="normal" color="gray.600">
              {selectedSubscription?.id}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          
          <ModalBody>
            {selectedSubscription && (
              <VStack spacing={6} align="stretch">
                <Box>
                  <Heading size="sm" mb={2}>Informações do Cliente</Heading>
                  <VStack align="start" spacing={1}>
                    <Text><strong>Nome:</strong> {selectedSubscription.customer.name}</Text>
                    <Text><strong>Email:</strong> {selectedSubscription.customer.email}</Text>
                    <Text><strong>Telefone:</strong> {selectedSubscription.customer.phone}</Text>
                  </VStack>
                </Box>
                
                <Box>
                  <Heading size="sm" mb={2}>Informações da Assinatura</Heading>
                  <SimpleGrid columns={2} spacing={4}>
                    <Box>
                      <Text fontWeight="bold">Plano</Text>
                      <HStack>
                        {renderPlanBadge(selectedSubscription.plan)}
                        <Text>
                          {selectedSubscription.plan.charAt(0).toUpperCase() + selectedSubscription.plan.slice(1)}
                        </Text>
                      </HStack>
                    </Box>
                    
                    <Box>
                      <Text fontWeight="bold">Tipo de Cobrança</Text>
                      <Badge colorScheme={selectedSubscription.billingType === 'annual' ? 'green' : 'blue'}>
                        {selectedSubscription.billingType === 'annual' ? 'Anual' : 'Mensal'}
                      </Badge>
                    </Box>
                    
                    <Box>
                      <Text fontWeight="bold">Status</Text>
                      {renderStatusBadge(selectedSubscription.status)}
                    </Box>
                    
                    <Box>
                      <Text fontWeight="bold">Valor</Text>
                      <Text>R$ {selectedSubscription.amount.toFixed(2)}</Text>
                    </Box>
                    
                    <Box>
                      <Text fontWeight="bold">Data de Início</Text>
                      <Text>{new Date(selectedSubscription.startDate).toLocaleDateString('pt-BR')}</Text>
                    </Box>
                    
                    <Box>
                      <Text fontWeight="bold">Próxima Cobrança</Text>
                      <Text>
                        {selectedSubscription.nextBillingDate 
                          ? new Date(selectedSubscription.nextBillingDate).toLocaleDateString('pt-BR') 
                          : '-'}
                      </Text>
                    </Box>
                    
                    <Box>
                      <Text fontWeight="bold">Método de Pagamento</Text>
                      <Text>
                        {selectedSubscription.paymentMethod === 'credit_card' ? 'Cartão de Crédito' :
                         selectedSubscription.paymentMethod === 'boleto' ? 'Boleto Bancário' :
                         selectedSubscription.paymentMethod === 'pix' ? 'PIX' :
                         selectedSubscription.paymentMethod === 'pending' ? 'Pendente' :
                         selectedSubscription.paymentMethod}
                      </Text>
                    </Box>
                  </SimpleGrid>
                </Box>
              </VStack>
            )}
          </ModalBody>
          
          <ModalFooter>
            {selectedSubscription && (
              <>
                {selectedSubscription.status === 'active' ? (
                  <Button 
                    colorScheme="red" 
                    mr={3}
                    onClick={() => handleUpdateStatus(selectedSubscription.id, 'inactive')}
                  >
                    Desativar Assinatura
                  </Button>
                ) : (
                  <Button 
                    colorScheme="green" 
                    mr={3}
                    onClick={() => handleUpdateStatus(selectedSubscription.id, 'active')}
                  >
                    Ativar Assinatura
                  </Button>
                )}
                <Button variant="ghost" onClick={onClose}>Fechar</Button>
              </>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default AdminDashboard;
