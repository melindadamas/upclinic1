# Manual de Implementação e Uso do UpClinic

## Visão Geral

Este documento fornece instruções detalhadas sobre a implementação, configuração e uso do sistema UpClinic, incluindo o site interativo, fluxo de assinatura, manual digital integrado, onboarding interativo e painel administrativo.

## Estrutura do Projeto

O projeto UpClinic está organizado da seguinte forma:

```
upclinic_site_interativo/
├── backend/                  # Servidor backend para APIs
├── public/                   # Arquivos públicos
└── src/
    ├── components/           # Componentes React reutilizáveis
    │   ├── admin/            # Componentes do painel administrativo
    │   ├── auth/             # Componentes de autenticação
    │   ├── email/            # Templates de email
    │   ├── layout/           # Componentes de layout
    │   ├── onboarding/       # Sistema de onboarding
    │   ├── subscription/     # Gerenciamento de assinaturas
    │   └── theme/            # Componentes de tema
    ├── contexts/             # Contextos React
    ├── pages/                # Páginas principais
    ├── services/             # Serviços e integrações
    │   ├── manual/           # Serviço do manual digital
    │   └── payment/          # Integração com PagSeguro
    ├── styles/               # Estilos e tema
    └── utils/                # Utilitários
```

## Funcionalidades Implementadas

### 1. Site Interativo

O site interativo do UpClinic apresenta as funcionalidades do sistema e permite que os usuários escolham planos de assinatura. Principais características:

- Design moderno e responsivo inspirado nas referências aprovadas (ZenFisio e HiDoctor)
- Apresentação clara das funcionalidades e benefícios
- Demonstração interativa das principais características
- Comparativo detalhado de planos

### 2. Fluxo de Assinatura e Pagamento

O sistema de assinatura permite que os usuários escolham entre diferentes planos e opções de pagamento:

- Três níveis de planos: Plus (R$15/mês), Pro (R$35/mês) e Master (R$45/mês)
- Opções de pagamento mensal ou anual (com desconto)
- Período de teste gratuito de 7 dias para o plano Plus
- Integração completa com PagSeguro para processamento de pagamentos
- Sistema de descontos progressivos conforme especificado

### 3. Manual Digital Integrado

O manual digital fornece documentação completa sobre o uso do sistema:

- Acessível após o login
- Conteúdo personalizado de acordo com o plano do usuário
- Navegação intuitiva por seções
- Busca integrada
- Vídeos tutoriais complementares
- Marcação de progresso de leitura

### 4. Onboarding Interativo

O sistema de onboarding guia novos usuários através das funcionalidades do UpClinic:

- Tour guiado com overlay nas telas
- Vídeos explicativos curtos
- Guias interativos com exemplos práticos
- Adaptação ao plano do usuário
- Progresso visual de conclusão

### 5. Painel Administrativo Restrito

O painel administrativo permite o gerenciamento completo de assinaturas e usuários:

- Acesso restrito via link discreto no rodapé
- Dashboard com métricas de assinaturas e receitas
- Gerenciamento de assinaturas (visualização, ativação, desativação)
- Relatórios detalhados
- Configurações do sistema

## Configuração e Implementação

### Requisitos do Sistema

- Node.js 16.x ou superior
- NPM 7.x ou superior
- Banco de dados MongoDB
- Conta no PagSeguro para processamento de pagamentos

### Configuração do Ambiente

1. Clone o repositório:
   ```
   git clone https://github.com/seu-usuario/upclinic_site_interativo.git
   cd upclinic_site_interativo
   ```

2. Instale as dependências:
   ```
   npm install
   cd backend
   npm install
   cd ..
   ```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
   ```
   REACT_APP_API_URL=http://localhost:3001/api
   REACT_APP_PAGSEGURO_API_URL=https://sandbox.api.pagseguro.com
   REACT_APP_PAGSEGURO_API_KEY=sua_chave_api_pagseguro
   ```

   Crie um arquivo `.env` na pasta `backend` com as seguintes variáveis:
   ```
   PORT=3001
   MONGODB_URI=mongodb://localhost:27017/upclinic
   JWT_SECRET=seu_segredo_jwt
   PAGSEGURO_API_KEY=sua_chave_api_pagseguro
   PAGSEGURO_API_URL=https://sandbox.api.pagseguro.com
   ```

4. Inicie o servidor de desenvolvimento:
   ```
   # Terminal 1 - Frontend
   npm start
   
   # Terminal 2 - Backend
   cd backend
   npm start
   ```

### Configuração do PagSeguro

1. Crie uma conta no PagSeguro (ou use uma existente)
2. Obtenha suas credenciais de API no painel do PagSeguro
3. Configure o webhook para receber notificações:
   - URL do webhook: `https://seu-dominio.com/api/webhooks/pagseguro`
   - Eventos a monitorar: `SUBSCRIPTION.CREATED`, `SUBSCRIPTION.UPDATED`, `SUBSCRIPTION.CANCELLED`, `PAYMENT.SUCCEEDED`, `PAYMENT.FAILED`

### Configuração do Domínio

1. Registre o domínio clinicupapp.com (ou o domínio escolhido)
2. Configure os registros DNS para apontar para seu servidor
3. Configure HTTPS usando Let's Encrypt ou similar

## Acesso ao Sistema

### Acesso de Usuários

Os usuários podem acessar o sistema através do site principal:
- URL: `https://clinicupapp.com`
- Fluxo: Escolher plano > Criar conta > Realizar pagamento > Acessar sistema

### Acesso Administrativo

O acesso ao painel administrativo é restrito e pode ser feito através do link no rodapé:
- URL: `https://clinicupapp.com/admin/login`
- Credenciais padrão:
  - Usuário: `admin`
  - Senha: `upclinic2025`

**Importante**: Altere a senha padrão após o primeiro acesso.

## Manutenção e Suporte

### Atualizações do Sistema

Para atualizar o sistema:
1. Faça backup do banco de dados
2. Atualize o código-fonte:
   ```
   git pull origin main
   npm install
   cd backend
   npm install
   cd ..
   ```
3. Reinicie os serviços

### Monitoramento

Monitore regularmente:
- Logs do servidor
- Métricas de assinaturas no painel administrativo
- Notificações do PagSeguro
- Feedback dos usuários

### Suporte Técnico

Para suporte técnico:
- Email: suporte@clinicupapp.com
- Documentação: Disponível no manual digital integrado
- Horário de atendimento: Segunda a sexta, 9h às 18h

## Próximos Passos e Melhorias Futuras

Algumas sugestões para melhorias futuras:

1. **Integração com mais gateways de pagamento**
   - Adicionar suporte a Stripe, PayPal e outros

2. **Aplicativo móvel nativo**
   - Desenvolver versões para iOS e Android

3. **Análise avançada de dados**
   - Implementar dashboard com insights mais detalhados

4. **Integração com mais dispositivos wearables**
   - Expandir suporte para mais fabricantes e modelos

5. **Sistema de afiliados**
   - Permitir que usuários indiquem novos clientes e recebam comissão

## Conclusão

O UpClinic está pronto para uso, com todas as funcionalidades solicitadas implementadas e testadas. O sistema oferece uma experiência moderna e intuitiva para clínicas e profissionais de saúde, com foco em usabilidade e valor agregado.

Para qualquer dúvida ou sugestão, entre em contato através do email contato@clinicupapp.com.
