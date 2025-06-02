import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  HStack,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Divider,
  Spinner,
  useToast,
  Image,
  Flex,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  IconButton
} from '@chakra-ui/react';
import { FaLock, FaCreditCard, FaEye, FaEyeSlash } from 'react-icons/fa';
import MercadoPagoService from '../../services/payment/MercadoPagoService';

/**
 * Componente para processamento de pagamento via Mercado Pago
 */
const MercadoPagoCheckout = ({ planData, billingType, couponData, onPaymentSuccess, onPaymentError }) => {
  // Estados
  const [isLoading, setIsLoading] = useState(false);
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardholderName: '',
    expirationMonth: '',
    expirationYear: '',
    securityCode: ''
  });
  const [errors, setErrors] = useState({});
  const [showSecurityCode, setShowSecurityCode] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mpInstance, setMpInstance] = useState(null);
  
  const toast = useToast();
  
  // Inicializar SDK do Mercado Pago
  useEffect(() => {
    const loadMercadoPagoSDK = async () => {
      try {
        setIsLoading(true);
        
        // Carregar script do Mercado Pago se ainda não estiver carregado
        if (!window.MercadoPago) {
          const script = document.createElement('script');
          script.src = 'https://sdk.mercadopago.com/js/v2';
          script.async = true;
          
          script.onload = () => {
            const mp = MercadoPagoService.initSDK();
            setMpInstance(mp);
            setIsLoading(false);
          };
          
          script.onerror = () => {
            console.error('Erro ao carregar SDK do Mercado Pago');
            setIsLoading(false);
            onPaymentError('Não foi possível carregar o processador de pagamentos. Por favor, tente novamente mais tarde.');
          };
          
          document.body.appendChild(script);
        } else {
          const mp = MercadoPagoService.initSDK();
          setMpInstance(mp);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Erro ao inicializar Mercado Pago:', error);
        setIsLoading(false);
        onPaymentError('Não foi possível inicializar o processador de pagamentos. Por favor, tente novamente mais tarde.');
      }
    };
    
    loadMercadoPagoSDK();
  }, [onPaymentError]);
  
  // Atualizar dados do cartão
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Validação específica para cada campo
    let formattedValue = value;
    
    if (name === 'cardNumber') {
      // Remover caracteres não numéricos e limitar a 16 dígitos
      formattedValue = value.replace(/\D/g, '').slice(0, 16);
    } else if (name === 'expirationMonth') {
      // Remover caracteres não numéricos e limitar a 2 dígitos
      formattedValue = value.replace(/\D/g, '').slice(0, 2);
      // Validar mês entre 1 e 12
      if (formattedValue && (parseInt(formattedValue) < 1 || parseInt(formattedValue) > 12)) {
        setErrors({...errors, [name]: 'Mês inválido (1-12)'});
      } else {
        const newErrors = {...errors};
        delete newErrors[name];
        setErrors(newErrors);
      }
    } else if (name === 'expirationYear') {
      // Remover caracteres não numéricos e limitar a 2 dígitos
      formattedValue = value.replace(/\D/g, '').slice(0, 2);
      // Validar ano
      const currentYear = new Date().getFullYear() % 100;
      if (formattedValue && parseInt(formattedValue) < currentYear) {
        setErrors({...errors, [name]: 'Ano inválido'});
      } else {
        const newErrors = {...errors};
        delete newErrors[name];
        setErrors(newErrors);
      }
    } else if (name === 'securityCode') {
      // Remover caracteres não numéricos e limitar a 4 dígitos
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
    }
    
    setCardData({
      ...cardData,
      [name]: formattedValue
    });
  };
  
  // Validar formulário
  const validateForm = () => {
    const newErrors = {};
    
    if (!cardData.cardNumber || cardData.cardNumber.length < 13) {
      newErrors.cardNumber = 'Número de cartão inválido';
    }
    
    if (!cardData.cardholderName) {
      newErrors.cardholderName = 'Nome no cartão é obrigatório';
    }
    
    if (!cardData.expirationMonth || parseInt(cardData.expirationMonth) < 1 || parseInt(cardData.expirationMonth) > 12) {
      newErrors.expirationMonth = 'Mês inválido (1-12)';
    }
    
    const currentYear = new Date().getFullYear() % 100;
    if (!cardData.expirationYear || parseInt(cardData.expirationYear) < currentYear) {
      newErrors.expirationYear = 'Ano inválido';
    }
    
    if (!cardData.securityCode || cardData.securityCode.length < 3) {
      newErrors.securityCode = 'Código de segurança inválido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Processar pagamento
  const handleProcessPayment = async () => {
    if (!validateForm()) {
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Criar token de cartão
      const cardToken = await MercadoPagoService.createCardToken(cardData);
      
      // Determinar qual plano usar com base nos dados recebidos
      const planId = `${planData.id}_${billingType}`;
      const amount = billingType === 'monthly' ? planData.price : planData.annualPrice;
      
      // Dados da assinatura
      let subscriptionData = {
        reason: `UpClinic ${planData.name} ${billingType === 'monthly' ? 'Mensal' : 'Anual'}`,
        card_token_id: cardToken,
        payer_email: localStorage.getItem('userEmail') || 'cliente@exemplo.com',
        external_reference: `UP-${Date.now()}`,
        auto_recurring: {
          frequency: billingType === 'monthly' ? 1 : 12,
          frequency_type: "months",
          transaction_amount: amount,
          currency_id: "BRL"
        },
        back_url: `${window.location.origin}/confirmacao`,
        status: "authorized"
      };
      
      // Se houver cupom, aplicar período gratuito
      let subscriptionResult;
      if (couponData) {
        subscriptionResult = await MercadoPagoService.createSubscriptionWithCoupon(
          subscriptionData, 
          couponData
        );
      } else {
        // Criar assinatura normal
        subscriptionResult = await MercadoPagoService.createSubscription(subscriptionData);
      }
      
      // Salvar ID da assinatura para referência futura
      localStorage.setItem('subscriptionId', subscriptionResult.id);
      localStorage.setItem('subscriptionPlan', planData.id);
      localStorage.setItem('subscriptionBillingType', billingType);
      
      // Notificar sucesso
      onPaymentSuccess(subscriptionResult);
      
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      onPaymentError(error.message || 'Não foi possível processar o pagamento. Por favor, verifique os dados do cartão e tente novamente.');
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Alternar visibilidade do código de segurança
  const toggleSecurityCodeVisibility = () => {
    setShowSecurityCode(!showSecurityCode);
  };
  
  // Renderizar formulário de cartão
  const renderCardForm = () => {
    return (
      <VStack spacing={4} align="stretch">
        <FormControl isRequired isInvalid={errors.cardNumber}>
          <FormLabel>Número do Cartão</FormLabel>
          <Input
            name="cardNumber"
            value={cardData.cardNumber}
            onChange={handleInputChange}
            placeholder="0000 0000 0000 0000"
            maxLength={16}
          />
          {errors.cardNumber && (
            <FormErrorMessage>{errors.cardNumber}</FormErrorMessage>
          )}
        </FormControl>
        
        <FormControl isRequired isInvalid={errors.cardholderName}>
          <FormLabel>Nome no Cartão</FormLabel>
          <Input
            name="cardholderName"
            value={cardData.cardholderName}
            onChange={handleInputChange}
            placeholder="Nome como aparece no cartão"
          />
          {errors.cardholderName && (
            <FormErrorMessage>{errors.cardholderName}</FormErrorMessage>
          )}
        </FormControl>
        
        <HStack>
          <FormControl isRequired isInvalid={errors.expirationMonth}>
            <FormLabel>Mês</FormLabel>
            <Input
              name="expirationMonth"
              value={cardData.expirationMonth}
              onChange={handleInputChange}
              placeholder="MM"
              maxLength={2}
            />
            {errors.expirationMonth && (
              <FormErrorMessage>{errors.expirationMonth}</FormErrorMessage>
            )}
          </FormControl>
          
          <FormControl isRequired isInvalid={errors.expirationYear}>
            <FormLabel>Ano</FormLabel>
            <Input
              name="expirationYear"
              value={cardData.expirationYear}
              onChange={handleInputChange}
              placeholder="AA"
              maxLength={2}
            />
            {errors.expirationYear && (
              <FormErrorMessage>{errors.expirationYear}</FormErrorMessage>
            )}
          </FormControl>
          
          <FormControl isRequired isInvalid={errors.securityCode}>
            <FormLabel>CVV</FormLabel>
            <InputGroup>
              <Input
                name="securityCode"
                type={showSecurityCode ? 'text' : 'password'}
                value={cardData.securityCode}
                onChange={handleInputChange}
                placeholder="123"
                maxLength={4}
              />
              <InputRightElement>
                <IconButton
                  aria-label={showSecurityCode ? 'Ocultar código' : 'Mostrar código'}
                  icon={showSecurityCode ? <FaEyeSlash /> : <FaEye />}
                  variant="ghost"
                  onClick={toggleSecurityCodeVisibility}
                />
              </InputRightElement>
            </InputGroup>
            {errors.securityCode && (
              <FormErrorMessage>{errors.securityCode}</FormErrorMessage>
            )}
          </FormControl>
        </HStack>
      </VStack>
    );
  };
  
  // Renderizar informações de cobrança futura com cupom
  const renderFuturePaymentInfo = () => {
    if (!couponData) return null;
    
    const basePrice = billingType === 'monthly' ? planData.price : planData.annualPrice;
    const billingCycle = billingType === 'monthly' ? 'mês' : 'ano';
    const futureDate = new Date();
    futureDate.setMonth(futureDate.getMonth() + couponData.freePeriod);
    
    return (
      <Alert status="info" borderRadius="md" mt={4}>
        <AlertIcon />
        <Box>
          <AlertTitle>Período promocional aplicado!</AlertTitle>
          <AlertDescription>
            Você terá {couponData.freePeriod} meses gratuitos. 
            A partir de {futureDate.toLocaleDateString('pt-BR')}, 
            será cobrado R$ {basePrice.toFixed(2)} por {billingCycle}.
          </AlertDescription>
        </Box>
      </Alert>
    );
  };
  
  if (isLoading) {
    return (
      <Box textAlign="center" py={6}>
        <Spinner size="xl" color="blue.500" />
        <Text mt={4}>Carregando processador de pagamento...</Text>
      </Box>
    );
  }
  
  return (
    <Box>
      <Box mb={6}>
        <Flex align="center" justify="center" mb={4}>
          <Image 
            src="https://www.mercadopago.com/org-img/Manual/ManualPago/imgs/isologoHorizontal.png" 
            alt="Mercado Pago" 
            height="40px" 
          />
        </Flex>
        
        <Alert status="success" borderRadius="md">
          <AlertIcon />
          <Box>
            <AlertTitle>Pagamento Seguro</AlertTitle>
            <AlertDescription>
              Seus dados de pagamento são protegidos com criptografia de ponta a ponta.
            </AlertDescription>
          </Box>
        </Alert>
      </Box>
      
      {renderCardForm()}
      
      {renderFuturePaymentInfo()}
      
      <Button
        colorScheme="blue"
        size="lg"
        width="100%"
        mt={6}
        leftIcon={<FaLock />}
        onClick={handleProcessPayment}
        isLoading={isProcessing}
        loadingText="Processando..."
      >
        {couponData ? 'Confirmar Assinatura' : 'Finalizar Pagamento'}
      </Button>
      
      <HStack justify="center" spacing={2} mt={4}>
        <FaLock size="12px" />
        <Text fontSize="xs" color="gray.500">
          Pagamento seguro processado pelo Mercado Pago
        </Text>
      </HStack>
    </Box>
  );
};

export default MercadoPagoCheckout;
