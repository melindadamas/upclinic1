# Manual de Instalação e Ativação do UpClinic

Este manual foi criado para ajudar você a instalar e ativar o UpClinic em seu domínio próprio, permitindo vendas online e acesso aos usuários. As instruções são simples e não exigem conhecimentos técnicos avançados.

## Índice

1. [Requisitos Iniciais](#requisitos-iniciais)
2. [Configuração do Domínio](#configuração-do-domínio)
3. [Hospedagem do Site](#hospedagem-do-site)
4. [Instalação do UpClinic](#instalação-do-upclinic)
5. [Configuração do Mercado Pago](#configuração-do-mercado-pago)
6. [Ativação do Sistema](#ativação-do-sistema)
7. [Teste do Sistema](#teste-do-sistema)
8. [Solução de Problemas Comuns](#solução-de-problemas-comuns)

## Requisitos Iniciais

Antes de começar, certifique-se de que você possui:

- Um domínio registrado (exemplo: clinicupapp.com)
- Acesso ao painel de controle do seu provedor de domínio (como HostGator, conforme visto na sua captura de tela)
- Os arquivos do UpClinic que desenvolvemos para você

## Configuração do Domínio

### Passo 1: Acesse o Painel de Controle do seu Provedor

1. Abra o navegador e acesse o site do seu provedor de domínio (exemplo: HostGator)
2. Faça login com suas credenciais
3. Acesse a seção de gerenciamento de domínios

### Passo 2: Configure os Registros DNS

1. No painel de controle, encontre a opção "Zona DNS" ou "Gerenciar DNS"
2. Adicione ou edite os seguintes registros:

   - Registro A: Aponte para o IP do seu servidor de hospedagem
     - Nome: @ (ou deixe em branco)
     - Valor: [IP do servidor fornecido pela hospedagem]
     - TTL: 3600 (ou deixe o padrão)

   - Registro CNAME para "www":
     - Nome: www
     - Valor: @ (ou seu domínio completo)
     - TTL: 3600 (ou deixe o padrão)

3. Salve as alterações

**Observação:** As alterações de DNS podem levar até 24 horas para se propagar pela internet.

## Hospedagem do Site

### Passo 1: Escolha um Plano de Hospedagem

1. No painel do HostGator (ou outro provedor), acesse a seção "Hospedagem"
2. Escolha um plano que atenda aos requisitos do UpClinic:
   - Suporte a Node.js
   - Pelo menos 2GB de RAM
   - Pelo menos 10GB de espaço em disco
   - Suporte a SSL (para segurança)

### Passo 2: Ative a Hospedagem

1. Após escolher o plano, siga as instruções do provedor para ativar
2. Anote as informações de acesso fornecidas:
   - Endereço do servidor
   - Nome de usuário
   - Senha
   - Informações de FTP (para upload de arquivos)

## Instalação do UpClinic

### Passo 1: Prepare os Arquivos

1. Descompacte o arquivo ZIP do UpClinic em seu computador
2. Verifique se a estrutura de arquivos está correta:
   ```
   upclinic_site_interativo/
   ├── backend/
   ├── public/
   └── src/
   ```

### Passo 2: Configure o Arquivo de Ambiente

1. Localize o arquivo `.env.example` na pasta raiz
2. Faça uma cópia e renomeie para `.env`
3. Abra o arquivo `.env` em um editor de texto (como Bloco de Notas)
4. Preencha as seguintes informações:
   ```
   # Configurações do Servidor
   PORT=3001
   NODE_ENV=production
   
   # Configurações do Banco de Dados
   MONGODB_URI=mongodb://localhost:27017/upclinic
   
   # Configurações do Mercado Pago
   REACT_APP_MERCADOPAGO_PUBLIC_KEY=SUA_CHAVE_PUBLICA
   REACT_APP_MERCADOPAGO_ACCESS_TOKEN=SEU_TOKEN_DE_ACESSO
   
   # URL do Site
   REACT_APP_SITE_URL=https://seudominio.com
   ```

### Passo 3: Upload dos Arquivos

#### Opção 1: Usando FTP

1. Baixe e instale um cliente FTP (como FileZilla)
2. Conecte ao seu servidor usando as credenciais FTP fornecidas pela hospedagem
3. Navegue até a pasta raiz do seu site (geralmente `/public_html/`)
4. Faça upload de todos os arquivos do UpClinic para esta pasta

#### Opção 2: Usando o Gerenciador de Arquivos do Painel de Controle

1. No painel de controle da hospedagem, acesse o "Gerenciador de Arquivos"
2. Navegue até a pasta raiz do seu site (geralmente `/public_html/`)
3. Use a opção "Upload" para enviar o arquivo ZIP do UpClinic
4. Extraia o arquivo ZIP diretamente no servidor

### Passo 4: Instale as Dependências

1. Acesse o terminal SSH da sua hospedagem (disponível no painel de controle)
2. Navegue até a pasta do projeto:
   ```
   cd /public_html/upclinic_site_interativo
   ```
3. Instale as dependências do frontend:
   ```
   npm install
   ```
4. Navegue até a pasta do backend:
   ```
   cd backend
   ```
5. Instale as dependências do backend:
   ```
   npm install
   ```

### Passo 5: Construa o Frontend

1. Volte para a pasta raiz do projeto:
   ```
   cd ..
   ```
2. Execute o comando de build:
   ```
   npm run build
   ```
3. Aguarde a conclusão do processo

### Passo 6: Configure o Servidor

1. No painel de controle da hospedagem, procure por "Configurações de Node.js" ou similar
2. Configure o ponto de entrada como:
   ```
   /public_html/upclinic_site_interativo/backend/server.js
   ```
3. Defina as variáveis de ambiente necessárias (caso não estejam no arquivo .env)
4. Salve as configurações e reinicie o servidor Node.js

## Configuração do Mercado Pago

### Passo 1: Crie uma Conta no Mercado Pago

1. Acesse [mercadopago.com.br](https://www.mercadopago.com.br/)
2. Clique em "Criar conta" e siga as instruções
3. Complete o processo de verificação da conta

### Passo 2: Obtenha as Credenciais

1. Faça login na sua conta do Mercado Pago
2. Acesse o [Painel de Desenvolvedores](https://www.mercadopago.com.br/developers/panel)
3. Clique em "Criar aplicação" ou acesse uma aplicação existente
4. Anote as seguintes informações:
   - Chave Pública (Public Key)
   - Token de Acesso (Access Token)

### Passo 3: Configure as Credenciais no UpClinic

1. Abra o arquivo `.env` que você editou anteriormente
2. Atualize as seguintes linhas com suas credenciais:
   ```
   REACT_APP_MERCADOPAGO_PUBLIC_KEY=SUA_CHAVE_PUBLICA
   REACT_APP_MERCADOPAGO_ACCESS_TOKEN=SEU_TOKEN_DE_ACESSO
   ```
3. Salve o arquivo

### Passo 4: Configure o Webhook

1. No Painel de Desenvolvedores do Mercado Pago, acesse sua aplicação
2. Vá para a seção "Webhooks"
3. Adicione uma nova URL de webhook:
   ```
   https://seudominio.com/api/webhooks/mercadopago
   ```
4. Selecione os eventos:
   - merchant_order
   - payment
   - subscription
5. Salve as configurações

## Ativação do Sistema

### Passo 1: Inicie o Servidor

1. No painel de controle da hospedagem, acesse o gerenciador de processos Node.js
2. Inicie o servidor com o comando:
   ```
   node /public_html/upclinic_site_interativo/backend/server.js
   ```
3. Verifique se o servidor está rodando sem erros

### Passo 2: Configure o SSL (HTTPS)

1. No painel de controle da hospedagem, procure por "SSL/TLS" ou "Certificados"
2. Ative o SSL gratuito Let's Encrypt para seu domínio
3. Siga as instruções para instalar o certificado
4. Aguarde a ativação do SSL (pode levar alguns minutos)

### Passo 3: Crie a Conta de Administrador

1. Acesse seu site: `https://seudominio.com/admin/login`
2. Use as credenciais padrão:
   - Usuário: `admin`
   - Senha: `upclinic2025`
3. Após o primeiro login, altere imediatamente a senha padrão:
   - Clique no seu nome de usuário no canto superior direito
   - Selecione "Alterar senha"
   - Defina uma nova senha forte

## Teste do Sistema

### Passo 1: Verifique o Acesso ao Site

1. Abra um navegador e acesse `https://seudominio.com`
2. Verifique se a página inicial carrega corretamente
3. Navegue pelo menu para garantir que todas as páginas estão funcionando

### Passo 2: Teste o Processo de Assinatura

1. Clique em "Ver planos" ou "Assinar"
2. Selecione um plano
3. Preencha o formulário de cadastro
4. Insira os dados de pagamento de teste:
   - Número do cartão: 5031 4332 1540 6351
   - Nome: Qualquer nome
   - Data de validade: Qualquer data futura
   - CVV: 123
5. Conclua o processo e verifique se recebe a confirmação

### Passo 3: Teste o Acesso de Usuário

1. Faça login com a conta que você acabou de criar
2. Verifique se o onboarding é exibido corretamente
3. Navegue pelo sistema para garantir que todas as funcionalidades estão disponíveis

### Passo 4: Teste o Painel Administrativo

1. Acesse `https://seudominio.com/admin/login`
2. Faça login com suas credenciais de administrador
3. Verifique se todas as seções do painel estão funcionando:
   - Dashboard
   - Assinaturas
   - Relatórios
   - Configurações

## Solução de Problemas Comuns

### O site não carrega

**Possíveis causas e soluções:**
- **DNS não propagado:** Aguarde até 24 horas para a propagação completa
- **Servidor não iniciado:** Verifique se o servidor Node.js está rodando
- **Erro no arquivo de configuração:** Verifique o arquivo `.env`

### Erro de conexão com o banco de dados

**Possíveis causas e soluções:**
- **MongoDB não instalado:** Instale o MongoDB no servidor
- **URI incorreta:** Verifique a URI no arquivo `.env`
- **Firewall bloqueando:** Configure o firewall para permitir conexões MongoDB

### Problemas com pagamentos

**Possíveis causas e soluções:**
- **Credenciais incorretas:** Verifique as credenciais do Mercado Pago
- **Modo sandbox:** Verifique se está usando o ambiente correto (sandbox ou produção)
- **Webhook não configurado:** Configure o webhook conforme as instruções

### Erros de SSL

**Possíveis causas e soluções:**
- **Certificado não instalado:** Verifique a instalação do certificado SSL
- **Recursos mistos:** Certifique-se de que todos os recursos são carregados via HTTPS
- **Redirecionamento não configurado:** Configure o redirecionamento de HTTP para HTTPS

## Suporte Técnico

Se você encontrar problemas durante a instalação ou uso do UpClinic, entre em contato com nosso suporte técnico:

- **Email:** suporte@clinicupapp.com
- **Telefone:** (11) 1234-5678
- **Horário de atendimento:** Segunda a sexta, 9h às 18h

---

Este manual foi criado para facilitar a instalação e ativação do UpClinic em seu domínio próprio. Para atualizações ou mais informações, visite [clinicupapp.com/suporte](https://clinicupapp.com/suporte).
