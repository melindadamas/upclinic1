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
  Badge,
  useToast,
  Collapse,
  Flex,
  Heading
} from '@chakra-ui/react';
import { FaTag, FaCheck, FaTimes } from 'react-icons/fa';
import CouponService from '../../services/coupon/CouponService';

/**
 * Componente para aplicação de cupons promocionais durante o checkout
 */
const CouponApplier = ({ onApplyCoupon, subscriptionId }) => {
  const [couponCode, setCouponCode] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [couponData, setCouponData] = useState(null);
  const [error, setError] = useState('');
  const toast = useToast();

  // Função para validar o cupom
  const validateCoupon = async () => {
    if (!couponCode.trim()) {
      setError('Por favor, insira um código de cupom');
      return;
    }

    setIsValidating(true);
    setError('');

    try {
      const result = await CouponService.validateCoupon(couponCode);
      setCouponData(result);
      
      // Notificar o componente pai sobre o cupom aplicado
      if (onApplyCoupon) {
        onApplyCoupon(result);
      }
      
      toast({
        title: 'Cupom aplicado com sucesso!',
        description: `Você recebeu ${result.freePeriod} meses de acesso gratuito.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      setError(err.message || 'Cupom inválido ou expirado');
      setCouponData(null);
    } finally {
      setIsValidating(false);
    }
  };

  // Função para remover o cupom aplicado
  const removeCoupon = () => {
    setCouponData(null);
    setCouponCode('');
    
    // Notificar o componente pai sobre a remoção do cupom
    if (onApplyCoupon) {
      onApplyCoupon(null);
    }
    
    toast({
      title: 'Cupom removido',
      description: 'O cupom promocional foi removido.',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box borderWidth="1px" borderRadius="md" p={4} bg="gray.50">
      <VStack spacing={4} align="stretch">
        <Heading size="sm">Cupom Promocional</Heading>
        
        {!couponData ? (
          <HStack>
            <FormControl>
              <Input
                placeholder="Digite o código do cupom"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                isDisabled={isValidating}
              />
            </FormControl>
            <Button
              leftIcon={<FaTag />}
              colorScheme="blue"
              onClick={validateCoupon}
              isLoading={isValidating}
              loadingText="Validando..."
            >
              Aplicar
            </Button>
          </HStack>
        ) : (
          <Box borderWidth="1px" borderRadius="md" p={3} bg="blue.50">
            <Flex justify="space-between" align="center">
              <HStack>
                <Badge colorScheme="green" fontSize="0.9em" p={1}>
                  {couponData.code}
                </Badge>
                <Text fontWeight="medium">
                  {couponData.freePeriod} meses grátis
                </Text>
              </HStack>
              <Button
                size="sm"
                colorScheme="red"
                variant="ghost"
                leftIcon={<FaTimes />}
                onClick={removeCoupon}
              >
                Remover
              </Button>
            </Flex>
          </Box>
        )}
        
        {error && (
          <Alert status="error" borderRadius="md">
            <AlertIcon />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <Text fontSize="sm" color="gray.600">
          Insira um código de cupom válido para obter meses de acesso gratuito. 
          Será necessário cadastrar um cartão de crédito para cobrança após o período promocional.
        </Text>
      </VStack>
    </Box>
  );
};

export default CouponApplier;
