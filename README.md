# NestJS Application - Docker Setup

This is a NestJS application configured to run with PostgreSQL using Docker and Docker Compose.

## Prerequisites

Ensure you have the following installed:

- **Docker**: [Download Docker](https://www.docker.com/get-started)
- **Docker Compose**: Installed along with Docker.

## Project Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-directory>
```

### 2.Environment Variables
Create a .env file in the root of your project with the following content:

```bash
# Node environment - dev | prod
NODE_ENV=dev

# PostgreSQL configuration
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=yourpassword
POSTGRES_DB=yourdatabase

# JWT Secret (if applicable)
JWT_SECRET=your_jwt_secret
```

### 3. Docker Setup
This project is fully containerized using Docker. It includes:

- NestJS Application
- PostgreSQL

### 4. Build and Run with Docker Compose
To build and run the application with Docker Compose, run the following command:

```bash
docker-compose -f docker-compose.yml up --build
```

This will:

- Build the Docker images for the NestJS app and PostgreSQL.
- Start both containers and link them.

### 5. Access the Application

Once the containers are running, you can access the NestJS application at:

```bash
http://localhost:3000/swagger
```





# Desafio BackEnd Fusion: **Criar** e **Gerenciar** a Galáxia Inspirada em Star Wars

## Objetivo
Desenvolver uma API backend que permita a criação, gerenciamento e visualização de uma galáxia inspirada em Star Wars, incluindo planetas, sistemas estelares, personagens e naves espaciais.

A API deve ser robusta, segura e eficiente, demonstrando habilidades em desenvolvimento backend.

## Requisitos do Projeto

### Estrutura da API
- A API deve ser desenvolvida usando Node.js com NestJS ou Express.

- Utilizar TypeScript para tipagem estática. A API deve seguir os princípios RESTful.

### Entidades:
- Planetas: Nome, clima, terreno, população.
- Sistemas Estelares: Nome, descrição, lista de planetas.
- Personagens: Nome, raça, afiliação (Jedi, Sith, Rebelde, etc.), planeta natal.
- Naves Espaciais: Nome, modelo, fabricante, capacidade de passageiros.

## EndPoints:

- **Planets**
  - **POST 📤 /planets:** Criar um novo planeta.
  - **GET 📥 /planets:** Listar todos os planetas.
  - **GET 📥 /planets/:id:** Obter detalhes de um planeta específico.
  - **PUT 🔄 /planets/:id:** Atualizar informações de um planeta.
  - **DELETE 🗑 /planets/:id:** Deletar um planeta.

- **Start Systems**
  - **POST 📤 /star-systems:** Criar um novo sistema estelar.
  - **GET 📥 /star-systems:** Listar todos os sistemas estelares.
  - **GET 📥 /star-systems/:id:** Obter detalhes de um sistema estelar específico.
  - **PUT 🔄 /star-systems/:id:** Atualizar informações de um sistema estelar
  - **DELETE 🗑 /star-systems/:id**: Deletar um sistema estelar.

- **Characters**
  - **POST 📤 /characters:** Criar um novo personagem.
  - **GET 📥 /characters:** Listar todos os personagens.
  - **GET 📥 /characters/:id:** Obter detalhes de um personagem específico.
  - **PUT 🔄 /characters/:id:** Atualizar informações de um personagem.
  - **DELETE 🗑 /characters/:id:** Deletar um personagem.

- **SpaceShips**
  - **POST 📤 /spaceships:** Criar uma nova nave espacial.
  - **GET 📥 /spaceships:** Listar todas as naves espaciais.
  - **GET 📥 /spaceships/:id:** Obter detalhes de uma nave espacial específica.
  - **PUT 🔄 /spaceships/:id:** Atualizar informações de uma nave espacial.
  - **DELETE 🗑 /spaceships/:id:** Deletar uma nave espacial.

### Autenticação e Autorização
- Implementar autenticação de usuários usando JWT.
- Os usuários devem ser categorizados com base em afiliações como Jedi, Sith, Rebeldes, etc.
- Proteger os endpoints para que apenas usuários autenticados possam criar, atualizar e deletar dados.

### Banco de Dados
- Usar qualquer banco de dados, relacional ou não-relacional.
- Utilizar qualquer ORM de sua escolha.

### Validação e Tratamento de Erros
- Implementar validação de dados de entrada.Gerenciar e retornar mensagens de erro apropriadas.

### Documentação da API (Opcional):
- Documentar a API usando Swagger ou Postman (não obrigatória).
- Incluir exemplos de requisições e respostas (schemas).

### Testes (Opcional):
- Escrever testes unitários e de integração para a API usando Jest (não obrigatória).

### Tecnologias e Ferramentas
- Linguagens: TypeScriptFrameworks: NestJS ou Express

### Extras:
- Deploy: Hospedar a API em um serviço como Heroku, AWS, ou DigitalOcean.
- Logs e Monitoramento: Implementar logs e monitoramento para a API usando ferramentas como Winston ou Morgan.

### Submissão
- Repositório GitHub: Submeter o código em um repositório público no GitHub.

### Documentação:
- Incluir um README.md detalhado com instruções de instalação, uso e qualquer informação relevante.
- Demo: Fornecer um link para a API hospedada e a documentação.
- Prazo prazo para submissão é de 15 dias  partir da data de início.