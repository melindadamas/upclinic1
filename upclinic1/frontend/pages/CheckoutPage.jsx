import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Radio,
  RadioGroup,
  Stack,
  Divider,
  Image,
  Flex,
  Badge,
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Spinner,
  useColorModeValue,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepTitle,
  StepDescription,
  StepIcon,
  StepNumber,
  StepSeparator,
  useSteps
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaLock, FaCreditCard, FaBarcode, FaQrcode, FaCheck } from 'react-icons/fa';
import CouponApplier from '../components/coupon/CouponApplier';

// Simulação de serviço de planos
const getPlans = () => {
  return [
    {
      id: 'plus',
      name: 'Plus',
      price: 15,
      annualPrice: 180,
      features: [
        'Prontuário eletrônico básico',
        'Agenda online',
        'Telemedicina básica',
        'Suporte por email'
      ],
      color: 'orange'
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 35,
      annualPrice: 420,
      features: [
        'Todas as funcionalidades do Plus',
        'Relatórios avançados',
        'Integração com wearables',
        'Suporte prioritário'
      ],
      color: 'blue'
    },
    {
      id: 'master',
      name: 'Master',
      price: 45,
      annualPrice: 540,
      features: [
        'Todas as funcionalidades do Pro',
        'Prontuário com IA',
        'Mapa populacional',
        'Suporte 24/7'
      ],
      color: 'purple'
    }
  ];
};

