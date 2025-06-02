# UpClinic

Sistema de Administração de Saúde (SAS) para gestão clínica e prontuário eletrônico.

## Requisitos

* Python 3.8+
* Node.js 16+
* Redis (para WebSockets)
* PostgreSQL (opcional, para produção)

## Estrutura do Projeto

```
upclinic/
├── backend/           # Backend Django
├── frontend/          # Frontend React
├── cbo_app/          # Aplicação CBO
└── data/             # Dados e migrações
```

## Instalação

### Backend (Django)

1. Entre no diretório do backend:
```bash
cd backend
```

2. Crie e ative um ambiente virtual:
```bash
python -m venv venv
source venv/Scripts/activate  # Windows
# ou
source venv/bin/activate     # Linux/Mac
```

3. Instale as dependências:
```bash
pip install -r requirements.txt
```

4. Execute as migrações:
```bash
python manage.py migrate
```

5. Inicie o servidor:
```bash
python manage.py runserver
```

### Frontend (React)

1. Entre no diretório do frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## Acessando a aplicação

* Frontend: http://localhost:5173
* Backend: http://localhost:8000
* Admin Django: http://localhost:8000/admin

## Tecnologias utilizadas

### Backend
* Django
* Django REST Framework
* Channels (WebSockets)
* JWT Authentication
* CORS Headers
* PagSeguro Integration

### Frontend
* React
* Vite
* Material-UI
* React Big Calendar
* React Speech Kit
* Axios

## Tipos de Acesso

* **Administrador**: Gerenciamento completo do sistema, cadastro de profissionais e configurações
* **Profissional**: Acesso aos prontuários de pacientes, registro de consultas e exames
* **Paciente**: Visualização do próprio histórico médico e agendamentos

## Documentação Adicional

* [Manual de Implementação](MANUAL_IMPLEMENTACAO.md)
* [Manual de Instalação Web](MANUAL_INSTALACAO_WEB.md)
* [Guia de Implantação Local](GUIA_IMPLANTACAO_LOCAL.md) 