# 🚜 SIGFaz - Sistema Integrado de Gestão Fazendária

O **SIGFaz** é uma plataforma completa de gestão agrícola desenvolvida para produtores rurais que procuram otimizar a eficiência operacional e monitorar a rentabilidade da sua produção. O sistema unifica o controle de talhões, culturas, máquinas, insumos, atividades agrícolas e fluxos financeiros.

## 🛠️ Tecnologias Utilizadas

* **Frontend:** React, Vite, TypeScript, TailwindCSS, Axios (Integração) e Lucide React (Ícones).
* **Backend:** FastAPI (Python), Pydantic (Validação de dados) e Uvicorn (Servidor).
* **Banco de Dados:** PostgreSQL (Persistência relacional via `psycopg2`).

---

## 📁 Estrutura de Pastas Higienizada

```text
sigfaz-projeto/
├── backend/               # Código-fonte da API em FastAPI
│   ├── controllers/       # Rotas e regras de negócio (Insumos, Máquinas, etc.)
│   └── main.py            # Ponto de entrada da aplicação Backend
├── src/                   # Código-fonte do Frontend em React
│   ├── Components/        # Componentes reutilizáveis de UI
│   ├── Pages/             # Páginas da aplicação (Home, Login, Dashboard)
│   └── services/          # Configuração do Axios (api.ts)
├── package.json           # Dependências do Node.js
└── README.md              # Documentação unificada do projeto

```

---

## 🚀 Como Executar o Projeto Localmente

Para rodar a aplicação completa, siga as etapas de inicialização do ecossistema abaixo em terminais separados do seu Git Bash.

### 1. Inicialização do Banco de Dados (PostgreSQL)

Certifique-se de que o seu serviço do PostgreSQL está ativo localmente e que a base de dados configurada nos controladores do backend foi criada com as tabelas correspondentes.

---

### 2. Inicialização do Backend (FastAPI)
1. Navegue até o diretório do backend:

   ```bash
   cd backend
   ```

2. Crie e ative o seu ambiente virtual Python:
    ```bash
    # Criação do ambiente virtual:
    python -m venv venv

    # Ativação no Windows (Git Bash):
    source venv/Scripts/activate

    ```


3. Certifique-se de que as dependências estão instaladas:
    ```bash
    pip install -r requirements.txt

    ```


4. Inicie o servidor de desenvolvimento da API:
    ```bash
    uvicorn main:app --reload

    ```

> A API estará disponível em `http://127.0.0.1:8000`. Veja a documentação interativa das rotas em `/docs`.


### 3. Inicialização do Frontend (React + Vite)

1. Abra um novo terminal na raiz do projeto e instale os pacotes necessários:
    ```bash
    npm install

    ```


2. Inicialize o servidor web local do frontend:
    ```bash
    npm run dev

    ```


> O frontend estará acessível através do endereço padrão exibido no terminal (geralmente `http://localhost:5173`).


---

*Projeto Académico de Pesquisa e Extensão - IFMS | 2026*