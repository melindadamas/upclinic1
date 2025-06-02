# Guia de Implantação Local do UpClinic

Este guia detalhado fornece todas as instruções necessárias para implantar o UpClinic localmente na máquina do usuário, garantindo controle total sobre os dados e independência de serviços em nuvem.

## Índice

1. [Requisitos de Sistema](#requisitos-de-sistema)
2. [Instalação do Ambiente](#instalação-do-ambiente)
3. [Configuração do Banco de Dados](#configuração-do-banco-de-dados)
4. [Instalação do UpClinic](#instalação-do-upclinic)
5. [Configuração do PagSeguro](#configuração-do-pagseguro)
6. [Sistema de Backup](#sistema-de-backup)
7. [Atualizações](#atualizações)
8. [Modelo Híbrido (Opcional)](#modelo-híbrido-opcional)
9. [Solução de Problemas](#solução-de-problemas)
10. [Suporte Técnico](#suporte-técnico)

## Requisitos de Sistema

### Hardware Recomendado

- **Processador:** Intel Core i5 (8ª geração ou superior) ou AMD Ryzen 5 ou superior
- **Memória RAM:** 8GB mínimo, 16GB recomendado
- **Armazenamento:** 256GB SSD mínimo (500GB recomendado)
- **Conexão de Internet:** 10 Mbps ou superior
- **Monitor:** Resolução mínima de 1920x1080

### Software Necessário

- **Sistema Operacional:** Windows 10/11, macOS 10.15+ ou Ubuntu 20.04+
- **Node.js:** Versão 16.x ou superior
- **MongoDB:** Versão 5.0 ou superior
- **Git:** Versão mais recente
- **Navegador:** Chrome, Firefox, Edge ou Safari (versões atualizadas)

## Instalação do Ambiente

### 1. Instalação do Node.js

#### Windows
1. Acesse [nodejs.org](https://nodejs.org/)
2. Baixe a versão LTS (Long Term Support)
3. Execute o instalador e siga as instruções
4. Verifique a instalação abrindo o Prompt de Comando e digitando:
   ```
   node --version
   npm --version
   ```

#### macOS
1. Instale o Homebrew (se ainda não tiver):
   ```
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
2. Instale o Node.js:
   ```
   brew install node
   ```
3. Verifique a instalação:
   ```
   node --version
   npm --version
   ```

#### Linux (Ubuntu/Debian)
1. Atualize os repositórios:
   ```
   sudo apt update
   ```
2. Instale o Node.js:
   ```
   sudo apt install nodejs npm
   ```
3. Verifique a instalação:
   ```
   node --version
   npm --version
   ```

### 2. Instalação do MongoDB

#### Windows
1. Acesse [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. Baixe o instalador MSI
3. Execute o instalador e siga as instruções
4. Selecione "Complete" na instalação
5. Marque a opção "Install MongoDB as a Service"
6. Conclua a instalação

#### macOS
1. Use o Homebrew:
   ```
   brew tap mongodb/brew
   brew install mongodb-community
   ```
2. Inicie o serviço:
   ```
   brew services start mongodb-community
   ```

#### Linux (Ubuntu/Debian)
1. Importe a chave pública:
   ```
   wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
   ```
2. Crie um arquivo de lista:
   ```
   echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
   ```
3. Atualize os repositórios:
   ```
   sudo apt update
   ```
4. Instale o MongoDB:
   ```
   sudo apt install -y mongodb-org
   ```
5. Inicie o serviço:
   ```
   sudo systemctl start mongod
   sudo systemctl enable mongod
   ```

### 3. Instalação do Git

#### Windows
1. Acesse [git-scm.com](https://git-scm.com/download/win)
2. Baixe o instalador
3. Execute e siga as instruções (use as opções padrão)

#### macOS
1. Use o Homebrew:
   ```
   brew install git
   ```

#### Linux (Ubuntu/Debian)
1. Instale via apt:
   ```
   sudo apt install git
   ```

## Configuração do Banco de Dados

### 1. Criação do Banco de Dados UpClinic

1. Abra um terminal ou prompt de comando
2. Inicie o cliente MongoDB:
   ```
   mongosh
   ```
3. Crie o banco de dados:
   ```
   use upclinic
   ```
4. Crie um usuário para o banco de dados:
   ```
   db.createUser({
     user: "upclinic_admin",
     pwd: "senha_segura_aqui",  // Substitua por uma senha forte
     roles: ["readWrite", "dbAdmin"]
   })
   ```
5. Verifique se o usuário foi criado:
   ```
   show users
   ```
6. Saia do cliente MongoDB:
   ```
   exit
   ```

### 2. Configuração de Segurança

1. Localize o arquivo de configuração do MongoDB:
   - Windows: `C:\Program Files\MongoDB\Server\5.0\bin\mongod.cfg`
   - macOS: `/usr/local/etc/mongod.conf`
   - Linux: `/etc/mongod.conf`

2. Edite o arquivo para habilitar autenticação:
   ```yaml
   security:
     authorization: enabled
   ```

3. Reinicie o serviço MongoDB:
   - Windows: `Serviços > MongoDB Server > Reiniciar`
   - macOS: `brew services restart mongodb-community`
   - Linux: `sudo systemctl restart mongod`

## Instalação do UpClinic

### 1. Baixar o Código-Fonte

1. Abra um terminal ou prompt de comando
2. Navegue até o diretório onde deseja instalar o UpClinic:
   ```
   cd /caminho/para/diretorio
   ```
3. Clone o repositório:
   ```
   git clone https://github.com/seu-usuario/upclinic_site_interativo.git
   cd upclinic_site_interativo
   ```

### 2. Configuração do Backend

1. Navegue até a pasta do backend:
   ```
   cd backend
   ```
2. Instale as dependências:
   ```
   npm install
   ```
3. Crie um arquivo `.env` com as seguintes variáveis:
   ```
   PORT=3001
   MONGODB_URI=mongodb://upclinic_admin:senha_segura_aqui@localhost:27017/upclinic
   JWT_SECRET=sua_chave_secreta_jwt
   PAGSEGURO_API_KEY=sua_chave_api_pagseguro
   PAGSEGURO_API_URL=https://sandbox.api.pagseguro.com
   ```
4. Inicie o servidor backend:
   ```
   npm start
   ```

### 3. Configuração do Frontend

1. Navegue até a pasta raiz do projeto:
   ```
   cd ..
   ```
2. Instale as dependências:
   ```
   npm install
   ```
3. Crie um arquivo `.env` com as seguintes variáveis:
   ```
   REACT_APP_API_URL=http://localhost:3001/api
   REACT_APP_PAGSEGURO_API_URL=https://sandbox.api.pagseguro.com
   REACT_APP_PAGSEGURO_API_KEY=sua_chave_api_pagseguro
   ```
4. Construa a aplicação para produção:
   ```
   npm run build
   ```
5. Instale um servidor local para servir a aplicação:
   ```
   npm install -g serve
   ```
6. Inicie o servidor frontend:
   ```
   serve -s build
   ```

### 4. Configuração do Acesso Local

1. Abra seu navegador e acesse:
   ```
   http://localhost:5000
   ```
2. Você deverá ver a página inicial do UpClinic
3. Crie uma conta de administrador:
   - Acesse `http://localhost:5000/admin/login`
   - Use as credenciais padrão: `admin` / `upclinic2025`
   - Altere a senha imediatamente após o primeiro login

## Configuração do PagSeguro

### 1. Criação de Conta no PagSeguro

1. Acesse [pagseguro.uol.com.br](https://pagseguro.uol.com.br/)
2. Crie uma conta ou faça login
3. Navegue até a seção de Integrações
4. Crie uma nova aplicação para obter as credenciais de API

### 2. Configuração das Credenciais

1. No painel do PagSeguro, obtenha:
   - Chave de API (API Key)
   - Token de aplicação
   - ID da aplicação

2. Atualize o arquivo `.env` do backend:
   ```
   PAGSEGURO_API_KEY=sua_chave_api_pagseguro
   PAGSEGURO_TOKEN=seu_token_pagseguro
   PAGSEGURO_APP_ID=seu_app_id_pagseguro
   PAGSEGURO_API_URL=https://api.pagseguro.com
   ```

3. Reinicie o servidor backend:
   ```
   cd backend
   npm restart
   ```

### 3. Configuração do Webhook

Para receber notificações de pagamento em ambiente local:

1. Instale o ngrok:
   ```
   npm install -g ngrok
   ```

2. Exponha seu servidor local:
   ```
   ngrok http 3001
   ```

3. Copie a URL HTTPS fornecida pelo ngrok (ex: `https://a1b2c3d4.ngrok.io`)

4. No painel do PagSeguro, configure o webhook:
   - URL: `https://a1b2c3d4.ngrok.io/api/webhooks/pagseguro`
   - Eventos: `SUBSCRIPTION.CREATED`, `SUBSCRIPTION.UPDATED`, `SUBSCRIPTION.CANCELLED`, `PAYMENT.SUCCEEDED`, `PAYMENT.FAILED`

## Sistema de Backup

### 1. Backup do Banco de Dados

#### Configuração de Backup Automático

1. Crie um script de backup `backup_mongodb.sh`:

   ```bash
   #!/bin/bash
   
   # Configurações
   BACKUP_DIR="/caminho/para/backups"
   DATE=$(date +"%Y%m%d_%H%M%S")
   MONGODB_HOST="localhost"
   MONGODB_PORT="27017"
   MONGODB_USER="upclinic_admin"
   MONGODB_PASSWORD="senha_segura_aqui"
   MONGODB_DB="upclinic"
   
   # Criar diretório de backup se não existir
   mkdir -p $BACKUP_DIR
   
   # Executar backup
   mongodump --host $MONGODB_HOST --port $MONGODB_PORT --db $MONGODB_DB --username $MONGODB_USER --password $MONGODB_PASSWORD --out $BACKUP_DIR/$DATE
   
   # Compactar backup
   cd $BACKUP_DIR
   tar -zcvf $DATE.tar.gz $DATE
   
   # Remover diretório temporário
   rm -rf $BACKUP_DIR/$DATE
   
   # Manter apenas os últimos 7 backups
   ls -tp $BACKUP_DIR/*.tar.gz | grep -v '/$' | tail -n +8 | xargs -I {} rm -- {}
   
   echo "Backup concluído: $BACKUP_DIR/$DATE.tar.gz"
   ```

2. Torne o script executável:
   ```
   chmod +x backup_mongodb.sh
   ```

3. Configure um agendamento com cron (Linux/macOS):
   ```
   crontab -e
   ```
   
   Adicione a linha para backup diário às 2h da manhã:
   ```
   0 2 * * * /caminho/para/backup_mongodb.sh
   ```

#### Restauração de Backup

1. Descompacte o arquivo de backup:
   ```
   tar -zxvf nome_do_backup.tar.gz
   ```

2. Restaure o banco de dados:
   ```
   mongorestore --host localhost --port 27017 --username upclinic_admin --password senha_segura_aqui --db upclinic /caminho/para/backup/upclinic
   ```

### 2. Backup de Arquivos

1. Crie um script de backup `backup_files.sh`:

   ```bash
   #!/bin/bash
   
   # Configurações
   BACKUP_DIR="/caminho/para/backups/files"
   DATE=$(date +"%Y%m%d_%H%M%S")
   APP_DIR="/caminho/para/upclinic_site_interativo"
   
   # Criar diretório de backup se não existir
   mkdir -p $BACKUP_DIR
   
   # Executar backup
   tar -zcvf $BACKUP_DIR/upclinic_files_$DATE.tar.gz $APP_DIR --exclude="$APP_DIR/node_modules" --exclude="$APP_DIR/.git"
   
   # Manter apenas os últimos 7 backups
   ls -tp $BACKUP_DIR/*.tar.gz | grep -v '/$' | tail -n +8 | xargs -I {} rm -- {}
   
   echo "Backup de arquivos concluído: $BACKUP_DIR/upclinic_files_$DATE.tar.gz"
   ```

2. Torne o script executável:
   ```
   chmod +x backup_files.sh
   ```

3. Configure um agendamento com cron (Linux/macOS):
   ```
   crontab -e
   ```
   
   Adicione a linha para backup semanal aos domingos às 3h da manhã:
   ```
   0 3 * * 0 /caminho/para/backup_files.sh
   ```

## Atualizações

### 1. Atualização Manual

1. Faça backup do sistema antes de atualizar:
   ```
   ./backup_mongodb.sh
   ./backup_files.sh
   ```

2. Atualize o código-fonte:
   ```
   cd /caminho/para/upclinic_site_interativo
   git pull origin main
   ```

3. Atualize as dependências:
   ```
   npm install
   cd backend
   npm install
   cd ..
   ```

4. Reconstrua a aplicação frontend:
   ```
   npm run build
   ```

5. Reinicie os serviços:
   ```
   # Reinicie o backend
   cd backend
   npm restart
   
   # Reinicie o frontend
   cd ..
   serve -s build
   ```

### 2. Script de Atualização Automática

Crie um script `update_upclinic.sh`:

```bash
#!/bin/bash

# Configurações
APP_DIR="/caminho/para/upclinic_site_interativo"
LOG_FILE="$APP_DIR/update_log.txt"

# Registrar início da atualização
echo "Iniciando atualização em $(date)" >> $LOG_FILE

# Fazer backup
echo "Executando backup..." >> $LOG_FILE
./backup_mongodb.sh
./backup_files.sh

# Atualizar código-fonte
echo "Atualizando código-fonte..." >> $LOG_FILE
cd $APP_DIR
git pull origin main >> $LOG_FILE 2>&1

# Atualizar dependências
echo "Atualizando dependências..." >> $LOG_FILE
npm install >> $LOG_FILE 2>&1
cd backend
npm install >> $LOG_FILE 2>&1
cd ..

# Reconstruir frontend
echo "Reconstruindo frontend..." >> $LOG_FILE
npm run build >> $LOG_FILE 2>&1

# Reiniciar serviços
echo "Reiniciando serviços..." >> $LOG_FILE
cd backend
npm restart >> $LOG_FILE 2>&1
cd ..

echo "Atualização concluída em $(date)" >> $LOG_FILE
```

Torne o script executável:
```
chmod +x update_upclinic.sh
```

## Modelo Híbrido (Opcional)

O modelo híbrido permite que você execute o UpClinic localmente, mas utilize serviços em nuvem para funcionalidades específicas.

### 1. Configuração de Serviços em Nuvem

#### Processamento de Pagamentos (PagSeguro)

O processamento de pagamentos já é naturalmente um serviço em nuvem, mesmo na instalação local.

#### Armazenamento de Arquivos (AWS S3 ou similar)

1. Crie uma conta na AWS e configure um bucket S3
2. Obtenha as credenciais de acesso (Access Key e Secret Key)
3. Atualize o arquivo `.env` do backend:
   ```
   AWS_ACCESS_KEY=sua_access_key
   AWS_SECRET_KEY=sua_secret_key
   AWS_BUCKET_NAME=seu_bucket_s3
   AWS_REGION=sa-east-1
   ```

4. Configure o backend para usar S3 para armazenamento de arquivos:
   ```javascript
   // No arquivo de configuração do backend
   const storageType = process.env.STORAGE_TYPE || 'local';
   ```

#### Banco de Dados em Nuvem (MongoDB Atlas)

1. Crie uma conta no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Configure um cluster gratuito ou pago
3. Obtenha a string de conexão
4. Atualize o arquivo `.env` do backend:
   ```
   MONGODB_URI=mongodb+srv://usuario:senha@cluster0.mongodb.net/upclinic?retryWrites=true&w=majority
   ```

### 2. Sincronização de Dados

Para sincronizar dados entre a instalação local e a nuvem:

1. Crie um script de sincronização `sync_data.js`:

```javascript
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Configurações
const localDbUri = 'mongodb://upclinic_admin:senha_segura_aqui@localhost:27017/upclinic';
const cloudDbUri = process.env.CLOUD_MONGODB_URI;
const collections = ['users', 'subscriptions', 'patients', 'appointments'];

async function syncData() {
  console.log('Iniciando sincronização...');
  
  // Conectar ao banco local
  const localConn = await mongoose.createConnection(localDbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  
  // Conectar ao banco na nuvem
  const cloudConn = await mongoose.createConnection(cloudDbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  
  // Sincronizar cada coleção
  for (const collectionName of collections) {
    console.log(`Sincronizando coleção: ${collectionName}`);
    
    // Obter dados locais
    const localCollection = localConn.collection(collectionName);
    const localData = await localCollection.find({}).toArray();
    
    // Obter dados da nuvem
    const cloudCollection = cloudConn.collection(collectionName);
    const cloudData = await cloudCollection.find({}).toArray();
    
    // Comparar e sincronizar
    for (const localDoc of localData) {
      const cloudDoc = cloudData.find(doc => doc._id.toString() === localDoc._id.toString());
      
      if (!cloudDoc) {
        // Documento existe apenas localmente, adicionar à nuvem
        await cloudCollection.insertOne(localDoc);
        console.log(`Adicionado documento ${localDoc._id} à nuvem`);
      } else if (localDoc.updatedAt > cloudDoc.updatedAt) {
        // Documento local é mais recente, atualizar na nuvem
        await cloudCollection.updateOne({ _id: localDoc._id }, { $set: localDoc });
        console.log(`Atualizado documento ${localDoc._id} na nuvem`);
      }
    }
    
    // Verificar documentos que existem apenas na nuvem
    for (const cloudDoc of cloudData) {
      const localDoc = localData.find(doc => doc._id.toString() === cloudDoc._id.toString());
      
      if (!localDoc && cloudDoc.updatedAt > localDoc.updatedAt) {
        // Documento existe apenas na nuvem ou é mais recente, adicionar/atualizar localmente
        await localCollection.updateOne(
          { _id: cloudDoc._id }, 
          { $set: cloudDoc },
          { upsert: true }
        );
        console.log(`Adicionado/atualizado documento ${cloudDoc._id} localmente`);
      }
    }
  }
  
  console.log('Sincronização concluída!');
  
  // Fechar conexões
  await localConn.close();
  await cloudConn.close();
}

// Executar sincronização
syncData().catch(console.error);
```

2. Configure um agendamento para sincronização periódica:
   ```
   crontab -e
   ```
   
   Adicione a linha para sincronização a cada 6 horas:
   ```
   0 */6 * * * node /caminho/para/sync_data.js >> /caminho/para/sync_log.txt 2>&1
   ```

## Solução de Problemas

### Problemas de Conexão com o Banco de Dados

**Problema:** Não é possível conectar ao MongoDB local.

**Solução:**
1. Verifique se o serviço MongoDB está em execução:
   - Windows: `services.msc` > MongoDB
   - macOS: `brew services list`
   - Linux: `sudo systemctl status mongod`

2. Verifique as credenciais no arquivo `.env`

3. Teste a conexão manualmente:
   ```
   mongosh mongodb://upclinic_admin:senha_segura_aqui@localhost:27017/upclinic
   ```

### Problemas com o Backend

**Problema:** O servidor backend não inicia.

**Solução:**
1. Verifique os logs de erro:
   ```
   cd backend
   npm start
   ```

2. Verifique se todas as dependências estão instaladas:
   ```
   npm install
   ```

3. Verifique se as variáveis de ambiente estão configuradas corretamente no arquivo `.env`

### Problemas com o Frontend

**Problema:** O frontend não carrega ou exibe erros.

**Solução:**
1. Verifique se o build foi gerado corretamente:
   ```
   npm run build
   ```

2. Verifique se o servidor está em execução:
   ```
   serve -s build
   ```

3. Limpe o cache do navegador e tente novamente

### Problemas com Pagamentos

**Problema:** Não é possível processar pagamentos via PagSeguro.

**Solução:**
1. Verifique se as credenciais do PagSeguro estão corretas no arquivo `.env`

2. Verifique se o webhook está configurado corretamente

3. Teste a conexão com a API do PagSeguro:
   ```javascript
   // Arquivo de teste: test_pagseguro.js
   const axios = require('axios');
   
   async function testPagSeguro() {
     try {
       const response = await axios.get('https://sandbox.api.pagseguro.com/public-keys/versions', {
         headers: {
           'Authorization': `Bearer ${process.env.PAGSEGURO_API_KEY}`
         }
       });
       console.log('Conexão bem-sucedida:', response.data);
     } catch (error) {
       console.error('Erro na conexão:', error.response?.data || error.message);
     }
   }
   
   testPagSeguro();
   ```

   Execute o teste:
   ```
   node test_pagseguro.js
   ```

## Suporte Técnico

Para obter suporte técnico com a instalação local do UpClinic:

- **Email:** suporte@clinicupapp.com
- **Telefone:** (11) 1234-5678
- **Horário de atendimento:** Segunda a sexta, 9h às 18h

### Informações Necessárias para Suporte

Ao solicitar suporte, tenha em mãos:

1. Versão do UpClinic instalada
2. Sistema operacional e versão
3. Logs de erro (se disponíveis)
4. Descrição detalhada do problema

---

Este guia foi criado para facilitar a implantação local do UpClinic. Para atualizações ou mais informações, visite [clinicupapp.com/suporte](https://clinicupapp.com/suporte).