const CheckoutPage = () => {
  const { planId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  
  // Estados
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [billingType, setBillingType] = useState('monthly');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCVV: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });
  const [processingPayment, setProcessingPayment] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  
  // Stepper
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: 3
  });
  
  const steps = [
    { title: 'Plano', description: 'Confirme seu plano' },
    { title: 'Dados', description: 'Preencha seus dados' },
    { title: 'Pagamento', description: 'Finalize o pagamento' }
  ];
  
  // Cores
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  // Carregar plano selecionado
  useEffect(() => {
    const plans = getPlans();
    const selectedPlan = plans.find(p => p.id === planId);
    
    if (selectedPlan) {
      setPlan(selectedPlan);
    } else {
      // Plano não encontrado, redirecionar para página de planos
      navigate('/planos');
      toast({
        title: 'Plano não encontrado',
        description: 'Por favor, selecione um plano válido',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    
    setLoading(false);
  }, [planId, navigate, toast]);
  
  // Função para atualizar dados do formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Função para aplicar cupom
  const handleApplyCoupon = (couponData) => {
    setAppliedCoupon(couponData);
  };
  
  // Função para processar pagamento
  const handleProcessPayment = async () => {
    // Validação básica
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: 'Dados incompletos',
        description: 'Por favor, preencha todos os campos obrigatórios',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    
    if (paymentMethod === 'credit_card' && (!formData.cardNumber || !formData.cardName || !formData.cardExpiry || !formData.cardCVV)) {
      toast({
        title: 'Dados de cartão incompletos',
        description: 'Por favor, preencha todos os dados do cartão',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    
    setProcessingPayment(true);
    
    try {
      // Simulação de processamento de pagamento
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Em produção, isso seria uma chamada à API do PagSeguro
      
      // Redirecionar para página de confirmação
      navigate('/confirmacao', { 
        state: { 
          plan: plan,
          billingType: billingType,
          coupon: appliedCoupon,
          email: formData.email
        } 
      });
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      toast({
        title: 'Erro no pagamento',
        description: 'Não foi possível processar o pagamento. Por favor, tente novamente.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setProcessingPayment(false);
    }
  };
  
  // Calcular preço final
  const calculatePrice = () => {
    if (!plan) return 0;
    
    let basePrice = billingType === 'monthly' ? plan.price : plan.annualPrice;
    
    // Se houver cupom aplicado, o preço é zero durante o período promocional
    if (appliedCoupon) {
      return 0;
    }
    
    return basePrice;
  };
  
  // Renderizar informações de cobrança futura com cupom
  const renderFuturePaymentInfo = () => {
    if (!appliedCoupon) return null;
    
    const basePrice = billingType === 'monthly' ? plan.price : plan.annualPrice;
    const billingCycle = billingType === 'monthly' ? 'mês' : 'ano';
    const futureDate = new Date();
    futureDate.setMonth(futureDate.getMonth() + appliedCoupon.freePeriod);
    
    return (
      <Alert status="info" borderRadius="md" mt={4}>
        <AlertIcon />
        <Box>
          <AlertTitle>Período promocional aplicado!</AlertTitle>
          <AlertDescription>
            Você terá {appliedCoupon.freePeriod} meses gratuitos. 
            A partir de {futureDate.toLocaleDateString('pt-BR')}, 
            será cobrado R$ {basePrice.toFixed(2)} por {billingCycle}.
          </AlertDescription>
        </Box>
      </Alert>
    );
  };
  
  // Renderizar conteúdo com base no passo atual
  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box>
            <Heading size="md" mb={4}>Confirme seu plano</Heading>
            
            <Card borderWidth="1px" borderRadius="lg" overflow="hidden" mb={6}>
              <CardHeader bg={`${plan?.color}.50`} py={3}>
                <Flex align="center" justify="space-between">
                  <Heading size="md">
                    Plano {plan?.name}
                    <Badge ml={2} colorScheme={plan?.color}>
                      {billingType === 'monthly' ? 'Mensal' : 'Anual'}
                    </Badge>
                  </Heading>
                  <Text fontWeight="bold" fontSize="xl">
                    R$ {billingType === 'monthly' ? plan?.price : plan?.annualPrice}
                    <Box as="span" fontSize="sm" fontWeight="normal">
                      /{billingType === 'monthly' ? 'mês' : 'ano'}
                    </Box>
                  </Text>
                </Flex>
              </CardHeader>
              <CardBody>
                <VStack align="stretch" spacing={2}>
                  {plan?.features.map((feature, index) => (
                    <HStack key={index}>
                      <Box color={`${plan.color}.500`}>
                        <FaCheck />
                      </Box>
                      <Text>{feature}</Text>
                    </HStack>
                  ))}
                </VStack>
              </CardBody>
              <CardFooter bg="gray.50" borderTop="1px" borderColor="gray.200">
                <RadioGroup onChange={setBillingType} value={billingType} width="100%">
                  <Stack direction={{ base: 'column', md: 'row' }} spacing={5} width="100%">
                    <Radio value="monthly" colorScheme={plan?.color}>
                      <Text fontWeight="medium">Mensal</Text>
                      <Text fontSize="sm" color="gray.500">
                        R$ {plan?.price}/mês
                      </Text>
                    </Radio>
                    <Radio value="annual" colorScheme={plan?.color}>
                      <Text fontWeight="medium">Anual</Text>
                      <Text fontSize="sm" color="gray.500">
                        R$ {plan?.annualPrice}/ano
                        <Badge ml={2} colorScheme="green">Economize {Math.round((1 - (plan?.annualPrice / (plan?.price * 12))) * 100)}%</Badge>
                      </Text>
                    </Radio>
                  </Stack>
                </RadioGroup>
              </CardFooter>
            </Card>
            
            <CouponApplier onApplyCoupon={handleApplyCoupon} />
            
            {renderFuturePaymentInfo()}
            
            <Flex justify="flex-end" mt={6}>
              <Button 
                colorScheme="blue" 
                size="lg"
                onClick={() => setActiveStep(1)}
              >
                Continuar
              </Button>
            </Flex>
          </Box>
        );
        
      case 1:
        return (
          <Box>
            <Heading size="md" mb={4}>Seus dados</Heading>
            
            <VStack spacing={6} align="stretch">
              <FormControl isRequired>
                <FormLabel>Nome completo</FormLabel>
                <Input 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Digite seu nome completo"
                />
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input 
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Digite seu email"
                />
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel>Telefone</FormLabel>
                <Input 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(00) 00000-0000"
                />
              </FormControl>
              
              <FormControl>
                <FormLabel>Endereço</FormLabel>
                <Input 
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Digite seu endereço"
                />
              </FormControl>
              
              <HStack spacing={4}>
                <FormControl>
                  <FormLabel>Cidade</FormLabel>
                  <Input 
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Cidade"
                  />
                </FormControl>
                
                <FormControl>
                  <FormLabel>Estado</FormLabel>
                  <Select 
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="Selecione"
                  >
                    <option value="AC">Acre</option>
                    <option value="AL">Alagoas</option>
                    <option value="AP">Amapá</option>
                    <option value="AM">Amazonas</option>
                    <option value="BA">Bahia</option>
                    <option value="CE">Ceará</option>
                    <option value="DF">Distrito Federal</option>
                    <option value="ES">Espírito Santo</option>
                    <option value="GO">Goiás</option>
                    <option value="MA">Maranhão</option>
                    <option value="MT">Mato Grosso</option>
                    <option value="MS">Mato Grosso do Sul</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="PA">Pará</option>
                    <option value="PB">Paraíba</option>
                    <option value="PR">Paraná</option>
                    <option value="PE">Pernambuco</option>
                    <option value="PI">Piauí</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="RN">Rio Grande do Norte</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="RO">Rondônia</option>
                    <option value="RR">Roraima</option>
                    <option value="SC">Santa Catarina</option>
                    <option value="SP">São Paulo</option>
                    <option value="SE">Sergipe</option>
                    <option value="TO">Tocantins</option>
                  </Select>
                </FormControl>
                
                <FormControl>
                  <FormLabel>CEP</FormLabel>
                  <Input 
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="00000-000"
                  />
                </FormControl>
              </HStack>
            </VStack>
            
            <Flex justify="space-between" mt={6}>
              <Button 
                variant="outline"
                onClick={() => setActiveStep(0)}
              >
                Voltar
              </Button>
              <Button 
                colorScheme="blue" 
                size="lg"
                onClick={() => setActiveStep(2)}
              >
                Continuar
              </Button>
            </Flex>
          </Box>
        );
        
      case 2:
        return (
          <Box>
            <Heading size="md" mb={4}>Forma de pagamento</Heading>
            
            <RadioGroup onChange={setPaymentMethod} value={paymentMethod} mb={6}>
              <VStack align="stretch" spacing={3}>
                <Box 
                  borderWidth="1px" 
                  borderRadius="md" 
                  p={4}
                  borderColor={paymentMethod === 'credit_card' ? 'blue.500' : borderColor}
                  bg={paymentMethod === 'credit_card' ? 'blue.50' : bgColor}
                >
                  <Radio value="credit_card" colorScheme="blue">
                    <HStack>
                      <FaCreditCard />
                      <Text fontWeight="medium">Cartão de Crédito</Text>
                    </HStack>
                  </Radio>
                </Box>
                
                <Box 
                  borderWidth="1px" 
                  borderRadius="md" 
                  p={4}
                  borderColor={paymentMethod === 'boleto' ? 'blue.500' : borderColor}
                  bg={paymentMethod === 'boleto' ? 'blue.50' : bgColor}
                >
                  <Radio value="boleto" colorScheme="blue">
                    <HStack>
                      <FaBarcode />
                      <Text fontWeight="medium">Boleto Bancário</Text>
                    </HStack>
                  </Radio>
                </Box>
                
                <Box 
                  borderWidth="1px" 
                  borderRadius="md" 
                  p={4}
                  borderColor={paymentMethod === 'pix' ? 'blue.500' : borderColor}
                  bg={paymentMethod === 'pix' ? 'blue.50' : bgColor}
                >
                  <Radio value="pix" colorScheme="blue">
                    <HStack>
                      <FaQrcode />
                      <Text fontWeight="medium">PIX</Text>
                    </HStack>
                  </Radio>
                </Box>
              </VStack>
            </RadioGroup>
            
            {paymentMethod === 'credit_card' && (
              <Box borderWidth="1px" borderRadius="md" p={4} mb={6}>
                <VStack spacing={4} align="stretch">
                  <FormControl isRequired>
                    <FormLabel>Número do Cartão</FormLabel>
                    <Input 
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="0000 0000 0000 0000"
                    />
                  </FormControl>
                  
                  <FormControl isRequired>
                    <FormLabel>Nome no Cartão</FormLabel>
                    <Input 
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      placeholder="Nome como aparece no cartão"
                    />
                  </FormControl>
                  
                  <HStack>
                    <FormControl isRequired>
                      <FormLabel>Validade</FormLabel>
                      <Input 
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                        placeholder="MM/AA"
                      />
                    </FormControl>
                    
                    <FormControl isRequired>
                      <FormLabel>CVV</FormLabel>
                      <Input 
                        name="cardCVV"
                        value={formData.cardCVV}
                        onChange={handleInputChange}
                        placeholder="123"
                        maxLength={4}
                      />
                    </FormControl>
                  </HStack>
                </VStack>
              </Box>
            )}
            
            {paymentMethod === 'boleto' && (
              <Alert status="info" borderRadius="md" mb={6}>
                <AlertIcon />
                <Box>
                  <AlertTitle>Pagamento via Boleto</AlertTitle>
                  <AlertDescription>
                    Após finalizar sua compra, você receberá o boleto por email. 
                    O acesso será liberado após a confirmação do pagamento (1-3 dias úteis).
                  </AlertDescription>
                </Box>
              </Alert>
            )}
            
            {paymentMethod === 'pix' && (
              <Alert status="info" borderRadius="md" mb={6}>
                <AlertIcon />
                <Box>
                  <AlertTitle>Pagamento via PIX</AlertTitle>
                  <AlertDescription>
                    Após finalizar sua compra, você receberá o QR Code do PIX por email.
                    O acesso será liberado imediatamente após a confirmação do pagamento.
                  </AlertDescription>
                </Box>
              </Alert>
            )}
            
            <Box borderWidth="1px" borderRadius="md" p={4} mb={6}>
              <Heading size="sm" mb={3}>Resumo do pedido</Heading>
              
              <VStack align="stretch" spacing={2}>
                <Flex justify="space-between">
                  <Text>Plano {plan?.name} ({billingType === 'monthly' ? 'Mensal' : 'Anual'})</Text>
                  <Text>R$ {billingType === 'monthly' ? plan?.price : plan?.annualPrice}</Text>
                </Flex>
                
                {appliedCoupon && (
                  <Flex justify="space-between" color="green.500">
                    <Text>Cupom: {appliedCoupon.code}</Text>
                    <Text>- R$ {billingType === 'monthly' ? plan?.price : plan?.annualPrice}</Text>
                  </Flex>
                )}
                
                <Divider my={2} />
                
                <Flex justify="space-between" fontWeight="bold">
                  <Text>Total hoje</Text>
                  <Text>R$ {calculatePrice().toFixed(2)}</Text>
                </Flex>
                
                {appliedCoupon && (
                  <Text fontSize="sm" color="gray.500">
                    Próxima cobrança em {appliedCoupon.freePeriod} meses
                  </Text>
                )}
              </VStack>
            </Box>
            
            <Flex justify="space-between" mt={6}>
              <Button 
                variant="outline"
                onClick={() => setActiveStep(1)}
              >
                Voltar
              </Button>
              <Button 
                colorScheme="blue" 
                size="lg"
                leftIcon={<FaLock />}
                onClick={handleProcessPayment}
                isLoading={processingPayment}
                loadingText="Processando..."
              >
                {calculatePrice() > 0 ? 'Finalizar Compra' : 'Confirmar Assinatura'}
              </Button>
            </Flex>
          </Box>
        );
        
      default:
        return null;
    }
  };
  
  if (loading) {
    return (
      <Container maxW="container.md" py={12}>
        <Flex justify="center" align="center" height="300px">
          <Spinner size="xl" color="blue.500" />
        </Flex>
      </Container>
    );
  }
  
  if (!plan) {
    return (
      <Container maxW="container.md" py={12}>
        <Alert status="error" borderRadius="md">
          <AlertIcon />
          <AlertTitle>Plano não encontrado</AlertTitle>
          <AlertDescription>
            O plano selecionado não está disponível. Por favor, escolha outro plano.
          </AlertDescription>
        </Alert>
        
        <Button 
          mt={6} 
          colorScheme="blue"
          onClick={() => navigate('/planos')}
        >
          Ver planos disponíveis
        </Button>
      </Container>
    );
  }
  
  return (
    <Container maxW="container.md" py={12}>
      <Box mb={8}>
        <Heading size="lg" mb={2}>Finalizar Assinatura</Heading>
        <Text color="gray.600">
          Complete os passos abaixo para assinar o UpClinic
        </Text>
      </Box>
      
      <Box mb={8}>
        <Stepper index={activeStep} colorScheme="blue">
          {steps.map((step, index) => (
            <Step key={index}>
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>
              
              <Box flexShrink="0">
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </Box>
              
              <StepSeparator />
            </Step>
          ))}
        </Stepper>
      </Box>
      
      <Box 
        borderWidth="1px" 
        borderRadius="lg" 
        p={6} 
        bg={bgColor}
        boxShadow="sm"
      >
        {renderStepContent()}
      </Box>
      
      <Box mt={8} textAlign="center">
        <HStack justify="center" spacing={2}>
          <FaLock />
          <Text fontSize="sm" color="gray.600">
            Pagamento seguro processado pelo PagSeguro
          </Text>
        </HStack>
      </Box>
    </Container>
  );
};

export default CheckoutPage;
