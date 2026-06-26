# 🌱 Sistema Inteligente de Gestão de Fazenda e Análise de Custos Agrícolas

Backend desenvolvido em **FastAPI** para gerenciamento de uma propriedade agrícola, permitindo o cadastro de culturas, máquinas, atividades, produções, custos e geração de indicadores financeiros.

---

## 📋 Funcionalidades

O sistema disponibiliza APIs REST para:

- 🌾 Cadastro de culturas
- 🚜 Cadastro de máquinas agrícolas
- 📅 Registro de atividades agrícolas
- 📦 Controle de produção
- 💰 Controle de custos
- 📊 Dashboard com indicadores
- 📈 Resumo financeiro e cálculo de lucro

---

## 🛠 Tecnologias Utilizadas

- Python 3.12+
- FastAPI
- PostgreSQL
- Neon Database
- Psycopg2
- Pydantic
- Uvicorn
- Python Dotenv

---

## 📁 Estrutura do Projeto

```
backend/
│
├── routers/
│   ├── atividades.py
│   ├── culturas.py
│   ├── custos.py
│   ├── dashboard.py
│   ├── lucro.py
│   ├── maquinas.py
│   └── producao.py
│
├── models/
│   └── model.py
│
├── db.py
├── main.py
├── requirements.txt
└── .env
```

---

## ⚙️ Configuração

Clone o projeto

```bash
git clone <url-do-repositorio>
```

Entre na pasta

```bash
cd backend
```

Crie um ambiente virtual

### Windows

```bash
python -m venv venv
```

Ative

```bash
venv\Scripts\activate
```

### Linux/Mac

```bash
source venv/bin/activate
```

Instale as dependências

```bash
pip install -r requirements.txt
```

---

## 🔐 Configuração do Banco

Crie um arquivo `.env`

```env
DB_HOST=seu_host
DB_NAME=seu_banco
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_PORT=5432
```

---

## ▶️ Executando a aplicação

```bash
uvicorn main:app --reload
```

Servidor disponível em

```
http://127.0.0.1:8000
```

---

## 📚 Documentação da API

Swagger

```
http://127.0.0.1:8000/docs
```

Redoc

```
http://127.0.0.1:8000/redoc
```

---

# 📌 Endpoints

## 🌾 Culturas

| Método | Endpoint |
|---------|----------|
| GET | `/culturas/` |
| POST | `/culturas/` |
| PUT | `/culturas/{id}` |
| DELETE | `/culturas/{id}` |

---

## 🚜 Máquinas

| Método | Endpoint |
|---------|----------|
| GET | `/maquinas/` |
| POST | `/maquinas/` |
| PUT | `/maquinas/{id}` |
| DELETE | `/maquinas/{id}` |

---

## 📅 Atividades

| Método | Endpoint |
|---------|----------|
| GET | `/atividades/` |
| POST | `/atividades/` |
| PUT | `/atividades/{id}` |
| DELETE | `/atividades/{id}` |

---

## 📦 Produção

| Método | Endpoint |
|---------|----------|
| GET | `/producao/` |
| POST | `/producao/` |
| PUT | `/producao/{id}` |
| DELETE | `/producao/{id}` |

---

## 💰 Custos

| Método | Endpoint |
|---------|----------|
| GET | `/custos/` |
| POST | `/custos/` |
| PUT | `/custos/{id}` |
| DELETE | `/custos/{id}` |

---

## 📊 Dashboard

| Método | Endpoint |
|---------|----------|
| GET | `/dashboard/` |

Retorna indicadores gerais da propriedade:

- Total de culturas
- Total de máquinas
- Total de atividades
- Total de produções
- Total de custos
- Receita total
- Lucro líquido
- Margem de lucro

---

## 📈 Lucro

| Método | Endpoint |
|---------|----------|
| GET | `/lucro/` |

Retorna:

```json
{
    "total_receitas": 0,
    "total_custos": 0,
    "lucro_liquido": 0,
    "margem_lucro": 0
}
```

---

## 🗄 Banco de Dados

O projeto utiliza PostgreSQL hospedado no **Neon**.

As principais tabelas são:

- cultura
- maquina
- atividade
- producoes
- custos

