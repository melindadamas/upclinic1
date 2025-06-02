import React from 'react';
import { Box, Flex, Text, Link, Icon, useColorModeValue } from '@chakra-ui/react';
import { FaLock } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';

/**
 * Componente de rodapé com link discreto para acesso administrativo
 */
const Footer = () => {
  const bgColor = useColorModeValue('gray.100', 'gray.900');
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const adminLinkColor = useColorModeValue('gray.500', 'gray.600');
  const hoverColor = useColorModeValue('blue.600', 'blue.300');
  
  return (
    <Box 
      as="footer" 
      py={6} 
      px={4}
      bg={bgColor}
      borderTop="1px" 
      borderColor={borderColor}
    >
      <Flex 
        direction={{ base: 'column', md: 'row' }} 
        justify="space-between" 
        align={{ base: 'center', md: 'center' }}
        maxW="container.xl"
        mx="auto"
      >
        <Text color={textColor} fontSize="sm">
          &copy; {new Date().getFullYear()} UpClinic. Todos os direitos reservados.
        </Text>
        
        <Flex mt={{ base: 4, md: 0 }} gap={6}>
          <Link as={RouterLink} to="/termos" color={textColor} fontSize="sm">
            Termos de Uso
          </Link>
          <Link as={RouterLink} to="/privacidade" color={textColor} fontSize="sm">
            Política de Privacidade
          </Link>
          <Link as={RouterLink} to="/suporte" color={textColor} fontSize="sm">
            Suporte
          </Link>
          
          {/* Link discreto para acesso administrativo */}
          <Link 
            as={RouterLink} 
            to="/admin/login" 
            color={adminLinkColor} 
            fontSize="xs"
            opacity="0.7"
            display="flex"
            alignItems="center"
            _hover={{ 
              color: hoverColor,
              textDecoration: 'none',
              opacity: 1
            }}
          >
            <Icon as={FaLock} fontSize="10px" mr={1} />
            Acesso Restrito
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
