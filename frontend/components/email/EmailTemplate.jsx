import React from 'react';
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  VStack, 
  HStack, 
  Image, 
  Button, 
  Divider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td
} from '@chakra-ui/react';

// Template de email de confirmação com manual digital
const EmailTemplate = () => {
  return (
    <Container maxW="600px" p={0} bg="white">
      {/* Cabeçalho */}
      <Box bg="brand.600" color="white" p={6} textAlign="center">
        <Image 
          src="/logo-white.png" 
          alt="UpClinic Logo" 
          h="50px" 
          mx="auto" 
          mb={4}
          fallbackSrc="https://via.placeholder.com/180x50?text=UpClinic"
        />
        <Heading as="h1" size="lg">
          Bem-vindo ao UpClinic!
        </Heading>
      </Box>
      
      {/* Corpo do Email */}
      <Box p={6}>
        <VStack spacing={6} align="stretch">
          {/* Mensagem de Boas-vindas */}
          <Box>
            <Heading as="h2" size="md" mb={3} color="brand.600">
              Sua jornada para uma clínica mais eficiente começa agora!
            </Heading>
            <Text>
              Olá {{nome}},
            </Text>
            <Text mt={2}>
              Estamos muito felizes em tê-lo como parte da comunidade UpClinic! 
              {{#if trial}}
              Seu teste gratuito de 7 dias do plano Plus foi ativado com sucesso.
              {{else}}
              Sua assinatura do plano {{plano}} foi confirmada com sucesso.
              {{/if}}
            </Text>
          </Box>
          
          {/* Detalhes da Conta */}
          <Box p={4} bg="gray.50" borderRadius="md">
            <Heading as="h3" size="sm" mb={3}>
              Detalhes da sua conta:
            </Heading>
            <Table size="sm" variant="simple">
              <Tbody>
                <Tr>
                  <Td fontWeight="bold" width="40%">Email:</Td>
                  <Td>{{email}}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold">Plano:</Td>
                  <Td>{{plano}}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold">Tipo de faturamento:</Td>
                  <Td>{{faturamento}}</Td>
                </Tr>
                {{#if trial}}
                <Tr>
                  <Td fontWeight="bold">Período de teste:</Td>
                  <Td>7 dias (até {{data_fim_trial}})</Td>
                </Tr>
                {{/if}}
              </Tbody>
            </Table>
          </Box>
          
          {/* Acesso ao Sistema */}
          <Box textAlign="center" py={4}>
            <Button 
              bg="brand.500" 
              color="white" 
              size="lg" 
              px={8}
              _hover={{ bg: 'brand.600' }}
            >
              Acessar o UpClinic
            </Button>
            <Text fontSize="sm" mt={2} color="gray.600">
              Ou acesse diretamente: https://app.upclinic.com.br
            </Text>
          </Box>
          
          <Divider />
          
          {/* Manual Digital */}
          <Box>
            <Heading as="h3" size="md" mb={4} color="brand.600">
              Seu Manual Digital Completo
            </Heading>
            
            <HStack spacing={6} align="top">
              <Image 
                src="/manual-cover.png" 
                alt="Manual Digital UpClinic" 
                w="150px"
                borderRadius="md"
                boxShadow="md"
                fallbackSrc="https://via.placeholder.com/150x200?text=Manual+UpClinic"
              />
              
              <Box>
                <Text mb={3}>
                  Preparamos um manual digital completo para ajudá-lo a aproveitar ao máximo o UpClinic. Nele você encontrará:
                </Text>
                
                <VStack align="start" spacing={1} mb={4}>
                  <Text>• Guia passo a passo de todas as funcionalidades</Text>
                  <Text>• Vídeos tutoriais para cada módulo</Text>
                  <Text>• Dicas e melhores práticas</Text>
                  <Text>• FAQ detalhado</Text>
                  <Text>• Informações de suporte</Text>
                </VStack>
                
                <Button 
                  bg="accent.500" 
                  color="white" 
                  _hover={{ bg: 'accent.600' }}
                >
                  Baixar Manual Digital (PDF)
                </Button>
              </Box>
            </HStack>
          </Box>
          
          <Divider />
          
          {/* Vídeos Tutoriais */}
          <Box>
            <Heading as="h3" size="md" mb={4} color="brand.600">
              Vídeos Tutoriais
            </Heading>
            
            <Text mb={4}>
              Assista aos nossos vídeos tutoriais para começar a usar o UpClinic rapidamente:
            </Text>
            
            <VStack spacing={4} align="stretch">
              <HStack p={3} bg="gray.50" borderRadius="md">
                <Image 
                  src="/video-thumb-1.png" 
                  alt="Primeiros Passos" 
                  w="120px" 
                  h="68px" 
                  objectFit="cover"
                  borderRadius="md"
                  fallbackSrc="https://via.placeholder.com/120x68?text=Video+1"
                />
                <Box>
                  <Text fontWeight="bold">Primeiros Passos</Text>
                  <Text fontSize="sm">Duração: 5:32</Text>
                </Box>
              </HStack>
              
              <HStack p={3} bg="gray.50" borderRadius="md">
                <Image 
                  src="/video-thumb-2.png" 
                  alt="Configurando sua Agenda" 
                  w="120px" 
                  h="68px" 
                  objectFit="cover"
                  borderRadius="md"
                  fallbackSrc="https://via.placeholder.com/120x68?text=Video+2"
                />
                <Box>
                  <Text fontWeight="bold">Configurando sua Agenda</Text>
                  <Text fontSize="sm">Duração: 7:15</Text>
                </Box>
              </HStack>
              
              <HStack p={3} bg="gray.50" borderRadius="md">
                <Image 
                  src="/video-thumb-3.png" 
                  alt="Prontuário Eletrônico" 
                  w="120px" 
                  h="68px" 
                  objectFit="cover"
                  borderRadius="md"
                  fallbackSrc="https://via.placeholder.com/120x68?text=Video+3"
                />
                <Box>
                  <Text fontWeight="bold">Prontuário Eletrônico</Text>
                  <Text fontSize="sm">Duração: 6:48</Text>
                </Box>
              </HStack>
            </VStack>
            
            <Button 
              variant="outline" 
              colorScheme="brand" 
              mt={4}
            >
              Ver Todos os Vídeos
            </Button>
          </Box>
          
          <Divider />
          
          {/* Próximos Passos */}
          <Box>
            <Heading as="h3" size="md" mb={4} color="brand.600">
              Próximos Passos
            </Heading>
            
            <VStack spacing={4} align="stretch">
              <Box p={4} bg="gray.50" borderRadius="md">
                <Text fontWeight="bold">1. Faça Login</Text>
                <Text>
                  Acesse o UpClinic com o email e senha que você cadastrou durante o processo de assinatura.
                </Text>
              </Box>
              
              <Box p={4} bg="gray.50" borderRadius="md">
                <Text fontWeight="bold">2. Siga o Tour Guiado</Text>
                <Text>
                  No seu primeiro acesso, você será recebido com um tour interativo que apresentará as principais funcionalidades do sistema.
                </Text>
              </Box>
              
              <Box p={4} bg="gray.50" borderRadius="md">
                <Text fontWeight="bold">3. Configure seu Perfil</Text>
                <Text>
                  Personalize seu perfil, configure suas preferências e comece a utilizar o UpClinic para transformar sua clínica.
                </Text>
              </Box>
            </VStack>
          </Box>
          
          <Divider />
          
          {/* Suporte */}
          <Box textAlign="center" p={4} bg="gray.50" borderRadius="md">
            <Heading as="h3" size="sm" mb={3}>
              Precisa de ajuda?
            </Heading>
            <Text mb={3}>
              Nossa equipe de suporte está disponível para ajudar você em qualquer dúvida ou dificuldade.
            </Text>
            <Button 
              variant="outline" 
              colorScheme="brand" 
              size="sm"
            >
              Contatar Suporte
            </Button>
          </Box>
        </VStack>
      </Box>
      
      {/* Rodapé */}
      <Box bg="gray.100" p={6} textAlign="center">
        <Text fontSize="sm" color="gray.600" mb={2}>
          © 2025 UpClinic - Todos os direitos reservados
        </Text>
        <HStack justify="center" spacing={4} fontSize="sm">
          <Text as="a" href="#" color="brand.600">Termos de Uso</Text>
          <Text as="a" href="#" color="brand.600">Política de Privacidade</Text>
          <Text as="a" href="#" color="brand.600">Cancelar Inscrição</Text>
        </HStack>
      </Box>
    </Container>
  );
};

export default EmailTemplate;
