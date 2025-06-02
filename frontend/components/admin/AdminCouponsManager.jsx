import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Badge,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  SimpleGrid,
  useToast,
  Switch,
  FormHelperText,
  Divider,
  IconButton,
  Tooltip
} from '@chakra-ui/react';
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaCopy, 
  FaDownload, 
  FaFilter, 
  FaChartBar,
  FaCheck,
  FaTimes
} from 'react-icons/fa';
import CouponService from '../../services/coupon/CouponService';

/**
 * Componente para gerenciamento de cupons promocionais no painel administrativo
 */
const AdminCouponsManager = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [filters, setFilters] = useState({ status: 'all' });
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    used: 0,
    conversion: 0
  });
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  
  // Formulário para novo cupom
  const [formData, setFormData] = useState({
    code: '',
    description: '',
    freePeriod: 3,
    maxUses: 100,
    expirationDate: '',
    planRestriction: 'all',
    isActive: true
  });
  
  // Carregar cupons ao iniciar
  useEffect(() => {
    loadCoupons();
  }, [filters]);
  
  // Função para carregar cupons
  const loadCoupons = async () => {
    try {
      setLoading(true);
      const data = await CouponService.listAllCoupons(filters);
      setCoupons(data.coupons || []);
      setStats(data.stats || {
        total: data.coupons?.length || 0,
        active: data.coupons?.filter(c => c.isActive).length || 0,
        used: data.coupons?.reduce((acc, c) => acc + (c.usesCount || 0), 0) || 0,
        conversion: 0
      });
    } catch (error) {
      console.error('Erro ao carregar cupons:', error);
      toast({
        title: 'Erro ao carregar cupons',
        description: error.message || 'Não foi possível carregar os cupons',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Função para abrir modal de criação/edição
  const handleOpenModal = (coupon = null) => {
    if (coupon) {
      // Editar cupom existente
      setFormData({
        code: coupon.code,
        description: coupon.description,
        freePeriod: coupon.freePeriod,
        maxUses: coupon.maxUses,
        expirationDate: coupon.expirationDate ? new Date(coupon.expirationDate).toISOString().split('T')[0] : '',
        planRestriction: coupon.planRestriction || 'all',
        isActive: coupon.isActive
      });
      setSelectedCoupon(coupon);
    } else {
      // Novo cupom
      setFormData({
        code: generateCouponCode(),
        description: '',
        freePeriod: 3,
        maxUses: 100,
        expirationDate: '',
        planRestriction: 'all',
        isActive: true
      });
      setSelectedCoupon(null);
    }
    onOpen();
  };
  
  // Função para gerar código de cupom aleatório
  const generateCouponCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };
  
  // Função para salvar cupom
  const handleSaveCoupon = async () => {
    try {
      if (selectedCoupon) {
        // Atualizar cupom existente
        await CouponService.updateCoupon(selectedCoupon._id, formData);
        toast({
          title: 'Cupom atualizado',
          description: `O cupom ${formData.code} foi atualizado com sucesso`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        // Criar novo cupom
        await CouponService.createCoupon(formData);
        toast({
          title: 'Cupom criado',
          description: `O cupom ${formData.code} foi criado com sucesso`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
      
      // Recarregar lista de cupons
      loadCoupons();
      onClose();
    } catch (error) {
      console.error('Erro ao salvar cupom:', error);
      toast({
        title: 'Erro ao salvar cupom',
        description: error.message || 'Não foi possível salvar o cupom',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };
  
  // Função para desativar cupom
  const handleDeactivateCoupon = async (couponId) => {
    try {
      await CouponService.deactivateCoupon(couponId);
      toast({
        title: 'Cupom desativado',
        description: 'O cupom foi desativado com sucesso',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      // Recarregar lista de cupons
      loadCoupons();
    } catch (error) {
      console.error('Erro ao desativar cupom:', error);
      toast({
        title: 'Erro ao desativar cupom',
        description: error.message || 'Não foi possível desativar o cupom',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };
  
  // Função para copiar código do cupom
  const handleCopyCouponCode = (code) => {
    navigator.clipboard.writeText(code);
    toast({
      title: 'Código copiado',
      description: `O código ${code} foi copiado para a área de transferência`,
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  };
  
  // Função para exportar relatório de cupons
  const handleExportReport = async () => {
    try {
      const report = await CouponService.getCouponUsageReport();
      
      // Criar CSV
      const headers = 'Código,Descrição,Período Grátis,Usos,Máximo de Usos,Data de Expiração,Status\n';
      const rows = report.map(coupon => 
        `"${coupon.code}","${coupon.description}",${coupon.freePeriod},${coupon.usesCount},${coupon.maxUses},"${coupon.expirationDate || ''}",${coupon.isActive ? 'Ativo' : 'Inativo'}`
      ).join('\n');
      
      const csv = headers + rows;
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      
      // Criar link para download
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `cupons_relatorio_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: 'Relatório exportado',
        description: 'O relatório de cupons foi exportado com sucesso',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Erro ao exportar relatório:', error);
      toast({
        title: 'Erro ao exportar relatório',
        description: error.message || 'Não foi possível exportar o relatório',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };
  
  // Renderizar badge de status
  const renderStatusBadge = (isActive) => {
    return isActive ? (
      <Badge colorScheme="green">Ativo</Badge>
    ) : (
      <Badge colorScheme="red">Inativo</Badge>
    );
  };
  
  // Renderizar badge de plano
  const renderPlanBadge = (planRestriction) => {
    switch (planRestriction) {
      case 'plus':
        return <Badge colorScheme="orange">Plus</Badge>;
      case 'pro':
        return <Badge colorScheme="blue">Pro</Badge>;
      case 'master':
        return <Badge colorScheme="purple">Master</Badge>;
      default:
        return <Badge colorScheme="gray">Todos</Badge>;
    }
  };
  
  return (
    <Container maxW="container.xl" py={6}>
      <Box mb={6}>
        <Heading size="lg" mb={2}>Gerenciamento de Cupons Promocionais</Heading>
        <Text color="gray.600">
          Crie e gerencie cupons para períodos gratuitos estendidos
        </Text>
      </Box>
      
      {/* Estatísticas */}
      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6} mb={6}>
        <Box p={4} borderWidth="1px" borderRadius="md" bg="white">
          <Stat>
            <StatLabel>Total de Cupons</StatLabel>
            <StatNumber>{stats.total}</StatNumber>
          </Stat>
        </Box>
        
        <Box p={4} borderWidth="1px" borderRadius="md" bg="white">
          <Stat>
            <StatLabel>Cupons Ativos</StatLabel>
            <StatNumber>{stats.active}</StatNumber>
            <StatHelpText>
              {stats.total > 0 ? `${Math.round((stats.active / stats.total) * 100)}%` : '0%'} do total
            </StatHelpText>
          </Stat>
        </Box>
        
        <Box p={4} borderWidth="1px" borderRadius="md" bg="white">
          <Stat>
            <StatLabel>Cupons Utilizados</StatLabel>
            <StatNumber>{stats.used}</StatNumber>
          </Stat>
        </Box>
        
        <Box p={4} borderWidth="1px" borderRadius="md" bg="white">
          <Stat>
            <StatLabel>Taxa de Conversão</StatLabel>
            <StatNumber>{stats.conversion}%</StatNumber>
            <StatHelpText>
              Após período gratuito
            </StatHelpText>
          </Stat>
        </Box>
      </SimpleGrid>
      
      {/* Filtros e ações */}
      <Flex justify="space-between" align="center" mb={4}>
        <HStack>
          <Select 
            value={filters.status} 
            onChange={(e) => setFilters({...filters, status: e.target.value})}
            w="200px"
          >
            <option value="all">Todos os cupons</option>
            <option value="active">Cupons ativos</option>
            <option value="inactive">Cupons inativos</option>
            <option value="expired">Cupons expirados</option>
          </Select>
          
          <Button leftIcon={<FaFilter />} variant="outline">
            Mais filtros
          </Button>
        </HStack>
        
        <HStack>
          <Button 
            leftIcon={<FaDownload />} 
            variant="outline"
            onClick={handleExportReport}
          >
            Exportar
          </Button>
          
          <Button 
            leftIcon={<FaChartBar />} 
            variant="outline"
            colorScheme="purple"
          >
            Relatório Detalhado
          </Button>
          
          <Button 
            leftIcon={<FaPlus />} 
            colorScheme="blue"
            onClick={() => handleOpenModal()}
          >
            Novo Cupom
          </Button>
        </HStack>
      </Flex>
      
      {/* Tabela de cupons */}
      <Box overflowX="auto" borderWidth="1px" borderRadius="md">
        <Table variant="simple">
          <Thead bg="gray.50">
            <Tr>
              <Th>Código</Th>
              <Th>Descrição</Th>
              <Th>Período Grátis</Th>
              <Th>Usos</Th>
              <Th>Plano</Th>
              <Th>Expiração</Th>
              <Th>Status</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {loading ? (
              <Tr>
                <Td colSpan={8} textAlign="center" py={4}>
                  Carregando cupons...
                </Td>
              </Tr>
            ) : coupons.length === 0 ? (
              <Tr>
                <Td colSpan={8} textAlign="center" py={4}>
                  Nenhum cupom encontrado
                </Td>
              </Tr>
            ) : (
              coupons.map((coupon) => (
                <Tr key={coupon._id}>
                  <Td fontWeight="medium">
                    <HStack>
                      <Text>{coupon.code}</Text>
                      <Tooltip label="Copiar código">
                        <IconButton
                          icon={<FaCopy />}
                          size="xs"
                          variant="ghost"
                          onClick={() => handleCopyCouponCode(coupon.code)}
                          aria-label="Copiar código"
                        />
                      </Tooltip>
                    </HStack>
                  </Td>
                  <Td>{coupon.description}</Td>
                  <Td>{coupon.freePeriod} meses</Td>
                  <Td>
                    {coupon.usesCount || 0} / {coupon.maxUses}
                  </Td>
                  <Td>{renderPlanBadge(coupon.planRestriction)}</Td>
                  <Td>
                    {coupon.expirationDate 
                      ? new Date(coupon.expirationDate).toLocaleDateString('pt-BR')
                      : 'Sem expiração'}
                  </Td>
                  <Td>{renderStatusBadge(coupon.isActive)}</Td>
                  <Td>
                    <HStack spacing={2}>
                      <IconButton
                        icon={<FaEdit />}
                        size="sm"
                        variant="ghost"
                        colorScheme="blue"
                        onClick={() => handleOpenModal(coupon)}
                        aria-label="Editar cupom"
                      />
                      
                      {coupon.isActive ? (
                        <IconButton
                          icon={<FaTimes />}
                          size="sm"
                          variant="ghost"
                          colorScheme="red"
                          onClick={() => handleDeactivateCoupon(coupon._id)}
                          aria-label="Desativar cupom"
                        />
                      ) : (
                        <IconButton
                          icon={<FaCheck />}
                          size="sm"
                          variant="ghost"
                          colorScheme="green"
                          onClick={() => handleSaveCoupon({...coupon, isActive: true})}
                          aria-label="Ativar cupom"
                        />
                      )}
                    </HStack>
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </Box>
      
      {/* Modal de criação/edição de cupom */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {selectedCoupon ? 'Editar Cupom' : 'Novo Cupom'}
          </ModalHeader>
          <ModalCloseButton />
          
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <HStack>
                <FormControl isRequired>
                  <FormLabel>Código do Cupom</FormLabel>
                  <Input
                    value={formData.code}
                    onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
                    placeholder="Ex: PROMO2025"
                  />
                  <FormHelperText>
                    Código único para o cupom (letras e números)
                  </FormHelperText>
                </FormControl>
                
                <FormControl isRequired>
                  <FormLabel>Período Gratuito</FormLabel>
                  <NumberInput
                    value={formData.freePeriod}
                    onChange={(valueString) => setFormData({...formData, freePeriod: parseInt(valueString)})}
                    min={1}
                    max={12}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  <FormHelperText>
                    Número de meses gratuitos
                  </FormHelperText>
                </FormControl>
              </HStack>
              
              <FormControl>
                <FormLabel>Descrição</FormLabel>
                <Input
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Ex: Promoção de lançamento"
                />
                <FormHelperText>
                  Descrição interna para identificação do cupom
                </FormHelperText>
              </FormControl>
              
              <HStack>
                <FormControl>
                  <FormLabel>Máximo de Usos</FormLabel>
                  <NumberInput
                    value={formData.maxUses}
                    onChange={(valueString) => setFormData({...formData, maxUses: parseInt(valueString)})}
                    min={1}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  <FormHelperText>
                    Limite de vezes que o cupom pode ser usado
                  </FormHelperText>
                </FormControl>
                
                <FormControl>
                  <FormLabel>Data de Expiração</FormLabel>
                  <Input
                    type="date"
                    value={formData.expirationDate}
                    onChange={(e) => setFormData({...formData, expirationDate: e.target.value})}
                  />
                  <FormHelperText>
                    Data limite para uso do cupom (opcional)
                  </FormHelperText>
                </FormControl>
              </HStack>
              
              <FormControl>
                <FormLabel>Restrição de Plano</FormLabel>
                <Select
                  value={formData.planRestriction}
                  onChange={(e) => setFormData({...formData, planRestriction: e.target.value})}
                >
                  <option value="all">Todos os planos</option>
                  <option value="plus">Apenas Plus</option>
                  <option value="pro">Apenas Pro</option>
                  <option value="master">Apenas Master</option>
                </Select>
                <FormHelperText>
                  Restringe o cupom a planos específicos
                </FormHelperText>
              </FormControl>
              
              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">
                  Cupom Ativo
                </FormLabel>
                <Switch
                  isChecked={formData.isActive}
                  onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                  colorScheme="green"
                />
              </FormControl>
            </VStack>
          </ModalBody>
          
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme="blue" onClick={handleSaveCoupon}>
              {selectedCoupon ? 'Atualizar' : 'Criar'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default AdminCouponsManager;
