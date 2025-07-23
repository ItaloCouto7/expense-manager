# Gerenciador de Despesas 💸

Este projeto é um sistema de controle de despesas pessoais, dividido entre **backend (Laravel)** e **frontend (Angular)**. Ele permite cadastrar, visualizar e analisar despesas, além de gerar sugestões com base no histórico do usuário via API do GeminiIA.

---

## 🔧 Tecnologias Utilizadas

### Backend
- **PHP 8+**
- **Laravel 10**
- **Google Gemini IA** 
- **MySQL** 

### Frontend
- **Angular 17+**
- **Angular Material**
- **Standalone Components**

---

## 🚀 Funcionalidades

- Cadastro e listagem de despesas
- Agrupamento por categoria
- Geração de resumo mensal
- Identificação de despesas recorrentes
- Sugestões automatizadas via GeminiIA
- Integração total entre frontend e backend via HTTP

---

## 📦 Instalação

### Backend

```bash
cd backend/gerenciador-backend

# Instalar dependências
composer install

# Copiar arquivo de ambiente
cp .env.example .env

# Gerar chave da aplicação
php artisan key:generate

# Rodar as migrations
php artisan migrate

# Iniciar servidor local
php artisan serve
```
Importante: Adicione sua chave do Gemini no .env:

```env
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxx
```
### Frontend
```bash
cd frontend/gerenciador-frontend

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
ng serve
```

### ▶️ Subir o banco de dados
Execute o comando abaixo para iniciar o container:

```bash
docker-compose up -d
```
Esse comando irá:

Subir um container com o MySQL 8, criando automaticamente o banco gastos_db.

Subir o phpMyAdmin na porta 8080 para acessar visualmente os dados do banco.

### 🧑‍💻 Autor
**Desenvolvido por Ítalo Coutinho.**
